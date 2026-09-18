const site = require("./site");
const dests = require("./destinations");
const stations = require("./stations");
const { esc, pic, icon, layout, ctaCard, realBadge } = require("./templates");

const words = text => text.split(" ").map(w => `<span class="hero-word"><span>${esc(w)}</span></span>`).join(" ");
const enc = s => encodeURIComponent(s).replace(/%20/g, "+");
const byId = Object.fromEntries(dests.map(d => [d.slug, d]));

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

function stop(d, i) {
  // Photo alternates sides; the road marker sits under the photo edge so the road weaves without crossing text.
  const x = i % 2 === 0 ? 56 : 44;
  return `<article class="stop" id="stop-${d.slug}" style="--mx:${x}%">
  <span class="stop-marker" aria-hidden="true"><i>${i + 1}</i></span>
  <div class="stop-media" data-parallax="7">${pic(d.photo, { alt: `${d.name}, Koraput`, sizes: "(min-width: 900px) 45vw, 100vw" })}</div>
  <div class="stop-body">
    <span class="stop-kind">${icon(d.icon)}${esc(d.kind)}</span>
    <h3>${esc(d.name)}</h3>
    <p>${esc(d.blurb)}</p>
    <div class="stop-meta"><span>${icon("clock")}${esc(d.drive)} from Koraput</span><span>${icon("road")}About ${d.km} km</span></div>
    ${d.page ? `<a class="text-link" href="${d.page}/">Plan a ${esc(d.name)} day ${icon("arrow")}</a>` : ""}
  </div>
</article>`;
}

function destCard(d, featured) {
  const href = d.page ? `${d.page}/` : `koraput-sightseeing/#${d.slug}`;
  return `<article class="dest-card tilt${featured ? " dest-featured" : ""}">
  ${pic(d.photo, { alt: `${d.name}, Koraput`, sizes: featured ? "(min-width: 900px) 40vw, 100vw" : "(min-width: 1100px) 25vw, (min-width: 600px) 50vw, 100vw" })}
  <div class="dest-body">
    <span class="dest-kind">${icon(d.icon)}${esc(d.kind)}</span>
    <h3>${esc(d.name)}</h3>
    <p>${esc(d.blurb)}</p>
    <div class="dest-meta"><span>${icon("clock")}${esc(d.drive)}</span><span>${icon("road")}${d.km} km</span></div>
    <span class="dest-more">${d.page ? "Read the guide" : "Where it fits"} ${icon("arrow")}</span>
  </div>
  <a class="card-link" href="${href}"><span>${esc(d.name)}</span></a>
</article>`;
}

const heroSlides = [
  { photo: "traveller-front-garland", alt: "Our Force Traveller with a marigold garland on delivery day", caption: `Delivery day, ${site.vehicle.deliveredOn}. Real photo of our Traveller.` },
  { photo: "traveller-side", alt: "Side view of our Force Traveller", caption: "Side view. Registration OD02 DT 9296, all-India permit." },
  { photo: "traveller-front-hill", alt: "Front of our Traveller on a Koraput hillside", caption: "On a Koraput hillside in its first week." },
  { photo: "traveller-cabin", alt: "Inside the Traveller: pushback seats in a 2+1 layout", caption: "Inside: 2+1 pushback seats, curtains, overhead rack, AC vents." },
  { photo: "traveller-rear", alt: "Rear doors of our Traveller", caption: "Rear doors, emergency exit and our numbers." }
];

function render() {
  const journey = dests.filter(d => d.journey);
  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-media" id="hero-slider">
    ${heroSlides.map((s, i) => pic(s.photo, { alt: s.alt, sizes: "100vw", priority: i === 0, cls: "hero-slide" + (i === 0 ? " is-active" : "") })).join("\n    ")}
  </div>
  <div class="hero-shade" aria-hidden="true"></div>
  <button class="hero-open" type="button" aria-label="Open the photo gallery" data-gallery-open="0"></button>
  <div class="hero-ui" aria-label="Photo slider">
    <p class="hero-slide-caption" id="hero-slide-caption">${esc(heroSlides[0].caption)}</p>
    <div class="hero-ui-row">
      <button class="hero-arrow" type="button" data-slide="-1" aria-label="Previous photo">${icon("arrow")}</button>
      <div class="hero-dots" role="tablist">${heroSlides.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-slide-to="${i}" aria-label="Photo ${i + 1}: ${esc(s.caption)}"></button>`).join("")}</div>
      <button class="hero-arrow" type="button" data-slide="1" aria-label="Next photo">${icon("arrow")}</button>
      <button class="btn btn-sand btn-sm hero-view" type="button" data-gallery-open="current">${icon("photo")}<span>View ${heroSlides.length} photos</span></button>
    </div>
  </div>
  <div class="hero-inner">
    ${realBadge(`Real photo · our Traveller on delivery day, ${site.vehicle.deliveredOn}`, "real-badge-inline")}
    <h1 id="hero-title">${words("Discover Koraput.")}<br><em>${words("We’ll take care of the journey.")}</em></h1>
    <p class="hero-copy">Travel through the mountains, waterfalls and hidden landscapes of Koraput in our brand-new 17-seater AC Traveller, with a friendly local driver, support staff and guided-tour assistance.</p>
    <div class="hero-actions">
      <a class="btn btn-earth magnetic" href="#planner">${icon("route")}<span>Plan my Koraput trip</span></a>
      <button class="btn btn-ghost magnetic js-whatsapp" type="button">${icon("whatsapp")}<span>WhatsApp Ananta</span></button>
    </div>
    <div class="hero-proof" aria-label="Service facts">
      <span>${icon("spark")}<strong>New</strong>&nbsp;· purchased ${site.vehicle.purchased}</span>
      <span>${icon("seat")}<strong>${site.vehicle.seats} seats</strong></span>
      <span>${icon("snowflake")}<strong>Air conditioned</strong></span>
      <span>${icon("users")}<strong>Local driver</strong>&nbsp;&amp; support</span>
      <span>${icon("compass")}<strong>Guided tours</strong></span>
      <span>${icon("train")}<strong>Station pickup</strong>&nbsp;&amp; drop</span>
    </div>
  </div>
  <a class="scroll-cue" href="#intro" aria-label="Scroll to the next section">${icon("arrow")}</a>
</section>

<section class="band band-white" id="intro" aria-labelledby="intro-title">
  <div class="wrap intro">
    <h2 id="intro-title">One group, one vehicle, one unhurried Koraput.</h2>
    <p>For families, friends, pilgrim groups and small teams arriving from Bhubaneswar, Kolkata or further away. We plan the route around your arrival, drive you between the hills, waterfalls and temples, and stay reachable the whole way.</p>
  </div>
  <figure class="cinematic" data-parallax="9">
    <span class="bar bar-top" aria-hidden="true"></span>
    ${pic("koraput-valley", { alt: "Green valley near Sunabeda in the monsoon, Koraput district", sizes: "100vw" })}
    <figcaption>
      <strong>Monsoon valley near Sunabeda, on the road to Deomali.</strong>
      <span>${icon("pin")}Koraput district · about 20 minutes from our base</span>
    </figcaption>
    <span class="bar bar-bottom" aria-hidden="true"></span>
  </figure>
</section>

<section class="journey band-dark" id="journey" aria-labelledby="journey-title">
  <div class="journey-title">
    <canvas id="terrain" aria-hidden="true"></canvas>
    <div class="wrap">
      <h2 id="journey-title">17 seats. <strong>One incredible Koraput.</strong></h2>
      <p>Scroll the road. Every stop is one photograph, one sentence and how long the drive takes from Koraput town.</p>
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
        <span class="stop-kind">${icon("pin")}Start</span>
        <h3>Koraput town</h3>
        <p>Pickup at your hotel, the railway station or wherever your journey into the hills begins.</p>
        <div class="stop-vehicle">${pic("traveller-front-garland", { alt: "The Ananta Traveller, ready for pickup", sizes: "12rem" })}<span>Our Traveller, photographed on the day it arrived, ${site.vehicle.deliveredOn}. Real photo.</span></div>
      </div>
    </article>
    ${journey.map(stop).join("\n")}
    <article class="stop stop-end">
      <span class="stop-marker stop-marker-flag" aria-hidden="true"><i>${icon("check")}</i></span>
      <div class="stop-body">
        <span class="stop-kind">${icon("pin")}Back to Koraput</span>
        <h3>Where should we take you?</h3>
        <p>Pick your days and group size and we will shape the road around them.</p>
        <div class="btn-row" style="justify-content:center">
          <a class="btn btn-sand" href="#planner">${icon("route")}<span>Build my trip</span></a>
          <button class="btn btn-ghost js-whatsapp" type="button">${icon("whatsapp")}<span>WhatsApp Ananta</span></button>
        </div>
      </div>
    </article>
  </div>
</section>

<section class="band band-grey" id="itineraries" aria-labelledby="itineraries-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="itineraries-title">How many days do you have?</h2>
      <p class="lede">Four realistic plans, each one a page with timings, stops and what to skip. Pick the closest and we adjust it to your group.</p>
    </div>
    <div class="itin-grid">
      <a class="itin-card" href="koraput-1-day-itinerary/"><b>1</b><span class="itin-day">day</span><strong>Temple, museum, Kolab, Deomali sunset</strong><small>Long but doable from a night in town.</small><span class="itin-more">See the plan ${icon("arrow")}</span></a>
      <a class="itin-card" href="koraput-2-day-itinerary/"><b>2</b><span class="itin-day">days</span><strong>Town and Kolab, then Deomali and Rani Duduma</strong><small>The weekend version.</small><span class="itin-more">See the plan ${icon("arrow")}</span></a>
      <a class="itin-card is-featured" href="koraput-3-day-itinerary/"><b>3</b><span class="itin-day">days</span><strong>Adds Duduma Waterfall and the Machkund valley</strong><small>The sweet spot for most groups.</small><span class="itin-more">See the plan ${icon("arrow")}</span></a>
      <a class="itin-card" href="koraput-4-day-itinerary/"><b>4</b><span class="itin-day">days</span><strong>Adds Gupteswar cave temple and the Maliguda railway</strong><small>Every direction, nothing rushed.</small><span class="itin-more">See the plan ${icon("arrow")}</span></a>
    </div>
  </div>
</section>

<section class="band band-white" id="planner" aria-labelledby="planner-title">
  <div class="wrap planner-grid">
    <div class="planner-copy">
      <h2 id="planner-title">Build my Koraput trip</h2>
      <p class="lede">Three choices. We suggest the stops, then send you to WhatsApp with the enquiry already written.</p>
      <ul>
        <li>${icon("check")}No forms, no account, no payment yet</li>
        <li>${icon("check")}A route matched to your days</li>
        <li>${icon("check")}Price shared after we confirm the details</li>
      </ul>
    </div>
    <form class="planner" id="trip-form">
      <fieldset>
        <legend>${icon("pin")}Where are you travelling from?</legend>
        <div class="chips">
          <label class="chip"><input type="radio" name="origin" value="Bhubaneswar" checked><span>Bhubaneswar</span></label>
          <label class="chip"><input type="radio" name="origin" value="Kolkata"><span>Kolkata</span></label>
          <label class="chip"><input type="radio" name="origin" value="Visakhapatnam"><span>Visakhapatnam</span></label>
          <label class="chip"><input type="radio" name="origin" value="another city"><span>Somewhere else</span></label>
        </div>
      </fieldset>
      <fieldset>
        <legend>${icon("users")}How many people?</legend>
        <div class="chips">
          <label class="chip"><input type="radio" name="people" value="2–5"><span>2–5</span></label>
          <label class="chip"><input type="radio" name="people" value="6–10" checked><span>6–10</span></label>
          <label class="chip"><input type="radio" name="people" value="11–17"><span>11–17</span></label>
        </div>
      </fieldset>
      <fieldset>
        <legend>${icon("calendar")}How many days in Koraput?</legend>
        <div class="chips">
          <label class="chip"><input type="radio" name="days" value="1"><span>1 day</span></label>
          <label class="chip"><input type="radio" name="days" value="2"><span>2 days</span></label>
          <label class="chip"><input type="radio" name="days" value="3" checked><span>3 days</span></label>
          <label class="chip"><input type="radio" name="days" value="4"><span>4+ days</span></label>
        </div>
      </fieldset>
      <div class="date-field">
        <label for="trip-date">Around when? <small>(optional)</small></label>
        <input type="date" id="trip-date" name="date">
      </div>
      <fieldset>
        <legend>${icon("pin")}Places you want to include <small>(optional)</small></legend>
        <div class="chips chips-multi">
          ${dests.map(d => `<label class="chip"><input type="checkbox" name="places" value="${esc(d.name)}"><span>${icon(d.icon)}${esc(d.name)}</span></label>`).join("\n          ")}
        </div>
      </fieldset>
      <div class="route-result" aria-live="polite">
        <h3 id="route-title">Your 3-day Koraput journey</h3>
        <div class="route-days" id="route-days"></div>
      </div>
      <button class="btn btn-earth" type="submit">${icon("whatsapp")}<span>Get this itinerary and price on WhatsApp</span></button>
      <p class="form-note">${icon("shield")}<span>No payment is requested until your itinerary, price and availability are confirmed.</span></p>
    </form>
  </div>
</section>

<section class="band band-grey" id="destinations" aria-labelledby="destinations-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="destinations-title">Places worth the drive</h2>
      <p class="lede">Ten stops we know well. Start with the big three, then let the season and your days decide the rest.</p>
    </div>
    <div class="dest-grid">
      ${dests.map((d, i) => destCard(d, i === 0)).join("\n")}
    </div>
  </div>
</section>

<section class="band band-white" id="together" aria-labelledby="together-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="together-title">One group. One vehicle. One trip.</h2>
      <p class="lede">For 10 to 17 people, several small cars turn a holiday into coordination. One Traveller keeps everyone on the same road at the same time.</p>
    </div>
    <div class="compare">
      <div class="compare-card compare-bad">
        <div class="compare-head"><span>Three to five cars</span><strong>The group splits</strong></div>
        <div class="scene scene-cars" aria-hidden="true">
          <svg viewBox="0 0 420 120" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="86" width="420" height="34" fill="#e9ecf1"/>
            <path class="scene-dash" d="M0 103 H420" stroke="#fff" stroke-width="3" stroke-dasharray="18 14"/>
            <g transform="translate(0,52)">
              <g class="car car-1" style="--x:14px">
          <rect x="6" y="14" width="58" height="20" rx="7" fill="#d7dbe3"/>
          <path d="M18 14 L26 3 H48 L56 14 Z" fill="#c2c8d2"/>
          <rect x="28" y="5" width="18" height="8" rx="2" fill="#eef2f7"/>
          <rect x="6" y="30" width="58" height="4" rx="2" fill="#b7bdc8"/>
          <circle cx="20" cy="34" r="6" fill="#2a2a2a"/><circle cx="20" cy="34" r="2.4" fill="#9aa0aa"/>
          <circle cx="50" cy="34" r="6" fill="#2a2a2a"/><circle cx="50" cy="34" r="2.4" fill="#9aa0aa"/>
          <text x="35" y="26" text-anchor="middle" font-size="9" font-weight="700" fill="#3b4250">4</text>
        </g><g class="car car-2" style="--x:112px">
          <rect x="6" y="14" width="58" height="20" rx="7" fill="#d7dbe3"/>
          <path d="M18 14 L26 3 H48 L56 14 Z" fill="#c2c8d2"/>
          <rect x="28" y="5" width="18" height="8" rx="2" fill="#eef2f7"/>
          <rect x="6" y="30" width="58" height="4" rx="2" fill="#b7bdc8"/>
          <circle cx="20" cy="34" r="6" fill="#2a2a2a"/><circle cx="20" cy="34" r="2.4" fill="#9aa0aa"/>
          <circle cx="50" cy="34" r="6" fill="#2a2a2a"/><circle cx="50" cy="34" r="2.4" fill="#9aa0aa"/>
          <text x="35" y="26" text-anchor="middle" font-size="9" font-weight="700" fill="#3b4250">5</text>
        </g><g class="car car-3" style="--x:224px">
          <rect x="6" y="14" width="58" height="20" rx="7" fill="#d7dbe3"/>
          <path d="M18 14 L26 3 H48 L56 14 Z" fill="#c2c8d2"/>
          <rect x="28" y="5" width="18" height="8" rx="2" fill="#eef2f7"/>
          <rect x="6" y="30" width="58" height="4" rx="2" fill="#b7bdc8"/>
          <circle cx="20" cy="34" r="6" fill="#2a2a2a"/><circle cx="20" cy="34" r="2.4" fill="#9aa0aa"/>
          <circle cx="50" cy="34" r="6" fill="#2a2a2a"/><circle cx="50" cy="34" r="2.4" fill="#9aa0aa"/>
          <text x="35" y="26" text-anchor="middle" font-size="9" font-weight="700" fill="#3b4250">4</text>
        </g><g class="car car-4" style="--x:332px">
          <rect x="6" y="14" width="58" height="20" rx="7" fill="#d7dbe3"/>
          <path d="M18 14 L26 3 H48 L56 14 Z" fill="#c2c8d2"/>
          <rect x="28" y="5" width="18" height="8" rx="2" fill="#eef2f7"/>
          <rect x="6" y="30" width="58" height="4" rx="2" fill="#b7bdc8"/>
          <circle cx="20" cy="34" r="6" fill="#2a2a2a"/><circle cx="20" cy="34" r="2.4" fill="#9aa0aa"/>
          <circle cx="50" cy="34" r="6" fill="#2a2a2a"/><circle cx="50" cy="34" r="2.4" fill="#9aa0aa"/>
          <text x="35" y="26" text-anchor="middle" font-size="9" font-weight="700" fill="#3b4250">4</text>
        </g>
            </g>
            <g class="bubble bubble-1" style="--x:150px;--y:16px"><rect x="0" y="0" width="44" height="26" rx="8" fill="#fff" stroke="#e3e6ec"/><path d="M14 26 l6 8 l4 -8" fill="#fff" stroke="#e3e6ec"/><text x="22" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#c93b3b">?</text></g>
            <g class="bubble bubble-2" style="--x:262px;--y:8px"><rect x="0" y="0" width="52" height="26" rx="8" fill="#fff" stroke="#e3e6ec"/><path d="M16 26 l6 8 l4 -8" fill="#fff" stroke="#e3e6ec"/><text x="26" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="#c93b3b">Where?</text></g>
            <g class="bubble bubble-3" style="--x:40px;--y:12px"><rect x="0" y="0" width="58" height="26" rx="8" fill="#fff" stroke="#e3e6ec"/><path d="M18 26 l6 8 l4 -8" fill="#fff" stroke="#e3e6ec"/><text x="29" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="#c93b3b">Waiting…</text></g>
          </svg>
        </div>
        <ul class="compare-list">
          <li><span class="cmp-ic">${icon("users")}</span><div><strong>The group separates</strong><small>Different drivers, different arrival times at every stop.</small></div></li>
          <li><span class="cmp-ic">${icon("phone")}</span><div><strong>Calls to find each other</strong><small>"Where are you?" at every viewpoint and every lunch.</small></div></li>
          <li><span class="cmp-ic">${icon("luggage")}</span><div><strong>Luggage in the wrong car</strong><small>Bags split across boots; someone's jacket is always elsewhere.</small></div></li>
          <li><span class="cmp-ic">${icon("chat")}</span><div><strong>Half the group misses the story</strong><small>The driver's explanation reaches one car, not five.</small></div></li>
        </ul>
      </div>
      <div class="compare-vs" aria-hidden="true">vs</div>
      <div class="compare-card compare-good">
        <div class="compare-head"><span>One Traveller</span><strong>Everyone together</strong></div>
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
              <g class="people"><circle class="person" cx="78" cy="49" r="3.2" fill="#f26a1b"/><circle class="person" cx="93" cy="49" r="3.2" fill="#f26a1b"/><circle class="person" cx="108" cy="49" r="3.2" fill="#f26a1b"/><circle class="person" cx="123" cy="49" r="3.2" fill="#f26a1b"/><circle class="person" cx="138" cy="49" r="3.2" fill="#f26a1b"/><circle class="person" cx="153" cy="49" r="3.2" fill="#f26a1b"/><circle class="person" cx="168" cy="49" r="3.2" fill="#f26a1b"/><circle class="person" cx="183" cy="49" r="3.2" fill="#f26a1b"/><circle class="person" cx="198" cy="49" r="3.2" fill="#f26a1b"/><circle class="person" cx="78" cy="58" r="3.2" fill="#f26a1b"/><circle class="person" cx="93" cy="58" r="3.2" fill="#f26a1b"/><circle class="person" cx="108" cy="58" r="3.2" fill="#f26a1b"/><circle class="person" cx="123" cy="58" r="3.2" fill="#f26a1b"/><circle class="person" cx="138" cy="58" r="3.2" fill="#f26a1b"/><circle class="person" cx="153" cy="58" r="3.2" fill="#f26a1b"/><circle class="person" cx="168" cy="58" r="3.2" fill="#f26a1b"/><circle class="person" cx="183" cy="58" r="3.2" fill="#f26a1b"/></g>
              <g class="check-badge"><circle cx="352" cy="30" r="16" fill="#22883f"/><path d="M344 30 l6 6 l11 -12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></g>
              <g class="people-pill"><rect x="58" y="6" width="150" height="20" rx="10" fill="#f26a1b"/><text x="133" y="20" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">17 travellers · 1 vehicle</text></g>
            </g>
          </svg>
        </div>
        <ul class="compare-list">
          <li><span class="cmp-ic">${icon("pin")}</span><div><strong>One pickup, one route</strong><small>One departure time, one set of timings for the whole group.</small></div></li>
          <li><span class="cmp-ic">${icon("wheel")}</span><div><strong>One driver who knows the road</strong><small>Sunrise timings, food stops and the slow bends, handled.</small></div></li>
          <li><span class="cmp-ic">${icon("luggage")}</span><div><strong>Luggage loaded once</strong><small>Overhead rack for small bags; everything travels together.</small></div></li>
          <li><span class="cmp-ic">${icon("users")}</span><div><strong>Same view, same story, same time</strong><small>Everyone hears the same explanation at the same viewpoint.</small></div></li>
        </ul>
        <a class="text-link" href="group-tour-koraput/">How a group day runs ${icon("arrow")}</a>
      </div>
    </div>
    <ul class="compare-stats" aria-label="What changes with one vehicle">
      <li>${icon("van")}<span class="stat-from">3–5 cars</span><span class="stat-arrow">${icon("arrow")}</span><span class="stat-to">1 Traveller</span></li>
      <li>${icon("wheel")}<span class="stat-from">3–5 drivers</span><span class="stat-arrow">${icon("arrow")}</span><span class="stat-to">1 driver</span></li>
      <li>${icon("phone")}<span class="stat-from">Calls at every stop</span><span class="stat-arrow">${icon("arrow")}</span><span class="stat-to">None</span></li>
      <li>${icon("luggage")}<span class="stat-from">Bags in 4 boots</span><span class="stat-arrow">${icon("arrow")}</span><span class="stat-to">Loaded once</span></li>
    </ul>
  </div>
</section>

<section class="band band-grey" id="traveller" aria-labelledby="vehicle-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="vehicle-title">Your vehicle for Koraput</h2>
      <p class="lede">A brand-new Force Traveller, air conditioned, 17 passenger seats, photographed in Semiliguda on the day it arrived, ${site.vehicle.deliveredOn}. Facts, not adjectives.</p>
    </div>
    <div class="gallery" id="vehicle-gallery">
      <figure class="gallery-main" data-gallery-open="gallery" role="button" tabindex="0" aria-label="Open this photo full screen">
        ${pic("traveller-side", { alt: "The white Ananta Force Traveller seen from the side, showing the full window line", sizes: "(min-width: 900px) 62vw, 100vw", cls: "gallery-img is-active" })}
        ${pic("traveller-front-hill", { alt: "Front of the Ananta Traveller parked on a hillside in Koraput", sizes: "(min-width: 900px) 62vw, 100vw", cls: "gallery-img" })}
        ${pic("traveller-front-garland", { alt: "Front of the Traveller with a marigold garland on delivery day", sizes: "(min-width: 900px) 62vw, 100vw", cls: "gallery-img" })}
        ${pic("traveller-rear", { alt: "Rear doors of the Traveller with the emergency exit and contact numbers", sizes: "(min-width: 900px) 62vw, 100vw", cls: "gallery-img" })}
        ${pic("traveller-cabin", { alt: "Inside the Traveller: pushback seats in a 2+1 layout, curtains, overhead rack and AC vents", sizes: "(min-width: 900px) 62vw, 100vw", cls: "gallery-img" })}
        ${realBadge("Real photo · our Traveller")}
        <figcaption id="gallery-caption">Side view. Registration OD02 DT 9296, all-India permit.</figcaption>
      </figure>
      <div class="gallery-thumbs" role="tablist" aria-label="Vehicle photographs">
        <button type="button" role="tab" aria-selected="true" data-index="0" data-caption="Side view. Registration OD02 DT 9296, all-India permit.">${pic("traveller-side", { alt: "Side view", sizes: "12rem" })}<span>Side</span></button>
        <button type="button" role="tab" aria-selected="false" data-index="4" data-caption="Inside: pushback seats with armrests, 2+1 across, curtains on every window, overhead rack, AC vents.">${pic("traveller-cabin", { alt: "Cabin and seats", sizes: "12rem" })}<span>Cabin</span></button>
        <button type="button" role="tab" aria-selected="false" data-index="1" data-caption="On a Koraput hillside, first week out.">${pic("traveller-front-hill", { alt: "Front, on a hillside", sizes: "12rem" })}<span>On the hills</span></button>
        <button type="button" role="tab" aria-selected="false" data-index="2" data-caption="Delivery day, ${site.vehicle.deliveredOn}.">${pic("traveller-front-garland", { alt: "Front, delivery day", sizes: "12rem" })}<span>Delivery day</span></button>
        <button type="button" role="tab" aria-selected="false" data-index="3" data-caption="Rear doors with the emergency exit and our numbers.">${pic("traveller-rear", { alt: "Rear", sizes: "12rem" })}<span>Rear</span></button>
      </div>
    </div>
    <p class="gallery-note">${icon("shield")}<span>These are real, unedited photographs of our own Force Traveller (OD02 DT 9296), taken by us on delivery day, ${site.vehicle.deliveredOn}. No stock or AI-generated vehicle images are used anywhere on this site.</span></p>
  </div>
  <div class="wrap vehicle-grid">
    <div class="vehicle-copy">
      <div class="fact-grid">
        <div class="fact">${icon("van")}<div><strong>Force Traveller</strong><small>Purchased new, ${site.vehicle.purchased}</small></div></div>
        <div class="fact">${icon("seat")}<div><strong>17 passenger seats</strong><small>Your whole group in one vehicle</small></div></div>
        <div class="fact">${icon("snowflake")}<div><strong>Air conditioned</strong><small>Comfort on long ghat sections</small></div></div>
        <div class="fact">${icon("shield")}<div><strong>All-India permit</strong><small>Serviced on schedule, checked before every trip</small></div></div>
        <div class="fact">${icon("wheel")}<div><strong>Experienced local driver</strong><small>Knows the roads, the timings and the stops</small></div></div>
        <div class="fact">${icon("users")}<div><strong>Tour support available</strong><small>Support staff and guided-tour assistance</small></div></div>
      </div>
      <p class="vehicle-note">${icon("camera")}<span>Every photograph here is our own vehicle, never a stock Traveller. Pushback seats with armrests, curtains on every window and an overhead rack for small bags; luggage-space photographs are next.</span></p>
      <a class="text-link" href="17-seater-traveller-koraput/">More about the Traveller ${icon("arrow")}</a>
    </div>
    <div class="seat-stage" aria-label="Interactive seat layout">
      <div class="seat-head"><strong>17</strong><span>seats · tap one</span></div>
      <div class="seatmap" id="seatmap"></div>
      <p class="seat-info" id="seat-info">Tap a seat. Pushback seats in 2+1 rows with a back bench, as in the cabin photo.</p>
      <div class="seat-legend" aria-hidden="true"><span><i style="background:#c47a45"></i>Passenger seat</span><span><i style="background:#f26a1b"></i>Selected</span><span><i style="background:#333"></i>Driver</span></div>
    </div>
  </div>
</section>

<section class="band band-white" id="team" aria-labelledby="team-title">
  <div class="wrap team-grid">
    <figure class="team-photo" data-parallax="6">
      ${pic("koraput-sunrise", { alt: "Sunrise through forest silhouettes in Koraput", sizes: "(min-width: 900px) 45vw, 100vw" })}
      <figcaption>${icon("camera")}Photographs of the driver and support team will be added here. This is a Koraput forest sunrise.</figcaption>
    </figure>
    <div class="team-copy">
      <h2 id="team-title">You're not travelling alone.</h2>
      <blockquote>Friendly local team. No confusion in an unfamiliar place.</blockquote>
      <p>From pickup to sightseeing and return, our team stays available to help with routes, stops, local information and unexpected changes during your journey.</p>
      <ul class="role-list">
        <li><span class="role-ic">${icon("wheel")}</span><div><strong>Local driver</strong><small>Knows the ghat roads, the sunrise timings and where to stop for a good meal.</small></div></li>
        <li><span class="role-ic">${icon("chat")}</span><div><strong>Support staff</strong><small>On WhatsApp through your trip for timings, changes and questions.</small></div></li>
        <li><span class="role-ic">${icon("compass")}</span><div><strong>Guided-tour assistance</strong><small>Someone to explain what you are seeing, whenever you want it.</small></div></li>
      </ul>
    </div>
  </div>
</section>

<section class="band band-grey" id="booking" aria-labelledby="booking-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="booking-title">Plan first. Pay after confirmation.</h2>
      <p class="lede">The order never changes, so you always know what you are paying for.</p>
    </div>
    <ol class="steps">
      <li><strong>Share your trip</strong><p>Dates, group size and where you will arrive from. WhatsApp is easiest.</p></li>
      <li><strong>Confirm itinerary and price</strong><p>We send the route, timings and the Traveller price. You know what is included before you decide.</p></li>
      <li><strong>Pay a booking advance</strong><p>The official UPI QR and a booking reference come privately on WhatsApp, with confirmation of the amount.</p></li>
    </ol>
    <p class="steps-note">${icon("shield")}<span>No payment is requested before your itinerary, price and availability are confirmed.</span></p>
  </div>
</section>

<section class="band band-white" id="map" aria-labelledby="map-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="map-title">Every stop, pinned</h2>
      <p class="lede">Where the places are, and how they sit around Koraput town. Open any pin in Google Maps for live directions.</p>
    </div>
    <div class="map-grid">
      <div class="map-frame">
        <p class="map-loading">Loading Google Maps…</p>
        <div id="gmap" hidden></div>
        <iframe id="map-embed" src="${embedUrl}" title="Google Map of Koraput tourist attractions" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
      <div>
        <ul class="pin-list">
          <li><span class="pin-letter">${icon("pin")}</span><span class="pin-name">Koraput town<small>Start and end of every trip</small></span><a href="https://www.google.com/maps/search/?api=1&query=${site.koraput.lat}%2C${site.koraput.lng}" target="_blank" rel="noopener noreferrer">Open ${icon("arrow-up-right")}</a></li>
          ${dests.map(d => `<li><span class="pin-letter">${icon(d.icon)}</span><span class="pin-name">${esc(d.name)}<small>${esc(d.drive)} · ${d.km} km</small></span><a href="${mapsLink(d)}" target="_blank" rel="noopener noreferrer">Open ${icon("arrow-up-right")}</a></li>`).join("\n")}
        </ul>
        <p class="map-note">The line on the map is Google's road estimate for one long loop. Real trips split these stops over two to four days.</p>
      </div>
    </div>
  </div>
</section>

<section class="band band-grey" id="origins" aria-labelledby="origins-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="origins-title">Start from where you are</h2>
      <p class="lede">Two city guides that answer the real planning questions: how to reach Koraput, how many days to keep, and where the Traveller fits in.</p>
    </div>
    <div class="origin-grid">
      <article class="origin-card">
        ${pic("rail-train", { alt: "A passenger train winding through misty Eastern Ghats near Laxmipur Road", sizes: "(min-width: 900px) 50vw, 100vw" })}
        <div class="origin-body">
          <span>${icon("train")}From Bhubaneswar</span>
          <h3>Travel overnight. Wake up in the hills.</h3>
          <p>Train, road and flight options, a 2 to 3 day plan and pickup timed to your arrival.</p>
        </div>
        <a class="card-link" href="koraput-tour-package-from-bhubaneswar/"><span>Koraput tour from Bhubaneswar</span></a>
      </article>
      <article class="origin-card">
        ${pic("rail-bridge", { alt: "Railway bridge on the Kirandul line crossing the Eastern Ghats", sizes: "(min-width: 900px) 50vw, 100vw" })}
        <div class="origin-body">
          <span>${icon("train")}From Kolkata</span>
          <h3>Make Koraput the destination, not a logistics puzzle.</h3>
          <p>How to reach, how long to keep, and a plan that starts the moment you step off the train.</p>
        </div>
        <a class="card-link" href="koraput-tour-package-from-kolkata/"><span>Koraput tour from Kolkata</span></a>
      </article>
    </div>
  </div>
</section>

<section class="band band-white" id="stations" aria-labelledby="stations-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="stations-title">Railway station pickup and drop</h2>
      <p class="lede">Tell us your train and we meet it. Drive times are from our base in Semiliguda; Koraput town is about 20 minutes further west.</p>
    </div>
    <div class="station-grid">
      ${stations.main.map(s => `<article class="station-card">
        <div class="station-top">${icon("train")}<span class="station-code">${esc(s.code)}</span></div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.trains)}</p>
        <div class="station-meta"><span>${icon("clock")}${esc(s.drive)} from Semiliguda</span><span>${icon("road")}About ${s.kmBase} km</span></div>
        <a href="https://www.google.com/maps/search/?api=1&query=${s.lat}%2C${s.lng}" target="_blank" rel="noopener noreferrer">Open in Maps ${icon("arrow-up-right")}</a>
      </article>`).join("")}
    </div>
    <details class="station-halts">
      <summary>Smaller halts we also serve (passenger trains) <span>${icon("spark")}</span></summary>
      <p>Stops on the Koraput–Rayagada line and both directions of the Kirandul line. Only passenger and DMU trains stop here and timings change, so send us your train number and we confirm.</p>
      <ul class="halt-list">
        ${stations.halts.map(h => `<li><b>${esc(h.name)}<code>${esc(h.code)}</code></b><small>${esc(h.drive)} · ${esc(h.line)}</small></li>`).join("")}
      </ul>
    </details>
    <p class="station-note">${icon("info")}<span>Shimiliguda station (SMLG) on the Araku line in Andhra Pradesh is a different place from our Semiliguda. For Koraput, book to Koraput Junction (KRPU).</span></p>
  </div>
</section>

<section class="band band-grey" id="faq" aria-labelledby="faq-title">
  <div class="wrap faq-grid">
    <div class="section-head">
      <h2 id="faq-title">Before you write to us</h2>
      <p class="lede">Short answers to the questions most groups ask first.</p>
    </div>
    <div class="faq-list">
      <details open><summary>How many people can travel together?<span>${icon("spark")}</span></summary><p>Up to 17 passengers in one Traveller. Tell us your luggage needs and we confirm the seating plan before booking.</p></details>
      <details><summary>Do you plan the whole itinerary?<span>${icon("spark")}</span></summary><p>Yes. Share dates, arrival point, group size and interests. We suggest a route matched to your days, with sensible timings for sunrise stops and long drives.</p></details>
      <details><summary>Do you pick up from the railway station or airport?<span>${icon("spark")}</span></summary><p>Yes. We meet trains at Koraput Junction, Damanjodi, Jeypore, Araku, Rayagada and, on request, Vizianagaram and Visakhapatnam, plus the smaller halts <a href="#stations">listed above</a>. Send your train number and we time the vehicle to it. Jeypore airport pickups when flights operate.</p></details>
      <details><summary>When do I pay?<span>${icon("spark")}</span></summary><p>Only after the itinerary, price and availability are confirmed. The UPI QR and booking reference are shared privately on WhatsApp.</p></details>
      <details><summary>Which months are best?<span>${icon("spark")}</span></summary><p>October to February is cool and clear. September to December has the fullest waterfalls. Monsoon months are green but some roads slow down.</p></details>
    </div>
  </div>
</section>

<section class="band band-grey">
  <div class="wrap">
    ${ctaCard({ photo: "traveller-front-hill", heading: "Tell us your dates. We'll shape the road ahead.", text: "Usually easiest: dates, number of travellers and where you arrive from. We reply with a route, timings and the Traveller price." })}
  </div>
</section>

<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="Photo gallery">
  <button class="lb-close" type="button" aria-label="Close gallery">${icon("close")}</button>
  <button class="lb-arrow lb-prev" type="button" aria-label="Previous photo">${icon("arrow")}</button>
  <figure class="lb-figure"><img id="lb-img" alt="" decoding="async"><figcaption><span id="lb-caption"></span><span class="lb-count" id="lb-count"></span></figcaption></figure>
  <button class="lb-arrow lb-next" type="button" aria-label="Next photo">${icon("arrow")}</button>
  <div class="lb-thumbs" id="lb-thumbs">${heroSlides.map((s, i) => `<button type="button" data-lb-to="${i}" aria-label="Photo ${i + 1}">${pic(s.photo, { alt: "", sizes: "6rem" })}</button>`).join("")}</div>
</div>
<script id="gallery-data" type="application/json">${JSON.stringify(heroSlides.map(s => { const m = require("./photo-manifest.json")[s.photo]; const w = Math.max(...m.sizes); return { src: `assets/photos/${s.photo}-${w}.webp`, fallback: `assets/photos/${s.photo}-960.jpg`, caption: s.caption, alt: s.alt }; }))}</script>
<script id="site-data" type="application/json">${JSON.stringify({ destinations: dests.map(d => ({ slug: d.slug, name: d.name, icon: d.icon, lat: d.lat, lng: d.lng, kind: d.kind, drive: d.drive, km: d.km, page: d.page || null })), koraput: site.koraput })}</script>`;

  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: site.name,
      description: "Koraput sightseeing journeys for families and groups in a new 17-seater AC Traveller with a local driver, support staff and guided-tour assistance.",
      url: site.url,
      areaServed: ["Koraput", "Odisha"],
      telephone: site.contact.phones[0].tel,
      email: site.contact.email,
      address: { "@type": "PostalAddress", streetAddress: site.contact.address.street, addressLocality: site.contact.address.locality, addressRegion: site.contact.address.region, postalCode: site.contact.address.postalCode, addressCountry: "IN" },
      contactPoint: [{ "@type": "ContactPoint", contactType: "reservations", telephone: "+" + site.contact.whatsapp, availableLanguage: ["en", "or", "hi"] }],
      priceRange: "₹₹",
      makesOffer: dests.filter(d => d.page).map(d => ({ "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: `${d.name} day trip`, url: `${site.url}/${d.page}/` } }))
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        ["How many people can travel together?", "Up to 17 passengers in one Traveller. Tell us your luggage needs and we confirm the seating plan before booking."],
        ["Do you plan the whole itinerary?", "Yes. Share dates, arrival point, group size and interests and we suggest a route matched to your days."],
        ["When do I pay?", "Only after the itinerary, price and availability are confirmed. The UPI QR and booking reference are shared privately on WhatsApp."]
      ].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
    }
  ];

  return layout({
    title: `${site.name} | Koraput Trip Planning, Sightseeing and a 17-Seater AC Traveller for Groups`,
    description: "Plan a Koraput trip: tourist places, 1 to 4 day itineraries, tours from Bhubaneswar and Kolkata, and one 17-seater AC Traveller with a local driver and support staff for your group. Enquire on WhatsApp.",
    path: "",
    depth: 0,
    body,
    jsonld,
    preloadHero: true,
    heroPhoto: "traveller-front-garland",
    ogImage: "assets/photos/traveller-front-garland-960.jpg",
    isHome: true
  });
}

module.exports = { render };
