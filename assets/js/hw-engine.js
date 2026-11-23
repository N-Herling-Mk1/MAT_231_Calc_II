/* Homework engine: renders window.HW (one WebAssign section) with three view modes.
 *   Blind   — the problem only; answer slots are blank (click a blank to reveal just that part)
 *   Answers — the final answer under each part
 *   Work    — the final answer plus the worked solution
 * The original WebAssign screenshots show the submitted (graded) answers, so they are hidden
 * behind a separate "Screenshot" toggle. Each problem also takes a self-mark (Got it / Review),
 * kept in localStorage per set, with a filter to show only the problems marked Review.
 * Deep link: page.html#p12 jumps to problem 12.
 *
 * Data (hw/<set>/data.js):
 *   window.HW = { id, sec, title, deck, quiz, intro, problems: [
 *     { n, tags: [..], src: ["p1_.png"], fig: [{ img, alt }], prompt: "html + $tex$",
 *       parts: [{ l: "a", q: "ask", a: "answer", w: "work" }],   // or a / w directly on the problem
 *       // multiple choice part: { opts: ["...", "..."], key: 2 (or [0, 3] with multi: true) }; a defaults to the letter(s)
 *       w: "work shared by all parts (shown after the parts in Work mode)" } ] }
 */
(function () {
  "use strict";
  const HW = window.HW;
  const $ = (s, el = document) => el.querySelector(s);
  const KEY = "hw-state:" + HW.id;
  let st = { mode: "blind", per: {}, marks: {}, rev: {}, shots: {}, filter: "all" };
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s) st = Object.assign(st, s); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const MODES = [["blind", "Blind"], ["answers", "Answers"], ["work", "Work"]];
  const modeOf = (p) => st.per[p.n] || st.mode;
  const partsOf = (p) => p.parts || [{ l: "", q: "", a: p.a, w: p.w || "", opts: p.opts, key: p.key, multi: p.multi }];
  const root = HW.root || "../../";

  function typeset(node) {
    if (!window.renderMathInElement) return;
    try {
      window.renderMathInElement(node, {
        delimiters: [{ left: "$$", right: "$$", display: true }, { left: "\\[", right: "\\]", display: true }, { left: "$", right: "$", display: false }],
        throwOnError: false,
      });
    } catch (e) {}
  }

  // ---------------- top bar ----------------
  document.title = `${HW.sec} ${HW.title} · Homework · MAT 231`;
  $("#hw-title").textContent = `HW ${HW.sec} · ${HW.title}`;
  if (HW.deck) { const a = $("#deck-link"); a.href = `${root}slides/viewer.html?d=${HW.deck}`; a.hidden = false; a.textContent = `${HW.sec} slides ↗`; }
  if (HW.quiz) { const a = $("#quiz-link"); a.href = root + HW.quiz; a.hidden = false; }
  const seg = $("#mode");
  MODES.forEach(([k, label]) => {
    const b = document.createElement("button");
    b.type = "button"; b.dataset.mode = k; b.textContent = label;
    b.title = { blind: "Hide all answers (click a blank to reveal one part)", answers: "Show final answers", work: "Show answers and worked solutions" }[k];
    b.addEventListener("click", () => { st.mode = k; st.per = {}; st.rev = {}; save(); renderAll(); });
    seg.appendChild(b);
  });
  $("#btn-shots").addEventListener("click", () => {
    const anyOff = HW.problems.some((p) => !st.shots[p.n]);
    HW.problems.forEach((p) => { st.shots[p.n] = anyOff; });
    save(); renderAll();
  });
  $("#btn-filter").addEventListener("click", () => { st.filter = st.filter === "all" ? "review" : "all"; save(); applyFilter(); });
  let armed = 0;
  $("#btn-reset").addEventListener("click", (ev) => {
    const b = ev.currentTarget;
    if (Date.now() - armed < 3000) { st.marks = {}; st.per = {}; st.rev = {}; st.shots = {}; save(); renderAll(); b.textContent = "Reset marks"; armed = 0; return; }
    armed = Date.now(); b.textContent = "Click again to reset";
    setTimeout(() => { if (armed && Date.now() - armed >= 3000) { b.textContent = "Reset marks"; armed = 0; } }, 3100);
  });

  // ---------------- intro ----------------
  const nParts = HW.problems.reduce((t, p) => t + partsOf(p).length, 0);
  $("#hw-intro").innerHTML = `<p><strong>MAT 231 · WebAssign ${HW.sec}</strong> · ${HW.problems.length} problems · ${nParts} answer slots.</p>
    <p><b>Blind</b> hides every answer (click a blank to reveal that one part), <b>Answers</b> shows the final answers, <b>Work</b> adds the worked solution. The buttons on each problem override the page mode for that problem.
    <b>Screenshot</b> shows the original WebAssign capture, which includes the graded submission. Mark each problem <b>Got it</b> or <b>Review</b>; the filter shows only the Review ones.</p>
    ${HW.intro ? `<p>${HW.intro}</p>` : ""}`;

  // ---------------- problems ----------------
  const list = $("#probs");
  const cards = {};
  HW.problems.forEach((p) => {
    const card = document.createElement("section");
    card.className = "prob"; card.id = "p" + p.n;
    cards[p.n] = card;
    list.appendChild(card);
    card.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-act]");
      if (!b) return;
      const act = b.dataset.act;
      if (act === "mode") { st.per[p.n] = b.dataset.mode; partsOf(p).forEach((_, i) => delete st.rev[p.n + "." + i]); }
      else if (act === "reveal") st.rev[p.n + "." + b.dataset.i] = true;
      else if (act === "shots") st.shots[p.n] = !st.shots[p.n];
      else if (act === "ok") st.marks[p.n] = st.marks[p.n] === "ok" ? undefined : "ok";
      else if (act === "review") st.marks[p.n] = st.marks[p.n] === "review" ? undefined : "review";
      save(); render(p); updateSide();
    });
  });

  function render(p) {
    const card = cards[p.n];
    const mode = modeOf(p);
    const mark = st.marks[p.n];
    card.className = "prob" + (mark ? " m-" + mark : "");
    const tags = (p.tags || []).map((t) => `<a class="tag" href="${root}search.html?tag=${encodeURIComponent(t)}" title="Search the site for this tag">#${t}</a>`).join("");
    const modeBtns = MODES.map(([k, label]) => `<button type="button" data-act="mode" data-mode="${k}" class="${mode === k ? "on" : ""}" title="${label} for this problem">${label}</button>`).join("");
    let h = `<div class="prob-head"><h2>Problem ${p.n}</h2><span class="tags">${tags}</span>
      <span class="ctl"><span class="seg small">${modeBtns}</span>
      <button type="button" class="tbtn small${st.shots[p.n] ? " on" : ""}" data-act="shots" title="Original WebAssign screenshot (shows the graded submission)">Screenshot</button>
      <button type="button" class="tbtn small mark-ok${mark === "ok" ? " on" : ""}" data-act="ok" title="Mark as understood">✓ Got it</button>
      <button type="button" class="tbtn small mark-rv${mark === "review" ? " on" : ""}" data-act="review" title="Flag for review">↻ Review</button></span></div>`;
    h += `<div class="prob-body"><div class="prompt">${p.prompt}</div>`;
    if (p.fig && p.fig.length) h += `<div class="fig">${p.fig.map((f) => `<img src="${f.img}" alt="${(f.alt || "").replace(/"/g, "&quot;")}" loading="lazy">`).join("")}</div>`;
    h += `<div class="parts">`;
    partsOf(p).forEach((pt, i) => {
      const shown = mode !== "blind" || st.rev[p.n + "." + i];
      const compact = pt.l && !pt.q && !pt.opts;   // short slot (e.g. "a_3"): label and answer on one row
      h += `<div class="part${compact ? " compact" : ""}">`;
      if (!compact && (pt.l || pt.q)) h += `<div class="ask">${pt.l ? `<span class="lbl">${pt.l}</span>` : ""}<span class="q">${pt.q || ""}</span></div>`;
      // multiple choice: list the options; the keyed option(s) light up once the part is shown
      if (pt.opts) {
        const key = [].concat(pt.key);
        h += `<ol class="optlist${pt.multi ? " multi" : ""}" type="A">${pt.opts.map((o, j) => `<li class="${shown && key.includes(j) ? "key" : ""}">${o}</li>`).join("")}</ol>`;
      }
      const ansText = pt.a !== undefined ? pt.a : pt.opts ? [].concat(pt.key).map((j) => String.fromCharCode(65 + j)).join(", ") : "";
      h += `<div class="ansrow">${compact ? `<span class="lbl">${pt.l}</span>` : `<span class="k">Answer</span>`}${shown ? `<span class="ans">${ansText}</span>` : `<button type="button" class="blank" data-act="reveal" data-i="${i}" title="Reveal this answer">? reveal</button>`}</div>`;
      if (mode === "work" && pt.w) h += `<div class="work"><span class="k">Work</span>${pt.w}</div>`;
      h += `</div>`;
    });
    h += `</div>`;
    if (mode === "work" && p.parts && p.w) h += `<div class="work"><span class="k">Work</span>${p.w}</div>`;
    if (st.shots[p.n]) {
      h += `<div class="shots"><div class="warn">Original WebAssign screenshot${p.src.length > 1 ? "s" : ""} — shows the graded submission.</div>${p.src.map((f) => `<img src="img/${f}" alt="WebAssign screenshot ${f}" loading="lazy">`).join("")}</div>`;
    }
    h += `</div>`;
    card.innerHTML = h;
    typeset(card);
    applyFilterOne(p);
  }

  // ---------------- side map / progress / filter ----------------
  const pmap = $("#pmap");
  HW.problems.forEach((p) => {
    const a = document.createElement("a");
    a.href = "#p" + p.n; a.textContent = p.n; a.dataset.n = p.n;
    pmap.appendChild(a);
  });
  function updateSide() {
    let ok = 0, rv = 0;
    [...pmap.children].forEach((a) => {
      const m = st.marks[a.dataset.n];
      a.className = m || "";
      if (m === "ok") ok++; else if (m === "review") rv++;
    });
    const n = HW.problems.length;
    $("#prog-text").textContent = `${ok} got it · ${rv} review · ${n - ok - rv} open`;
    $("#bar-ok").style.width = (100 * ok) / n + "%";
    $("#bar-rv").style.width = (100 * rv) / n + "%";
    [...seg.children].forEach((b) => b.classList.toggle("on", b.dataset.mode === st.mode && !Object.keys(st.per).length));
    $("#btn-shots").classList.toggle("on", HW.problems.every((p) => st.shots[p.n]));
    $("#btn-filter").classList.toggle("on", st.filter === "review");
    $("#btn-filter").textContent = st.filter === "review" ? "Showing: Review only" : "Show Review only";
  }
  function applyFilterOne(p) { cards[p.n].classList.toggle("hidden-by-filter", st.filter === "review" && st.marks[p.n] !== "review"); }
  function applyFilter() { HW.problems.forEach(applyFilterOne); updateSide(); }
  function renderAll() { HW.problems.forEach(render); updateSide(); }

  renderAll();
  typeset($("#hw-intro"));
  const m = location.hash.match(/^#p(\d+)$/);
  if (m && cards[m[1]]) {
    if (st.filter === "review") { st.filter = "all"; save(); applyFilter(); }
    requestAnimationFrame(() => { cards[m[1]].scrollIntoView({ block: "start" }); cards[m[1]].classList.add("flash"); });
  }
})();
