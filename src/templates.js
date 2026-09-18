const site = require("./site");
const { sprite, icon } = require("./icons");
const manifest = require("./photo-manifest.json");
const credits = require("./photo-credits.json");

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Responsive <picture> for a photo slug from dist/assets/photos.
function pic(slug, { alt = "", sizes = "100vw", cls = "", priority = false, root = "" } = {}) {
  const m = manifest[slug];
  if (!m) throw new Error("Unknown photo: " + slug);
  const srcset = m.sizes.map(w => `${root}assets/photos/${slug}-${w}.webp ${w}w`).join(", ");
  return `<picture class="pic${cls ? " " + cls : ""}"><source type="image/webp" srcset="${srcset}" sizes="${sizes}"><img src="${root}assets/photos/${slug}-960.jpg" alt="${esc(alt)}" width="${m.w}" height="${m.h}" loading="${priority ? "eager" : "lazy"}"${priority ? ' fetchpriority="high"' : ""} decoding="async"></picture>`;
}

const logo = `<svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M4 40c9-3 12-16 20-16s11 13 20 16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M14 32 24 14l10 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="9" r="2.5" fill="currentColor"/></svg>`;

function header(root) {
  const home = root || "./";
  return `<header class="site-header" id="top">
  <a class="brand" href="${home}" aria-label="${esc(site.name)} home">${logo}<span class="brand-text"><strong>Ananta</strong><small>Tours &amp; Travels</small></span></a>
  <nav class="site-nav" id="site-nav" aria-label="Main">
    ${site.nav.map(n => `<a href="${root}${n.href}">${n.label}</a>`).join("")}
    <a class="nav-link-sub" href="${root}koraput-tour/">Plan a trip</a>
  </nav>
  <div class="header-actions">
    <button class="btn btn-wa btn-sm js-whatsapp" type="button">${icon("whatsapp")}<span>WhatsApp</span></button>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icon("menu", "ic-open")}${icon("close", "ic-close")}</button>
  </div>
</header>`;
}

function footer(root) {
  return `<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${root || "./"}">${logo}<span class="brand-text"><strong>Ananta</strong><small>Tours &amp; Travels</small></span></a>
      <p>Group journeys across Koraput, Odisha, in a new 17-seater AC Traveller with a local driver and support team.</p>
    </div>
    <div class="footer-col">
      <h4>Plan</h4>
      <a href="${root}koraput-tour/">Koraput tour</a>
      <a href="${root}koraput-2-day-itinerary/">2-day itinerary</a>
      <a href="${root}koraput-3-day-itinerary/">3-day itinerary</a>
      <a href="${root}koraput-tour-package-from-bhubaneswar/">From Bhubaneswar</a>
      <a href="${root}koraput-tour-package-from-kolkata/">From Kolkata</a>
    </div>
    <div class="footer-col">
      <h4>Places</h4>
      <a href="${root}koraput-sightseeing/">Koraput sightseeing</a>
      <a href="${root}deomali-tour/">Deomali</a>
      <a href="${root}duduma-waterfall-tour/">Duduma Waterfall</a>
      <a href="${root}gupteswar-tour/">Gupteswar</a>
      <a href="${root}kolab-dam-tour/">Upper Kolab</a>
    </div>
    <div class="footer-col">
      <h4>Ananta</h4>
      <a href="${root}17-seater-traveller-koraput/">The Traveller</a>
      <a href="${root}#map">Map of stops</a>
      <button class="link-btn js-whatsapp" type="button">WhatsApp us</button>
      <a href="${root}photo-credits/">Photo credits</a>
    </div>
  </div>
  <p class="footer-fine">© ${site.year} ${esc(site.name)}. Trip plans may change with weather, road access and local conditions. Distances and times are approximate. Hero footage: <a href="${site.heroVideoCredit.url}" target="_blank" rel="noopener noreferrer">${esc(site.heroVideoCredit.title)}</a> on YouTube. Photographs by Wikimedia Commons contributors, <a href="${root}photo-credits/">credited here</a>.</p>
</footer>`;
}

// Full document. `depth` is 0 for the homepage and 1 for /slug/ pages.
function layout({ title, description, path = "", depth = 0, body, jsonld = [], preloadHero = false, isHome = false, ogImage = "assets/photos/hero-1600.webp" }) {
  const root = depth ? "../" : "";
  const canonical = `${site.url}/${path}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#0e3a31">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="${root}assets/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..600,50;1,9..144,300..600,50&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap">
${preloadHero ? `<link rel="preload" as="image" href="${root}assets/photos/hero-1600.webp" imagesrcset="${manifest.hero.sizes.map(w => `${root}assets/photos/hero-${w}.webp ${w}w`).join(", ")}" imagesizes="100vw" fetchpriority="high">` : ""}
<link rel="stylesheet" href="${root}styles.css">
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>
<body class="${isHome ? "is-home" : "is-sub"}" data-root="${root}">
${sprite()}
<div class="scroll-progress" aria-hidden="true"></div>
${header(root)}
<main id="main">
${body}
</main>
${footer(root)}
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" defer></script>
<script src="${root}script.js" defer></script>
${isHome ? `<script type="module" src="${root}scene.js"></script>` : ""}
</body>
</html>`;
}

// A small card that opens WhatsApp with a page-specific message.
function ctaCard({ root = "", heading = "Tell us your dates. We'll shape the road ahead.", text = "Send dates, group size and where you start from. We reply with a route, timings and the Traveller price.", message = "" , photo = "koraput-sunrise"}) {
  return `<section class="cta-card" aria-label="Plan on WhatsApp">
  ${pic(photo, { alt: "", sizes: "(min-width: 900px) 50vw, 100vw", root })}
  <div class="cta-card-body">
    <h2>${heading}</h2>
    <p>${text}</p>
    <div class="btn-row">
      <button class="btn btn-earth js-whatsapp" type="button" data-message="${esc(message)}">${icon("whatsapp")}<span>Plan on WhatsApp</span></button>
      <a class="btn btn-ghost" href="${root}#planner">${icon("route")}<span>Build my trip</span></a>
    </div>
  </div>
</section>`;
}

function creditsPage() {
  const root = "../";
  const rows = Object.entries(credits).map(([slug, c]) => `<li>
    <a href="${c.page}" target="_blank" rel="noopener noreferrer">${esc(c.title)}</a> by ${esc(c.artist || "unknown")}, <a href="${c.licenseUrl || "#"}" target="_blank" rel="noopener noreferrer">${esc(c.license)}</a>, via Wikimedia Commons. Cropped and resized. Used as <code>${slug}</code>.
  </li>`).join("\n");
  const body = `<article class="prose-page">
  <header class="prose-head">
    <h1>Photo credits</h1>
    <p>Every landscape and place photograph on this site is a real photograph of Koraput district, shared by its photographer on Wikimedia Commons under a Creative Commons licence. We crop and resize them for the web and change nothing else. Photographs of the Ananta Traveller and team will be our own.</p>
  </header>
  <ul class="credit-list">${rows}</ul>
  <p>Hero footage: <a href="${site.heroVideoCredit.url}" target="_blank" rel="noopener noreferrer">${esc(site.heroVideoCredit.title)}</a>, embedded from YouTube with the creator's player.</p>
</article>`;
  return layout({ title: `Photo credits | ${site.name}`, description: "Sources and licences for the photographs used on the Ananta Tours & Travels website.", path: "photo-credits/", depth: 1, body });
}

module.exports = { esc, pic, icon, layout, header, footer, ctaCard, creditsPage, logo };
