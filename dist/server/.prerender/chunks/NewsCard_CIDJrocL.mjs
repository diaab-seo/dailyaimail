globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { m as maybeRenderHead, b as addAttribute, a as renderTemplate } from "./worker-entry_DXJ3ent8.mjs";
const $$NewsCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NewsCard;
  const {
    tag,
    headline,
    excerpt,
    date,
    author,
    image,
    href = "#",
    readingTime
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="news-card" data-astro-cid-ibl2wg7k> <figure class="card-img" data-astro-cid-ibl2wg7k> ${image ? renderTemplate`<img${addAttribute(image, "src")}${addAttribute(headline, "alt")} width="400" height="220" loading="lazy" data-astro-cid-ibl2wg7k>` : renderTemplate`<div class="card-img-icon" data-astro-cid-ibl2wg7k> <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-ibl2wg7k> <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-astro-cid-ibl2wg7k></path> </svg> </div>`} </figure> <div class="card-body" data-astro-cid-ibl2wg7k> <span class="card-tag" data-astro-cid-ibl2wg7k>${tag}</span> <h3 class="card-headline" data-astro-cid-ibl2wg7k>${headline}</h3> <p class="card-excerpt" data-astro-cid-ibl2wg7k>${excerpt}</p> <footer class="card-footer" data-astro-cid-ibl2wg7k> <span class="card-date" data-astro-cid-ibl2wg7k>${date}${readingTime ? ` · ${readingTime}` : ""}</span> <span class="card-cta" data-astro-cid-ibl2wg7k>View More →</span> </footer> </div> </a>`;
}, "D:/AI News/dailyaimail/src/components/NewsCard.astro", void 0);
export {
  $$NewsCard as $
};
