const site = require("./site");
const dests = require("./destinations");
const { esc, pic, icon, layout, ctaCard } = require("./templates");

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
  <span class="stop-marker" aria-hidden="true"></span>
  <div class="stop-media" data-parallax="7">${pic(d.photo, { alt: `${d.name}, Koraput`, sizes: "(min-width: 900px) 45vw, 100vw" })}</div>
  <div class="stop-body">
    <span class="stop-kind">${icon(d.icon)}${esc(d.kind)}</span>
    <h3>${esc(d.name)}</h3>
    <p>${esc(d.blurb)}</p>
    <div class="stop-meta"><span>${icon("clock")}${esc(d.drive)} from Koraput</span><span>${icon("road")}about ${d.km} km</span></div>
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

function render() {
  const journey = dests.filter(d => d.journey);
  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-media">
    ${pic("hero", { alt: "Clouds drifting over the Koraput highlands near Deomali", sizes: "100vw", priority: true })}
    <iframe id="hero-video" src="https://www.youtube-nocookie.com/embed/${site.heroVideoId}?enablejsapi=1&autoplay=0&mute=1&controls=0&loop=1&playlist=${site.heroVideoId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&origin=${encodeURIComponent(site.url)}" title="Real Deomali and Koraput travel footage" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" aria-hidden="true" tabindex="-1" loading="lazy"></iframe>
  </div>
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="hero-inner">
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
    </div>
  </div>
  <a class="scroll-cue" href="#intro" aria-label="Scroll to the next section">${icon("arrow")}</a>
</section>

<section class="band band-mist" id="intro" aria-labelledby="intro-title">
  <div class="wrap intro">
    <h2 id="intro-title">One group, one vehicle, one unhurried Koraput.</h2>
    <p>For families, friends, pilgrim groups and small teams arriving from Bhubaneswar, Kolkata or further away. We plan the route around your arrival, drive you between the hills, waterfalls and temples, and stay reachable the whole way.</p>
    <div class="intro-photo" data-parallax="6">${pic("koraput-valley", { alt: "Green valley near Sunabeda in the monsoon, Koraput district", sizes: "(min-width: 1300px) 78rem, 100vw" })}</div>
  </div>
</section>

<section class="journey band-forest" id="journey" aria-labelledby="journey-title">
  <div class="journey-title">
    <canvas id="terrain" aria-hidden="true"></canvas>
    <div class="wrap">
      <h2 id="journey-title">17 seats. <strong>One incredible Koraput.</strong></h2>
      <p>Scroll the road. Every stop is one photograph, one sentence and how long the drive takes from Koraput town.</p>
    </div>
  </div>
  <div class="wrap road-track">
    <svg class="road-svg" aria-hidden="true"><path class="road-base"/><path class="road-dash"/><path class="road-drawn"/></svg>
    <div class="van" aria-hidden="true">${icon("van")}</div>
    <article class="stop stop-start">
      <span class="stop-marker" aria-hidden="true"></span>
      <div class="stop-body">
        <span class="stop-kind">${icon("pin")}Start</span>
        <h3>Koraput town</h3>
        <p>Pickup at your hotel, the railway station or wherever your journey into the hills begins.</p>
      </div>
    </article>
    ${journey.map(stop).join("\n")}
    <article class="stop stop-end">
      <span class="stop-marker" aria-hidden="true"></span>
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

<section class="band band-mist" id="planner" aria-labelledby="planner-title">
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
      <div class="route-result" aria-live="polite">
        <h3 id="route-title">Your 3-day Koraput journey</h3>
        <div class="route-days" id="route-days"></div>
      </div>
      <button class="btn btn-earth" type="submit">${icon("whatsapp")}<span>Get this itinerary and price on WhatsApp</span></button>
      <p class="form-note">${icon("shield")}<span>No payment is requested until your itinerary, price and availability are confirmed.</span></p>
    </form>
  </div>
</section>

<section class="band band-paper" id="destinations" aria-labelledby="destinations-title">
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

<section class="band band-forest" id="traveller" aria-labelledby="vehicle-title">
  <div class="wrap vehicle-grid">
    <div class="vehicle-copy">
      <h2 id="vehicle-title">Your vehicle for Koraput</h2>
      <p class="lede">A newly purchased air-conditioned 17-seater Traveller, dedicated to group journeys on Koraput's hill roads. Facts, not adjectives.</p>
      <div class="fact-grid">
        <div class="fact">${icon("spark")}<div><strong>Brand new</strong><small>Purchased ${site.vehicle.purchased}</small></div></div>
        <div class="fact">${icon("seat")}<div><strong>17 passenger seats</strong><small>Your whole group in one vehicle</small></div></div>
        <div class="fact">${icon("snowflake")}<div><strong>Air conditioned</strong><small>Comfort on long ghat sections</small></div></div>
        <div class="fact">${icon("shield")}<div><strong>Professionally maintained</strong><small>Serviced on schedule, checked before every trip</small></div></div>
        <div class="fact">${icon("wheel")}<div><strong>Experienced local driver</strong><small>Knows the roads, the timings and the stops</small></div></div>
        <div class="fact">${icon("users")}<div><strong>Tour support available</strong><small>Support staff and guided-tour assistance</small></div></div>
      </div>
      <p class="vehicle-note">${icon("camera")}<span>We photograph the real vehicle, never a stock Traveller. Front, cabin, seats, legroom, AC and luggage-space photographs will appear here once the vehicle arrives and the exact variant is confirmed.</span></p>
      <a class="text-link" href="17-seater-traveller-koraput/">More about the Traveller ${icon("arrow")}</a>
    </div>
    <div class="seat-stage" aria-label="Interactive seat layout">
      <div class="seat-head"><strong>17</strong><span>seats · tap one</span></div>
      <div class="seatmap" id="seatmap"></div>
      <p class="seat-info" id="seat-info">Indicative 2+1 layout with a back bench. The final arrangement follows the confirmed variant.</p>
    </div>
  </div>
</section>

<section class="band band-mist" id="team" aria-labelledby="team-title">
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

<section class="band band-paper" id="booking" aria-labelledby="booking-title">
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

<section class="band band-forest" id="map" aria-labelledby="map-title">
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

<section class="band band-mist" id="origins" aria-labelledby="origins-title">
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

<section class="band band-paper" id="faq" aria-labelledby="faq-title">
  <div class="wrap faq-grid">
    <div class="section-head">
      <h2 id="faq-title">Before you write to us</h2>
      <p class="lede">Short answers to the questions most groups ask first.</p>
    </div>
    <div class="faq-list">
      <details open><summary>How many people can travel together?<span>${icon("spark")}</span></summary><p>Up to 17 passengers in one Traveller. Tell us your luggage needs and we confirm the seating plan before booking.</p></details>
      <details><summary>Do you plan the whole itinerary?<span>${icon("spark")}</span></summary><p>Yes. Share dates, arrival point, group size and interests. We suggest a route matched to your days, with sensible timings for sunrise stops and long drives.</p></details>
      <details><summary>Do you pick up from the railway station or airport?<span>${icon("spark")}</span></summary><p>We plan the Koraput-area pickup around your arrival. Send your train, flight or road plan and we time the vehicle to it.</p></details>
      <details><summary>When do I pay?<span>${icon("spark")}</span></summary><p>Only after the itinerary, price and availability are confirmed. The UPI QR and booking reference are shared privately on WhatsApp.</p></details>
      <details><summary>Which months are best?<span>${icon("spark")}</span></summary><p>October to February is cool and clear. September to December has the fullest waterfalls. Monsoon months are green but some roads slow down.</p></details>
    </div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap">
    ${ctaCard({ photo: "deomali-hills", heading: "Tell us your dates. We'll shape the road ahead.", text: "Usually easiest: dates, number of travellers and where you arrive from. We reply with a route, timings and the Traveller price." })}
  </div>
</section>

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
    title: `${site.name} | Experience Koraput in Comfort`,
    description: "Discover Koraput with a brand-new 17-seater AC Traveller, a friendly local driver, support staff and guided tours. Deomali, Duduma, Gupteswar, Kolab and more. Plan your trip on WhatsApp.",
    path: "",
    depth: 0,
    body,
    jsonld,
    preloadHero: true,
    isHome: true
  });
}

module.exports = { render };
