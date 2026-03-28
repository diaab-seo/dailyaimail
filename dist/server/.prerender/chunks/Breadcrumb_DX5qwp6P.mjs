globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { m as maybeRenderHead, b as addAttribute, r as renderComponent, F as Fragment, a as renderTemplate } from "./worker-entry_DXJ3ent8.mjs";
const $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Breadcrumb;
  const { items, class: extraClass = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav${addAttribute(`breadcrumb ${extraClass}`, "class")} aria-label="Breadcrumb"> <div class="breadcrumb-inner"> <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList"> ${items.map((item, i) => renderTemplate`<li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"> ${i < items.length - 1 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(item.href, "href")} class="breadcrumb-link" itemprop="item"> <span itemprop="name">${item.label}</span> </a> <meta itemprop="position"${addAttribute(String(i + 1), "content")}> <span class="breadcrumb-sep" aria-hidden="true">
›
</span> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="breadcrumb-current" aria-current="page" itemprop="name"> ${item.label} </span> <meta itemprop="position"${addAttribute(String(i + 1), "content")}> ` })}`} </li>`)} </ol> </div> </nav>`;
}, "D:/AI News/dailyaimail/src/components/Breadcrumb.astro", void 0);
export {
  $$Breadcrumb as $
};
