(() => {
  const STORAGE_KEY = "tousunis-lang";
  let lang = "fr";

  /* ---------- Langue FR / EN ---------- */
  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.fr[key] || key;

  function setLang(next) {
    lang = I18N[next] ? next : "fr";
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll(".lang__btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* stockage indisponible */ }
    renderCounters(true);
  }

  document.querySelectorAll(".lang__btn").forEach((btn) =>
    btn.addEventListener("click", () => setLang(btn.dataset.lang))
  );

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Compteurs animés ---------- */
  const counters = document.querySelectorAll(".counter");
  const format = (n) => new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(n);

  function renderCounters(onlyFinished) {
    counters.forEach((el) => {
      if (onlyFinished && !el.dataset.done) return;
      el.textContent = format(+el.dataset.target) + (el.dataset.suffix || "");
    });
  }

  function animateCounter(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.dataset.done = "1";
    };
    requestAnimationFrame(step);
  }

  /* ---------- Apparition au scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains("counter")) animateCounter(el);
      else el.classList.add("is-visible");
      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal, .goal, .counter").forEach((el) => io.observe(el));

  /* ---------- Choix de formule → pré-remplit le formulaire ---------- */
  const tierSelect = document.getElementById("tierSelect");
  document.querySelectorAll("[data-tier]").forEach((btn) =>
    btn.addEventListener("click", () => { tierSelect.value = btn.dataset.tier; })
  );

  /* ---------- Formulaire (validation côté client) ---------- */
  const form = document.getElementById("joinForm");
  const msg = document.getElementById("formMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("input[required]").forEach((input) => {
      const ok = input.type === "checkbox" ? input.checked : input.checkValidity() && input.value.trim() !== "";
      input.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) { msg.textContent = t("join.error"); return; }

    // TODO : brancher ici un vrai service d'envoi (Formspree, Netlify Forms, API maison…)
    const name = form.firstname.value.trim();
    msg.textContent = t("join.success").replace("{name}", name);
    form.reset();
  });

  /* ---------- Init ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  const browser = (navigator.language || "fr").slice(0, 2);
  setLang(saved || (browser === "en" ? "en" : "fr"));
})();
