// Builds the site and publishes dist/ to the gh-pages branch (GitHub Pages "deploy from branch").
// Usage: node deploy.js
const { execSync } = require("child_process");
const run = cmd => { console.log("$ " + cmd); execSync(cmd, { stdio: "inherit" }); };
run("node build.js");
const dirty = execSync("git status --porcelain").toString().trim();
if (dirty) { console.error("\nCommit your changes first (git status shows uncommitted files)."); process.exit(1); }
try { execSync("git branch -D gh-pages", { stdio: "ignore" }); } catch (e) {}
run("git subtree split --prefix dist -b gh-pages");
run("git push origin gh-pages --force");
run("git branch -D gh-pages");
console.log("\nPublished. GitHub Pages rebuilds in about a minute.");
