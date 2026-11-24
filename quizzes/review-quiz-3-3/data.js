/* Practice quiz built from the class Quiz 3.3 (11.5 & 11.6), slides/decks/Quiz_3.3.pdf.
 * Each of the three problems is broken into the steps the graded quiz expects. */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  const ACD = (k, why) => ["Absolutely convergent", "Conditionally convergent", "Divergent"].map((t, i) => [(i === k ? "*" : "") + t, i === k ? why : ""]);

  mc(1, ["alternating-series"], R`Problem 1: $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n}{4n+1}$. For the Alternating Series Test, what is $b_n$, and do the conditions hold?`, [
    ["*$b_n = \\frac1{4n+1}$; it is positive, decreasing ($4n + 1$ increases) and $\\to 0$, so the series converges.", ""],
    ["$b_n = \\frac{(-1)^n}{4n+1}$; the series converges.", "$b_n$ is the positive part — the sign comes from $(-1)^n$."],
    ["$b_n = \\frac1{4n+1}$; it does not go to 0, so the series diverges.", "$\\frac1{4n+1} \\to 0$."],
  ]);
  mc(1, ["absolute-convergence", "conditional-convergence", "limit-comparison", "harmonic"], R`Problem 1 (cont.): is $\displaystyle\sum\frac{(-1)^n}{4n+1}$ absolutely or conditionally convergent?`, ACD(1, R`$\sum\frac1{4n+1}$ diverges (LCT with $\frac1n$: limit $\frac14$; or integral $\frac14\ln(4x+1) \to \infty$). Converges by AST but not absolutely.`));
  num(2, ["ratio-test", "factorial"], R`Problem 2: ratio test on $\displaystyle\sum\frac{n!}{100^n}$. Simplify $\left|\frac{a_{n+1}}{a_n}\right|$ and enter its value at $n = 199$ (to see the trend).`, 2, "$\\frac{n+1}{100} = 2$ at $n = 199$",
    R`$\dfrac{(n+1)!}{100^{n+1}}\cdot\dfrac{100^n}{n!} = \dfrac{n+1}{100}$. It passes 1 at $n = 99$ and $\to\infty$.`);
  mc(2, ["ratio-test", "factorial", "divergent"], R`Problem 2: so $\displaystyle\sum\frac{n!}{100^n}$ is…`, ACD(2, R`$L = \lim\frac{n+1}{100} = \infty > 1$. (Early terms shrink, but factorials eventually beat $100^n$.)`));
  num(2, ["root-test", "logarithm"], R`Problem 3: root test on $\displaystyle\sum\frac{(-1)^{n-1}}{[\ln n]^n}$. Enter $L = \lim\sqrt[n]{|a_n|}$.`, 0, "$0$",
    R`$\sqrt[n]{\dfrac1{(\ln n)^n}} = \dfrac1{\ln n} \to 0$. (The $n = 1$ term is undefined since $\ln 1 = 0$; start at $n = 2$.)`);
  mc(2, ["root-test", "absolute-convergence"], R`Problem 3: so $\displaystyle\sum\frac{(-1)^{n-1}}{[\ln n]^n}$ is…`, ACD(0, R`$L = 0 < 1$: the Root Test gives absolute convergence directly — no AST needed.`));
  multi(1, ["ratio-test", "root-test", "alternating-series", "theory"], R`Formula sheet check: which statements are right? Select all.`, [
    ["*If $\\lim\\left|\\frac{a_{n+1}}{a_n}\\right| = L < 1$, the series converges absolutely.", ""],
    ["*If $\\lim\\sqrt[n]{|a_n|} = L > 1$, the series diverges.", ""],
    ["If the AST conditions hold, the series converges absolutely.", "Only convergence; check $\\sum|a_n|$ separately."],
    ["*$\\lim\\frac{a_n}{b_n} = c > 0$ means $\\sum a_n$ and $\\sum b_n$ share the same fate.", "Limit Comparison Test."],
  ]);

  window.QUIZ = {
    id: "mat231-review-quiz-3-3", kind: "review", course: "MAT 231", sec: "Quiz 3.3", title: "Practice — Quiz 3.3 (11.5 & 11.6)", short: "Quiz 3.3 practice",
    deck: "quiz-3-3", deckLabel: "Quiz 3.3 PDF",
    scoring: "Every question is worth 1 point. The graded class quiz wants the test named, the limit shown, and the conclusion stated (absolute / conditional / divergent).",
    questions: QS,
  };
})();
