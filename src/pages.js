// Planning guides. Short, factual, human. Distances and times are approximate
// road figures from Koraput town; verify timetables before travel.
module.exports = [
  {
    slug: "koraput-tour",
    title: "Koraput tour: how to plan it",
    short: "Koraput tour",
    metaTitle: "Koraput Tour: How to Plan a Group Trip (2–4 Days)",
    description: "What Koraput is like, how many days to keep, how to reach it and how a 17-seater Traveller trip works. A plain planning guide from a local team.",
    kind: "Planning guide", icon: "route",
    hero: "deomali-top", heroAlt: "Rolling green hills and cloud shadows near Deomali, Koraput",
    ctaPhoto: "koraput-fields",
    lede: "Koraput is a highland district in southern Odisha: hills around 900 m, big waterfalls, a wide reservoir and old temples, spread across two to three hours of driving in each direction. Here is how a group trip fits together.",
    facts: [
      { icon: "calendar", label: "Best months", value: "October to February" },
      { icon: "clock", label: "Days to keep", value: "2 to 4" },
      { icon: "mountain", label: "Koraput town altitude", value: "about 870 m" },
      { icon: "train", label: "Railway station", value: "Koraput (KRPU)" }
    ],
    blocks: [
      { type: "h2", text: "What Koraput is like" },
      { type: "p", html: "Cool air, red soil, terraced valleys and long views. The town itself is small and useful: a railway station, hotels, the Jagannath temple known as Sabara Srikhetra and the Tribal Museum. Everything else is a drive away, which is why one comfortable vehicle for the whole group matters more here than in most places." },
      { type: "figure", photo: "koraput-valley", alt: "Green paddy valley in the monsoon near Sunabeda", caption: "Monsoon valley near Sunabeda, on the road between Koraput and Deomali." },
      { type: "h2", text: "How many days" },
      { type: "ul", items: [
        "<strong>1 day:</strong> the town temple and museum in the morning, Deomali in the afternoon, Kolab at sunset. Long but doable.",
        "<strong>2 days:</strong> adds Nandapur and Rani Duduma. See the <a href=\"../koraput-2-day-itinerary/\">2-day plan</a>.",
        "<strong>3 days:</strong> adds Duduma Waterfall and the Machkund valley. See the <a href=\"../koraput-3-day-itinerary/\">3-day plan</a>.",
        "<strong>4 days:</strong> adds Gupteswar cave temple and a section of the Kirandul railway at Maliguda."
      ] },
      { type: "h2", text: "Getting here" },
      { type: "p", html: "Most groups arrive by overnight train. From Bhubaneswar the Hirakhand Express reaches Koraput in the morning. From Kolkata, direct trains towards Jagdalpur stop at Koraput, or you fly to Visakhapatnam and continue by road or the scenic Araku line. Both city guides go into detail: <a href=\"../koraput-tour-package-from-bhubaneswar/\">from Bhubaneswar</a> and <a href=\"../koraput-tour-package-from-kolkata/\">from Kolkata</a>." },
      { type: "h2", text: "How the Traveller trip works" },
      { type: "p", html: "You send us dates, group size and where you arrive. We reply on WhatsApp with a route matched to your days, sensible timings for sunrise stops and long drives, and the Traveller price. Once you confirm, we share the UPI QR and a booking reference privately. On the day, the driver meets you at the station or hotel and the support team stays reachable throughout." },
      { type: "callout", icon: "shield", html: "Your quote lists exactly what is included. Typically that is the Traveller, driver, fuel, tolls and parking for the agreed route. Meals, entry tickets and hotels are paid by you directly." },
      { type: "h2", text: "Good to know" },
      { type: "ul", items: [
        "Ghat roads are winding. Groups with motion-sick travellers should keep them in the front rows.",
        "Sunrise at Deomali means leaving Koraput around 4:30 am. Sunset is the easier option.",
        "Onukadelli market runs on Thursdays only. If it matters to you, plan the week around it.",
        "Mobile coverage drops in the valleys. Download offline maps and tell people at home."
      ] }
    ],
    related: ["koraput-3-day-itinerary", "koraput-2-day-itinerary", "koraput-sightseeing", "17-seater-traveller-koraput"],
    message: "Hi Ananta Tours, we are planning a Koraput trip. Please help us with an itinerary and the 17-seater Traveller price."
  },
  {
    slug: "koraput-tour-package-from-bhubaneswar",
    title: "Koraput tour from Bhubaneswar",
    short: "From Bhubaneswar",
    metaTitle: "Koraput Tour Package from Bhubaneswar: Trains, Days, Plan",
    description: "How to reach Koraput from Bhubaneswar by train, road or air, how many days to keep, a 3-day plan and pickup timed to your arrival.",
    kind: "City guide", icon: "train",
    hero: "rail-train", heroAlt: "Passenger train winding through mist at Laxmipur Road on the Koraput line",
    ctaPhoto: "koraput-station",
    lede: "Travel overnight and wake up in the hills. Bhubaneswar to Koraput is a night on the train or a long day on the road, and the Traveller meets you the moment you arrive.",
    facts: [
      { icon: "train", label: "Overnight train", value: "about 13 hours" },
      { icon: "road", label: "By road", value: "about 500 km, 10–12 h" },
      { icon: "calendar", label: "Days to keep", value: "2 to 3, plus travel" },
      { icon: "pin", label: "Pickup", value: "Koraput station or hotel" }
    ],
    blocks: [
      { type: "h2", text: "Getting to Koraput" },
      { type: "ul", items: [
        "<strong>Train:</strong> the Hirakhand Express runs overnight from Bhubaneswar to Koraput and back. Book sleeper or 3AC early for long weekends. Check the current timetable before booking.",
        "<strong>Road:</strong> around 500 km via Berhampur and Rayagada. Ten to twelve hours with stops. Fine for a group leaving early; tiring as a same-day return.",
        "<strong>Air:</strong> fly to Visakhapatnam and continue by road (five to six hours via Araku) or by the Araku line train. Small regional flights to Jeypore run when scheduled; check before you rely on them."
      ] },
      { type: "h2", text: "A 3-day plan that fits the train" },
      { type: "days", items: [
        { title: "Arrive, settle, an easy first day", text: "The driver meets your morning train. Breakfast, Sabara Srikhetra, the Tribal Museum, then Upper Kolab for the late afternoon light.", stops: ["sabara-srikhetra", "tribal-museum", "kolab"] },
        { title: "The highland circuit", text: "Deomali early, with time on top. Back through Nandapur's old capital to Rani Duduma before the light goes.", stops: ["deomali", "nandapur", "rani-duduma"] },
        { title: "Duduma, then the evening train", text: "A long drive south-west to Duduma Waterfall and the Machkund valley, lunch on the way, and back to Koraput for the evening departure.", stops: ["duduma", "onukadelli"] }
      ] },
      { type: "callout", icon: "clock", html: "Keep a buffer before your return train. Ghat roads and a good waterfall both take longer than the map suggests." },
      { type: "h2", text: "What the Traveller changes" },
      { type: "p", html: "Groups from Bhubaneswar usually arrive together and want to stay together. One 17-seater means one pickup, one route, one set of timings and nobody waiting for the second car. The driver knows the roads; the support team is on WhatsApp for changes." },
      { type: "h2", text: "What to carry" },
      { type: "ul", items: ["A jacket, even in October. Deomali is windy and cold at dawn.", "Cash for small markets and entry tickets.", "Water and snacks for the Duduma day; food stops are far apart.", "Offline maps. Coverage drops in the valleys."] }
    ],
    related: ["koraput-3-day-itinerary", "koraput-tour", "deomali-tour", "koraput-tour-package-from-kolkata"],
    message: "Hi Ananta Tours, we are planning a Koraput trip from Bhubaneswar. Please help us with the itinerary, station pickup and the 17-seater Traveller price."
  },
  {
    slug: "koraput-tour-package-from-kolkata",
    title: "Koraput tour from Kolkata",
    short: "From Kolkata",
    metaTitle: "Koraput Tour Package from Kolkata: How to Reach, Days, Plan",
    description: "How groups from Kolkata reach Koraput by train or via Visakhapatnam, how many days make it worthwhile, and a 4-day plan with the Traveller.",
    kind: "City guide", icon: "train",
    hero: "rail-bridge", heroAlt: "Steel railway bridge on the Kirandul line crossing a valley in the Eastern Ghats",
    ctaPhoto: "koraput-mist",
    lede: "Make Koraput the destination, not a logistics puzzle. From Kolkata the journey is the long part, so plan four days and let the local team handle everything after you step off the train.",
    facts: [
      { icon: "train", label: "Direct train", value: "about a day" },
      { icon: "wind", label: "Via Visakhapatnam", value: "flight + 5–6 h" },
      { icon: "calendar", label: "Days to keep", value: "3 to 4, plus travel" },
      { icon: "pin", label: "Pickup", value: "Koraput station or Vizag" }
    ],
    blocks: [
      { type: "h2", text: "Getting to Koraput from Kolkata" },
      { type: "ul", items: [
        "<strong>Direct train:</strong> trains from Howrah and Shalimar towards Jagdalpur stop at Koraput. It is a full day and night on board, comfortable in AC classes, and the last stretch through the Eastern Ghats is beautiful in daylight.",
        "<strong>Fly to Visakhapatnam:</strong> about 90 minutes in the air, then five to six hours by road through Araku, or the slow scenic train on the Kirandul line. We can send the Traveller to Visakhapatnam for the whole trip if that suits your group.",
        "<strong>Fly to Bhubaneswar:</strong> then the overnight Hirakhand Express to Koraput. Good when flight times to Vizag do not work."
      ] },
      { type: "h2", text: "A 4-day plan" },
      { type: "days", items: [
        { title: "Arrive and breathe", text: "Pickup, hotel check-in, the town temple and museum, and Kolab at sunset. Nothing early on the first day.", stops: ["sabara-srikhetra", "tribal-museum", "kolab"] },
        { title: "Deomali and the old capital", text: "Sunrise or a slow morning on Deomali, then Nandapur and Rani Duduma on the way back.", stops: ["deomali", "nandapur", "rani-duduma"] },
        { title: "Duduma and Machkund", text: "The long south-west day: Duduma Waterfall, the Machkund valley and, on Thursdays, Onukadelli market.", stops: ["duduma", "onukadelli"] },
        { title: "Gupteswar and the railway", text: "West to the Gupteswar cave temple on the Sabari river, back via Jeypore, and the Maliguda section of the Kirandul line before your departure.", stops: ["gupteswar", "maliguda"] }
      ] },
      { type: "h2", text: "Why groups from Kolkata book the whole vehicle" },
      { type: "p", html: "You do not know the local operators, and the places are far apart. One Traveller with a known driver, fixed timings and a support number removes the guesswork. We also time your first pickup to the actual train, not the scheduled one." },
      { type: "callout", icon: "info", html: "Puja and winter holidays fill trains months ahead. Book the train first, then send us the dates; the Traveller is easier to hold." },
      { type: "h2", text: "What to carry" },
      { type: "ul", items: ["Warm layers from November to February; mornings are near 10 °C on the hills.", "Comfortable shoes for the Gupteswar steps and waterfall paths.", "Cash for markets, tickets and small eateries.", "A power bank for the long train day."] }
    ],
    related: ["koraput-tour", "koraput-3-day-itinerary", "duduma-waterfall-tour", "koraput-tour-package-from-bhubaneswar"],
    message: "Hi Ananta Tours, we are planning a Koraput trip from Kolkata. Please help us with the itinerary, arrival pickup and the 17-seater Traveller price."
  },
  {
    slug: "17-seater-traveller-koraput",
    title: "The 17-seater Traveller for Koraput",
    short: "The Traveller",
    metaTitle: "17-Seater AC Traveller in Koraput: Group Vehicle with Driver",
    description: "A brand-new 17-seater AC Traveller with a local driver and support team for Koraput group tours. Seating, luggage, hill-road notes and how the quote works.",
    kind: "The vehicle", icon: "van",
    hero: "traveller-side", heroAlt: "The white Ananta Force Traveller from the side, freshly delivered",
    ctaPhoto: "traveller-front-garland",
    lede: "One vehicle for the whole group: a Force Traveller bought new in September 2026 and driven by someone who knows these roads. This page shows the real vehicle and says what is confirmed, what is still to come, and how to think about seats and luggage.",
    facts: [
      { icon: "seat", label: "Passenger seats", value: "17" },
      { icon: "snowflake", label: "Cabin", value: "Air conditioned" },
      { icon: "van", label: "Make", value: "Force Traveller, new Sept 2026" },
      { icon: "users", label: "Crew", value: "Driver + support" }
    ],
    blocks: [
      { type: "h2", text: "Why one Traveller instead of three cars" },
      { type: "p", html: "For a group of 10 to 17, a single vehicle keeps the route, the stops and the timing simple. No repeated phone calls, no split luggage, no waiting for the last car at every viewpoint. Everyone hears the same explanation at the same place, which is most of the fun of a group trip." },
      { type: "h2", text: "What is confirmed" },
      { type: "ul", items: ["A Force Traveller with an all-India permit, registration OD02 DT 9296.", "Seventeen pushback passenger seats with armrests, two on the left and one on the right of the aisle.", "Air conditioning throughout the cabin, with vents along the ceiling.", "Curtains on every window and an overhead rack for small bags.", "Bought new in September 2026, serviced on schedule.", "An experienced local driver and a support contact on WhatsApp for the whole trip."] },
      { type: "figure", photo: "traveller-cabin", alt: "Inside the Traveller: rows of pushback seats, curtains, overhead rack and ceiling AC vents", caption: "Inside: 2+1 pushback seats, curtains and the overhead rack." },
      { type: "figure", photo: "traveller-front-hill", alt: "Front of the Traveller parked on a red-soil hillside in Koraput", caption: "On a Koraput hillside in its first week." },
      { type: "h2", text: "What is still to come" },
      { type: "p", html: "The exact variant and the manufacturer's specification sheet, plus a photograph of the rear luggage space. Every picture on this page is our own vehicle; we will not use stock or generated images of a Traveller. Ask us on WhatsApp and we will tell you exactly what has been confirmed on the day you write." },
      { type: "figure", photo: "traveller-rear", alt: "Rear doors of the Traveller with the emergency exit and contact numbers", caption: "Rear doors, emergency exit and our numbers." },
      { type: "h2", text: "Seats and luggage" },
      { type: "ul", items: [
        "Seats are 2+1 across: pairs on the left, singles on the right, with a back bench. Every seat reclines and has an armrest. Tap the seat map on the <a href=\"../#traveller\">homepage</a> to see the numbering.",
        "With 17 people and one small bag each, everything fits. With large suitcases, 12 to 14 travellers is more comfortable. Tell us your luggage and we advise honestly.",
        "Travellers who get car-sick should take the front rows and a window."
      ] },
      { type: "h2", text: "Hill-road notes" },
      { type: "p", html: "Koraput's roads climb and wind. The Deomali road is tarred to the top with a steep final stretch; the Duduma road has long open sections and a few slow village bends. We plan the day so that long ghat drives happen in daylight, with stops every 60 to 90 minutes." },
      { type: "h2", text: "How the quote works" },
      { type: "p", html: "We quote per trip for the agreed route and days, not per kilometre, so there are no surprises at the end. The quote lists what is included. You pay a booking advance only after the itinerary, price and availability are confirmed, using the UPI QR we share privately." }
    ],
    related: ["koraput-tour", "koraput-3-day-itinerary", "koraput-tour-package-from-bhubaneswar", "koraput-tour-package-from-kolkata"],
    message: "Hi Ananta Tours, I would like to know the 17-seater Traveller availability and price for a Koraput trip. Our dates and group size: "
  },
  {
    slug: "koraput-sightseeing",
    title: "Koraput sightseeing, place by place",
    short: "Koraput sightseeing",
    metaTitle: "Places to Visit in Koraput: 10 Tourist Places, Distances, Best Times",
    description: "Ten places worth the drive around Koraput: Deomali, Duduma, Rani Duduma, Gupteswar, Upper Kolab, Sabara Srikhetra, the Tribal Museum, Maliguda, Nandapur and Onukadelli, with distances and timing.",
    kind: "Places", icon: "map",
    hero: "koraput-fields", heroAlt: "Green fields and low hills on the road between Koraput and Jeypore",
    ctaPhoto: "duduma-falls",
    lede: "Ten places, three directions and one honest line about each: how far it is from Koraput town, when it is at its best and what to expect when you get there.",
    facts: [
      { icon: "pin", label: "Places", value: "10" },
      { icon: "road", label: "Furthest", value: "Duduma, about 90 km" },
      { icon: "clock", label: "Closest", value: "Temple and museum, in town" },
      { icon: "calendar", label: "Waterfalls at their best", value: "September to December" }
    ],
    blocks: [
      { type: "h2", text: "Deomali", id: "deomali" },
      { type: "p", html: "Odisha's highest peak at 1,672 m, about 70 km and two hours from town via Semiliguda. A tar road climbs almost to the summit; on top it is open grassland with valleys on every side. Cold and windy at dawn. <a href=\"../deomali-tour/\">Full Deomali guide.</a>" },
      { type: "figure", photo: "deomali-hills", alt: "Grassy ridge of Deomali with a road running along it under a cloudy sky", caption: "The ridge road on Deomali." },
      { type: "h2", text: "Duduma Waterfall", id: "duduma" },
      { type: "p", html: "The Machkund river drops about 175 m into a forested gorge on the Odisha–Andhra border, roughly 90 km and three hours south-west. Best from September to January. A full day. <a href=\"../duduma-waterfall-tour/\">Full Duduma guide.</a>" },
      { type: "h2", text: "Rani Duduma", id: "rani-duduma" },
      { type: "p", html: "A smaller, quieter waterfall in the Nandapur area, about 50 km and an hour and a half from town, reached by a country road through paddy and forest. Full after the rains, a trickle by late winter. Pairs naturally with Nandapur." },
      { type: "figure", photo: "raniduduma-falls", alt: "Rani Duduma waterfall pouring over dark rock", caption: "Rani Duduma after the monsoon." },
      { type: "h2", text: "Gupteswar Cave Temple", id: "gupteswar" },
      { type: "p", html: "A limestone cave shrine above the Sabari river, about 80 km west, reached by roughly 200 steps through forest. Crowded in Shravan, peaceful the rest of the year. <a href=\"../gupteswar-tour/\">Full Gupteswar guide.</a>" },
      { type: "h2", text: "Upper Kolab Reservoir", id: "kolab" },
      { type: "p", html: "A gravity dam, a terraced garden and a wide reservoir at about 3,000 ft, 20 km from town on the Jeypore road. The easy evening stop. <a href=\"../kolab-dam-tour/\">Full Kolab guide.</a>" },
      { type: "h2", text: "Sabara Srikhetra", id: "sabara-srikhetra" },
      { type: "p", html: "Koraput's Jagannath temple, in town. It is built around the idea that Jagannath belongs to everyone, with roots in the region's tribal traditions, and the shrine is open to all visitors. A calm half hour in the morning." },
      { type: "figure", photo: "sabara-front", alt: "White temple front of Sabara Srikhetra with a decorated chariot", caption: "Sabara Srikhetra, Koraput town." },
      { type: "h2", text: "Tribal Museum", id: "tribal-museum" },
      { type: "p", html: "On the highway at the edge of town: reconstructed homes, textiles, tools, musical instruments and wall art of Koraput's Adivasi communities. An hour here makes the rest of the drive make sense. Check opening days locally." },
      { type: "h2", text: "Maliguda", id: "maliguda" },
      { type: "p", html: "About 27 km from town, where the Kirandul railway line crosses the Eastern Ghats on bridges and through the 4 km Maliguda tunnel. You can watch trains from the road, or ask us about riding one section by train while the Traveller meets you at the other end." },
      { type: "figure", photo: "rail-valley", alt: "View over a green valley from the Kirandul railway line", caption: "The Eastern Ghats from the Kirandul line." },
      { type: "h2", text: "Nandapur", id: "nandapur" },
      { type: "p", html: "The old capital before Jeypore, about 45 km south. Small stone shrines and the Batrisa Singhasana, the 32-step throne of the old kings. Twenty minutes of history on the road to Rani Duduma." },
      { type: "h2", text: "Onukadelli", id: "onukadelli" },
      { type: "p", html: "A weekly market near Duduma, on Thursdays, where Bonda and other communities come to trade. It is a working market, not a show. We visit quietly, buy something, and photograph people only when they agree." },
      { type: "h2", text: "Offbeat: Talamali, Kaliamali, Dudhari", id: "offbeat" },
      { type: "p", html: "Three places local groups ask about that we do not put on a first-visit plan without checking the road that week. <strong>Talamali</strong> and <strong>Kaliamali</strong> are open highland tops in the Semiliguda–Pottangi hills with long views and rough final approaches. <strong>Dudhari</strong> is a smaller waterfall whose access changes with the season. If you want one of them, ask us on WhatsApp and we will tell you honestly whether the Traveller can get there that week." }
    ],
    related: ["deomali-tour", "duduma-waterfall-tour", "gupteswar-tour", "kolab-dam-tour"],
    message: "Hi Ananta Tours, we are planning Koraput sightseeing. Please suggest a route and share the 17-seater Traveller price."
  },
  {
    slug: "koraput-3-day-itinerary",
    title: "Koraput in 3 days",
    short: "3-day itinerary",
    metaTitle: "Koraput 3-Day Itinerary: Deomali, Rani Duduma, Duduma Waterfall, Kolab",
    description: "A balanced three-day Koraput itinerary for groups: town and Kolab on day one, Deomali and Rani Duduma on day two, Duduma Waterfall on day three.",
    kind: "Itinerary", icon: "calendar",
    hero: "deomali-peak", heroAlt: "Green slopes of Deomali under a hazy sky",
    ctaPhoto: "raniduduma-road",
    lede: "Three days is the sweet spot: the big mountain, two waterfalls, the reservoir and the town, without a single rushed day.",
    facts: [
      { icon: "calendar", label: "Days", value: "3" },
      { icon: "road", label: "Total driving", value: "about 400 km" },
      { icon: "clock", label: "Longest day", value: "Day 3, about 6 h on the road" },
      { icon: "sunrise", label: "Early start", value: "Day 2 only" }
    ],
    blocks: [
      { type: "days", items: [
        { title: "Koraput town and Upper Kolab", text: "Pickup at the station or hotel. Sabara Srikhetra and the Tribal Museum before lunch, a slow afternoon, then Upper Kolab for the last light on the water. Back in town by dark.", stops: ["sabara-srikhetra", "tribal-museum", "kolab"] },
        { title: "Deomali, Nandapur, Rani Duduma", text: "Leave at 4:30 am for sunrise on Deomali, or at 7 am for a quieter morning on top. Breakfast in Semiliguda on the way back. Nandapur's old capital after lunch, then Rani Duduma's waterfall and country road before the light goes.", stops: ["deomali", "nandapur", "rani-duduma"] },
        { title: "Duduma Waterfall and Machkund", text: "The long day. South-west through the hills to the Duduma gorge and its viewpoints, the Machkund valley, and on Thursdays the Onukadelli market. Packed lunch or a simple meal on the way. Back by evening for a train or a last night in town.", stops: ["duduma", "onukadelli"] }
      ] },
      { type: "figure", photo: "duduma-gorge", alt: "Duduma waterfall dropping into a deep forested gorge", caption: "Duduma gorge, the day-three destination." },
      { type: "h2", text: "Why this order" },
      { type: "p", html: "Day one is deliberately light for people who arrived overnight. Day two is the early one, and everything after Deomali is on the same road home. Day three is the long drive, placed last so the group is rested and can leave straight for the station afterwards." },
      { type: "h2", text: "Swaps that work" },
      { type: "ul", items: [
        "Replace Duduma with <a href=\"../gupteswar-tour/\">Gupteswar</a> if the group prefers a cave temple and river to a waterfall.",
        "Move Kolab to day two's evening if day one is a late arrival.",
        "Add Maliguda's railway bridges to day one if trains excite the group."
      ] },
      { type: "callout", icon: "clock", html: "Times assume October to February daylight. In the monsoon, keep waterfall days shorter and expect slow patches on village roads." }
    ],
    related: ["koraput-2-day-itinerary", "deomali-tour", "duduma-waterfall-tour", "koraput-tour"],
    message: "Hi Ananta Tours, we would like the 3-day Koraput itinerary (Deomali, Rani Duduma, Duduma, Kolab). Please share availability and the 17-seater Traveller price."
  },
  {
    slug: "koraput-2-day-itinerary",
    title: "Koraput in 2 days",
    short: "2-day itinerary",
    metaTitle: "Koraput 2-Day Itinerary (Weekend Trip): Deomali, Kolab, Rani Duduma",
    description: "A two-day Koraput itinerary for a weekend: the town and Upper Kolab on day one, Deomali, Nandapur and Rani Duduma on day two.",
    kind: "Itinerary", icon: "calendar",
    hero: "raniduduma-road", heroAlt: "Country road through green paddy fields near Rani Duduma",
    ctaPhoto: "kolab-dusk",
    lede: "A weekend that still feels unhurried: one easy day around town and the reservoir, one big day on the mountain and the waterfall road.",
    facts: [
      { icon: "calendar", label: "Days", value: "2" },
      { icon: "road", label: "Total driving", value: "about 220 km" },
      { icon: "clock", label: "Longest day", value: "Day 2, about 4.5 h on the road" },
      { icon: "sunrise", label: "Early start", value: "Optional, day 2" }
    ],
    blocks: [
      { type: "days", items: [
        { title: "Town, museum and the reservoir", text: "Morning pickup, Sabara Srikhetra, then the Tribal Museum. Lunch in town. Upper Kolab in the late afternoon: the garden, the viewpoint over the water and sunset from the dam road.", stops: ["sabara-srikhetra", "tribal-museum", "kolab"] },
        { title: "Deomali and the waterfall road", text: "Early departure for Deomali, time on top, breakfast on the way down. Nandapur's stone shrines and the 32-step throne, then the country road to Rani Duduma. Back to Koraput by evening.", stops: ["deomali", "nandapur", "rani-duduma"] }
      ] },
      { type: "figure", photo: "kolab-garden", alt: "Terraced garden below the Upper Kolab dam wall", caption: "The garden below the Upper Kolab dam." },
      { type: "h2", text: "If you have one more evening" },
      { type: "p", html: "Arriving the night before turns this into a proper trip: day one starts early and Kolab moves to the first evening, which frees day two for a longer stay on Deomali. See the <a href=\"../koraput-3-day-itinerary/\">3-day plan</a> if a third day appears." },
      { type: "callout", icon: "info", html: "Rani Duduma is at its best from August to December. In late winter ask us whether the flow still justifies the detour." }
    ],
    related: ["koraput-3-day-itinerary", "deomali-tour", "kolab-dam-tour", "koraput-tour"],
    message: "Hi Ananta Tours, we would like the 2-day Koraput itinerary (Kolab, Deomali, Rani Duduma). Please share availability and the 17-seater Traveller price."
  },
  {
    slug: "deomali-tour",
    title: "Deomali, Odisha's highest peak",
    short: "Deomali",
    metaTitle: "Deomali Tour from Koraput: Sunrise, Road, What to Carry",
    description: "How to visit Deomali from Koraput: the drive via Semiliguda, sunrise versus sunset, what the top is like, what to carry and what to combine it with.",
    kind: "Mountain", icon: "mountain",
    hero: "deomali-range", heroAlt: "Mountain range and grassland on Deomali under a bright sky",
    ctaPhoto: "deomali-peak",
    lede: "At 1,672 m Deomali is the highest point in Odisha, and unusually for a peak you can drive almost to the top. What you get is space: grassland, wind, and valleys folding away on every side.",
    facts: [
      { icon: "mountain", label: "Height", value: "1,672 m" },
      { icon: "road", label: "From Koraput", value: "about 70 km, 2 h" },
      { icon: "calendar", label: "Best months", value: "October to February" },
      { icon: "luggage", label: "Carry", value: "Jacket, water, cash" }
    ],
    blocks: [
      { type: "h2", text: "The drive" },
      { type: "p", html: "From Koraput the road runs through Semiliguda towards Pottangi and then climbs. The final stretch is steep and tarred; the Traveller takes it slowly and the view opens with every bend. Allow two hours, more with a breakfast stop." },
      { type: "figure", photo: "deomali-top", alt: "Rolling grass hills on Deomali with cloud shadows", caption: "Near the top: grassland, wind and long views." },
      { type: "h2", text: "Sunrise or sunset" },
      { type: "p", html: "Sunrise is the famous one and needs a 4:30 am start from Koraput, warm clothes and a group that will not mind the dark drive. Sunset is easier: leave after lunch, spend the golden hour on top, and be back in Koraput by 8 pm. Both are good; the mist is more likely at dawn." },
      { type: "h2", text: "On top" },
      { type: "p", html: "Open grassland with a viewing tower and a few amenities. Walk a little away from the parking to find your own edge. The wind is constant; in winter the temperature on top can be ten degrees below the town." },
      { type: "callout", icon: "wind", html: "There is no reliable food on the summit. Eat in Semiliguda or carry breakfast." },
      { type: "h2", text: "Combine it with" },
      { type: "ul", items: [
        "<strong>Putsil valley</strong>, part of the same range, for a quieter viewpoint on the way back.",
        "<strong>Nandapur and Rani Duduma</strong> on a full day, as in the <a href=\"../koraput-3-day-itinerary/\">3-day plan</a>.",
        "<strong>Upper Kolab</strong> if you did sunrise and want an easy evening."
      ] },
      { type: "figure", photo: "deomali-peak", alt: "Green Deomali peak against a hazy sky", caption: "Deomali from the approach road." }
    ],
    related: ["koraput-3-day-itinerary", "koraput-2-day-itinerary", "kolab-dam-tour", "koraput-sightseeing"],
    message: "Hi Ananta Tours, we would like a Deomali trip as part of a Koraput tour. Please suggest timings (sunrise or sunset) and share the 17-seater Traveller price."
  },
  {
    slug: "duduma-waterfall-tour",
    title: "Duduma Waterfall",
    short: "Duduma Waterfall",
    metaTitle: "Duduma Waterfall Tour from Koraput: Gorge, Machkund, Timing",
    description: "Visiting Duduma Waterfall from Koraput: the 175 m drop of the Machkund river, viewpoints, the hydro-project area, Onukadelli market and a full-day plan.",
    kind: "Waterfall", icon: "waterfall",
    hero: "duduma-gorge", heroAlt: "Duduma waterfall dropping into a deep green gorge",
    ctaPhoto: "machkund-falls",
    lede: "The Machkund river drops about 175 m into a forested gorge on the Odisha–Andhra border. It is the biggest waterfall in the district, the furthest from town, and the reason to keep a whole day.",
    facts: [
      { icon: "waterfall", label: "Height", value: "about 175 m" },
      { icon: "road", label: "From Koraput", value: "about 90 km, 3 h" },
      { icon: "calendar", label: "Best months", value: "September to January" },
      { icon: "clock", label: "Plan", value: "A full day" }
    ],
    blocks: [
      { type: "h2", text: "What you see" },
      { type: "p", html: "The road ends near the top of the gorge. From the viewpoints you look across at the full drop and down into the valley where the river continues. After the monsoon the sound reaches you before the view does; by late winter the flow is thinner but the gorge is just as dramatic." },
      { type: "figure", photo: "duduma-falls", alt: "Duduma waterfall seen across the gorge", caption: "Across the gorge from the viewpoint." },
      { type: "h2", text: "Machkund" },
      { type: "p", html: "The falls sit inside the Machkund hydro-electric project area, shared between Odisha and Andhra Pradesh. Some sections are restricted and photography rules apply near the installations. The driver knows where to stop and where not to." },
      { type: "figure", photo: "machkund-temple", alt: "Stone temple complex in the Machkund valley", caption: "Temple complex at Machkund." },
      { type: "h2", text: "Onukadelli on Thursdays" },
      { type: "p", html: "A short drive from the falls, the weekly market brings Bonda and other communities down from the hills. It is a working market. We visit quietly, buy what we need and photograph people only with their consent." },
      { type: "h2", text: "A full-day plan" },
      { type: "ul", items: ["Leave Koraput by 7 am with breakfast packed.", "Duduma viewpoints by mid-morning, an hour or two there.", "Onukadelli market if it is Thursday; otherwise the Machkund valley and lunch.", "Back in Koraput by evening; the road is slow after dark."] },
      { type: "callout", icon: "luggage", html: "Carry water, snacks and cash. Food stops are few and simple on this road." }
    ],
    related: ["koraput-3-day-itinerary", "gupteswar-tour", "deomali-tour", "koraput-sightseeing"],
    message: "Hi Ananta Tours, we would like a Duduma Waterfall day as part of a Koraput tour. Please share the plan and the 17-seater Traveller price."
  },
  {
    slug: "gupteswar-tour",
    title: "Gupteswar Cave Temple",
    short: "Gupteswar",
    metaTitle: "Gupteswar Cave Temple Tour from Koraput: Steps, River, Timing",
    description: "Visiting the Gupteswar limestone cave shrine from Koraput: the 200-step climb, the Sabari river, Shravan crowds, and how to fit it into a Koraput itinerary.",
    kind: "Cave and pilgrimage", icon: "stairs",
    hero: "gupteswar-river", heroAlt: "Rocky bank of the Sabari river below Gupteswar cave",
    ctaPhoto: "kolab-dusk",
    lede: "A limestone cave shrine to Shiva above the Sabari river, reached by about 200 steps through forest. Pilgrims come in Shravan; the rest of the year it is quiet, green and cool.",
    facts: [
      { icon: "road", label: "From Koraput", value: "about 80 km, 2.5 h" },
      { icon: "stairs", label: "Climb", value: "about 200 steps" },
      { icon: "calendar", label: "Busy season", value: "Shravan (July–August)" },
      { icon: "drop", label: "River", value: "Sabari" }
    ],
    blocks: [
      { type: "h2", text: "The cave" },
      { type: "p", html: "The entrance is low and wide; inside, the main chamber holds a large Shiva lingam that local belief says is still growing. Tradition connects the cave to Rama's exile and to its rediscovery under the Jeypore kings. Take a torch if you like detail; the guides carry lamps." },
      { type: "figure", photo: "gupteswar-lingam", alt: "The Shiva lingam inside Gupteswar cave", caption: "Inside the cave." },
      { type: "h2", text: "The climb and the river" },
      { type: "p", html: "About 200 steps up through forest, with rest points and small shops. Below, the Sabari river bank is a good place for the group to sit before the drive back. Comfortable shoes matter more than fitness." },
      { type: "h2", text: "When to go" },
      { type: "p", html: "In Shravan, devotees walk to the shrine with decorated bamboo palanquins and the site is crowded; go early or choose another month. From October to February it is calm and the forest is at its greenest after the rains." },
      { type: "h2", text: "Fitting it in" },
      { type: "p", html: "Gupteswar is west of Koraput, past Jeypore, so it pairs with Upper Kolab and Jeypore town on the return rather than with Deomali. It is the natural fourth day in the <a href=\"../koraput-tour-package-from-kolkata/\">4-day plan</a>, or a swap for Duduma in the <a href=\"../koraput-3-day-itinerary/\">3-day plan</a>." }
    ],
    related: ["kolab-dam-tour", "koraput-3-day-itinerary", "duduma-waterfall-tour", "koraput-sightseeing"],
    message: "Hi Ananta Tours, we would like to include Gupteswar cave temple in a Koraput tour. Please share the plan and the 17-seater Traveller price."
  },
  {
    slug: "kolab-dam-tour",
    title: "Upper Kolab Reservoir",
    short: "Upper Kolab",
    metaTitle: "Kolab Dam Tour from Koraput: Garden, Viewpoint, Sunset",
    description: "The easy Koraput evening: Upper Kolab dam and reservoir 20 km from town, the terraced garden, the viewpoint and how to time it for the light.",
    kind: "Reservoir and garden", icon: "wind",
    hero: "kolab-garden", heroAlt: "Terraced garden with fountains below the Upper Kolab dam",
    ctaPhoto: "kolab-panorama",
    lede: "Twenty kilometres from town, the Upper Kolab dam holds back a reservoir wide enough to feel like a lake in the hills. It is the stop that asks nothing of you: a garden, a view and the evening light.",
    facts: [
      { icon: "road", label: "From Koraput", value: "about 20 km, 35 min" },
      { icon: "mountain", label: "Altitude", value: "about 914 m" },
      { icon: "clock", label: "Best time", value: "Late afternoon" },
      { icon: "calendar", label: "Season", value: "Year round" }
    ],
    blocks: [
      { type: "h2", text: "What is here" },
      { type: "p", html: "A gravity dam on the Kolab river, built for power, irrigation and drinking water for southern Odisha. Below the wall is a terraced garden with fountains and lawns; above it, a viewpoint over the reservoir and the hills on the far shore." },
      { type: "figure", photo: "kolab-dusk", alt: "Upper Kolab reservoir at dusk with hills behind", caption: "The reservoir at dusk." },
      { type: "h2", text: "How to time it" },
      { type: "p", html: "Arrive an hour and a half before sunset. The garden first, then the viewpoint as the light softens. It closes around dusk, so this is an ending, not a beginning. On the way back the Traveller is in town in half an hour." },
      { type: "figure", photo: "kolab-panorama", alt: "Panorama of the Upper Kolab dam wall and garden", caption: "The dam wall and garden." },
      { type: "h2", text: "Good with" },
      { type: "ul", items: [
        "The town temple and museum on an arrival day, as in every one of our plans.",
        "<a href=\"../gupteswar-tour/\">Gupteswar</a> on the way back from the west.",
        "Jeypore's old town if the group wants a market evening."
      ] },
      { type: "callout", icon: "info", html: "Boating and garden entry depend on the season and local notices. We check on the day." }
    ],
    related: ["koraput-2-day-itinerary", "gupteswar-tour", "koraput-tour", "koraput-sightseeing"],
    message: "Hi Ananta Tours, we would like to include Upper Kolab in a Koraput tour. Please share the plan and the 17-seater Traveller price."
  }
].concat(require("./pages-extra"));
