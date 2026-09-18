// Shared site constants. Edit here, then run `node build.js`.
module.exports = {
  name: "Ananta Tours & Travels",
  shortName: "Ananta",
  tagline: "Experience Koraput in Comfort",
  // Final public address. Update after the GitHub Pages URL is confirmed.
  url: "https://itswadesh.github.io/ananta-tours-website",
  // Real Deomali/Koraput footage used in the hero (credited in the footer).
  heroVideoId: "N3OU1S6Bhw4",
  heroVideoCredit: { title: "Deomali — Koraput Odisha", url: "https://www.youtube.com/watch?v=N3OU1S6Bhw4" },
  year: 2026,
  contact: {
    whatsapp: "917978707236",             // digits with country code, used by every WhatsApp button
    whatsappDisplay: "+91 79787 07236",
    email: "saramanihembram434@gmail.com",
    phones: [
      { display: "+91 76098 35466", tel: "+917609835466" },
      { display: "+91 82609 03443", tel: "+918260903443" }
    ],
    address: { street: "Kalinga Nagar", locality: "Semiliguda", district: "Koraput", region: "Odisha", postalCode: "764036" }
  },
  vehicle: {
    seats: 17,
    purchased: "September 2026",
    deliveredOn: "4 September 2026"
  },
  // Labels come from the language dictionaries (ui.nav) keyed by `key`.
  nav: [
    { href: "#journey", key: "road" },
    { href: "#itineraries", key: "itineraries" },
    { href: "#destinations", key: "destinations" },
    { href: "#traveller", key: "traveller" },
    { href: "#map", key: "map" }
  ],
  // Coordinates of Koraput town centre, used as the start of the map route.
  koraput: { lat: 18.812, lng: 82.71 }
};
