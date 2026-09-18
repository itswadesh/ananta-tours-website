// Flights and buses to Koraput. Timings from operator listings, checked September 2026;
// they change by season, so the site says "check before you travel" and we confirm on the day.
module.exports = {
  checked: "September 2026",
  airport: { name: "Jeypore Airport", code: "PYB", lat: 18.8813, lng: 82.5528, kmKoraput: 25, driveKoraput: "About 40 min", kmBase: 45, driveBase: "About 1 h 10 min" },
  flights: [
    { route: "Bhubaneswar → Jeypore", airline: "IndiaOne Air", times: "07:20–08:55 and 11:15–12:50", days: "about 9 flights a week" },
    { route: "Jeypore → Bhubaneswar", airline: "IndiaOne Air", times: "10:50–12:25 and 14:35–16:10", days: "daily, some days twice" },
    { route: "Visakhapatnam → Jeypore", airline: "IndiaOne Air", times: "09:40–10:35", days: "daily" },
    { route: "Jeypore → Visakhapatnam", airline: "IndiaOne Air", times: "13:10–14:10", days: "daily" }
  ],
  flightNote: "IndiaOne Air flies a 9-seat Cessna Grand Caravan, so seats and baggage are limited: book early and travel with cabin-size bags. We meet every flight at Jeypore Airport.",
  buses: [
    { from: "Bhubaneswar", operators: "OSRTC (7 a day) and private sleeper and Volvo operators", times: "OSRTC departures 14:00 to 20:00; most private buses leave 18:00 to 21:30", duration: "11 to 12 h overnight", to: "Koraput bus stand", fare: "from about ₹666 (OSRTC)" },
    { from: "Visakhapatnam", operators: "OSRTC (7 a day) and APSRTC", times: "OSRTC through the day and night (00:30 to 23:15); APSRTC from about 04:30", duration: "5 to 6 h via Araku or Salur", to: "Koraput bus stand", fare: "₹235 to ₹800" },
    { from: "Rayagada and Berhampur", operators: "OSRTC and private day buses", times: "frequent through the day", duration: "3 h from Rayagada, 7 to 8 h from Berhampur", to: "Koraput or Jeypore", fare: "" },
    { from: "Kolkata", operators: "no practical direct bus", times: "", duration: "", to: "take the train, or fly to Bhubaneswar or Visakhapatnam and connect", fare: "" }
  ]
};
