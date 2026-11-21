/* ==========================================================
   পোর্টফোলিওর কাজ: data/data.js থেকে তথ্য নিয়ে পেজ সাজানো,
   ডার্ক মোড, স্লাইডার, ছবি বড় করা, শেয়ার + QR কোড
   ========================================================== */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);

  // ---------- নিরাপদ টেক্সট (HTML ইনজেকশন এড়াতে) ----------
  function el(tag, props, children) {
    const node = document.createElement(tag);
    Object.entries(props || {}).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  }

  // ---------- ছবি না পেলে হাতে-আঁকা প্লেসহোল্ডার ----------
  function placeholder(label) {
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>" +
      "<rect width='100%' height='100%' fill='#dcc9a3'/>" +
      "<rect x='14' y='14' width='372' height='372' fill='none' stroke='#8a6340' stroke-width='3' stroke-dasharray='10 8'/>" +
      "<text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif' font-size='22' fill='#6a4f33'>" +
      (label || "ছবি যোগ করুন").replace(/[<>&]/g, "") +
      "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function img(src, alt, label) {
    const i = el("img", { alt: alt || "", loading: "lazy", decoding: "async" });
    i.addEventListener("error", function onErr() {
      i.removeEventListener("error", onErr);
      i.src = placeholder(label || alt);
    });
    i.src = src;
    return i;
  }

  // ---------- টোস্ট বার্তা ----------
  let toastTimer;
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  // ---------- মূল পরিচিতি ----------
  function renderAbout() {
    document.title = D.name + " | " + D.brand;
    $("brandName").textContent = D.brand;
    $("name").textContent = D.name;
    $("tagline").textContent = D.tagline;
    $("bio").textContent = D.bio;
    $("footerText").textContent = D.footerText;

    const p = $("profileImg");
    p.addEventListener("error", function () { p.src = placeholder("প্রোফাইল ছবি"); }, { once: true });
    p.src = D.profileImage;

    const ul = $("socials");
    D.socials.forEach((s) => {
      const a = el("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", text: s.label });
      ul.appendChild(el("li", {}, [a]));
    });
  }

  // ---------- হাইলাইট ----------
  function renderHighlights() {
    const slider = $("slider");
    D.highlights.forEach((h) => {
      const inner = [img(h.image, h.title, h.title), el("h3", { text: h.title }), el("p", { text: h.text })];
      const card = h.link
        ? el("a", { class: "slide tape", href: h.link, target: "_blank", rel: "noopener noreferrer" }, inner)
        : el("article", { class: "slide tape" }, inner);
      slider.appendChild(card);
    });

    const step = () => Math.max(slider.clientWidth * 0.8, 260);
    $("prevBtn").addEventListener("click", () => slider.scrollBy({ left: -step(), behavior: "smooth" }));
    $("nextBtn").addEventListener("click", () => slider.scrollBy({ left: step(), behavior: "smooth" }));
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") slider.scrollBy({ left: step(), behavior: "smooth" });
      if (e.key === "ArrowLeft") slider.scrollBy({ left: -step(), behavior: "smooth" });
    });
  }

  // ---------- গ্যালারি ----------
  function renderGallery() {
    const grid = $("galleryGrid");
    D.gallery.forEach((g) => {
      const b = el("button", { class: "polaroid tape", type: "button", "aria-label": g.caption + " বড় করে দেখুন" }, [
        img(g.image, g.caption, g.caption),
        el("span", { text: g.caption })
      ]);
      b.addEventListener("click", () => openLightbox(g.image, g.caption));
      grid.appendChild(b);
    });
  }

  // ---------- সার্টিফিকেট ----------
  function renderCertificates() {
    const grid = $("certGrid");
    D.certificates.forEach((c) => {
      const b = el("button", { class: "cert tape", type: "button", "aria-label": c.title + " বড় করে দেখুন" }, [
        img(c.image, c.title, c.title),
        el("h3", { text: c.title }),
        el("p", { text: c.issuer + (c.year ? " · " + c.year : "") })
      ]);
      b.addEventListener("click", () => openLightbox(c.image, c.title));
      grid.appendChild(b);
    });
  }

  // ---------- যোগাযোগ ----------
  function renderContact() {
    const c = D.contact;
    const list = $("contactList");
    const row = (icon, label, valueNode) =>
      el("li", {}, [
        el("span", { class: "ico", "aria-hidden": "true", text: icon }),
        el("div", {}, [el("span", { class: "label", text: label }), valueNode])
      ]);

    if (c.phone) list.appendChild(row("📞", "ফোন", el("a", { href: "tel:" + c.phone.replace(/\s+/g, ""), text: c.phone })));
    if (c.email) list.appendChild(row("✉️", "ইমেইল", el("a", { href: "mailto:" + c.email, text: c.email })));
    if (c.address) {
      const v = c.mapLink
        ? el("a", { href: c.mapLink, target: "_blank", rel: "noopener noreferrer", text: c.address })
        : el("span", { class: "value", text: c.address });
      list.appendChild(row("📍", "ঠিকানা", v));
    }
  }

  // ---------- পপ-আপ (খোলা/বন্ধ) ----------
  let lastFocus = null;
  function openOverlay(node) {
    lastFocus = document.activeElement;
    node.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = node.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
  }
  function closeOverlay(node) {
    node.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll(".overlay").forEach((ov) => {
    ov.addEventListener("click", (e) => {
      if (e.target === ov || e.target.hasAttribute("data-close")) closeOverlay(ov);
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.querySelectorAll(".overlay:not([hidden])").forEach(closeOverlay);
  });

  function openLightbox(src, caption) {
    const li = $("lightboxImg");
    li.onerror = () => { li.onerror = null; li.src = placeholder(caption); };
    li.src = src;
    li.alt = caption || "";
    $("lightboxCaption").textContent = caption || "";
    openOverlay($("lightbox"));
  }

  // ---------- ডার্ক / লাইট মোড ----------
  const THEME_KEY = "portfolio-theme";
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    $("themeIcon").textContent = theme === "dark" ? "☀️" : "🌙";
    $("themeText").textContent = theme === "dark" ? "দিন" : "রাত";
  }
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
    $("themeBtn").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  // ---------- শেয়ার + QR কোড ----------
  let qrMade = false;
  function pageUrl() { return window.location.href.split("#")[0]; }

  function makeQr() {
    const box = $("qrBox");
    const url = pageUrl();
    $("shareLink").textContent = url;
    if (qrMade) return;
    box.textContent = "";
    if (typeof window.QRCode === "function") {
      new window.QRCode(box, { text: url, width: 200, height: 200, colorDark: "#3a2815", colorLight: "#ffffff", correctLevel: window.QRCode.CorrectLevel.M });
      qrMade = true;
    } else {
      box.textContent = "QR কোড তৈরি করতে ইন্টারনেট সংযোগ দরকার।";
    }
  }

  async function copyLink() {
    const url = pageUrl();
    try {
      await navigator.clipboard.writeText(url);
      toast("লিঙ্ক কপি হয়েছে");
    } catch (e) {
      const ta = el("textarea", { "aria-hidden": "true" });
      ta.value = url;
      ta.style.cssText = "position:fixed;opacity:0;";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { /* ignore */ }
      document.body.removeChild(ta);
      toast(ok ? "লিঙ্ক কপি হয়েছে" : "কপি করা যায়নি, লিঙ্কটি হাতে কপি করুন");
    }
  }

  function initShare() {
    $("shareBtn").addEventListener("click", () => {
      makeQr();
      openOverlay($("shareModal"));
    });
    $("copyBtn").addEventListener("click", copyLink);

    if (navigator.share) {
      const nb = $("nativeShareBtn");
      nb.hidden = false;
      nb.addEventListener("click", () => {
        navigator.share({ title: D.name + " | " + D.brand, text: D.tagline, url: pageUrl() }).catch(() => {});
      });
    }
  }

  // ---------- শুরু ----------
  initTheme();
  renderAbout();
  renderHighlights();
  renderGallery();
  renderCertificates();
  renderContact();
  initShare();
})();
