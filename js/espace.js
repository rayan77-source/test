(() => {
  /* ==========================================================
     Données d'exemple — remplacez-les par les vôtres
     (équipes et stade fictifs)
     ========================================================== */
  const US = { name: "TOUS UNIS FC", short: "TU", home: true };
  const TEAMS = {
    OSU: { name: "Olympique Sud", short: "OS", color: "#1f5fbf" },
    EDN: { name: "Étoile du Nord", short: "EN", color: "#111111" },
    ASL: { name: "AS Littoral", short: "AL", color: "#e0a100" },
    UCB: { name: "Union Cap Bleu", short: "UC", color: "#0e8a8a" },
    SPV: { name: "Sporting Vallée", short: "SV", color: "#2c8a3a" },
    RCO: { name: "Racing Oasis", short: "RO", color: "#7a3fb0" },
    JSM: { name: "Jeunesse Montagne", short: "JM", color: "#b3541e" },
  };

  const MATCHES = [
    { id: 1, opp: "OSU", date: "2026-10-17T18:00", price: 50, venue: "Stade Municipal", comp: "cup" },
    { id: 2, opp: "EDN", date: "2026-10-25T16:00", price: 30, venue: "Stade Municipal", comp: "league" },
    { id: 3, opp: "ASL", date: "2026-11-08T15:00", price: 20, venue: "Stade du Littoral", comp: "league", away: true },
    { id: 4, opp: "UCB", date: "2026-11-22T19:30", price: 30, venue: "Stade Municipal", comp: "league" },
    { id: 5, opp: "SPV", date: "2026-09-20T17:00", price: 10, venue: "Stade Municipal", comp: "league", score: [2, 0] },
    { id: 6, opp: "RCO", date: "2026-09-06T18:00", price: 15, venue: "Stade Oasis", comp: "league", away: true, score: [1, 1] },
  ];

  const PROJECTS = [
    { key: "p1", raised: 180000, goal: 180000 },
    { key: "p2", raised: 95000, goal: 150000 },
    { key: "p3", raised: 42000, goal: 120000 },
    { key: "p4", raised: 1250000, goal: 2000000 },
  ];

  // [équipe, J, G, N, P, BP, BC]
  const STANDINGS = [
    ["US", 8, 6, 1, 1, 15, 5], ["EDN", 8, 5, 2, 1, 12, 6], ["OSU", 8, 5, 1, 2, 13, 8],
    ["SPV", 8, 4, 2, 2, 10, 9], ["RCO", 8, 3, 3, 2, 9, 8], ["ASL", 8, 2, 2, 4, 7, 11],
    ["UCB", 8, 1, 3, 4, 6, 12], ["JSM", 8, 0, 2, 6, 4, 17],
  ];

  /* ==========================================================
     Traductions
     ========================================================== */
  const I18N = {
    fr: {
      title: "Espace membre — TOUS UNIS",
      demo: "Version de démonstration : aucune donnée n'est envoyée et aucun paiement n'est effectué.",
      "nav.matches": "Matchs", "nav.projects": "Projets", "nav.standings": "Classement",
      "nav.referrals": "Parrainages", "nav.tickets": "Mes tickets", "nav.profile": "Profil", "nav.back": "Retour au site",
      "matches.title": "Matchs à venir", "matches.lead": "Soutiens ton équipe, à domicile comme à l'extérieur.",
      "tabs.all": "Tous les matchs", "tabs.upcoming": "À venir", "tabs.finished": "Terminés",
      book: "Réserver", bookFor: "Réserver ({price} TND)", perTicket: "par billet", finished: "Terminé",
      football: "Football", cat: "Hommes • Senior", cup: "Coupe", league: "Championnat",
      noMatch: "Aucun match dans cette catégorie.",
      "projects.title": "Projets", "projects.lead": "Les projets financés par les membres, en toute transparence.",
      p1: "Pelouse hybride", p2: "Bourses académie", p3: "Salle de récupération", p4: "Nouveau centre de formation",
      funded: "financé", done: "Réalisé", ongoing: "En cours",
      "standings.title": "Classement", "standings.lead": "Classement du championnat (données d'exemple).",
      "standings.team": "Équipe", "standings.diff": "Diff.",
      "standings.p": "J", "standings.w": "G", "standings.d": "N", "standings.l": "P",
      "ref.title": "Parrainages", "ref.lead": "Invite tes amis à rejoindre le mouvement et débloque des récompenses.",
      "ref.yourCode": "Ton code de parrainage", "ref.copy": "Copier le lien", "ref.copied": "Lien copié !",
      "ref.rewards": "Récompenses", "ref.r1": "filleuls : sticker pack collector",
      "ref.r2": "filleuls : écharpe du mouvement", "ref.r3": "filleuls : passage en formule Légende",
      "ref.count": "Filleuls inscrits",
      "tickets.title": "Mes tickets", "tickets.lead": "Tes réservations apparaissent ici.",
      noTicket: "Aucune réservation pour l'instant. Choisis un match dans l'onglet Matchs.",
      seats: "place(s)", cancelTicket: "Annuler la réservation",
      "profile.title": "Profil", "profile.name": "Nom complet", "profile.email": "E-mail",
      "profile.phone": "Téléphone", "profile.tier": "Formule", "profile.save": "Enregistrer", saved: "Profil enregistré.",
      "book.title": "Réserver des places", "book.qty": "Nombre de places", "book.total": "Total",
      "book.demo": "Démo : la réservation est enregistrée uniquement dans ce navigateur, sans paiement.",
      "book.cancel": "Annuler", "book.confirm": "Confirmer",
    },
    en: {
      title: "Member area — TOUS UNIS",
      demo: "Demo version: no data is sent and no payment is taken.",
      "nav.matches": "Matches", "nav.projects": "Projects", "nav.standings": "Standings",
      "nav.referrals": "Referrals", "nav.tickets": "My tickets", "nav.profile": "Profile", "nav.back": "Back to site",
      "matches.title": "Upcoming matches", "matches.lead": "Back your team, home and away.",
      "tabs.all": "All matches", "tabs.upcoming": "Upcoming", "tabs.finished": "Finished",
      book: "Book", bookFor: "Book ({price} TND)", perTicket: "per ticket", finished: "Finished",
      football: "Football", cat: "Men • Senior", cup: "Cup", league: "League",
      noMatch: "No matches in this category.",
      "projects.title": "Projects", "projects.lead": "Projects funded by members, fully transparent.",
      p1: "Hybrid pitch", p2: "Academy scholarships", p3: "Recovery room", p4: "New training academy",
      funded: "funded", done: "Completed", ongoing: "In progress",
      "standings.title": "Standings", "standings.lead": "League table (sample data).",
      "standings.team": "Team", "standings.diff": "GD",
      "standings.p": "P", "standings.w": "W", "standings.d": "D", "standings.l": "L",
      "ref.title": "Referrals", "ref.lead": "Invite your friends to join the movement and unlock rewards.",
      "ref.yourCode": "Your referral code", "ref.copy": "Copy link", "ref.copied": "Link copied!",
      "ref.rewards": "Rewards", "ref.r1": "referrals: collector sticker pack",
      "ref.r2": "referrals: movement scarf", "ref.r3": "referrals: upgrade to Legend plan",
      "ref.count": "Referred members",
      "tickets.title": "My tickets", "tickets.lead": "Your bookings show up here.",
      noTicket: "No bookings yet. Pick a match in the Matches tab.",
      seats: "seat(s)", cancelTicket: "Cancel booking",
      "profile.title": "Profile", "profile.name": "Full name", "profile.email": "Email",
      "profile.phone": "Phone", "profile.tier": "Plan", "profile.save": "Save", saved: "Profile saved.",
      "book.title": "Book seats", "book.qty": "Number of seats", "book.total": "Total",
      "book.demo": "Demo: the booking is only stored in this browser, no payment is taken.",
      "book.cancel": "Cancel", "book.confirm": "Confirm",
    },
  };

  /* ==========================================================
     Utilitaires
     ========================================================== */
  const $ = (s) => document.querySelector(s);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let lang = "fr";
  try { lang = localStorage.getItem("tousunis-lang") || ((navigator.language || "fr").startsWith("en") ? "en" : "fr"); } catch (e) { /* ignore */ }
  const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.fr[k] || k;
  const locale = () => (lang === "fr" ? "fr-FR" : "en-GB");
  const num = (n) => new Intl.NumberFormat(locale()).format(n);
  const fmtDate = (iso, withTime) =>
    new Intl.DateTimeFormat(locale(), {
      weekday: "short", day: "numeric", month: "short", ...(withTime ? { hour: "2-digit", minute: "2-digit" } : { year: "numeric" }),
    }).format(new Date(iso));

  const now = new Date();
  const isFinished = (m) => new Date(m.date) < now;
  const team = (code) => (code === "US" ? US : TEAMS[code]);

  // size : "" (grand), "sm" ou "xs"
  const badge = (tm, size = "") =>
    `<span class="badge ${tm.home ? "badge--home" : ""} ${size ? "badge--" + size : ""}" style="${tm.color ? `--c:${tm.color}` : ""}" aria-hidden="true">${tm.short}</span>`;

  // Domicile à gauche, extérieur à droite
  const sides = (m) => (m.away ? [TEAMS[m.opp], US] : [US, TEAMS[m.opp]]);

  /* ==========================================================
     Rendu : matchs
     ========================================================== */
  let filter = "all";

  function renderNext() {
    const next = MATCHES.filter((m) => !isFinished(m)).sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    const box = $("#nextMatch");
    if (!next) { box.hidden = true; return; }
    const [a, b] = sides(next);
    box.hidden = false;
    box.innerHTML = `
      <span class="next__date">${fmtDate(next.date, true)}</span>
      <div class="next__teams">
        <div class="team">${badge(a)}<span>${a.name}</span></div>
        <span class="next__vs">VS</span>
        <div class="team">${badge(b)}<span>${b.name}</span></div>
      </div>
      <button class="btn" data-book="${next.id}">🎟️ ${t("bookFor").replace("{price}", next.price)}</button>`;
  }

  function renderMatches() {
    const list = MATCHES
      .filter((m) => filter === "all" || (filter === "finished" ? isFinished(m) : !isFinished(m)))
      .sort((a, b) => (isFinished(a) - isFinished(b)) || (new Date(a.date) - new Date(b.date)) * (isFinished(a) ? -1 : 1));

    $("#matchList").innerHTML = list.length ? list.map((m) => {
      const [a, b] = sides(m);
      const done = isFinished(m);
      const middle = done && m.score
        ? `<span class="mcard__score">${m.away ? m.score[1] : m.score[0]} – ${m.away ? m.score[0] : m.score[1]}</span>`
        : `<span class="mcard__vs">VS</span>`;
      return `
        <article class="mcard">
          <div class="mcard__teams">${badge(a, "sm")}${middle}${badge(b, "sm")}</div>
          <div class="mcard__row">
            <div class="mcard__meta">
              <span>📅 ${fmtDate(m.date)}</span>
              <span><span class="sport">⚽ ${t("football")}</span> • ${t(m.comp)} • ${t("cat")}</span>
              <span>📍 ${m.venue}</span>
            </div>
            <div class="mcard__price">
              ${done ? `<span class="status">${t("finished")}</span>` : `<b>${m.price} TND</b><small>${t("perTicket")}</small>`}
            </div>
          </div>
          ${done ? "" : `<button class="btn btn--small" data-book="${m.id}">${t("book")}</button>`}
        </article>`;
    }).join("") : `<p class="empty">${t("noMatch")}</p>`;
  }

  document.querySelectorAll(".tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      filter = tab.dataset.filter;
      document.querySelectorAll(".tab").forEach((x) => {
        x.classList.toggle("is-active", x === tab);
        x.setAttribute("aria-selected", x === tab);
      });
      renderMatches();
    })
  );

  /* ==========================================================
     Rendu : projets, classement, parrainage, tickets
     ========================================================== */
  function renderProjects() {
    $("#projectList").innerHTML = PROJECTS.map((p) => {
      const pct = Math.round((p.raised / p.goal) * 100);
      const done = pct >= 100;
      return `
        <article class="mcard">
          <span class="tag ${done ? "tag--done" : ""}" style="justify-self:start">${t(done ? "done" : "ongoing")}</span>
          <h3 style="margin:0">${t(p.key)}</h3>
          <div class="pbar"><i style="width:${Math.min(pct, 100)}%"></i></div>
          <div class="mcard__row muted small"><span><b>${num(p.raised)}</b> / ${num(p.goal)} TND</span><span>${pct} % ${t("funded")}</span></div>
        </article>`;
    }).join("");
  }

  function renderStandings() {
    const rows = STANDINGS
      .map(([c, j, g, n, p, bp, bc]) => ({ c, j, g, n, p, diff: bp - bc, pts: g * 3 + n }))
      .sort((a, b) => b.pts - a.pts || b.diff - a.diff);
    $("#standings tbody").innerHTML = rows.map((r, i) => {
      const tm = team(r.c);
      return `<tr class="${r.c === "US" ? "is-us" : ""}">
        <td>${i + 1}</td>
        <td><span style="display:inline-flex;align-items:center;gap:10px">${badge(tm, "xs")}${tm.name}</span></td>
        <td>${r.j}</td><td>${r.g}</td><td>${r.n}</td><td>${r.p}</td>
        <td>${r.diff > 0 ? "+" : ""}${r.diff}</td><td>${r.pts}</td></tr>`;
    }).join("");
  }

  let refCode = store.get("tu-ref");
  if (!refCode) { refCode = "TU-" + Math.random().toString(36).slice(2, 6).toUpperCase(); store.set("tu-ref", refCode); }
  $("#refCode").textContent = refCode;
  $("#copyRef").addEventListener("click", async () => {
    const link = new URL("index.html?ref=" + refCode, location.href).href;
    try { await navigator.clipboard.writeText(link); } catch (e) { /* presse-papiers indisponible */ }
    $("#copyMsg").textContent = t("ref.copied");
    setTimeout(() => ($("#copyMsg").textContent = ""), 2500);
  });

  let tickets = store.get("tu-tickets", []);
  function renderTickets() {
    const count = $("#ticketCount");
    count.hidden = !tickets.length;
    count.textContent = tickets.length;
    $("#ticketList").innerHTML = tickets.length ? tickets.map((tk) => {
      const m = MATCHES.find((x) => x.id === tk.matchId);
      if (!m) return "";
      const [a, b] = sides(m);
      return `
        <article class="mcard ticket">
          <div class="mcard__teams">${badge(a, "sm")}<span class="mcard__vs">VS</span>${badge(b, "sm")}</div>
          <div class="mcard__meta">
            <strong style="color:var(--black)">${a.name} – ${b.name}</strong>
            <span>📅 ${fmtDate(m.date, true)}</span>
            <span>📍 ${m.venue}</span>
            <span>🎟️ ${tk.qty} ${t("seats")} • ${tk.qty * m.price} TND</span>
          </div>
          <div class="ticket__code">${esc(tk.code)}</div>
          <button class="btn btn--outline" data-cancel="${esc(tk.code)}">${t("cancelTicket")}</button>
        </article>`;
    }).join("") : `<p class="empty">${t("noTicket")}</p>`;
  }

  /* ==========================================================
     Réservation (démo)
     ========================================================== */
  const modal = $("#bookModal");
  let booking = null;

  function updateTotal() {
    $("#bookTotal").textContent = `${$("#bookQty").value * booking.price} TND`;
  }

  document.addEventListener("click", (e) => {
    const bookBtn = e.target.closest("[data-book]");
    if (bookBtn) {
      booking = MATCHES.find((m) => m.id === +bookBtn.dataset.book);
      const [a, b] = sides(booking);
      $("#bookMatch").innerHTML = `${a.name} – ${b.name}<small>${fmtDate(booking.date, true)} • ${booking.venue}</small>`;
      $("#bookQty").value = 1;
      updateTotal();
      if (modal.showModal) modal.showModal(); else modal.setAttribute("open", "");
    }
    const cancelBtn = e.target.closest("[data-cancel]");
    if (cancelBtn) {
      tickets = tickets.filter((tk) => tk.code !== cancelBtn.dataset.cancel);
      store.set("tu-tickets", tickets);
      renderTickets();
    }
  });

  modal.querySelectorAll("[data-step]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const q = $("#bookQty");
      q.value = Math.min(6, Math.max(1, +q.value + +btn.dataset.step));
      updateTotal();
    })
  );
  $("#bookCancel").addEventListener("click", () => modal.close());
  $("#bookForm").addEventListener("submit", () => {
    const code = "TU-" + booking.id + "-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    tickets.unshift({ code, matchId: booking.id, qty: +$("#bookQty").value });
    store.set("tu-tickets", tickets);
    renderTickets();
    location.hash = "#tickets";
  });

  /* ==========================================================
     Profil
     ========================================================== */
  const profileForm = $("#profileForm");
  function renderProfile() {
    const p = store.get("tu-profile", { name: "Supporter", email: "membre@exemple.com", phone: "", tier: "Ultra" });
    $("#userName").textContent = p.name;
    $("#userEmail").textContent = p.email;
    $("#userAvatar").textContent = (p.name.trim()[0] || "S").toUpperCase();
    ["name", "email", "phone", "tier"].forEach((k) => (profileForm.elements[k].value = p[k] || ""));
  }
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!profileForm.checkValidity()) { profileForm.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(profileForm));
    store.set("tu-profile", data);
    renderProfile();
    $("#profileMsg").textContent = t("saved");
    setTimeout(() => ($("#profileMsg").textContent = ""), 2500);
  });

  /* ==========================================================
     Navigation entre les vues (#matchs, #projets, …)
     ========================================================== */
  const side = $("#side"), backdrop = $("#backdrop"), burger = $("#burger");
  const toggleMenu = (open) => {
    side.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
  };
  burger.addEventListener("click", () => toggleMenu(!side.classList.contains("is-open")));
  backdrop.addEventListener("click", () => toggleMenu(false));

  function route() {
    const view = (location.hash || "#matchs").slice(1);
    const target = document.getElementById("view-" + view) ? view : "matchs";
    document.querySelectorAll(".view").forEach((v) => (v.hidden = v.id !== "view-" + target));
    document.querySelectorAll(".side__nav a").forEach((a) => a.classList.toggle("is-active", a.dataset.view === target));
    toggleMenu(false);
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  /* ==========================================================
     Langue
     ========================================================== */
  function setLang(next) {
    lang = I18N[next] ? next : "fr";
    try { localStorage.setItem("tousunis-lang", lang); } catch (e) { /* ignore */ }
    document.documentElement.lang = lang;
    document.title = t("title");
    document.querySelectorAll("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t)));
    document.querySelectorAll(".lang__btn").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.lang === lang);
      b.setAttribute("aria-pressed", b.dataset.lang === lang);
    });
    renderAll();
  }
  document.querySelectorAll(".lang__btn").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  function renderAll() {
    renderNext(); renderMatches(); renderProjects(); renderStandings(); renderTickets();
  }

  renderProfile();
  setLang(lang);
  route();
})();
