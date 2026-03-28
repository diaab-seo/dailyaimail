globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { m as maybeRenderHead, b as addAttribute, a as renderTemplate } from "./worker-entry_DXJ3ent8.mjs";
const $$PaginationNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PaginationNav;
  const { page } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Pagination" class="pagination-nav" data-astro-cid-6iyjdpbu> ${page.url.prev ? renderTemplate`<a${addAttribute(page.url.prev, "href")} class="action-btn prev-btn" data-astro-cid-6iyjdpbu>← Previous</a>` : renderTemplate`<span class="action-btn prev-btn disabled" data-astro-cid-6iyjdpbu>← Previous</span>`} <span class="page-info" data-astro-cid-6iyjdpbu>Page ${page.currentPage} of ${page.lastPage}</span> ${page.url.next ? renderTemplate`<a${addAttribute(page.url.next, "href")} class="action-btn next-btn" data-astro-cid-6iyjdpbu>Next →</a>` : renderTemplate`<span class="action-btn next-btn disabled" data-astro-cid-6iyjdpbu>Next →</span>`} </nav>`;
}, "D:/AI News/dailyaimail/src/components/PaginationNav.astro", void 0);
export {
  $$PaginationNav as $
};
