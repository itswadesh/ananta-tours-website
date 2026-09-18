/* Ananta Tours & Travels — interactions
   Smooth scroll (Lenis), scroll-driven road (GSAP), planner, seat map, micro-interactions. */
(() => {
  const WHATSAPP_NUMBER = document.body.dataset.whatsapp || ""; // Set in src/site.js (contact.whatsapp).

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  // Respect the OS reduced-motion setting. Append ?motion to the URL to preview the full experience anyway.
  const forceMotion = new URLSearchParams(location.search).has("motion");
  if (forceMotion) document.documentElement.classList.add("force-motion");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !forceMotion;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const data = (() => { try { return JSON.parse($("#site-data")?.textContent || "{}"); } catch (e) { return {}; } })();
  const dest = Object.fromEntries((data.destinations || []).map(d => [d.slug, d]));

  /* ---------- Smooth scrolling ---------- */
  let lenis = null;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger, window.MotionPathPlugin || {});
  // Smooth scrolling and scroll-linked effects stay on even under reduced motion; only autonomous animation is gated by `reduce`.
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  function scrollToEl(el) {
    if (lenis) lenis.scrollTo(el, { offset: -76, duration: 1.4, easing: t => 1 - Math.pow(1 - t, 3) });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.getAttribute("href"), location.href);
    if (url.pathname !== location.pathname || !url.hash || url.hash === "#") return;
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    closeNav();
    scrollToEl(el);
    history.pushState(null, "", url.hash);
  });

  if (location.hash && location.hash.length > 1) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; window.scrollTo(0, 0); setTimeout(() => scrollToEl(target), 120); }
  }

  /* ---------- Header, progress bar, mobile nav ---------- */
  const header = $(".site-header");
  const progress = $(".scroll-progress");
  const navToggle = $(".nav-toggle");
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  function closeNav() {
    if (!document.body.classList.contains("nav-open")) return;
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    lenis?.start();
  }
  navToggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
    open ? lenis?.stop() : lenis?.start();
  });

  /* ---------- Toast + WhatsApp ---------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3600);
  }
  function openWhatsApp(message) {
    const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me/";
    window.open(`${base}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    if (!WHATSAPP_NUMBER) showToast("Business number pending. WhatsApp will ask you to choose a contact.");
  }
  const defaultMessage = origin => origin
    ? `Hi Ananta Tours, I am planning a Koraput trip from ${origin}. Please help me with the itinerary and 17-seater Traveller availability.`
    : "Hi Ananta Tours, I am planning a Koraput trip. Please help me with the itinerary and 17-seater Traveller availability.";
  $$(".js-whatsapp").forEach(b => b.addEventListener("click", () => openWhatsApp(b.dataset.message || defaultMessage(b.dataset.origin))));

  /* ---------- Hero: one reveal, parallax, real footage ---------- */
  const hero = $(".hero");
  if (hero) {
    if (hasGsap && !reduce) {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-word > span", { yPercent: 110, duration: 1.1, stagger: 0.05 }, 0.2)
        .from(".hero-copy, .hero-actions, .hero-proof", { y: 26, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.75)
        .from(".scroll-cue", { opacity: 0, duration: 0.6 }, 1.4);
      gsap.to(".hero-media", { yPercent: 16, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-inner", { y: -50, opacity: 0.25, ease: "none", scrollTrigger: { trigger: hero, start: "40% top", end: "bottom top", scrub: true } });
    }
    // Real footage only after the visitor has settled on the hero for ~3 s, never on slow or data-saver connections.
    const conn = navigator.connection || {};
    const slowNet = !!conn.saveData || /(^|[^4-9])[23]g$/.test(conn.effectiveType || "");
    const video = $("#hero-video");
    if (video && slowNet) video.remove();
    if (video && !reduce && !slowNet) {
      const YT = "https://www.youtube-nocookie.com";
      let lastState = null;
      video.src = video.dataset.src + "&origin=" + encodeURIComponent(location.origin);
      const send = fn => video.contentWindow?.postMessage(JSON.stringify({ event: "command", func: fn, args: [] }), YT);
      let timer, started = false, wantPlay = false;
      // Subscribe to player state so the footage only fades in once it is really playing (never a paused frame with a play button).
      const listen = () => video.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: "hero", channel: "widget" }), YT);
      video.addEventListener("load", listen); listen();
      window.addEventListener("message", e => {
        if (e.origin !== YT || typeof e.data !== "string") return;
        let d; try { d = JSON.parse(e.data); } catch (err) { return; }
        const state = d.event === "onStateChange" ? d.info : d.info && typeof d.info.playerState === "number" ? d.info.playerState : null;
        if (state !== null) lastState = state;
        if (state === 1 && wantPlay) video.classList.add("is-playing");
        else if (state === 2 || state === 0 || state === -1) video.classList.remove("is-playing");
        if (d.event === "onReady" && wantPlay) play();
      });
      const play = () => { wantPlay = true; send("mute"); send("playVideo"); started = true; if (lastState === 1) video.classList.add("is-playing"); };
      new IntersectionObserver(([en]) => {
        clearTimeout(timer);
        if (en.isIntersecting && en.intersectionRatio >= 0.4) timer = setTimeout(play, started ? 0 : 3000);
        else { wantPlay = false; send("pauseVideo"); video.classList.remove("is-playing"); }
      }, { threshold: [0, 0.4] }).observe(hero);
    }
  }

  /* ---------- Hero slider + full-screen gallery ---------- */
  const slider = $("#hero-slider");
  const lb = $("#lightbox");
  const galleryData = (() => { try { return JSON.parse($("#gallery-data")?.textContent || "[]"); } catch (e) { return []; } })();
  let slideIndex = 0, slideTimer;
  if (slider) {
    const slides = $$(".hero-slide", slider), dots = $$(".hero-dots button"), cap = $("#hero-slide-caption");
    const show = i => {
      slideIndex = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === slideIndex));
      dots.forEach((d, k) => d.setAttribute("aria-selected", String(k === slideIndex)));
      if (cap && galleryData[slideIndex]) cap.textContent = galleryData[slideIndex].caption;
    };
    const restart = () => { clearInterval(slideTimer); slideTimer = setInterval(() => show(slideIndex + 1), 5500); };
    $$("[data-slide]").forEach(b => b.addEventListener("click", () => { show(slideIndex + Number(b.dataset.slide)); restart(); }));
    dots.forEach(d => d.addEventListener("click", () => { show(Number(d.dataset.slideTo)); restart(); }));
    hero.addEventListener("pointerenter", () => clearInterval(slideTimer));
    hero.addEventListener("pointerleave", restart);
    restart();
  }
  if (lb && galleryData.length) {
    const img = $("#lb-img"), capEl = $("#lb-caption"), count = $("#lb-count"), thumbs = $$("#lb-thumbs button");
    let lbIndex = 0, lastFocus = null;
    const render = () => {
      const g = galleryData[lbIndex];
      img.src = root(g.src); img.alt = g.alt; capEl.textContent = g.caption; count.textContent = `${lbIndex + 1} / ${galleryData.length}`;
      thumbs.forEach((t, k) => t.setAttribute("aria-current", String(k === lbIndex)));
      img.onerror = () => { img.onerror = null; img.src = root(g.fallback); };
    };
    function root(p) { return (document.body.dataset.root || "") + p; }
    const open = i => { lbIndex = (i + galleryData.length) % galleryData.length; lastFocus = document.activeElement; lb.hidden = false; document.body.classList.add("lb-open"); lenis?.stop(); render(); $(".lb-close", lb).focus(); clearInterval(slideTimer); };
    const close = () => { lb.hidden = true; document.body.classList.remove("lb-open"); lenis?.start(); lastFocus?.focus?.(); if (slider) { clearInterval(slideTimer); slideTimer = setInterval(() => $$("[data-slide='1']")[0]?.click(), 5500); } };
    const step = n => { lbIndex = (lbIndex + n + galleryData.length) % galleryData.length; render(); };
    $$("[data-gallery-open]").forEach(el => {
      const handler = () => {
        const v = el.dataset.galleryOpen;
        let i = 0;
        if (v === "current") i = slideIndex;
        else if (v === "gallery") { const active = $$(".gallery-img").findIndex(p => p.classList.contains("is-active")); const map = [1, 2, 0, 4, 3]; i = active >= 0 ? map[active] : 0; }
        else i = Number(v) || 0;
        open(i);
      };
      el.addEventListener("click", handler);
      if (el.tagName !== "BUTTON") el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handler(); } });
    });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", () => step(-1));
    $(".lb-next", lb).addEventListener("click", () => step(1));
    thumbs.forEach(t => t.addEventListener("click", () => { lbIndex = Number(t.dataset.lbTo); render(); }));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") close(); else if (e.key === "ArrowRight") step(1); else if (e.key === "ArrowLeft") step(-1); });
    let sx = null;
    lb.addEventListener("pointerdown", e => { sx = e.clientX; });
    lb.addEventListener("pointerup", e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); });
  }

  /* ---------- Parallax for framed photos (scroll-linked) ---------- */
  if (hasGsap) {
    $$("[data-parallax]").forEach(box => {
      const img = box.querySelector("img");
      if (!img) return;
      const amt = parseFloat(box.dataset.parallax) || 8;
      gsap.fromTo(img, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  /* ---------- The road: SVG path through every stop, van follows on scroll ---------- */
  const track = $(".road-track");
  if (track) {
    const svg = $(".road-svg", track);
    const base = $(".road-base", svg), dash = $(".road-dash", svg), drawn = $(".road-drawn", svg);
    const van = $(".van", track);
    let built = false;
    function buildRoad() {
      const rect = track.getBoundingClientRect();
      const W = track.clientWidth, H = track.clientHeight;
      const pts = $$(".stop-marker", track).map(m => {
        const r = m.getBoundingClientRect();
        return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 };
      });
      if (pts.length < 2) return;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      let d = `M ${pts[0].x} 0 L ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], dy = b.y - a.y;
        d += ` C ${a.x} ${a.y + dy * 0.5}, ${b.x} ${b.y - dy * 0.5}, ${b.x} ${b.y}`;
      }
      const last = pts[pts.length - 1];
      d += ` L ${last.x} ${H}`;
      [base, $(".road-edge", svg), dash, drawn].forEach(p => p && p.setAttribute("d", d));
      const len = drawn.getTotalLength();
      drawn.style.strokeDasharray = `${len}`;
      drawn.style.strokeDashoffset = `${len}`;
      if (hasGsap) {
        ["road", "van"].forEach(id => ScrollTrigger.getById(id)?.kill());
        const st = { trigger: track, start: "top 62%", end: "bottom 62%", scrub: 0.7 };
        gsap.to(drawn, { strokeDashoffset: 0, ease: "none", scrollTrigger: { ...st, id: "road" } });
        if (van) {
          // The SVG viewBox equals the track's pixel box, so path coordinates map 1:1 to the track.
          const placeVan = progress => {
            const L = drawn.getTotalLength();
            const at = Math.max(0, Math.min(L, progress * L));
            const p = drawn.getPointAtLength(at);
            const q = drawn.getPointAtLength(Math.min(L, at + 6));
            const angle = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
            van.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${angle}deg)`;
          };
          ScrollTrigger.create({ ...st, id: "van", onUpdate: self => placeVan(self.progress), onRefresh: self => placeVan(self.progress) });
          placeVan(0);
        }
      } else {
        drawn.style.strokeDashoffset = "0";
      }
      built = true;
    }
    if (hasGsap) {
      $$(".stop", track).forEach(stop => {
        const marker = stop.querySelector(".stop-marker");
        if (marker) ScrollTrigger.create({ trigger: marker, start: "center 62%", toggleClass: { targets: stop, className: "is-passed" } });
        const parts = $$(".stop-body > *", stop);
        if (parts.length && !reduce) gsap.from(parts, { y: 28, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: stop, start: "top 78%", once: true } });
      });
    }
    const rebuild = () => { buildRoad(); if (hasGsap) ScrollTrigger.refresh(); };
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(rebuild, 180); });
    const ready = document.fonts?.ready || Promise.resolve();
    ready.then(() => requestAnimationFrame(rebuild));
    window.addEventListener("load", () => { if (!built) rebuild(); else if (hasGsap) ScrollTrigger.refresh(); });
  }

  /* ---------- Trip planner ---------- */
  const form = $("#trip-form");
  if (form) {
    // Typical arrival times for each stop within a day (leaving Koraput town).
    const eta = {
      town: { "sabara-srikhetra": "09:00", "tribal-museum": "10:00", kolab: "15:30" },
      one: { "sabara-srikhetra": "08:00", "tribal-museum": "09:00", kolab: "10:30", deomali: "15:00" },
      hills: { deomali: "07:00", nandapur: "12:30", "rani-duduma": "14:00" },
      south: { duduma: "10:00", onukadelli: "12:00" },
      west: { gupteswar: "10:00", maliguda: "15:30" }
    };
    const plans = {
      "1": [["Day 1", ["sabara-srikhetra", "tribal-museum", "kolab", "deomali"], eta.one, "Leave 07:30, back about 20:00"]],
      "2": [["Day 1", ["sabara-srikhetra", "tribal-museum", "kolab"], eta.town, "Easy start, back about 18:30"], ["Day 2", ["deomali", "nandapur", "rani-duduma"], eta.hills, "Leave 05:00, back about 17:30"]],
      "3": [["Day 1", ["sabara-srikhetra", "tribal-museum", "kolab"], eta.town, "Easy start, back about 18:30"], ["Day 2", ["deomali", "nandapur", "rani-duduma"], eta.hills, "Leave 05:00, back about 17:30"], ["Day 3", ["duduma", "onukadelli"], eta.south, "Leave 07:00, back about 17:30"]],
      "4": [["Day 1", ["sabara-srikhetra", "tribal-museum", "kolab"], eta.town, "Easy start, back about 18:30"], ["Day 2", ["deomali", "nandapur", "rani-duduma"], eta.hills, "Leave 05:00, back about 17:30"], ["Day 3", ["duduma", "onukadelli"], eta.south, "Leave 07:00, back about 17:30"], ["Day 4", ["gupteswar", "maliguda"], eta.west, "Leave 07:30, back about 17:00"]]
    };
    const out = $("#route-days"), title = $("#route-title"), dateInput = $("#trip-date");
    const val = n => form.querySelector(`input[name="${n}"]:checked`)?.value || "";
    const name = s => dest[s]?.name || s;
    const iconOf = s => dest[s]?.icon || "pin";
    function render() {
      const days = val("days") || "3";
      const plan = plans[days];
      title.textContent = `Your ${days === "4" ? "4-day" : days + "-day"} Koraput journey`;
      out.innerHTML = plan.map(([label, stops, times, note]) => `<div class="route-day"><b>${label}</b><div><div class="route-stops">${stops.map((s, i) =>
        `<span class="route-stop" style="animation-delay:${i * 60}ms"><svg class="ic" aria-hidden="true"><use href="#i-${iconOf(s)}"/></svg>${times && times[s] ? `<em>${times[s]}</em>` : ""}${name(s)}${s === "onukadelli" ? " (Thu)" : ""}</span>`).join("")}</div>${note ? `<small class="route-note">${note}</small>` : ""}</div></div>`).join("");
    }
    form.addEventListener("change", e => {
      const chip = e.target.closest(".chip");
      if (chip) { chip.classList.remove("pop"); void chip.offsetWidth; chip.classList.add("pop"); }
      if (e.target.name === "days") render();
    });
    if (dateInput) { const t = new Date(); dateInput.min = t.toISOString().slice(0, 10); }
    form.addEventListener("submit", e => {
      e.preventDefault();
      const origin = val("origin"), people = val("people"), days = val("days");
      const plan = plans[days] || plans["3"];
      let when = "";
      if (dateInput?.value) {
        const d = new Date(dateInput.value + "T00:00:00");
        when = ` around ${d.getDate()} ${d.toLocaleString("en-IN", { month: "long" })}`;
      }
      const route = plan.map(([label, stops, times]) => `${label}: ${stops.map(s => (times && times[s] ? times[s] + " " : "") + name(s)).join(" → ")}`).join("; ");
      const wanted = $('input[name="places"]:checked', form).map(i => i.value);
      const must = wanted.length ? ` Places we want to include: ${wanted.join(", ")}.` : "";
      openWhatsApp(`Hi Ananta Tours, we are ${people} people travelling from ${origin} and planning a ${days === "4" ? "4+" : days}-day Koraput trip${when}. Suggested route: ${route}.${must} Please send an itinerary, availability and the Traveller price.`);
    });
    render();
  }

  /* ---------- 3D tilt cards (pointer devices only) ---------- */
  if (!coarse && !reduce) {
    $$(".tilt").forEach(card => {
      let raf = 0;
      card.addEventListener("pointerenter", () => card.classList.add("is-tilting"));
      card.addEventListener("pointermove", e => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(1000px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-4px)`;
        });
      });
      card.addEventListener("pointerleave", () => { card.classList.remove("is-tilting"); card.style.transform = ""; });
    });
    $$(".magnetic").forEach(btn => {
      btn.addEventListener("pointermove", e => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.28).toFixed(1)}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------- One group, one vehicle: entrance once it scrolls into view ---------- */
  const together = $("#together");
  if (together && hasGsap && !reduce) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: together, start: "top 70%", once: true }, defaults: { ease: "power3.out" } });
    tl.from($(".scene-cars .car", together), { x: -60, opacity: 0, duration: 0.8, stagger: 0.12 }, 0)
      .from($(".compare-bad .compare-list li", together), { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.3)
      .from($(".compare-vs", together), { scale: 0, duration: 0.5, ease: "back.out(2)" }, 0.5)
      .from($(".scene-van .van-unit", together), { x: -260, opacity: 0, duration: 1.1, ease: "power4.out" }, 0.4)
      .from($(".scene-van .person", together), { scale: 0, opacity: 0, duration: 0.35, stagger: 0.03, ease: "back.out(3)" }, 1.0)
      .from($(".scene-van .people-pill", together), { scale: 0.6, opacity: 0, duration: 0.45, ease: "back.out(2)" }, 1.4)
      .from($(".scene-van .check-badge", together), { scale: 0, duration: 0.5, ease: "back.out(2.5)" }, 1.55)
      .from($(".compare-good .compare-list li", together), { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, 1.0)
      .from($(".compare-stats li", together), { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, 1.4);
  }

  /* ---------- Vehicle gallery ---------- */
  const gallery = $("#vehicle-gallery");
  if (gallery) {
    const imgs = $$(".gallery-img", gallery), caption = $("#gallery-caption"), thumbs = $$(".gallery-thumbs button", gallery);
    thumbs.forEach(btn => btn.addEventListener("click", () => {
      const i = Number(btn.dataset.index);
      imgs.forEach((im, k) => im.classList.toggle("is-active", k === i));
      thumbs.forEach(b => b.setAttribute("aria-selected", String(b === btn)));
      caption.textContent = btn.dataset.caption;
    }));
  }

  /* ---------- Seat map ---------- */
  const seatmap = $("#seatmap");
  if (seatmap) {
    // 17-passenger layout as photographed: front passenger seat, four rows of 2+1, back bench of 4.
    const rows = [["D", 1, "", ""], [2, 3, "", 4], [5, 6, "", 7], [8, 9, "", 10], [11, 12, "", 13], [14, 15, 16, 17]];
    const info = $("#seat-info");
    seatmap.innerHTML = rows.map((row, ri) => `<div class="seat-row">${row.map((s, ci) => {
      if (s === "") return `<span class="aisle" aria-hidden="true"></span>`;
      if (s === "D") return `<span class="seat driver" title="Driver"><span class="seat-back">D</span><span class="seat-cushion"></span></span>`;
      const side = ri === 5 ? (ci === 0 || ci === 3 ? "window" : "middle") : (ci === 0 || ci === 3 ? "window" : "aisle");
      const rowName = ri === 0 ? "front row, beside the driver" : ri === 5 ? "back bench" : `row ${ri + 1}`;
      return `<button class="seat" type="button" data-seat="${s}" data-desc="Seat ${s} · ${rowName} · ${side} seat" aria-label="Seat ${s}, ${rowName}, ${side}"><span class="seat-back">${s}</span><span class="seat-cushion"></span></button>`;
    }).join("")}</div>`).join("");
    seatmap.addEventListener("click", e => {
      const seat = e.target.closest(".seat[data-seat]");
      if (!seat) return;
      $$(".seat.is-active", seatmap).forEach(s => s.classList.remove("is-active"));
      seat.classList.add("is-active");
      info.innerHTML = `<strong>${seat.dataset.desc}</strong><br>Layout as photographed in the cabin. Tell us who sits where and we keep it.`;
    });
  }

  /* ---------- Google Map ----------
     Without a key: the keyless Google route embed (already in the HTML).
     With GOOGLE_MAPS_API_KEY set: the Maps JavaScript API with one pin per attraction. */
  const GOOGLE_MAPS_API_KEY = ""; // Optional. Create a browser key restricted to this domain in Google Cloud.
  const mapHost = $("#gmap"), mapEmbed = $("#map-embed"), mapLoading = $(".map-loading");
  mapEmbed?.addEventListener("load", () => mapLoading?.remove());
  if (mapHost && GOOGLE_MAPS_API_KEY && data.destinations) {
    window.__anantaMap = () => {
      const map = new google.maps.Map(mapHost, {
        center: { lat: 18.72, lng: 82.62 }, zoom: 9, mapTypeControl: false, streetViewControl: false, fullscreenControl: true,
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }, { featureType: "water", stylers: [{ color: "#a9c4e8" }] }, { featureType: "landscape", stylers: [{ color: "#f0eee6" }] }]
      });
      const info = new google.maps.InfoWindow();
      const pins = [{ name: "Koraput town", lat: data.koraput.lat, lng: data.koraput.lng, drive: "Start and end" }, ...data.destinations];
      pins.forEach(d => {
        const m = new google.maps.Marker({ position: { lat: d.lat, lng: d.lng }, map, title: d.name, icon: { path: google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: "#d9500d", fillOpacity: 1, strokeColor: "#ff8c1a", strokeWeight: 2 } });
        m.addListener("click", () => {
          info.setContent(`<div style="font:14px/1.4 sans-serif;color:#13201c"><strong>${d.name}</strong><br>${d.drive || ""}${d.km ? ` · ${d.km} km` : ""}${d.page ? `<br><a href="${d.page}/">Read the guide</a>` : ""}<br><a href="https://www.google.com/maps/search/?api=1&query=${d.lat}%2C${d.lng}" target="_blank" rel="noopener">Directions</a></div>`);
          info.open({ anchor: m, map });
        });
      });
      mapEmbed?.remove(); mapLoading?.remove(); mapHost.hidden = false;
    };
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=__anantaMap&loading=async`;
    s.async = true;
    document.head.appendChild(s);
  }

  /* ---------- Copy-to-clipboard for map coordinates (map pins) ---------- */
  $$("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); showToast("Copied"); } catch (e) { showToast(b.dataset.copy); }
  }));
})();
