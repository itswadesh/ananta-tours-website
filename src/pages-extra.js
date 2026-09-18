// Commercial-intent, group-travel, extra itinerary and contact pages.
// Same rules as pages.js: short, factual, verify timings before travel.
const site = require("./site");
const c = site.contact;

module.exports = [
  {
    slug: "traveller-rental-koraput",
    title: "Traveller rental in Koraput, with driver",
    short: "Traveller rental",
    metaTitle: "Tempo Traveller Rental in Koraput: 17-Seater AC with Driver",
    description: "Hire a 17-seater AC Force Traveller in Koraput with a local driver and support staff. How the quote works, what is included, pickup points, luggage and booking steps.",
    kind: "Hire", icon: "van",
    hero: "traveller-front-hill", heroAlt: "Front of the Ananta Force Traveller parked on a Koraput hillside",
    ctaPhoto: "traveller-side",
    lede: "One 17-seater AC Traveller, a driver who knows Koraput's roads and a support number that answers. This page is the practical part: what you get, what it costs to ask, and how a booking works.",
    facts: [
      { icon: "seat", label: "Capacity", value: "17 passengers" },
      { icon: "rupee", label: "Pricing", value: "Per trip, quoted on WhatsApp" },
      { icon: "pin", label: "Pickup", value: "Koraput, Jeypore, Semiliguda" },
      { icon: "shield", label: "Permit", value: "All-India permit" }
    ],
    blocks: [
      { type: "h2", text: "What you get" },
      { type: "ul", items: [
        "A brand-new Force Traveller (September 2026), air conditioned, 17 passenger seats. See the <a href=\"../17-seater-traveller-koraput/\">vehicle page</a> for photographs and seating.",
        "An experienced local driver for the whole trip, including early Deomali starts.",
        "A support contact on WhatsApp from booking to drop-off, for timings, changes and local questions.",
        "Trip planning: we suggest the route for your days before you decide."
      ] },
      { type: "h2", text: "How the quote works" },
      { type: "p", html: "We quote per trip for an agreed route and number of days, not per kilometre. The quote lists what is included so nothing changes at the end. Typically it covers the Traveller, driver, fuel, tolls and parking for the agreed route. Meals, entry tickets and hotels are paid by you directly. Extra stops beyond the plan are agreed on WhatsApp before the day, with their cost." },
      { type: "callout", icon: "rupee", html: "We do not publish a rate card because a Deomali day and a Duduma day cost differently. Send dates, group size and route and you get a written price the same day." },
      { type: "h2", text: "Pickup and drop" },
      { type: "ul", items: [
        "<strong>Koraput town:</strong> railway station, bus stand or your hotel.",
        "<strong>Jeypore:</strong> town, bus stand or the airport when flights operate.",
        "<strong>Semiliguda:</strong> our base, on the highway between Koraput and Sunabeda.",
        "<strong>Visakhapatnam or Araku:</strong> on request for the full trip; the road via Araku takes five to six hours."
      ] },
      { type: "h2", text: "Luggage, seats and driving hours" },
      { type: "ul", items: [
        "Seventeen people with one small bag each fit comfortably. With large suitcases, 12 to 14 travellers is realistic. Tell us your luggage and we advise honestly.",
        "Front rows and window seats for anyone who gets car-sick on ghat roads.",
        "We plan long hill drives for daylight and keep the driver's day sensible. Sunrise starts are fine; late-night ghat driving is avoided."
      ] },
      { type: "h2", text: "Booking, changes and payment" },
      { type: "days", items: [
        { title: "Share your trip", text: "Dates, group size, where you arrive and the places you want. WhatsApp is easiest." },
        { title: "Confirm the plan and price", text: "We send the route, timings and the written quote. Ask anything before you decide." },
        { title: "Pay the booking advance", text: "The UPI QR and a booking reference come privately on WhatsApp. The advance amount and change terms are written in your quote." }
      ] },
      { type: "p", html: "Changes to dates or route are handled on WhatsApp as early as you can tell us. Weather and road conditions in the hills sometimes change a day's plan; the driver and support team will suggest the safe alternative." },
      { type: "h2", text: "Why groups choose one Traveller over three cars" },
      { type: "p", html: "One pickup, one route, one set of timings, nobody waiting for the last car at every viewpoint, and one driver who explains the same thing to everyone at the same time. The <a href=\"../group-tour-koraput/\">group tour guide</a> goes into how a day with 12 to 17 people actually runs." }
    ],
    related: ["17-seater-traveller-koraput", "group-tour-koraput", "koraput-tour", "koraput-3-day-itinerary"],
    message: "Hi Ananta Tours, I would like a quote for the 17-seater AC Traveller in Koraput. Our dates, group size and pickup point: "
  },
  {
    slug: "group-tour-koraput",
    title: "Koraput group tour for 8 to 17 people",
    short: "Group tour",
    metaTitle: "Koraput Group Tour: Travel Together in One 17-Seater Traveller",
    description: "How a Koraput trip works for a group of 8 to 17: one vehicle, one driver, realistic day plans, seating, meals, hotels and the questions families, pilgrim groups and office teams ask.",
    kind: "Group travel", icon: "users",
    hero: "traveller-front-garland", heroAlt: "The Ananta Traveller with a marigold garland on delivery day",
    ctaPhoto: "deomali-range",
    lede: "Groups are where Koraput gets complicated: too many people for one car, too few for a bus. One Traveller with a local team removes the coordination, and this page shows how a group day actually runs.",
    facts: [
      { icon: "users", label: "Group size", value: "8 to 17 people" },
      { icon: "van", label: "Vehicle", value: "One 17-seater AC Traveller" },
      { icon: "calendar", label: "Best plans", value: "2 to 4 days" },
      { icon: "chat", label: "Support", value: "Driver + WhatsApp contact" }
    ],
    blocks: [
      { type: "h2", text: "One group. One vehicle. One trip." },
      { type: "p", html: "With three or four small cars, the group splits at every stop: different drivers, different arrival times, phone calls to find each other, luggage in the wrong car. With one Traveller everyone leaves together, hears the same explanation at the same viewpoint and eats together. It is a simpler trip, not just a cheaper-to-coordinate one." },
      { type: "ul", items: [
        "<strong>One pickup</strong> at the station or hotel, one departure time.",
        "<strong>One route</strong> the driver already knows, with the stops agreed the night before.",
        "<strong>One contact</strong> on WhatsApp for the whole group's questions.",
        "<strong>One luggage space</strong>, loaded once."
      ] },
      { type: "figure", photo: "traveller-side", alt: "Side view of the Ananta Traveller showing the full window line", caption: "Seventeen seats, one window line." },
      { type: "h2", text: "How a group day runs" },
      { type: "p", html: "Departure is fixed the evening before. Breakfast is on the road on early days (Deomali) and in town on easy days. We stop every 60 to 90 minutes on ghat roads. Lunch is at a known place on the route, booked ahead for large groups where possible. Long days end before dark; short days leave time for Kolab or the town temple in the evening. See the <a href=\"../koraput-3-day-itinerary/\">3-day plan</a> for a real example." },
      { type: "h2", text: "Seating for a group" },
      { type: "ul", items: [
        "Rows of 2+1 with a back bench of four, indicative until the variant is confirmed. Elders and anyone prone to car-sickness sit in the front rows.",
        "Seventeen travellers with hand luggage is comfortable. For big suitcases, 12 to 14 people is the honest number.",
        "Children count as passengers; there are no extra fold-down seats."
      ] },
      { type: "h2", text: "Hotels and meals for 8 to 17" },
      { type: "p", html: "Koraput town and Jeypore have the most rooms; Semiliguda and Sunabeda have a few. For a group of this size book early for winter weekends and holidays, and ask us for options that suit the route. We do not sell hotel packages, so you pay hotels and restaurants directly and choose what you like." },
      { type: "h2", text: "Kinds of groups we plan for" },
      { type: "ul", items: [
        "<strong>Families with elders and children:</strong> shorter days, sunset instead of sunrise, front-row seats, frequent stops.",
        "<strong>Pilgrim groups:</strong> Sabara Srikhetra and <a href=\"../gupteswar-tour/\">Gupteswar</a>, with Shravan crowds in mind.",
        "<strong>Friends and college groups:</strong> Deomali sunrise, Duduma, Maliguda's railway, and long photo stops.",
        "<strong>Office and club outings:</strong> a fixed plan, fixed timings and one invoice."
      ] },
      { type: "callout", icon: "info", html: "Groups larger than 17? Tell us; two vehicles travelling together can be arranged with partner operators, but we will say so plainly rather than promise our own second Traveller." }
    ],
    related: ["traveller-rental-koraput", "koraput-3-day-itinerary", "koraput-4-day-itinerary", "koraput-tour"],
    message: "Hi Ananta Tours, we are a group planning a Koraput trip. Our group size, dates and where we start from: "
  },
  {
    slug: "koraput-1-day-itinerary",
    title: "Koraput in 1 day",
    short: "1-day itinerary",
    metaTitle: "Koraput 1-Day Itinerary: Temple, Museum, Kolab and Deomali Sunset",
    description: "A realistic one-day Koraput plan: Sabara Srikhetra and the Tribal Museum in the morning, Upper Kolab before lunch and Deomali for sunset.",
    kind: "Itinerary", icon: "calendar",
    hero: "deomali-top", heroAlt: "Rolling hills near Deomali in afternoon light",
    ctaPhoto: "kolab-garden",
    lede: "One long, good day. It works if you sleep in Koraput the night before, start at eight and accept that the two big waterfalls wait for a second visit.",
    facts: [
      { icon: "calendar", label: "Days", value: "1" },
      { icon: "road", label: "Driving", value: "about 200 km" },
      { icon: "clock", label: "Start", value: "8 am, Koraput town" },
      { icon: "sunrise", label: "Ends", value: "Deomali sunset, back by 8 pm" }
    ],
    blocks: [
      { type: "days", items: [
        { title: "Temple, museum, Kolab, then the mountain", text: "Sabara Srikhetra at eight, the Tribal Museum at nine. Drive west to Upper Kolab for the garden and the view over the water, then back through Koraput for lunch in Semiliguda. Deomali by three, the top by four, sunset from the ridge and back in town by eight.", stops: ["sabara-srikhetra", "tribal-museum", "kolab", "deomali"] }
      ] },
      { type: "h2", text: "What to skip and why" },
      { type: "p", html: "Duduma is a three-hour drive each way and Gupteswar two and a half; either one eats the whole day. Rani Duduma and Nandapur fit only if you drop Kolab, which is the better trade in the monsoon when the falls are full. Ask us and we will re-cut the day." },
      { type: "callout", icon: "clock", html: "Arriving by the morning train and leaving the same night? Skip the museum, keep Kolab short and make Deomali the day." },
      { type: "h2", text: "If you can add a night" },
      { type: "p", html: "One extra night turns this into the <a href=\"../koraput-2-day-itinerary/\">2-day plan</a> with Rani Duduma and Nandapur on the second day." }
    ],
    related: ["koraput-2-day-itinerary", "deomali-tour", "kolab-dam-tour", "koraput-sightseeing"],
    message: "Hi Ananta Tours, we would like the 1-day Koraput plan (temple, museum, Kolab, Deomali sunset). Please share availability and the Traveller price."
  },
  {
    slug: "koraput-4-day-itinerary",
    title: "Koraput in 4 days",
    short: "4-day itinerary",
    metaTitle: "Koraput 4-Day Itinerary: Deomali, Duduma, Gupteswar, Kolab, Maliguda",
    description: "A four-day Koraput itinerary covering all three directions: the town and Kolab, Deomali and Rani Duduma, Duduma Waterfall, then Gupteswar cave temple and the Maliguda railway.",
    kind: "Itinerary", icon: "calendar",
    hero: "duduma-falls", heroAlt: "Duduma waterfall seen across the gorge",
    ctaPhoto: "rail-valley",
    lede: "Four days covers every direction from Koraput without a rushed one: the mountain, both big waterfalls, the cave temple, the reservoir and the railway through the Ghats.",
    facts: [
      { icon: "calendar", label: "Days", value: "4" },
      { icon: "road", label: "Total driving", value: "about 580 km" },
      { icon: "clock", label: "Longest day", value: "Day 3, about 6 h on the road" },
      { icon: "sunrise", label: "Early start", value: "Day 2 only" }
    ],
    blocks: [
      { type: "days", items: [
        { title: "Arrive, town and Upper Kolab", text: "Pickup, check-in, Sabara Srikhetra and the Tribal Museum. Upper Kolab for the late light. Nothing early.", stops: ["sabara-srikhetra", "tribal-museum", "kolab"] },
        { title: "Deomali, Nandapur, Rani Duduma", text: "Sunrise on Deomali or a slow morning on top, breakfast in Semiliguda, Nandapur's old capital, then Rani Duduma's waterfall road home.", stops: ["deomali", "nandapur", "rani-duduma"] },
        { title: "Duduma and Machkund", text: "The long south-west day to the Duduma gorge and the Machkund valley. On a Thursday, Onukadelli market first.", stops: ["duduma", "onukadelli"] },
        { title: "Gupteswar and the railway", text: "West past Jeypore to the Gupteswar cave temple and the Sabari river, back via the Maliguda bridges and tunnel, then the station or one more night.", stops: ["gupteswar", "maliguda"] }
      ] },
      { type: "figure", photo: "gupteswar-lingam", alt: "The Shiva lingam inside Gupteswar cave", caption: "Day four: inside Gupteswar cave." },
      { type: "h2", text: "Why this order" },
      { type: "p", html: "Day one is light for people who travelled overnight. The early start comes on day two while everyone is fresh. The long Duduma day sits in the middle so nobody drives it tired on a departure day. Gupteswar closes the loop on the west side, near the road out to Jeypore and the railway." },
      { type: "h2", text: "Swaps that work" },
      { type: "ul", items: [
        "Ride one section of the Kirandul line by train on day four while the Traveller meets you at the other end; ask us about timings.",
        "Replace Onukadelli with the Machkund temple complex on non-Thursdays.",
        "Coffee estates around Koraput can slot into day one if the group likes a slow afternoon."
      ] },
      { type: "callout", icon: "luggage", html: "Four days means four early-ish mornings and two long drives. Pack for cold dawns, hot afternoons and one waterfall spray." }
    ],
    related: ["koraput-3-day-itinerary", "koraput-tour-package-from-kolkata", "gupteswar-tour", "duduma-waterfall-tour"],
    message: "Hi Ananta Tours, we would like the 4-day Koraput itinerary (Kolab, Deomali, Rani Duduma, Duduma, Gupteswar, Maliguda). Please share availability and the Traveller price."
  },
  {
    slug: "contact",
    title: "Contact Ananta Tours & Travels",
    short: "Contact",
    metaTitle: "Contact Ananta Tours & Travels, Semiliguda, Koraput",
    description: `Reach Ananta Tours & Travels in Semiliguda, Koraput: WhatsApp ${c.whatsappDisplay}, phone ${c.phones.map(p => p.display).join(" or ")}, ${c.address.street}, ${c.address.locality} ${c.address.postalCode}.`,
    kind: "Contact", icon: "phone",
    hero: "koraput-mist", heroAlt: "Mist over a temple and hills near Koraput town",
    ctaPhoto: "traveller-front-hill",
    lede: "WhatsApp is the fastest way to reach us, and the way every booking is confirmed. Calls work too. Here is where we are.",
    facts: [
      { icon: "whatsapp", label: "WhatsApp", value: c.whatsappDisplay },
      { icon: "phone", label: "Phone", value: c.phones[0].display },
      { icon: "phone", label: "Phone", value: c.phones[1].display },
      { icon: "pin", label: "Based in", value: `${c.address.locality}, Koraput` }
    ],
    blocks: [
      { type: "h2", text: "Write to us" },
      { type: "p", html: `WhatsApp <a href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener noreferrer">${c.whatsappDisplay}</a> with your dates, group size and where you start from. You get a route and a written price, usually the same day. Calls: <a href="tel:${c.phones[0].tel}">${c.phones[0].display}</a> or <a href="tel:${c.phones[1].tel}">${c.phones[1].display}</a>.` },
      { type: "h2", text: "Where we are" },
      { type: "p", html: `${c.address.street}, ${c.address.locality}, Dist. ${c.address.district}, ${c.address.region} ${c.address.postalCode}. Semiliguda sits on the highway between Koraput town and Sunabeda, about twenty minutes from Koraput railway station and on the road to Deomali.` },
      { type: "html", html: `<div class="map-frame map-frame-sm"><iframe src="https://maps.google.com/maps?q=${encodeURIComponent(c.address.street + ", " + c.address.locality + ", " + c.address.district + ", " + c.address.region + " " + c.address.postalCode)}&z=14&output=embed" title="Map of Semiliguda, Koraput" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>` },
      { type: "h2", text: "What to send for a quick quote" },
      { type: "ul", items: ["Travel dates, or the month if dates are open.", "Number of travellers and rough luggage.", "Where you arrive: Koraput station, Jeypore, Visakhapatnam or by road.", "Places you want to include, or just say how many days you have."] },
      { type: "callout", icon: "shield", html: "No payment is requested until the itinerary, price and availability are confirmed in writing on WhatsApp." }
    ],
    related: ["koraput-tour", "traveller-rental-koraput", "group-tour-koraput"],
    message: "Hi Ananta Tours, I would like to plan a Koraput trip. Our dates, group size and starting point: "
  }
];
