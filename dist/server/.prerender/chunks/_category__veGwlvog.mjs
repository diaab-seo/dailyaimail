globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate } from "./worker-entry_DXJ3ent8.mjs";
import { a as getAllCategories, c as categoryToSlug, b as getArticlesByCategory } from "./articles_CSfOZ2Bv.mjs";
import { $ as $$CategoryLayout } from "./CategoryLayout_DmIOwtzz.mjs";
async function getStaticPaths() {
  const categories = await getAllCategories();
  return categories.map((tag) => ({
    params: { category: categoryToSlug(tag) },
    props: { tag }
  }));
}
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$category;
  const { tag } = Astro2.props;
  const articles = await getArticlesByCategory(tag);
  return renderTemplate`${renderComponent($$result, "CategoryLayout", $$CategoryLayout, { "tag": tag, "articles": articles })}`;
}, "D:/AI News/dailyaimail/src/pages/category/[category].astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/category/[category].astro";
const $$url = "/category/[category].html";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$category,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
