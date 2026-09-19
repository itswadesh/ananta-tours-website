const fs = require("fs");
const path = require("path");
const site = require("./site");
const { sprite, icon } = require("./icons");
const manifest = require("./photo-manifest.json");
const credits = require("./photo-credits.json");
const { languages, fill } = require("./i18n");
const allPages = require("./pages");

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// dist/styles.css is inlined into every page: it carries no url() or @import, so it is
// position-independent, and inlining removes the last render-blocking request.
// calc() expressions and quoted strings are parked before whitespace is collapsed, because
// "calc(1rem + 2px)" is only valid with the spaces around the operator intact.
function minifyCss(css) {
  const parked = [];
  const park = m => "\u0000" + (parked.push(m) - 1) + "\u0000";
  let out = css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, park)
    .replace(/calc\([^()]*(?:\([^()]*\)[^()]*)*\)/g, park)
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/([:])\s+/g, "$1")
    .replace(/;}/g, "}")
    .trim();
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => parked[+i]);
}
const CSS = minifyCss(fs.readFileSync(path.join(__dirname, "..", "dist", "styles.css"), "utf8"));

// Self-hosted Latin faces. Templated rather than kept in styles.css because the inlined sheet
// resolves url() against the document, which sits at a different depth on inner pages.
const LATIN = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
const slugFont = family => family.toLowerCase().replace(/ /g, "-");
const facesFor = (root, family) => family
  ? `@font-face{font-family:'${family}';font-style:normal;font-weight:400 700;font-display:swap;src:url(${root}assets/fonts/${slugFont(family)}.woff2) format('woff2')}`
  : "";
const faces = root => [
  ["Plus Jakarta Sans", "plus-jakarta-sans-latin", "500 800"],
  ["Instrument Sans", "instrument-sans-latin", "400 700"]
].map(([fam, file, wght]) =>
  `@font-face{font-family:'${fam}';font-style:normal;font-weight:${wght};font-display:swap;src:url(${root}assets/fonts/${file}.woff2) format('woff2');unicode-range:${LATIN}}`
).join("");

// WhatsApp deep link, emitted as a real href. The enquiry is the only conversion on the site,
// so it must survive JS failing, and must support long-press and open-in-new-tab. script.js
// refreshes the prefilled text at click time; without JS the bare chat link still works.
const waHref = (message = "") => `https://wa.me/${site.contact.whatsapp}${message ? "?text=" + encodeURIComponent(message) : ""}`;

// Photos flagged own:true in the manifest are our own photographs of the real vehicle.
const isOwn = slug => !!(manifest[slug] && manifest[slug].own);
const realBadge = (text, cls = "") => `<span class="real-badge${cls ? " " + cls : ""}">${icon("camera")}${esc(text)}</span>`;

// Responsive <picture> for a photo slug from dist/assets/photos.
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
function pic(slug, { alt = "", sizes = "100vw", cls = "", priority = false, root = "", attrs = "", defer = false } = {}) {
  const m = manifest[slug];
  if (!m) throw new Error("Unknown photo: " + slug);
  const srcset = m.sizes.map(w => `${root}assets/photos/${slug}-${w}.webp ${w}w`).join(", ");
  const open = `<picture${attrs ? " " + attrs : ""} class="pic${cls ? " " + cls : ""}">`;
  // Carousel slides are stacked on top of one another, so every one of them counts as being in
  // the viewport and loading="lazy" does not hold any of them back. Parking the URLs keeps the
  // bandwidth for the slide actually on screen; script.js restores them on first interaction.
  if (defer) {
    return `${open}<source type="image/webp" data-srcset="${srcset}" sizes="${sizes}"><img src="${BLANK}" data-src="${root}assets/photos/${slug}-960.jpg" alt="${esc(alt)}" width="${m.w}" height="${m.h}" decoding="async"></picture>`;
  }
  return `${open}<source type="image/webp" srcset="${srcset}" sizes="${sizes}"><img src="${root}assets/photos/${slug}-960.jpg" alt="${esc(alt)}" width="${m.w}" height="${m.h}" loading="${priority ? "eager" : "lazy"}" fetchpriority="${priority ? "high" : "low"}" decoding="async"></picture>`;
}

// Rendered at about 3.4rem. The 480x480 PNG was 46 KB for roughly 95 device pixels.
const logo = (root = "") => `<picture><source type="image/webp" srcset="${root}assets/logo-128.webp 128w, ${root}assets/logo-256.webp 256w" sizes="3.4rem"><img class="brand-mark" src="${root}assets/logo.png" width="480" height="480" alt="" decoding="async" fetchpriority="low"></picture>`;

// Language switcher: links to the same page in every language that has it, else that language's homepage.
function langSwitch(L, alternates) {
  const items = languages.map(l => {
    const alt = alternates.find(a => a.code === l.code);
    const href = (alt ? alt.href : L.root + l.folder) || "./";
    return `<a href="${href}" hreflang="${l.code}" lang="${l.code}"${l.code === L.code ? ' aria-current="true"' : ""}>${esc(l.name)}</a>`;
  }).join("");
  return `<details class="lang-switch">
    <summary aria-label="${esc(L.t.ui.language)}: ${esc(L.name)}">${icon("language")}<span>${esc(L.name)}</span></summary>
    <div class="lang-menu">${items}</div>
  </details>`;
}

function header(L, alternates) {
  const t = L.t.ui;
  return `<header class="site-header" id="top">
  <a class="brand" href="${L.home || "./"}">${logo(L.root)}<span class="brand-text"><strong>Ananta</strong> <small>Tours &amp; Travels</small></span></a>
  <nav class="site-nav" id="site-nav" aria-label="Main">
    ${site.nav.map(n => `<a href="${L.home}${n.href}">${esc(t.nav[n.key])}</a>`).join("")}
    <a class="nav-link-sub" href="${L.page("koraput-tour")}">${esc(t.nav.planTrip)}</a>
  </nav>
  <div class="header-actions">
    ${langSwitch(L, alternates)}
    <a class="btn btn-wa btn-sm js-whatsapp" href="${waHref()}" target="_blank" rel="noopener noreferrer" aria-label="${esc(fill(t.whatsappAria, { number: site.contact.whatsappDisplay }))}">${icon("whatsapp")}<span>${esc(site.contact.whatsappDisplay)}</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${esc(t.menuOpen)}">${icon("menu", "ic-open")}${icon("close", "ic-close")}</button>
  </div>
</header>`;
}

function footer(L, alternates) {
  const t = L.t.ui.footer, c = site.contact;
  // A new page does not need a dictionary entry: fall back to its own (translated) short title.
  const label = slug => {
    if (t.links[slug]) return t.links[slug];
    const tr = L.lang.pages[slug] || {};
    const p = allPages.find(x => x.slug === slug) || {};
    return tr.short || tr.title || p.short || p.title || slug;
  };
  const link = slug => `<a href="${L.page(slug)}">${esc(label(slug))}</a>`;
  return `<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="brand brand-lg" href="${L.home || "./"}" aria-label="${esc(site.name)}"><img src="${L.root}assets/logo-960.png" width="960" height="960" alt="${esc(site.name)} logo" loading="lazy" decoding="async"></a>
      <p>${esc(t.blurb)}</p>
      <address class="footer-contact">
        <span>${icon("pin")}<span>${esc(c.address.street)}, ${esc(c.address.locality)}, ${esc(t.dist)} ${esc(c.address.district)}, ${esc(c.address.region)} ${esc(c.address.postalCode)}</span></span>
        <span>${icon("whatsapp")}<a href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener noreferrer">${esc(c.whatsappDisplay)}</a> ${esc(t.onWhatsApp)}</span>
        ${c.phones.map(p => `<span>${icon("phone")}<a href="tel:${p.tel}">${esc(p.display)}</a></span>`).join("")}
        <span>${icon("chat")}<a href="mailto:${c.email}">${esc(c.email)}</a></span>
      </address>
      <div class="footer-lang">${langSwitch(L, alternates)}</div>
    </div>
    <div class="footer-col">
      <h2>${esc(t.plan)}</h2>
      ${["koraput-tour", "koraput-1-day-itinerary", "koraput-2-day-itinerary", "koraput-3-day-itinerary", "koraput-4-day-itinerary", "koraput-traveller-price"].map(link).join("\n      ")}
    </div>
    <div class="footer-col">
      <h2>${esc(t.places)}</h2>
      ${["koraput-sightseeing", "deomali-tour", "duduma-waterfall-tour", "gupteswar-tour", "kolab-dam-tour", "jagannath-temple-koraput", "talamali-koraput", "kalyamali-koraput"].map(link).join("\n      ")}
    </div>
    <div class="footer-col">
      <h2>${esc(t.ananta)}</h2>
      ${["17-seater-traveller-koraput", "traveller-rental-koraput", "group-tour-koraput", "koraput-tour-package-from-bhubaneswar", "koraput-tour-package-from-kolkata", "koraput-tour-package-from-visakhapatnam"].map(link).join("\n      ")}
      <a href="${L.home}#map">${esc(t.links.map)}</a>
      <a href="${L.home}#stations">${esc(t.links.stations)}</a>
      ${link("contact")}
      <a class="link-btn js-whatsapp" href="${waHref()}" target="_blank" rel="noopener noreferrer">${esc(t.links.whatsappUs)}</a>
      <a href="${L.root}photo-credits/">${esc(t.links.credits)}</a>
    </div>
  </div>
  <p class="footer-fine">© ${site.year} ${esc(site.name)}. ${esc(t.fine)} <a href="${L.root}photo-credits/">${esc(t.creditedHere)}</a>.</p>
</footer>`;
}

// Full document. `path` is the page path from the site root without the language folder (e.g. "koraput-tour/").
function layout(L, { title, description, path = "", body, jsonld = [], preloadHero = false, heroPhoto = "hero", isHome = false, ogImage = "assets/photos/hero-1600.webp", alternates = [], strings = null }) {
  const root = L.root;
  const canonical = `${site.url}/${L.lang.folder}${path}`;
  // The two Latin families are self-hosted and preloaded below. Only a translated page needs
  // Google Fonts at all, and then only for its Indic face.
  // Every face is self-hosted and subset; nothing is fetched from a third-party origin.
  const hreflang = alternates.map(a => `<link rel="alternate" hreflang="${a.code}" href="${a.url}">`).join("\n");
  const xDefault = alternates.find(a => a.code === "en");
  return `<!doctype html>
<html lang="${L.lang.t.htmlLang || L.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#ffffff">
<meta name="robots" content="${L.index ? "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" : "noindex, follow"}">
<meta name="author" content="${esc(site.name)}">
<meta name="geo.region" content="IN-OR">
<meta name="geo.placename" content="Semiliguda, Koraput, Odisha">
<link rel="canonical" href="${canonical}">
${hreflang}
${xDefault ? `<link rel="alternate" hreflang="x-default" href="${xDefault.url}">` : ""}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/${ogImage}">
<meta property="og:locale" content="${{ en: "en_IN", or: "or_IN", hi: "hi_IN", bn: "bn_IN", te: "te_IN" }[L.code] || "en_IN"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${site.url}/${ogImage}">
<link rel="icon" type="image/png" sizes="32x32" href="${root}assets/icon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="${root}assets/icon-192.png">
<link rel="apple-touch-icon" sizes="180x180" href="${root}assets/icon-180.png">
<link rel="preload" as="font" type="font/woff2" href="${root}assets/fonts/plus-jakarta-sans-latin.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="${root}assets/fonts/instrument-sans-latin.woff2" crossorigin>
${L.font ? `<link rel="preload" as="font" type="font/woff2" href="${root}assets/fonts/${slugFont(L.font)}.woff2" crossorigin>` : ""}
${preloadHero ? `<link rel="preload" as="image" href="${root}assets/photos/${heroPhoto}-960.jpg" imagesrcset="${manifest[heroPhoto].sizes.map(w => `${root}assets/photos/${heroPhoto}-${w}.webp ${w}w`).join(", ")}" imagesizes="100vw" fetchpriority="high">` : ""}
<style>${faces(root)}${facesFor(root, L.font)}${CSS}</style>
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>
<body class="${isHome ? "is-home" : "is-sub"}" data-root="${root}" data-lang="${L.code}" data-whatsapp="${site.contact.whatsapp}">
${sprite()}
<div class="scroll-progress" aria-hidden="true"></div>
${header(L, alternates)}
<main id="main">
${body}
</main>
${footer(L, alternates)}
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script id="ui-strings" type="application/json">${JSON.stringify(strings || L.t.strings)}</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" defer></script>
<script src="${root}script.js" defer></script>
</body>
</html>`;
}

// A small card that opens WhatsApp with a page-specific message.
function ctaCard(L, { heading, text, message = "", photo = "koraput-sunrise" } = {}) {
  const t = L.t.ui.cta;
  return `<section class="cta-card" aria-label="${esc(t.aria)}">
  ${pic(photo, { alt: "", sizes: "(min-width: 900px) 50vw, 100vw", root: L.root })}
  ${isOwn(photo) ? realBadge(L.t.ui.realPhoto) : ""}
  <div class="cta-card-body">
    <h2>${esc(heading || t.heading)}</h2>
    <p>${esc(text || t.text)}</p>
    <div class="btn-row">
      <a class="btn btn-earth js-whatsapp" href="${waHref(message)}" target="_blank" rel="noopener noreferrer" data-message="${esc(message)}">${icon("whatsapp")}<span>${esc(t.planOnWhatsApp)}</span></a>
      <a class="btn btn-ghost" href="${L.home}#planner">${icon("route")}<span>${esc(t.buildMyTrip)}</span></a>
    </div>
  </div>
</section>`;
}

function creditsPage(L, alternates) {
  const t = L.t.ui.credits;
  const rows = Object.entries(credits).map(([slug, c]) => `<li>
    <a href="${c.page}" target="_blank" rel="noopener noreferrer">${esc(c.title)}</a> ${esc(t.by)} ${esc(c.artist || "unknown")}, <a href="${c.licenseUrl || "#"}" target="_blank" rel="noopener noreferrer">${esc(c.license)}</a>, ${esc(t.via)} <code>${slug}</code>.
  </li>`).join("\n");
  const body = `<article class="prose-page">
  <header class="prose-head">
    <h1>${esc(t.title)}</h1>
    <p>${esc(t.intro)}</p>
  </header>
  <ul class="credit-list">${rows}</ul>
</article>`;
  return layout(L, { title: `${t.title} | ${site.brandShort}`, description: t.description, path: "photo-credits/", body, alternates });
}

module.exports = { esc, pic, icon, layout, header, footer, ctaCard, creditsPage, logo, isOwn, realBadge, fill, waHref };
