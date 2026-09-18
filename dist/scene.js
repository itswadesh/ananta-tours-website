// Low-poly Eastern Ghats terrain behind the "17 seats" title. Three.js via CDN.
// Runs only when the canvas is on screen; static on reduced-motion or without WebGL.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const canvas = document.getElementById("terrain");
if (canvas) init(canvas);

function init(canvas) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  } catch (e) {
    canvas.remove();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0d1f4d, 0.026);

  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 200);
  camera.position.set(0, 7.5, 26);
  camera.lookAt(0, 1.5, 0);

  // Hemisphere for the sky/ground tint, one low sun for long sunrise shadows.
  scene.add(new THREE.HemisphereLight(0xe3e8f5, 0x0a1a40, 0.95));
  const sun = new THREE.DirectionalLight(0xffb060, 1.35);
  sun.position.set(-18, 9, -6);
  scene.add(sun);

  // Terrain built from layered value noise, ridged for sharper crests.
  const size = 90, segs = 150;
  const geo = new THREE.PlaneGeometry(size, size, segs, segs);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const cLow = new THREE.Color(0x0a1a40), cMid = new THREE.Color(0x2e7a48), cHigh = new THREE.Color(0x8fbf6a), cPeak = new THREE.Color(0xffb84d);
  const tmp = new THREE.Color();
  let maxH = 0;
  const heights = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    let h = ridged(x * 0.045, z * 0.045) * 7.5 + noise2(x * 0.15, z * 0.15) * 1.1;
    // Flatten the foreground so the title sits above a valley floor.
    const front = THREE.MathUtils.smoothstep(z, 4, 30);
    h *= 1 - front * 0.85;
    heights[i] = h;
    maxH = Math.max(maxH, h);
  }
  for (let i = 0; i < pos.count; i++) {
    const h = heights[i];
    pos.setY(i, h);
    const t = Math.max(0, h) / maxH;
    if (t < 0.35) tmp.copy(cLow).lerp(cMid, t / 0.35);
    else if (t < 0.75) tmp.copy(cMid).lerp(cHigh, (t - 0.35) / 0.4);
    else tmp.copy(cHigh).lerp(cPeak, (t - 0.75) / 0.25);
    colors[i * 3] = tmp.r; colors[i * 3 + 1] = tmp.g; colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1, metalness: 0 });
  const terrain = new THREE.Mesh(geo, mat);
  scene.add(terrain);

  // A thin drifting mist layer.
  const mistGeo = new THREE.PlaneGeometry(size * 1.4, size * 1.4);
  mistGeo.rotateX(-Math.PI / 2);
  const mist = new THREE.Mesh(mistGeo, new THREE.MeshBasicMaterial({ color: 0xd6dcea, transparent: true, opacity: 0.08, depthWrite: false }));
  mist.position.y = 2.2;
  scene.add(mist);

  let w = 0, h = 0;
  function resize() {
    const r = canvas.getBoundingClientRect();
    if (r.width === w && r.height === h) return;
    w = r.width; h = r.height;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  let visible = false, raf = 0, t0 = performance.now();
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  let scroll = 0;
  const section = canvas.closest(".journey-title") || canvas;

  function frame(now) {
    raf = 0;
    resize();
    const t = (now - t0) / 1000;
    cur.x += (target.x - cur.x) * 0.04;
    cur.y += (target.y - cur.y) * 0.04;
    terrain.rotation.y = t * 0.012 + cur.x * 0.06;
    camera.position.y = 7.5 + cur.y * 1.2 - scroll * 3;
    camera.position.z = 26 - scroll * 6;
    camera.lookAt(0, 1.5 - scroll * 1.5, 0);
    mist.position.x = Math.sin(t * 0.08) * 4;
    renderer.render(scene, camera);
    if (visible && !reduce) raf = requestAnimationFrame(frame);
  }

  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: "120px" }).observe(canvas);

  window.addEventListener("pointermove", e => {
    if (!visible) return;
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener("scroll", () => {
    if (!visible) return;
    const r = section.getBoundingClientRect();
    scroll = THREE.MathUtils.clamp(-r.top / Math.max(1, r.height), 0, 1);
  }, { passive: true });

  window.addEventListener("resize", () => { if (!raf) raf = requestAnimationFrame(frame); });
  raf = requestAnimationFrame(frame);
}

/* Value noise helpers */
function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise2(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return (a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v) * 2 - 1;
}
function ridged(x, y) {
  let sum = 0, amp = 0.55, freq = 1, norm = 0;
  for (let o = 0; o < 5; o++) {
    const n = 1 - Math.abs(noise2(x * freq + 3.1 * o, y * freq - 1.7 * o));
    sum += n * n * amp;
    norm += amp;
    amp *= 0.5; freq *= 2.05;
  }
  return sum / norm;
}
