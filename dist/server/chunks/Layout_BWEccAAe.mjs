globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_CWntdTPp.mjs";
import { n as createRenderInstruction, r as renderTemplate, m as maybeRenderHead, l as renderComponent, o as renderSlot, p as renderHead, h as addAttribute } from "./worker-entry_CgfvVE7Q.mjs";
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
var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<nav class="navbar" id="main-nav" data-astro-cid-5blmo7yk> <div class="navbar-inner" data-astro-cid-5blmo7yk> <!-- Logo --> <a href="/" class="navbar-logo" aria-label="Daily AI Mail — Home" data-astro-cid-5blmo7yk> <img src="/daily-ai-mail-logo.svg" class="logo" alt="Daily AI Mail" data-astro-cid-5blmo7yk> </a> <!-- Desktop nav links --> <ul class="desktop-nav" data-astro-cid-5blmo7yk> <li data-astro-cid-5blmo7yk><a href="/" data-astro-cid-5blmo7yk>Home</a></li> <li class="has-dropdown" data-astro-cid-5blmo7yk> <a href="/topics/anthropic" data-astro-cid-5blmo7yk>Anthropic</a> <ul class="dropdown" data-astro-cid-5blmo7yk> <li data-astro-cid-5blmo7yk><a href="/topics/anthropic" data-astro-cid-5blmo7yk>Claude Updates</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/policy-and-ethics" data-astro-cid-5blmo7yk>Safety Research</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/anthropic" data-astro-cid-5blmo7yk>Product Releases</a></li> </ul> </li> <li class="has-dropdown" data-astro-cid-5blmo7yk> <a href="/topics/google-ai" data-astro-cid-5blmo7yk>Google</a> <ul class="dropdown" data-astro-cid-5blmo7yk> <li data-astro-cid-5blmo7yk><a href="/topics/google-ai" data-astro-cid-5blmo7yk>Gemini</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/google-ai" data-astro-cid-5blmo7yk>DeepMind</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/google-ai" data-astro-cid-5blmo7yk>Google Labs</a></li> </ul> </li> <li class="has-dropdown" data-astro-cid-5blmo7yk> <a href="/topics/openai" data-astro-cid-5blmo7yk>OpenAI</a> <ul class="dropdown" data-astro-cid-5blmo7yk> <li data-astro-cid-5blmo7yk><a href="/topics/openai" data-astro-cid-5blmo7yk>GPT Series</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/sora" data-astro-cid-5blmo7yk>Sora</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/openai" data-astro-cid-5blmo7yk>Research</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/openai" data-astro-cid-5blmo7yk>Policy</a></li> </ul> </li> <li class="has-dropdown" data-astro-cid-5blmo7yk> <a href="/topics/meta-ai" data-astro-cid-5blmo7yk>Meta</a> <ul class="dropdown" data-astro-cid-5blmo7yk> <li data-astro-cid-5blmo7yk><a href="/topics/meta-ai" data-astro-cid-5blmo7yk>Llama</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/meta-ai" data-astro-cid-5blmo7yk>Research</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/meta-ai" data-astro-cid-5blmo7yk>Open Source</a></li> </ul> </li> <li class="has-dropdown" data-astro-cid-5blmo7yk> <a href="/topics/tools-and-apps" data-astro-cid-5blmo7yk>Tools &amp; Apps</a> <ul class="dropdown" data-astro-cid-5blmo7yk> <li data-astro-cid-5blmo7yk><a href="/topics/tools-and-apps" data-astro-cid-5blmo7yk>New Launches</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/tools-and-apps" data-astro-cid-5blmo7yk>Reviews</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/tools-and-apps" data-astro-cid-5blmo7yk>Comparisons</a></li> </ul> </li> <li class="has-dropdown" data-astro-cid-5blmo7yk> <a href="/topics/policy-and-ethics" data-astro-cid-5blmo7yk>Policy &amp; Ethics</a> <ul class="dropdown" data-astro-cid-5blmo7yk> <li data-astro-cid-5blmo7yk><a href="/topics/policy-and-ethics" data-astro-cid-5blmo7yk>Regulation</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/policy-and-ethics" data-astro-cid-5blmo7yk>Safety</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/policy-and-ethics" data-astro-cid-5blmo7yk>Industry News</a></li> </ul> </li> <li data-astro-cid-5blmo7yk><a href="/topics" data-astro-cid-5blmo7yk>All Topics</a></li> <li class="has-dropdown" id="about-nav-item" data-astro-cid-5blmo7yk> <a href="/about-us" data-astro-cid-5blmo7yk>About</a> <ul class="dropdown" id="about-dropdown" data-astro-cid-5blmo7yk> <li data-astro-cid-5blmo7yk><a href="/about-us" data-astro-cid-5blmo7yk>About Us</a></li> <li data-astro-cid-5blmo7yk><a href="/contact-us" data-astro-cid-5blmo7yk>Contact</a></li> <li data-astro-cid-5blmo7yk><a href="#newsletter" data-astro-cid-5blmo7yk>Newsletter</a></li> </ul> </li> </ul> <!-- Right-side actions --> <div class="nav-actions" data-astro-cid-5blmo7yk> <!-- Search --> <button class="icon-btn" id="search-open-btn" aria-label="Search" data-astro-cid-5blmo7yk> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" data-astro-cid-5blmo7yk> <circle cx="11" cy="11" r="8" data-astro-cid-5blmo7yk></circle> <line x1="21" y1="21" x2="16.65" y2="16.65" data-astro-cid-5blmo7yk></line> </svg> </button> <!-- Subscribe — hidden on mobile to make room for hamburger --> <button class="icon-btn hide-mobile" id="nav-subscribe-btn" aria-label="Subscribe to newsletter" data-astro-cid-5blmo7yk> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" data-astro-cid-5blmo7yk> <rect x="2" y="4" width="20" height="16" rx="2" data-astro-cid-5blmo7yk></rect> <path d="M2 7l10 7 10-7" data-astro-cid-5blmo7yk></path> </svg> </button> <!-- Avatar / Account menu --> <div class="avatar-wrap hide-mobile" id="avatar-wrap" data-astro-cid-5blmo7yk> <button class="icon-btn avatar-btn" id="avatar-btn" aria-label="Account" aria-haspopup="true" aria-expanded="false" data-astro-cid-5blmo7yk> <!-- Shown when logged in --> <span class="avatar-initials" id="avatar-initials" aria-hidden="true" data-astro-cid-5blmo7yk></span> <!-- Shown when logged out --> <svg id="avatar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" data-astro-cid-5blmo7yk> <circle cx="12" cy="8" r="4" data-astro-cid-5blmo7yk></circle> <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" data-astro-cid-5blmo7yk></path> </svg> </button> <div class="avatar-dropdown" id="avatar-dropdown" role="menu" hidden data-astro-cid-5blmo7yk> <!-- Guest state --> <div id="avatar-guest" data-astro-cid-5blmo7yk> <a href="/auth/register" class="avatar-item" role="menuitem" data-astro-cid-5blmo7yk>Create Account</a> <a href="/auth/login" class="avatar-item" role="menuitem" data-astro-cid-5blmo7yk>Sign In</a> </div> <!-- Logged-in state --> <div id="avatar-user" style="display:none;" data-astro-cid-5blmo7yk> <p class="avatar-display-name" id="avatar-display-name" data-astro-cid-5blmo7yk></p> <div class="avatar-rule" data-astro-cid-5blmo7yk></div> <form method="POST" action="/auth/logout" style="margin:0;" data-astro-cid-5blmo7yk> <button type="submit" class="avatar-item avatar-item--btn" role="menuitem" data-astro-cid-5blmo7yk>\nSign Out\n</button> </form> </div> </div> </div> <!-- Hamburger (mobile only) --> <button class="hamburger" id="hamburger-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav" data-astro-cid-5blmo7yk> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false" data-astro-cid-5blmo7yk> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-5blmo7yk></line> <line x1="3" y1="12" x2="21" y2="12" data-astro-cid-5blmo7yk></line> <line x1="3" y1="18" x2="21" y2="18" data-astro-cid-5blmo7yk></line> </svg> </button> </div> </div> <!-- Mobile nav --> <ul class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" data-astro-cid-5blmo7yk> <li data-astro-cid-5blmo7yk><a href="/" data-astro-cid-5blmo7yk>Home</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/anthropic" data-astro-cid-5blmo7yk>Anthropic</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/google-ai" data-astro-cid-5blmo7yk>Google</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/openai" data-astro-cid-5blmo7yk>OpenAI</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/meta-ai" data-astro-cid-5blmo7yk>Meta</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/tools-and-apps" data-astro-cid-5blmo7yk>Tools &amp; Apps</a></li> <li data-astro-cid-5blmo7yk><a href="/topics/policy-and-ethics" data-astro-cid-5blmo7yk>Policy &amp; Ethics</a></li> <li data-astro-cid-5blmo7yk><a href="/about-us" data-astro-cid-5blmo7yk>About</a></li> <li id="mobile-signin-item" data-astro-cid-5blmo7yk><a href="/auth/login" data-astro-cid-5blmo7yk>Sign In</a></li> <li id="mobile-register-item" data-astro-cid-5blmo7yk> <a href="/auth/register" data-astro-cid-5blmo7yk>Create Account</a> </li> <li id="mobile-logout-item" style="display:none;" data-astro-cid-5blmo7yk> <form method="POST" action="/auth/logout" style="margin:0;" data-astro-cid-5blmo7yk> <button type="submit" class="nav-logout-btn" style="padding:13px 0;width:100%;font-size:15px;font-weight:500;color:rgba(244,240,232,.75);border-bottom:1px solid rgba(255,255,255,.05);text-align:left;" data-astro-cid-5blmo7yk>Sign Out</button> </form> </li> <li id="mobile-nav-subscribe-btn" data-astro-cid-5blmo7yk> <a href="#" id="mobile-subscribe-link" data-astro-cid-5blmo7yk>Subscribe to Newsletter</a> </li> </ul> </nav> <!-- Search Modal — position:fixed, JS controls display, never affects page layout --> <div id="search-modal" class="search-modal" aria-modal="true" role="dialog" aria-label="Search Daily AI Mail" data-astro-cid-5blmo7yk> <div class="search-backdrop" id="search-backdrop" data-astro-cid-5blmo7yk></div> <div class="search-container" data-astro-cid-5blmo7yk> <div id="search" data-astro-cid-5blmo7yk></div> </div> </div> <!-- Pagefind UI assets --> <link rel="stylesheet" href="/pagefind/pagefind-ui.css"> <script src="/pagefind/pagefind-ui.js"><\/script> ', " ", ""])), maybeRenderHead(), renderScript($$result, "D:/AI News/dailyaimail/src/components/Navbar.astro?astro&type=script&index=0&lang.ts"), renderScript($$result, "D:/AI News/dailyaimail/src/components/Navbar.astro?astro&type=script&index=1&lang.ts"));
}, "D:/AI News/dailyaimail/src/components/Navbar.astro", void 0);
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="footer-inner" data-astro-cid-sz7xmlte> <div class="footer-grid" data-astro-cid-sz7xmlte> <!-- Column 1 --> <div class="footer-col brand-col" data-astro-cid-sz7xmlte> <a href="/" class="footer-logo" data-astro-cid-sz7xmlte> <img src="/daily-ai-mail-logo.svg" class="logo" alt="Daily AI Mail" data-astro-cid-sz7xmlte> </a> <p class="tagline" data-astro-cid-sz7xmlte>
Daily AI Mail is an independent digital publication dedicated to
          covering the global artificial intelligence industry. Founded in 2026,
          the publication serves researchers, engineers, business leaders,
          policymakers, and curious readers who need accurate, timely, and
          substantive reporting on one of the most consequential technological
          developments of the modern era.
</p> </div> <!-- Column 2 --> <div class="footer-col links-col" data-astro-cid-sz7xmlte> <nav class="links-group" aria-label="Navigate" data-astro-cid-sz7xmlte> <p class="footer-col-heading" data-astro-cid-sz7xmlte>About The Company</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/" data-astro-cid-sz7xmlte>Home</a></li> <li data-astro-cid-sz7xmlte><a href="/about-us" data-astro-cid-sz7xmlte>About Us</a></li> <li data-astro-cid-sz7xmlte><a href="/contact-us" data-astro-cid-sz7xmlte>Contact</a></li> <li data-astro-cid-sz7xmlte><a href="/privacy-policy" data-astro-cid-sz7xmlte>Privacy Policy</a></li> <li data-astro-cid-sz7xmlte><a href="/terms-and-conditions" data-astro-cid-sz7xmlte>Terms of Use</a></li> <li data-astro-cid-sz7xmlte><a href="/cookies-policy" data-astro-cid-sz7xmlte>Cookies Policy</a></li> <li data-astro-cid-sz7xmlte><a href="/publishing-principles" data-astro-cid-sz7xmlte>Publishing Principles</a></li> </ul> </nav> <nav class="links-group" aria-label="Topics" data-astro-cid-sz7xmlte> <p class="footer-col-heading" data-astro-cid-sz7xmlte>Our Topics</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/topics/anthropic" data-astro-cid-sz7xmlte>Anthropic</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/google-ai" data-astro-cid-sz7xmlte>Google AI</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/openai" data-astro-cid-sz7xmlte>OpenAI</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/meta-ai" data-astro-cid-sz7xmlte>Meta AI</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/tools-and-apps" data-astro-cid-sz7xmlte>Tools & Apps</a></li> <li data-astro-cid-sz7xmlte><a href="/topics/policy-and-ethics" data-astro-cid-sz7xmlte>Policy & Ethics</a></li> <li class="all-topics-item" data-astro-cid-sz7xmlte><a href="/topics" data-astro-cid-sz7xmlte>All Topics</a></li> </ul> </nav> </div> <!-- Column 2b: Learn AI --> <div class="footer-col" data-astro-cid-sz7xmlte> <nav class="links-group" aria-label="Explainers" data-astro-cid-sz7xmlte> <p class="footer-col-heading" data-astro-cid-sz7xmlte>Learn AI</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/explainers" data-astro-cid-sz7xmlte>AI Explainers</a></li> <li data-astro-cid-sz7xmlte><a href="/explainers/large-language-model" data-astro-cid-sz7xmlte>What is an LLM?</a></li> <li data-astro-cid-sz7xmlte><a href="/explainers/retrieval-augmented-generation" data-astro-cid-sz7xmlte>What is RAG?</a></li> <li data-astro-cid-sz7xmlte><a href="/explainers/hallucination" data-astro-cid-sz7xmlte>What is Hallucination?</a></li> <li data-astro-cid-sz7xmlte><a href="/explainers/ai-agent" data-astro-cid-sz7xmlte>What is an AI Agent?</a></li> <li data-astro-cid-sz7xmlte><a href="/explainers/alignment" data-astro-cid-sz7xmlte>What is Alignment?</a></li> </ul> </nav> </div> <!-- Column 3 --> <nav class="footer-col connect-col" aria-label="Connect" data-astro-cid-sz7xmlte> <p class="footer-col-heading" data-astro-cid-sz7xmlte>Connect</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="https://x.com/dailyaimail" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Twitter / X</a></li> <li data-astro-cid-sz7xmlte><a href="https://www.facebook.com/dailyaimail/" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Facebook</a></li> <li data-astro-cid-sz7xmlte><a href="https://www.linkedin.com/company/dailaimail/" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>LinkedIn</a></li> <li data-astro-cid-sz7xmlte><a href="https://medium.com/@dailyaimail" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Medium</a></li> <li data-astro-cid-sz7xmlte><a href="https://www.reddit.com/user/dailyaimail/" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>Reddit</a></li> <li data-astro-cid-sz7xmlte><a href="#newsletter" data-astro-cid-sz7xmlte>Newsletter</a></li> <li data-astro-cid-sz7xmlte><a href="/rss.xml" data-astro-cid-sz7xmlte>RSS Feed</a></li> </ul> </nav> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p class="copyright" data-astro-cid-sz7xmlte>© 2026 Daily AI Mail · Built by Daily AI Mail Editorial Staff</p> <nav class="legal-links" aria-label="Legal" data-astro-cid-sz7xmlte> <a href="/privacy-policy" data-astro-cid-sz7xmlte>Privacy Policy</a> <span class="sep" data-astro-cid-sz7xmlte>·</span> <a href="/terms-and-conditions" data-astro-cid-sz7xmlte>Terms of Use</a> <span class="sep" data-astro-cid-sz7xmlte>·</span> <a href="/cookies-policy" data-astro-cid-sz7xmlte>Cookies Policy</a> </nav> </div> </div> </footer>`;
}, "D:/AI News/dailyaimail/src/components/Footer.astro", void 0);
var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$NewsletterModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", `<div id="nl-modal-overlay" class="nl-overlay" role="dialog" aria-modal="true" aria-label="Subscribe to Daily AI Mail" hidden data-astro-cid-rcfmcarr> <div class="nl-modal" data-astro-cid-rcfmcarr> <button id="nl-modal-close" class="nl-close" aria-label="Close newsletter modal" data-astro-cid-rcfmcarr> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-rcfmcarr> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-rcfmcarr></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-rcfmcarr></line> </svg> </button> <div class="nl-card" data-astro-cid-rcfmcarr> <h2 class="nl-heading" data-astro-cid-rcfmcarr>AI News for People Who Build With It</h2> <p class="nl-sub" data-astro-cid-rcfmcarr>
Researchers, engineers, and founders read Daily AI Mail to stay sharp.
        Join them.
</p> <form action="https://app.kit.com/forms/9241006/subscriptions" method="post" class="nl-form" target="_blank" data-astro-cid-rcfmcarr> <input type="hidden" name="utf8" value="✓" data-astro-cid-rcfmcarr> <div class="nl-row" data-astro-cid-rcfmcarr> <input type="email" name="email_address" class="nl-input" placeholder="Email Address" required data-astro-cid-rcfmcarr> <button type="submit" class="nl-btn" data-astro-cid-rcfmcarr>Subscribe</button> </div> <p class="nl-disclaimer" data-astro-cid-rcfmcarr>We won't send you spam. Unsubscribe at any time.</p> </form> <p class="nl-powered" data-astro-cid-rcfmcarr> <a href="https://kit.com" target="_blank" rel="noopener noreferrer" class="nl-powered-link" data-astro-cid-rcfmcarr>Built with Kit</a> </p> </div> </div> </div> <script>
  (function () {
    var STORAGE_KEY = "dame_nl_dismissed";
    var SCROLL_THRESHOLD = 0.55;

    var overlay = document.getElementById("nl-modal-overlay");
    var closeBtn = document.getElementById("nl-modal-close");
    if (!overlay) return;

    // --- Close logic: ALWAYS registered (nav button also opens modal) ---
    function closeModal() {
      overlay.hidden = true;
      document.body.style.overflow = "";
      sessionStorage.setItem(STORAGE_KEY, "1");
    }

    closeBtn && closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !overlay.hidden) closeModal();
    });

    // --- Scroll auto-trigger: only fires if not already dismissed ---
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    function openModal() {
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
    }

    var fired = false;
    function onScroll() {
      if (fired) return;
      var scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD) {
        fired = true;
        window.removeEventListener("scroll", onScroll, { passive: true });
        setTimeout(openModal, 600);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  })();
<\/script>`])), maybeRenderHead());
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
  const ogType = directProps.ogType ?? "website";
  const ogPublished = directProps.ogPublished;
  const ogModified = directProps.ogModified;
  const ogAuthor = directProps.ogAuthor ?? "Daily AI Mail Editorial Staff";
  return renderTemplate(_a || (_a = __template([`<html lang="en" data-theme="light"> <head><!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PZML6X97');<\/script><!-- End Google Tag Manager --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"`, '><link rel="canonical"', '><!-- Open Graph --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:site_name" content="Daily AI Mail"><meta property="og:locale" content="en_US">', "", "", '<!-- Twitter / X Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@dailyaimail"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"><title>\n      ', '\n    </title><link rel="icon" type="image/png" href="/favicon.png"><meta name="generator"', "><!-- Per-page injections (JSON-LD, etc.) -->", "", '</head> <body> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PZML6X97" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) --> ', " ", " ", " ", ` <!-- Google One Tap (site-wide, shown only when user is not logged in) --> <div id="g_id_onload_sitewide" data-client_id="211980990853-n9806238qr51qtn69h914ed1nbv5a8m0.apps.googleusercontent.com" data-login_uri="/auth/google" data-auto_prompt="true" data-cancel_on_tap_outside="false" data-context="signin" style="display:none"></div> <script>
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
<\/script></body></html>`])), addAttribute(description ?? "Your daily source for AI news, research and tools.", "content"), addAttribute(canonical, "href"), addAttribute(ogType, "content"), addAttribute(canonical, "content"), addAttribute(ogTitle, "content"), addAttribute(ogDesc, "content"), addAttribute(ogImage, "content"), ogPublished && renderTemplate`<meta property="article:published_time"${addAttribute(ogPublished, "content")}>`, ogModified && renderTemplate`<meta property="article:modified_time"${addAttribute(ogModified, "content")}>`, ogType === "article" && renderTemplate`<meta property="article:author"${addAttribute(ogAuthor, "content")}>`, addAttribute(ogTitle, "content"), addAttribute(ogDesc, "content"), addAttribute(ogImage, "content"), metaTitle ?? (title ? `${title} — Daily AI Mail` : "Daily AI Mail"), addAttribute(Astro2.generator, "content"), renderSlot($$result, $$slots["head"]), renderHead(), renderComponent($$result, "Navbar", $$Navbar, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "NewsletterModal", $$NewsletterModal, {}));
}, "D:/AI News/dailyaimail/src/layouts/Layout.astro", void 0);
export {
  $$Layout as $
};
