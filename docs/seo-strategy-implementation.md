# SEO strategy: what is built, what needs you

Status of every item in [ananta-tours-koraput-seo-strategy.md](ananta-tours-koraput-seo-strategy.md), as of 18 September 2026.

## Done in the site

| Item | Where |
| --- | --- |
| Visakhapatnam landing page | `/koraput-tour-package-from-visakhapatnam/` — road, train, Jeypore flight, bus, a 3-day plan that ends on the way home to Vizag |
| Talamali and Putsil | `/talamali-koraput/` |
| Kalyamali (Kaliamali) | `/kalyamali-koraput/` |
| Jagannath Temple, Koraput | `/jagannath-temple-koraput/`, also linked from the homepage card for Sabara Srikhetra |
| Dudhari positioned as context, not a page | kept inside the sightseeing page's offbeat paragraph |
| Price intent | `/koraput-traveller-price/` — how the fare is built, what is included, tolls, parking, night halt, and the five lines to send for a quote |
| Vehicle page deepened | `/17-seater-traveller-koraput/` — luggage figures, permit and registration, pickup areas, destination coverage, tolls/parking/night halt, multi-day and outstation |
| Internal linking | every destination and origin page now points at the vehicle page, an itinerary and the price page; the footer carries all three origin cities and the new destinations |
| Honest sitemap dates | `<lastmod>` only moves when a page's own content changes; tracked by content hash in `src/page-dates.json` |
| Verified-on dates | guides carry a visible "Updated" line, and transport timings say when they were last checked (`site.verified`) |
| Structured data | TravelAgency with geo, area served, languages and vehicle; WebSite; FAQPage; ItemList of TouristAttraction; per-guide Article, BreadcrumbList and TouristTrip with the day-by-day itinerary |
| Answer-engine surface | `robots.txt` names the major AI crawlers explicitly, `llms.txt` summarises the business, every page and every language |
| Performance | Three.js terrain now downloads only as that section approaches, the unused MotionPath plugin is gone, images stay responsive WebP with one preloaded hero |
| Domain switch ready | set `customDomain` in `src/site.js` and the next build rewrites canonicals, hreflang, sitemap, structured data and `llms.txt`, and writes `dist/CNAME` |
| Titles and descriptions | every page title now fits a search result (keyword first, short `| Ananta Tours` suffix) and every description sits under 160 characters |
| Hero subheading | the emotional H1 stays; the commercial line under it names group size, vehicle and the main destinations |
| Question-shaped answers | the price, vehicle and Visakhapatnam pages carry FAQ blocks published as FAQPage, so the exact wording people search appears as a heading with the answer under it |
| Languages | English plus Odia, Hindi, Bengali and Telugu, with hreflang and x-default |

## Needs you before it can ship

1. **Buy the domain.** `anantatourskoraput.com` is the strategy's recommendation. Point it at GitHub Pages (four A records for apex, or a CNAME for `www`), then set `customDomain: "anantatourskoraput.com"` in `src/site.js`, run `node build.js` and `node deploy.js`. Nothing else changes.
2. **Google Search Console.** Add the domain, submit `sitemap.xml`, then request indexing for the homepage, the vehicle page, the three origin pages, the price page, Deomali, Duduma and Gupteswar.
3. **Google Business Profile.** This is worth more than any further blog post. Name, phone, the new website, Koraput service area, categories, and photographs: front, side, interior, luggage space, the vehicle at Deomali and Duduma, the driver, real groups.
4. **Starting rates.** Fill `site.rates` in `src/site.js` with real figures and the price page and homepage render a rate table automatically. Nothing is invented for you: until you supply numbers, the page explains the method instead. The shape:

    ```js
    rates: {
      currency: "₹",
      updated: "September 2026",
      items: [
        { name: "Deomali day trip", route: "Koraput or Semiliguda, return", days: "1 day", from: 0 },
        { name: "Duduma and Machkund", route: "Koraput, return", days: "1 day", from: 0 },
        { name: "Three-day Koraput tour", route: "Town, Kolab, Deomali, Duduma", days: "3 days", from: 0 }
      ]
    },
    ```
5. **Driver and team proof.** Send a driver photo, name, years driving and languages, plus a team or group photo, and the trust block goes in.
6. **Reviews.** Ask real customers after their trip. No review goes on this site unless a real person wrote it.

## Deliberately not done

**The hero video.** The strategy asks for the YouTube hero to be restored and lazy-loaded after three seconds. You asked for the opposite twice: the delivery-day photograph in the hero, then a slider of the five real vehicle photographs with a full-screen gallery. The slider is what is live. A third-party video in the hero would also work against the same document's performance goals, so the video stays out unless you tell us otherwise. The old video id was removed from `src/site.js`.

**Mass origin pages.** Raipur, Hyderabad and Berhampur are not built. The strategy says to add an origin page only when there is route-specific information worth reading, and there is nothing useful to say about Hyderabad to Koraput that the Visakhapatnam page does not already cover.
