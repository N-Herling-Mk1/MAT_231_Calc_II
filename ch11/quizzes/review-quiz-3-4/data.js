/* Practice quiz built from the class "Review Quiz 3.4 — Review for Exam" (slides/Quiz_3.4_Exam_Review.pdf).
 * Every problem of the review sheet, each broken into the decisions the exam grades. */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  const ACD = (k, why) => ["Absolutely convergent", "Conditionally convergent", "Divergent"].map((t, i) => [(i === k ? "*" : "") + t, i === k ? why : ""]);

  num(1, ["series", "geometric", "exam-review"], R`1. Is $\displaystyle\sum_{n=1}^\infty\frac{7^{n+1}}{10^n}$ convergent? Explain why (geometric), and enter its sum.`, 49 / 3, R`$\tfrac{49}3$`,
    R`$\dfrac{7^{n+1}}{10^n} = 7\left(\dfrac7{10}\right)^n$: geometric with $r = \tfrac7{10}$, $|r| < 1$, so it converges. First term ($n = 1$): $a = \tfrac{49}{10}$. Sum $= \dfrac{49/10}{3/10} = \dfrac{49}3$.`);
  mc(1, ["integral-test", "conditions", "exponential", "exam-review"], R`2. Does $\displaystyle\sum_{n=1}^\infty n^2e^{-n^3}$ satisfy the conditions of the Integral Test?`, [
    ["*Yes: $f(x) = x^2e^{-x^3}$ is continuous and positive, and decreasing for $x \\ge 1$ since $f'(x) = xe^{-x^3}(2 - 3x^3) < 0$.", "Show the derivative — the exam asks for proper notation."],
    ["No, because $f$ is not decreasing at $x = 0$.", "Only $[1, \\infty)$ matters."],
    ["No, because the terms are not positive.", "$x^2e^{-x^3} > 0$."],
  ]);
  num(1, ["integral-test", "improper-integral", "u-substitution", "exam-review"], R`2 (cont.). Evaluate $\displaystyle\int_1^\infty x^2e^{-x^3}dx = \lim_{t\to\infty}\int_1^t x^2e^{-x^3}dx$ (exact or decimal).`, 1 / (3 * Math.E), R`$\tfrac1{3e} \approx 0.1226$ — finite, so the series converges`,
    R`$u = x^3$, $du = 3x^2dx$: $\displaystyle\lim_{t\to\infty}\left[-\tfrac13e^{-x^3}\right]_1^t = 0 + \frac1{3e}$.`, { tol: 5e-4 });
  mc(2, ["limit-comparison", "p-series", "exam-review"], R`3. Limit Comparison Test on $\displaystyle\sum_{n=1}^\infty\frac{2n^2+3n}{\sqrt{5+n^5}}$: which $b_n$, what limit, what conclusion?`, [
    ["*$b_n = \\frac1{\\sqrt n}$; $\\lim\\frac{a_n}{b_n} = 2$; diverges", R`Boss terms: $\frac{2n^2}{n^{5/2}} = \frac2{\sqrt n}$. $\frac{(2n^2+3n)\sqrt n}{\sqrt{5+n^5}} = \frac{2 + 3/n}{\sqrt{5/n^5 + 1}} \to 2$. $\sum\frac1{\sqrt n}$ diverges ($p = \tfrac12$).`],
    ["$b_n = \\frac1{n^3}$; limit 2; converges", R`$\sqrt{n^5} = n^{5/2}$, so $\frac{n^2}{n^{5/2}} = n^{-1/2}$.`],
    ["$b_n = \\frac1{\\sqrt n}$; limit 2; converges because $2 > 1$", "In LCT any finite positive limit means \"same fate\"; $\\sum\\frac1{\\sqrt n}$ diverges."],
  ]);
  mc(2, ["alternating-series", "exam-review"], R`4. Alternating Series Test on $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n}{n\,5^n}$.`, [
    ["*$b_n = \\frac1{n5^n}$ is positive, decreasing ($n5^n$ increases) and $\\to 0$: converges.", "It is in fact absolutely convergent ($\\le \\frac1{5^n}$), but the AST is what's asked."],
    ["$b_n \\to 0$ only, so it converges.", "You must also show $b_{n+1} \\le b_n$."],
    ["Diverges: $5^n$ grows.", "It's in the denominator."],
  ]);
  num(3, ["ratio-test", "alternating", "exam-review"], R`5. Ratio Test on $\displaystyle\sum_{n=1}^\infty\frac{n\pi^n}{(-7)^{n-1}}$. Enter $L = \lim\left|\frac{a_{n+1}}{a_n}\right|$.`, Math.PI / 7, R`$\tfrac\pi7 \approx 0.449$ — converges absolutely`,
    R`$\left|\dfrac{(n+1)\pi^{n+1}}{(-7)^n}\cdot\dfrac{(-7)^{n-1}}{n\pi^n}\right| = \dfrac{n+1}{n}\cdot\dfrac\pi7 \to \dfrac\pi7 < 1$.`, { tol: 5e-4 });
  num(3, ["root-test", "exam-review"], R`6. Root Test on $\displaystyle\sum_{n=1}^\infty\left(\frac{2n+3}{3n+2}\right)^n$. Enter $L$.`, 2 / 3, R`$\tfrac23$`, R`$\sqrt[n]{a_n} = \dfrac{2n+3}{3n+2} \to \dfrac23 < 1$.`);
  mc(3, ["root-test", "absolute-convergence", "exam-review"], R`6 (cont.). So $\displaystyle\sum\left(\frac{2n+3}{3n+2}\right)^n$ is…`, ACD(0, "$L < 1$ from the Root Test gives absolute convergence (all terms are positive anyway)."));
  num(4, ["power-series", "radius-of-convergence", "exam-review"], R`7. $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n(x-3)^n}{2n+1}$: enter the radius of convergence. (Center is 3.)`, 1, "$R = 1$", R`Ratio: $\dfrac{2n+1}{2n+3}|x - 3| \to |x - 3| < 1$.`);
  mc(4, ["power-series", "interval-of-convergence", "endpoints", "exam-review"], R`7 (cont.). Interval of convergence of $\displaystyle\sum\frac{(-1)^n(x-3)^n}{2n+1}$?`, [
    ["*$(2, 4]$", R`$x = 4$: $\sum\frac{(-1)^n}{2n+1}$ converges (AST). $x = 2$: $(-1)^n(-1)^n = 1$, giving $\sum\frac1{2n+1}$, which diverges (LCT with $\frac1n$).`],
    ["$[2, 4)$", "Endpoints flipped."],
    ["$(2, 4)$", "$x = 4$ converges."],
    ["$[2, 4]$", "$x = 2$ diverges."],
  ]);
  mc(5, ["power-series-representation", "geometric", "radius-of-convergence", "exam-review"], R`8a. Power series for $f(x) = \dfrac{x}{16+x^2}$ and its radius?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n+1}}{16^{n+1}}$, $R = 4$", R`$\frac{x}{16}\cdot\frac1{1 + x^2/16} = \frac x{16}\sum\left(-\frac{x^2}{16}\right)^n$. Need $x^2 < 16$.`],
    ["$\\displaystyle\\sum\\frac{(-1)^nx^{2n+1}}{16^{n+1}}$, $R = 16$", R`$|x^2/16| < 1 \iff |x| < 4$.`],
    ["$\\displaystyle\\sum\\frac{(-1)^nx^{2n}}{16^{n}}$, $R = 4$", "That is $\\frac{16}{16+x^2}$."],
  ]);
  mc(5, ["power-series-representation", "integration-of-series", "logarithm", "exam-review"], R`8b. Power series for $f(x) = \ln(11 - x)$ and its radius?`, [
    ["*$\\ln 11 - \\displaystyle\\sum_{n=1}^\\infty\\frac{x^n}{n\\,11^n}$, $R = 11$", R`$f' = -\frac1{11-x} = -\sum\frac{x^n}{11^{n+1}}$; integrate and use $f(0) = \ln 11$ for $C$. (Same as HW 11.9 #7 with 11 for 7.)`],
    ["$-\\displaystyle\\sum_{n=1}^\\infty\\frac{x^n}{n\\,11^n}$, $R = 11$", "Forgot $C = \\ln 11$."],
    ["$\\ln 11 + \\displaystyle\\sum\\frac{(-1)^{n}x^n}{n\\,11^n}$, $R = 11$", "All terms are negative: $\\ln(1 - u) = -\\sum\\frac{u^n}{n}$."],
  ]);
  mc(6, ["maclaurin-series", "logarithm", "radius-of-convergence", "exam-review"], R`9. $f(x) = \ln(1 + 3x)$ as a Maclaurin series (definition) and its radius?`, [
    ["*$\\displaystyle\\sum_{n=1}^\\infty\\frac{(-1)^{n-1}3^n}{n}x^n$, $R = \\tfrac13$", R`$f^{(n)}(0) = (-1)^{n-1}(n-1)!\,3^n$, so $c_n = \frac{(-1)^{n-1}3^n}{n}$. Ratio $\to 3|x| < 1$. (Same pattern as HW 11.10 #3 with 3 for 4.)`],
    ["$\\displaystyle\\sum\\frac{(-1)^{n-1}3^n}{n!}x^n$, $R = \\infty$", R`The $(n-1)!$ from the derivatives cancels most of $n!$, leaving $\frac1n$.`],
    ["$\\displaystyle\\sum\\frac{(-1)^{n-1}3^n}{n}x^n$, $R = 3$", R`$|3x| < 1 \iff |x| < \frac13$.`],
  ]);

  window.QUIZ = {
    id: "mat231-review-quiz-3-4", kind: "review", course: "MAT 231", sec: "Quiz 3.4", title: "Practice — Review Quiz 3.4 (Exam 3 review)", short: "Exam 3 review practice",
    deck: "quiz-3-4", deckLabel: "Quiz 3.4 PDF",
    scoring: "Every question is worth 1 point. On the real review quiz, name the test, check its conditions, show the limit, and state the conclusion.",
    toolsNote: R`Typed answers accept expressions (<code>49/3</code>, <code>1/(3e)</code>, <code>pi/7</code>).`,
    questions: QS,
  };
})();
