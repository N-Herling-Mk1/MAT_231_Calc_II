/* Chapter hub — drives ch<N>/index.html (the page is the same for every chapter; <body data-ch="N"> picks the chapter).
 * Four columns: slide quizzes | slides | homework | review, problem sets & handouts — all filtered to this chapter.
 * Paths in the records are relative to the chapter folder, which is where this page lives; site pages are one level up. */
(function () {
  const CHN = Number(document.body.dataset.ch);
  const C = window.CH.get(CHN) || { ch: CHN, title: "", sections: "", exam: "", blurb: "" };
  const M0 = window.MANIFEST || { hw: [], quizzes: [] };
  const M = { hw: M0.hw.filter((h) => h.ch === CHN), quizzes: M0.quizzes.filter((q) => q.ch === CHN) };
  const SLIDES = (window.SLIDE_DECKS || []).filter((d) => d.ch === CHN);
  const UP = "../"; // site root

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const tagLinks = (tags) => (tags || []).map((t) => `<a href="${UP}search.html?tag=${encodeURIComponent(t)}" title="Search everything tagged ${esc(t)}">#${esc(t)}</a>`).join("");
  const newTab = (href, what) => `<a class="newtab" href="${href}" target="_blank" rel="noopener" title="Open ${esc(what)} in a new tab" aria-label="Open ${esc(what)} in a new tab">↗</a>`;
  const read = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const pl = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
  const viewer = (key, extra) => `${UP}viewer.html?d=${key}${extra || ""}`;

  function quizProgress(id, total) {
    const s = read("quiz-state:" + id);
    if (!s || !s.answers) return 0;
    const n = Object.values(s.answers).filter((a) => Array.isArray(a) ? a.length : a && typeof a === "object" ? Object.values(a).some(Boolean) : a !== null && a !== "").length;
    return Math.min(n, total);
  }
  function hwProgress(id) {
    const s = read("hw-state:" + id);
    const m = s && s.marks ? Object.values(s.marks) : [];
    return { ok: m.filter((x) => x === "ok").length, rv: m.filter((x) => x === "review").length };
  }
  function card(box, html, cls) { const c = document.createElement("div"); c.className = "card " + (cls || ""); c.innerHTML = html; document.getElementById(box).appendChild(c); }

  // ---- hero: chapter title, chapter switcher
  document.title = `Ch. ${CHN} · ${C.title} · MAT 231`;
  document.getElementById("kicker").textContent = `MAT 231 · Calculus II · Chapter ${CHN}`;
  document.getElementById("ch-title").innerHTML = `Ch. ${CHN} <b>//</b> ${esc(C.title)}`;
  document.getElementById("ch-blurb").textContent = `${C.blurb} Sections ${C.sections}${C.exam ? ` · ${C.exam}` : ""}.`;
  document.getElementById("ch-tabs").innerHTML = `<a href="${UP}index.html">All chapters</a>` +
    window.CHAPTERS.map((c) => c.ch === CHN ? `<span class="on" aria-current="page">Ch. ${c.ch} · ${esc(c.title)}</span>` : `<a href="${UP}${c.dir}/index.html">Ch. ${c.ch} · ${esc(c.title)}</a>`).join("");

  // the search box on a chapter hub searches that chapter (the search page can widen it to all chapters)
  const form = document.querySelector(".topnav .searchbox");
  if (form) { const h = document.createElement("input"); h.type = "hidden"; h.name = "ch"; h.value = String(CHN); form.appendChild(h); form.querySelector("input[type=search]").placeholder = `search Ch. ${CHN}: keywords or #tag`; }

  const deckOf = (key) => SLIDES.find((d) => d.key === key);
  const problemsFor = (key) => SLIDES.filter((d) => d.kind === "problems" && d.deck === key);

  // slide quizzes (generated from the decks)
  M.quizzes.filter((q) => q.kind === "quiz").forEach((q) => {
    const done = quizProgress(q.id, q.total), pct = Math.round((100 * done) / q.total);
    const d = deckOf(q.deck);
    card("quizzes", `<span class="chap-row"><span class="chap">${esc(q.sec)}</span>${d ? `<a class="dl" href="${viewer(d.key)}" title="Open the slides this quiz was built from">Slides →</a>` : ""}</span>
      <span class="title">${esc(q.title)}</span><span class="topics">${tagLinks(q.topics)}</span>
      <span class="meta">${q.total} questions</span>
      ${done ? `<span class="prog"><i style="width:${pct}%"></i></span><span class="prog-text">${done} / ${q.total} answered</span>` : ""}
      <span class="actions"><a class="go" href="${q.href}">${done ? (done === q.total ? "Review" : "Continue") : "Start quiz"} →</a>${newTab(q.href, q.sec + " quiz")}</span>`);
  });
  // slide decks, as is
  SLIDES.filter((d) => d.kind === "deck").forEach((d) => {
    const view = viewer(d.key);
    const ps = problemsFor(d.key)[0];
    card("slides", `<span class="chap-row"><span class="chap">${esc(d.sec)}</span>${d.quiz ? `<a class="dl" href="${d.quiz}" title="Quiz generated from this deck">Quiz →</a>` : ""}</span>
      <span class="title">${esc(d.title)}</span><span class="topics">${tagLinks(d.tags.slice(0, 6))}</span>
      <span class="meta">${d.pages} pages${d.ans ? ` · answers version ${d.ansPages} pages` : ""}</span>
      <span class="actions"><a class="go" href="${view}">View →</a>${newTab(view, d.sec + " slides")}
        <a class="dl" href="slides/${d.file}.pdf" target="_blank" rel="noopener" title="Open the PDF in a new tab">PDF</a>
        ${d.ans ? `<a class="dl ans" href="${viewer(d.key, "&v=ans")}" title="The version with answers filled in">Answers</a>` : ""}
        ${ps ? `<a class="dl ps" href="${viewer(ps.key)}" title="${esc(ps.title)}: the deck's problems with worked solutions">Problems</a>` : ""}</span>`, "slide");
  });
  // homework
  M.hw.forEach((h) => {
    const p = hwProgress(h.id), n = h.problems;
    card("hw", `<span class="chap-row"><span class="chap">${esc(h.sec)}</span>${h.deck ? `<a class="dl" href="${viewer(h.deck)}" title="This section's slides">Slides →</a>` : ""}</span>
      <span class="title">${esc(h.title)}</span><span class="topics">${tagLinks(h.topics.slice(0, 6))}</span>
      <span class="meta">${n} problems · ${h.slots} answer slots</span>
      ${p.ok + p.rv ? `<span class="prog" style="display:flex"><i style="width:${(100 * p.ok) / n}%"></i><i style="width:${(100 * p.rv) / n}%;background:var(--amber);box-shadow:none"></i></span><span class="prog-text">${p.ok} got it · ${p.rv} to review</span>` : ""}
      <span class="actions"><a class="go" href="${h.href}">${p.ok + p.rv ? "Continue" : "Open"} →</a>${newTab(h.href, "HW " + h.sec)}</span>`);
  });
  // review column: problem sets, class quizzes / exam review (with practice quizzes), handouts
  const order = { problems: 0, review: 1, handout: 2 };
  const label = { problems: "problem set", review: "class quiz", handout: "handout" };
  SLIDES.filter((d) => d.kind !== "deck").sort((a, b) => order[a.kind] - order[b.kind]).forEach((d) => {
    const view = viewer(d.key);
    const pdf = `<a class="dl" href="slides/${d.file}.pdf" target="_blank" rel="noopener" title="Open the PDF in a new tab">PDF</a>`;
    if (d.kind === "problems") {
      card("review", `<span class="chap-row"><span class="chap">${esc(d.sec)}</span><span class="meta">${label.problems}</span></span>
        <span class="title">${esc(d.title)}</span><span class="topics">${tagLinks(d.tags.slice(0, 5))}</span>
        <span class="meta">${d.pages} pages · problems p. 1–${d.solPage - 1} · solutions p. ${d.solPage}–${d.pages}</span>
        <span class="actions"><a class="go" href="${view}">Problems →</a>
          <a class="dl ans" href="${viewer(d.key, "#page=" + d.solPage)}" title="Jump to the worked solutions">Solutions</a>${pdf}</span>`, "ps");
      return;
    }
    const q = d.quiz && M.quizzes.find((x) => x.href === d.quiz);
    const done = q ? quizProgress(q.id, q.total) : 0;
    card("review", `<span class="chap-row"><span class="chap">${esc(d.sec)}</span><span class="meta">${label[d.kind] || d.kind}</span></span>
      <span class="title">${esc(d.title)}</span><span class="topics">${tagLinks(d.tags.slice(0, 5))}</span>
      <span class="meta">${d.pages} pages${q ? ` · ${q.total}-question practice quiz` : ""}${done ? ` · ${done} answered` : ""}</span>
      <span class="actions"><a class="go" href="${q ? q.href : view}">${q ? "Practice quiz" : "View"} →</a>
        ${q ? `<a class="dl" href="${view}" title="The original PDF in the viewer">Slides</a>` : newTab(view, d.title)}${pdf}</span>`);
  });

  const nq = M.quizzes.reduce((t, q) => t + q.total, 0), np = M.hw.reduce((t, h) => t + h.problems, 0);
  const answered = M.quizzes.reduce((t, q) => t + quizProgress(q.id, q.total), 0);
  const got = M.hw.reduce((t, h) => t + hwProgress(h.id).ok, 0);
  const decks = SLIDES.filter((d) => d.kind === "deck");
  document.getElementById("quiz-count").textContent = `${M.quizzes.filter((q) => q.kind === "quiz").length} quizzes · graded on the spot`;
  document.getElementById("slide-count").textContent = `${decks.length} decks · ${decks.reduce((t, d) => t + d.pages, 0)} pages · as handed out`;
  document.getElementById("hw-count").textContent = `${M.hw.length} sets · ${np} problems · blind / answers / work`;
  document.getElementById("review-count").textContent = [["problems", "problem set"], ["review", "class quiz"], ["handout", "handout"]].map(([k, w]) => pl(SLIDES.filter((d) => d.kind === k).length, w).replace("quizs", "quizzes")).join(" · ");
  document.getElementById("readout").textContent = `SYS // CH ${CHN} // ${M.quizzes.length} quizzes · ${nq} questions · ${answered} answered here · ${M.hw.length} homework sets · ${np} problems · ${got} marked got-it · ${SLIDES.length} PDFs`;
})();
