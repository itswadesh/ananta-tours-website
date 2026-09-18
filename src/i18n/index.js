// Language registry. English lives at the site root; every other language in its own folder.
// `index: false` on a language adds noindex and keeps it out of the sitemap and hreflang until reviewed.
const fs = require("fs");
const path = require("path");

const registry = [
  { code: "en", folder: "", name: "English", font: null, index: true },
  { code: "or", folder: "or/", name: "ଓଡ଼ିଆ", font: "Noto Sans Oriya", index: true },
  { code: "hi", folder: "hi/", name: "हिन्दी", font: "Noto Sans Devanagari", index: true },
  { code: "bn", folder: "bn/", name: "বাংলা", font: "Noto Sans Bengali", index: true },
  { code: "te", folder: "te/", name: "తెలుగు", font: "Noto Sans Telugu", index: true }
];

// Deep merge so a translation only needs the keys it changes; anything missing falls back to English.
function merge(base, over) {
  if (Array.isArray(base)) return Array.isArray(over) ? over : base;
  if (base && typeof base === "object") {
    const out = { ...base };
    for (const k of Object.keys(over || {})) out[k] = k in base ? merge(base[k], over[k]) : over[k];
    return out;
  }
  return over === undefined ? base : over;
}

const en = require("./en");
// A language is built only when its dictionary file exists, so an untranslated language never
// ships English text under its own folder. Page translations may be split across <code>-pages*.js.
const languages = registry.filter(r => {
  if (r.code === "en" || fs.existsSync(path.join(__dirname, r.code + ".js"))) return true;
  console.warn(`i18n: no src/i18n/${r.code}.js yet, skipping ${r.name}`);
  return false;
}).map(r => {
  if (r.code === "en") return { ...r, t: en, pages: {} };
  const dict = merge(en, require(path.join(__dirname, r.code + ".js")));
  const pages = { ...(dict.pages || {}) };
  for (const f of fs.readdirSync(__dirname).filter(f => f.startsWith(r.code + "-pages") && f.endsWith(".js")).sort()) {
    Object.assign(pages, require(path.join(__dirname, f)));
  }
  return { ...r, t: dict, pages };
});

// Fill {placeholders} in a string.
const fill = (s, vars = {}) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

// A language context for rendering one page. `depth` is the folder depth of the page being rendered.
function context(lang, depth) {
  const root = "../".repeat(depth);
  const has = slug => lang.code === "en" || !!lang.pages[slug];
  return {
    lang, t: lang.t, code: lang.code, name: lang.name, font: lang.font, index: lang.index, fill,
    root,                                        // to the site root (assets, script, styles)
    home: root + lang.folder,                    // this language's homepage
    href: p => root + lang.folder + p,           // a page in this language, whether or not it exists
    page: slug => root + (has(slug) ? lang.folder : "") + slug + "/", // translated page, else the English page
    has
  };
}

module.exports = { languages, context, fill, merge };
