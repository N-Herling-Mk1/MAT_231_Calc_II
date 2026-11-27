/* Top-level nav buttons, shared by every site page: one button per chapter (from assets/js/chapters.js), then Outline and Search.
 * Fills <span id="nav-chapters"> in the top bar. Load after chapters.js (and slides.js / manifest.js when the page has them,
 * so chapters with nothing loaded yet get the dashed "pending" style).
 *   <body data-root="../">   path from this page to the site root ("" at the root, "../" inside ch<N>/)
 *   <body data-page="ch" data-ch="11">   marks the current button: home | search | outline | ch */
(function () {
  const B = document.body.dataset;
  const ROOT = B.root || "";
  const PAGE = B.page || "";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const M = window.MANIFEST || { hw: [], quizzes: [] };
  const SL = window.SLIDE_DECKS || [];
  const loaded = (n) => SL.some((d) => d.ch === n) || M.hw.some((h) => h.ch === n) || M.quizzes.some((q) => q.ch === n);
  window.CH.loaded = loaded;

  const box = document.getElementById("nav-chapters");
  if (!box) return;
  box.classList.add("navbtns");
  const cur = (on) => (on ? ' aria-current="page" class="on"' : "");
  box.innerHTML =
    (window.CHAPTERS || []).map((c) => {
      const on = PAGE === "ch" && Number(B.ch) === c.ch;
      const pend = loaded(c.ch) ? "" : " pending";
      const tip = `Ch. ${c.ch} · ${c.title}${pend ? " — not loaded yet" : ""}`;
      return `<a href="${ROOT}${c.dir}/index.html" title="${esc(tip)}"${on ? ' aria-current="page"' : ""} class="nb${on ? " on" : ""}${pend}">Ch. ${c.ch}</a>`;
    }).join("") +
    `<span class="nb-sep" aria-hidden="true"></span>` +
    `<a href="${ROOT}outline.html" title="Stewart chapter / section outline" class="nb nb-alt${PAGE === "outline" ? " on" : ""}"${PAGE === "outline" ? ' aria-current="page"' : ""}>Outline</a>` +
    `<a href="${ROOT}search.html" title="Search every chapter" class="nb nb-alt${PAGE === "search" ? " on" : ""}"${PAGE === "search" ? ' aria-current="page"' : ""}>Search</a>`;
})();
