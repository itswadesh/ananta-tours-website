// Railway stations we pick up from and drop at. Road distances and drive times are
// approximate from our base in Semiliguda (and Koraput town where noted).
// Coordinates and codes from OpenStreetMap; verify train stops with the current timetable.
// Note: "Shimiliguda" (SMLG) near Araku in Andhra Pradesh is a different place from Semiliguda, Koraput.
module.exports = {
  main: [
    { name: "Koraput Junction", code: "KRPU", lat: 18.792, lng: 82.7189, kmBase: 20, drive: "About 35 min", kmKoraput: 2,
      trains: "Express trains from Bhubaneswar (Hirakhand), Howrah (Samaleswari), Visakhapatnam and Jagdalpur. Our usual pickup point." },
    { name: "Damanjodi", code: "DMNJ", lat: 18.7695, lng: 82.8654, kmBase: 12, drive: "About 20 min", kmKoraput: 20,
      trains: "NALCO township station on the Rayagada side, closest to our base. Several expresses from the Rayagada direction stop here; check your train." },
    { name: "Jeypore", code: "JYP", lat: 18.896, lng: 82.554, kmBase: 45, drive: "About 1 h 10 min", kmKoraput: 25,
      trains: "The same Bhubaneswar and Howrah expresses continue here towards Jagdalpur. Jeypore Airport is 10 minutes away. Handy for Gupteswar and Kolab plans." },
    { name: "Araku", code: "ARK", lat: 18.3329, lng: 82.8653, kmBase: 70, drive: "About 1 h 45 min", kmKoraput: 90,
      trains: "Visakhapatnam–Kirandul passenger and the Vistadome tourist train. Good for groups coming via Vizag who want the scenic line." },
    { name: "Rayagada", code: "RGDA", lat: 19.1754, lng: 83.4107, kmBase: 120, drive: "About 3 h", kmKoraput: 105,
      trains: "Big junction on the Vizianagaram–Raipur line with many more trains from Bhubaneswar, Howrah and Visakhapatnam. Worth it if Koraput trains are full." },
    { name: "Vizianagaram Junction", code: "VZM", lat: 18.1115, lng: 83.3963, kmBase: 175, drive: "About 4 h", kmKoraput: 190,
      trains: "On the Howrah–Chennai main line. A long transfer; usually only when a group is already travelling that way." },
    { name: "Visakhapatnam", code: "VSKP", lat: 17.7221, lng: 83.2913, kmBase: 200, drive: "About 5 h", kmKoraput: 215,
      trains: "Main line trains from everywhere plus the airport. We collect groups here for the full trip on request, via Araku or Salur." }
  ],
  // Small halts on the two lines out of Koraput; passenger trains only, timings vary.
  halts: [
    { name: "Dumuriput", code: "DMRT", line: "Koraput–Rayagada", kmBase: 12, drive: "20 min" },
    { name: "Baiguda", code: "BGUA", line: "Koraput–Rayagada", kmBase: 25, drive: "40 min" },
    { name: "Kakiriguma", code: "KKGM", line: "Koraput–Rayagada", kmBase: 40, drive: "1 h" },
    { name: "Laxmipur Road", code: "LKMR", line: "Koraput–Rayagada", kmBase: 55, drive: "1 h 15 min" },
    { name: "Suku", code: "SUKU", line: "Kirandul line, south", kmBase: 25, drive: "40 min" },
    { name: "Paliba", code: "PBV", line: "Kirandul line, south", kmBase: 30, drive: "50 min" },
    { name: "Machkunda Road", code: "MKRD", line: "Kirandul line, south", kmBase: 35, drive: "1 h" },
    { name: "Bheja", code: "BHJA", line: "Kirandul line, south", kmBase: 45, drive: "1 h 10 min" },
    { name: "Padua", code: "PFU", line: "Kirandul line, south", kmBase: 50, drive: "1 h 20 min" },
    { name: "Manabar", code: "MVF", line: "Kirandul line, north", kmBase: 28, drive: "45 min" },
    { name: "Jarati", code: "JRT", line: "Kirandul line, north", kmBase: 35, drive: "55 min" },
    { name: "Maliguda", code: "MVG", line: "Kirandul line, north", kmBase: 40, drive: "1 h" },
    { name: "Chatariput", code: "CTS", line: "Kirandul line, north", kmBase: 45, drive: "1 h 10 min" }
  ]
};
