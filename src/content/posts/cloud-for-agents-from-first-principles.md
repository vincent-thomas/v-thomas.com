---
title: 'cloud for agents from first principles'
date: 2026-11-24
description: 'Agents are smart enough for the work. The computers we give them were built for someone else.'
draft: false
cover: '/images/cloud-for-agents-cover.webp'
coverAlt: 'White hand reaching toward line drawings of a face, circuits, and hexagons on a blue background, with yellow wires and a block of small text.'
---

Give an agent a test suite that needs a real setup, with databases, services, and real networking, and watch where the time goes. Most of it goes to fighting the sandbox: the service that won't start, the port it can't reach, the container it isn't allowed to run. Ask it for a benchmark and the numbers mean nothing, because it measured an abstraction and not the hardware.

The agent was smart enough for the task. It got stuck on the environment.

An Einstein-level model with no tools is useless. It can reason about anything and do nothing. We argue about which model is smartest, but an agent is only as powerful as the tools you give it, and the most fundamental tool there is, a computer, is still built for humans.

## The timing

A few years ago agents couldn't do much with a computer even if you gave them one. Now they plan, write code, run it, read the errors, and try again for hours. The infrastructure under them hasn't kept up. They run on a stack that was designed for a person clicking around in a console.

## Why a sandbox isn't enough

A sandbox is someone else's decision about what the agent will need. They took a real machine and wrapped it in a smaller, safer interface.

The obvious objection is that a virtual machine is an abstraction too. It is. What matters is where the line is drawn. A VM draws it below the operating system, so everything above belongs to the agent: root, the kernel, the network stack, the freedom to start a container or a second database. Many sandboxes draw it higher, inside a restricted container or behind a syscall filter, and that is the layer where real software setups live.

An agent is untrusted and has to be isolated. What I care about is whether the isolation takes capabilities away. If tools are what make a model powerful, every capability you remove is a limit on the agent. I'd rather give it the whole machine and put the wall around the machine.

## Starting from the loop

Most of the cloud wasn't designed so much as inherited, layer by layer, for a human in a console. For a new kind of user, it's worth starting over from what that user actually does.

An agent does one thing in a loop: it acts, looks at what happened, and tries again. When it's unsure, it tries several things at once. It does this without a browser, without sleeping, and without anyone trusting it. Each of those facts asks something of the computer.

- **It has no browser, so it needs a way in.** Agents don't click through web consoles. They speak MCP, run CLIs, and open SSH sessions. Getting a machine should be as simple as pointing an agent at a command and letting it figure out the rest. At [Vers](https://vers.sh), where I work, that command is `ssh try.vers.sh`.
- **It tries several things at once, so it needs machines on demand.** Agents don't want one server kept around. They want hundreds of environments, for seconds or minutes, all at once.
- **It tries again, so it needs state it can control.** That means checkpointing an entire machine, branching it, trying five approaches, and rolling back the four that failed.
- **Nobody trusts it, so it needs freedom with safety.** An agent is autonomous and untrusted at the same time. It needs the real machine, with isolation designed around that, not a smaller box.
- **It never sleeps, so it needs limits that match its pace.** Agents retry and fan out around the clock. Quotas and pricing built for human speed get in the way.

Build compute up from that loop and you end up somewhere very different from today's cloud. Not because the old one is bad, but because it was built for a different user, and that user is about to stop being the main one.

The models will keep getting smarter either way. Agents are going to do a huge share of the world's software work, and whoever decides what computers they get also decides how much they can actually do.
