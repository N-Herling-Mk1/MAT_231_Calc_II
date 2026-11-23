/* Slide quiz 11.5 — Alternating Series & Absolute Convergence. Built from slides/decks/11.5_Alternating_Series.pdf
 * (its own answer key is on p. 18). */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  const cd = (yes, why) => [[(yes ? "*" : "") + "Converges", why], [(yes ? "" : "*") + "Diverges", why]];
  const ACD = (k, why) => ["Absolutely convergent", "Conditionally convergent", "Divergent"].map((t, i) => [(i === k ? "*" : "") + t, i === k ? why : ""]);

  num(2, ["alternating-series", "geometric"], R`Wall walk: $\displaystyle\sum_{n=1}^\infty(-1)^{n+1}\frac1{2^{n-1}} = 1 - \tfrac12 + \tfrac14 - \cdots$ Enter the sum.`, 2 / 3, R`$\tfrac23$`,
    R`Geometric with $a = 1$, $r = -\tfrac12$: $\dfrac{1}{1 + 1/2} = \dfrac23$. You settle two-thirds of the way down the hall.`);
  num(2, ["alternating-series", "geometric"], R`How are these different? Enter the sum of $\displaystyle\sum_{n=1}^\infty(-1)^{n-1}\frac1{2^n}$.`, 1 / 3, R`$\tfrac13$`,
    R`$a = \tfrac12$, $r = -\tfrac12$: $\dfrac{1/2}{3/2} = \dfrac13$. Same signs pattern as the first (both start $+$), but every term is half as big — so the sum halves.`);
  multi(3, ["alternating-series", "theory"], R`The Alternating Series Test for $\sum(-1)^{n-1}b_n$: which conditions must hold? Select all that apply.`, [
    ["*$b_n > 0$", "The signs come only from $(-1)^{n-1}$."],
    ["*$b_{n+1} \\le b_n$ (at least for large $n$)", "The steps are shrinking."],
    ["*$\\lim b_n = 0$", "The steps shrink toward zero."],
    ["$\\sum b_n$ converges", "That would be absolute convergence — not required (e.g. $\\sum\\frac{(-1)^n}n$)."],
  ]);
  mc(3, ["alternating-series", "theory"], R`What does the Alternating Series Test give you?`, [
    ["*It confirms convergence but does <b>not</b> give the sum.", "Use the estimation theorem to approximate the sum."],
    ["The sum, $b_1$.", "$s_1 = b_1$ is just the first partial sum."],
    ["Divergence whenever a condition fails.", R`If $b_n \not\to 0$ it diverges by the Test for Divergence, but a failure of "decreasing" alone is inconclusive.`],
  ]);
  mc(3, ["alternating-series"], R`Problem 1.1: $\displaystyle\sum_{n=1}^\infty(-1)^{n-1}\frac{n}{n^2+1}$`, cd(true, R`$b_n = \frac{n}{n^2+1}$ decreases from $n = 1$ ($f' = \frac{1-x^2}{(x^2+1)^2} \le 0$) and $\to 0$.`));
  mc(5, ["alternating-series", "divergence-test"], R`Problem 1.2: $\displaystyle\sum_{n=1}^\infty(-1)^n\frac{2n}{3n+1}$`, cd(false, R`$b_n \to \tfrac23 \ne 0$, so the terms don't approach 0 (Test for Divergence).`));
  mc(6, ["alternating-series", "logarithm"], R`Problem 1.3: $\displaystyle\sum_{n=2}^\infty(-1)^n\frac{1}{n\ln n}$`, cd(true, R`$n\ln n$ increases, so $b_n = \frac1{n\ln n}$ decreases to 0. (It is only conditionally convergent: $\sum\frac1{n\ln n}$ diverges.)`));
  mc(6, ["alternating-series", "exponential", "eventually-decreasing"], R`Problem 1.4 (watch the start): $\displaystyle\sum_{n=1}^\infty(-1)^{n-1}\frac{n^2}{e^n}$`, cd(true, R`$b_1 = 0.368 < b_2 = 0.541$, but $f' = \frac{x(2-x)}{e^x} < 0$ for $x > 2$, so $b_n$ decreases from $n = 2$ on, and $b_n \to 0$. "Eventually decreasing" is enough.`));
  mc(8, ["alternating-series", "exponential"], R`Practice later, Example 1: $\displaystyle\sum(-1)^{n-1}\frac{n}{e^n}$`, cd(true, R`$\lim\frac{n}{e^n} = 0$ and decreasing.`));
  mc(8, ["alternating-series", "factorial", "divergence-test"], R`Example 2: $\displaystyle\sum(-1)^{n-1}n!$`, cd(false, R`$\lim n! \ne 0$.`));
  mc(8, ["alternating-series", "divergence-test"], R`Example 3: $\displaystyle\sum(-1)^{n-1}\frac{n}{n+1}$`, cd(false, R`$\lim\frac{n}{n+1} = 1 \ne 0$.`));
  mc(8, ["alternating-series", "logarithm"], R`Example 4: $\displaystyle\sum_{n=3}^\infty(-1)^{n-1}\frac{\ln n}{n}$`, cd(true, R`$\lim\frac{\ln n}{n} = 0$ and decreasing for $n \ge 3$ ($f' = \frac{1 - \ln x}{x^2} < 0$ for $x > e$), which is why the series starts at 3.`));
  mc(8, ["alternating-series", "logarithm"], R`Example 5: $\displaystyle\sum(-1)^{n-1}\frac{1}{\ln(n+4)}$`, cd(true, R`$\frac1{\ln(n+4)}$ decreases to 0.`));
  mc(8, ["alternating-series", "eventually-decreasing"], R`Example 6: $\displaystyle\sum(-1)^n\frac{n}{\sqrt{n^3+2}}$`, cd(true, R`$b_n \to 0$ and decreasing from $n = 2$ on ($b_1 \approx 0.577$ is smaller than $b_2 \approx 0.632$, but the test only needs "eventually decreasing").`));
  mc(9, ["alternating-series-estimate", "theory"], R`Alternating Series Estimation Theorem: if the AST conditions hold, then…`, [
    ["*$|s - s_n| = |R_n| \\le b_{n+1}$: the error is at most the next term.", "And the sum lies between consecutive partial sums."],
    ["$|R_n| \\le b_n$", "The bound is the first <em>omitted</em> term."],
    ["$|R_n| \\le \\int_n^\\infty f(x)dx$", "That is the integral-test remainder."],
    ["$|R_n| = b_{n+1}$ exactly", "Only an upper bound."],
  ]);
  num(9, ["alternating-series-estimate"], R`Example 1: $\displaystyle\sum(-1)^n\frac1{\sqrt n + 1}$ converges. Enter the error bound for using $s_{15}$.`, 0.2, R`$b_{16} = \tfrac15 = 0.2$`,
    R`$|R_{15}| \le b_{16} = \dfrac1{\sqrt{16} + 1} = \dfrac15$.`);
  num(10, ["alternating-series-estimate"], R`Example 2: for what $n$ is $s_n$ within 0.001 of the sum of $\displaystyle\sum(-1)^{n+1}\frac1{2n+5}$? Enter the smallest $n$.`, 497, "$n = 497$",
    R`Need $b_{n+1} = \dfrac1{2(n+1)+5} = \dfrac1{2n+7} < 0.001 \iff 2n + 7 > 1000 \iff n > 496.5$.`);
  num(11, ["alternating-series-estimate", "p-series"], R`Example 3: approximate $\displaystyle\sum(-1)^{n+1}\frac1{n^3}$ to within 0.005. Enter your approximation (4 decimals).`, 0.9044, R`$s_5 \approx 0.9044$`,
    R`$b_{n+1} = \frac1{(n+1)^3} < 0.005 \iff (n+1)^3 > 200 \iff n + 1 \ge 6$. So use $s_5 = 1 - \tfrac18 + \tfrac1{27} - \tfrac1{64} + \tfrac1{125} = 0.9044$ (error $\le \tfrac1{216} \approx 0.0046$).`, { tol: 6e-4 });
  num(12, ["alternating-series-estimate", "factorial"], R`Problem 2.1: find the smallest $n$ so that $s_n$ approximates $\displaystyle\sum(-1)^{n+1}\frac1{n!}$ within 0.001.`, 6, "$n = 6$ ($s_6 \\approx 0.6319$)",
    R`$b_7 = \frac1{7!} \approx 0.0002 < 0.001$, but $b_6 = \frac1{6!} \approx 0.0014$ is too big. $s_6 = 0.6319$ (true sum $1 - 1/e = 0.6321$). (Answer key p. 18.)`);
  mc(12, ["alternating-series-estimate", "p-series"], R`Problem 2.2: for $\displaystyle\sum(-1)^{n+1}\frac1{n^2}$, $s_4 \approx 0.7986$. Which interval contains the sum?`, [
    ["*$0.7986 < s < 0.8386$", R`Error $\le b_5 = \frac1{25} = 0.04$; the next term is positive, so $s$ is above $s_4$.`],
    ["$0.7586 < s < 0.8386$", R`The sum lies between $s_4$ and $s_5 = s_4 + b_5$ — only one side.`],
    ["$0.7986 < s < 0.8611$", R`Used $b_4 = \tfrac1{16}$ instead of $b_5$.`],
  ]);
  num(13, ["alternating-series-estimate", "geometric"], R`Problem 2.3: approximate $\displaystyle\sum(-1)^{n+1}\frac1{n\cdot2^n}$ to within 0.001. Enter the approximation (4 decimals).`, 0.4058, R`$s_7 \approx 0.4058$`,
    R`$b_8 = \frac1{8\cdot256} = \frac1{2048} \approx 0.0005 < 0.001$, but $b_7 = \frac1{896} \approx 0.0011$ is too big. Use $s_7 = 0.4058$ (true sum $\ln 1.5 = 0.4055$).`, { tol: 6e-4 });
  mc(14, ["absolute-convergence", "conditional-convergence", "definitions"], R`Which pairing is correct?`, [
    ["*Absolute: $\\sum|a_n|$ converges. Conditional: $\\sum a_n$ converges but $\\sum|a_n|$ diverges.", "\"Total distance walked\" finite vs. infinite."],
    ["Absolute: $\\sum a_n$ converges. Conditional: $\\sum|a_n|$ converges.", ""],
    ["A series can be both absolutely and conditionally convergent.", "Never both."],
  ]);
  mc(14, ["absolute-convergence", "test-selection"], R`A good order of attack for classifying $\sum a_n$ (p. 14)?`, [
    ["*Terms → 0? If not, divergent. Then test $\\sum|a_n|$ (p-series, comparison, ratio); if it converges, absolutely convergent. If $\\sum|a_n|$ diverges and the series alternates, try the AST.", ""],
    ["Always start with the Alternating Series Test.", "The AST can't detect absolute convergence."],
    ["Test $\\sum a_n$ with the Integral Test first.", "The Integral Test needs positive terms."],
  ]);
  mc(14, ["absolute-convergence", "conditional-convergence", "p-series"], R`Problem 3.1: $\displaystyle\sum(-1)^{n+1}\frac1{\sqrt n}$ is…`, ACD(1, R`$\sum\frac1{\sqrt n}$ diverges ($p = \tfrac12$), but the AST passes.`));
  mc(15, ["absolute-convergence", "divergence-test"], R`Problem 3.2: $\displaystyle\sum(-1)^n\frac{n^3}{n^3+5}$ is…`, ACD(2, R`Terms approach 1 in size, not 0.`));
  mc(15, ["absolute-convergence", "comparison-test", "trig"], R`Problem 3.3 (not alternating): $\displaystyle\sum\frac{\cos n}{n^2}$ is…`, ACD(0, R`$\left|\frac{\cos n}{n^2}\right| \le \frac1{n^2}$, a convergent p-series. (The AST doesn't apply — the signs are irregular — but absolute convergence settles it.)`));
  mc(17, ["absolute-convergence", "p-series"], R`Examples for later 1: $\displaystyle\sum(-1)^n\frac1{n^4}$ is…`, ACD(0, "p-series with $p = 4$."));
  mc(17, ["absolute-convergence", "divergence-test"], R`Examples for later 2: $\displaystyle\sum(-1)^{n+1}\frac{n^2}{n^2+1}$ is…`, ACD(2, "Terms approach 1 in size."));
  mc(17, ["absolute-convergence", "conditional-convergence", "limit-comparison"], R`Examples for later 3: $\displaystyle\sum(-1)^n\frac{n}{\sqrt{n^3+2}}$ is…`, ACD(1, R`$|a_n| \approx \frac1{\sqrt n}$ diverges, but the AST passes.`));
  mc(17, ["absolute-convergence", "comparison-test", "trig"], R`Examples for later 4: $\displaystyle\sum\frac{\sin n + \cos n}{n^3}$ is…`, ACD(0, R`$|\sin n + \cos n| \le 2$, so $|a_n| \le \frac2{n^3}$.`));

  window.QUIZ = {
    id: "mat231-quiz-11-5", course: "MAT 231", sec: "11.5", title: "Slide quiz 11.5 — Alternating Series & Absolute Convergence", short: "Alternating Series & Absolute Convergence",
    deck: "11-5", hw: "hw/hw-11-5/index.html",
    scoring: "Every question is worth 1 point. Single-choice and typed answers are all or nothing; select-all questions use right-minus-wrong per option.",
    toolsNote: R`Typed approximations are accepted within ±0.0006. The deck's own answer key is on p. 18.`,
    questions: QS,
  };
})();
