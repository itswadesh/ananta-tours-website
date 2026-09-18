# Ananta Tours & Travels

Static website for Koraput group tours in a new 17-seater AC Traveller.
Positioning: **Experience Koraput in Comfort**. Koraput sells the trip; the vehicle and the local team are the trust features.

## Structure

```
build.js            Generates dist/ from src/ (no dependencies: `node build.js`)
src/site.js         Name, public URL, vehicle facts, contact details, nav
src/destinations.js Ten places with coordinates, photos, drive times
src/pages.js, src/pages-extra.js, src/pages-seo.js   The twenty-one guides (content only)
src/page-dates.json Content hash + date per page, so sitemap <lastmod> only moves on real change
src/i18n/en.js      Every UI string and homepage text (English master)
src/i18n/index.js   Language registry: English at the root, or/ hi/ bn/ te/ folders, deep-merge fallback
src/i18n/<code>.js, <code>-pages*.js   Odia, Hindi, Bengali and Telugu translations (dictionary + 7 translated guides each)
check-i18n.js       Validates a translation against English: node check-i18n.js or|hi|bn|te
src/home.js         Homepage template (render(L) takes a language context)
src/article.js      Guide page template (Article + TouristTrip / TouristAttraction schema)
src/templates.js    Layout, header, footer, <picture> helper, credits page
src/icons.js        Inline SVG icon set
src/photo-credits.json / photo-manifest.json   Attribution and sizes for dist/assets/photos
dist/               What GitHub Pages serves (generated HTML + static assets)
dist/styles.css     All styles
dist/script.js      Smooth scroll, the scroll-driven road, planner, seat map, map, micro-interactions
dist/scene.js       Three.js low-poly terrain behind "17 seats. One incredible Koraput."
```

Pages (English, at the root): `/`, `/koraput-tour/`, `/koraput-tour-package-from-bhubaneswar/`, `/koraput-tour-package-from-kolkata/`, `/17-seater-traveller-koraput/`, `/koraput-sightseeing/`, `/koraput-3-day-itinerary/`, `/koraput-2-day-itinerary/`, `/deomali-tour/`, `/duduma-waterfall-tour/`, `/gupteswar-tour/`, `/kolab-dam-tour/`, `/traveller-rental-koraput/`, `/group-tour-koraput/`, `/koraput-1-day-itinerary/`, `/koraput-4-day-itinerary/`, `/contact/`, `/photo-credits/`.

Languages: the same homepage plus seven translated guides live under `/or/` (Odia), `/hi/` (Hindi), `/bn/` (Bengali) and `/te/` (Telugu). Every page carries `hreflang` links to its other versions and `x-default` pointing at English; the sitemap repeats them. Untranslated guides link back to the English page. Translations are model-generated first drafts pending a native-speaker review; set `index: false` on a language in `src/i18n/index.js` to publish it with `noindex` while it is being reviewed.

Search and answer engines: `robots.txt` explicitly allows the major AI crawlers, `llms.txt` summarises the business and every page, and each page has JSON-LD (TravelAgency, WebSite, FAQPage, ItemList of TouristAttraction on the homepage; Article, BreadcrumbList and TouristTrip on itineraries).

## Editing

1. Change content in `src/` (or styles/scripts in `dist/`).
2. Run `node build.js`. It rewrites every HTML page, `sitemap.xml` and `robots.txt`.
3. Commit `dist/` together with `src/`.

Preview locally with any static server, for example `npx serve dist`. Animations run by default; add `?still` to the URL to switch decorative animation off.

## Custom domain

The site is built for one canonical host. To move it to a branded domain (`anantatourskoraput.com` is the recommendation in `docs/ananta-tours-koraput-seo-strategy.md`):

1. Point the domain at GitHub Pages: apex `A` records to 185.199.108–111.153, or a `CNAME` for `www` to `itswadesh.github.io`.
2. Set `customDomain: "anantatourskoraput.com"` in `src/site.js`.
3. `node build.js && node deploy.js`. The build writes `dist/CNAME` and every canonical, hreflang, sitemap, structured-data and `llms.txt` URL follows the new host.
4. In the repository settings, tick **Enforce HTTPS** once GitHub has issued the certificate, then add the domain in Google Search Console and submit the sitemap.

`docs/seo-strategy-implementation.md` tracks the rest of the SEO plan, including the parts that need the business owner rather than code.

## Before launch

1. Contact details (WhatsApp +91 79787 07236, phones, Semiliguda address) live in `src/site.js` under `contact`; the WhatsApp buttons read the number from there at build time.
2. Set the final public URL in `src/site.js` and rebuild; it feeds canonical links, Open Graph tags and the sitemap.
3. Vehicle photographs (exterior and cabin) are in place; add a rear luggage-space photo and a team photo whenever available (`src/own-photos/`, then rerun the image step).
5. Optional: create a Google Maps browser key restricted to the domain and put it in `GOOGLE_MAPS_API_KEY` in `dist/script.js` for a fully interactive pinned map. Without a key the section uses Google's keyless route embed plus "Open in Maps" links for every stop.
6. Re-check distances, drive times and train timetables in `src/destinations.js` and `src/pages.js` against current conditions.

## Photos and footage

All landscape and place photographs are real photographs of Koraput district from Wikimedia Commons under Creative Commons licences, resized for the web. Each one is credited on `/photo-credits/` (generated from `src/photo-credits.json`). Do not replace them with stock or AI-generated imagery. The hero is a slider of our own vehicle photographs.

## Deploying to GitHub Pages

The site is served from the `gh-pages` branch, which holds the contents of `dist/`. Pages source in the repository settings is **Deploy from a branch → gh-pages → / (root)**.

To publish a change:

```
node build.js          # regenerate dist/
git add -A && git commit -m "Update site"
git push               # main: sources + generated site
node deploy.js         # pushes dist/ to gh-pages
```

`deploy.js` uses `git subtree split`, so `main` keeps `src/` and `dist/` together while `gh-pages` gets only the published files.

Live: https://itswadesh.github.io/ananta-tours-website/
