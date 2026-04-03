globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_CspnrLXO.mjs";
import { l as renderComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead } from "./worker-entry_cIrlCqGz.mjs";
import { env } from "cloudflare:workers";
import { $ as $$Layout } from "./Layout_BNDKqGA3.mjs";
import { g as getSession } from "./auth_DBUpFZ-m.mjs";
import { b as getUserByEmail, e as getUserByUsername, h as createUser, m as makeInitials } from "./db_DccF6XuO.mjs";
import { h as hashPassword } from "./password_2Yxh1Nin.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Register;
  const db = env.DB;
  const kv = env.SESSION;
  const user = await getSession(kv, Astro2.cookies);
  if (user) return Astro2.redirect("/");
  const returnTo = Astro2.url.searchParams.get("from") ?? "/";
  const googleLoginUri = `/auth/google?from=${encodeURIComponent(returnTo)}`;
  let errors = {};
  let values = { email: "", username: "", displayName: "" };
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const email = (form.get("email") ?? "").trim().toLowerCase();
    const username = (form.get("username") ?? "").trim().toLowerCase();
    const displayName = (form.get("displayName") ?? "").trim();
    const password = form.get("password") ?? "";
    const confirm = form.get("confirm") ?? "";
    values = { email, username, displayName };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "A valid email address is required.";
    if (!username || username.length < 3 || username.length > 30 || !/^[a-z0-9_]+$/.test(username))
      errors.username = "Username must be 3–30 characters: letters, numbers, underscores only.";
    if (!displayName || displayName.length < 2 || displayName.length > 60)
      errors.displayName = "Display name must be 2–60 characters.";
    if (!password || password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    if (password !== confirm) errors.confirm = "Passwords do not match.";
    const recaptchaResponse = form.get("g-recaptcha-response");
    if (!recaptchaResponse) {
      errors.recaptcha = "Please complete the CAPTCHA.";
    } else {
      const verifyUrl = new URL("https://www.google.com/recaptcha/api/siteverify");
      verifyUrl.searchParams.append("secret", "6LcJOZksAAAAABaFfIj_MDiyu7c00BKL5AWKI-2T");
      verifyUrl.searchParams.append("response", recaptchaResponse);
      const ip = Astro2.request.headers.get("CF-Connecting-IP");
      if (ip) verifyUrl.searchParams.append("remoteip", ip);
      const recaptchaFetch = await fetch(verifyUrl.toString(), { method: "POST" });
      const recaptchaResult = await recaptchaFetch.json();
      if (!recaptchaResult.success) {
        errors.recaptcha = "CAPTCHA verification failed.";
        console.error("recaptcha failure details:", recaptchaResult);
      }
    }
    if (Object.keys(errors).length === 0) {
      const [existingEmail, existingUsername] = await Promise.all([
        getUserByEmail(db, email),
        getUserByUsername(db, username)
      ]);
      if (existingEmail) errors.email = "This email is already registered.";
      if (existingUsername)
        errors.username = "This username is already taken.";
    }
    if (Object.keys(errors).length === 0) {
      const { hash, salt } = await hashPassword(password);
      await createUser(db, {
        email,
        username,
        display_name: displayName,
        avatar_initials: makeInitials(displayName),
        password_hash: hash,
        password_salt: salt
      });
      return Astro2.redirect(`/auth/login?registered=1&from=${encodeURIComponent(returnTo)}`);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Create Account — Daily AI Mail", "metaTitle": "Create Account — Daily AI Mail", "data-astro-cid-iewcbn5q": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="auth-wrap" data-astro-cid-iewcbn5q> <div class="auth-card" data-astro-cid-iewcbn5q> <a href="/" class="auth-brand" data-astro-cid-iewcbn5q>Daily <em data-astro-cid-iewcbn5q>AI</em> Mail</a> <h1 class="auth-title" data-astro-cid-iewcbn5q>Create your account</h1> <p class="auth-sub" data-astro-cid-iewcbn5q>\nJoin Daily AI Mail to leave comments and engage with our\n                community.\n</p> <!-- Google Identity Services --> <script src="https://accounts.google.com/gsi/client" async defer><\/script> <script src="https://www.google.com/recaptcha/api.js" async defer><\/script> <div id="g_id_onload" data-client_id="211980990853-n9806238qr51qtn69h914ed1nbv5a8m0.apps.googleusercontent.com"', "", ' data-auto_prompt="false" data-astro-cid-iewcbn5q></div> <div class="google-btn-wrapper" data-astro-cid-iewcbn5q> <div class="g_id_signin" data-type="standard" data-size="large" data-theme="outline" data-text="signup_with" data-shape="rectangular" data-logo_alignment="left" data-astro-cid-iewcbn5q></div> </div> <div class="auth-divider" data-astro-cid-iewcbn5q> <span data-astro-cid-iewcbn5q>or register with email</span> </div> <form method="POST" class="auth-form" novalidate data-astro-cid-iewcbn5q> <div class="field" data-astro-cid-iewcbn5q> <label for="displayName" data-astro-cid-iewcbn5q>Display Name</label> <input id="displayName" name="displayName" type="text"', ' placeholder="Your full name or alias" autocomplete="name" required data-astro-cid-iewcbn5q> ', ' </div> <div class="field" data-astro-cid-iewcbn5q> <label for="username" data-astro-cid-iewcbn5q>Username</label> <input id="username" name="username" type="text"', ' placeholder="e.g. john_doe" autocomplete="username" required data-astro-cid-iewcbn5q> ', ' <span class="field-hint" data-astro-cid-iewcbn5q>Letters, numbers and underscores only.</span> </div> <div class="field" data-astro-cid-iewcbn5q> <label for="email" data-astro-cid-iewcbn5q>Email Address</label> <input id="email" name="email" type="email"', ' placeholder="you@example.com" autocomplete="email" required data-astro-cid-iewcbn5q> ', ' </div> <div class="field" data-astro-cid-iewcbn5q> <label for="password" data-astro-cid-iewcbn5q>Password</label> <input id="password" name="password" type="password" placeholder="At least 8 characters" autocomplete="new-password" required data-astro-cid-iewcbn5q> ', ' </div> <div class="field" data-astro-cid-iewcbn5q> <label for="confirm" data-astro-cid-iewcbn5q>Confirm Password</label> <input id="confirm" name="confirm" type="password" placeholder="Repeat your password" autocomplete="new-password" required data-astro-cid-iewcbn5q> ', ' </div> <div class="field" style="margin: 10px 0;" data-astro-cid-iewcbn5q> <div class="g-recaptcha" data-sitekey="6LcJOZksAAAAABD9vCP5pUvfSXCIeOgTnCY01Fo3" data-theme="dark" data-astro-cid-iewcbn5q></div> ', ' </div> <button type="submit" class="auth-btn" data-astro-cid-iewcbn5q>Create Account</button> <p class="auth-legal" data-astro-cid-iewcbn5q>\nBy creating an account you agree to our\n<a href="/terms-and-conditions" data-astro-cid-iewcbn5q>Terms</a> and\n<a href="/privacy-policy" data-astro-cid-iewcbn5q>Privacy Policy</a>.\n</p> </form> <p class="auth-switch" data-astro-cid-iewcbn5q>\nAlready have an account? <a', " data-astro-cid-iewcbn5q>Sign in</a> </p> </div> </div> "])), maybeRenderHead(), addAttribute(googleLoginUri, "data-login_uri"), addAttribute(returnTo, "data-state"), addAttribute(values.displayName, "value"), errors.displayName && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.displayName}</span>`, addAttribute(values.username, "value"), errors.username && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.username}</span>`, addAttribute(values.email, "value"), errors.email && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.email}</span>`, errors.password && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.password}</span>`, errors.confirm && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.confirm}</span>`, errors.recaptcha && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.recaptcha}</span>`, addAttribute(`/auth/login?from=${encodeURIComponent(returnTo)}`, "href")) })}`;
}, "D:/AI News/dailyaimail/src/pages/auth/register.astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/auth/register.astro";
const $$url = "/auth/register.html";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
