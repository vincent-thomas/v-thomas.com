---
title: 'cloud for agents from first principles'
date: 2026-11-24
description: 'What the cloud looks like if you design it for an agent instead of a person.'
draft: false
cover: '/images/cloud-for-agents-cover.webp'
coverAlt: 'White hand reaching toward line drawings of a face, circuits, and hexagons on a blue background, with yellow wires and a block of small text.'
---

An Einstein-level model with no tools is useless. It can reason about anything and do nothing.

We argue about which model is smartest, but an agent is only as powerful as the tools you give it. And the most fundamental tool there is, a computer, is still built for humans. Most of the cloud wasn't designed so much as inherited, layer by layer, for a person clicking around in a console.

So forget the cloud we have, and design one for an agent.

## Start with the user

A few years ago agents couldn't do much with a computer even if you gave them one. Now they plan, write code, run it, read the errors, and try again for hours.

That loop is the whole user. An agent acts, looks at what happened, and tries again. When it's unsure, it tries several things at once. It does this without a browser, without sleeping, and without anyone trusting it.

Each of those five facts decides one part of the design.

## It has no browser

Agents don't click through web consoles. They speak MCP, run CLIs, and open SSH sessions. So the front door of the cloud has to be a command, and everything a console does has to be reachable from it.

It also has to explain itself. A person reads the docs once. An agent arrives knowing nothing, every time. Getting a machine should be as simple as pointing an agent at one command and letting it figure out the rest. At [Vers](https://vers.sh), where I work, that command is `ssh try.vers.sh`.

## It tries several things at once

A person wants one server and keeps it for months. An agent wants hundreds of environments, for seconds or minutes, all at once.

That flips the defaults. A machine has to start in about the time of a tool call, because an agent that waits minutes for a boot stops asking for machines. It has to be billed for the seconds it lived. And throwaway has to be the normal case.

## It tries again

Agents work by trying things, and most attempts fail. On a normal server a failed attempt leaves a mess behind, and the next attempt starts from the mess.

So state has to be something the agent controls. Checkpoint the entire machine, memory and disk, and not only the files. Branch it, try five approaches, and roll back the four that failed. A machine should behave like a commit: cheap to copy, safe to throw away, always possible to return to.

## Nobody trusts it

An agent is autonomous and untrusted at the same time. The usual answer is a sandbox: wrap a real machine in a smaller, safer interface, and decide in advance what the agent will need.

The trouble shows up as soon as the work gets real. Give an agent a test suite that needs databases, services, and real networking, and it spends its time fighting the sandbox instead of running the tests. Ask it for a benchmark and the numbers mean nothing, because it measured an abstraction and not the hardware.

A virtual machine is an abstraction too. What matters is where the line is drawn. A VM draws it below the operating system, so everything above belongs to the agent: root, the kernel, the network stack, the freedom to start a container or a second database. So give the agent the whole machine, and put the wall around the machine.

## It never sleeps

Agents retry, fan out, and run around the clock. Quotas written for people assume the opposite: a few machines, created slowly, by someone who will notice the bill.

For an agent, the limit that makes sense is a budget. Say how much it may spend, and let it decide whether that is one machine for a day or a thousand for a minute.

## Where you end up

Build compute up from that loop and you end up somewhere very different from today's cloud. Not because the old one is bad, but because it was built for a different user, and that user is about to stop being the main one.

The models will keep getting smarter either way. Agents are going to do a huge share of the world's software work, and whoever decides what computers they get also decides how much they can actually do.
