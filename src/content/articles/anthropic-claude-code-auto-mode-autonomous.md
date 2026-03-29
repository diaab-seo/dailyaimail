---
tag: Anthropic
tags:
  - Anthropic
  - Claude Code
  - AI Agents
  - AI Developer Tools
  - Agentic AI
headline: Anthropic Gives Claude Code an Autonomous Mode — With a Safety Net Built In
excerpt: >-
  Anthropic's new 'auto mode' for Claude Code lets the AI decide which actions
  to take without waiting for human approval, using an AI safety layer to filter
  risky behavior in real time.
date: 'Mar 25, 2026'
isoDate: "2026-03-29T15:32:00+00:00"
modifiedDate: '2026-03-28'
author: Daily AI Mail Editorial Staff
authorUrl: 'https://dailyaimail.news/about-us/editorial-team'
readingTime: 3 min read
image: /images/anthropic-claude-code-auto-mode-autonomous.png
imageWidth: 1200
imageHeight: 675
imageCaption: >-
  Anthropic's Claude Code gains an autonomous 'auto mode' that self-determines
  which actions are safe to execute — without waiting for the developer.
keywords:
  - Claude Code auto mode
  - Anthropic autonomous AI
  - Claude Code Review
  - agentic coding tools
  - prompt injection protection
articleSection:
  - Technology
  - Artificial Intelligence
mentions:
  - name: Anthropic
    url: 'https://www.anthropic.com'
    type: Organization
  - name: GitHub
    url: 'https://github.com'
    type: Organization
  - name: OpenAI
    url: 'https://openai.com'
    type: Organization
about:
  - name: Claude Code
    url: 'https://www.anthropic.com/claude-code'
    type: Thing
  - name: Claude Code Review
    url: 'https://www.anthropic.com/news/claude-code-review'
    type: Thing
  - name: Dispatch for Cowork
    url: 'https://www.anthropic.com/news/cowork'
    type: Thing
citations:
  - name: 'Anthropic: Claude Code Auto Mode Announcement'
    url: 'https://www.anthropic.com/news/claude-code-auto-mode'
    type: CreativeWork
  - name: 'Anthropic: Claude Code Review Launch'
    url: 'https://www.anthropic.com/news/claude-code-review'
    type: CreativeWork
  - name: 'Anthropic: Dispatch for Cowork'
    url: 'https://www.anthropic.com/news/cowork'
    type: CreativeWork
  - name: 'OWASP: Prompt Injection Explained'
    url: >-
      https://owasp.org/www-project-top-10-for-large-language-model-applications/
    type: CreativeWork
---

For developers leaning on AI to write and ship code, the current state of the art demands a constant trade-off: either watch every move the model makes, or step back and accept the unpredictability that comes with giving it free rein. Anthropic is now pushing to make that trade-off obsolete.

## Auto Mode: The AI Decides What's Safe

The company has introduced "auto mode" for [Claude Code](https://www.anthropic.com/claude-code), currently available as a research preview — meaning it is open for developer testing but not yet a finalized product. The feature shifts the permission-granting decision away from the developer and onto the AI itself: Claude Code evaluates each action before executing it, proceeds automatically with anything it determines to be safe, and blocks anything it flags as risky.

The safety layer does two things simultaneously. It screens for behavior that falls outside the scope of what the user originally requested, and it checks for [prompt injection](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — a class of attack where malicious instructions are embedded in content the AI is actively processing, causing it to take actions the user never intended.

Mechanically, auto mode is an evolution of Claude Code's existing `dangerously-skip-permissions` command, which already allowed the AI to make all execution decisions independently. Auto mode layers a real-time AI-driven safety review on top of that same capability, making the unchecked version of the feature more viable for broader use.

## A Growing Wave of Autonomous Dev Tools

The launch reflects an industrywide momentum toward agentic coding environments. Tools from [GitHub Copilot Workspace](https://github.com/features/copilot) and [OpenAI Codex](https://openai.com/blog/openai-codex) have already moved in the direction of executing multi-step tasks autonomously on a developer's behalf. What Claude Code's auto mode adds is a distinct architectural choice: rather than the user defining when to hand off control, the AI makes that determination dynamically, action by action.

Anthropic has not yet published the specific criteria its safety layer uses to distinguish acceptable actions from flagged ones — a gap that enterprise security teams and individual developers will likely probe before committing to the feature in serious workflows. The company has indicated that further details are forthcoming.

## Part of a Broader Agentic Push

Auto mode arrives alongside two other recent Claude Code launches. [Claude Code Review](https://www.anthropic.com/news/claude-code-review) is an automated code reviewer designed to surface bugs before they reach the codebase. [Dispatch for Cowork](https://www.anthropic.com/news/cowork) allows users to delegate tasks directly to AI agents, extending Claude's reach into broader asynchronous workflows.

Together, the three features signal a deliberate direction for Anthropic's developer tooling: moving Claude from a responsive coding assistant toward a system capable of sustained, semi-independent operation across a development environment.

Auto mode is rolling out to Enterprise and API users in the coming days. Anthropic currently limits it to [Claude Sonnet 4.6 and Opus 4.6](https://www.anthropic.com/claude), and strongly recommends running it inside isolated, sandboxed environments — keeping it separated from production systems to contain any unintended consequences while the feature matures.
