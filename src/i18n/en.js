// English master dictionary. Every other language file mirrors these keys.
// Placeholders in braces ({n}, {name}, {date}, ...) are filled in by the templates.
module.exports = {
  code: "en",
  name: "English",
  htmlLang: "en",
  // Dates written out in this language (the vehicle facts are the same in every language).
  dates: { deliveredOn: "4 September 2026", purchased: "September 2026", checked: "18 September 2026" },
  ui: {
    nav: { road: "The road", itineraries: "Itineraries", destinations: "Destinations", traveller: "Traveller", prices: "Prices", map: "Map", planTrip: "Plan a trip" },
    menuOpen: "Open menu",
    whatsappAria: "WhatsApp {number}",
    language: "Language",
    footer: {
      blurb: "Group journeys across Koraput, Odisha, in a new 17-seater AC Force Traveller with a local driver and support team.",
      onWhatsApp: "on WhatsApp",
      dist: "Dist.",
      plan: "Plan", places: "Places", ananta: "Ananta",
      links: {
        "koraput-tour": "Koraput tour", "koraput-1-day-itinerary": "1-day itinerary", "koraput-2-day-itinerary": "2-day itinerary", "koraput-3-day-itinerary": "3-day itinerary", "koraput-4-day-itinerary": "4-day itinerary",
        "koraput-tour-package-from-bhubaneswar": "From Bhubaneswar", "koraput-tour-package-from-kolkata": "From Kolkata",
        "koraput-sightseeing": "Koraput sightseeing", "deomali-tour": "Deomali", "duduma-waterfall-tour": "Duduma Waterfall", "gupteswar-tour": "Gupteswar", "kolab-dam-tour": "Upper Kolab",
        "17-seater-traveller-koraput": "The Traveller", "traveller-rental-koraput": "Traveller rental", "group-tour-koraput": "Group tours", map: "Map of stops", stations: "Station pickup", contact: "Contact", whatsappUs: "WhatsApp us", credits: "Photo credits"
      },
      fine: "Trip plans may change with weather, road access and local conditions. Distances and times are approximate. Vehicle photographs are our own. Landscape photographs by Wikimedia Commons contributors,",
      creditedHere: "credited here"
    },
    cta: { heading: "Tell us your dates. We'll shape the road ahead.", text: "Send dates, group size and where you start from. We reply with a route, timings and the Traveller price.", planOnWhatsApp: "Get trip cost on WhatsApp", buildMyTrip: "Build my trip", aria: "Get trip cost on WhatsApp" },
    // Units used to localise drive times such as "About 1 h 10 min" and "In town".
    units: { about: "About", h: "h", min: "min", inTown: "In town" },
    lines: { "Koraput–Rayagada": "Koraput–Rayagada", "Kirandul line, south": "Kirandul line, south", "Kirandul line, north": "Kirandul line, north" },
    realPhoto: "Real photo · our Traveller",
    realPhotoNotStock: "Real photo · our Traveller, not a stock image",
    article: { home: "Ananta", tour: "Koraput tour", planThis: "Plan this with Ananta", asideText: "Tell us your dates and group size. We reply with timings, the route and the Traveller price.", whatsappAnanta: "Check availability and price", keepReading: "Keep reading", read: "Read", relatedAria: "Related guides", estimatedTimes: "Estimated times", day: "Day {n}", guide: "Guide", updated: "Updated {date}", defaultMessage: "Hi Ananta Tours, I am planning a Koraput trip and read your page about {title}. Please help me with the itinerary and 17-seater Traveller availability." },
    credits: { title: "Photo credits", description: "Sources and licences for the photographs used on the Ananta Tours & Travels website.", intro: "Every landscape and place photograph on this site is a real photograph of Koraput district, shared by its photographer on Wikimedia Commons under a Creative Commons licence. We crop and resize them for the web and change nothing else. Photographs of the Ananta Traveller and the logo are our own.", by: "by", via: "via Wikimedia Commons. Cropped and resized. Used as" }
  },
  strings: {
    day: "Day {n}",
    routeTitle: "Your {n}-day Koraput journey",
    fourPlus: "4+",
    thu: " (Thu)",
    notes: { one: "Leave 07:30, back about 20:00", town: "Easy start, back about 18:30", hills: "Leave 05:00, back about 17:30", south: "Leave 07:00, back about 17:30", west: "Leave 07:30, back about 17:00" },
    around: " around {date}",
    waPlanner: "Hi Ananta Tours, we are {people} people travelling from {origin} and planning a {days}-day Koraput trip{when}. Suggested route: {route}.{must} Please send an itinerary, availability and the Traveller price.",
    waPlaces: " Places we want to include: {places}.",
    waDefault: "Hi Ananta Tours, I am planning a Koraput trip.\n\nTravel dates:\nNumber of people:\nPickup location:\nNumber of days:\nPlaces we want to visit:\n\nPlease share Traveller availability and the total trip cost.",
    waOrigin: "Hi Ananta Tours, I am planning a Koraput trip from {origin}. Please help me with the itinerary and 17-seater Traveller availability.",
    pending: "Business number pending. WhatsApp will ask you to choose a contact.",
    seat: "Seat {n}", frontRow: "front row, beside the driver", backBench: "back bench", row: "row {n}", window: "window", aisle: "aisle", middle: "middle", seatWord: "seat",
    seatInfo: "Layout as photographed in the cabin. Tell us who sits where and we keep it.",
    driver: "Driver",
    copied: "Copied"
  },
  home: {
    title: "Koraput Tour Packages & 17-Seater Traveller | Ananta Tours",
    description: "Plan a 2–4 day Koraput group tour to Deomali, Duduma, Gupteswar and Kolab in a 17-seater AC Traveller with local pickup, driver and trip support.",
    jsonDescription: "Koraput sightseeing journeys for families and groups in a new 17-seater AC Traveller with a local driver, support staff and guided-tour assistance.",
    hero: {
      badge: "Real photo · our Traveller on delivery day, {date}",
      h1a: "Discover Koraput.", h1b: "We’ll take care of the journey.",
      copy: "Private Koraput tours for groups of 10 to 17 people. Deomali, Duduma, Gupteswar, Talamali and Putsil in one new AC Traveller, with a local driver and trip support.",
      plan: "Plan my Koraput trip",
      proof: { newLabel: "New", purchased: "· purchased {date}", seats: "{n} seats", ac: "Air conditioned", driver: "Local driver", support: "& support", guided: "Guided tours", station: "Station pickup", drop: "& drop" },
      openGallery: "Open the photo gallery", sliderAria: "Photo slider", prev: "Previous photo", next: "Next photo", photoN: "Photo {n}: {caption}", view: "View {n} photos", scrollCue: "Scroll to the next section",
      slides: [
        { alt: "Our Force Traveller with a marigold garland on delivery day", caption: "Delivery day, {date}. Real photo of our Traveller." },
        { alt: "Side view of our Force Traveller", caption: "Side view. Registration OD02 DT 9296, all-India permit." },
        { alt: "Front of our Traveller on a Koraput hillside", caption: "On a Koraput hillside in its first week." },
        { alt: "Inside the Traveller: pushback seats in a 2+1 layout", caption: "Inside: 2+1 pushback seats, curtains, overhead rack, AC vents." },
        { alt: "Rear doors of our Traveller", caption: "Rear doors, emergency exit and our numbers." }
      ]
    },
    intro: { h2: "One group, one vehicle, one unhurried Koraput.", p: "For families, friends, pilgrim groups and small teams arriving from Bhubaneswar, Kolkata or further away. We plan the route around your arrival, drive you between the hills, waterfalls and temples, and stay reachable the whole way.", photoAlt: "Green valley near Sunabeda in the monsoon, Koraput district", caption: "Monsoon valley near Sunabeda, on the road to Deomali.", captionSub: "Koraput district · about 20 minutes from our base" },
    journey: { h2a: "17 seats.", h2b: "One incredible Koraput.", p: "Scroll the road. Every stop is one photograph, one sentence and how long the drive takes from Koraput town.", start: "Start", startTitle: "Koraput town", startP: "Pickup at your hotel, the railway station or wherever your journey into the hills begins.", vehicleAlt: "The Ananta Traveller, ready for pickup", vehicleCaption: "Our Traveller, photographed on the day it arrived, {date}. Real photo.", end: "Back to Koraput", endTitle: "Where should we take you?", endP: "Pick your days and group size and we will shape the road around them.", buildTrip: "Build my trip", whatsappAnanta: "WhatsApp Ananta", fromKoraput: "{drive} from Koraput", aboutKm: "About {km} km", leaveArrive: "Leave 07:00, arrive about {time}", planDay: "Plan a {name} day", photoAlt: "{name}, Koraput" },
    itineraries: { h2: "How many days do you have?", lede: "Four realistic plans, each one a page with timings, stops and what to skip. Pick the closest and we adjust it to your group.", dayOne: "day", days: "days", seePlan: "See the plan", cards: [
      { title: "Temple, museum, Kolab, Deomali sunset", sub: "Long but doable from a night in town." },
      { title: "Town and Kolab, then Deomali and Rani Duduma", sub: "The weekend version." },
      { title: "Adds Duduma Waterfall and the Machkund valley", sub: "The sweet spot for most groups." },
      { title: "Adds Gupteswar cave temple and the Maliguda railway", sub: "Every direction, nothing rushed." }
    ] },
    planner: { h2: "Build my Koraput trip", lede: "Three choices. We suggest the stops, then send you to WhatsApp with the enquiry already written.", bullets: ["No forms, no account, no payment yet", "A route matched to your days", "Price shared after we confirm the details"], from: "Where are you travelling from?", origins: ["Bhubaneswar", "Kolkata", "Visakhapatnam", "Somewhere else"], originValues: ["Bhubaneswar", "Kolkata", "Visakhapatnam", "another city"], people: "How many people?", days: "How many days in Koraput?", dayChips: ["1 day", "2 days", "3 days", "4+ days"], when: "Around when?", optional: "(optional)", places: "Places you want to include", routeTitle: "Your 3-day Koraput journey", submit: "Get this itinerary and price", note: "No payment is requested until your itinerary, price and availability are confirmed." },
    destinations: { h2: "Places worth the drive", lede: "Twelve stops we know well. Start with the big three, then let the season and your days decide the rest.", readGuide: "Read the guide", whereItFits: "Where it fits" },
    together: {
      h2: "One group. One vehicle. One trip.", lede: "For 10 to 17 people, several small cars turn a holiday into coordination. One Traveller keeps everyone on the same road at the same time.",
      badLabel: "Three to five cars", badTitle: "The group splits", bubbles: ["?", "Where?", "Waiting…"],
      badList: [["The group separates", "Different drivers, different arrival times at every stop."], ["Calls to find each other", "\"Where are you?\" at every viewpoint and every lunch."], ["Luggage in the wrong car", "Bags split across boots; someone's jacket is always elsewhere."], ["Half the group misses the story", "The driver's explanation reaches one car, not five."]],
      goodLabel: "One Traveller", goodTitle: "Everyone together", pill: "17 travellers · 1 vehicle",
      goodList: [["One pickup, one route", "One departure time, one set of timings for the whole group."], ["One driver who knows the road", "Sunrise timings, food stops and the slow bends, handled."], ["Luggage loaded once", "Overhead rack for small bags; everything travels together."], ["Same view, same story, same time", "Everyone hears the same explanation at the same viewpoint."]],
      howGroupDay: "How a group day runs", statsAria: "What changes with one vehicle",
      stats: [["3–5 cars", "1 Traveller"], ["3–5 drivers", "1 driver"], ["Calls at every stop", "None"], ["Bags in 4 boots", "Loaded once"]]
    },
    traveller: {
      h2: "Your vehicle for Koraput", lede: "A brand-new Force Traveller, air conditioned, 17 passenger seats, photographed in Semiliguda on the day it arrived, {date}. Facts, not adjectives.",
      openFull: "Open this photo full screen", thumbsAria: "Vehicle photographs",
      captions: { side: "Side view. Registration OD02 DT 9296, all-India permit.", cabin: "Inside: pushback seats with armrests, 2+1 across, curtains on every window, overhead rack, AC vents.", hill: "On a Koraput hillside, first week out.", garland: "Delivery day, {date}.", rear: "Rear doors with the emergency exit and our numbers." },
      thumbs: { side: "Side", cabin: "Cabin", hill: "On the hills", garland: "Delivery day", rear: "Rear" },
      alts: { side: "The white Ananta Force Traveller seen from the side, showing the full window line", hill: "Front of the Ananta Traveller parked on a hillside in Koraput", garland: "Front of the Traveller with a marigold garland on delivery day", rear: "Rear doors of the Traveller with the emergency exit and contact numbers", cabin: "Inside the Traveller: pushback seats in a 2+1 layout, curtains, overhead rack and AC vents" },
      galleryNote: "These are real, unedited photographs of our own Force Traveller (OD02 DT 9296), taken by us on delivery day, {date}. No stock or AI-generated vehicle images are used anywhere on this site.",
      facts: [["Force Traveller", "Purchased new, {date}"], ["17 passenger seats", "Your whole group in one vehicle"], ["Air conditioned", "Comfort on long ghat sections"], ["All-India permit", "Serviced on schedule, checked before every trip"], ["Experienced local driver", "Knows the roads, the timings and the stops"], ["Tour support available", "Support staff and guided-tour assistance"]],
      note: "Every photograph here is our own vehicle, never a stock Traveller. Pushback seats with armrests, curtains on every window and an overhead rack for small bags.",
      more: "More about the Traveller", seatsAria: "Interactive seat layout", seatsTap: "seats · tap one", seatInfo: "Tap a seat. Pushback seats in 2+1 rows with a back bench, as in the cabin photo.", legend: ["Passenger seat", "Selected", "Driver"]
    },
    price: {
      h2: "What a Koraput trip costs",
      lede: "One written price for the whole vehicle, never per seat, and never before you have seen the route. This is what moves the figure.",
      drivers: [
        ["Where we pick you up", "Koraput, Semiliguda and Jeypore are local. Rayagada, Araku, Visakhapatnam or Bhubaneswar mean the Traveller comes to you first."],
        ["How far the route runs", "An evening at Kolab and a full day at Duduma are not the same drive."],
        ["How many days", "Multi-day trips are quoted as a block, which usually works out lower per day."],
        ["Night halts and early starts", "If the vehicle stays out overnight, the driver's stay is in the quote and named there."]
      ],
      includedLabel: "In every quote",
      included: ["The 17-seater AC Traveller", "Driver, fuel, tolls and parking", "Planning before, support during"],
      excludedLabel: "Not included",
      excluded: ["Meals and entry tickets", "Hotels for your group", "Places added on the day, priced first"],
      cardTitle: "Get an exact price in five lines",
      cardLines: ["Travel dates", "Number of travellers", "Pickup point", "Days in Koraput", "Places you want to include"],
      cta: "Get trip cost on WhatsApp",
      more: "How the fare is worked out",
      note: "No payment is requested until the itinerary, price and availability are confirmed in writing.",
      ratesHeading: "Starting fares",
      ratesNote: "For the whole 17-seater, not per person. Last updated {date}.",
      ratesTrip: "Trip", ratesLength: "Length", ratesFrom: "From"
    },
    team: { photoAlt: "Sunrise through forest silhouettes in Koraput", caption: "Sunrise through the forest on the Koraput highlands.", h2: "You're not travelling alone.", quote: "Friendly local team. No confusion in an unfamiliar place.", p: "From pickup to sightseeing and return, our team stays available to help with routes, stops, local information and unexpected changes during your journey.", roles: [["Local driver", "Knows the ghat roads, the sunrise timings and where to stop for a good meal."], ["Support staff", "On WhatsApp through your trip for timings, changes and questions."], ["Guided-tour assistance", "Someone to explain what you are seeing, whenever you want it."]] },
    booking: { h2: "Plan first. Pay after confirmation.", lede: "The order never changes, so you always know what you are paying for.", steps: [["Share your trip", "Dates, group size and where you will arrive from. WhatsApp is easiest."], ["Confirm itinerary and price", "We send the route, timings and the Traveller price. You know what is included before you decide."], ["Pay a booking advance", "The official UPI QR and a booking reference come privately on WhatsApp, with confirmation of the amount."]], note: "No payment is requested before your itinerary, price and availability are confirmed." },
    map: { h2: "Every stop, pinned", lede: "Where the places are, and how they sit around Koraput town. Open any pin in Google Maps for live directions.", loading: "Loading Google Maps…", iframeTitle: "Google Map of Koraput tourist attractions", town: "Koraput town", townSub: "Start and end of every trip", open: "Open", note: "The line on the map is Google's road estimate for one long loop. Real trips split these stops over two to four days." },
    origins: { h2: "Start from where you are", lede: "Three city guides that answer the real planning questions: how to reach Koraput, how many days to keep, and where the Traveller fits in.", bbs: { label: "From Bhubaneswar", h3: "Travel overnight. Wake up in the hills.", p: "Train, road and flight options, a 2 to 3 day plan and pickup timed to your arrival.", link: "Koraput tour from Bhubaneswar", alt: "A passenger train winding through misty Eastern Ghats near Laxmipur Road" }, kol: { label: "From Kolkata", h3: "Make Koraput the destination, not a logistics puzzle.", p: "How to reach, how long to keep, and a plan that starts the moment you step off the train.", link: "Koraput tour from Kolkata", alt: "Railway bridge on the Kirandul line crossing the Eastern Ghats" }, vzg: { label: "From Visakhapatnam", h3: "Most groups stop at Araku. Keep going.", p: "Road via Araku or Salur, the Kirandul line, the daily Jeypore flight, and a 3-day plan that ends facing home.", link: "Koraput tour from Visakhapatnam", alt: "The Kothavalasa–Kirandul railway climbing through the Eastern Ghats between Koraput and Visakhapatnam" } },
    stations: { h2: "Station, airport and bus-stand pickup", lede: "Tell us your train, flight or bus and we meet it. Drive times are from our base in Semiliguda; Koraput town is about 20 minutes further west.", fromBase: "{drive} from Semiliguda", aboutKm: "About {km} km", openMaps: "Open in Maps", haltsSummary: "Smaller halts we also serve (passenger trains)", haltsP: "Stops on the Koraput–Rayagada line and both directions of the Kirandul line. Only passenger and DMU trains stop here and timings change, so send us your train number and we confirm.", note: "Shimiliguda station (SMLG) on the Araku line in Andhra Pradesh is a different place from our Semiliguda. For Koraput, book to Koraput Junction (KRPU).",
      flightsH3: "Flights: {airport}", flightsP: "{driveKoraput} from Koraput town, {driveBase} from our base. Pickup at the terminal.", route: "Route", times: "Times", runs: "Runs", openAirport: "Open airport in Maps",
      busH3: "Buses to Koraput", busP: "Overnight and day services reach Koraput bus stand, 20 minutes from our base. We meet the bus you name.", busNote: "Timings from operator listings, {checked}. They change with season and festivals; send us your ticket and we confirm the pickup time." },
    faq: { h2: "Before you write to us", lede: "Short answers to the questions most groups ask first.", items: [
      ["How many people can travel together?", "Up to 17 passengers in one Traveller. Tell us your luggage needs and we confirm the seating plan before booking."],
      ["Do you plan the whole itinerary?", "Yes. Share dates, arrival point, group size and interests. We suggest a route matched to your days, with sensible timings for sunrise stops and long drives."],
      ["Do you pick up from the railway station or airport?", "Yes. We meet trains at Koraput Junction, Damanjodi, Jeypore, Araku, Rayagada and, on request, Vizianagaram and Visakhapatnam, plus the smaller halts listed above. Send your train number and we time the vehicle to it. Jeypore Airport pickups for IndiaOne Air flights."],
      ["When do I pay?", "Only after the itinerary, price and availability are confirmed. The UPI QR and booking reference are shared privately on WhatsApp."],
      ["Which months are best?", "October to February is cool and clear. September to December has the fullest waterfalls. Monsoon months are green but some roads slow down."]
    ] },
    cta: { heading: "Tell us your dates. We'll shape the road ahead.", text: "Usually easiest: dates, number of travellers and where you arrive from. We reply with a route, timings and the Traveller price." },
    lightbox: { aria: "Photo gallery", close: "Close gallery", prev: "Previous photo", next: "Next photo", photoN: "Photo {n}" }
  },
  // Destination names and one-liners (shared by the road, cards, planner chips and map list).
  destinations: {
    deomali: { name: "Deomali", kind: "Mountain", blurb: "Odisha's highest peak at 1,672 m. Open grassland on top, valleys on every side, and a road that climbs almost to the summit.", drive: "About 2 h" },
    "rani-duduma": { name: "Rani Duduma", kind: "Waterfall", blurb: "A quieter waterfall near Nandapur, reached by a country road through paddy fields and forest.", drive: "About 1.5 h" },
    duduma: { name: "Duduma Waterfall", kind: "Waterfall", blurb: "The Machkund river drops about 175 m into a forested gorge on the Odisha–Andhra border.", drive: "About 3 h" },
    gupteswar: { name: "Gupteswar Cave Temple", kind: "Cave and pilgrimage", blurb: "A limestone cave shrine above the Sabari river. About 200 steps climb through forest to the Shiva lingam.", drive: "About 2.5 h" },
    kolab: { name: "Upper Kolab Reservoir", kind: "Reservoir and garden", blurb: "A dam, a terraced garden and a wide reservoir at about 3,000 ft. The easy evening stop on the way back.", drive: "About 35 min" },
    "sabara-srikhetra": { name: "Sabara Srikhetra", kind: "Temple", blurb: "Koraput's Jagannath temple, open to everyone and rooted in the region's tribal traditions.", drive: "In town" },
    "tribal-museum": { name: "Tribal Museum", kind: "Museum", blurb: "Homes, textiles, tools and wall art of Koraput's Adivasi communities. Worth an hour before you drive through their landscape.", drive: "In town" },
    maliguda: { name: "Maliguda", kind: "Railway and valley", blurb: "The Kirandul railway crosses the Eastern Ghats here on bridges and tunnels. The Maliguda tunnel alone runs about 4 km.", drive: "About 50 min" },
    nandapur: { name: "Nandapur", kind: "Heritage", blurb: "The old capital before Jeypore, with the 32-step Batrisa Singhasana throne and small stone shrines.", drive: "About 1.25 h" },
    onukadelli: { name: "Onukadelli", kind: "Weekly market", blurb: "A Thursday market near Duduma where Bonda and other communities trade. We visit quietly and photograph only with consent.", drive: "About 3 h" },
    talamali: { name: "Talamali", kind: "Offbeat hilltop", blurb: "A flat-topped hill above Pendajam, grass instead of forest, usually paired with the village of Putsil. We check the last stretch of road the week you travel.", drive: "About 1.5 h", photoAlt: "Mist lying in the valleys below the Semiliguda–Pottangi highlands, the country Talamali stands in" },
    kalyamali: { name: "Kalyamali", kind: "Offbeat hilltop", blurb: "Spelled Kaliamali as often as not. An open, grass-topped hill with long views towards Pottangi, and an honest walk at the end of the drive.", drive: "About 1.75 h", photoAlt: "Fields and low hills on the Koraput plateau, the country the Kalyamali climb starts from" }
  },
  // Station names by code: the seven main stations, then the thirteen small halts.
  stationNames: {
    KRPU: "Koraput Junction", DMNJ: "Damanjodi", JYP: "Jeypore", ARK: "Araku", RGDA: "Rayagada", VZM: "Vizianagaram Junction", VSKP: "Visakhapatnam",
    DMRT: "Dumuriput", BGUA: "Baiguda", KKGM: "Kakiriguma", LKMR: "Laxmipur Road", SUKU: "Suku", PBV: "Paliba", MKRD: "Machkunda Road", BHJA: "Bheja", PFU: "Padua", MVF: "Manabar", JRT: "Jarati", MVG: "Maliguda", CTS: "Chatariput"
  },
  stations: {
    KRPU: "Express trains from Bhubaneswar (Hirakhand), Howrah (Samaleswari), Visakhapatnam and Jagdalpur. Our usual pickup point.",
    DMNJ: "NALCO township station on the Rayagada side, closest to our base. Several expresses from the Rayagada direction stop here; check your train.",
    JYP: "The same Bhubaneswar and Howrah expresses continue here towards Jagdalpur. Jeypore Airport is 10 minutes away. Handy for Gupteswar and Kolab plans.",
    ARK: "Visakhapatnam–Kirandul passenger and the Vistadome tourist train. Good for groups coming via Vizag who want the scenic line.",
    RGDA: "Big junction on the Vizianagaram–Raipur line with many more trains from Bhubaneswar, Howrah and Visakhapatnam. Worth it if Koraput trains are full.",
    VZM: "On the Howrah–Chennai main line. A long transfer; usually only when a group is already travelling that way.",
    VSKP: "Main line trains from everywhere plus the airport. We collect groups here for the full trip on request, via Araku or Salur."
  },
  transport: {
    airportName: "Jeypore Airport",
    flightNote: "IndiaOne Air flies a 9-seat Cessna Grand Caravan, so seats and baggage are limited: book early and travel with cabin-size bags. We meet every flight at Jeypore Airport.",
    flights: [{ route: "Bhubaneswar → Jeypore", days: "about 9 flights a week" }, { route: "Jeypore → Bhubaneswar", days: "daily, some days twice" }, { route: "Visakhapatnam → Jeypore", days: "daily" }, { route: "Jeypore → Visakhapatnam", days: "daily" }],
    buses: [
      { from: "Bhubaneswar", text: "OSRTC (7 a day) and private sleeper and Volvo operators. OSRTC departures 14:00 to 20:00; most private buses leave 18:00 to 21:30. 11 to 12 h overnight. From about ₹666 (OSRTC)." },
      { from: "Visakhapatnam", text: "OSRTC (7 a day) and APSRTC. OSRTC through the day and night (00:30 to 23:15); APSRTC from about 04:30. 5 to 6 h via Araku or Salur. ₹235 to ₹800." },
      { from: "Rayagada and Berhampur", text: "OSRTC and private day buses, frequent through the day. 3 h from Rayagada, 7 to 8 h from Berhampur." },
      { from: "Kolkata", text: "No practical direct bus. Take the train, or fly to Bhubaneswar or Visakhapatnam and connect." }
    ]
  },
  // Page translations live in pages.js / pages-extra.js for English; other languages override selected pages here.
  pages: {}
};
