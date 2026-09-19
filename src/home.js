const site = require("./site");
const dests = require("./destinations");
const stations = require("./stations");
const transport = require("./transport");
const manifest = require("./photo-manifest.json");
const { esc, pic, icon, layout, ctaCard, realBadge, fill, waHref } = require("./templates");

const enc = s => encodeURIComponent(s).replace(/%20/g, "+");

// Place names Google resolves reliably for the keyless route embed (max 9 stops).
const mapNames = {
  "sabara-srikhetra": "Sabara Srikhetra, Koraput",
  kolab: "Upper Kolab Dam, Koraput",
  gupteswar: "Gupteswar Cave Temple, Ramgiri, Koraput",
  duduma: "Duduma Waterfall, Koraput",
  onukadelli: "Onukudelli, Koraput",
  nandapur: "Nandapur, Koraput",
  "rani-duduma": "Rani Duduma Waterfalls, Koraput",
  deomali: "Deomali Peak, Koraput",
  maliguda: "Maliguda Railway Station, Koraput"
};
const embedUrl = `https://www.google.com/maps?saddr=${enc("Koraput, Odisha")}&daddr=${Object.values(mapNames).map(enc).join("+to:")}&output=embed`;
const mapsLink = d => `https://www.google.com/maps/search/?api=1&query=${d.lat}%2C${d.lng}`;

// "Leave 07:00 → arrive about HH:MM" from the (English) approximate drive time.
function etaFrom(drive, startMin = 7 * 60) {
  const m = /([\d.]+)\s*h/.exec(drive), n = /([\d.]+)\s*min/.exec(drive);
  let mins = 0;
  if (m) mins += Math.round(parseFloat(m[1]) * 60);
  if (n) mins += parseInt(n[1], 10);
  if (!mins) return null;
  const t = startMin + mins;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

// Hero slider order; the lightbox uses the same order.
const heroPhotos = ["traveller-front-garland", "traveller-side", "traveller-front-hill", "traveller-cabin", "traveller-rear"];
// Vehicle gallery order; thumbnails follow it. Each entry knows its lightbox index.
const galleryKeys = ["side", "cabin", "hill", "garland", "rear"];
const galleryPhotos = { side: "traveller-side", cabin: "traveller-cabin", hill: "traveller-front-hill", garland: "traveller-front-garland", rear: "traveller-rear" };

function render(L, alternates = [], updated = null) {
  const H = L.t.home, D = L.t.destinations, S = L.t.stations, N = L.t.stationNames, T = L.t.transport, dates = L.t.dates, U = L.t.ui;
  const f = fill;
  const P = (slug, opts = {}) => pic(slug, { ...opts, root: L.root });
  const words = text => text.split(" ").map(w => `<span class="hero-word"><span>${esc(w)}</span></span>`).join(" ");
  const td = d => ({ ...d, ...(D[d.slug] || {}) });
  // Localise "About 1 h 10 min" style strings.
  const dur = s => /^in town$/i.test(s) ? U.units.inTown : s.replace(/\bAbout\b/, U.units.about).replace(/(\d)\s*h\b/g, `$1 ${U.units.h}`).replace(/(\d)\s*min\b/g, `$1 ${U.units.min}`);

  const heroSlides = heroPhotos.map((photo, i) => ({ photo, alt: H.hero.slides[i].alt, caption: f(H.hero.slides[i].caption, { date: dates.deliveredOn }) }));
  const gal = galleryKeys.map(k => ({ photo: galleryPhotos[k], alt: H.traveller.alts[k], caption: f(H.traveller.captions[k], { date: dates.deliveredOn }), label: H.traveller.thumbs[k], lb: heroPhotos.indexOf(galleryPhotos[k]) }));

  function stop(d, i) {
    const t = td(d), x = i % 2 === 0 ? 56 : 44, eta = etaFrom(d.drive), pAlt = t.photoAlt || f(H.journey.photoAlt, { name: t.name });
    return `<article class="stop" id="stop-${d.slug}" style="--mx:${x}%">
  <span class="stop-marker" aria-hidden="true"><i>${i + 1}</i></span>
  <div class="stop-media" data-parallax="7">${P(d.photo, { alt: pAlt, sizes: "(min-width: 900px) 45vw, 100vw" })}</div>
  <div class="stop-body">
    <span class="stop-kind">${icon(d.icon)}${esc(t.kind)}</span>
    <h3>${esc(t.name)}</h3>
    <p>${esc(t.blurb)}</p>
    <div class="stop-meta"><span>${icon("clock")}${esc(f(H.journey.fromKoraput, { drive: t.drive }))}</span><span>${icon("road")}${esc(f(H.journey.aboutKm, { km: d.km }))}</span>${eta ? `<span>${icon("sunrise")}${esc(f(H.journey.leaveArrive, { time: eta }))}</span>` : ""}</div>
    ${d.page ? `<a class="text-link" href="${L.page(d.page)}">${esc(f(H.journey.planDay, { name: t.name }))} ${icon("arrow")}</a>` : ""}
  </div>
</article>`;
  }

  function destCard(d, featured) {
    const t = td(d);
    const href = d.page ? L.page(d.page) : `${L.page("koraput-sightseeing")}#${d.slug}`;
    const pAlt = t.photoAlt || f(H.journey.photoAlt, { name: t.name });
    return `<article class="dest-card tilt${featured ? " dest-featured" : ""}">
  ${P(d.photo, { alt: pAlt, sizes: featured ? "(min-width: 900px) 40vw, 100vw" : "(min-width: 1100px) 25vw, (min-width: 600px) 50vw, 100vw" })}
  <div class="dest-body">
    <span class="dest-kind">${icon(d.icon)}${esc(t.kind)}</span>
    <h3>${esc(t.name)}</h3>
    <p>${esc(t.blurb)}</p>
    <div class="dest-meta"><span>${icon("clock")}${esc(t.drive)}</span><span>${icon("road")}${d.km} km</span></div>
    <span class="dest-more">${esc(d.page ? H.destinations.readGuide : H.destinations.whereItFits)} ${icon("arrow")}</span>
  </div>
  <a class="card-link" href="${href}"><span>${esc(t.name)}</span></a>
</article>`;
  }

  const car = (x, n) => `<g class="car" style="--x:${x}px">
          <rect x="6" y="14" width="58" height="20" rx="7" fill="#d7dbe3"/>
          <path d="M18 14 L26 3 H48 L56 14 Z" fill="#c2c8d2"/>
          <rect x="28" y="5" width="18" height="8" rx="2" fill="#eef2f7"/>
          <rect x="6" y="30" width="58" height="4" rx="2" fill="#b7bdc8"/>
          <circle cx="20" cy="34" r="6" fill="#2a2a2a"/><circle cx="20" cy="34" r="2.4" fill="#9aa0aa"/>
          <circle cx="50" cy="34" r="6" fill="#2a2a2a"/><circle cx="50" cy="34" r="2.4" fill="#9aa0aa"/>
          <text x="35" y="26" text-anchor="middle" font-size="9" font-weight="700" fill="#3b4250">${n}</text>
        </g>`;
  const bubble = (cls, x, y, w, text) => `<g class="bubble ${cls}" style="--x:${x}px;--y:${y}px"><rect x="0" y="0" width="${w}" height="26" rx="8" fill="#fff" stroke="#e3e6ec"/><path d="M${Math.round(w / 3)} 26 l6 8 l4 -8" fill="#fff" stroke="#e3e6ec"/><text x="${w / 2}" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="#c93b3b">${esc(text)}</text></g>`;
  const people = (() => { const out = []; for (const cy of [49, 58]) for (let x = 78; x <= (cy === 49 ? 198 : 183); x += 15) out.push(`<circle class="person" cx="${x}" cy="${cy}" r="3.2" fill="#f26a1b"/>`); return out.join(""); })();
  const cmpIcons = ["users", "phone", "luggage", "chat"], goodIcons = ["pin", "wheel", "luggage", "users"], statIcons = ["van", "wheel", "phone", "luggage"];
  const itin = [["koraput-1-day-itinerary", 1], ["koraput-2-day-itinerary", 2], ["koraput-3-day-itinerary", 3], ["koraput-4-day-itinerary", 4]];
  const factIcons = ["van", "seat", "snowflake", "shield", "wheel", "users"], roleIcons = ["wheel", "chat", "compass"];
  const journey = dests.filter(d => d.journey);
  const priceIcons = ["pin", "road", "calendar", "sunrise"];
  // Published starting fares appear only when the business has confirmed real figures.
  const ratesTable = () => {
    const r = site.rates;
    if (!r || !r.items || !r.items.length) return "";
    return `<h3 class="rates-heading">${esc(H.price.ratesHeading)}</h3>
        <div class="rate-table"><table><thead><tr><th scope="col">${esc(H.price.ratesTrip)}</th><th scope="col">${esc(H.price.ratesLength)}</th><th scope="col">${esc(H.price.ratesFrom)}</th></tr></thead><tbody>${r.items.map(i => `<tr><th scope="row">${esc(i.name)}<small>${esc(i.route)}</small></th><td>${esc(i.days)}</td><td><b>${esc(r.currency)}${i.from.toLocaleString("en-IN")}</b></td></tr>`).join("")}</tbody></table></div>
        <p class="rates-note">${esc(f(H.price.ratesNote, { date: r.updated }))}</p>`;
  };

  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-media" id="hero-slider">
    ${heroSlides.map((s, i) => P(s.photo, { alt: s.alt, sizes: "100vw", priority: i === 0, defer: i !== 0, cls: "hero-slide" + (i === 0 ? " is-active" : "") })).join("\n    ")}
  </div>
  <div class="hero-shade" aria-hidden="true"></div>
  <button class="hero-open" type="button" aria-label="${esc(H.hero.openGallery)}" data-gallery-open="0"></button>
  <div class="hero-ui" aria-label="${esc(H.hero.sliderAria)}">
    <p class="hero-slide-caption" id="hero-slide-caption">${esc(heroSlides[0].caption)}</p>
    <div class="hero-ui-row">
      <button class="hero-arrow" type="button" data-slide="-1" aria-label="${esc(H.hero.prev)}">${icon("arrow")}</button>
      <div class="hero-dots" role="tablist">${heroSlides.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-slide-to="${i}" aria-label="${esc(f(H.hero.photoN, { n: i + 1, caption: s.caption }))}"></button>`).join("")}</div>
      <button class="hero-arrow" type="button" data-slide="1" aria-label="${esc(H.hero.next)}">${icon("arrow")}</button>
      <button class="btn btn-sand btn-sm hero-view" type="button" data-gallery-open="current">${icon("photo")}<span>${esc(f(H.hero.view, { n: heroSlides.length }))}</span></button>
    </div>
  </div>
  <div class="hero-inner">
    ${realBadge(f(H.hero.badge, { date: dates.deliveredOn }), "real-badge-inline")}
    <h1 id="hero-title">${words(H.hero.h1a)}<br><em>${words(H.hero.h1b)}</em></h1>
    <p class="hero-copy">${esc(H.hero.copy)}</p>
    <div class="hero-actions">
      <a class="btn btn-earth magnetic" href="#planner">${icon("route")}<span>${esc(H.hero.plan)}</span></a>
      <a class="btn btn-ghost magnetic" href="tel:+${site.contact.whatsapp}">${icon("phone")}<span>${esc(site.contact.whatsappDisplay)}</span></a>
    </div>
    <div class="hero-proof">
      <span>${icon("spark")}<strong>${esc(H.hero.proof.newLabel)}</strong>&nbsp;${esc(f(H.hero.proof.purchased, { date: dates.purchased }))}</span>
      <span>${icon("seat")}<strong>${esc(f(H.hero.proof.seats, { n: site.vehicle.seats }))}</strong></span>
      <span>${icon("snowflake")}<strong>${esc(H.hero.proof.ac)}</strong></span>
      <span>${icon("users")}<strong>${esc(H.hero.proof.driver)}</strong>&nbsp;${esc(H.hero.proof.support)}</span>
      <span>${icon("compass")}<strong>${esc(H.hero.proof.guided)}</strong></span>
      <span>${icon("train")}<strong>${esc(H.hero.proof.station)}</strong>&nbsp;${esc(H.hero.proof.drop)}</span>
    </div>
  </div>
  <a class="scroll-cue" href="#intro" aria-label="${esc(H.hero.scrollCue)}">${icon("arrow")}</a>
</section>

<section class="band band-white" id="intro" aria-labelledby="intro-title">
  <div class="wrap intro">
    <h2 id="intro-title">${esc(H.intro.h2)}</h2>
    <p>${esc(H.intro.p)}</p>
  </div>
  <figure class="cinematic" data-parallax="9">
    <span class="bar bar-top" aria-hidden="true"></span>
    ${P("koraput-valley", { alt: H.intro.photoAlt, sizes: "100vw" })}
    <figcaption>
      <strong>${esc(H.intro.caption)}</strong>
      <span>${icon("pin")}${esc(H.intro.captionSub)}</span>
    </figcaption>
    <span class="bar bar-bottom" aria-hidden="true"></span>
  </figure>
</section>

<section class="journey band-dark" id="journey" aria-labelledby="journey-title">
  <div class="journey-title">
    <canvas id="terrain" aria-hidden="true"></canvas>
    <div class="wrap">
      <h2 id="journey-title">${esc(H.journey.h2a)} <strong>${esc(H.journey.h2b)}</strong></h2>
      <p>${esc(H.journey.p)}</p>
    </div>
  </div>
  <div class="wrap road-track">
    <svg class="road-svg" aria-hidden="true"><path class="road-base"/><path class="road-edge"/><path class="road-dash"/><path class="road-drawn"/></svg>
    <div class="van" aria-hidden="true">
      <svg viewBox="0 0 64 34" class="van-top">
        <ellipse cx="32" cy="30" rx="26" ry="3" fill="rgba(0,0,0,0.45)"/>
        <rect x="6" y="8" width="52" height="18" rx="5" fill="#fff"/>
        <path d="M52 8 h4 a6 6 0 0 1 6 6 v6 a6 6 0 0 1 -6 6 h-4 z" fill="#fff"/>
        <rect x="10" y="10" width="34" height="14" rx="2" fill="#dbe7f5"/>
        <g fill="#fff"><rect x="17" y="10" width="2" height="14"/><rect x="24" y="10" width="2" height="14"/><rect x="31" y="10" width="2" height="14"/><rect x="38" y="10" width="2" height="14"/></g>
        <rect x="46" y="10" width="10" height="14" rx="2" fill="#cfe0f3"/>
        <rect x="22" y="12" width="10" height="10" rx="2" fill="#e9eef5"/>
        <rect x="6" y="15" width="52" height="3" fill="#f26a1b"/>
        <rect x="60" y="11" width="3" height="4" rx="1" fill="#ffd27a"/><rect x="60" y="19" width="3" height="4" rx="1" fill="#ffd27a"/>
        <rect x="3" y="11" width="3" height="4" rx="1" fill="#e04b4b"/><rect x="3" y="19" width="3" height="4" rx="1" fill="#e04b4b"/>
        <g fill="#1a1a1a"><rect x="12" y="5" width="8" height="4" rx="1.5"/><rect x="44" y="5" width="8" height="4" rx="1.5"/><rect x="12" y="25" width="8" height="4" rx="1.5"/><rect x="44" y="25" width="8" height="4" rx="1.5"/></g>
      </svg>
    </div>
    <article class="stop stop-start">
      <span class="stop-marker stop-marker-flag" aria-hidden="true"><i>${icon("pin")}</i></span>
      <div class="stop-body">
        <span class="stop-kind">${icon("pin")}${esc(H.journey.start)}</span>
        <h3>${esc(H.journey.startTitle)}</h3>
        <p>${esc(H.journey.startP)}</p>
        <div class="stop-vehicle">${P("traveller-front-garland", { alt: H.journey.vehicleAlt, sizes: "12rem" })}<span>${esc(f(H.journey.vehicleCaption, { date: dates.deliveredOn }))}</span></div>
      </div>
    </article>
    ${journey.map(stop).join("\n")}
    <article class="stop stop-end">
      <span class="stop-marker stop-marker-flag" aria-hidden="true"><i>${icon("check")}</i></span>
      <div class="stop-body">
        <span class="stop-kind">${icon("pin")}${esc(H.journey.end)}</span>
        <h3>${esc(H.journey.endTitle)}</h3>
        <p>${esc(H.journey.endP)}</p>
        <div class="btn-row" style="justify-content:center">
          <a class="btn btn-sand" href="#planner">${icon("route")}<span>${esc(H.journey.buildTrip)}</span></a>
          <a class="btn btn-ghost js-whatsapp" href="${waHref()}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<span>${esc(H.journey.whatsappAnanta)}</span></a>
        </div>
      </div>
    </article>
  </div>
</section>

<section class="band band-grey" id="itineraries" aria-labelledby="itineraries-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="itineraries-title">${esc(H.itineraries.h2)}</h2>
      <p class="lede">${esc(H.itineraries.lede)}</p>
    </div>
    <div class="itin-grid">
      ${itin.map(([slug, n], i) => `<a class="itin-card${n === 3 ? " is-featured" : ""}" href="${L.page(slug)}"><b>${n}</b><span class="itin-day">${esc(n === 1 ? H.itineraries.dayOne : H.itineraries.days)}</span><strong>${esc(H.itineraries.cards[i].title)}</strong><small>${esc(H.itineraries.cards[i].sub)}</small><span class="itin-more">${esc(H.itineraries.seePlan)} ${icon("arrow")}</span></a>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="band band-white" id="planner" aria-labelledby="planner-title">
  <div class="wrap planner-grid">
    <div class="planner-copy">
      <h2 id="planner-title">${esc(H.planner.h2)}</h2>
      <p class="lede">${esc(H.planner.lede)}</p>
      <ul>
        ${H.planner.bullets.map(b => `<li>${icon("check")}${esc(b)}</li>`).join("\n        ")}
      </ul>
    </div>
    <form class="planner" id="trip-form">
      <fieldset>
        <legend>${icon("pin")}${esc(H.planner.from)}</legend>
        <div class="chips">
          ${H.planner.origins.map((o, i) => `<label class="chip"><input type="radio" name="origin" value="${esc(H.planner.originValues[i])}"${i === 0 ? " checked" : ""}><span>${esc(o)}</span></label>`).join("\n          ")}
        </div>
      </fieldset>
      <fieldset>
        <legend>${icon("users")}${esc(H.planner.people)}</legend>
        <div class="chips">
          <label class="chip"><input type="radio" name="people" value="2–5"><span>2–5</span></label>
          <label class="chip"><input type="radio" name="people" value="6–10" checked><span>6–10</span></label>
          <label class="chip"><input type="radio" name="people" value="11–17"><span>11–17</span></label>
        </div>
      </fieldset>
      <fieldset>
        <legend>${icon("calendar")}${esc(H.planner.days)}</legend>
        <div class="chips">
          ${H.planner.dayChips.map((c, i) => `<label class="chip"><input type="radio" name="days" value="${i + 1}"${i === 2 ? " checked" : ""}><span>${esc(c)}</span></label>`).join("\n          ")}
        </div>
      </fieldset>
      <div class="date-field">
        <label for="trip-date">${esc(H.planner.when)} <small>${esc(H.planner.optional)}</small></label>
        <input type="date" id="trip-date" name="date">
      </div>
      <fieldset>
        <legend>${icon("pin")}${esc(H.planner.places)} <small>${esc(H.planner.optional)}</small></legend>
        <div class="chips chips-multi">
          ${dests.map(d => `<label class="chip"><input type="checkbox" name="places" value="${esc(td(d).name)}"><span>${icon(d.icon)}${esc(td(d).name)}</span></label>`).join("\n          ")}
        </div>
      </fieldset>
      <div class="route-result" aria-live="polite">
        <h3 id="route-title">${esc(H.planner.routeTitle)}</h3>
        <div class="route-days" id="route-days"></div>
      </div>
      <button class="btn btn-earth" type="submit">${icon("whatsapp")}<span>${esc(H.planner.submit)}</span></button>
      <p class="form-note">${icon("shield")}<span>${esc(H.planner.note)}</span></p>
    </form>
  </div>
</section>

<section class="band band-grey" id="destinations" aria-labelledby="destinations-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="destinations-title">${esc(H.destinations.h2)}</h2>
      <p class="lede">${esc(H.destinations.lede)}</p>
    </div>
    <div class="dest-grid">
      ${dests.map((d, i) => destCard(d, i === 0)).join("\n")}
    </div>
  </div>
</section>

<section class="band band-white" id="together" aria-labelledby="together-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="together-title">${esc(H.together.h2)}</h2>
      <p class="lede">${esc(H.together.lede)}</p>
    </div>
    <div class="compare">
      <div class="compare-card compare-bad">
        <div class="compare-head"><span>${esc(H.together.badLabel)}</span><strong>${esc(H.together.badTitle)}</strong></div>
        <div class="scene scene-cars" aria-hidden="true">
          <svg viewBox="0 0 420 120" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="86" width="420" height="34" fill="#e9ecf1"/>
            <path class="scene-dash" d="M0 103 H420" stroke="#fff" stroke-width="3" stroke-dasharray="18 14"/>
            <g transform="translate(0,52)">
              ${car(14, 4).replace('class="car"', 'class="car car-1"')}${car(112, 5).replace('class="car"', 'class="car car-2"')}${car(224, 4).replace('class="car"', 'class="car car-3"')}${car(332, 4).replace('class="car"', 'class="car car-4"')}
            </g>
            ${bubble("bubble-1", 150, 16, 44, H.together.bubbles[0])}
            ${bubble("bubble-2", 262, 8, 60, H.together.bubbles[1])}
            ${bubble("bubble-3", 40, 12, 70, H.together.bubbles[2])}
          </svg>
        </div>
        <ul class="compare-list">
          ${H.together.badList.map(([a, b], i) => `<li><span class="cmp-ic">${icon(cmpIcons[i])}</span><div><strong>${esc(a)}</strong><small>${esc(b)}</small></div></li>`).join("\n          ")}
        </ul>
      </div>
      <div class="compare-vs" aria-hidden="true">vs</div>
      <div class="compare-card compare-good">
        <div class="compare-head"><span>${esc(H.together.goodLabel)}</span><strong>${esc(H.together.goodTitle)}</strong></div>
        <div class="scene scene-van" aria-hidden="true">
          <svg viewBox="0 0 420 120" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="86" width="420" height="34" fill="#232323"/>
            <path class="scene-dash" d="M0 103 H420" stroke="#f26a1b" stroke-width="3" stroke-dasharray="18 14"/>
            <g class="van-unit">
              <g class="van-body">
                <rect x="58" y="34" width="250" height="52" rx="10" fill="#ffffff"/>
                <path d="M308 44 q30 2 42 26 v16 h-42 z" fill="#ffffff"/>
                <rect x="70" y="42" width="215" height="22" rx="4" fill="#dbe7f5"/>
                <g fill="#ffffff"><rect x="107" y="42" width="4" height="22"/><rect x="144" y="42" width="4" height="22"/><rect x="181" y="42" width="4" height="22"/><rect x="218" y="42" width="4" height="22"/><rect x="255" y="42" width="4" height="22"/></g>
                <rect x="316" y="48" width="30" height="16" rx="3" fill="#dbe7f5"/>
                <rect x="58" y="70" width="292" height="5" fill="#f26a1b"/>
                <rect x="340" y="70" width="10" height="8" rx="2" fill="#ffd27a"/>
                <text x="180" y="82" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="1" fill="#3b4250">ANANTA TOURS &amp; TRAVELS</text>
                <g class="wheel"><circle cx="100" cy="88" r="9" fill="#2a2a2a"/><circle cx="100" cy="88" r="4" fill="#9aa0aa"/><path d="M100 79 v18 M91 88 h18" stroke="#2a2a2a" stroke-width="2"/></g>
                <g class="wheel"><circle cx="300" cy="88" r="9" fill="#2a2a2a"/><circle cx="300" cy="88" r="4" fill="#9aa0aa"/><path d="M300 79 v18 M291 88 h18" stroke="#2a2a2a" stroke-width="2"/></g>
              </g>
              <g class="people">${people}</g>
              <g class="check-badge"><circle cx="352" cy="30" r="16" fill="#22883f"/><path d="M344 30 l6 6 l11 -12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></g>
              <g class="people-pill"><rect x="58" y="6" width="170" height="20" rx="10" fill="#f26a1b"/><text x="143" y="20" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${esc(H.together.pill)}</text></g>
            </g>
          </svg>
        </div>
        <ul class="compare-list">
          ${H.together.goodList.map(([a, b], i) => `<li><span class="cmp-ic">${icon(goodIcons[i])}</span><div><strong>${esc(a)}</strong><small>${esc(b)}</small></div></li>`).join("\n          ")}
        </ul>
        <a class="text-link" href="${L.page("group-tour-koraput")}">${esc(H.together.howGroupDay)} ${icon("arrow")}</a>
      </div>
    </div>
    <ul class="compare-stats" aria-label="${esc(H.together.statsAria)}">
      ${H.together.stats.map(([a, b], i) => `<li>${icon(statIcons[i])}<span class="stat-from">${esc(a)}</span><span class="stat-arrow">${icon("arrow")}</span><span class="stat-to">${esc(b)}</span></li>`).join("\n      ")}
    </ul>
  </div>
</section>

<section class="band band-grey" id="traveller" aria-labelledby="vehicle-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="vehicle-title">${esc(H.traveller.h2)}</h2>
      <p class="lede">${esc(f(H.traveller.lede, { date: dates.deliveredOn }))}</p>
    </div>
    <div class="gallery" id="vehicle-gallery">
      <figure class="gallery-main">
        <div class="gallery-stage" data-gallery-open="gallery" role="button" tabindex="0" aria-label="${esc(H.traveller.openFull)}">
          ${gal.map((g, i) => P(g.photo, { alt: g.alt, sizes: "(min-width: 1180px) 1100px, 100vw", cls: "gallery-img" + (i === 0 ? " is-active" : ""), attrs: `data-lb="${g.lb}"` })).join("\n          ")}
        </div>
        ${realBadge(U.realPhoto)}
        <span class="gallery-count" id="gallery-count" aria-hidden="true">1 / ${gal.length}</span>
        <button class="gallery-arrow gallery-prev" type="button" data-gallery-step="-1" aria-label="${esc(H.hero.prev)}">${icon("arrow")}</button>
        <button class="gallery-arrow gallery-next" type="button" data-gallery-step="1" aria-label="${esc(H.hero.next)}">${icon("arrow")}</button>
        <figcaption id="gallery-caption">${esc(gal[0].caption)}</figcaption>
      </figure>
      <div class="gallery-thumbs" role="tablist" aria-label="${esc(H.traveller.thumbsAria)}">
        ${gal.map((g, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-index="${i}" data-caption="${esc(g.caption)}">${P(g.photo, { alt: "", sizes: "(min-width: 900px) 14rem, 40vw" })}<span class="thumb-text"><strong>${esc(g.label)}</strong><small>${i + 1}/${gal.length}</small></span></button>`).join("\n        ")}
      </div>
    </div>
    <p class="gallery-note">${icon("shield")}<span>${esc(f(H.traveller.galleryNote, { date: dates.deliveredOn }))}</span></p>
  </div>
  <div class="wrap vehicle-grid">
    <div class="vehicle-copy">
      <div class="fact-grid">
        ${H.traveller.facts.map(([a, b], i) => `<div class="fact">${icon(factIcons[i])}<div><strong>${esc(a)}</strong><small>${esc(f(b, { date: dates.purchased }))}</small></div></div>`).join("\n        ")}
      </div>
      <p class="vehicle-note">${icon("camera")}<span>${esc(H.traveller.note)}</span></p>
      <a class="text-link" href="${L.page("17-seater-traveller-koraput")}">${esc(H.traveller.more)} ${icon("arrow")}</a>
    </div>
    <div class="seat-stage" aria-label="${esc(H.traveller.seatsAria)}">
      <div class="seat-head"><strong>17</strong><span>${esc(H.traveller.seatsTap)}</span></div>
      <div class="seatmap" id="seatmap"></div>
      <p class="seat-info" id="seat-info">${esc(H.traveller.seatInfo)}</p>
      <div class="seat-legend" aria-hidden="true">${H.traveller.legend.map((l, i) => `<span><i style="background:${["#c47a45", "#f26a1b", "#333"][i]}"></i>${esc(l)}</span>`).join("")}</div>
    </div>
  </div>
</section>

<section class="band band-white" id="prices" aria-labelledby="prices-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="prices-title">${esc(H.price.h2)}</h2>
      <p class="lede">${esc(H.price.lede)}</p>
    </div>
    <div class="price-grid">
      <div class="price-copy">
        <ul class="price-drivers">
          ${H.price.drivers.map(([a, b], i) => `<li>${icon(priceIcons[i])}<div><strong>${esc(a)}</strong><small>${esc(b)}</small></div></li>`).join("\n          ")}
        </ul>
        ${ratesTable()}
        <div class="price-lists">
          <div class="price-list price-in"><h3>${icon("check")}${esc(H.price.includedLabel)}</h3><ul>${H.price.included.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>
          <div class="price-list price-out"><h3>${icon("info")}${esc(H.price.excludedLabel)}</h3><ul>${H.price.excluded.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>
        </div>
        <a class="text-link" href="${L.page("koraput-traveller-price")}">${esc(H.price.more)} ${icon("arrow")}</a>
      </div>
      <aside class="quote-card">
        <h3>${icon("chat")}${esc(H.price.cardTitle)}</h3>
        <ol>${H.price.cardLines.map(l => `<li>${esc(l)}</li>`).join("")}</ol>
        <a class="btn btn-earth js-whatsapp" href="${waHref()}" target="_blank" rel="noopener noreferrer">${icon("whatsapp")}<span>${esc(H.price.cta)}</span></a>
        <p class="quote-note">${icon("shield")}<span>${esc(H.price.note)}</span></p>
      </aside>
    </div>
  </div>
</section>

<section class="band band-white" id="team" aria-labelledby="team-title">
  <div class="wrap team-grid">
    <figure class="team-photo" data-parallax="6">
      ${P("koraput-sunrise", { alt: H.team.photoAlt, sizes: "(min-width: 900px) 45vw, 100vw" })}
      <figcaption>${icon("sunrise")}${esc(H.team.caption)}</figcaption>
    </figure>
    <div class="team-copy">
      <h2 id="team-title">${esc(H.team.h2)}</h2>
      <blockquote>${esc(H.team.quote)}</blockquote>
      <p>${esc(H.team.p)}</p>
      <ul class="role-list">
        ${H.team.roles.map(([a, b], i) => `<li><span class="role-ic">${icon(roleIcons[i])}</span><div><strong>${esc(a)}</strong><small>${esc(b)}</small></div></li>`).join("\n        ")}
      </ul>
    </div>
  </div>
</section>

<section class="band band-grey" id="booking" aria-labelledby="booking-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="booking-title">${esc(H.booking.h2)}</h2>
      <p class="lede">${esc(H.booking.lede)}</p>
    </div>
    <ol class="steps">
      ${H.booking.steps.map(([a, b]) => `<li><strong>${esc(a)}</strong><p>${esc(b)}</p></li>`).join("\n      ")}
    </ol>
    <p class="steps-note">${icon("shield")}<span>${esc(H.booking.note)}</span></p>
  </div>
</section>

<section class="band band-white" id="map" aria-labelledby="map-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="map-title">${esc(H.map.h2)}</h2>
      <p class="lede">${esc(H.map.lede)}</p>
    </div>
    <div class="map-grid">
      <div class="map-frame">
        <p class="map-loading">${esc(H.map.loading)}</p>
        <div id="gmap" hidden></div>
        <iframe id="map-embed" src="${embedUrl}" title="${esc(H.map.iframeTitle)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
      <div>
        <ul class="pin-list">
          <li><span class="pin-letter">${icon("pin")}</span><span class="pin-name">${esc(H.map.town)}<small>${esc(H.map.townSub)}</small></span><a href="https://www.google.com/maps/search/?api=1&query=${site.koraput.lat}%2C${site.koraput.lng}" target="_blank" rel="noopener noreferrer">${esc(H.map.open)} ${icon("arrow-up-right")}</a></li>
          ${dests.map(d => { const t = td(d); return `<li><span class="pin-letter">${icon(d.icon)}</span><span class="pin-name">${esc(t.name)}<small>${esc(t.drive)} · ${d.km} km</small></span><a href="${mapsLink(d)}" target="_blank" rel="noopener noreferrer">${esc(H.map.open)} ${icon("arrow-up-right")}</a></li>`; }).join("\n")}
        </ul>
        <p class="map-note">${esc(H.map.note)}</p>
      </div>
    </div>
  </div>
</section>

<section class="band band-grey" id="origins" aria-labelledby="origins-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="origins-title">${esc(H.origins.h2)}</h2>
      <p class="lede">${esc(H.origins.lede)}</p>
    </div>
    <div class="origin-grid">
      ${[["bbs", "rail-train", "koraput-tour-package-from-bhubaneswar"], ["kol", "rail-bridge", "koraput-tour-package-from-kolkata"], ["vzg", "rail-viaduct", "koraput-tour-package-from-visakhapatnam"]].map(([k, photo, slug]) => `<article class="origin-card">
        ${P(photo, { alt: H.origins[k].alt, sizes: "(min-width: 900px) 33vw, 100vw" })}
        <div class="origin-body">
          <span>${icon("train")}${esc(H.origins[k].label)}</span>
          <h3>${esc(H.origins[k].h3)}</h3>
          <p>${esc(H.origins[k].p)}</p>
        </div>
        <a class="card-link" href="${L.page(slug)}"><span>${esc(H.origins[k].link)}</span></a>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="band band-white" id="stations" aria-labelledby="stations-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="stations-title">${esc(H.stations.h2)}</h2>
      <p class="lede">${esc(H.stations.lede)}</p>
    </div>
    <div class="station-grid">
      ${stations.main.map(s => `<article class="station-card">
        <div class="station-top">${icon("train")}<span class="station-code">${esc(s.code)}</span></div>
        <h3>${esc(N[s.code] || s.name)}</h3>
        <p>${esc(S[s.code] || s.trains)}</p>
        <div class="station-meta"><span>${icon("clock")}${esc(f(H.stations.fromBase, { drive: dur(s.drive) }))}</span><span>${icon("road")}${esc(f(H.stations.aboutKm, { km: s.kmBase }))}</span></div>
        <a href="https://www.google.com/maps/search/?api=1&query=${s.lat}%2C${s.lng}" target="_blank" rel="noopener noreferrer">${esc(H.stations.openMaps)} ${icon("arrow-up-right")}</a>
      </article>`).join("")}
    </div>
    <details class="station-halts">
      <summary>${esc(H.stations.haltsSummary)} <span>${icon("spark")}</span></summary>
      <p>${esc(H.stations.haltsP)}</p>
      <ul class="halt-list">
        ${stations.halts.map(h => `<li><b>${esc(N[h.code] || h.name)}<code>${esc(h.code)}</code></b><small>${esc(dur(h.drive))} · ${esc(U.lines[h.line] || h.line)}</small></li>`).join("")}
      </ul>
    </details>
    <p class="station-note">${icon("info")}<span>${esc(H.stations.note)}</span></p>
    <div class="transport-grid">
      <article class="transport-card">
        <div class="station-top">${icon("wind")}<span class="station-code">${esc(transport.airport.code)}</span></div>
        <h3>${esc(f(H.stations.flightsH3, { airport: T.airportName }))}</h3>
        <p>${esc(f(H.stations.flightsP, { driveKoraput: dur(transport.airport.driveKoraput), driveBase: dur(transport.airport.driveBase) }))}</p>
        <table class="timetable">
          <thead><tr><th>${esc(H.stations.route)}</th><th>${esc(H.stations.times)}</th><th>${esc(H.stations.runs)}</th></tr></thead>
          <tbody>${transport.flights.map((fl, i) => `<tr><td>${esc(T.flights[i].route)}</td><td>${esc(fl.times)}</td><td>${esc(T.flights[i].days)}</td></tr>`).join("")}</tbody>
        </table>
        <p class="transport-note">${esc(T.flightNote)}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${transport.airport.lat}%2C${transport.airport.lng}" target="_blank" rel="noopener noreferrer">${esc(H.stations.openAirport)} ${icon("arrow-up-right")}</a>
      </article>
      <article class="transport-card">
        <div class="station-top">${icon("route")}<span class="station-code">BUS</span></div>
        <h3>${esc(H.stations.busH3)}</h3>
        <p>${esc(H.stations.busP)}</p>
        <ul class="bus-list">
          ${T.buses.map(b => `<li><strong>${esc(b.from)}</strong><span>${esc(b.text)}</span></li>`).join("")}
        </ul>
      </article>
    </div>
    <p class="station-note station-verified">${icon("clock")}<span>${esc(f(H.stations.busNote, { checked: dates.checked }))}</span></p>
  </div>
</section>

<section class="band band-grey" id="faq" aria-labelledby="faq-title">
  <div class="wrap faq-grid">
    <div class="section-head">
      <h2 id="faq-title">${esc(H.faq.h2)}</h2>
      <p class="lede">${esc(H.faq.lede)}</p>
    </div>
    <div class="faq-list">
      ${H.faq.items.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary>${esc(q)}<span>${icon("spark")}</span></summary><p>${esc(a)}</p></details>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="band band-grey">
  <div class="wrap">
    ${ctaCard(L, { photo: "traveller-front-hill", heading: H.cta.heading, text: H.cta.text })}
  </div>
</section>

<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="${esc(H.lightbox.aria)}">
  <button class="lb-close" type="button" aria-label="${esc(H.lightbox.close)}">${icon("close")}</button>
  <button class="lb-arrow lb-prev" type="button" aria-label="${esc(H.lightbox.prev)}">${icon("arrow")}</button>
  <figure class="lb-figure"><img id="lb-img" alt="" decoding="async"><figcaption><span id="lb-caption"></span><span class="lb-count" id="lb-count"></span></figcaption></figure>
  <button class="lb-arrow lb-next" type="button" aria-label="${esc(H.lightbox.next)}">${icon("arrow")}</button>
  <div class="lb-thumbs" id="lb-thumbs">${heroSlides.map((s, i) => `<button type="button" data-lb-to="${i}" aria-label="${esc(f(H.lightbox.photoN, { n: i + 1 }))}">${P(s.photo, { alt: "", sizes: "6rem" })}</button>`).join("")}</div>
</div>
<script id="gallery-data" type="application/json">${JSON.stringify(heroSlides.map(s => { const m = manifest[s.photo]; const w = Math.max(...m.sizes); return { src: `assets/photos/${s.photo}-${w}.webp`, fallback: `assets/photos/${s.photo}-960.jpg`, caption: s.caption, alt: s.alt }; }))}</script>
<script id="site-data" type="application/json">${JSON.stringify({ destinations: dests.map(d => { const t = td(d); return { slug: d.slug, name: t.name, icon: d.icon, lat: d.lat, lng: d.lng, kind: t.kind, drive: t.drive, km: d.km, page: d.page || null }; }), koraput: site.koraput })}</script>`;

  const c = site.contact;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: "Ananta Tours",
      description: H.jsonDescription,
      url: site.url,
      inLanguage: L.code,
      knowsLanguage: ["en", "or", "hi", "bn", "te"],
      logo: `${site.url}/assets/logo-960.png`,
      image: [`${site.url}/assets/photos/traveller-front-garland-1600.webp`, `${site.url}/assets/photos/traveller-side-1600.webp`, `${site.url}/assets/photos/traveller-cabin-1600.webp`],
      areaServed: [{ "@type": "AdministrativeArea", name: "Koraput district, Odisha, India" }, { "@type": "State", name: "Odisha" }],
      telephone: "+" + c.whatsapp,
      email: c.email,
      address: { "@type": "PostalAddress", streetAddress: c.address.street, addressLocality: c.address.locality, addressRegion: c.address.region, postalCode: c.address.postalCode, addressCountry: "IN" },
      geo: { "@type": "GeoCoordinates", latitude: site.base ? site.base.lat : 18.7227, longitude: site.base ? site.base.lng : 82.8678 },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address.locality + ", " + c.address.district + ", " + c.address.region)}`,
      contactPoint: [{ "@type": "ContactPoint", contactType: "reservations", telephone: "+" + c.whatsapp, email: c.email, availableLanguage: ["English", "Odia", "Hindi", "Bengali", "Telugu"] }],
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "UPI, bank transfer, cash",
      makesOffer: dests.filter(d => d.page).map(d => ({ "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: `${td(d).name} day trip`, url: `${site.url}/${L.has(d.page) ? L.lang.folder : ""}${d.page}/` } })),
      owns: { "@type": "Vehicle", name: "Force Traveller 17-seater AC", vehicleSeatingCapacity: site.vehicle.seats, purchaseDate: "2026-09-04", vehicleConfiguration: "2+1 pushback seats, air conditioned, all-India permit" }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: ["en", "or", "hi", "bn", "te"],
      publisher: { "@id": `${site.url}/#organization` },
      dateModified: updated || new Date().toISOString().slice(0, 10)
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: L.code,
      mainEntity: H.faq.items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: H.destinations.h2,
      inLanguage: L.code,
      itemListElement: dests.map((d, i) => { const t = td(d); return { "@type": "ListItem", position: i + 1, item: { "@type": "TouristAttraction", name: t.name, description: t.blurb, geo: { "@type": "GeoCoordinates", latitude: d.lat, longitude: d.lng }, url: d.page ? `${site.url}/${L.has(d.page) ? L.lang.folder : ""}${d.page}/` : `${site.url}/koraput-sightseeing/#${d.slug}` } }; })
    }
  ];

  return layout(L, {
    title: H.title,
    description: H.description,
    path: "",
    body,
    jsonld,
    preloadHero: true,
    heroPhoto: "traveller-front-garland",
    ogImage: "assets/photos/traveller-front-garland-960.jpg",
    isHome: true,
    alternates
  });
}

module.exports = { render };
