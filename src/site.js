// Shared site constants. Edit here, then run `node build.js`.
const site = {
  name: "Ananta Tours & Travels",
  shortName: "Ananta",
  // Used as the suffix of every page title; the full name is too long for a search result.
  brandShort: "Ananta Tours",
  tagline: "Experience Koraput in Comfort",
  // Public address. Set customDomain once the branded domain points at GitHub Pages:
  // build.js then writes dist/CNAME and every canonical, hreflang, sitemap and schema URL follows.
  // Recommended in the SEO strategy: anantatourskoraput.com
  customDomain: null,
  url: "https://itswadesh.github.io/ananta-tours-website",
  // Date the transport timetables on the site were last checked against operator listings.
  verified: "18 September 2026",
  // Published starting fares. Leave null until the business confirms real figures; the price page
  // and the homepage fare section then render them automatically. Never invent these.
  // Shape: { currency: "₹", updated: "September 2026", items: [{ name, route, days, from }] }
  rates: null,
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
    { href: "#prices", key: "prices" }
  ],
  // Coordinates of Koraput town centre, used as the start of the map route.
  koraput: { lat: 18.812, lng: 82.71 },
  // Our base in Semiliguda, used for the business location in structured data.
  base: { lat: 18.7228, lng: 82.8672 }
};

// One canonical host. Setting customDomain above moves canonicals, hreflang, the sitemap,
// structured data and llms.txt to it, and build.js writes dist/CNAME for GitHub Pages.
if (site.customDomain) site.url = `https://${site.customDomain}`;

module.exports = site;
