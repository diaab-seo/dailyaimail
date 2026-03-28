globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate } from "./worker-entry_DXJ3ent8.mjs";
import { a as getAllCategories, b as getArticlesByCategory, d as topicToSlug } from "./articles_CSfOZ2Bv.mjs";
import { $ as $$TopicLayout } from "./TopicLayout_DDH1cgHK.mjs";
async function getStaticPaths({ paginate }) {
  const categories = await getAllCategories();
  const paths = await Promise.all(
    categories.map(async (tag) => {
      const articles = await getArticlesByCategory(tag);
      return paginate(articles.sort((a, b) => b.isoDate.localeCompare(a.isoDate)), {
        params: { topic: topicToSlug(tag) },
        props: { tag },
        pageSize: 12
      });
    })
  );
  return paths.flat();
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const { tag, page: page2 } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "TopicLayout", $$TopicLayout, { "tag": tag, "articles": page2.data, "page": page2 })}`;
}, "D:/AI News/dailyaimail/src/pages/topics/[topic]/[...page].astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/topics/[topic]/[...page].astro";
const $$url = "/topics/[topic]/[...page].html";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
