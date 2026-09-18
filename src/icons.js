// Inline SVG icon set (24x24, stroke based). Rendered once as a sprite in
// each page and referenced with <use href="#i-name">.
const icons = {
  mountain: '<path d="M3 20 9.5 8.5 13 14l2.5-3.5L21 20H3Z"/><path d="M9.5 8.5V6"/>',
  waterfall: '<path d="M3 5h9"/><path d="M6 5v8M9.5 5v11M13 5v8"/><path d="M3 19c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/>',
  temple: '<path d="M12 2c-4 5-6 9-6 18h12c0-9-2-13-6-18Z"/><path d="M8 20h8M12 2v2M9 14h6"/>',
  museum: '<path d="M3 21h18M5 21v-9M9 21v-9M15 21v-9M19 21v-9M3 12h18"/><path d="m3 9 9-6 9 6H3Z"/>',
  train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 17l-2 4M15 17l2 4M8 7h8"/><circle cx="9" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1" fill="currentColor" stroke="none"/>',
  van: '<path d="M3 16V8a2 2 0 0 1 2-2h9l5 4v6"/><path d="M3 16h2m4 0h6m4 0h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M14 6v4h5"/>',
  seat: '<path d="M6 4h8a2 2 0 0 1 2 2v7H6z"/><path d="M4 13h14v5H4z"/><path d="M6 18v3M16 18v3"/>',
  snowflake: '<path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/><path d="m12 2-2 2m2-2 2 2m-2 18-2-2m2 2 2-2M2 12l2-2m-2 2 2 2m18-2-2-2m2 2-2 2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5a3.5 3.5 0 0 1 0 7"/><path d="M17.5 13.5a6.5 6.5 0 0 1 4 6.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H14a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h5.5"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  whatsapp: '<path d="M3.5 20.5 5 15.8A8.5 8.5 0 1 1 8.2 19z"/><path d="M9.2 8.8c.2 2.2 3.8 5.8 6 6 .5 0 1.3-.7 1.5-1.2l-1.8-1.1-1 .8c-1-.3-2.6-1.9-2.9-2.9l.8-1L10.7 7.5c-.5.2-1.5 1-1.5 1.3z" fill="currentColor" stroke="none"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  "arrow-up-right": '<path d="M7 17 17 7M8 7h9v9"/>',
  sunrise: '<path d="M12 3v3M4.2 7.2l2.1 2.1M2 15h3M19 15h3M17.7 7.2l-2.1 2.1"/><path d="M6 18a6 6 0 0 1 12 0"/><path d="M2 21h20"/>',
  road: '<path d="M4 21 9 3h6l5 18"/><path d="M12 6v2M12 11v3M12 17v4"/>',
  luggage: '<rect x="5" y="7" width="14" height="14" rx="2"/><path d="M9 7V4h6v3M9 11v6M15 11v6"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  language: '<path d="M3 5h10M8 3v2M11 5c-1 4-3 7-6 9M6 9c1 3 3 5 5 6"/><path d="m13 21 3.5-9 3.5 9M14.3 18h4.4"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z" fill="currentColor" stroke="none"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  coffee: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M7 3v3M11 3v3"/>',
  stairs: '<path d="M3 20h4v-4h4v-4h4V8h4V4"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
  bed: '<path d="M3 18V8M3 12h18v6M21 18v-3"/><path d="M7 12V9h5v3"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 13h15a3 3 0 1 1-3 3"/><path d="M3 18h7"/>',
  spark: '<path d="m12 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="m21 16-5-5-8 8"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  rupee: '<path d="M6 4h12M6 9h12M13 4c0 3-2 5-6 5h-1l9 11"/>',
  wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v6.5M12 14.5V21M3 12h6.5M14.5 12H21"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  fuel: '<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/><path d="M4 21h10M6 7h6v4H6z"/><path d="M14 11h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0v-7l-2-2"/>',
  "map": '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>'
};

function sprite() {
  return `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">${Object.entries(icons)
    .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`)
    .join("")}</svg>`;
}

function icon(name, cls = "") {
  if (!icons[name]) throw new Error("Unknown icon: " + name);
  return `<svg class="ic${cls ? " " + cls : ""}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

module.exports = { icons, sprite, icon };
