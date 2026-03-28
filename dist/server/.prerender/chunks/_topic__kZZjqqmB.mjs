globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate } from "./worker-entry_DXJ3ent8.mjs";
import { a as getAllCategories, d as topicToSlug, b as getArticlesByCategory } from "./articles_CSfOZ2Bv.mjs";
import { $ as $$TopicLayout } from "./TopicLayout_DDH1cgHK.mjs";
async function getStaticPaths() {
  const categories = await getAllCategories();
  return categories.map((tag) => ({
    params: { topic: topicToSlug(tag) },
    props: { tag }
  }));
}
const $$topic = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$topic;
  const { tag } = Astro2.props;
  const articles = await getArticlesByCategory(tag);
  return renderTemplate`${renderComponent($$result, "TopicLayout", $$TopicLayout, { "tag": tag, "articles": articles })}`;
}, "D:/AI News/dailyaimail/src/pages/topics/[topic].astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/topics/[topic].astro";
const $$url = "/topics/[topic].html";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$topic,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
