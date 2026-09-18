const site = require("./site");
const dests = require("./destinations");
const { esc, pic, icon, layout, ctaCard } = require("./templates");

const byId = Object.fromEntries(dests.map(d => [d.slug, d]));
const root = "../";

function block(b) {
  switch (b.type) {
    case "h2": return `<h2 id="${esc(b.id || slugify(b.text))}">${esc(b.text)}</h2>`;
    case "h3": return `<h3>${esc(b.text)}</h3>`;
    case "p": return `<p>${b.html}</p>`;
    case "ul": return `<ul>${b.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    case "figure": return `<figure><div class="pic-wrap" data-parallax="6">${pic(b.photo, { alt: b.alt || "", sizes: "(min-width: 900px) 60vw, 100vw", root })}</div>${b.caption ? `<figcaption>${b.caption}</figcaption>` : ""}</figure>`;
    case "callout": return `<div class="callout">${icon(b.icon || "info")}<span>${b.html}</span></div>`;
    case "days": return `<ol class="day-plan">${b.items.map((d, i) => `<li><b>Day ${i + 1}</b><div><strong>${esc(d.title)}</strong><p>${d.text}</p>${d.stops ? `<div class="stops">${d.stops.map(s => byId[s] ? `<span>${icon(byId[s].icon)}${esc(byId[s].name)}</span>` : `<span>${icon("pin")}${esc(s)}</span>`).join("")}</div>` : ""}</div></li>`).join("")}</ol>`;
    default: throw new Error("Unknown block type " + b.type);
  }
}

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function relatedCard(p) {
  return `<article class="dest-card tilt">
  ${pic(p.hero, { alt: p.heroAlt || "", sizes: "(min-width: 900px) 30vw, 100vw", root })}
  <div class="dest-body">
    <span class="dest-kind">${icon(p.icon || "pin")}${esc(p.kind || "Guide")}</span>
    <h3>${esc(p.short || p.title)}</h3>
    <p>${esc(p.description)}</p>
    <span class="dest-more">Read ${icon("arrow")}</span>
  </div>
  <a class="card-link" href="${root}${p.slug}/"><span>${esc(p.title)}</span></a>
</article>`;
}

function render(page, allPages) {
  const pages = allPages || require("./pages");
  const related = (page.related || []).map(s => pages.find(p => p.slug === s)).filter(Boolean);
  const message = page.message || `Hi Ananta Tours, I am planning a Koraput trip and read your page about ${page.short || page.title}. Please help me with the itinerary and 17-seater Traveller availability.`;

  const body = `
<section class="article-hero">
  ${pic(page.hero, { alt: page.heroAlt || "", sizes: "100vw", priority: true, root })}
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${root}">Ananta</a><span>/</span><a href="${root}koraput-tour/">Koraput tour</a><span>/</span><span>${esc(page.short || page.title)}</span></nav>
    <h1>${esc(page.title)}</h1>
    <p class="lede">${page.lede}</p>
  </div>
</section>

<div class="wrap">
  ${page.facts ? `<div class="facts-strip">${page.facts.map(f => `<div>${icon(f.icon)}<div><small>${esc(f.label)}</small><strong>${esc(f.value)}</strong></div></div>`).join("")}</div>` : ""}
  <div class="article-body band">
    <div class="prose">
      ${page.blocks.map(block).join("\n")}
    </div>
    <aside class="aside">
      <div class="aside-card">
        <h3>Plan this with Ananta</h3>
        <p>${page.asideText || "Tell us your dates and group size. We reply with timings, the route and the Traveller price."}</p>
        <button class="btn btn-sand js-whatsapp" type="button" data-message="${esc(message)}">${icon("whatsapp")}<span>WhatsApp Ananta</span></button>
        <a class="btn btn-ghost" href="${root}#planner">${icon("route")}<span>Build my trip</span></a>
      </div>
      ${related.length ? `<div class="aside-links"><h4>Keep reading</h4>${related.map(p => `<a href="${root}${p.slug}/">${icon("arrow")}${esc(p.short || p.title)}</a>`).join("")}</div>` : ""}
    </aside>
  </div>
  ${related.length ? `<section class="band" style="padding-top:0" aria-label="Related guides"><div class="related">${related.map(relatedCard).join("")}</div></section>` : ""}
  <section class="band" style="padding-top:0">
    ${ctaCard({ root, photo: page.ctaPhoto || "koraput-sunrise", message })}
  </section>
</div>`;

  const jsonld = [{
    "@context": "https://schema.org",
    "@type": page.schemaType || "Article",
    headline: page.title,
    description: page.description,
    image: `${site.url}/assets/photos/${page.hero}-1600.webp`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/${page.slug}/`,
    dateModified: new Date().toISOString().slice(0, 10)
  }, {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Koraput tour", item: `${site.url}/koraput-tour/` },
      { "@type": "ListItem", position: 3, name: page.short || page.title, item: `${site.url}/${page.slug}/` }
    ]
  }];

  return layout({
    title: `${page.metaTitle || page.title} | ${site.name}`,
    description: page.description,
    path: `${page.slug}/`,
    depth: 1,
    body,
    jsonld,
    ogImage: `assets/photos/${page.hero}-1600.webp`
  });
}

module.exports = { render };
