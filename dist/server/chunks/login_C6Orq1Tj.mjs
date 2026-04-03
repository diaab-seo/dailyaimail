globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_CspnrLXO.mjs";
import { l as renderComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead } from "./worker-entry_cIrlCqGz.mjs";
import { env } from "cloudflare:workers";
import { $ as $$Layout } from "./Layout_BNDKqGA3.mjs";
import { g as getSession, c as createSession } from "./auth_DBUpFZ-m.mjs";
import { b as getUserByEmail, u as updateLastLogin } from "./db_DccF6XuO.mjs";
import { v as verifyPassword } from "./password_2Yxh1Nin.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const db = env.DB;
  const kv = env.SESSION;
  const user = await getSession(kv, Astro2.cookies);
  if (user) return Astro2.redirect("/");
  const registered = Astro2.url.searchParams.get("registered") === "1";
  const returnTo = Astro2.url.searchParams.get("from") ?? "/";
  const googleLoginUri = `/auth/google?from=${encodeURIComponent(returnTo)}`;
  let error = "";
  let email = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    email = (form.get("email") ?? "").trim().toLowerCase();
    const password = form.get("password") ?? "";
    if (!email || !password) {
      error = "Email and password are required.";
    } else {
      const dbUser = await getUserByEmail(db, email);
      const valid = dbUser ? await verifyPassword(
        password,
        dbUser.password_hash,
        dbUser.password_salt
      ) : false;
      if (!valid || !dbUser) {
        error = "Invalid email or password.";
      } else {
        const sessionUser = {
          id: dbUser.id,
          email: dbUser.email,
          username: dbUser.username,
          displayName: dbUser.display_name,
          avatarInitials: dbUser.avatar_initials,
          role: dbUser.role
        };
        const ip = Astro2.request.headers.get("CF-Connecting-IP") ?? void 0;
        const ua = Astro2.request.headers.get("User-Agent") ?? void 0;
        await createSession(kv, Astro2.cookies, sessionUser, { ip, ua });
        await updateLastLogin(db, dbUser.id);
        return Astro2.redirect(returnTo);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign In — Daily AI Mail", "metaTitle": "Sign In — Daily AI Mail", "data-astro-cid-j7y7d5ql": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="auth-wrap" data-astro-cid-j7y7d5ql> <div class="auth-card" data-astro-cid-j7y7d5ql> <a href="/" class="auth-brand" data-astro-cid-j7y7d5ql>Daily <em data-astro-cid-j7y7d5ql>AI</em> Mail</a> <h1 class="auth-title" data-astro-cid-j7y7d5ql>Sign in</h1> ', " ", ' <!-- Google Identity Services --> <script src="https://accounts.google.com/gsi/client" async defer><\/script> <div id="g_id_onload" data-client_id="211980990853-n9806238qr51qtn69h914ed1nbv5a8m0.apps.googleusercontent.com"', "", ' data-auto_prompt="false" data-astro-cid-j7y7d5ql></div> <div class="google-btn-wrapper" data-astro-cid-j7y7d5ql> <div class="g_id_signin" data-type="standard" data-size="large" data-theme="outline" data-text="sign_in_with" data-shape="rectangular" data-logo_alignment="left" data-astro-cid-j7y7d5ql></div> </div> <div class="auth-divider" data-astro-cid-j7y7d5ql> <span data-astro-cid-j7y7d5ql>or continue with email</span> </div> <form method="POST" class="auth-form" data-astro-cid-j7y7d5ql> <input type="hidden" name="from"', ' data-astro-cid-j7y7d5ql> <div class="field" data-astro-cid-j7y7d5ql> <label for="email" data-astro-cid-j7y7d5ql>Email Address</label> <input id="email" name="email" type="email"', ` placeholder="you@example.com" autocomplete="email" required data-astro-cid-j7y7d5ql> </div> <div class="field" data-astro-cid-j7y7d5ql> <label for="password" data-astro-cid-j7y7d5ql>Password</label> <input id="password" name="password" type="password" placeholder="Your password" autocomplete="current-password" required data-astro-cid-j7y7d5ql> </div> <button type="submit" class="auth-btn" data-astro-cid-j7y7d5ql>Sign In</button> </form> <p class="auth-switch" data-astro-cid-j7y7d5ql>
Don't have an account? <a`, " data-astro-cid-j7y7d5ql>Create one</a> </p> </div> </div> "])), maybeRenderHead(), registered && renderTemplate`<div class="auth-notice auth-notice--success" data-astro-cid-j7y7d5ql>
Account created successfully. You can now sign in.
</div>`, error && renderTemplate`<div class="auth-notice auth-notice--error" data-astro-cid-j7y7d5ql>${error}</div>`, addAttribute(googleLoginUri, "data-login_uri"), addAttribute(returnTo, "data-state"), addAttribute(returnTo, "value"), addAttribute(email, "value"), addAttribute(`/auth/register?from=${encodeURIComponent(returnTo)}`, "href")) })}`;
}, "D:/AI News/dailyaimail/src/pages/auth/login.astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/auth/login.astro";
const $$url = "/auth/login.html";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
