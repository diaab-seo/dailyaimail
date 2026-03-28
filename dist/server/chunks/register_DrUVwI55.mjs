globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_zn3I2eem.mjs";
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, c as addAttribute } from "./worker-entry_CFnXz0Lq.mjs";
import { env } from "cloudflare:workers";
import { $ as $$Layout } from "./Layout_de7tdTND.mjs";
import { g as getSession } from "./auth_DBUpFZ-m.mjs";
import { e as getUserByEmail, h as getUserByUsername, i as createUser, m as makeInitials } from "./db_CvwxfDxg.mjs";
import { h as hashPassword } from "./password_2Yxh1Nin.mjs";
const prerender = false;
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Register;
  const db = env.DB;
  const kv = env.SESSION;
  const user = await getSession(kv, Astro2.cookies);
  if (user) return Astro2.redirect("/");
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
      return Astro2.redirect("/auth/login?registered=1");
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Create Account — Daily AI Mail", "metaTitle": "Create Account — Daily AI Mail", "data-astro-cid-iewcbn5q": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="auth-wrap" data-astro-cid-iewcbn5q> <div class="auth-card" data-astro-cid-iewcbn5q> <a href="/" class="auth-brand" data-astro-cid-iewcbn5q>Daily <em data-astro-cid-iewcbn5q>AI</em> Mail</a> <h1 class="auth-title" data-astro-cid-iewcbn5q>Create your account</h1> <p class="auth-sub" data-astro-cid-iewcbn5q>
Join Daily AI Mail to leave comments and engage with our
                community.
</p> <form method="POST" class="auth-form" novalidate data-astro-cid-iewcbn5q> <div class="field" data-astro-cid-iewcbn5q> <label for="displayName" data-astro-cid-iewcbn5q>Display Name</label> <input id="displayName" name="displayName" type="text"${addAttribute(values.displayName, "value")} placeholder="Your full name or alias" autocomplete="name" required data-astro-cid-iewcbn5q> ${errors.displayName && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.displayName}</span>`} </div> <div class="field" data-astro-cid-iewcbn5q> <label for="username" data-astro-cid-iewcbn5q>Username</label> <input id="username" name="username" type="text"${addAttribute(values.username, "value")} placeholder="e.g. john_doe" autocomplete="username" required data-astro-cid-iewcbn5q> ${errors.username && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.username}</span>`} <span class="field-hint" data-astro-cid-iewcbn5q>Letters, numbers and underscores only.</span> </div> <div class="field" data-astro-cid-iewcbn5q> <label for="email" data-astro-cid-iewcbn5q>Email Address</label> <input id="email" name="email" type="email"${addAttribute(values.email, "value")} placeholder="you@example.com" autocomplete="email" required data-astro-cid-iewcbn5q> ${errors.email && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.email}</span>`} </div> <div class="field" data-astro-cid-iewcbn5q> <label for="password" data-astro-cid-iewcbn5q>Password</label> <input id="password" name="password" type="password" placeholder="At least 8 characters" autocomplete="new-password" required data-astro-cid-iewcbn5q> ${errors.password && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.password}</span>`} </div> <div class="field" data-astro-cid-iewcbn5q> <label for="confirm" data-astro-cid-iewcbn5q>Confirm Password</label> <input id="confirm" name="confirm" type="password" placeholder="Repeat your password" autocomplete="new-password" required data-astro-cid-iewcbn5q> ${errors.confirm && renderTemplate`<span class="field-err" data-astro-cid-iewcbn5q>${errors.confirm}</span>`} </div> <button type="submit" class="auth-btn" data-astro-cid-iewcbn5q>Create Account</button> <p class="auth-legal" data-astro-cid-iewcbn5q>
By creating an account you agree to our
<a href="/terms-and-conditions" data-astro-cid-iewcbn5q>Terms</a> and
<a href="/privacy-policy" data-astro-cid-iewcbn5q>Privacy Policy</a>.
</p> </form> <p class="auth-switch" data-astro-cid-iewcbn5q>
Already have an account? <a href="/auth/login" data-astro-cid-iewcbn5q>Sign in</a> </p> </div> </div> ` })}`;
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
