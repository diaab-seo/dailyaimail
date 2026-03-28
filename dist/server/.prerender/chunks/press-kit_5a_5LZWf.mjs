globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate, u as unescapeHTML } from "./worker-entry_DXJ3ent8.mjs";
import { $ as $$PageLayout } from "./PageLayout_E3qNZbBe.mjs";
const html = () => '<h2 id="press-kit">Press Kit</h2>\n<p>Content coming soon.</p>';
const frontmatter = { "layout": "../layouts/PageLayout.astro", "title": "Press Kit", "metaTitle": "Press Kit — Daily AI Mail", "description": "Media resources, logos and contact details for press and media enquiries.", "publishDate": "2026-01-01", "lastModified": "2026-03-15", "author": "Daily AI Mail Editorial Staff" };
const file = "D:/AI News/dailyaimail/src/pages/press-kit.md";
const url = "/press-kit.html";
function rawContent() {
  return "   \n                                   \n                  \n                                      \n                                                                                        \n                         \n                          \n                                       \n   \n\n## Press Kit\n\nContent coming soon.\n";
}
async function compiledContent() {
  return await html();
}
function getHeadings() {
  return [{ "depth": 2, "slug": "press-kit", "text": "Press Kit" }];
}
const Content = createComponent((result, _props, slots) => {
  const { layout, ...content } = frontmatter;
  content.file = file;
  content.url = url;
  return renderTemplate`${renderComponent(result, "Layout", $$PageLayout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    rawContent,
    compiledContent,
    "server:root": true
  }, {
    "default": () => renderTemplate`${unescapeHTML(html())}`
  })}`;
});
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Content,
  compiledContent,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  rawContent,
  url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
