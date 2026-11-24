/* Chapters of the course — the top layer of the site.
   Each chapter has its own folder (dir) holding its slides, homework and quizzes:
     <dir>/index.html                 the chapter hub (same page for every chapter; only data-ch differs)
     <dir>/slides/<file>.pdf          the instructor's PDFs, as is (plus problem sets)
     <dir>/hw/<set>/                  homework sets      (index.html + data.js + img/)
     <dir>/quizzes/<quiz>/            quizzes            (index.html + data.js)
   Paths inside a chapter's records (slides.js quiz/hw, data.js quiz/hw, manifest href/data) are relative to <dir>/.
   To add a chapter: add an entry here, create <dir>/ from tools/chapter_page_template.html (set data-ch),
   add its PDFs to slides.js with ch: N, then run node tools/build_manifest.js and python3 tools/extract_slide_text.py. */
window.CHAPTERS = [
  { ch: 11, dir: "ch11", title: "Sequences & Series", sections: "11.1 – 11.10", exam: "Exam 3",
    blurb: "Sequences, infinite series and the convergence tests, then power series, Taylor and Maclaurin series." },
];

window.CH = {
  get: (n) => window.CHAPTERS.find((c) => c.ch === Number(n)),
  dir: (n) => { const c = window.CHAPTERS.find((x) => x.ch === Number(n)); return c ? c.dir : "ch" + n; },
};
