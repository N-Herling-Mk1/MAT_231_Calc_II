/* Slide quiz 11.9 — Representations of Functions as Power Series.
 * Built from slides/11.9_Power_Series_Representations_answers.pdf (page links open the answers version). */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  const A = { ans: true };
  const M = (page, tags, prompt, opts) => mc(page, tags, prompt, opts, A);

  M(1, ["power-series", "interval-of-convergence", "endpoints"], R`Warm-up: interval of convergence of $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n}{(2n-1)2^n}(x-1)^n$?`, [
    ["*$(-1, 3]$ (center 1, $R = 2$)", R`Same as 11.8 #e: $x = 3$ gives an alternating series (converges), $x = -1$ gives $\sum\frac1{2n-1}$ (diverges).`],
    ["$[-1, 3)$", "Endpoints flipped."],
    ["$(-1, 3)$", "$x = 3$ converges by the AST."],
  ]);
  M(2, ["power-series-representation", "geometric", "substitution"], R`"Placeholder" idea: $\dfrac1{1 - (\ \cdot\ )} = \sum(\ \cdot\ )^n$ whenever $|\ \cdot\ | < 1$. What is $\dfrac1{1 - x^3}$?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty x^{3n}$ for $|x| < 1$", "Put $x^3$ in the box: $|x^3| < 1 \\iff |x| < 1$."],
    ["$\\displaystyle\\sum_{n=0}^\\infty x^{n+3}$ for $|x| < 1$", "That is $\\frac{x^3}{1-x}$."],
    ["$\\displaystyle\\sum_{n=0}^\\infty 3x^n$ for $|x| < 3$", "Powers multiply: $(x^3)^n = x^{3n}$."],
  ]);
  M(3, ["power-series-representation", "geometric", "substitution"], R`$\dfrac1{1+x}$ as a power series?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty(-1)^nx^n$, $|x| < 1$", R`$\frac1{1 - (-x)}$.`],
    ["$\\displaystyle\\sum_{n=0}^\\infty x^n$", R`That is $\frac1{1-x}$.`],
    ["$\\displaystyle\\sum_{n=0}^\\infty(-1)^{n}x^{n+1}$", R`That is $\frac{x}{1+x}$.`],
  ]);
  M(3, ["power-series-representation", "geometric", "interval-of-convergence"], R`Example 1: $f(x) = \dfrac{3}{1 - 8x^3}$. Series and interval?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty 3\\cdot8^nx^{3n}$, $|x| < \\tfrac12$", R`$|8x^3| < 1 \iff |x^3| < \frac18 \iff |x| < \frac12$.`],
    ["$\\displaystyle\\sum 3\\cdot8^nx^{3n}$, $|x| < \\tfrac18$", R`Take the cube root: $|x|^3 < \frac18$.`],
    ["$\\displaystyle\\sum 3(8x)^{3n}$, $|x| < \\tfrac18$", R`$(8x^3)^n = 8^nx^{3n}$, not $(8x)^{3n}$.`],
  ]);
  M(3, ["power-series-representation", "geometric"], R`Example 2: $f(x) = \dfrac{2x}{1+x^2}$.`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty 2(-1)^nx^{2n+1}$ on $(-1, 1)$", R`$2x\sum(-x^2)^n$. Endpoints are never included for a geometric series.`],
    ["$\\displaystyle\\sum 2(-1)^nx^{2n}$", "Forgot to multiply by $x$."],
    ["$\\displaystyle\\sum 2x^{2n+1}$ on $(-1,1)$", "The ratio is $-x^2$, so the signs alternate."],
  ]);
  M(4, ["power-series-representation", "geometric", "factor-out"], R`3a. $\dfrac1{2-x}$ as a power series, and its interval?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty\\frac12\\left(\\frac x2\\right)^n$ on $(-2, 2)$", R`Factor 2 out of the denominator: $\frac1{2(1 - x/2)}$; need $\left|\frac x2\right| < 1$.`],
    ["$\\displaystyle\\sum(x-1)^n$", R`Can't just write $\frac1{1 - (x - 1)}$ — that is $\frac1{2 - x}$ centered at 1, not 0.`],
    ["$\\displaystyle\\sum 2x^n$ on $(-1, 1)$", "The 2 must be factored out of the denominator, not the numerator."],
  ]);
  M(4, ["power-series-representation", "geometric"], R`3b. $\dfrac{x}{x^4 - 1}$ as a power series?`, [
    ["*$-\\displaystyle\\sum_{n=0}^\\infty x^{4n+1}$, $|x| < 1$", R`$\frac{x}{x^4 - 1} = \frac{-x}{1 - x^4} = -x\sum x^{4n}$.`],
    ["$\\displaystyle\\sum x^{4n+1}$", R`Sign: $x^4 - 1 = -(1 - x^4)$.`],
    ["$-\\displaystyle\\sum(-1)^nx^{4n+1}$", "The ratio is $+x^4$."],
  ]);
  multi(5, ["differentiation-of-series", "integration-of-series", "theory"], R`Term-by-term differentiation and integration (p. 5). Select all true statements.`, [
    ["*$f'$ and $\\int f$ have the same radius of convergence $R$ as $f$.", ""],
    ["*The endpoints $a \\pm R$ must be checked again individually.", "Convergence at an endpoint can be gained or lost."],
    ["Differentiating doubles the radius.", "The radius is unchanged."],
    ["*$\\int\\sum c_n(x-a)^ndx = C + \\sum c_n\\frac{(x-a)^{n+1}}{n+1}$", ""],
  ], A);
  M(5, ["differentiation-of-series"], R`Example 1: $f(x) = \displaystyle\sum_{n=0}^\infty 2^n(x-1)^n$. What is $f'(x)$?`, [
    ["*$\\displaystyle\\sum_{n=1}^\\infty 2^nn(x-1)^{n-1}$", "The $n = 0$ term is a constant, so its derivative drops out and the index starts at 1."],
    ["$\\displaystyle\\sum_{n=0}^\\infty 2^{n-1}(x-1)^{n}$", "Differentiate the power, not the coefficient."],
    ["$\\displaystyle\\sum_{n=0}^\\infty 2^n\\frac{(x-1)^{n+1}}{n+1}$", "That is the antiderivative."],
  ]);
  M(5, ["integration-of-series", "factorial"], R`Example 2: $\displaystyle\int f(x)dx$ where $f(x) = \sum_{n=1}^\infty\frac{(x-3)^n}{n!}$.`, [
    ["*$\\displaystyle\\sum_{n=1}^\\infty\\frac{(x-3)^{n+1}}{(n+1)!} + C$", R`$\frac1{n!}\cdot\frac1{n+1} = \frac1{(n+1)!}$.`],
    ["$\\displaystyle\\sum\\frac{(x-3)^{n-1}}{(n-1)!}$", "That is the derivative."],
    ["$\\displaystyle\\sum\\frac{(x-3)^{n+1}}{n!(n+1)}$ (no $+C$)", "Equal coefficients, but the constant of integration is required."],
  ]);
  M(6, ["power-series-representation", "integration-of-series", "logarithm", "interval-of-convergence"], R`$\ln(1+x^2)$ as a power series (by integrating $\frac{2x}{1+x^2}$) and its interval?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n+2}}{n+1}$ on $[-1, 1]$", R`$C = 0$ from $x = 0$. At $x = \pm1$ the series is $\sum\frac{(-1)^n}{n+1}$, which converges (AST) — integration gained both endpoints.`],
    ["$\\displaystyle\\sum\\frac{(-1)^nx^{2n+2}}{n+1}$ on $(-1, 1)$", "Check the endpoints: both give the alternating harmonic series."],
    ["$\\displaystyle\\sum 2(-1)^nx^{2n+1}$ on $(-1,1)$", "That is the derivative's series."],
  ]);
  M(7, ["power-series-representation", "differentiation-of-series", "interval-of-convergence"], R`$\dfrac1{(1+x)^2}$ from differentiating $\dfrac1{1+x}$. Series and interval?`, [
    ["*$\\displaystyle\\sum_{n=1}^\\infty(-1)^{n+1}nx^{n-1}$ on $(-1, 1)$", R`$\frac{d}{dx}\frac1{1+x} = -\frac1{(1+x)^2}$, so multiply by $-1$. At $x = \pm1$ the terms have size $n \not\to 0$: both diverge.`],
    ["$\\displaystyle\\sum(-1)^nnx^{n-1}$ on $(-1,1)$", "Missed the $-1$ from the derivative."],
    ["$\\displaystyle\\sum(-1)^{n+1}nx^{n-1}$ on $[-1, 1]$", "Endpoint terms don't go to 0."],
  ]);
  M(8, ["integration-of-series", "interval-of-convergence", "endpoints"], R`3a. $\displaystyle\int\frac{dx}{1+x^5}$ as a power series and interval?`, [
    ["*$C + \\displaystyle\\sum_{n=0}^\\infty(-1)^n\\frac{x^{5n+1}}{5n+1}$ on $(-1, 1]$", R`$x = -1$: $\sum\frac{-1}{5n+1}$ diverges (compare with $\frac1{6n}$). $x = 1$: $\sum\frac{(-1)^n}{5n+1}$ converges (AST). $R = 1$.`],
    ["the same series on $[-1, 1]$", "At $x = -1$ every term is negative and like $-\\frac1{5n}$."],
    ["$C + \\displaystyle\\sum(-1)^nx^{5n}$", "That is the integrand, not the integral."],
  ]);
  M(9, ["integration-of-series", "definite-integral"], R`3b. A series for $\displaystyle\int_0^{0.5}\frac{dx}{1+x^5}$?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty(-1)^n\\frac{(0.5)^{5n+1}}{5n+1}$", "Evaluate the antiderivative series at 0.5 and 0 (all terms vanish at 0)."],
    ["$\\displaystyle\\sum(-1)^n(0.5)^{5n}$", "Forgot to integrate."],
    ["$\\displaystyle\\sum\\frac{(0.5)^{5n+1}}{5n+1}$", "Lost the alternating sign."],
  ]);
  num(9, ["differentiation-of-series", "series", "sum-of-series"], R`4. From $\frac1{1-x} = \sum x^n$, find the sum $\displaystyle\sum_{n=1}^\infty n\left(\tfrac13\right)^{n-1}$.`, 9 / 4, R`$\tfrac94$`,
    R`Differentiate: $\sum_{n=1}^\infty nx^{n-1} = \dfrac{1}{(1-x)^2}$. At $x = \tfrac13$: $\dfrac1{(2/3)^2} = \dfrac94$.`, A);

  window.QUIZ = {
    id: "mat231-quiz-11-9", course: "MAT 231", sec: "11.9", title: "Slide quiz 11.9 — Functions as Power Series", short: "Functions as Power Series",
    deck: "11-9", hw: "hw/hw-11-9/index.html",
    scoring: "Every question is worth 1 point. Single-choice and typed answers are all or nothing; select-all questions use right-minus-wrong per option.",
    toolsNote: R`Page tags open the <b>answers</b> version of the 11.9 slides.`,
    questions: QS,
  };
})();
