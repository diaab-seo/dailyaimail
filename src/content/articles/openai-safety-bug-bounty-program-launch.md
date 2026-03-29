---
tag: OpenAI
tags:
  - OpenAI
  - AI Safety
  - AI Security
  - "Policy & Ethics"
headline: >-
  OpenAI Launches Safety Bug Bounty Program to Reward Researchers Who Find AI
  Abuse Risks
excerpt: >-
  OpenAI is opening a public Safety Bug Bounty program targeting AI-specific
  misuse scenarios — from agentic prompt injection to platform integrity
  bypasses — that fall outside traditional security vulnerability scopes.
date: 'Mar 25, 2026'
isoDate: '2026-03-25'
modifiedDate: '2026-03-28'
author: Daily AI Mail Editorial Staff
authorUrl: 'https://dailyaimail.news/about-us/editorial-team'
readingTime: 3 min read
image: /images/openai-safety-bug-bounty-program-launch.png
imageWidth: 1200
imageHeight: 675
imageCaption: >-
  OpenAI's new Safety Bug Bounty program expands its researcher partnership
  model to cover AI abuse scenarios, agentic risks, and platform integrity
  issues.
keywords:
  - OpenAI Safety Bug Bounty
  - AI abuse reporting
  - prompt injection bounty
  - OpenAI security researchers
  - agentic AI safety
articleSection:
  - Technology
  - Artificial Intelligence
mentions:
  - name: OpenAI
    url: 'https://openai.com'
    type: Organization
  - name: HackerOne
    url: 'https://hackerone.com'
    type: Organization
about:
  - name: OpenAI Safety Bug Bounty
    url: 'https://openai.com/index/safety-bug-bounty/'
    type: Thing
  - name: OpenAI Security Bug Bounty
    url: 'https://openai.com/security/'
    type: Thing
citations:
  - name: 'OpenAI: Introducing the Safety Bug Bounty Program'
    url: 'https://openai.com/index/safety-bug-bounty/'
    type: CreativeWork
  - name: OpenAI Security Bug Bounty Program
    url: 'https://openai.com/security/'
    type: CreativeWork
  - name: 'OWASP: Prompt Injection in LLM Applications'
    url: >-
      https://owasp.org/www-project-top-10-for-large-language-model-applications/
    type: CreativeWork
---

OpenAI is expanding its researcher partnership model in a meaningful direction. The company has launched a public [Safety Bug Bounty program](https://openai.com/index/safety-bug-bounty/) designed to surface AI-specific abuse and safety risks — a category of vulnerability that its existing [Security Bug Bounty](https://openai.com/security/) was never built to capture.

The distinction matters. Traditional security bug bounties are optimized for finding exploits in infrastructure, authentication systems, and data handling. What OpenAI is now paying researchers to find is different: scenarios where AI systems can be manipulated, misused, or coerced into causing tangible harm — even when no classical security vulnerability is present.

## What the Program Covers

The Safety Bug Bounty is structured around four risk categories, each reflecting a distinct failure mode in modern AI deployment.

**Agentic Risks including MCP** sits at the top of the priority list. This covers third-party [prompt injection](https://owasp.org/www-project-top-10-for-large-language-model-applications/) attacks — scenarios where malicious instructions embedded in external content can reliably hijack an agent, such as ChatGPT Agent or OpenAI's Browser tool, into performing harmful actions or leaking sensitive user data. For a submission to qualify, the behavior must be reproducible at least 50% of the time. The category also covers cases where an agentic product performs disallowed or potentially harmful actions on OpenAI's own platform at scale. Any testing involving MCP must comply with the terms of service of any third-party services involved.

**OpenAI Proprietary Information** covers model outputs that inadvertently expose internal reasoning artifacts or other proprietary information that should not surface in generations.

**Account and Platform Integrity** targets vulnerabilities in OpenAI's trust and access control infrastructure — including bypassing anti-automation controls, manipulating account trust signals, or evading account restrictions, suspensions, or bans.

## What Is Explicitly Out of Scope

OpenAI drew a clear line around jailbreaks. General content-policy bypasses that result in the model using rude language, or returning information that is trivially findable via a search engine, are explicitly out of scope and will not qualify for rewards. The program is oriented toward finding discrete, actionable flaws with demonstrable harm pathways — not harvesting edge cases in tone or content filtering.

That said, OpenAI noted it does run periodic private bug bounty campaigns targeting specific harm categories, such as biorisk content issues in ChatGPT Agent and GPT-5, and invites qualified researchers to apply when those programs open.

## Why This Program Exists Now

The launch reflects a structural gap that has grown more visible as AI systems become more autonomous. Agentic AI tools — models that browse the web, execute code, call APIs, and operate across multi-step workflows — introduce an entirely new attack surface that did not exist when bug bounty programs were originally designed. [Prompt injection](https://owasp.org/www-project-top-10-for-large-language-model-applications/) in particular has emerged as one of the most practical and underexplored threat vectors in deployed AI systems, and one where traditional security tooling offers limited detection.

By creating a formal, rewarded channel for safety researchers to report these findings, OpenAI is acknowledging that the boundary between security and safety is blurring — and that defending against AI misuse requires the same adversarial research culture that has long protected conventional software.

Researchers can apply directly through the [Safety Bug Bounty program page](https://openai.com/index/safety-bug-bounty/).
