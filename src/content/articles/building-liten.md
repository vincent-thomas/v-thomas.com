---
title: 'Making a multithreaded rust async runtime'
description: "Many people don't know how async runtimes (for example tokio) works. The goal of this article is explaining how one works and making one efficient."
heroImage: '/article-img/making-async-runtime.svg'
---

# Background
Rust is very interesting to me. It allows for more control of the controlflow than any other language in my opinion. It does this in many different ways.
One of these ways is with the `Option<T>` and `Result<T, E>` [tagged unions](https://en.wikipedia.org/wiki/Tagged_union). Options prevent null-values and Results embraces the error-as-values instead of using Exeptions (thank god).
Whilst already brilliant, Rust takes this idea and applies this further in another area in its language, a much more complex area, it's asyncronous functionality.
Rust has async syntax builtin, but not an async runtime builtin. What I'm refering to, is that a function can be colored `async`, but the `fn main()` _cannot_ be made `async`.

This means that it's impossible (without correct implementation) to run a async function in the main function. This is where async runtimes come into play. If an application wishes to run Futures, one needs to implement a way to handle async functions = Futures.


# Implementing an async runtime

There are essentially no limits on how the implementation looks like for an async runtime. But first, lets have a look at the [Future](https://doc.rust-lang.org/stable/std/future/trait.Future.html) signature:
```rust
// Simplified version of std::future::Future trait (as of 1.83)
pub trait Future {
    type Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
```
A `async fn` is essentially syntax-sugaring for a function returning a Future.
Futures are lazily evaluated, which means that the caller must "poll" until completion for it to complete and the caller to get access to the return value.

The only job an async runtime does is polling `Future`s. It is a very simple problem, with a potentially quite hard solution.


The point of async rust is _efficiency_. For example, if an application is listening on TCP, there is really no reason to block until a request comes. We only need to process the TCP connection, when one has arrived.
In `std`, the TCP listener blocks until a request has been made, but with async we can make the TcpListener not do any work until it needs to, leaving precious CPU time to other async tasks/futures.

We can expand async rusts capabilities by adding green threads. These are threads in which it's lifecycle is not managed by the OS (brings overhead, such as startup times and more), but by the async runtime, making them very light and cheap. A prime example of this is [`tokio::task`s](https://docs.rs/tokio/latest/tokio/task/index.html)

Rust's async model is all about making as much as possible run on one thread. This doesn't mean that our runtime cannot be run on multiple threads.

## Designing our own async runtime
Let's list some requirements before touching code or discussing any implementations:
- Multithreaded
- Green-thread support
- As efficient as possible (more on this later)

When talking about a green threads and multithreading, we are adhearing to the [`M:N` model](https://en.wikipedia.org/wiki/Thread_(computing)#M:N_(hybrid_threading)), which is `M` number of green-threads on `N` number of OS-threads.
The standard amount of OS-threads is one per CPU-core, creating any more than that will make the CPU schedule the threads anyways.

In this system, we will have one global FIFO queue and one local FIFO queue for every workerthread.
The individual workers will prefer pulling from it's own queue and then take from the global queue.
But this take has a fatal flaw. Lets say that thread 1 has 3 tasks and finishes all of them and thread 2 has 50 tasks and takes 2 seconds on each task.
There is a major imbalance between amount of tasks. We can implement [Work stealing](https://en.wikipedia.org/wiki/Work_stealing) to solve this issue.
Work stealing is allowing a worker threads to steal tasks from other workers local queue.
This levels pressure and makes sure that all workers are approximately an equal amount of workload.

We can implement this priority of fetching tasks with this function:
```rust
impl Worker {
  fn fetch_task(&self) -> Option<ArcTask> {
    // Get tasks from local queue
    if let Some(task) = self.local_queue.pop() {
      return Some(task);
    };

    // Try to steal tasks from the global queue
    loop {
      match self.steal_from_global_queue() {
        Steal::Retry => continue,
        Steal::Empty => break,
        Steal::Success(task) => return Some(task),
      };
    }

    // Global queue is empty: So we attempt to steal tasks from other workers.

    // Loop through all workers
    for remote_worker in self.handle.state().remotes.iter() {
      loop {
        // Steal workers and push to local queue, then pop local queue
        match remote_worker.stealer.steal_batch_and_pop(&self.local_queue) {
          // Try again with same remote
          Steal::Retry => continue,
          // Stop trying and move to next remote.
          Steal::Empty => break,
          // Break immediately and return task
          Steal::Success(task) => {
            return Some(task);
          }
        }
      }
    }

    // If none of these worked, return None
    None
  }
}
```

Once a task has been retreived, we allow little CPU time for that specific task. tasks Poll return decides what to do with it:
- Task returns `Poll::Pending`: Put it aside in a "cold" hashmap. This is to prevent the tasks in the "hot" queue to be polled unecessarily. Once the Future calls the waker, we put it back in the queue.
- Task returns `Poll::Ready`: Simply ignore, the future is a wrapper for the real future with the value, so nothing needs to be done here.

Once done with task, then try fetching another task. If no tasks can be found, the thread is parked for efficiency. The thread is later woken up when new work is available.


```rust
impl Worker {
  pub fn launch(&mut self) {
    let (sender, receiver) = mpsc::unbounded();
    loop {
      if self.receiver.try_recv().is_ok() {
        break;
      }

      // Add "pollable" tasks from "cold" queue to "hot" queue
      for now_active_task_id in receiver.try_iter() {
        let task = self
          .cold_queue
          .remove(&now_active_task_id)
          .expect("invalid waker called, TaskId doesn't exist");

        self.local_queue.push(task);
      }

      let Some(task) = self.fetch_task() else {
        self.parker.park();
        continue;
      };

      let id = task.id();
      let liten_waker = Arc::new(TaskWaker::new(id, sender.clone())).into();
      let mut context = std::task::Context::from_waker(&liten_waker);

      let unwind_task = task.clone();
      let poll_result = match std::panic::catch_unwind(move || unwind_task.poll(&mut context)) {
        Ok(value) => value,
        Err(_) => continue,
      };

      if Poll::Pending == poll_result {
        let old_value = self.cold_queue.insert(id, task);
        assert!(old_value.is_none(), "logic error of inserted cold_queue task");
      }
    }
  }
}
```

Now we have a very basic multithreaded, work-stealing async runtime! It's missing features such as a IO-event loop and a timer but the core of a runtime is this.

These snippets are taken from my own async runtime [`liten`](https://github.com/liten-rs/liten) which already has these extra parts mentioned and even more features planned.
