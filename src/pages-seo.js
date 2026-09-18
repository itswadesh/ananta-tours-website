// High-intent pages added from the SEO strategy: a third origin city, two offbeat
// destinations, the town temple and the pricing page.
// Same rules as pages.js: short, factual, human. Verify timings before travel.
const site = require("./site");
const transport = require("./transport");
const c = site.contact;

// Starting rates render only when site.rates is filled in. Until then the page explains
// the method instead of inventing numbers.
function rateBlocks() {
  const r = site.rates;
  if (!r || !r.items || !r.items.length) return [];
  const rows = r.items.map(i => `<tr><th scope="row">${i.name}<small>${i.route}</small></th><td>${i.days}</td><td><b>${r.currency}${i.from.toLocaleString("en-IN")}</b></td></tr>`).join("");
  return [
    { type: "h2", text: "Starting rates" },
    { type: "html", html: `<div class="rate-table"><table><thead><tr><th scope="col">Trip</th><th scope="col">Length</th><th scope="col">From</th></tr></thead><tbody>${rows}</tbody></table></div>` },
    { type: "callout", icon: "rupee", html: `Starting fares for the whole 17-seater, not per person, last updated ${r.updated}. The final figure depends on your pickup point, total distance, days and any night halt.` }
  ];
}

module.exports = [
  {
    slug: "koraput-tour-package-from-visakhapatnam",
    title: "Koraput tour from Visakhapatnam",
    short: "From Visakhapatnam",
    metaTitle: "Koraput Tour Package from Visakhapatnam: Road and Rail",
    description: "How groups reach Koraput from Visakhapatnam by road, train or the Jeypore flight, where Araku fits, and a 3-day plan in a 17-seater AC Traveller with pickup.",
    kind: "City guide", icon: "train",
    hero: "rail-valley", heroAlt: "The Kirandul railway line curving high above a green valley in the Eastern Ghats",
    ctaPhoto: "machkund-temple",
    lede: "Visakhapatnam is the closest big city to Koraput: five to six hours by road, one scenic railway line, and a daily flight to Jeypore. Most Vizag groups stop at Araku and turn back. Koraput is the part they miss.",
    facts: [
      { icon: "road", label: "By road", value: "About 200 km, 5–6 h" },
      { icon: "train", label: "By train", value: "Kirandul line via Araku" },
      { icon: "wind", label: "By air", value: "Jeypore, about 55 min" },
      { icon: "calendar", label: "Days to keep", value: "2 to 3, plus travel" }
    ],
    blocks: [
      { type: "h2", text: "Getting to Koraput from Visakhapatnam" },
      { type: "ul", items: [
        "<strong>Road:</strong> about 200 km and five to six hours, either up through Araku and the Sunki ghat, or the flatter run via Salur and Pottangi. The Araku side is prettier and slower; the Salur side is the one we use when a group wants to arrive early. We can send the Traveller to Visakhapatnam and drive you the whole way.",
        "<strong>Train:</strong> the Kothavalasa–Kirandul line climbs from Visakhapatnam through Araku into the Eastern Ghats, with tunnels, bridges and the Maliguda section near Koraput. Passenger trains are slow and beautiful; the Vistadome tourist service runs only as far as Araku. Send us your train number and we meet it.",
        "<strong>Air:</strong> IndiaOne Air flies Visakhapatnam to Jeypore daily, about 55 minutes, on a 9-seat aircraft with cabin-size baggage only. Jeypore Airport is roughly 40 minutes from Koraput town and we pick up at the terminal.",
        "<strong>Bus:</strong> OSRTC runs through the day and night and APSRTC from about 04:30, five to six hours via Araku or Salur, roughly ₹235 to ₹800. Buses reach Koraput bus stand, twenty minutes from our base."
      ] },
      { type: "callout", icon: "info", html: `Train, flight and bus timings on this page were last verified ${transport.checked}. They change with the season; send us your ticket and we confirm the pickup time.` },
      { type: "h2", text: "Araku is on the way. Koraput is the trip." },
      { type: "p", html: "Araku is a valley resort town with coffee plantations and a tribal museum, and it sits on your route. Koraput, two hours further, is a district: Odisha's highest peak at Deomali, a 175 m waterfall at Duduma, a cave temple above the Sabari river, a reservoir at 3,000 ft and a Jagannath temple open to everyone. If you have already done Araku, this is the reason to keep driving." },
      { type: "h2", text: "A 3-day plan that ends on the way home" },
      { type: "days", items: [
        { title: "Arrive and take it easy", text: "We meet your train, flight or bus. Hotel check-in, then Sabara Srikhetra and the Tribal Museum in town, and Upper Kolab for the last light on the water.", stops: ["sabara-srikhetra", "tribal-museum", "kolab"], plan: [["On arrival", "Pickup at the station, airport or bus stand"], ["14:30", "Lunch and hotel check-in"], ["15:45", "Sabara Srikhetra"], ["16:30", "Tribal Museum"], ["17:15", "Upper Kolab for sunset"], ["19:00", "Back at the hotel"]] },
        { title: "Deomali and the highlands", text: "The early one. Sunrise on Odisha's highest peak, breakfast on the way down, then Nandapur's old capital and the country road to Rani Duduma.", stops: ["deomali", "nandapur", "rani-duduma"], plan: [["05:00", "Leave Koraput"], ["07:00", "Deomali top, sunrise"], ["09:30", "Breakfast, Semiliguda"], ["12:30", "Nandapur, Batrisa Singhasana"], ["14:00", "Rani Duduma"], ["17:30", "Back in Koraput"]] },
        { title: "Duduma, Machkund and home", text: "Duduma and the Machkund valley sit on the Odisha–Andhra border, which is the right direction for you. See the falls in the morning, eat on the road and carry on towards Visakhapatnam, or come back for a last night in Koraput.", stops: ["duduma", "onukadelli"], plan: [["07:00", "Leave Koraput with breakfast packed"], ["10:00", "Duduma viewpoints"], ["12:00", "Onukadelli market (Thursdays) or the Machkund valley"], ["13:30", "Lunch on the road"], ["17:30", "Back in Koraput, or on towards Vizag"]] }
      ] },
      { type: "h2", text: "What the Traveller changes on this route" },
      { type: "p", html: "The Sunki ghat and the Araku road are long, winding and slow in parts. In three or four small cars a Vizag group arrives at each viewpoint in instalments, and someone's luggage is always in the wrong boot. One 17-seater means one departure, one set of timings and a driver who has done the ghat in the dark. See the <a href=\"../17-seater-traveller-koraput/\">vehicle page</a> for seats and luggage, and the <a href=\"../koraput-traveller-price/\">price page</a> for how the fare is worked out." },
      { type: "h2", text: "What to carry" },
      { type: "ul", items: [
        "Warm layers from November to February. Vizag is warm; Deomali at dawn is not.",
        "Identity documents, because you cross into Odisha on the way.",
        "Cash for markets, entry tickets and small eateries.",
        "Motion-sickness tablets for anyone who struggles on ghat roads, and a front-row seat for them."
      ] }
    ],
    faqTitle: "Questions from Vizag groups",
    faq: [
      ["How far is Koraput from Visakhapatnam?", "About 200 km by road and five to six hours, either through Araku and the Sunki ghat or the flatter route via Salur and Pottangi."],
      ["Is Koraput worth it if we have already seen Araku?", "Yes. Araku is a valley town two hours short of Koraput. Koraput district has Odisha's highest peak at Deomali, the 175 m Duduma waterfall, the Gupteswar cave temple and a reservoir at 3,000 ft."],
      ["Can you pick us up in Visakhapatnam?", "Yes. We can start the trip at Visakhapatnam station, the airport or your hotel and run the whole journey in one vehicle, or meet you at Araku, Koraput Junction or Jeypore Airport."],
      ["How many days should a Vizag group keep?", "Two to three days in Koraput, plus travel. Three days covers the town, Kolab, Deomali, Rani Duduma and Duduma without a rushed morning."],
      ["Is there a flight from Visakhapatnam?", "IndiaOne Air flies to Jeypore daily, about 55 minutes, on a 9-seat aircraft with cabin-size baggage only. Jeypore Airport is roughly 40 minutes from Koraput town."]
    ],
    related: ["koraput-3-day-itinerary", "17-seater-traveller-koraput", "duduma-waterfall-tour", "koraput-traveller-price"],
    message: "Hi Ananta Tours, we are planning a Koraput trip from Visakhapatnam. Please share the itinerary, pickup and the 17-seater Traveller price."
  },

  {
    slug: "talamali-koraput",
    title: "Talamali and Putsil: a day on the Koraput plateau",
    short: "Talamali",
    metaTitle: "Talamali Koraput Tour: Putsil and Hilltop Views",
    description: "Talamali, Putsil and the Semiliguda–Pottangi highlands: what the drive is really like, when to go, why we check the road first, and how a group day works.",
    kind: "Offbeat", icon: "mountain",
    hero: "hero", heroAlt: "Open highland country in Koraput district under a wide sky",
    ctaPhoto: "koraput-valley",
    lede: "Flat-topped hills, grass instead of forest, and villages that look down on the clouds. Talamali is the Koraput most visitors never hear about, and the one place we always check the road for before we promise it.",
    facts: [
      { icon: "mountain", label: "Country", value: "Semiliguda–Pottangi highlands" },
      { icon: "clock", label: "From our base", value: "About 1 h, road depending" },
      { icon: "calendar", label: "Best months", value: "October to February" },
      { icon: "info", label: "Confirm first", value: "Road checked the same week" }
    ],
    blocks: [
      { type: "h2", text: "What Talamali is" },
      { type: "p", html: "A broad, flat-topped hill in the belt of highlands between Semiliguda and Pottangi, high enough that the tree line thins out and the top is open grass. Some groups know it as the Pendajam table mountain. There is no gate, no ticket and no tea stall: you park where the road gives up, walk out onto the top and the valleys open on three sides." },
      { type: "figure", photo: "koraput-mist", alt: "Mist lying in a valley below the Koraput hills in the early morning", caption: "The Koraput highlands at first light. The plateau tops sit above this line of mist." },
      { type: "h2", text: "Putsil, on the same road" },
      { type: "p", html: "Putsil is a hill village in the same country, usually paired with Talamali in a single morning. It is a working village, not a viewpoint with a car park, so we keep the group together, ask before photographing anyone and buy from whoever is selling. The drive between the two is the good part: red soil, millet terraces and long empty ridgelines." },
      { type: "h2", text: "The honest part" },
      { type: "ul", items: [
        "The last stretch to the top is rough. After heavy rain, a 17-seater sometimes stops short and the walk is fifteen to twenty minutes uphill.",
        "We check the road in the week you travel and tell you honestly whether the Traveller can get there. If it cannot, we say so before you book, not on the morning.",
        "There is no food, no fuel and patchy mobile coverage up there. Carry water and eat in Semiliguda.",
        "Go early. By midday the haze flattens the view and the light stops being worth the drive."
      ] },
      { type: "h2", text: "How a group day runs" },
      { type: "p", html: "Leave Koraput or Semiliguda around six, be on the top for the clear hour after sunrise, walk for as long as the group wants, then breakfast on the way down. Most groups are back by lunch, which leaves the afternoon for <a href=\"../kolab-dam-tour/\">Upper Kolab</a> or the town temple and museum. It also pairs naturally with <a href=\"../deomali-tour/\">Deomali</a> if you want two highland mornings in a row." },
      { type: "callout", icon: "camera", html: "Photographers: the table tops face east and west, so sunrise and sunset both work. Ask the driver to stop on the ridge road rather than only at the top, which is where the layered-hill shots come from." },
      { type: "h2", text: "Combine it with" },
      { type: "ul", items: [
        "<a href=\"../kalyamali-koraput/\">Kalyamali</a>, the other offbeat top in the same hills.",
        "<a href=\"../deomali-tour/\">Deomali</a>, an hour further on the Pottangi road.",
        "A <a href=\"../koraput-3-day-itinerary/\">3-day Koraput plan</a>, with this as the extra morning."
      ] }
    ],
    related: ["kalyamali-koraput", "deomali-tour", "koraput-sightseeing", "17-seater-traveller-koraput"],
    message: "Hi Ananta Tours, we would like to include Talamali and Putsil in a Koraput trip. Please tell us whether the road suits the Traveller and share the price."
  },

  {
    slug: "kalyamali-koraput",
    title: "Kalyamali: an offbeat hill day in Koraput",
    short: "Kalyamali",
    metaTitle: "Kalyamali Koraput Tour: Offbeat Hill Trip for Groups",
    description: "Kalyamali, also spelled Kaliamali: an open hilltop in the Semiliguda–Pottangi highlands, what the drive and the last climb are like, and when a group should go.",
    kind: "Offbeat", icon: "mountain",
    hero: "koraput-mist", heroAlt: "Cloud and mist moving over forested hills near Koraput town",
    ctaPhoto: "koraput-sunrise",
    lede: "Kalyamali, spelled Kaliamali as often as not, is a grass-topped hill in the same highlands as Talamali. Same reward, same warning: the view is long and the last climb is honest work.",
    facts: [
      { icon: "mountain", label: "Country", value: "Semiliguda–Pottangi highlands" },
      { icon: "clock", label: "From our base", value: "About 1 h, road depending" },
      { icon: "sunrise", label: "Go at", value: "Sunrise, or late afternoon" },
      { icon: "info", label: "Confirm first", value: "Road checked the same week" }
    ],
    blocks: [
      { type: "h2", text: "What to expect" },
      { type: "p", html: "An open top with grass, wind and uninterrupted views over the ridges towards Pottangi. Nothing is built up there. Groups go for the walk, the quiet and the photographs, not for facilities, and most people are happy with an hour and a half on top." },
      { type: "h2", text: "Getting there in a 17-seater" },
      { type: "ul", items: [
        "Tar road for most of the way from Semiliguda, then a rough final approach that changes with the rain.",
        "We confirm the week you travel whether the Traveller can reach the last stretch, or whether the group walks the final section.",
        "Sturdy shoes. The grass is slippery in the early morning and there is no marked path.",
        "Carry water and food. There is nothing to buy on the hill."
      ] },
      { type: "figure", photo: "koraput-sunrise", alt: "Sunrise through silhouetted forest on the Koraput highlands", caption: "First light on the Koraput highlands, the reason for the early start." },
      { type: "h2", text: "When to go" },
      { type: "p", html: "October to February for clear air and cold, still mornings. The monsoon is green and dramatic but the last climb turns to mud and the view spends most of the day inside a cloud. March onwards the haze builds and the top gets hot by nine." },
      { type: "callout", icon: "shield", html: "We will not drive a full Traveller up a wet approach road to keep an itinerary. If the road says no that week, we move the day to <a href=\"../deomali-tour/\">Deomali</a> or <a href=\"../kolab-dam-tour/\">Kolab</a> and tell you in advance." },
      { type: "h2", text: "Combine it with" },
      { type: "ul", items: [
        "<a href=\"../talamali-koraput/\">Talamali and Putsil</a>, in the same morning if the group is up early.",
        "<a href=\"../deomali-tour/\">Deomali</a>, for the bigger, better-known summit.",
        "A <a href=\"../koraput-4-day-itinerary/\">4-day Koraput plan</a>, where an offbeat morning fits without cutting anything."
      ] }
    ],
    related: ["talamali-koraput", "deomali-tour", "koraput-4-day-itinerary", "17-seater-traveller-koraput"],
    message: "Hi Ananta Tours, we would like to add Kalyamali to a Koraput trip. Please tell us whether the road suits the Traveller and share the price."
  },

  {
    slug: "jagannath-temple-koraput",
    title: "Sabara Srikhetra: the Jagannath temple in Koraput",
    short: "Jagannath Temple",
    metaTitle: "Jagannath Temple Koraput (Sabara Srikhetra): Visiting",
    description: "Sabara Srikhetra, the Jagannath temple in Koraput town: what it is, why it is open to every visitor, when to go, how long to keep and what else sits nearby.",
    kind: "Temple", icon: "temple",
    hero: "sabara-front", heroAlt: "The white front of the Jagannath temple at Koraput with its decorated entrance",
    ctaPhoto: "sabara-temple",
    lede: "Koraput's Jagannath temple sits on a rise in the middle of town, white against the hills. It is the easiest stop on any Koraput trip, and the one with the most local meaning.",
    facts: [
      { icon: "pin", label: "Where", value: "Koraput town" },
      { icon: "users", label: "Open to", value: "Visitors of every faith" },
      { icon: "clock", label: "Time needed", value: "About 45 minutes" },
      { icon: "sunrise", label: "Best time", value: "Early morning" }
    ],
    blocks: [
      { type: "h2", text: "Why this temple is different" },
      { type: "p", html: "Sabara Srikhetra takes its name from the Sabara people, the tribal community that Jagannath tradition holds first worshipped the deity in the forest. The temple was built on that idea: everyone is welcome inside, whatever their caste or religion, which is not true of every Jagannath temple. For a lot of visitors that is the whole reason to come." },
      { type: "figure", photo: "sabara-temple", alt: "Carved stone walls and shrine spires of Sabara Srikhetra, Koraput", caption: "Sabara Srikhetra, Koraput town." },
      { type: "h2", text: "What you see" },
      { type: "ul", items: [
        "The main shrine with Jagannath, Balabhadra and Subhadra, and smaller shrines around the courtyard.",
        "Carved panels and murals that borrow from the district's tribal art rather than only from classical temple styles.",
        "A high, open platform with a view over Koraput town and the hills behind it, which is worth the walk up on its own.",
        "Rath Yatra in the monsoon, when the town comes here and the whole plan for that day changes."
      ] },
      { type: "h2", text: "Practical notes" },
      { type: "ul", items: [
        "Leave footwear at the stand. There are steps, so anyone with bad knees should take the slow route up.",
        "Dress simply and cover shoulders and knees. Nobody will stop you, but it is a working temple.",
        "Photography rules differ between the courtyard and the inner shrine. Ask, and never photograph people praying.",
        "Opening hours change with the season and with festival days. We confirm them the day before your visit."
      ] },
      { type: "callout", icon: "clock", html: "Most groups spend forty-five minutes here. It fits comfortably into the first morning of any itinerary, before the drive out to the hills." },
      { type: "h2", text: "What to pair it with" },
      { type: "ul", items: [
        "The Tribal Museum, ten minutes away, which explains the communities whose land you drive through next.",
        "<a href=\"../kolab-dam-tour/\">Upper Kolab</a> in the late afternoon, for sunset over the reservoir.",
        "A <a href=\"../koraput-1-day-itinerary/\">1-day Koraput plan</a> if you only have the one day, or the <a href=\"../koraput-2-day-itinerary/\">2-day plan</a> if you have the weekend."
      ] }
    ],
    related: ["koraput-sightseeing", "koraput-1-day-itinerary", "kolab-dam-tour", "koraput-tour"],
    message: "Hi Ananta Tours, we would like to include Sabara Srikhetra and the town sights in a Koraput trip. Please share the plan and the Traveller price."
  },

  {
    slug: "koraput-traveller-price",
    title: "What a Koraput Traveller trip costs",
    short: "Prices",
    metaTitle: "17-Seater Traveller Price in Koraput",
    description: "How a 17-seater AC Traveller is priced in Koraput: what the quote includes, what moves it, tolls, parking and night halt, and how to get an exact figure on WhatsApp.",
    kind: "Pricing", icon: "rupee",
    hero: "traveller-side", heroAlt: "The Ananta Force Traveller photographed from the side in Semiliguda",
    ctaPhoto: "traveller-front-garland",
    lede: "We quote per trip, in writing, before you pay anything. This page explains how that number is built, so you can tell whether a quote from anyone is fair.",
    facts: [
      { icon: "rupee", label: "Quoted", value: "Per trip, not per seat" },
      { icon: "check", label: "Included", value: "Vehicle, driver, fuel, tolls" },
      { icon: "clock", label: "Quote time", value: "Usually the same day" },
      { icon: "shield", label: "Advance", value: "Only after you confirm" }
    ],
    blocks: [
      { type: "h2", text: "How the fare is worked out" },
      { type: "p", html: "One Traveller, one agreed route, one figure for the whole group. We do not quote per person and we do not meter the kilometres on the day, because a group that stops for two hours at Duduma should not pay more than one that stops for twenty minutes. What we need in order to price it is the shape of the trip." },
      { type: "ul", items: [
        "<strong>Where we pick you up.</strong> Koraput, Semiliguda and Jeypore are local. Rayagada, Araku, Visakhapatnam or Bhubaneswar mean the vehicle travels to you first.",
        "<strong>How far the route runs.</strong> A Kolab evening and a Duduma day are not the same drive.",
        "<strong>How many days.</strong> Multi-day trips are quoted as a block, which usually works out lower per day than separate day trips.",
        "<strong>Night halt.</strong> If the vehicle stays out overnight, the driver's stay and allowance are part of the quote and we say so.",
        "<strong>Season.</strong> Puja, the winter holidays and long weekends are tighter on availability.",
        "<strong>Early starts.</strong> A 4:30 am Deomali sunrise is a longer working day than a nine o'clock start."
      ] },
      { type: "h2", text: "What the quote includes" },
      { type: "ul", items: [
        "The 17-seater AC Traveller for the agreed days.",
        "An experienced local driver, including early mornings.",
        "Fuel, tolls, parking and permits for the agreed route.",
        "Trip planning before you travel and support on WhatsApp while you are here."
      ] },
      { type: "h3", text: "What it does not include" },
      { type: "ul", items: [
        "Meals, drinks and anything you buy on the road.",
        "Hotels for your group, and entry or camera tickets at monuments.",
        "Guide fees where a site has its own guides.",
        "Extra places added on the day, which we will price on the spot before we drive there."
      ] },
      { type: "h2", text: "The trips we are asked to price most often" },
      { type: "ul", items: [
        "<a href=\"../deomali-tour/\">Deomali</a> day trip from Koraput or Semiliguda, sunrise or sunset.",
        "<a href=\"../duduma-waterfall-tour/\">Duduma and Machkund</a>, a full day south-west.",
        "<a href=\"../koraput-2-day-itinerary/\">Two days</a>: the town, Kolab, Deomali and Rani Duduma.",
        "<a href=\"../koraput-3-day-itinerary/\">Three days</a>, which is what most groups end up booking.",
        "<a href=\"../koraput-4-day-itinerary/\">Four days</a>, adding Gupteswar and the Maliguda railway.",
        "Station, airport and bus-stand transfers on their own."
      ] },
      ...rateBlocks(),
      { type: "h2", text: "Why there is no rate card on this page" },
      { type: "p", html: "Because a fixed per-kilometre card would be wrong for most of you. A Bhubaneswar group arriving at Koraput Junction and a Visakhapatnam group we collect from their doorstep are different trips in the same Traveller. We would rather read your dates and send one honest number than publish a figure that changes the moment you ask a real question." },
      { type: "h2", text: "How to get an exact price in one message" },
      { type: "p", html: "Send these five lines on WhatsApp and you usually have a written quote the same day." },
      { type: "ul", items: [
        "Travel dates, or the month if the dates are still open.",
        "Number of travellers, and rough luggage.",
        "Pickup point: station, airport, hotel or another city.",
        "Number of days in Koraput.",
        "Places you want to include, or just say how many days you have."
      ] },
      { type: "callout", icon: "shield", html: "No payment is requested until the itinerary, price and availability are confirmed in writing. Only then do we share the UPI details and a booking reference, privately on WhatsApp." }
    ],
    faqTitle: "How much does a 17-seater Traveller cost in Koraput?",
    faqLede: "It is quoted per trip, for the whole vehicle, not per seat. The figure depends on where we pick you up, how far the route runs, how many days you keep the Traveller and whether it stays out overnight. Send your dates, group size and pickup point on WhatsApp and you usually have a written price the same day.",
    faq: [
      ["Is the price per person or for the whole vehicle?", "For the whole vehicle. Seventeen people or eleven, the Traveller costs the same for the same route, which is why groups work out cheaper per head than hiring several cars."],
      ["What is included in the quote?", "The 17-seater AC Traveller, an experienced local driver, fuel, tolls, parking and permits for the agreed route, plus trip planning before you travel and support on WhatsApp while you are here."],
      ["What is not included?", "Meals, entry and camera tickets, hotels for your group, and guide fees where a site has its own guides. Places you add on the day are priced before we drive to them."],
      ["Do you charge for the driver's night halt?", "If the vehicle stays out overnight, the driver's stay and allowance are part of the quote and are named there. Nothing is added afterwards."],
      ["When do I pay?", "Only after the itinerary, price and availability are confirmed in writing. We then share the UPI details and a booking reference privately on WhatsApp."],
      ["Is there a rate card per kilometre?", "No. A Bhubaneswar group met at Koraput Junction and a Visakhapatnam group collected from their doorstep are different trips in the same vehicle, so we quote each one rather than publish a figure that would be wrong for most people."]
    ],
    related: ["17-seater-traveller-koraput", "traveller-rental-koraput", "koraput-3-day-itinerary", "koraput-tour"],
    asideText: "Send your dates, group size and pickup point. We reply with the route, the timings and one written price for the whole vehicle.",
    message: `Hi Ananta Tours, please share the Traveller availability and total trip cost.\n\nTravel dates:\nNumber of people:\nPickup location:\nNumber of days:\nPlaces we want to visit:`
  }
];
