/* Chapters of the course — the top layer of the site.
   Each chapter has its own folder (dir) holding its slides, homework and quizzes:
     <dir>/index.html                 the chapter hub (same page for every chapter; only data-ch differs)
     <dir>/slides/<file>.pdf          the instructor's PDFs, as is (plus problem sets)
     <dir>/hw/<set>/                  homework sets      (index.html + data.js + img/)
     <dir>/quizzes/<quiz>/            quizzes            (index.html + data.js)
   Paths inside a chapter's records (slides.js quiz/hw, data.js quiz/hw, manifest href/data) are relative to <dir>/.
   To add a chapter: add an entry here, create <dir>/ from tools/chapter_page_template.html (set data-ch),
   add its PDFs to slides.js with ch: N, then run node tools/build_manifest.js and python3 tools/extract_slide_text.py.
   A chapter with no slides, homework or quizzes yet still gets its top-nav button, home card and hub page (marked "not loaded yet");
   its section list comes from assets/js/outline.js (the Stewart table of contents). */
window.CHAPTERS = [
  { ch: 6, dir: "ch6", title: "Inverse Functions", sections: "6.1 – 6.8", exam: "",
    blurb: "Inverse functions and their derivatives, exponentials and logarithms, growth and decay, inverse trig and hyperbolic functions, l'Hospital's Rule." },
  { ch: 7, dir: "ch7", title: "Techniques of Integration", sections: "7.1 – 7.8", exam: "",
    blurb: "Integration by parts, trigonometric integrals and substitution, partial fractions, strategy, approximate and improper integrals." },
  { ch: 8, dir: "ch8", title: "Further Applications of Integration", sections: "8.1 – 8.5", exam: "",
    blurb: "Arc length, area of a surface of revolution, and applications to physics, engineering, economics, biology and probability." },
  { ch: 10, dir: "ch10", title: "Parametric Equations & Polar Coordinates", sections: "10.1 – 10.6", exam: "",
    blurb: "Parametric curves and their calculus, polar coordinates and polar area and length, conic sections." },
  { ch: 11, dir: "ch11", title: "Sequences & Series", sections: "11.1 – 11.10", exam: "Exam 3",
    blurb: "Sequences, infinite series and the convergence tests, then power series, Taylor and Maclaurin series." },
];

window.CH = {
  get: (n) => window.CHAPTERS.find((c) => c.ch === Number(n)),
  dir: (n) => { const c = window.CHAPTERS.find((x) => x.ch === Number(n)); return c ? c.dir : "ch" + n; },
};
