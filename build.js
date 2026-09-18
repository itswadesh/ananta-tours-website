// Builds the static site into dist/. Run: node build.js
// English at the root; other languages in their own folders with hreflang links between versions.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const site = require("./src/site");
const pages = require("./src/pages");
const { languages, context } = require("./src/i18n");
const { creditsPage } = require("./src/templates");
const home = require("./src/home");
const article = require("./src/article");

const dist = path.join(__dirname, "dist");
let count = 0;

// Honest <lastmod>: a page's date only moves when its own content changes. The hash of the
// source that produced the page is kept in src/page-dates.json and compared on every build.
const datesFile = path.join(__dirname, "src", "page-dates.json");
const today = new Date().toISOString().slice(0, 10);
let dates = {};
try { dates = JSON.parse(fs.readFileSync(datesFile, "utf8")); } catch (e) { dates = {}; }
function lastmod(key, source) {
  const hash = crypto.createHash("md5").update(JSON.stringify(source)).digest("hex").slice(0, 12);
  if (!dates[key] || dates[key].hash !== hash) dates[key] = { hash, date: today };
  return dates[key].date;
}

function write(rel, content) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  count++;
}

const url = (lang, p) => `${site.url}/${lang.folder}${p}`;
const indexed = languages.filter(l => l.index);

// Which languages have a given page path ("" for home, "slug/" for a page).
function alternatesFor(pathFrom, has) {
  return indexed.filter(l => l.code === "en" || has(l)).map(l => ({ code: l.code, url: url(l, pathFrom), href: null }));
}
function withHref(alts, L, pathFrom) {
  // hrefs relative to the page being rendered
  return alts.map(a => {
    const lang = languages.find(l => l.code === a.code);
    return { ...a, href: L.root + lang.folder + pathFrom };
  });
}

const sitemap = [];
for (const lang of languages) {
  const depthHome = lang.folder ? 1 : 0;
  // Homepage
  {
    const L = context(lang, depthHome);
    const alts = withHref(alternatesFor("", l => true), L, "");
    const updated = lastmod(lang.folder, [lang.t.home, lang.t.destinations, lang.t.stations, lang.t.transport, require("./src/destinations"), require("./src/stations"), require("./src/transport"), site.vehicle, site.contact, site.rates]);
    write(`${lang.folder}index.html`, home.render(L, alts, updated));
    if (lang.index) sitemap.push({ loc: url(lang, ""), alts: alternatesFor("", l => true), priority: "1.0", lastmod: updated });
  }
  // Guides: English has all; other languages only the translated ones
  for (const p of pages) {
    if (lang.code !== "en" && !lang.pages[p.slug]) continue;
    const L = context(lang, depthHome + 1);
    const has = l => l.code === "en" || !!l.pages[p.slug];
    const alts = withHref(alternatesFor(p.slug + "/", has), L, p.slug + "/");
    const updated = lastmod(lang.folder + p.slug + "/", [p, lang.pages[p.slug] || null, lang.t.ui.article]);
    write(`${lang.folder}${p.slug}/index.html`, article.render(L, p, pages, alts, updated));
    if (lang.index) sitemap.push({ loc: url(lang, p.slug + "/"), alts: alternatesFor(p.slug + "/", has), priority: "0.8", lastmod: updated });
  }
}
// Credits page (English only, linked from every language)
{
  const L = context(languages[0], 1);
  write("photo-credits/index.html", creditsPage(L, withHref(alternatesFor("photo-credits/", l => l.code === "en"), L, "photo-credits/")));
  sitemap.push({ loc: url(languages[0], "photo-credits/"), alts: [], priority: "0.3", lastmod: lastmod("photo-credits/", require("./src/photo-credits.json")) });
}

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority>${u.alts.map(a => `<xhtml:link rel="alternate" hreflang="${a.code}" href="${a.url}"/>`).join("")}${u.alts.length ? `<xhtml:link rel="alternate" hreflang="x-default" href="${u.alts.find(a => a.code === "en").url}"/>` : ""}</url>`).join("\n")}
</urlset>
`);
// Search and AI crawlers are all welcome; the explicit list makes that unambiguous for GEO / LLM citation.
const crawlers = ["Googlebot", "Bingbot", "Google-Extended", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Applebot", "Applebot-Extended", "CCBot", "Amazonbot", "DuckAssistBot", "MistralAI-User", "meta-externalagent", "YouBot"];
write("robots.txt", `User-agent: *\nAllow: /\n\n${crawlers.map(c => `User-agent: ${c}\nAllow: /\n`).join("\n")}\nSitemap: ${site.url}/sitemap.xml\n`);

// llms.txt: a plain-text map of the site for LLM crawlers and answer engines.
const en = languages[0].t;
const c = site.contact;
write("llms.txt", `# ${site.name}

> ${en.home.jsonDescription} Based in ${c.address.locality}, ${c.address.district} district, Odisha, India. Enquiries on WhatsApp ${c.whatsappDisplay}; no payment is requested before an itinerary, price and availability are confirmed.

Key facts:
- Vehicle: one brand-new Force Traveller, 17 passenger seats, air conditioned, all-India permit, registration OD02 DT 9296, delivered ${en.dates.deliveredOn}.
- Team: local driver, support staff on WhatsApp, guided-tour assistance.
- Pickups: Koraput Junction (KRPU), Damanjodi, Jeypore, Araku, Rayagada, Vizianagaram and Visakhapatnam stations; Jeypore Airport (IndiaOne Air); Koraput bus stand.
- Pricing: per trip, quoted in writing on WhatsApp for the agreed route and days.
- Contact: WhatsApp ${c.whatsappDisplay}, phone ${c.phones.map(p => p.display).join(" / ")}, email ${c.email}, ${c.address.street}, ${c.address.locality}, Koraput 764036, Odisha.
- Languages: English (${site.url}/), ${languages.slice(1).map(l => `${l.name} (${site.url}/${l.folder})`).join(", ")}.

## Planning guides
${pages.map(p => `- [${p.title}](${site.url}/${p.slug}/): ${p.description}`).join("\n")}

## Destinations (drive time from Koraput town)
${require("./src/destinations").map(d => `- ${d.name} (${d.kind}): ${d.blurb} ${d.drive}, about ${d.km} km.`).join("\n")}

## Photo policy
All vehicle photographs are the business's own; landscape photographs are Creative Commons images from Wikimedia Commons, credited at ${site.url}/photo-credits/. No stock or AI-generated images are used.
`);
write(".nojekyll", "");
// GitHub Pages serves the site at the custom domain once this file is present.
if (site.customDomain) write("CNAME", site.customDomain + "\n");
fs.writeFileSync(datesFile, JSON.stringify(dates, null, 1) + "\n");
console.log(`wrote ${count} files (${languages.map(l => l.code).join(", ")}), ${sitemap.length} sitemap entries`);
