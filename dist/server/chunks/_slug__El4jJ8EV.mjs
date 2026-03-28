globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_zn3I2eem.mjs";
import { d as renderElement, s as spreadAttributes, u as unescapeHTML, b as renderTemplate, e as removeBase, i as isRemotePath, f as unflatten, o as object, g as date, h as array, A as AstroError, U as UnknownContentCollectionError, R as RenderUndefinedEntryError, j as escape, k as string, p as prependForwardSlash, l as createHeadAndContent, r as renderComponent, m as maybeRenderHead, c as addAttribute, F as Fragment, n as renderSlot } from "./worker-entry_CFnXz0Lq.mjs";
import { V as VALID_INPUT_FORMATS } from "./consts_DCUS4NoK.mjs";
import { env } from "cloudflare:workers";
import { r as renderScript, $ as $$Layout, a as $$NewsletterForm } from "./Layout_de7tdTND.mjs";
import { f as formatDate, b as getApprovedComments } from "./db_CvwxfDxg.mjs";
import { g as getSession } from "./auth_DBUpFZ-m.mjs";
function renderScriptElement({ props, children }) {
  return renderElement("script", {
    props,
    children
  });
}
function renderUniqueStylesheet(result, sheet) {
  if (sheet.type === "external") {
    if (Array.from(result.styles).some((s2) => s2.props.href === sheet.src)) return "";
    return renderElement("link", { props: { rel: "stylesheet", href: sheet.src }, children: "" });
  }
  if (sheet.type === "inline") {
    if (Array.from(result.styles).some((s2) => s2.children.includes(sheet.content))) return "";
    return renderElement("style", { props: {}, children: sheet.content });
  }
}
var e = (e2) => Object.prototype.toString.call(e2), t = (e2) => ArrayBuffer.isView(e2) && !(e2 instanceof DataView), o = (t2) => "[object Date]" === e(t2), n = (t2) => "[object RegExp]" === e(t2), r = (t2) => "[object Error]" === e(t2), s = (t2) => "[object Boolean]" === e(t2), l = (t2) => "[object Number]" === e(t2), i = (t2) => "[object String]" === e(t2), c = Array.isArray, u = Object.getOwnPropertyDescriptor, a = Object.prototype.propertyIsEnumerable, f = Object.getOwnPropertySymbols, p = Object.prototype.hasOwnProperty, h = Object.keys;
function d(e2) {
  const t2 = h(e2), o2 = f(e2);
  for (let n2 = 0; n2 < o2.length; n2++) a.call(e2, o2[n2]) && t2.push(o2[n2]);
  return t2;
}
function b(e2, t2) {
  return !u(e2, t2)?.writable;
}
function y(e2, u2) {
  if ("object" == typeof e2 && null !== e2) {
    let a2;
    if (c(e2)) a2 = [];
    else if (o(e2)) a2 = new Date(e2.getTime ? e2.getTime() : e2);
    else if (n(e2)) a2 = new RegExp(e2);
    else if (r(e2)) a2 = { message: e2.message };
    else if (s(e2) || l(e2) || i(e2)) a2 = Object(e2);
    else {
      if (t(e2)) return e2.slice();
      a2 = Object.create(Object.getPrototypeOf(e2));
    }
    const f2 = u2.includeSymbols ? d : h;
    for (const t2 of f2(e2)) a2[t2] = e2[t2];
    return a2;
  }
  return e2;
}
var g = { includeSymbols: false, immutable: false };
function m(e2, t2, o2 = g) {
  const n2 = [], r2 = [];
  let s2 = true;
  const l2 = o2.includeSymbols ? d : h, i2 = !!o2.immutable;
  return (function e3(u2) {
    const a2 = i2 ? y(u2, o2) : u2, f2 = {};
    let h2 = true;
    const d2 = { node: a2, node_: u2, path: [].concat(n2), parent: r2[r2.length - 1], parents: r2, key: n2[n2.length - 1], isRoot: 0 === n2.length, level: n2.length, circular: void 0, isLeaf: false, notLeaf: true, notRoot: true, isFirst: false, isLast: false, update: function(e4, t3 = false) {
      d2.isRoot || (d2.parent.node[d2.key] = e4), d2.node = e4, t3 && (h2 = false);
    }, delete: function(e4) {
      delete d2.parent.node[d2.key], e4 && (h2 = false);
    }, remove: function(e4) {
      c(d2.parent.node) ? d2.parent.node.splice(d2.key, 1) : delete d2.parent.node[d2.key], e4 && (h2 = false);
    }, keys: null, before: function(e4) {
      f2.before = e4;
    }, after: function(e4) {
      f2.after = e4;
    }, pre: function(e4) {
      f2.pre = e4;
    }, post: function(e4) {
      f2.post = e4;
    }, stop: function() {
      s2 = false;
    }, block: function() {
      h2 = false;
    } };
    if (!s2) return d2;
    function g2() {
      if ("object" == typeof d2.node && null !== d2.node) {
        d2.keys && d2.node_ === d2.node || (d2.keys = l2(d2.node)), d2.isLeaf = 0 === d2.keys.length;
        for (let e4 = 0; e4 < r2.length; e4++) if (r2[e4].node_ === u2) {
          d2.circular = r2[e4];
          break;
        }
      } else d2.isLeaf = true, d2.keys = null;
      d2.notLeaf = !d2.isLeaf, d2.notRoot = !d2.isRoot;
    }
    g2();
    const m2 = t2(d2, d2.node);
    if (void 0 !== m2 && d2.update && d2.update(m2), f2.before && f2.before(d2, d2.node), !h2) return d2;
    if ("object" == typeof d2.node && null !== d2.node && !d2.circular) {
      r2.push(d2), g2();
      for (const [t3, o3] of Object.entries(d2.keys ?? [])) {
        n2.push(o3), f2.pre && f2.pre(d2, d2.node[o3], o3);
        const r3 = e3(d2.node[o3]);
        i2 && p.call(d2.node, o3) && !b(d2.node, o3) && (d2.node[o3] = r3.node), r3.isLast = !!d2.keys?.length && +t3 == d2.keys.length - 1, r3.isFirst = 0 == +t3, f2.post && f2.post(d2, r3), n2.pop();
      }
      r2.pop();
    }
    return f2.after && f2.after(d2, d2.node), d2;
  })(e2).node;
}
var j = class {
  #e;
  #t;
  constructor(e2, t2 = g) {
    this.#e = e2, this.#t = t2;
  }
  get(e2) {
    let t2 = this.#e;
    for (let o2 = 0; t2 && o2 < e2.length; o2++) {
      const n2 = e2[o2];
      if (!p.call(t2, n2) || !this.#t.includeSymbols && "symbol" == typeof n2) return;
      t2 = t2[n2];
    }
    return t2;
  }
  has(e2) {
    let t2 = this.#e;
    for (let o2 = 0; t2 && o2 < e2.length; o2++) {
      const n2 = e2[o2];
      if (!p.call(t2, n2) || !this.#t.includeSymbols && "symbol" == typeof n2) return false;
      t2 = t2[n2];
    }
    return true;
  }
  set(e2, t2) {
    let o2 = this.#e, n2 = 0;
    for (n2 = 0; n2 < e2.length - 1; n2++) {
      const t3 = e2[n2];
      p.call(o2, t3) || (o2[t3] = {}), o2 = o2[t3];
    }
    return o2[e2[n2]] = t2, t2;
  }
  map(e2) {
    return m(this.#e, e2, { immutable: true, includeSymbols: !!this.#t.includeSymbols });
  }
  forEach(e2) {
    return this.#e = m(this.#e, e2, this.#t), this.#e;
  }
  reduce(e2, t2) {
    const o2 = 1 === arguments.length;
    let n2 = o2 ? this.#e : t2;
    return this.forEach(((t3, r2) => {
      t3.isRoot && o2 || (n2 = e2(t3, n2, r2));
    })), n2;
  }
  paths() {
    const e2 = [];
    return this.forEach(((t2) => {
      e2.push(t2.path);
    })), e2;
  }
  nodes() {
    const e2 = [];
    return this.forEach(((t2) => {
      e2.push(t2.node);
    })), e2;
  }
  clone() {
    const e2 = [], o2 = [], n2 = this.#t;
    return t(this.#e) ? this.#e.slice() : (function t2(r2) {
      for (let t3 = 0; t3 < e2.length; t3++) if (e2[t3] === r2) return o2[t3];
      if ("object" == typeof r2 && null !== r2) {
        const s2 = y(r2, n2);
        e2.push(r2), o2.push(s2);
        const l2 = n2.includeSymbols ? d : h;
        for (const e3 of l2(r2)) s2[e3] = t2(r2[e3]);
        return e2.pop(), o2.pop(), s2;
      }
      return r2;
    })(this.#e);
  }
};
function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}
const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}
class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import("./_astro_data-layer-content_OiOWL84q.mjs");
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();
object({
  tags: array(string()).optional(),
  lastModified: date().optional()
});
function createGetCollection({
  liveCollections: liveCollections2
}) {
  return async function getCollection2(collection, filter) {
    if (collection in liveCollections2) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import("./content-assets_CL5hQMHo.mjs");
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import("./content-assets_CL5hQMHo.mjs");
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import("./_astro_assets_CiVR_CDy.mjs").then((n2) => n2._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...{}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new j(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        if (imported.__svgData) {
          const { __svgData: svgData, ...meta } = imported;
          ctx.update(createSvgComponent({ meta, ...svgData }));
        } else {
          ctx.update(imported);
        }
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import("./content-modules_Uxt4s84c.mjs");
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e2) {
      console.error(e2);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: isRemotePath(link) ? link : prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}
const liveCollections = {};
const getCollection = createGetCollection({
  liveCollections
});
const $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Breadcrumb;
  const { items, class: extraClass = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav${addAttribute(`breadcrumb ${extraClass}`, "class")} aria-label="Breadcrumb"> <div class="breadcrumb-inner"> <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList"> ${items.map((item, i2) => renderTemplate`<li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"> ${i2 < items.length - 1 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a${addAttribute(item.href, "href")} class="breadcrumb-link" itemprop="item"> <span itemprop="name">${item.label}</span> </a> <meta itemprop="position"${addAttribute(String(i2 + 1), "content")}> <span class="breadcrumb-sep" aria-hidden="true">
›
</span> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="breadcrumb-current" aria-current="page" itemprop="name"> ${item.label} </span> <meta itemprop="position"${addAttribute(String(i2 + 1), "content")}> ` })}`} </li>`)} </ol> </div> </nav>`;
}, "D:/AI News/dailyaimail/src/components/Breadcrumb.astro", void 0);
async function fetchArticles() {
  const entries = await getCollection("articles");
  return entries.map((e2) => ({
    slug: e2.id,
    tag: e2.data.tag,
    tags: [.../* @__PURE__ */ new Set([e2.data.tag, ...e2.data.tags ?? []])],
    headline: e2.data.headline,
    excerpt: e2.data.excerpt,
    body: e2.body ?? "",
    date: e2.data.date,
    isoDate: e2.data.isoDate,
    modifiedDate: e2.data.modifiedDate ?? e2.data.isoDate,
    author: e2.data.author,
    authorUrl: e2.data.authorUrl ?? "",
    readingTime: e2.data.readingTime,
    image: e2.data.image,
    imageWidth: e2.data.imageWidth,
    imageHeight: e2.data.imageHeight,
    imageCaption: e2.data.imageCaption,
    keywords: e2.data.keywords ?? [e2.data.tag],
    articleSection: e2.data.articleSection ?? [e2.data.tag],
    mentions: e2.data.mentions ?? [],
    about: e2.data.about ?? [],
    citations: e2.data.citations ?? []
  }));
}
async function getArticlesByCategory(tag) {
  const a2 = await fetchArticles();
  return a2.filter((x) => x.tags.includes(tag));
}
function topicToSlug(tag) {
  return tag.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
}
function tagColor(tag) {
  const map = {
    "Anthropic": "var(--tag-anthropic)",
    "Google AI": "var(--tag-google)",
    "OpenAI": "var(--tag-openai)",
    "Meta AI": "var(--tag-meta)",
    "Tools & Apps": "var(--tag-tools)",
    "Policy & Ethics": "var(--tag-policy)"
  };
  return map[tag] ?? "var(--tag-default)";
}
function stripMarkdown(md) {
  return md.replace(/^#{1,6}\s+/gm, "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/`{1,3}[^`]*`{1,3}/g, "").replace(/\[(.+?)\]\(.+?\)/g, "$1").replace(/^\s*[-*+]\s/gm, "").replace(/^\s*\d+\.\s/gm, "").replace(/\n{3,}/g, "\n\n").trim();
}
function extractImages(md) {
  const images = [];
  const mdRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  while ((match = mdRegex.exec(md)) !== null) {
    if (match[1]) images.push(match[1]);
  }
  const htmlRegex = /<img.*?src=["'](.*?)["'].*?>/g;
  while ((match = htmlRegex.exec(md)) !== null) {
    if (match[1]) images.push(match[1]);
  }
  return [...new Set(images)];
}
const $$CommentSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CommentSection;
  const { articleSlug, comments, user } = Astro2.props;
  const submitted = Astro2.url.searchParams.get("commented") === "1";
  const tooLong = Astro2.url.searchParams.get("err") === "toolong";
  return renderTemplate`${maybeRenderHead()}<section class="comments-section" id="comments" aria-label="Comments" data-astro-cid-fdrkzv5s> <h2 class="comments-heading" data-astro-cid-fdrkzv5s> ${comments.length > 0 ? `${comments.length} Comment${comments.length !== 1 ? "s" : ""}` : "Comments"} </h2>  ${comments.length > 0 ? renderTemplate`<ol class="comments-list" data-astro-cid-fdrkzv5s> ${comments.map((c2) => renderTemplate`<li class="comment"${addAttribute(`comment-${c2.id}`, "id")} data-astro-cid-fdrkzv5s> <div class="comment-avatar" aria-hidden="true" data-astro-cid-fdrkzv5s> ${c2.avatar_initials ?? "??"} </div> <div class="comment-body-wrap" data-astro-cid-fdrkzv5s> <header class="comment-header" data-astro-cid-fdrkzv5s> <span class="comment-author" data-astro-cid-fdrkzv5s> ${c2.display_name} </span> <time class="comment-date"${addAttribute(c2.created_at, "datetime")} data-astro-cid-fdrkzv5s> ${formatDate(c2.created_at)} </time> <a${addAttribute(`#comment-${c2.id}`, "href")} class="comment-permalink" aria-label="Permalink to comment" data-astro-cid-fdrkzv5s>
#
</a> </header> <p class="comment-text" data-astro-cid-fdrkzv5s>${c2.body}</p> </div> </li>`)} </ol>` : renderTemplate`<p class="comments-empty" data-astro-cid-fdrkzv5s>
No comments yet. Be the first to share your thoughts.
</p>`}  <div class="comment-form-area" data-astro-cid-fdrkzv5s> ${submitted && renderTemplate`<div class="comment-notice comment-notice--success" data-astro-cid-fdrkzv5s>
Your comment has been submitted and is awaiting moderation.
                    It will appear here once approved.
</div>`} ${tooLong && renderTemplate`<div class="comment-notice comment-notice--error" data-astro-cid-fdrkzv5s>
Comment is too long. Please keep it under 2,000 characters.
</div>`} ${user ? renderTemplate`<form method="POST"${addAttribute(`/api/comments/submit`, "action")} class="comment-form" data-astro-cid-fdrkzv5s> <input type="hidden" name="articleSlug"${addAttribute(articleSlug, "value")} data-astro-cid-fdrkzv5s> <div class="cf-user-row" data-astro-cid-fdrkzv5s> <div class="cf-avatar" data-astro-cid-fdrkzv5s>${user.avatarInitials}</div> <span class="cf-username" data-astro-cid-fdrkzv5s>
Commenting as <strong data-astro-cid-fdrkzv5s>${user.displayName}</strong> </span> </div> <textarea name="body" rows="4" maxlength="2000" placeholder="Share your thoughts on this article..." required class="cf-textarea" data-astro-cid-fdrkzv5s></textarea> <div class="cf-footer" data-astro-cid-fdrkzv5s> <span class="cf-chars" id="char-count" data-astro-cid-fdrkzv5s>
0 / 2000
</span> <button type="submit" class="cf-submit" data-astro-cid-fdrkzv5s>
Post Comment
</button> </div> <p class="cf-moderation-note" data-astro-cid-fdrkzv5s>
Comments are moderated before appearing. Please keep
                        discussion respectful and on-topic.
</p> </form>` : renderTemplate`<div class="comment-auth-prompt" data-astro-cid-fdrkzv5s> <p data-astro-cid-fdrkzv5s> <a${addAttribute(`/auth/login?from=${encodeURIComponent(Astro2.url.pathname)}`, "href")} class="comment-sign-in" data-astro-cid-fdrkzv5s>
Sign in
</a>
or
<a href="/auth/register" class="comment-sign-in" data-astro-cid-fdrkzv5s>
create an account
</a>
to leave a comment.
</p> </div>`} </div> </section> ${renderScript($$result, "D:/AI News/dailyaimail/src/components/CommentSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/AI News/dailyaimail/src/components/CommentSection.astro", void 0);
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ArticleLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ArticleLayout;
  const { article, comments = [], user = null } = Astro2.props;
  const color = tagColor(article.tag);
  const related = (await getArticlesByCategory(article.tag)).filter((a2) => a2.slug !== article.slug).slice(0, 3);
  const SITE_URL = "https://dailyaimail.news";
  const articleUrl = `${SITE_URL}/articles/${article.slug}`;
  const pubDate = `${article.isoDate}T00:00:00+00:00`;
  const modDate = `${article.modifiedDate ?? article.isoDate}T00:00:00+00:00`;
  const wordCount = article.body.trim().split(/\s+/).length;
  const plainBody = stripMarkdown(article.body);
  const hasImage = Boolean(article.image);
  const imageUrl = hasImage ? `${SITE_URL}${article.image}` : null;
  const logoUrl = `${SITE_URL}/dark-logo.svg`;
  const inlineImages = extractImages(article.body).map(
    (img) => img.startsWith("http") ? img : `${SITE_URL}${img.startsWith("/") ? "" : "/"}${img}`
  );
  const allImagesSchema = [
    ...hasImage ? [{ "@id": `${articleUrl}#primaryimage` }] : [],
    ...inlineImages
  ];
  const hasAnyImage = allImagesSchema.length > 0;
  const markdownExport = [
    `# ${article.headline}`,
    ``,
    `> ${article.excerpt}`,
    ``,
    `**Author:** ${article.author}  `,
    `**Published:** ${article.date}  `,
    `**Source:** ${articleUrl}  `,
    `**Reading time:** ${article.readingTime}`,
    ``,
    `---`,
    ``,
    article.body,
    ``,
    `---`,
    `*Originally published on [Daily AI Mail](${SITE_URL})*`
  ].join("\n");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        isPartOf: { "@id": articleUrl },
        headline: article.headline,
        description: article.excerpt,
        articleBody: plainBody,
        datePublished: pubDate,
        dateModified: modDate,
        wordCount,
        author: [{ "@id": "https://dailyaimail.news/#/schema/editorial-team" }],
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: { "@id": articleUrl },
        ...hasAnyImage && {
          image: allImagesSchema
        },
        ...hasImage && {
          thumbnailUrl: imageUrl
        },
        keywords: article.keywords,
        articleSection: article.articleSection,
        inLanguage: "en-US",
        copyrightYear: new Date(article.isoDate).getFullYear().toString(),
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".article-headline", ".article-excerpt"]
        },
        commentCount: comments.length,
        ...article.mentions.length > 0 && {
          mentions: article.mentions.map((m2) => ({
            "@type": m2.type,
            name: m2.name,
            url: m2.url,
            ...m2.sameAs && { sameAs: m2.sameAs }
          }))
        },
        ...article.about.length > 0 && {
          about: article.about.map((m2) => ({
            "@type": m2.type,
            name: m2.name,
            url: m2.url,
            ...m2.sameAs && { sameAs: m2.sameAs }
          }))
        },
        ...article.citations.length > 0 && {
          citation: article.citations.map((c2) => ({
            "@type": c2.type ?? "CreativeWork",
            name: c2.name,
            url: c2.url
          }))
        }
      },
      {
        "@type": "WebPage",
        "@id": articleUrl,
        url: articleUrl,
        name: `${article.headline} | Daily AI Mail`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        datePublished: pubDate,
        dateModified: modDate,
        description: article.excerpt,
        breadcrumb: { "@id": `${articleUrl}#breadcrumb` },
        inLanguage: "en-US",
        ...hasAnyImage && {
          image: allImagesSchema
        },
        ...hasImage && {
          primaryImageOfPage: { "@id": `${articleUrl}#primaryimage` },
          thumbnailUrl: imageUrl
        },
        potentialAction: [{ "@type": "ReadAction", target: [articleUrl] }]
      },
      ...hasImage ? [
        {
          "@type": "ImageObject",
          inLanguage: "en-US",
          "@id": `${articleUrl}#primaryimage`,
          url: imageUrl,
          contentUrl: imageUrl,
          width: article.imageWidth ?? 1200,
          height: article.imageHeight ?? 630,
          caption: article.imageCaption ?? article.headline
        }
      ] : [],
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Topics",
            item: `${SITE_URL}/topics`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.tag,
            item: `${SITE_URL}/topics/${topicToSlug(article.tag)}`
          },
          { "@type": "ListItem", position: 4, name: article.headline }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Daily AI Mail",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US"
      },
      {
        "@type": "NewsMediaOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: "Daily AI Mail",
        url: `${SITE_URL}/`,
        foundingDate: "2026",
        publishingPrinciples: `${SITE_URL}/publishing-principles`,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#/schema/logo/image/`,
          url: logoUrl,
          contentUrl: logoUrl,
          width: 512,
          height: 512,
          caption: "Daily AI Mail"
        },
        image: { "@id": `${SITE_URL}/#/schema/logo/image/` },
        sameAs: [
          "https://twitter.com/dailyaimail",
          "https://linkedin.com/company/dailyaimail",
          ""
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://dailyaimail.news/#/schema/editorial-team",
        "name": "Daily AI Mail Editorial Staff",
        "alternateName": ["Daily AI Mail Editors", "Daily AI Mail Staff Writers", "The Editors"],
        "url": "https://dailyaimail.news/about-us/editorial-team",
        "description": "The Daily AI Mail editorial staff is an independent team of AI journalists, researchers, and analysts with over 15 years of experience covering artificial intelligence, machine learning, and emerging technologies.",
        "memberOf": { "@id": "https://dailyaimail.news/#organization" },
        "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Large Language Models", "AI Safety", "Generative AI", "AI Policy", "AI Ethics", "Neural Networks", "Natural Language Processing", "AI Research", "Technology Journalism"],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Experience",
          "description": "Over 15 years of professional experience in AI journalism and technology reporting"
        },
        "publishingPrinciples": "https://dailyaimail.news/publishing-principles",
        "sameAs": [
          "https://www.facebook.com/dailyaimail/",
          "https://www.linkedin.com/company/dailaimail/",
          "https://x.com/dailyaimail",
          "https://medium.com/@dailyaimail",
          "https://www.reddit.com/user/dailyaimail/"
        ]
      },
      // Comment nodes — only injected when approved comments exist
      ...comments.map((c2) => ({
        "@type": "Comment",
        "@id": `${articleUrl}#comment-${c2.id}`,
        identifier: String(c2.id),
        text: c2.body,
        dateCreated: c2.created_at,
        author: {
          "@type": "Person",
          name: c2.display_name ?? "Anonymous"
        },
        about: { "@id": `${articleUrl}#article` },
        isPartOf: { "@id": articleUrl },
        url: `${articleUrl}#comment-${c2.id}`
      }))
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": article.headline, "description": article.excerpt, "metaTitle": `${article.headline} | Daily AI Mail`, "canonical": articleUrl, "ogType": "article", "ogTitle": article.headline, "ogDescription": article.excerpt, "ogImage": hasImage ? imageUrl : void 0, "ogPublished": pubDate, "ogModified": modDate, "ogAuthor": article.author, "data-astro-cid-zm77yjld": true }, { "default": async ($$result2) => renderTemplate`    ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "items": [
    { label: "Home", href: "/" },
    { label: "Topics", href: "/topics" },
    { label: article.tag, href: `/topics/${topicToSlug(article.tag)}` },
    { label: article.headline }
  ], "data-astro-cid-zm77yjld": true })}  ${maybeRenderHead()}<header class="article-header" data-astro-cid-zm77yjld> <div class="article-header-inner" data-astro-cid-zm77yjld> <span class="article-tag"${addAttribute(`background:${color}18;color:${color};border:1px solid ${color}35;`, "style")} data-astro-cid-zm77yjld>${article.tag}</span> <h1 class="article-headline" data-pagefind-meta="title" data-astro-cid-zm77yjld> ${article.headline} </h1> <p class="article-excerpt" data-astro-cid-zm77yjld>${article.excerpt}</p> <div class="article-meta" data-astro-cid-zm77yjld> <span class="article-author" data-pagefind-meta="author" data-astro-cid-zm77yjld>By <a href="/about-us/editorial-team" data-astro-cid-zm77yjld>${article.author}</a></span> <span class="article-sep" data-astro-cid-zm77yjld>·</span> <time${addAttribute(article.isoDate, "datetime")} data-pagefind-meta="date" data-astro-cid-zm77yjld>${article.date}</time> <span class="article-sep" data-astro-cid-zm77yjld>·</span> <span data-astro-cid-zm77yjld>${article.readingTime}</span> </div> <!-- Action bar: Share (collapsed) + Copy as Markdown --> <div class="action-bar" data-astro-cid-zm77yjld> <!-- Share toggle button --> <div class="share-wrapper" data-astro-cid-zm77yjld> <button class="action-btn share-toggle" id="share-toggle" aria-expanded="false" aria-controls="share-popover"${addAttribute(articleUrl, "data-url")}${addAttribute(article.headline, "data-title")} data-astro-cid-zm77yjld> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-zm77yjld><circle cx="18" cy="5" r="3" data-astro-cid-zm77yjld></circle><circle cx="6" cy="12" r="3" data-astro-cid-zm77yjld></circle><circle cx="18" cy="19" r="3" data-astro-cid-zm77yjld></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" data-astro-cid-zm77yjld></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" data-astro-cid-zm77yjld></line></svg> <span data-astro-cid-zm77yjld>Share</span> <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-zm77yjld><polyline points="6 9 12 15 18 9" data-astro-cid-zm77yjld></polyline></svg> </button> <!-- Share popover --> <div class="share-popover" id="share-popover" role="dialog" aria-label="Share options" hidden data-astro-cid-zm77yjld> <button class="share-item share-item--copy" id="copy-link-btn" data-astro-cid-zm77yjld> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-zm77yjld><rect x="9" y="9" width="13" height="13" rx="2" data-astro-cid-zm77yjld></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" data-astro-cid-zm77yjld></path></svg>
Copy link
</button> <a class="share-item share-item--x" id="share-x" target="_blank" rel="noopener noreferrer" data-astro-cid-zm77yjld> <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-zm77yjld><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-astro-cid-zm77yjld></path></svg>
X / Twitter
</a> <a class="share-item share-item--li" id="share-li" target="_blank" rel="noopener noreferrer" data-astro-cid-zm77yjld> <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-zm77yjld><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" data-astro-cid-zm77yjld></path><rect x="2" y="9" width="4" height="12" data-astro-cid-zm77yjld></rect><circle cx="4" cy="4" r="2" data-astro-cid-zm77yjld></circle></svg>
LinkedIn
</a> <a class="share-item share-item--wa" id="share-wa" target="_blank" rel="noopener noreferrer" data-astro-cid-zm77yjld> <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-zm77yjld><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" data-astro-cid-zm77yjld></path></svg>
WhatsApp
</a> <a class="share-item share-item--fb" id="share-fb" target="_blank" rel="noopener noreferrer" data-astro-cid-zm77yjld> <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-zm77yjld><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" data-astro-cid-zm77yjld></path></svg>
Facebook
</a> <span class="copy-toast" id="copy-toast" data-astro-cid-zm77yjld>Copied!</span> </div> </div> <!-- Copy as Markdown — always visible, for LLMs & AI tools --> <button class="action-btn copy-md-btn" id="copy-md-btn" title="Copy article as Markdown — for use with LLMs and AI tools" data-astro-cid-zm77yjld> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-zm77yjld><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-zm77yjld></path><polyline points="14 2 14 8 20 8" data-astro-cid-zm77yjld></polyline><line x1="16" y1="13" x2="8" y2="13" data-astro-cid-zm77yjld></line><line x1="16" y1="17" x2="8" y2="17" data-astro-cid-zm77yjld></line><polyline points="10 9 9 9 8 9" data-astro-cid-zm77yjld></polyline></svg> <span data-astro-cid-zm77yjld>Copy as Markdown</span> </button> <span class="md-toast" id="md-toast" data-astro-cid-zm77yjld>Copied as Markdown!</span> <!-- Hidden markdown payload --> <template id="article-markdown" data-astro-cid-zm77yjld>${markdownExport}</template> </div> </div> </header>  ${hasImage ? renderTemplate`<figure class="article-hero-img article-hero-img--photo" data-astro-cid-zm77yjld> <img${addAttribute(article.image, "src")}${addAttribute(article.imageCaption ?? article.headline, "alt")}${addAttribute(article.imageWidth ?? 1200, "width")}${addAttribute(article.imageHeight ?? 630, "height")} loading="eager" data-astro-cid-zm77yjld> </figure>` : renderTemplate`<figure class="article-hero-img"${addAttribute(`background:linear-gradient(135deg,${color}15 0%,${color}05 100%);`, "style")} data-astro-cid-zm77yjld> <div class="article-hero-icon"${addAttribute(`color:${color};`, "style")} data-astro-cid-zm77yjld> <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" data-astro-cid-zm77yjld> <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-astro-cid-zm77yjld></path> </svg> </div> </figure>`}<main class="article-layout" data-astro-cid-zm77yjld> <article class="article-body" data-pagefind-body data-astro-cid-zm77yjld> ${renderSlot($$result2, $$slots["default"])} <div id="inline-newsletter-template" style="display: none; margin: 32px 0;" data-astro-cid-zm77yjld> ${renderComponent($$result2, "NewsletterForm", $$NewsletterForm, { "data-astro-cid-zm77yjld": true })} </div> <!-- Filed Under --> <footer class="filed-under" data-astro-cid-zm77yjld> <span class="filed-label" data-astro-cid-zm77yjld>Filed under</span> <div class="filed-tags" data-astro-cid-zm77yjld> ${article.tags.map((t2) => renderTemplate`<a${addAttribute(`/topics/${topicToSlug(t2)}`, "href")} class="filed-tag"${addAttribute(`background:${tagColor(t2)}15;color:${tagColor(t2)};border:1px solid ${tagColor(t2)}35;`, "style")} data-astro-cid-zm77yjld> ${t2} </a>`)} </div> </footer> ${renderComponent($$result2, "CommentSection", $$CommentSection, { "articleSlug": article.slug, "comments": comments, "user": user, "data-astro-cid-zm77yjld": true })} </article> <aside class="article-sidebar" data-astro-cid-zm77yjld> <address class="sidebar-author-box" data-astro-cid-zm77yjld> <a href="/about-us/editorial-team" class="author-avatar" data-astro-cid-zm77yjld> ${article.author.split(" ").map((n2) => n2[0]).join("")} </a> <div data-astro-cid-zm77yjld> <strong class="author-name" data-astro-cid-zm77yjld><a href="/about-us/editorial-team" data-astro-cid-zm77yjld>${article.author}</a></strong> <p class="author-role" data-astro-cid-zm77yjld>Editor, Daily AI Mail</p> </div> </address> <!-- Google Preferred Source --> <div class="google-badge-widget" data-astro-cid-zm77yjld> <p class="google-badge-hint" data-astro-cid-zm77yjld>
Follow us on Google for daily AI updates
</p> <a href="https://google.com/preferences/source?q=dailyaimail.news" target="_blank" rel="noopener noreferrer" class="google-badge-link" aria-label="Add Daily AI Mail as a preferred source on Google" data-astro-cid-zm77yjld> <img id="google-badge-img" src="/badges/google_preferred_source_badge_dark.png" alt="Add as a preferred source on Google" width="196" height="40" class="google-badge" data-astro-cid-zm77yjld> </a> </div> <!-- Related --> ${related.length > 0 && renderTemplate`<section class="related-box"${addAttribute(`More articles in ${article.tag}`, "aria-label")} data-astro-cid-zm77yjld> <p class="related-title" data-astro-cid-zm77yjld>More in ${article.tag}</p> <ul class="related-list" data-astro-cid-zm77yjld> ${related.map((r2) => renderTemplate`<li class="related-item" data-astro-cid-zm77yjld> <a${addAttribute(`/articles/${r2.slug}`, "href")} data-astro-cid-zm77yjld> <span class="related-date" data-astro-cid-zm77yjld>${r2.date}</span> <span class="related-headline" data-astro-cid-zm77yjld>${r2.headline}</span> </a> </li>`)} </ul> </section>`} </aside> </main> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', '<\/script><meta name="robots" content="max-image-preview:large">'])), unescapeHTML(JSON.stringify(schema))) })} ${renderScript($$result, "D:/AI News/dailyaimail/src/layouts/ArticleLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/AI News/dailyaimail/src/layouts/ArticleLayout.astro", void 0);
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const db = env.DB;
  const kv = env.SESSION;
  const { slug } = Astro2.params;
  let user = null;
  let comments = [];
  let error = null;
  let entry = null;
  let Content = null;
  try {
    const entries = await getCollection("articles");
    entry = entries.find((e2) => e2.id === slug);
    if (!entry) return Astro2.redirect("/404");
    const rendered = await renderEntry(entry);
    Content = rendered.Content;
    if (db && kv) {
      [user, comments] = await Promise.all([
        getSession(kv, Astro2.cookies),
        getApprovedComments(db, slug)
      ]);
    }
  } catch (e2) {
    error = e2.message || String(e2);
  }
  if (error) {
    return new Response(`Error rendering article: ${error}`, { status: 500 });
  }
  const article = {
    slug: entry.id,
    tag: entry.data.tag,
    tags: [.../* @__PURE__ */ new Set([entry.data.tag, ...entry.data.tags ?? []])],
    headline: entry.data.headline,
    excerpt: entry.data.excerpt,
    body: entry.body ?? "",
    date: entry.data.date,
    isoDate: entry.data.isoDate,
    modifiedDate: entry.data.modifiedDate ?? entry.data.isoDate,
    author: entry.data.author,
    authorUrl: entry.data.authorUrl ?? "",
    readingTime: entry.data.readingTime,
    image: entry.data.image,
    imageWidth: entry.data.imageWidth,
    imageHeight: entry.data.imageHeight,
    imageCaption: entry.data.imageCaption,
    keywords: entry.data.keywords ?? [entry.data.tag],
    articleSection: entry.data.articleSection ?? [entry.data.tag],
    mentions: entry.data.mentions ?? [],
    about: entry.data.about ?? [],
    citations: entry.data.citations ?? []
  };
  return renderTemplate`${renderComponent($$result, "ArticleLayout", $$ArticleLayout, { "article": article, "comments": comments, "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "D:/AI News/dailyaimail/src/pages/articles/[slug].astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/articles/[slug].astro";
const $$url = "/articles/[slug].html";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
