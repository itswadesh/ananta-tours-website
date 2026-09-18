// Builds the static site into dist/. Run: node build.js
const fs = require("fs");
const path = require("path");
const site = require("./src/site");
const pages = require("./src/pages");
const { creditsPage } = require("./src/templates");
const home = require("./src/home");
const article = require("./src/article");

const dist = path.join(__dirname, "dist");

function write(rel, content) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log("wrote", rel, (content.length / 1024).toFixed(1) + " KB");
}

write("index.html", home.render());
for (const p of pages) write(`${p.slug}/index.html`, article.render(p));
write("photo-credits/index.html", creditsPage());

const today = new Date().toISOString().slice(0, 10);
const urls = ["", ...pages.map(p => p.slug + "/"), "photo-credits/"];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${site.url}/${u}</loc><lastmod>${today}</lastmod><priority>${u === "" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
write(".nojekyll", "");
