/* Slide quiz 11.3 — The Integral Test & Estimate of Sums. Built from slides/decks/11.3_Integral_Test.pdf. */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  const CD = [["*converges", ""], ["diverges", ""]];
  const cv = (yes, why) => [[(yes ? "*" : "") + "converges", why], [(yes ? "" : "*") + "diverges", why]];

  num(2, ["series", "geometric", "split-series"], R`From homework: $\displaystyle\sum_{n=1}^\infty \frac{1 + 6^n}{7^n}$ converges. Enter its sum.`, 37 / 6, R`$\tfrac{37}6$`,
    R`Split: $\sum\left(\tfrac17\right)^n + \sum\left(\tfrac67\right)^n = \dfrac{1/7}{6/7} + \dfrac{6/7}{1/7} = \dfrac16 + 6 = \dfrac{37}6$.`);
  num(2, ["series", "geometric", "repeating-decimal"], R`Write $4.9212121\ldots$ as a fraction. (Type it as a/b.)`, 812 / 165, R`$\tfrac{812}{165}$`,
    R`$4.9 + \dfrac{21/10^3}{1 - 1/100} = \dfrac{49}{10} + \dfrac{21}{990} = \dfrac{4872}{990} = \dfrac{812}{165}$.`);
  mc(3, ["integral-test", "divergence-test", "inconclusive"], R`Does $\displaystyle\sum_{n=1}^\infty\frac{2n}{n^2+1}$ converge? First thought: $\lim \frac{2n}{n^2+1} = 0$. What does that tell you?`, [
    ["*Nothing — the Test for Divergence is inconclusive when the terms go to 0.", "Partial sums (4.52 at 10, 9.03 at 100, 15.0 at 2000) suggest divergence; the Integral Test proves it."],
    ["The series converges.", "Terms → 0 never proves convergence."],
    ["The series diverges.", "Terms → 0 doesn't prove divergence either."],
  ]);
  mc(4, ["integral-test", "improper-integral", "logarithm"], R`Back to the example: use the Integral Test on $\displaystyle\sum_{n=1}^\infty\frac{2n}{n^2+1}$.`, [
    ["*Diverges: $\\displaystyle\\int_1^\\infty\\frac{2x}{x^2+1}dx = \\lim_{t\\to\\infty}\\ln(x^2+1)\\Big|_1^t = \\infty$.", R`$u = x^2 + 1$. $f$ is positive, continuous and decreasing for $x \ge 1$ ($f' = \frac{2(1-x^2)}{(x^2+1)^2} \le 0$).`],
    ["Converges to $\\ln 2$.", R`$\ln 2$ is only the lower-limit value; the upper limit blows up.`],
    ["Converges because it is like $\\frac{2}{n}$ and $2 > 1$.", "Comparable to $2\\sum\\frac1n$, a multiple of the harmonic series — divergent."],
  ]);
  multi(4, ["integral-test", "theory", "conditions"], R`The Integral Test (p. 4). Which statements are true? Select all that apply.`, [
    ["*$f$ must be continuous, positive and decreasing on $[1,\\infty)$ with $a_n = f(n)$.", "The hypotheses."],
    ["*It is enough for $f$ to be <em>ultimately</em> decreasing, and the series may start at an index other than 1.", "Notes on p. 4."],
    ["If both converge, then $\\int_1^\\infty f(x)dx = \\sum a_n$.", R`"We are NOT saying that they are equal." E.g. $\sum\frac1{n^2} = \frac{\pi^2}6$ but $\int_1^\infty\frac{dx}{x^2} = 1$.`],
    ["*If $\\int_1^\\infty f\\,dx$ diverges, then $\\sum a_n$ diverges.", "Series and integral converge or diverge together."],
  ]);
  num(5, ["integral-test", "integration-by-parts", "exponential"], R`Use the Integral Test on $\displaystyle\sum_{n=1}^\infty \frac{n}{e^n}$: enter $\displaystyle\int_1^\infty xe^{-x}\,dx$.`, 2 / Math.E, R`$\tfrac2e \approx 0.736$ (so the series converges)`,
    R`By parts: $\int xe^{-x}dx = -(x+1)e^{-x}$. From 1 to $\infty$: $0 - (-2e^{-1}) = \dfrac2e$. Finite, so the series converges. ($f' = (1-x)e^{-x} \le 0$ for $x \ge 1$.)`);
  mc(6, ["p-series", "geometric"], R`How are $\sum\frac1{n^2}$ and $\sum\frac1{2^n}$ similar, and how are they different?`, [
    ["*Both converge; $\\sum\\frac1{n^2}$ is a p-series (variable base, fixed power) while $\\sum\\frac1{2^n}$ is geometric (fixed base, variable power).", R`p-series: $\sum\frac1{n^p}$; geometric: $\sum ar^{n}$. Only the geometric one has an easy exact sum (here 1).`],
    ["Both are geometric series.", R`$\frac{1/(n+1)^2}{1/n^2}$ is not constant.`],
    ["The first diverges and the second converges.", "$p = 2 > 1$."],
  ]);
  mc(6, ["p-series", "harmonic"], R`The p-series test says $\sum\frac1{n^p}$ converges iff $p > 1$. What does it say about the harmonic series?`, [
    ["*It is the p-series with $p = 1$, so it diverges.", "$p \\le 1$ ⇒ divergence."],
    ["It is the p-series with $p = 1$, so it converges.", "Convergence needs $p > 1$ strictly."],
    ["It is not a p-series.", R`$\frac1n = \frac1{n^1}$.`],
  ]);
  mc(7, ["p-series", "divergent"], R`Mild: $\displaystyle\sum_{n=1}^\infty \frac5{n^{-2}}$`, cv(false, R`$\frac5{n^{-2}} = 5n^2 \to \infty$ (p-series with $p = -2$). Diverges.`));
  mc(7, ["p-series", "divergent"], R`Mild: $\displaystyle\sum_{n=1}^\infty \frac1{\sqrt n}$`, cv(false, R`p-series with $p = \tfrac12 \le 1$.`));
  mc(7, ["p-series"], R`Mild: $\displaystyle\sum_{n=1}^\infty \frac{3n}{2n^3}$`, cv(true, R`$\frac{3n}{2n^3} = \frac32\cdot\frac1{n^2}$: constant times a p-series with $p = 2$.`));
  mc(7, ["integral-test", "logarithm", "divergent"], R`Medium: $\displaystyle\sum_{n=1}^\infty \frac{\ln n}{n}$`, cv(false, R`$\int\frac{\ln x}{x}dx = \frac12(\ln x)^2 \to \infty$ ($f$ decreasing for $x > e$).`));
  mc(7, ["integral-test", "exponential", "u-substitution"], R`Medium: $\displaystyle\sum_{n=1}^\infty n^2e^{-n^3}$`, cv(true, R`$u = x^3$: $\int_1^\infty x^2e^{-x^3}dx = \frac1{3e}$, finite.`));
  mc(7, ["integral-test", "arctan", "u-substitution"], R`Medium: $\displaystyle\sum_{n=1}^\infty \frac{\arctan n}{1+n^2}$`, cv(true, R`$u = \arctan x$: $\int_1^\infty\frac{\arctan x}{1+x^2}dx = \frac{(\arctan x)^2}{2}\Big|_1^\infty = \frac12\left(\frac{\pi^2}4 - \frac{\pi^2}{16}\right) = \frac{3\pi^2}{32}$.`));
  mc(8, ["remainder-estimate", "partial-sums", "integral-test"], R`The remainder $R_n = s - s_n = a_{n+1} + a_{n+2} + \cdots$ satisfies which bounds (p. 8–9)?`, [
    ["*$\\displaystyle\\int_{n+1}^\\infty f(x)dx \\le R_n \\le \\int_n^\\infty f(x)dx$", "Right-endpoint rectangles sit under the curve from $n$; left-endpoint rectangles sit over it from $n+1$."],
    ["$\\displaystyle\\int_n^\\infty f(x)dx \\le R_n \\le \\int_{n+1}^\\infty f(x)dx$", "Backwards: starting the integral later gives the smaller number."],
    ["$R_n = \\displaystyle\\int_n^\\infty f(x)dx$ exactly", "The integral only bounds the remainder."],
    ["$R_n \\le a_{n+1}$", "That is the Alternating Series Estimate (11.5)."],
  ]);
  num(9, ["remainder-estimate", "p-series", "partial-sums"], R`Example: $\sum\frac1{n^4}$ converges ($p = 4$). Enter $s_5$ to six decimals.`, 1.080352, "1.080352",
    R`$1 + \tfrac1{16} + \tfrac1{81} + \tfrac1{256} + \tfrac1{625} = 1.080352$. $R_5 \le \int_5^\infty x^{-4}dx = \frac1{3\cdot5^3} \approx 0.00267$, so $1.08190 \le s \le 1.08302$ (exact: $\pi^4/90 = 1.08232$).`, { tol: 5e-6 });
  num(10, ["remainder-estimate", "p-series"], R`Example 2: $s_6 = \sum_{n=1}^6\frac1{n^2} = \frac{5369}{3600} \approx 1.4914$. Enter the upper bound for the error $R_6$ from $R_n \le \int_n^\infty\frac{dx}{x^2}$.`, 1 / 6, R`$\tfrac16$`,
    R`$\displaystyle\int_6^\infty\frac{dx}{x^2} = \frac16$. (The lower bound is $\int_7^\infty = \tfrac17$.)`);
  mc(10, ["remainder-estimate", "p-series"], R`Estimate $s = \sum\frac1{n^2}$ using $s_6 \approx 1.4914$ and $\tfrac17 \le R_6 \le \tfrac16$.`, [
    ["*$1.6342 \\le s \\le 1.6581$", R`$s_6 + \tfrac17$ to $s_6 + \tfrac16$. The true value $\pi^2/6 \approx 1.6449$ is inside.`],
    ["$1.3248 \\le s \\le 1.3485$", "Subtracted the remainder; $s = s_n + R_n$."],
    ["$s = 1.4914$ exactly", "That is only the partial sum."],
  ]);
  num(11, ["sequence", "limit", "rational"], R`Review for quiz: does $a_n = \dfrac{7 + 3n^2}{n + 7n^2}$ converge? If so, enter the limit.`, 3 / 7, R`$\tfrac37$`,
    R`Equal degrees: ratio of leading coefficients $\tfrac37$.`);
  mc(11, ["series", "geometric", "interval-of-convergence"], R`Review for quiz: for which $x$ does $\displaystyle\sum_{n=0}^\infty 8^nx^n$ converge, and to what?`, [
    ["*$|x| < \\tfrac18$; sum $\\dfrac1{1-8x}$", R`$r = 8x$, first term 1.`],
    ["$|x| < 8$; sum $\\dfrac1{1-8x}$", R`Need $|8x| < 1$.`],
    ["$|x| < \\tfrac18$; sum $\\dfrac{8x}{1-8x}$", R`The series starts at $n = 0$, so the first term is 1.`],
  ]);
  multi(12, ["series", "divergence-test", "geometric", "harmonic", "theory"], R`Series convergence summary (p. 12). Select all true statements.`, [
    ["*If $\\sum a_n$ converges, then $\\lim a_n = 0$.", ""],
    ["*Geometric $\\sum ar^{n-1}$ has partial sums $s_n = \\dfrac{a(1-r^n)}{1-r}$.", ""],
    ["The harmonic series converges because $\\frac1n \\to 0$.", "It diverges."],
    ["*If $\\lim a_n$ does not exist, $\\sum a_n$ diverges.", "Test for Divergence."],
  ]);

  window.QUIZ = {
    id: "mat231-quiz-11-3", course: "MAT 231", sec: "11.3", title: "Slide quiz 11.3 — Integral Test & Estimate of Sums", short: "Integral Test & Estimate of Sums",
    deck: "11-3", hw: "hw/hw-11-3/index.html",
    scoring: "Every question is worth 1 point. Single-choice and typed answers are all or nothing; select-all questions use right-minus-wrong per option.",
    toolsNote: R`Typed answers accept fractions and expressions (<code>37/6</code>, <code>2/e</code>, <code>1/6</code>).`,
    questions: QS,
  };
})();
