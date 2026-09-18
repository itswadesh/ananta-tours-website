const site = require("./site");
const dests = require("./destinations");
const { esc, pic, icon, layout, ctaCard, isOwn, realBadge, fill } = require("./templates");

const byId = Object.fromEntries(dests.map(d => [d.slug, d]));
// English page HTML links to sibling pages as "../slug/". In a language folder that only works for translated
// pages, so rewrite every relative link through L.page() / L.home.
function localize(L, html) {
  return String(html)
    .replace(/href="\.\.\/([a-z0-9-]+)\/(#[^"]*)?"/g, (m, slug, hash) => `href="${L.page(slug)}${hash || ""}"`)
    .replace(/href="\.\.\/(#[^"]*)?"/g, (m, hash) => `href="${L.home || "./"}${hash || ""}"`);
}
const slugify = s => s.toLowerCase().replace(/[^a-z0-9ऀ-෿]+/g, "-").replace(/^-|-$/g, "") || "section";

function block(L, b) {
  const root = L.root, t = L.t.ui.article, D = L.t.destinations;
  const dname = s => (D[s] && D[s].name) || (byId[s] && byId[s].name) || s;
  switch (b.type) {
    case "h2": return `<h2 id="${esc(b.id || slugify(b.text))}">${esc(b.text)}</h2>`;
    case "h3": return `<h3>${esc(b.text)}</h3>`;
    case "p": return `<p>${localize(L, b.html)}</p>`;
    case "ul": return `<ul>${b.items.map(i => `<li>${localize(L, i)}</li>`).join("")}</ul>`;
    case "figure": return `<figure><div class="pic-wrap" data-parallax="6">${pic(b.photo, { alt: b.alt || "", sizes: "(min-width: 900px) 60vw, 100vw", root })}${isOwn(b.photo) ? realBadge(L.t.ui.realPhoto) : ""}</div>${b.caption ? `<figcaption>${b.caption}</figcaption>` : ""}</figure>`;
    case "html": return localize(L, b.html);
    case "callout": return `<div class="callout">${icon(b.icon || "info")}<span>${localize(L, b.html)}</span></div>`;
    case "days": return `<ol class="day-plan">${b.items.map((d, i) => `<li><b>${esc(fill(t.day, { n: i + 1 }))}</b><div><strong>${esc(d.title)}</strong><p>${localize(L, d.text)}</p>${d.stops ? `<div class="stops">${d.stops.map(s => `<span>${icon(byId[s] ? byId[s].icon : "pin")}${esc(dname(s))}</span>`).join("")}</div>` : ""}${d.plan ? `<ol class="eta" aria-label="${esc(t.estimatedTimes)}"><li class="eta-head">${icon("clock")}${esc(t.estimatedTimes)}</li>${d.plan.map(([tm, what]) => `<li><b>${esc(tm)}</b><span>${esc(what)}</span></li>`).join("")}</ol>` : ""}</div></li>`).join("")}</ol>`;
    default: throw new Error("Unknown block type " + b.type);
  }
}

function relatedCard(L, p) {
  const t = L.t.ui.article;
  return `<article class="dest-card tilt">
  ${pic(p.hero, { alt: p.heroAlt || "", sizes: "(min-width: 900px) 30vw, 100vw", root: L.root })}
  <div class="dest-body">
    <span class="dest-kind">${icon(p.icon || "pin")}${esc(p.kind || t.guide)}</span>
    <h3>${esc(p.short || p.title)}</h3>
    <p>${esc(p.description)}</p>
    <span class="dest-more">${esc(t.read)} ${icon("arrow")}</span>
  </div>
  <a class="card-link" href="${L.page(p.slug)}"><span>${esc(p.title)}</span></a>
</article>`;
}

// `page` is the English page object; `L.lang.pages[slug]` (if present) overrides its text fields.
function render(L, page, allPages, alternates = []) {
  const t = L.t.ui.article;
  const tr = L.lang.pages[page.slug] || {};
  const P = { ...page, ...tr };
  const related = (P.related || []).map(s => {
    const base = allPages.find(p => p.slug === s);
    return base ? { ...base, ...(L.lang.pages[s] || {}) } : null;
  }).filter(Boolean);
  const message = P.message || fill(t.defaultMessage, { title: P.short || P.title });
  const root = L.root;
  const today = new Date().toISOString().slice(0, 10);
  let updatedLabel;
  try { updatedLabel = new Date().toLocaleDateString({ en: "en-IN", or: "or-IN", hi: "hi-IN", bn: "bn-IN", te: "te-IN" }[L.code] || "en-IN", { month: "long", year: "numeric" }); } catch (e) { updatedLabel = today; }
  const daysBlock = P.blocks.find(b => b.type === "days" && b.items.some(d => d.stops));
  const attraction = dests.find(d => d.page === P.slug);
  const dname = s => (L.t.destinations[s] && L.t.destinations[s].name) || (byId[s] && byId[s].name) || s;

  const body = `
<section class="article-hero">
  ${pic(P.hero, { alt: P.heroAlt || "", sizes: "100vw", priority: true, root })}
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${L.home || "./"}">${esc(t.home)}</a><span>/</span><a href="${L.page("koraput-tour")}">${esc(t.tour)}</a><span>/</span><span>${esc(P.short || P.title)}</span></nav>
    ${isOwn(P.hero) ? realBadge(L.t.ui.realPhotoNotStock, "real-badge-inline") : ""}
    <h1>${esc(P.title)}</h1>
    <p class="lede">${localize(L, P.lede)}</p>
    <p class="updated">${icon("calendar")}<time datetime="${today}">${esc(fill(t.updated, { date: updatedLabel }))}</time></p>
  </div>
</section>

<div class="wrap">
  ${P.facts ? `<div class="facts-strip">${P.facts.map(f => `<div>${icon(f.icon)}<div><small>${esc(f.label)}</small><strong>${esc(f.value)}</strong></div></div>`).join("")}</div>` : ""}
  <div class="article-body band">
    <div class="prose">
      ${P.blocks.map(b => block(L, b)).join("\n")}
    </div>
    <aside class="aside">
      <div class="aside-card">
        <h3>${esc(t.planThis)}</h3>
        <p>${esc(P.asideText || t.asideText)}</p>
        <button class="btn btn-sand js-whatsapp" type="button" data-message="${esc(message)}">${icon("whatsapp")}<span>${esc(t.whatsappAnanta)}</span></button>
        <a class="btn btn-ghost" href="${L.home}#planner">${icon("route")}<span>${esc(L.t.ui.cta.buildMyTrip)}</span></a>
      </div>
      ${related.length ? `<div class="aside-links"><h4>${esc(t.keepReading)}</h4>${related.map(p => `<a href="${L.page(p.slug)}">${icon("arrow")}${esc(p.short || p.title)}</a>`).join("")}</div>` : ""}
    </aside>
  </div>
  ${related.length ? `<section class="band" style="padding-top:0" aria-label="${esc(t.relatedAria)}"><div class="related">${related.map(p => relatedCard(L, p)).join("")}</div></section>` : ""}
  <section class="band" style="padding-top:0">
    ${ctaCard(L, { photo: P.ctaPhoto || "koraput-sunrise", message })}
  </section>
</div>`;

  const jsonld = [{
    "@context": "https://schema.org",
    "@type": P.schemaType || "Article",
    headline: P.title,
    description: P.description,
    inLanguage: L.code,
    image: `${site.url}/assets/photos/${P.hero}-1600.webp`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/${L.lang.folder}${P.slug}/`,
    dateModified: today,
    ...(attraction ? { about: { "@type": "TouristAttraction", name: dname(attraction.slug), geo: { "@type": "GeoCoordinates", latitude: attraction.lat, longitude: attraction.lng }, containedInPlace: { "@type": "AdministrativeArea", name: "Koraput district, Odisha" } } } : {})
  }, ...(daysBlock ? [{
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: P.title,
    description: P.description,
    inLanguage: L.code,
    url: `${site.url}/${L.lang.folder}${P.slug}/`,
    touristType: ["Family", "Group", "Pilgrim"],
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
    itinerary: { "@type": "ItemList", itemListElement: daysBlock.items.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `${fill(t.day, { n: i + 1 })}: ${d.title}`, description: String(d.text).replace(/<[^>]+>/g, ""), item: (d.stops || []).map(s => ({ "@type": "TouristAttraction", name: dname(s), ...(byId[s] ? { geo: { "@type": "GeoCoordinates", latitude: byId[s].lat, longitude: byId[s].lng } } : {}) })) })) }
  }] : []), {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: `${site.url}/${L.lang.folder}` },
      { "@type": "ListItem", position: 2, name: t.tour, item: `${site.url}/${L.lang.folder}koraput-tour/` },
      { "@type": "ListItem", position: 3, name: P.short || P.title, item: `${site.url}/${L.lang.folder}${P.slug}/` }
    ]
  }];

  return layout(L, {
    title: `${P.metaTitle || P.title} | ${site.name}`,
    description: P.description,
    path: `${P.slug}/`,
    body,
    jsonld,
    ogImage: `assets/photos/${P.hero}-1600.webp`,
    alternates
  });
}

module.exports = { render };
