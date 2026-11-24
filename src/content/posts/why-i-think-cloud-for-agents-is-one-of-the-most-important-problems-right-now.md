---
title: 'Why I think cloud for agents is one of the most important problems right now'
date: 2026-11-24
description: 'An Einstein-level model with no tools is useless.'
draft: false
---

An Einstein-level model with no tools is useless. It can reason about anything and do nothing.

That's the part of the agent conversation I think people underrate. We argue about which model is smartest, but an agent is only as powerful as the tools you give it. And the most fundamental tool there is, a computer, is still built for humans.

## The timing

A few years ago agents couldn't do much with a computer even if you gave them one. Now they plan, write code, run it, read the errors, and try again for hours. The models got exponentially better in every way. The infrastructure under hasn't kept up.

So we have agents that could do a lot more, running on a stack that was designed for a person clicking around in a console. That gap is why I believe now is the time.

## Why a sandbox isn't enough

A sandbox is an abstraction of compute. Someone already decided what the agent can and can't do, and wrapped a real machine in a smaller, safer interface.

That's useful, but abstractions cap what's possible. If tools are what make a model powerful, then every layer you put between the agent and the computer is a limit on the agent. I'd rather give it the real thing and design the safety around that.

## Rethinking compute for agents from first principles

Most of the cloud wasn't designed so much as inherited, layer by layer, for a human in a console. For an entirely new type of consumer of compute, first principles thinking is vital for designing the correct interface of cloud.

- **A way in.** Agents don't click through web consoles. They speak MCP, run CLIs, and open SSH sessions. Getting a machine should be as simple as pointing an agent at a command, like "ssh try.vers.sh", and letting it figure out the rest.
- **Machines on demand.** Agents don't want one server kept around. They want hundreds of environments, for seconds or minutes, all at once.
- **State it can control.** Agents work by trying things. That means snapshotting an entire machine, branching it, trying five approaches, and rolling back the four that failed.
- **Freedom with safety.** An agent is autonomous and untrusted at the same time. It needs the real machine, with isolation designed around that, not a smaller box.
- **Limits that match its pace.** Agents retry, fan out, and never sleep. Quotas and pricing built for human speed get in the way.

Build compute up from those needs and you end up somewhere very different from today's cloud. Not because the old one is bad, but because it was built for a different user, and that user is about to stop being the main one.

## Why this matters to me

I'm 20, and I write most of my code with an agent. I'm not watching this shift from the outside. It's how I work every day.

The agent is smart enough for the task, but it gets stuck on environment. Give it a test suite that needs a complicated setup, with databases, services, and real networking, and it spends its time fighting the sandbox instead of running the tests. Ask it to run a benchmark and the numbers mean nothing, because it's measuring an abstraction and not the actual hardware. The model isn't the bottleneck. The computer under it is.

That's why I don't think of this as just a interesting infra problem. Agents are going to do a huge share of the world's software work, and whoever decides what computers they get also decides how much they can actually do. Getting that layer right, early and from first principles, will be one of the highest-leverage things someone can work on.

The models will keep getting smarter either way. Whether they can actually do things depends on the tools we give them.
