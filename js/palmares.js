/* ==========================================================
   Palmarès — données d'exemple (titres fictifs de TOUS UNIS FC)
   Ajoutez / retirez des années pour mettre à jour les compteurs.
   ========================================================== */
window.Palmares = (() => {
  const DATA = {
    football: [
      { key: "league",      icon: "cup",    years: [1952, 1958, 1964, 1973, 1979, 1990, 1992, 1996, 2008, 2011, 2015, 2022, 2026] },
      { key: "cup",         icon: "tall",   years: [1954, 1961, 1966, 1970, 1976, 1984, 1994, 2000, 2012, 2017, 2024] },
      { key: "supercup",    icon: "slim",   years: [1968, 1980, 1995, 2009, 2016, 2023] },
      { key: "continental", icon: "star",   years: [1991, 2019] },
      { key: "regional",    icon: "shield", years: [1987, 1997, 2010] },
    ],
    basket: [
      { key: "league",      icon: "cup",    years: [1975, 1982, 1988, 1999, 2005, 2013, 2018, 2025] },
      { key: "cup",         icon: "tall",   years: [1979, 1993, 2006, 2014, 2021] },
      { key: "continental", icon: "star",   years: [2007] },
    ],
  };

  // Icônes originales (SVG simples)
  const ICONS = {
    cup:    '<path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 15v2h3v3H8v-3h3v-2a5 5 0 0 1-2.7-3H8a4 4 0 0 1-4-4V5h3V3zm-1 4v1a2 2 0 0 0 2 2V7H6zm12 0h-2v3a2 2 0 0 0 2-2V7z"/>',
    tall:   '<path d="M8 2h8c0 7-1 10-3 11v5h3v4H8v-4h3v-5C9 12 8 9 8 2z"/>',
    slim:   '<path d="M9 2h6l-1 8 2 2-3 1v5h3v4H8v-4h3v-5l-3-1 2-2z"/>',
    star:   '<path d="M12 1l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 14.3 6.8 17l1-5.8L3.6 7.1l5.8-.8zM10 18h4v2h3v3H7v-3h3z"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5zm0 5l-1.5 3H7l2.8 2-1 3.4L12 13.5l3.2 1.9-1-3.4L17 10h-3.5z"/>',
  };

  const now = new Date().getFullYear();
  let sport = "football";
  let year = now;
  let lang = "fr";
  let t = (k) => k;

  const $ = (id) => document.getElementById(id);
  const stats = $("troStats");
  if (!stats) return { render() {} };

  const range = $("troRange"), out = $("troYear"), fill = $("troFill"), all = $("troAll"), allBtn = $("troAllBtn");

  const minYear = () => Math.min(...DATA[sport].flatMap((c) => c.years));
  const countAt = (c, y) => c.years.filter((x) => x <= y).length;

  function renderStats() {
    const comps = DATA[sport];
    const max = Math.max(1, ...comps.map((c) => c.years.length));
    stats.innerHTML = comps.map((c) => {
      const n = countAt(c, year);
      return `
        <li class="tstat">
          <div class="tstat__head">
            <svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[c.icon]}</svg>
            <span class="tstat__num">${n}</span>
          </div>
          <span class="tstat__label">${t("tro." + c.key)}</span>
          <span class="tstat__bar"><i style="width:${(n / max) * 100}%"></i></span>
        </li>`;
    }).join("");
  }

  function renderYear() {
    const lo = minYear();
    range.min = lo; range.max = now; range.value = year;
    out.textContent = year;
    fill.style.width = ((year - lo) / Math.max(1, now - lo)) * 100 + "%";
    $("troPrev").disabled = year <= lo;
    $("troNext").disabled = year >= now;
  }

  function renderAll() {
    allBtn.textContent = t(all.hidden ? "tro.all" : "tro.hide");
    all.innerHTML = DATA[sport].map((c) => `
      <div class="tall">
        <h3>${t("tro." + c.key)} <small>(${c.years.length})</small></h3>
        <div class="tall__years">${c.years.map((y) => `<span class="${y > year ? "is-future" : ""}">${y}</span>`).join("")}</div>
      </div>`).join("");
  }

  function render(l, tr) {
    if (l) lang = l;
    if (tr) t = tr;
    renderStats(); renderYear(); renderAll();
  }

  document.querySelectorAll(".seg__btn").forEach((b) =>
    b.addEventListener("click", () => {
      sport = b.dataset.sport;
      document.querySelectorAll(".seg__btn").forEach((x) => {
        x.classList.toggle("is-active", x === b);
        x.setAttribute("aria-selected", x === b);
      });
      year = now;
      render();
    })
  );
  range.addEventListener("input", () => { year = +range.value; render(); });
  $("troPrev").addEventListener("click", () => { year = Math.max(minYear(), year - 1); render(); });
  $("troNext").addEventListener("click", () => { year = Math.min(now, year + 1); render(); });
  allBtn.addEventListener("click", () => {
    all.hidden = !all.hidden;
    allBtn.setAttribute("aria-expanded", !all.hidden);
    render();
  });

  return { render };
})();

/* Si une photo assets/images/palmares.jpg existe, on masque l'illustration */
(() => {
  const media = document.querySelector(".trophies__media");
  if (!media) return;
  const img = new Image();
  img.onload = () => media.classList.add("has-photo");
  img.src = "assets/images/palmares.jpg";
})();
