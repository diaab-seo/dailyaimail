---
tag: Anthropic
tags:
  - Anthropic
  - Claude Code
  - Cybersecurity
  - AI Tools
  - Open Source
headline: >-
  Claude Code Leaks Its Own Source Code for the Second Time in a Year via npm
  Source Maps
excerpt: >-
  A 60MB source-map file included in Claude Code v2.1.88 exposed 1,906
  proprietary TypeScript source files on the public npm registry — the same
  packaging oversight that struck Anthropic in February 2025.
date: 'Mar 31, 2026'
isoDate: '2026-03-31T17:33:00+05:30'
modifiedDate: '2026-03-31'
author: Daily AI Mail Editorial Staff
authorUrl: 'https://dailyaimail.news/about-us/editorial-team'
readingTime: 4 min read
image: /images/claude-code-source-code-leak-npm-source-map.png
imageWidth: 1200
imageHeight: 675
imageCaption: >-
  Claude Code v2.1.88 inadvertently shipped a 60MB source-map file on npm,
  exposing 1,906 proprietary TypeScript source files including internal API
  design, telemetry, and encryption logic.
keywords:
  - Claude Code source code leak
  - Anthropic npm source map
  - Claude Code v2.1.88
  - cli.js.map leak
  - Anthropic software security
articleSection:
  - Technology
  - Artificial Intelligence
mentions: []
about:
  - name: Claude Code
    url: 'https://www.anthropic.com/claude-code'
    type: SoftwareApplication
  - name: npm Registry
    url: 'https://npmjs.com'
    type: Thing'
citations:
  - name: 'DEV Community: Claude Code Source Leak via npm Source Maps'
    url: >-
      https://dev.to/gabrielanhaia/claude-codes-entire-source-code-was-just-leaked-via-npm-source-maps-heres-whats-inside-cjo
    type: CreativeWork
  - name: 'BlockBeats: Claude Code npm Leak Details'
    url: 'https://www.theblockbeats.info/flash/338932'
    type: CreativeWork
  - name: 'Odaily: Anthropic Claude Code Prior Leak Context'
    url: 'https://www.odaily.news/zh-CN/newsflash/474653'
    type: CreativeWork
  - name: 'GitHub: Archived Claude Code Source Repository'
    url: 'https://github.com/instructkr/claude-code'
    type: CreativeWork
  - name: 'Threads: Anthropic Claude Code Leak Discussion'
    url: >-
      https://www.threads.com/@young.mete/post/DWi3R7ZDjWo/anthropic-just-leaked-claude-codes-source-code-apparently-they-accidentally
    type: CreativeWork
---

Anthropic has inadvertently exposed the complete source code of Claude Code for the second time in thirteen months — through the same type of packaging oversight that security researchers describe as a basic, avoidable mistake in production software releases.

On March 31, 2026, blockchain security researcher Chaofan Shou discovered that Claude Code v2.1.88, the latest release of Anthropic's flagship command-line coding tool, had shipped to the public npm registry with a 60MB source-map file — `cli.js.map` — included in the package. The file was sufficient to reconstruct the full underlying TypeScript codebase from the published build.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Claude code source code has been leaked via a map file in their npm registry! <br><br>Code: <a href="https://t.co/jBiMoOzt8G">https://t.co/jBiMoOzt8G</a> <a href="https://t.co/rYo5hbvEj8">pic.twitter.com/rYo5hbvEj8</a></p>&mdash; Chaofan Shou (@Fried_rice) <a href="https://twitter.com/Fried_rice/status/2038894956459290963?ref_src=twsrc%5Etfw">March 31, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## What Got Exposed — and What Didn't

Understanding the scope of the leak requires a brief primer on what source maps are and why they should never ship in finished software.

When a company publishes software publicly, it typically compiles and bundles the original source code into a compressed, harder-to-read format — protecting intellectual property and preventing external scrutiny of internal architecture. A source map is a development-phase file that bridges the compressed output back to the original, human-readable source. It is indispensable during internal debugging. It has no legitimate purpose in a package distributed on a public registry like npm.

According to [DEV Community's technical breakdown](https://dev.to/gabrielanhaia/claude-codes-entire-source-code-was-just-leaked-via-npm-source-maps-heres-whats-inside-cjo), the file exposed 1,906 proprietary Claude Code source files. The leaked contents span internal API design, telemetry analysis systems, encryption tooling, and inter-process communication protocols. The source map also referenced unobfuscated TypeScript sources hosted in Anthropic's cloud storage, making the original code directly downloadable rather than requiring reconstruction.

What the leak does not expose is equally important to state clearly. [BlockBeats confirmed](https://www.theblockbeats.info/flash/338932) that the exposure involves client implementation code for the command-line tool only — no model weights and no user data were compromised. Conversations with Claude are not at risk. The damage is reputational and competitive: Anthropic's internal architecture, security mechanisms, and telemetry logic are now publicly visible to anyone who chooses to examine them.

## The Community Response Was Immediate

The [archived repository on GitHub](https://github.com/instructkr/claude-code) crossed 1,100 stars and 1,900 forks within hours of the discovery being posted publicly. The npm registry is the world's largest public software library, meaning the package was accessible to millions of developers globally before any remediation could take place.

As of the time of writing, Anthropic has not issued a public statement on the incident.

## This Has Happened Before

The reason this incident draws particular scrutiny is its precedent. According to [Odaily](https://www.odaily.news/zh-CN/newsflash/474653), the same class of error — a source map file inadvertently bundled into the npm release — exposed an early version of Claude Code in February 2025. At that time, Anthropic responded by removing the affected version from npm and deleting the source map. The fix addressed the symptom in that specific release but evidently did not produce a lasting change to the release pipeline that would prevent recurrence.

That the identical oversight has now reappeared in v2.1.88, more than a year later, is what elevates this from an isolated packaging error to a process concern. A one-time mistake during an early-stage tool release is unremarkable; the same mistake recurring in a mature, widely deployed product used by professional developers and enterprise teams raises legitimate questions about what review gates exist before a Claude Code release reaches the public registry.

## The Broader Implications

Shou, an intern researcher at blockchain security firm Fuzzland, flagged the issue publicly rather than through a private disclosure channel — a choice that accelerated community awareness but also ensured the window for quiet remediation closed quickly. The [community discussion on Threads](https://www.threads.com/@young.mete/post/DWi3R7ZDjWo/anthropic-just-leaked-claude-codes-source-code-apparently-they-accidentally) reflects a mix of technical curiosity about what the source code reveals and genuine concern about what the recurrence signals.

For enterprises evaluating Claude Code as part of their developer stack — particularly in the wake of Anthropic's recent [auto mode launch](https://dailyaimail.news/articles/anthropic-gives-claude-code-an-autonomous-mode-with-a-safety-net-built-in) and its growing positioning as production-grade infrastructure — the incident is an uncomfortable data point. The tool being marketed as safe and enterprise-ready shipped twice with a mistake that any standard pre-release checklist would catch.
