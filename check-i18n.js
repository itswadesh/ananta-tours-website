// Validates a translation against the English master dictionary and the seven translated guides.
// Usage: node check-i18n.js or|hi|bn|te   (prints OK, or every structural difference it finds)
const path = require("path");
const fs = require("fs");
const root = __dirname; // Node on Windows accepts the mixed separators below
const code = process.argv[2];
if (!code) { console.error("usage: node i18ncheck.js <code>"); process.exit(2); }
const en = require(root + "/src/i18n/en.js");
const problems = [];
const ph = s => (String(s).match(/\{\w+\}/g) || []).sort().join(",");
const hrefs = s => (String(s).match(/href="[^"]*"/g) || []).join(" ");

function cmp(base, over, p) {
  if (Array.isArray(base)) {
    if (!Array.isArray(over)) return problems.push(`${p}: expected array`);
    if (base.length !== over.length) problems.push(`${p}: array length ${over.length}, expected ${base.length}`);
    base.forEach((b, i) => i < over.length && cmp(b, over[i], `${p}[${i}]`));
    return;
  }
  if (base && typeof base === "object") {
    if (!over || typeof over !== "object") return problems.push(`${p}: expected object`);
    for (const k of Object.keys(base)) { if (!(k in over)) problems.push(`${p}.${k}: missing`); else cmp(base[k], over[k], `${p}.${k}`); }
    for (const k of Object.keys(over)) if (!(k in base)) problems.push(`${p}.${k}: extra key`);
    return;
  }
  if (typeof base === "string") {
    if (typeof over !== "string") return problems.push(`${p}: expected string`);
    if (ph(base) !== ph(over)) problems.push(`${p}: placeholders "${ph(over)}" vs "${ph(base)}"`);
    if (hrefs(base) !== hrefs(over)) problems.push(`${p}: hrefs changed`);
    if (/7008865395/.test(over)) problems.push(`${p}: contains the PhonePe number`);
    // An address, a brand name or a bare code has no translated form, so matching English is correct there.
    const untranslatable = /@/.test(base) || /^(WhatsApp|UPI|AC|QR|Google Maps|IndiaOne Air|OSRTC|APSRTC|OD02 DT 9296)$/.test(base) || /^[\d\s:–\-+.%()₹]*$/.test(base) || /^(KRPU|DMNJ|JYP|ARK|RGDA|VZM|VSKP|BUS|PYB|OD02|\?|vs)/.test(base);
    if (base.length > 3 && over === base && !untranslatable) problems.push(`${p}: untranslated ("${base.slice(0, 40)}")`);
  }
}

// Dictionary
const file = `${root}/src/i18n/${code}.js`;
if (!fs.existsSync(file)) { console.error("missing " + file); process.exit(1); }
const dict = require(file);
const enNoPages = { ...en }; delete enNoPages.pages;
const dictNoPages = { ...dict }; if ("pages" in dictNoPages) { problems.push("dictionary: put pages in <code>-pages.js, not in the dictionary"); delete dictNoPages.pages; }
cmp(enNoPages, dictNoPages, code);
if (dict.code !== code) problems.push(`code: "${dict.code}" should be "${code}"`);
if (dict.htmlLang !== code) problems.push(`htmlLang: "${dict.htmlLang}" should be "${code}"`);

// Pages
const pages = require(root + "/src/pages.js");
const want = ["koraput-tour", "koraput-tour-package-from-bhubaneswar", "koraput-tour-package-from-kolkata", "koraput-3-day-itinerary", "koraput-2-day-itinerary", "traveller-rental-koraput", "contact"];
const tr = {};
for (const f of fs.readdirSync(root + "/src/i18n").filter(f => f.startsWith(code + "-pages") && f.endsWith(".js")).sort()) Object.assign(tr, require(root + "/src/i18n/" + f));
const textFields = ["title", "short", "metaTitle", "description", "kind", "heroAlt", "lede", "message"];
for (const slug of want) {
  const base = pages.find(p => p.slug === slug), over = tr[slug];
  if (!over) { problems.push(`pages.${slug}: missing`); continue; }
  for (const k of textFields) { if (!(k in over)) problems.push(`pages.${slug}.${k}: missing`); else cmp(base[k], over[k], `pages.${slug}.${k}`); }
  for (const k of ["slug", "icon", "hero", "ctaPhoto", "related"]) if (k in over) problems.push(`pages.${slug}.${k}: omit this key`);
  if (base.facts) {
    if (!over.facts || over.facts.length !== base.facts.length) problems.push(`pages.${slug}.facts: expected ${base.facts.length} entries`);
    else base.facts.forEach((fct, i) => { const o = over.facts[i]; if (o.icon !== fct.icon) problems.push(`pages.${slug}.facts[${i}].icon changed`); cmp(fct.label, o.label, `pages.${slug}.facts[${i}].label`); cmp(fct.value, o.value, `pages.${slug}.facts[${i}].value`); });
  }
  if (!over.blocks || over.blocks.length !== base.blocks.length) { problems.push(`pages.${slug}.blocks: expected ${base.blocks.length} blocks`); continue; }
  base.blocks.forEach((b, i) => {
    const o = over.blocks[i], p = `pages.${slug}.blocks[${i}]`;
    if (o.type !== b.type) return problems.push(`${p}: type ${o.type} vs ${b.type}`);
    for (const k of ["icon", "photo", "id"]) if ((b[k] || "") !== (o[k] || "")) problems.push(`${p}.${k}: changed`);
    for (const k of ["text", "html", "alt", "caption"]) if (k in b) cmp(b[k], o[k], `${p}.${k}`);
    if (b.items && b.type !== "days") cmp(b.items, o.items, `${p}.items`);
    if (b.type === "days") {
      if (!o.items || o.items.length !== b.items.length) return problems.push(`${p}.items: expected ${b.items.length} days`);
      b.items.forEach((d, j) => {
        const od = o.items[j], q = `${p}.items[${j}]`;
        cmp(d.title, od.title, `${q}.title`); cmp(d.text, od.text, `${q}.text`);
        if (JSON.stringify(d.stops || null) !== JSON.stringify(od.stops || null)) problems.push(`${q}.stops: changed`);
        if (d.plan) {
          if (!od.plan || od.plan.length !== d.plan.length) return problems.push(`${q}.plan: expected ${d.plan.length} rows`);
          d.plan.forEach(([t, w], k) => { if (od.plan[k][0] !== t && /^\d/.test(t)) problems.push(`${q}.plan[${k}]: time changed`); cmp(w, od.plan[k][1], `${q}.plan[${k}][1]`); });
        }
      });
    }
  });
}
for (const slug of Object.keys(tr)) if (!want.includes(slug)) problems.push(`pages.${slug}: not one of the 7 requested pages`);

if (problems.length) { console.log(problems.join("\n")); console.log(`\n${problems.length} problem(s)`); process.exit(1); }
console.log("OK");
