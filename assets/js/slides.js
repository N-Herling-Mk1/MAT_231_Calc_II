/* Lecture slide decks, handouts and problem sets, loaded "as is" (PDFs in ch<N>/slides/).
   Shared by the chapter hubs (ch<N>/index.html), the viewer (viewer.html?d=<key>#page=N) and the search page.
     ch    : chapter number (see assets/js/chapters.js); the PDF is <chapter dir>/slides/<file>.pdf
     kind  : "deck" (section slides) | "handout" (guides / notes) | "review" (quizzes / exam review)
             | "problems" (problem set built from a deck: problems first, solutions from page solPage)
     file  : PDF file name without .pdf;  ans: the version with answers filled in, if there is one
     quiz  : slide quiz for this deck;  hw: homework set for the same section  (both relative to the chapter folder)
     deck  : (problem sets) key of the deck the problems came from
     tags  : search tags (hand-picked, same vocabulary as the quizzes and homework)
   Keys must be unique across all chapters. */
window.SLIDE_DECKS = [
  { ch: 11, key: "11-1", sec: "11.1", kind: "deck", title: "Sequences", file: "11.1_Sequences", pages: 18,
    quiz: "quizzes/quiz-11-1/index.html", hw: "hw/hw-11-1/index.html",
    tags: ["sequence", "general-term", "recursive", "limit", "squeeze-theorem", "monotonic", "bounded", "geometric", "lhopital", "factorial"] },
  { ch: 11, key: "11-2", sec: "11.2", kind: "deck", title: "Series", file: "11.2_Series", pages: 20,
    quiz: "quizzes/quiz-11-2/index.html", hw: "hw/hw-11-2/index.html",
    tags: ["series", "partial-sums", "geometric", "telescoping", "harmonic", "divergence-test", "repeating-decimal"] },
  { ch: 11, key: "ps-11-2", sec: "11.2", kind: "problems", title: "Series — Problem Set", file: "11.2_Series_Problems", pages: 5, solPage: 3,
    deck: "11-2", quiz: "quizzes/quiz-11-2/index.html", hw: "hw/hw-11-2/index.html",
    tags: ["series", "partial-sums", "geometric", "telescoping", "harmonic", "divergence-test", "sequence", "lhopital"] },
  { ch: 11, key: "11-3", sec: "11.3", kind: "deck", title: "The Integral Test & Estimate of Sums", file: "11.3_Integral_Test", pages: 12,
    quiz: "quizzes/quiz-11-3/index.html", hw: "hw/hw-11-3/index.html",
    tags: ["integral-test", "p-series", "improper-integral", "remainder-estimate", "harmonic"] },
  { ch: 11, key: "11-4", sec: "11.4", kind: "deck", title: "The Comparison Tests", file: "11.4_Comparison_Tests", pages: 17,
    quiz: "quizzes/quiz-11-4/index.html", hw: "hw/hw-11-4/index.html",
    tags: ["comparison-test", "direct-comparison", "limit-comparison", "p-series", "geometric"] },
  { ch: 11, key: "11-5", sec: "11.5", kind: "deck", title: "Alternating Series & Absolute Convergence", file: "11.5_Alternating_Series", pages: 18,
    quiz: "quizzes/quiz-11-5/index.html", hw: "hw/hw-11-5/index.html",
    tags: ["alternating-series", "alternating-series-estimate", "absolute-convergence", "conditional-convergence"] },
  { ch: 11, key: "11-6", sec: "11.6", kind: "deck", title: "The Ratio & Root Tests", file: "11.6_Ratio_Root_Tests", pages: 21,
    quiz: "quizzes/quiz-11-6/index.html", hw: "hw/hw-11-6/index.html",
    tags: ["ratio-test", "root-test", "absolute-convergence", "factorial", "inconclusive"] },
  { ch: 11, key: "11-8", sec: "11.8", kind: "deck", title: "Power Series", file: "11.8_Power_Series", pages: 10,
    ans: "11.8_Power_Series_answers", ansPages: 9,
    quiz: "quizzes/quiz-11-8/index.html", hw: "hw/hw-11-8/index.html",
    tags: ["power-series", "radius-of-convergence", "interval-of-convergence", "ratio-test", "endpoints"] },
  { ch: 11, key: "11-9", sec: "11.9", kind: "deck", title: "Representations of Functions as Power Series", file: "11.9_Power_Series_Representations", pages: 13,
    ans: "11.9_Power_Series_Representations_answers", ansPages: 9,
    quiz: "quizzes/quiz-11-9/index.html", hw: "hw/hw-11-9/index.html",
    tags: ["power-series-representation", "geometric", "differentiation-of-series", "integration-of-series", "logarithm", "arctan"] },
  { ch: 11, key: "11-10", sec: "11.10", kind: "deck", title: "Taylor and Maclaurin Series", file: "11.10_Taylor_Maclaurin", pages: 12,
    quiz: "quizzes/quiz-11-10/index.html", hw: "hw/hw-11-10/index.html",
    tags: ["taylor-series", "maclaurin-series", "table-series", "radius-of-convergence", "exponential", "trig"] },
  { ch: 11, key: "quiz-3-4", sec: "Quiz 3.4", kind: "review", title: "Quiz 3.4 — Review for Exam 3", file: "Quiz_3.4_Exam_Review", pages: 6,
    quiz: "quizzes/review-quiz-3-4/index.html",
    tags: ["exam-review", "test-selection", "power-series", "taylor-series", "series"] },
  { ch: 11, key: "quiz-3-3", sec: "Quiz 3.3", kind: "review", title: "Quiz 3.3 (11.5 & 11.6)", file: "Quiz_3.3", pages: 2,
    quiz: "quizzes/review-quiz-3-3/index.html",
    tags: ["alternating-series", "absolute-convergence", "ratio-test", "root-test"] },
  { ch: 11, key: "guide-tests", sec: "Guide", kind: "handout", title: "Convergence Tests Guide", file: "Convergence_Tests_Guide", pages: 7,
    quiz: "quizzes/quiz-tests-guide/index.html",
    tags: ["test-selection", "divergence-test", "integral-test", "comparison-test", "limit-comparison", "alternating-series", "ratio-test", "root-test"] },
  { ch: 11, key: "notes-comparison", sec: "Notes", kind: "handout", title: "Comparison Tests — Teaching Notes", file: "Comparison_Tests_Teaching_Notes", pages: 4,
    quiz: "quizzes/quiz-11-4/index.html",
    tags: ["comparison-test", "direct-comparison", "limit-comparison", "p-series"] },
];
