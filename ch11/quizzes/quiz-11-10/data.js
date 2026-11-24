/* Slide quiz 11.10 — Taylor and Maclaurin Series. Built from slides/11.10_Taylor_Maclaurin.pdf (answer key p. 11–12). */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  mc(1, ["power-series-representation", "differentiation-of-series", "radius-of-convergence"], R`From homework: power series for $f(x) = \dfrac{x}{(1+8x)^2}$ and its radius?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty(-8)^n(n+1)x^{n+1}$, $R = \\tfrac18$", R`$\frac1{1+8x} = \sum(-8)^nx^n$; differentiate and divide by $-8$: $\frac1{(1+8x)^2} = \sum(n+1)(-8)^nx^n$; times $x$. Need $|8x| < 1$.`],
    ["$\\displaystyle\\sum(-8)^nx^{n+1}$, $R = \\tfrac18$", R`That is $\frac{x}{1+8x}$ — the square needs the derivative step.`],
    ["$\\displaystyle\\sum(-8)^n(n+1)x^{n+1}$, $R = 8$", R`$|8x| < 1 \iff |x| < \frac18$.`],
  ]);
  mc(3, ["taylor-series", "definitions"], R`If $f$ has a power series at $a$, its coefficients must be…`, [
    ["*$c_n = \\dfrac{f^{(n)}(a)}{n!}$", "The Taylor series; $a = 0$ is the Maclaurin series."],
    ["$c_n = f^{(n)}(a)$", "Missing the $n!$."],
    ["$c_n = \\dfrac{f(a)}{n!}$", "Each coefficient uses a different derivative."],
    ["$c_n = \\dfrac{f^{(n)}(0)}{n}$", "It's $n!$, not $n$."],
  ]);
  mc(11, ["maclaurin-series", "exponential", "radius-of-convergence"], R`Example 1: Maclaurin series for $f(x) = 3^x$?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty\\frac{(\\ln 3)^n}{n!}x^n$, $R = \\infty$", R`Each derivative brings out a factor $\ln 3$: $f^{(n)}(0) = (\ln 3)^n$. Ratio $\frac{|\ln 3||x|}{n+1} \to 0$.`],
    ["$\\displaystyle\\sum\\frac{3^n}{n!}x^n$", R`That is $e^{3x}$.`],
    ["$\\displaystyle\\sum(\\ln 3)^nx^n$, $R = \\tfrac1{\\ln 3}$", "Forgot the $n!$."],
  ]);
  mc(11, ["taylor-series", "radius-of-convergence", "interval-of-convergence"], R`Example 2: Taylor series of $f(x) = \dfrac1x$ about $a = 1$, and its interval?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty(-1)^n(x-1)^n = \\sum(1-x)^n$ on $(0, 2)$, $R = 1$", R`$f^{(n)}(x) = (-1)^nn!\,x^{-n-1}$, so $f^{(n)}(1) = (-1)^nn!$ and $c_n = (-1)^n$. At $x = 0$: $\sum 1^n$; at $x = 2$: $\sum(-1)^n$ — both diverge.`],
    ["$\\displaystyle\\sum(-1)^n x^n$ on $(-1, 1)$", "That is $\\frac1{1+x}$ at $a = 0$."],
    ["$\\displaystyle\\sum(-1)^n(x-1)^n$ on $[0, 2]$", "The endpoints diverge (terms don't go to 0)."],
  ]);
  num(11, ["maclaurin-series", "exponential"], R`Example 3: in the Maclaurin series of $e^{4x}$, the coefficient of $x^n$ is $\frac{4^n}{n!}$. Enter the coefficient of $x^3$.`, 64 / 6, R`$\tfrac{64}{6} = \tfrac{32}3$`,
    R`$f^{(n)}(0) = 4^n$, so $c_3 = \frac{4^3}{3!} = \frac{64}6 = \frac{32}3$.`);
  multi(6, ["maclaurin-series", "table-series", "interval-of-convergence"], R`Basic Maclaurin series table (p. 6). Which intervals of convergence are correct? Select all.`, [
    ["*$\\frac1{1-x}$: $(-1, 1)$", ""],
    ["*$e^x$, $\\sin x$, $\\cos x$: $(-\\infty, \\infty)$", ""],
    ["*$\\ln(1+x)$: $(-1, 1]$", "Converges at $x = 1$ (alternating harmonic), diverges at $x = -1$."],
    ["$\\arctan x$: $(-1, 1)$", "It is $[-1, 1]$ — both endpoints give convergent alternating series."],
    ["*$\\arctan x = \\displaystyle\\sum\\frac{(-1)^nx^{2n+1}}{2n+1}$", ""],
  ]);
  mc(6, ["maclaurin-series", "trig", "table-series"], R`Which is the Maclaurin series for $\cos x$?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots$", "Even powers (cos is even)."],
    ["$\\displaystyle\\sum\\frac{(-1)^nx^{2n+1}}{(2n+1)!}$", "That is $\\sin x$."],
    ["$\\displaystyle\\sum\\frac{(-1)^nx^{2n+1}}{2n+1}$", "That is $\\arctan x$."],
  ]);
  mc(7, ["maclaurin-series", "exponential", "substitution"], R`Useful substitution: $e^{-x^2} = $ ?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n}}{n!}$", R`Replace $x$ by $-x^2$ in $\sum\frac{x^n}{n!}$: $(-x^2)^n = (-1)^nx^{2n}$; the factorial stays $n!$.`],
    ["$\\displaystyle\\sum\\frac{(-1)^nx^{2n}}{(2n)!}$", "That is $\\cos x$ — the factorial does not change with the substitution."],
    ["$\\displaystyle\\sum\\frac{-x^{2n}}{n!}$", R`$(-x^2)^n$ alternates in sign.`],
  ]);
  mc(12, ["taylor-series", "logarithm", "substitution"], R`1(b). Using $\ln(1+x)$ with $x - 1$ substituted: $\ln x = $ ?`, [
    ["*$\\displaystyle\\sum_{n=1}^\\infty\\frac{(-1)^{n-1}}{n}(x-1)^n$", R`$\ln x = \ln(1 + (x-1))$. Differentiating term by term gives back $\frac1x = \sum(-1)^n(x-1)^n$.`],
    ["$\\displaystyle\\sum\\frac{(-1)^{n-1}}{n}x^n$", "That is $\\ln(1+x)$."],
    ["$\\displaystyle\\sum(-1)^n(x-1)^n$", R`That is $\frac1x$, its derivative.`],
  ]);
  mc(12, ["maclaurin-series", "geometric", "substitution"], R`3. Maclaurin series for $\dfrac{x}{1+x^2}$ from $\frac1{1-x} = \sum x^n$?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty(-1)^nx^{2n+1}$, $|x| < 1$", R`Replace $x$ with $-x^2$, then multiply by $x$.`],
    ["$\\displaystyle\\sum(-1)^nx^{2n}$", "Forgot to multiply by $x$."],
    ["$\\displaystyle\\sum x^{2n+1}$", "The ratio is $-x^2$."],
  ]);
  mc(12, ["integration-of-series", "exponential", "logarithm"], R`4. Evaluate $\displaystyle\int\frac{1+e^x}{x}dx$ using a series for the integrand.`, [
    ["*$2\\ln|x| + \\displaystyle\\sum_{n=1}^\\infty\\frac{x^n}{n\\cdot n!} + C$", R`$\frac{1+e^x}{x} = \frac1x + \frac1x\left(1 + \sum_{n\ge1}\frac{x^n}{n!}\right) = \frac2x + \sum_{n\ge1}\frac{x^{n-1}}{n!}$. Integrate term by term.`],
    ["$\\ln|x| + \\displaystyle\\sum_{n=0}^\\infty\\frac{x^n}{n\\cdot n!} + C$", "The constant terms give $\\frac1x + \\frac1x = \\frac2x$; and $n = 0$ would divide by zero."],
    ["$\\displaystyle\\sum\\frac{x^{n+1}}{(n+1)!} + C$", "That integrates $e^x$, not $\\frac{1+e^x}{x}$."],
  ]);
  num(12, ["maclaurin-series", "logarithm", "sum-of-series"], R`5. Find the sum of $\displaystyle\sum_{n=1}^\infty\frac{(-0.5)^n}{n}$ (exact or 4 decimals).`, Math.log(2 / 3), R`$\ln\tfrac23 = -\ln 1.5 \approx -0.4055$`,
    R`$-\ln(1+x) = \sum\frac{(-1)^nx^n}{n} = \sum\frac{(-x)^n}{n}$. With $x = 0.5$ (inside $(-1, 1]$): $-\ln 1.5 = \ln\frac23$.`, { tol: 6e-4 });
  mc(12, ["integration-of-series", "geometric", "definite-integral"], R`6. An infinite series for $\displaystyle\int_0^{1/2}\frac{dx}{1-x^3}$?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty\\frac{1}{(3n+1)2^{3n+1}}$", R`$\frac1{1-x^3} = \sum x^{3n}$; integrate: $\sum\frac{x^{3n+1}}{3n+1}\Big|_0^{1/2}$.`],
    ["$\\displaystyle\\sum\\frac{1}{2^{3n}}$", "Forgot to integrate."],
    ["$\\displaystyle\\sum\\frac{(-1)^n}{(3n+1)2^{3n+1}}$", "The ratio is $+x^3$; no alternating sign."],
  ]);

  window.QUIZ = {
    id: "mat231-quiz-11-10", course: "MAT 231", sec: "11.10", title: "Slide quiz 11.10 — Taylor and Maclaurin Series", short: "Taylor and Maclaurin Series",
    deck: "11-10", hw: "hw/hw-11-10/index.html",
    scoring: "Every question is worth 1 point. Single-choice and typed answers are all or nothing; select-all questions use right-minus-wrong per option.",
    toolsNote: R`Typed answers accept expressions (<code>32/3</code>, <code>ln(2/3)</code>). The deck's answer key is on p. 11–12.`,
    questions: QS,
  };
})();
