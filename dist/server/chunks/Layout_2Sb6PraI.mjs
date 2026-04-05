globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DLznMxX2.mjs";
import { n as createRenderInstruction, r as renderTemplate, h as addAttribute, m as maybeRenderHead, l as renderComponent, o as renderSlot, p as renderHead } from "./worker-entry_BsShHIOK.mjs";
async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}<\/script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}
var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$NavbarRefactor = createComponent(async ($$result, $$props, $$slots) => {
  const GOOGLE_NEWS_URL = "https://news.google.com/publications/CAAqLAgKIiZDQklTRmdnTWFoSUtFR1JoYVd4NVlXbHRZV2xzTG01bGQzTW9BQVAB?ceid=US:en&oc=3";
  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/dailaimail/",
      icon: "linkedin"
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/dailyaimail/",
      icon: "facebook"
    },
    {
      label: "X",
      href: "https://x.com/dailyaimail",
      icon: "x"
    },
    {
      label: "Medium",
      href: "https://medium.com/@dailyaimail",
      icon: "medium"
    },
    {
      label: "Reddit",
      href: "https://www.reddit.com/user/dailyaimail/",
      icon: "reddit"
    }
  ];
  const topicGroups = [
    {
      label: "Frontier Labs",
      href: "/topics/openai",
      items: [
        { label: "OpenAI", href: "/topics/openai" },
        { label: "Anthropic", href: "/topics/anthropic" },
        { label: "Google AI", href: "/topics/google-ai" },
        { label: "Meta AI", href: "/topics/meta-ai" },
        { label: "Mistral AI", href: "/topics/mistral-ai" }
      ]
    },
    {
      label: "Products",
      href: "/topics/chatgpt",
      items: [
        { label: "ChatGPT", href: "/topics/chatgpt" },
        { label: "Gemini", href: "/topics/gemini" },
        { label: "Claude Code", href: "/topics/claude-code" },
        { label: "Copilot", href: "/topics/copilot" },
        { label: "Sora", href: "/topics/sora" }
      ]
    },
    {
      label: "Industry",
      href: "/topics/enterprise-ai",
      items: [
        { label: "Enterprise AI", href: "/topics/enterprise-ai" },
        { label: "Startups", href: "/topics/startups" },
        { label: "AI Strategy", href: "/topics/ai-strategy" },
        { label: "Media", href: "/topics/media" },
        { label: "Layoffs", href: "/topics/layoffs" }
      ]
    },
    {
      label: "Infrastructure",
      href: "/topics/ai-infrastructure",
      items: [
        { label: "AI Infrastructure", href: "/topics/ai-infrastructure" },
        { label: "AI Chips", href: "/topics/ai-chips" },
        { label: "Data Centers", href: "/topics/data-centers" },
        { label: "Semiconductors", href: "/topics/semiconductors" },
        { label: "Developer Tools", href: "/topics/developer-tools" }
      ]
    },
    {
      label: "Policy & Safety",
      href: "/topics/policy-and-ethics",
      items: [
        { label: "Policy & Ethics", href: "/topics/policy-and-ethics" },
        { label: "AI Safety", href: "/topics/ai-safety" },
        { label: "AI Security", href: "/topics/ai-security" },
        { label: "Open Source AI", href: "/topics/open-source-ai" },
        { label: "Frontier AI", href: "/topics/frontier-ai" }
      ]
    }
  ];
  const moreTopics = [
    { label: "Generative AI", href: "/topics/generative-ai" },
    { label: "AI Agents", href: "/topics/ai-agents" },
    { label: "Machine Learning", href: "/topics/machine-learning" },
    { label: "Quantum Computing", href: "/topics/quantum-computing" },
    { label: "Personal AI", href: "/topics/personal-ai" },
    { label: "All Topics", href: "/topics" }
  ];
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", '<nav class="navbar" id="main-nav" aria-label="Primary" data-astro-cid-5y5hthtx> <div class="utility-shell" data-astro-cid-5y5hthtx> <div class="utility-row" data-astro-cid-5y5hthtx> <a href="/" class="navbar-logo" aria-label="Daily AI Mail Home" data-astro-cid-5y5hthtx> <img src="/daily-ai-mail-logo.svg" class="logo" alt="Daily AI Mail" data-astro-cid-5y5hthtx> </a> <div class="utility-actions" data-astro-cid-5y5hthtx> <div class="social-links" aria-label="Social links" data-astro-cid-5y5hthtx> ', " <a", ' class="utility-icon-link utility-icon-link--google" target="_blank" rel="noopener noreferrer" aria-label="Follow on Google News" title="Follow on Google News" data-astro-cid-5y5hthtx> <img src="/badges/google-news-icon.svg" alt="" width="20" height="20" aria-hidden="true" data-astro-cid-5y5hthtx> </a> <a href="/rss.xml" class="utility-icon-link" target="_blank" rel="noopener noreferrer" aria-label="RSS Feed" title="RSS Feed" data-astro-cid-5y5hthtx> <svg viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5y5hthtx> <path d="M6.18 17.82a1.82 1.82 0 1 1 0-3.64 1.82 1.82 0 0 1 0 3.64ZM4 9.5v2.73A7.77 7.77 0 0 1 11.77 20h2.73C14.5 13.65 10.35 9.5 4 9.5Zm0-5v2.73c7.86 0 12.27 4.41 12.27 12.27H19C19 10.18 13.82 5 4 4.5Z" data-astro-cid-5y5hthtx></path> </svg> </a> <a href="/newsletter" class="newsletter-link" target="_blank" rel="noopener noreferrer" data-astro-cid-5y5hthtx>\nNewsletter\n</a> <div class="avatar-wrap desktop-only" id="avatar-wrap" data-astro-cid-5y5hthtx> <button class="utility-icon-link avatar-btn" id="avatar-btn" aria-label="Account" aria-haspopup="true" aria-expanded="false" type="button" data-astro-cid-5y5hthtx> <span class="avatar-initials" id="avatar-initials" aria-hidden="true" data-astro-cid-5y5hthtx></span> <svg id="avatar-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" data-astro-cid-5y5hthtx> <circle cx="12" cy="8" r="4" data-astro-cid-5y5hthtx></circle> <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" data-astro-cid-5y5hthtx></path> </svg> </button> <div class="avatar-dropdown" id="avatar-dropdown" role="menu" hidden data-astro-cid-5y5hthtx> <div id="avatar-guest" data-astro-cid-5y5hthtx> <a href="/auth/register" class="avatar-item" role="menuitem" data-astro-cid-5y5hthtx>\nCreate Account\n</a> <a href="/auth/login" class="avatar-item" role="menuitem" data-astro-cid-5y5hthtx>\nSign In\n</a> </div> <div id="avatar-user" style="display:none;" data-astro-cid-5y5hthtx> <p class="avatar-display-name" id="avatar-display-name" data-astro-cid-5y5hthtx></p> <div class="avatar-rule" data-astro-cid-5y5hthtx></div> <form method="POST" action="/auth/logout" style="margin:0;" data-astro-cid-5y5hthtx> <button type="submit" class="avatar-item avatar-item--btn" role="menuitem" data-astro-cid-5y5hthtx>\nSign Out\n</button> </form> </div> </div> </div> </div> <div class="mobile-toolbar" data-astro-cid-5y5hthtx> <button class="toolbar-btn" id="search-open-btn-mobile" aria-label="Search" type="button" data-astro-cid-5y5hthtx> <svg viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5y5hthtx> <circle cx="11" cy="11" r="7" data-astro-cid-5y5hthtx></circle> <line x1="20" y1="20" x2="16.65" y2="16.65" data-astro-cid-5y5hthtx></line> </svg> </button> <button class="toolbar-btn" id="hamburger-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav" type="button" data-astro-cid-5y5hthtx> <svg viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5y5hthtx> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-5y5hthtx></line> <line x1="3" y1="12" x2="21" y2="12" data-astro-cid-5y5hthtx></line> <line x1="3" y1="18" x2="21" y2="18" data-astro-cid-5y5hthtx></line> </svg> </button> </div> </div> </div> </div> <div class="topics-shell" data-astro-cid-5y5hthtx> <div class="topics-row" data-astro-cid-5y5hthtx> <ul class="desktop-topics" aria-label="Topic feeds" data-astro-cid-5y5hthtx> <li data-astro-cid-5y5hthtx><a href="/news" class="topic-link topic-link--primary" data-astro-cid-5y5hthtx>All Feed</a></li> <li data-astro-cid-5y5hthtx><a href="/statistics" class="topic-link topic-link--primary" data-astro-cid-5y5hthtx>Statistics</a></li> ', ' <li class="topic-item has-dropdown" data-astro-cid-5y5hthtx> <a href="/topics" class="topic-link" data-astro-cid-5y5hthtx> <span data-astro-cid-5y5hthtx>More Topics</span> <svg viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-5y5hthtx> <path d="M4 6l4 4 4-4" data-astro-cid-5y5hthtx></path> </svg> </a> <ul class="topic-dropdown topic-dropdown--more" data-astro-cid-5y5hthtx> ', ' </ul> </li> </ul> <button class="search-btn desktop-search" id="search-open-btn" aria-label="Search" type="button" data-astro-cid-5y5hthtx> <svg viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5y5hthtx> <circle cx="11" cy="11" r="7" data-astro-cid-5y5hthtx></circle> <line x1="20" y1="20" x2="16.65" y2="16.65" data-astro-cid-5y5hthtx></line> </svg> </button> </div> </div> <div class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" data-astro-cid-5y5hthtx> <a href="/news" class="mobile-direct-link" data-astro-cid-5y5hthtx>All Feed</a> <a href="/statistics" class="mobile-direct-link" data-astro-cid-5y5hthtx>Statistics</a> ', ' <details class="mobile-topic-group" data-astro-cid-5y5hthtx> <summary data-astro-cid-5y5hthtx>More Topics</summary> <div class="mobile-topic-links" data-astro-cid-5y5hthtx> ', ' </div> </details> <div class="mobile-meta-links" data-astro-cid-5y5hthtx> <a href="/about-us" data-astro-cid-5y5hthtx>About Us</a> <a href="/contact-us" data-astro-cid-5y5hthtx>Contact</a> <a href="/newsletter" target="_blank" rel="noopener noreferrer" data-astro-cid-5y5hthtx>\nNewsletter\n</a> </div> <div class="mobile-auth-links" data-astro-cid-5y5hthtx> <a id="mobile-signin-item" href="/auth/login" data-astro-cid-5y5hthtx>Sign In</a> <a id="mobile-register-item" href="/auth/register" data-astro-cid-5y5hthtx>Create Account</a> <form id="mobile-logout-item" method="POST" action="/auth/logout" style="display:none;" data-astro-cid-5y5hthtx> <button type="submit" class="mobile-logout-btn" data-astro-cid-5y5hthtx>Sign Out</button> </form> </div> </div> </nav> <div id="search-modal" class="search-modal" aria-modal="true" role="dialog" aria-label="Search Daily AI Mail" data-astro-cid-5y5hthtx> <div class="search-backdrop" id="search-backdrop" data-astro-cid-5y5hthtx></div> <div class="search-container" data-astro-cid-5y5hthtx> <div id="search" data-astro-cid-5y5hthtx></div> </div> </div> <link rel="stylesheet" href="/pagefind/pagefind-ui.css"> <script src="/pagefind/pagefind-ui.js"><\/script> ', ""])), maybeRenderHead(), socialLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="utility-icon-link" target="_blank" rel="noopener noreferrer"${addAttribute(link.label, "aria-label")}${addAttribute(link.label, "title")} data-astro-cid-5y5hthtx> ${link.icon === "linkedin" && renderTemplate`<svg viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5y5hthtx> <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 13.02c0-3.47-1.85-5.08-4.33-5.08-2 0-2.9 1.1-3.4 1.88V8.5H9.33V20h3.38v-6.4c0-1.69.32-3.33 2.41-3.33 2.06 0 2.09 1.93 2.09 3.44V20h3.38v-6.98Z" data-astro-cid-5y5hthtx></path> </svg>`} ${link.icon === "facebook" && renderTemplate`<svg viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5y5hthtx> <path d="M13.5 21v-7.27h2.45l.37-2.84H13.5V9.08c0-.83.23-1.39 1.42-1.39h1.52V5.15c-.26-.03-1.17-.11-2.23-.11-2.2 0-3.71 1.34-3.71 3.81v2.04H8v2.84h2.5V21h3Z" data-astro-cid-5y5hthtx></path> </svg>`} ${link.icon === "x" && renderTemplate`<svg viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5y5hthtx> <path d="M18.9 2H21l-6.87 7.85L22.2 22h-6.32l-4.95-6.5L5.24 22H3.1l7.34-8.39L2 2h6.48l4.47 5.97L18.9 2Zm-1.11 18h1.75L7.52 3.9H5.64L17.79 20Z" data-astro-cid-5y5hthtx></path> </svg>`} ${link.icon === "medium" && renderTemplate`<svg viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5y5hthtx> <path d="M4.52 7.75A1.1 1.1 0 0 0 4 6.82V6.7h4.56l3.52 7.72 3.1-7.72h4.35v.12a.93.93 0 0 0-.43.88v8.6c0 .42.12.56.43.88v.12h-4.38v-.12c.34-.28.34-.37.34-.88V9.34l-3.88 9.08h-.53L6.57 9.34v5.82c-.1.67.1 1.35.53 1.87v.12H4v-.12c.43-.52.62-1.2.5-1.87V7.75Z" data-astro-cid-5y5hthtx></path> </svg>`} ${link.icon === "reddit" && renderTemplate`<svg viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-5y5hthtx> <path d="M14.27 15.13a.75.75 0 0 1-1.06 1.06 1.9 1.9 0 0 0-2.68 0 .75.75 0 1 1-1.06-1.06 3.4 3.4 0 0 1 4.8 0Zm-.84-3.38a1.13 1.13 0 1 0 0-2.25 1.13 1.13 0 0 0 0 2.25Zm-3.86-2.25a1.13 1.13 0 1 0 0 2.25 1.13 1.13 0 0 0 0-2.25Zm11.23 2.14a1.8 1.8 0 0 0-3.06-1.28 6.95 6.95 0 0 0-4.88-1.83l.83-2.62 2.23.52a1.6 1.6 0 1 0 .35-1.48l-2.84-.66a.75.75 0 0 0-.89.5l-1.02 3.24a7.08 7.08 0 0 0-4.97 1.84 1.8 1.8 0 1 0-1.06 3.25 4.9 4.9 0 0 0-.03.52c0 2.9 2.87 5.25 6.41 5.25s6.4-2.35 6.4-5.25c0-.17 0-.35-.02-.52a1.8 1.8 0 0 0 1.55-1.78Z" data-astro-cid-5y5hthtx></path> </svg>`} </a>`), addAttribute(GOOGLE_NEWS_URL, "href"), topicGroups.map((group) => renderTemplate`<li class="topic-item has-dropdown" data-astro-cid-5y5hthtx> <a${addAttribute(group.href, "href")} class="topic-link" data-astro-cid-5y5hthtx> <span data-astro-cid-5y5hthtx>${group.label}</span> <svg viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-5y5hthtx> <path d="M4 6l4 4 4-4" data-astro-cid-5y5hthtx></path> </svg> </a> <ul class="topic-dropdown" data-astro-cid-5y5hthtx> ${group.items.map((item) => renderTemplate`<li data-astro-cid-5y5hthtx><a${addAttribute(item.href, "href")} data-astro-cid-5y5hthtx>${item.label}</a></li>`)} </ul> </li>`), moreTopics.map((item) => renderTemplate`<li data-astro-cid-5y5hthtx><a${addAttribute(item.href, "href")} data-astro-cid-5y5hthtx>${item.label}</a></li>`), topicGroups.map((group) => renderTemplate`<details class="mobile-topic-group" data-astro-cid-5y5hthtx> <summary data-astro-cid-5y5hthtx>${group.label}</summary> <div class="mobile-topic-links" data-astro-cid-5y5hthtx> ${group.items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} data-astro-cid-5y5hthtx>${item.label}</a>`)} </div> </details>`), moreTopics.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} data-astro-cid-5y5hthtx>${item.label}</a>`), renderScript($$result, "D:/AI News/dailyaimail/src/components/NavbarRefactor.astro?astro&type=script&index=0&lang.ts"));
}, "D:/AI News/dailyaimail/src/components/NavbarRefactor.astro", void 0);
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="footer-inner" data-astro-cid-sz7xmlte> <div class="footer-grid" data-astro-cid-sz7xmlte> <!-- Column 1 --> <div class="footer-col brand-col" data-astro-cid-sz7xmlte> <a href="/" class="footer-logo" data-astro-cid-sz7xmlte> <img src="/daily-ai-mail-logo.svg" class="logo" alt="Daily AI Mail" data-astro-cid-sz7xmlte> </a> <p class="tagline" data-astro-cid-sz7xmlte>
Daily AI Mail is an independent digital publication dedicated to
          covering the global artificial intelligence industry. Founded in 2026,
          the publication serves researchers, engineers, business leaders,
          policymakers, and curious readers who need accurate, timely, and
          substantive reporting on one of the most consequential technological
          developments of the modern era.
</p> </div> <!-- Column 2 --> <div class="footer-col links-col" data-astro-cid-sz7xmlte> <nav class="links-group" aria-label="Navigate" data-astro-cid-sz7xmlte> <p class="footer-col-heading" data-astro-cid-sz7xmlte>About The Company</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/" data-astro-cid-sz7xmlte>Home</a></li> <li data-astro-cid-sz7xmlte><a href="/about-us" data-astro-cid-sz7xmlte>About Us</a></li> <li data-astro-cid-sz7xmlte><a href="/contact-us" data-astro-cid-sz7xmlte>Contact</a></li> <li data-astro-cid-sz7xmlte><a href="/privacy-policy" data-astro-cid-sz7xmlte>Privacy Policy</a></li> <li data-astro-cid-sz7xmlte><a href="/terms-and-conditions" data-astro-cid-sz7xmlte>Terms of Use</a></li> <li data-astro-cid-sz7xmlte><a href="/cookies-policy" data-astro-cid-sz7xmlte>Cookies Policy</a></li> <li data-astro-cid-sz7xmlte><a href="/publishing-principles" data-astro-cid-sz7xmlte>Publishing Principles</a></li> </ul> </nav> <nav class="links-group" aria-label="Topics" data-astro-cid-sz7xmlte> <p class="footer-col-heading" data-astro-cid-sz7xmlte>Our Topics</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/topics/anthropic" data-astro-cid-sz7xmlte>Anthropic</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/google-ai" data-astro-cid-sz7xmlte>Google AI</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/openai" data-astro-cid-sz7xmlte>OpenAI</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/meta-ai" data-astro-cid-sz7xmlte>Meta AI</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/tools-and-apps" data-astro-cid-sz7xmlte>Tools & Apps</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/policy-and-ethics" data-astro-cid-sz7xmlte>Policy & Ethics</a></li> <li class="all-topics-item" data-astro-cid-sz7xmlte><a href="/topics" data-astro-cid-sz7xmlte>All Topics</a></li> </ul> </nav> </div> <!-- Column 2b: Learn AI --> <div class="footer-col" data-astro-cid-sz7xmlte> <nav class="links-group" aria-label="Explainers" data-astro-cid-sz7xmlte> <p class="footer-col-heading" data-astro-cid-sz7xmlte>Learn AI</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/explainers" data-astro-cid-sz7xmlte>AI Explainers</a></li> <li data-astro-cid-sz7xmlte> <a href="/explainers/large-language-model" data-astro-cid-sz7xmlte>What is an LLM?</a> </li> <li data-astro-cid-sz7xmlte> <a href="/explainers/retrieval-augmented-generation" data-astro-cid-sz7xmlte>What is RAG?</a> </li> <li data-astro-cid-sz7xmlte> <a href="/explainers/hallucination" data-astro-cid-sz7xmlte>What is Hallucination?</a> </li> <li data-astro-cid-sz7xmlte><a href="/explainers/ai-agent" data-astro-cid-sz7xmlte>What is an AI Agent?</a></li> <li data-astro-cid-sz7xmlte><a href="/explainers/alignment" data-astro-cid-sz7xmlte>What is Alignment?</a></li> </ul> </nav> </div> <!-- Column 3 --> <nav class="footer-col connect-col" aria-label="Connect" data-astro-cid-sz7xmlte> <p class="footer-col-heading" data-astro-cid-sz7xmlte>Connect</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="https://x.com/dailyaimail" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Twitter / X</a> </li> <li data-astro-cid-sz7xmlte> <a href="https://www.facebook.com/dailyaimail/" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Facebook</a> </li> <li data-astro-cid-sz7xmlte> <a href="https://www.linkedin.com/company/dailaimail/" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>LinkedIn</a> </li> <li data-astro-cid-sz7xmlte> <a href="https://medium.com/@dailyaimail" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Medium</a> </li> <li data-astro-cid-sz7xmlte> <a href="https://www.reddit.com/user/dailyaimail/" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Reddit</a> </li> <li data-astro-cid-sz7xmlte><a href="/newsletter" data-astro-cid-sz7xmlte>Newsletter</a></li> <li data-astro-cid-sz7xmlte><a href="/rss.xml" data-astro-cid-sz7xmlte>RSS Feed</a></li> </ul> </nav> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p class="copyright" data-astro-cid-sz7xmlte>
© 2026 Daily AI Mail · Built by Daily AI Mail Editorial Staff
</p> <nav class="legal-links" aria-label="Legal" data-astro-cid-sz7xmlte> <a href="/privacy-policy" data-astro-cid-sz7xmlte>Privacy Policy</a> <span class="sep" data-astro-cid-sz7xmlte>·</span> <a href="/terms-and-conditions" data-astro-cid-sz7xmlte>Terms of Use</a> <span class="sep" data-astro-cid-sz7xmlte>·</span> <a href="/cookies-policy" data-astro-cid-sz7xmlte>Cookies Policy</a> </nav> </div> </div> </footer>`;
}, "D:/AI News/dailyaimail/src/components/Footer.astro", void 0);
var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$NewsletterForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<div class="kit-form-wrapper" data-astro-cid-nbvfnxgh> <script async data-uid="b71b0d3c0c" src="https://daily-ai-mail.kit.com/b71b0d3c0c/index.js"><\/script> </div>'])), maybeRenderHead());
}, "D:/AI News/dailyaimail/src/components/NewsletterForm.astro", void 0);
var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$NewsletterModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div id="nl-modal-overlay" class="nl-overlay" role="dialog" aria-modal="true" aria-label="Subscribe to Daily AI Mail" hidden data-astro-cid-rcfmcarr> <div class="nl-modal" data-astro-cid-rcfmcarr> <button id="nl-modal-close" class="nl-close" aria-label="Close newsletter modal" data-astro-cid-rcfmcarr> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-rcfmcarr> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-rcfmcarr></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-rcfmcarr></line> </svg> </button> <div class="nl-card" data-astro-cid-rcfmcarr> <h2 class="nl-heading" data-astro-cid-rcfmcarr>AI News for People Who Build With It</h2> <p class="nl-sub" data-astro-cid-rcfmcarr>\nResearchers, engineers, and founders read Daily AI Mail to stay sharp.\n        Join them.\n</p> ', ' </div> </div> </div> <script>\n  (function () {\n    var STORAGE_KEY = "dame_nl_dismissed";\n    var SCROLL_THRESHOLD = 0.55;\n\n    var overlay = document.getElementById("nl-modal-overlay");\n    var closeBtn = document.getElementById("nl-modal-close");\n    if (!overlay) return;\n\n    // --- Close logic: ALWAYS registered (nav button also opens modal) ---\n    function closeModal() {\n      overlay.hidden = true;\n      document.body.style.overflow = "";\n      sessionStorage.setItem(STORAGE_KEY, "1");\n    }\n\n    closeBtn && closeBtn.addEventListener("click", closeModal);\n    overlay.addEventListener("click", function (e) {\n      if (e.target === overlay) closeModal();\n    });\n    document.addEventListener("keydown", function (e) {\n      if (e.key === "Escape" && !overlay.hidden) closeModal();\n    });\n\n    // --- Scroll auto-trigger: only fires if not already dismissed ---\n    if (sessionStorage.getItem(STORAGE_KEY)) return;\n\n    function openModal() {\n      overlay.hidden = false;\n      document.body.style.overflow = "hidden";\n    }\n\n    var fired = false;\n    function onScroll() {\n      if (fired) return;\n      var scrolled =\n        window.scrollY / (document.body.scrollHeight - window.innerHeight);\n      if (scrolled >= SCROLL_THRESHOLD) {\n        fired = true;\n        window.removeEventListener("scroll", onScroll, { passive: true });\n        setTimeout(openModal, 600);\n      }\n    }\n    window.addEventListener("scroll", onScroll, { passive: true });\n  })();\n<\/script>'])), maybeRenderHead(), renderComponent($$result, "NewsletterForm", $$NewsletterForm, { "data-astro-cid-rcfmcarr": true }));
}, "D:/AI News/dailyaimail/src/components/NewsletterModal.astro", void 0);
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const directProps = Astro2.props;
  const frontmatter = Astro2.props.frontmatter ?? {};
  const title = directProps.title ?? frontmatter.title;
  const description = directProps.description ?? frontmatter.description;
  const metaTitle = directProps.metaTitle ?? frontmatter.metaTitle;
  const SITE_URL = "https://dailyaimail.news";
  let canonicalPath = Astro2.url.pathname;
  if (canonicalPath.endsWith("/index.html")) {
    canonicalPath = canonicalPath.slice(0, -11);
  } else if (canonicalPath.endsWith(".html")) {
    canonicalPath = canonicalPath.slice(0, -5);
  }
  if (canonicalPath.length > 1 && canonicalPath.endsWith("/")) {
    canonicalPath = canonicalPath.slice(0, -1);
  }
  if (!canonicalPath.startsWith("/")) {
    canonicalPath = "/" + canonicalPath;
  }
  const canonical = directProps.canonical ?? `${SITE_URL}${canonicalPath}`;
  const ogTitle = directProps.ogTitle ?? metaTitle ?? title ?? "Daily AI Mail";
  const ogDesc = directProps.ogDescription ?? description ?? "Your daily source for AI news, research and tools.";
  const ogImage = directProps.ogImage ?? `${SITE_URL}/og-default.png`;
  const ogImageWidth = directProps.ogImageWidth ?? 1200;
  const ogImageHeight = directProps.ogImageHeight ?? 630;
  const ogImageAlt = directProps.ogImageAlt ?? ogTitle;
  const ogType = directProps.ogType ?? "website";
  const ogPublished = directProps.ogPublished;
  const ogModified = directProps.ogModified;
  const ogAuthor = directProps.ogAuthor ?? "Daily AI Mail Editorial Staff";
  const ogSection = directProps.ogSection;
  return renderTemplate(_a || (_a = __template([`<html lang="en" data-theme="light"> <head><!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PZML6X97');<\/script><!-- End Google Tag Manager --><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2726475267654049" crossorigin="anonymous"><\/script><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"`, '><link rel="canonical"', '><!-- Open Graph --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:width"', '><meta property="og:image:height"', '><meta property="og:image:alt"', '><meta property="og:site_name" content="Daily AI Mail"><meta property="og:locale" content="en_US">', "", "", "", '<!-- Twitter / X Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@dailyaimail"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:alt"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"><title>\n      ', '\n    </title><link rel="icon" type="image/png" href="/favicon.png"><meta name="generator"', "><!-- Per-page injections (JSON-LD, etc.) -->", "", '</head> <body> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PZML6X97" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) --> ', " ", " ", " ", ` <!-- Google One Tap (site-wide, shown only when user is not logged in) --> <div id="g_id_onload_sitewide" data-client_id="211980990853-n9806238qr51qtn69h914ed1nbv5a8m0.apps.googleusercontent.com" data-login_uri="/auth/google" data-auto_prompt="true" data-cancel_on_tap_outside="false" data-context="signin" style="display:none"></div> <script>
      // Only show Google One Tap when the user does not have a session
      (function() {
        // If user has a session cookie, skip One Tap
        var hasSession = document.cookie.split(';').some(function(c) {
          return c.trim().startsWith('sid=');
        });
        // Also skip on login/register pages (Google button is already there)
        var path = window.location.pathname;
        var isAuthPage = path.startsWith('/auth/');
        if (hasSession || isAuthPage) return;

        // Load GSI client and initialize One Tap
        var script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = function() {
          var el = document.getElementById('g_id_onload_sitewide');
          if (el) el.style.display = '';
          if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.initialize({
              client_id: '211980990853-n9806238qr51qtn69h914ed1nbv5a8m0.apps.googleusercontent.com',
              login_uri: '/auth/google',
              auto_select: true,
              cancel_on_tap_outside: false,
              context: 'signin',
              callback: function(response) {
                // Post the credential as a form to /auth/google
                var form = document.createElement('form');
                form.method = 'POST';
                form.action = '/auth/google';
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'credential';
                input.value = response.credential;
                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
              }
            });
            window.google.accounts.id.prompt();
          }
        };
        document.head.appendChild(script);
      })();
    <\/script> <!-- Go To Top --> <button id="go-top-btn" class="go-top-btn" aria-label="Back to top" title="Back to top"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <polyline points="18 15 12 9 6 15"></polyline> </svg> </button> <script>
  window.addEventListener("DOMContentLoaded", function () {
    document.documentElement.classList.add("theme-ready");
  });
  (function () {
    var btn = document.getElementById("go-top-btn");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true },
    );
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();
<\/script></body></html>`])), addAttribute(description ?? "Your daily source for AI news, research and tools.", "content"), addAttribute(canonical, "href"), addAttribute(ogType, "content"), addAttribute(canonical, "content"), addAttribute(ogTitle, "content"), addAttribute(ogDesc, "content"), addAttribute(ogImage, "content"), addAttribute(String(ogImageWidth), "content"), addAttribute(String(ogImageHeight), "content"), addAttribute(ogImageAlt, "content"), ogPublished && renderTemplate`<meta property="article:published_time"${addAttribute(ogPublished, "content")}>`, ogModified && renderTemplate`<meta property="article:modified_time"${addAttribute(ogModified, "content")}>`, ogType === "article" && renderTemplate`<meta property="article:author"${addAttribute(ogAuthor, "content")}>`, ogType === "article" && ogSection && renderTemplate`<meta property="article:section"${addAttribute(ogSection, "content")}>`, addAttribute(ogTitle, "content"), addAttribute(ogDesc, "content"), addAttribute(ogImage, "content"), addAttribute(ogImageAlt, "content"), metaTitle ?? (title ? `${title} — Daily AI Mail` : "Daily AI Mail"), addAttribute(Astro2.generator, "content"), renderSlot($$result, $$slots["head"]), renderHead(), renderComponent($$result, "Navbar", $$NavbarRefactor, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "NewsletterModal", $$NewsletterModal, {}));
}, "D:/AI News/dailyaimail/src/layouts/Layout.astro", void 0);
export {
  $$Layout as $
};
