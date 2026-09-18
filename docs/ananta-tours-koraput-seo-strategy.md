# Ananta Tours Koraput — SEO, Conversion & Domain Strategy

## Project Context

Website:
- Current live site: https://itswadesh.github.io/ananta-tours-website/

Business:
- Ananta Tours & Travels
- Focus: Koraput tourism
- Primary offer: 17-seater AC Traveller for group tours
- Target customers: Outsiders visiting Koraput
- Key origin markets: Bhubaneswar, Kolkata, Visakhapatnam and other cities
- Core conversion goal: WhatsApp enquiry / direct trip booking

Primary positioning:
- Private Koraput tours for groups
- 17-seater AC Traveller
- Local driver and trip support
- Guided/local assistance
- Real vehicle, purchased new in September 2026
- Comfortable alternative to hiring multiple smaller vehicles

---

# Executive Summary

The current website already has a strong base:
- Crawlable static pages
- Destination content
- Dedicated route pages for Bhubaneswar and Kolkata
- Structured metadata
- Sitemap and robots setup
- Real Traveller photos
- WhatsApp-oriented conversion flow
- Clear Koraput tourism positioning

The next phase should focus less on adding generic tourism content and more on:
1. Establishing a proper domain
2. Building a strong local search entity
3. Improving high-intent SEO
4. Fixing the hero-video implementation
5. Adding clearer pricing signals
6. Expanding route-specific landing pages
7. Adding stronger trust proof
8. Improving performance on content pages
9. Strengthening Google Business Profile presence

---

# Recommended Domain

## Preferred domain

**anantatourskoraput.com**

## Alternative

**anantatravelskoraput.com**

## Recommendation

Choose:

**anantatourskoraput.com**

### Why

“Tours” matches the customer intent better than “Travels.”

The target customer is not primarily looking for:
- Bus tickets
- Airline tickets
- Point-to-point transport

They are looking for:
- Koraput sightseeing
- Group tours
- Koraput tour packages
- Traveller hire
- Deomali / Duduma / Gupteswar trips
- Multi-day itineraries

So “Tours” gives a clearer market signal.

### Branding structure

**ANANTA TOURS & TRAVELS**

Tagline:

**Koraput Group Tours & 17-Seater Traveller**

Domain:

**anantatourskoraput.com**

Suggested homepage title:

**Koraput Tour Packages & 17-Seater Traveller | Ananta Tours**

Important:
Domain keywords alone will not produce rankings. Google rankings will depend more heavily on:
- Content quality
- Google Business Profile
- Reviews
- Backlinks
- Local relevance
- Search Console setup
- Internal linking
- Page experience
- Structured data
- Search intent match

---

# Priority SEO Action Plan

## P0 — Highest Priority

### 1. Move from GitHub Pages URL to a proper branded domain

Current canonical host:

`itswadesh.github.io/ananta-tours-website/`

Recommended:

`https://anantatourskoraput.com/`

Actions:
- Purchase/configure the new domain
- Point it to GitHub Pages
- Update canonical URLs
- Update `src/site.js`
- Update sitemap URLs
- Update structured data URLs
- Use only one canonical host
- Add domain to Google Search Console
- Submit sitemap
- Request indexing for important pages

Priority pages for indexing:
- Homepage
- 17-seater Traveller page
- Bhubaneswar → Koraput page
- Kolkata → Koraput page
- Future Visakhapatnam → Koraput page
- Deomali page
- Duduma page
- Gupteswar page

---

### 2. Build / optimize Google Business Profile

This can be more valuable than adding many additional blog articles.

Business profile should consistently show:
- Business name
- Phone number
- Website
- Koraput / service-area relevance
- Vehicle photos
- Traveller interior
- Driver/team
- Customer group photos
- Trip photos
- Service categories

Recommended photo types:
- Front vehicle photo
- Side profile
- Interior seating
- Luggage capacity
- Vehicle at Deomali
- Vehicle at Duduma
- Driver photo
- Group tour images
- Customer pickup
- Local support staff

Review strategy:
Ask genuine customers for reviews after the trip.

Useful review themes:
- Vehicle comfort
- Driver behaviour
- Trip planning
- Local knowledge
- Cleanliness
- Group comfort
- Family friendliness
- Reliability
- Deomali / Duduma / Gupteswar experience

---

### 3. Fix hero-video implementation

The planned behaviour was:

1. Hero photo loads immediately
2. User stays in the hero section
3. After 3 seconds, muted video begins
4. Video fades into the hero background

The JavaScript logic already expects an element with:

`#hero-video`

But the current home hero does not render that iframe/video element.

So the video behaviour cannot activate.

## Suggested hero HTML

Add inside `.hero-media` after the hero images:

```js
<div class="hero-media" id="hero-slider">

  ${heroSlides.map((s, i) =>
    pic(s.photo, {
      alt: s.alt,
      sizes: "100vw",
      priority: i === 0,
      cls: "hero-slide" + (i === 0 ? " is-active" : "")
    })
  ).join("\n")}

  <iframe
    id="hero-video"
    title="Koraput and Deomali travel footage"
    src="about:blank"
    data-src="https://www.youtube-nocookie.com/embed/${site.heroVideoId}?enablejsapi=1&autoplay=0&mute=1&controls=0&loop=1&playlist=${site.heroVideoId}&playsinline=1&rel=0&modestbranding=1"
    allow="autoplay; encrypted-media; picture-in-picture"
    tabindex="-1"
    aria-hidden="true">
  </iframe>

</div>
```

## Lazy-load the video only after the user remains for 3 seconds

```js
let loaded = false;
let timer;
let started = false;
let wantPlay = false;

const ensureLoaded = () => {
  if (loaded) return;
  loaded = true;

  video.src =
    video.dataset.src +
    "&origin=" +
    encodeURIComponent(location.origin);
};

const play = () => {
  wantPlay = true;

  if (!loaded) {
    ensureLoaded();
    return;
  }

  send("mute");
  send("playVideo");
};
```

Expected UX:

**Photo visible immediately → user remains for 3 seconds → video request starts → muted footage fades in**

This is better for:
- Performance
- Bandwidth
- First-load speed
- Mobile users
- Core Web Vitals

---

# P1 — Strong SEO & Conversion Improvements

## 4. Add price/rate/cost intent

The site currently pushes visitors toward WhatsApp for final pricing.

That is useful, but searchers also use keywords like:
- Koraput Traveller price
- Koraput Traveller rate
- Koraput Traveller fare
- 17 seater Traveller cost
- Deomali Traveller price
- Koraput sightseeing cab price
- Koraput group tour cost
- Koraput tour package price

A useful section:

## How much does a 17-seater Traveller cost in Koraput?

Example structure:

### Deomali Day Trip
Koraput / Semiliguda → Deomali → return

- Up to 17 seats
- AC Traveller
- Local driver
- From ₹____

### Duduma + Machkund Day Trip

- Full-day group Traveller
- From ₹____

### 3-Day Koraput Group Tour

Possible coverage:
- Deomali
- Duduma
- Gupteswar
- Kolab

Price:

- From ₹____

Disclaimer:

> Final fare depends on pickup point, total kilometres, trip duration, tolls, parking, night halt and itinerary. Send your dates and group size on WhatsApp for an exact quote.

Price transparency can improve:
- SEO
- Trust
- Lead quality
- Conversion rate
- Booking speed

---

## 5. Improve commercial landing-page architecture

The current Bhubaneswar and Kolkata pages are the right strategy.

Continue with high-intent origin pages rather than generic articles.

Priority next page:

**Visakhapatnam to Koraput Tour Package**

Possible URL:

`/koraput-tour-package-from-visakhapatnam/`

Keywords:
- Koraput tour from Vizag
- Koraput trip from Visakhapatnam
- Vizag to Koraput group tour
- Visakhapatnam to Deomali
- Koraput Traveller from Vizag
- Koraput sightseeing from Visakhapatnam

Future origin pages may include:
- Raipur
- Hyderabad
- Bhubaneswar
- Kolkata
- Visakhapatnam
- Berhampur

Only create these when each page has useful route-specific information.

Avoid mass-producing thin pages.

---

# Destination SEO

## Existing / important destinations

Include and strengthen:
- Deomali
- Duduma Waterfall
- Gupteswar
- Kolab
- Jagannath Temple, Koraput
- Machkund
- Putsil
- Talamali
- Kaliamali / Kalyamali

## Talamali

Talamali has useful travel intent.

Recommended positioning:
- Talamali Hilltop
- Pendajam Table Mountain
- Putsil–Talamali circuit
- Scenic plateau
- Group day trip
- Nature / photography
- Short local exploration

Potential page:

`/talamali-koraput/`

Suggested title:

**Talamali Koraput Tour | Putsil, Hilltop Views & Traveller Trip**

---

## Kaliamali / Kalyamali

This can be positioned as:
- Offbeat hill destination
- Koraput nature drive
- Final short trek
- Group trip
- Scenic / adventure spot

Potential page:

`/kalyamali-koraput/`

Suggested title:

**Kalyamali Koraput Tour | Offbeat Hill Trip & Group Traveller**

---

## Dudhari

Do not create a generic “Dudhari tourist attraction” page unless there is a specific attraction or viewpoint to feature.

Better wording:

**Putsil–Talamali, Dudhari area**

Use Dudhari mainly as geographical context.

---

# Hero Messaging

The current emotional headline can stay:

**Discover Koraput.  
We’ll take care of the journey.**

Do not overload the H1 with keywords.

Immediately below it, use a commercially precise subheading:

> Private Koraput tours for groups of 10–17 people. Explore Deomali, Duduma, Gupteswar, Talamali, Putsil and more in one new AC Traveller, with a local driver and trip support.

This connects:
- Brand message
- Group size
- Vehicle
- Destinations
- Local service
- Search intent

---

# Recommended Homepage Metadata

## Title

```text
Koraput Tour Packages & 17-Seater Traveller | Ananta Tours
```

## Meta Description

```text
Plan a 2–4 day Koraput group tour to Deomali, Duduma, Gupteswar and Kolab in a 17-seater AC Traveller with local pickup, driver and trip support.
```

---

# Vehicle Page SEO

The `17-seater-traveller-koraput` page should directly answer commercial questions.

Include:
- 17-seater capacity
- AC availability
- Luggage capacity
- Vehicle purchase date
- Vehicle model
- Seating layout
- Driver
- Pickup areas
- Destination coverage
- Rate methodology
- Toll policy
- Parking policy
- Night charges
- Multi-day availability
- Outstation pickup
- Airport / railway pickup support

Target keywords:
- 17 seater Traveller Koraput
- Tempo Traveller Koraput
- Traveller rental Koraput
- Traveller hire Koraput
- Group vehicle Koraput
- Koraput sightseeing Traveller
- Deomali Traveller booking
- Koraput group vehicle rental

---

# Trust & Conversion Section

The real Traveller itself is a major trust asset.

Add stronger proof around it.

## Recommended trust elements

### Real Vehicle
- Purchased September 2026
- Show actual delivery photos
- Show interior
- Show exterior
- Show registration plate only if appropriate

### Driver
Add:
- Driver photo
- Name
- Experience
- Local-route familiarity
- Language support

### Support Staff
Add:
- Local contact
- Tour support
- Pickup coordination
- Emergency support

### Customer Reviews
Use only genuine reviews.

### Group Photos
Show:
- Families
- Friend groups
- Corporate groups
- Senior travellers
- Students / adventure groups if relevant

---

# Conversion Flow

Ideal user flow:

**Google Search**

↓

**Specific landing page**

↓

**Real photos + route relevance**

↓

**Traveller capacity + comfort**

↓

**Approximate cost / pricing logic**

↓

**Trust proof**

↓

**WhatsApp availability check**

This should become the main acquisition funnel.

---

# WhatsApp CTA Strategy

Instead of generic:

**Contact Us**

Use high-intent CTA copy:

- Check Traveller Availability
- Get Trip Cost on WhatsApp
- Plan My Koraput Trip
- Ask for 17-Seater Price
- Build My 3-Day Koraput Itinerary

Recommended WhatsApp pre-filled message:

```text
Hi Ananta Tours,

I am planning a Koraput trip.

Travel date:
Number of people:
Pickup location:
Number of days:
Places I want to visit:

Please share Traveller availability and total trip cost.
```

---

# Technical SEO Fixes

## 6. Sitemap dates

Current issue:

Every build may update all URLs with the current date.

That makes all pages look freshly modified even when their content has not changed.

Recommended:
- Track real page modification dates
- Or omit `<lastmod>` if accurate values are not available

Do not generate fake freshness signals.

---

## 7. Time-sensitive travel information

Pages that include:
- Flight times
- Train times
- Bus schedules
- Pickup timings

Should show a verification line such as:

**Last verified: 18 September 2026**

Where possible, link to an authoritative source.

Avoid presenting transport schedules as permanently fixed.

---

# Performance

The current site loads animation libraries broadly.

Potential improvement:
- Use GSAP / ScrollTrigger / MotionPath only where required
- Keep guide pages lighter
- Use homepage-specific animation bundles
- Lazy-load video
- Lazy-load below-the-fold images
- Use responsive images
- Use WebP / AVIF if practical
- Preload only the main hero image
- Avoid loading third-party video before user engagement

Performance goals:
- Fast mobile first paint
- Low layout shift
- Fast hero rendering
- Lightweight destination pages

---

# Content Strategy

Do not spend most effort on generic posts like:

- Top 10 Places in Koraput
- Best Tourist Places in Koraput
- Why Visit Koraput

These can exist, but they should not dominate.

Prioritize transactional search intent.

## Better content categories

### 1. Origin → Koraput pages
Examples:
- Koraput tour from Bhubaneswar
- Koraput tour from Kolkata
- Koraput tour from Visakhapatnam

### 2. Vehicle pages
Examples:
- 17-seater Traveller Koraput
- Koraput group Traveller rental

### 3. Destination pages
Examples:
- Deomali
- Duduma
- Gupteswar
- Talamali
- Kalyamali
- Putsil
- Jagannath Temple Koraput

### 4. Itinerary pages
Examples:
- 2-day Koraput itinerary
- 3-day Koraput itinerary
- 4-day Koraput itinerary
- Koraput family itinerary
- Koraput group itinerary

### 5. Pricing pages
Examples:
- Koraput Traveller rates
- Deomali day-trip cost
- 3-day Koraput Traveller cost

---

# Recommended SEO Keyword Clusters

## Core commercial keywords

- Koraput tour package
- Koraput group tour
- Koraput tourism package
- Koraput sightseeing
- Koraput tour operator
- Koraput travel agency
- Koraput Traveller
- Koraput tempo Traveller
- 17 seater Traveller Koraput
- Traveller rental Koraput
- Traveller hire Koraput

## Group intent

- Koraput tour for 10 people
- Koraput tour for 12 people
- Koraput tour for 15 people
- Koraput tour for 17 people
- group vehicle Koraput
- family trip Koraput
- group sightseeing Koraput

## Destination intent

- Deomali tour
- Deomali from Koraput
- Duduma tour
- Gupteswar trip
- Kolab trip
- Talamali Koraput
- Putsil Koraput
- Kalyamali Koraput
- Jagannath Temple Koraput

## Price intent

- Koraput Traveller price
- 17 seater Traveller rate Koraput
- Deomali Traveller price
- Koraput tour cost
- Koraput trip price
- Koraput sightseeing cab rate

## Origin intent

- Koraput tour from Bhubaneswar
- Koraput tour from Kolkata
- Koraput tour from Visakhapatnam
- Vizag to Koraput trip
- Bhubaneswar to Deomali
- Kolkata to Koraput itinerary

---

# Recommended Internal Linking

Every relevant destination page should link to:
- Traveller booking page
- 2-day itinerary
- 3-day itinerary
- WhatsApp booking

Every route page should link to:
- Vehicle page
- Major destinations
- Itinerary options
- Price section

Example:

**Visakhapatnam → Koraput page**

Links to:
- Deomali
- Duduma
- 17-seater Traveller
- 3-day itinerary
- WhatsApp

This creates strong topic clusters.

---

# Structured Data

Use relevant schema where appropriate:
- LocalBusiness
- TravelAgency
- TouristTrip
- FAQPage where genuine FAQ content exists
- BreadcrumbList

Do not overuse schema.

Important entity fields:
- Business name
- URL
- Phone
- Area served
- Address / service area
- Logo
- Social profiles
- Image
- Service type

---

# Suggested Homepage Structure

1. Hero
2. Core proposition
3. Why one 17-seater is better than multiple smaller cars
4. Traveller proof
5. Popular Koraput destinations
6. Suggested itineraries
7. Starting price / fare logic
8. Why choose Ananta Tours
9. Driver / team
10. Customer reviews
11. FAQs
12. WhatsApp CTA

---

# "One Traveller vs Multiple Cars" Section

This is an important differentiator.

Suggested points:

## One 17-Seater Traveller
- Everyone travels together
- One driver
- Easier coordination
- More fun for groups
- Better communication
- One pickup plan
- Easier luggage handling
- Lower risk of vehicles getting separated
- One itinerary
- Better for families and friend groups

## Multiple 4–7 Seater Cars
- Group gets split
- Multiple drivers
- More coordination
- Vehicles can get separated
- Repeated phone calls
- Different arrival times
- Harder luggage planning

CTA:

**Keep the group together. Explore Koraput in one Traveller.**

---

# First Implementation Batch

Recommended first coding batch:

1. Configure custom domain
2. Update canonical URLs
3. Connect Search Console
4. Fix hero video
5. Lazy-load hero video after 3 seconds
6. Add Talamali
7. Add Kalyamali
8. Position Putsil correctly
9. Add Jagannath Temple Koraput
10. Create Visakhapatnam landing page
11. Improve 17-seater page
12. Add pricing section
13. Fix sitemap dates
14. Reduce unnecessary animation scripts
15. Add driver/team proof
16. Add genuine reviews
17. Improve WhatsApp CTA copy

---

# Suggested Build Order

## Phase 1 — Search Foundation
- Custom domain
- Search Console
- Sitemap
- Canonicals
- Google Business Profile

## Phase 2 — Commercial SEO
- Traveller page
- Price intent
- Route pages
- Destination pages

## Phase 3 — Conversion
- Hero video
- Team
- Reviews
- Better WhatsApp CTAs
- Pricing transparency

## Phase 4 — Authority
- Local backlinks
- Tourism listings
- Customer reviews
- Travel blogs
- Real trip stories
- Google Maps authority

---

# Core Strategy

The business should not behave like a generic tourism-information website.

The strongest SEO funnel is:

**Search intent**

→ **specific Koraput page**

→ **real local proof**

→ **real 17-seater Traveller**

→ **clear route / itinerary**

→ **approximate price**

→ **WhatsApp booking**

The website should therefore prioritize:
- Buyer intent
- Group travel
- Vehicle hire
- Local expertise
- Real proof
- Destination-specific relevance
- Route-specific relevance

---

# Final Positioning

Recommended brand positioning:

## Ananta Tours & Travels

**Private Koraput tours for groups of 10–17 people**

Explore:
- Deomali
- Duduma
- Gupteswar
- Kolab
- Talamali
- Kalyamali
- Putsil
- Jagannath Temple
- Other Koraput destinations

Travel in:
- One new 17-seater AC Traveller
- Local driver
- Local trip support

Primary domain:

**anantatourskoraput.com**

Primary conversion:

**WhatsApp enquiry for availability and trip cost**
