---
title: Rust asynchronous runtime
description:
      Liten is a Rust asynchronous runtime that is focused on being small and fast.
      It implements pool threading with the N:M model and work-stealing.
      It has a main scheduler that maintains a global queue, in which the worker threads can steal work from and each others queues.
      It implements a event loop for asynchronously listening to events, and soon a clock.
date: 4 Feb 2025
languages: [typescript, rust]
logPost: making-a-multithreaded-rust-async-runtime
draft: true
repo: liten-rs/liten
---
