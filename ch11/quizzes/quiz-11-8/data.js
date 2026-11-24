/* Slide quiz 11.8 — Power Series. Built from slides/11.8_Power_Series_answers.pdf
 * (page links open the answers version; its answer key is on p. 8–9). */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  const A = { ans: true };
  const IOC = (page, tags, prompt, opts) => mc(page, tags, prompt, opts, A);

  mc(1, ["power-series", "geometric"], R`Find the sum: $\displaystyle\sum_{n=1}^\infty x^n$.`, [
    ["*$\\dfrac{x}{1-x}$ for $|x| < 1$", "Geometric with first term $x$ and ratio $x$."],
    ["$\\dfrac1{1-x}$ for $|x| < 1$", "That is the sum starting at $n = 0$."],
    ["$\\dfrac{x}{1-x}$ for all $x$", "Geometric series need $|r| < 1$."],
  ], A);
  mc(2, ["power-series", "maclaurin-series", "exponential"], R`Which power series is $e^x$?`, [
    ["*$\\displaystyle\\sum_{n=0}^\\infty\\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\cdots$", ""],
    ["$\\displaystyle\\sum_{n=0}^\\infty(-1)^n\\frac{x^{2n+1}}{(2n+1)!}$", "That is $\\sin x$."],
    ["$\\displaystyle\\sum_{n=0}^\\infty(-1)^n\\frac{x^{2n}}{(2n)!}$", "That is $\\cos x$."],
    ["$\\displaystyle\\sum_{n=0}^\\infty x^n$", R`That is $\frac1{1-x}$.`],
  ], A);
  mc(2, ["power-series", "definitions"], R`In $\displaystyle\sum_{n=0}^\infty c_n(x-a)^n$, what is $a$?`, [
    ["*The center (a constant).", "$c_n$ are the coefficients and $x$ is the variable."],
    ["The radius of convergence.", "That is $R$."],
    ["The $n$th coefficient.", "That is $c_n$."],
  ], A);
  mc(3, ["power-series", "radius-of-convergence", "interval-of-convergence", "theory"], R`For a power series centered at $a$, which is NOT one of the three possibilities?`, [
    ["*It converges on $[a, a + R)$ only, never to the left of the center.", "The interval is always symmetric about $a$ (endpoints aside)."],
    ["It converges only at $x = a$ ($R = 0$).", "Case 1."],
    ["It converges for every real $x$ ($R = \\infty$).", "Case 2."],
    ["It converges for $|x - a| < R$ and diverges for $|x - a| > R$.", "Case 3 — endpoints must be checked."],
  ], A);
  mc(3, ["power-series", "endpoints", "ratio-test"], R`Why must each endpoint be checked separately?`, [
    ["*At $x = a \\pm R$ the Ratio Test limit equals exactly 1, so it is inconclusive there.", "Use the Divergence Test, p-series/comparison, or the AST at the endpoints."],
    ["Because the series always diverges at the endpoints.", "It may converge at both, one, or neither."],
    ["Because the radius might be wrong.", "The radius is settled; only the endpoint behavior is unknown."],
  ], A);
  num(4, ["power-series", "radius-of-convergence"], R`Example 1: $\displaystyle\sum_{n=0}^\infty\frac{(x-4)^n}{n+3}$. Enter the radius $R$.`, 1, "$R = 1$ (center 4)",
    R`$\lim\left(\dfrac{n+3}{n+4}\right)|x - 4| = |x - 4| < 1$.`, A);
  IOC(4, ["power-series", "interval-of-convergence", "endpoints", "harmonic", "alternating-series"], R`Example 1: interval of convergence of $\displaystyle\sum_{n=0}^\infty\frac{(x-4)^n}{n+3}$?`, [
    ["*$[3, 5)$", R`$x = 5$: $\sum\frac1{n+3}$ diverges (LCT with $\frac1n$). $x = 3$: $\sum\frac{(-1)^n}{n+3}$ converges (AST).`],
    ["$(3, 5)$", "The left endpoint gives a convergent alternating series."],
    ["$(3, 5]$", "Flipped: $x = 5$ gives the harmonic-like series."],
    ["$[3, 5]$", "$x = 5$ diverges."],
  ]);
  mc(5, ["power-series", "interval-of-convergence", "strategy"], R`Strategy for the interval of convergence (p. 5): which order is right?`, [
    ["*Center → Ratio Test → solve $|x - a| < R$ → open interval → test both endpoints → final brackets.", "Steps 1–6."],
    ["Test the endpoints first, then use the Ratio Test.", "You need $R$ to know the endpoints."],
    ["Use the Ratio Test and stop at the open interval.", "Step 5 (endpoints) is required."],
  ], A);
  IOC(8, ["power-series", "radius-of-convergence", "factorial"], R`a. $\displaystyle\sum_{n=0}^\infty(2n)!\,(x-1)^n$: center, radius, interval?`, [
    ["*Center 1, $R = 0$, converges only at $x = 1$.", R`$\lim(2n+2)(2n+1)|x - 1| = \infty$ for every $x \ne 1$.`],
    ["Center 1, $R = \\infty$.", "The factorial is in the numerator — it blows up."],
    ["Center $-1$, $R = 0$.", "$(x - 1)$ means center $+1$."],
  ]);
  IOC(8, ["power-series", "interval-of-convergence", "endpoints", "harmonic"], R`b. $\displaystyle\sum_{n=1}^\infty\frac{(x-4)^n}{2^nn}$: center, radius, interval?`, [
    ["*Center 4, $R = 2$, $[2, 6)$", R`Ratio $\to \frac{|x-4|}{2}$. $x = 6$: harmonic diverges. $x = 2$: $\sum\frac{(-1)^n}{n}$ converges (AST).`],
    ["Center 4, $R = 2$, $(2, 6]$", "Flipped endpoints."],
    ["Center 4, $R = \\tfrac12$, $[3.5, 4.5)$", "$|x - 4|/2 < 1$ gives $R = 2$."],
  ]);
  IOC(8, ["power-series", "radius-of-convergence", "factorial", "maclaurin-series"], R`c. $\displaystyle\sum_{n=0}^\infty\frac{x^n}{n!}$: interval?`, [
    ["*$(-\\infty, \\infty)$", R`Ratio $= \frac{|x|}{n+1} \to 0 < 1$ for every $x$. (It is $e^x$.)`],
    ["$(-1, 1)$", "The $n!$ forces convergence everywhere."],
    ["$\\{0\\}$ only", "That would need a factorial in the numerator."],
  ]);
  IOC(8, ["power-series", "interval-of-convergence", "endpoints", "harmonic"], R`d. $\displaystyle\sum_{n=1}^\infty\frac{5^n}{n}x^n$: interval?`, [
    ["*$\\left[-\\tfrac15, \\tfrac15\\right)$", R`Ratio $\to 5|x| < 1$. $x = \frac15$: $\sum\frac1n$ diverges. $x = -\frac15$: $\sum\frac{(-1)^n}{n}$ converges.`],
    ["$(-5, 5)$", R`$5|x| < 1$ means $|x| < \frac15$.`],
    ["$\\left(-\\tfrac15, \\tfrac15\\right]$", "Flipped."],
  ]);
  IOC(9, ["power-series", "interval-of-convergence", "endpoints", "limit-comparison"], R`e. $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n}{(2n-1)2^n}(x-1)^n$: interval?`, [
    ["*$(-1, 3]$", R`Ratio $\to \frac{|x-1|}{2}$, $R = 2$. $x = 3$: $\sum\frac{(-1)^n}{2n-1}$ converges (AST). $x = -1$: terms become $\frac{1}{2n-1}$, diverges (LCT with $\frac1n$).`],
    ["$[-1, 3)$", "Check the signs: at $x = -1$ the $(-1)^n$ and $(-2)^n$ combine to $+2^n$."],
    ["$(-1, 3)$", "$x = 3$ converges."],
  ]);
  IOC(9, ["power-series", "interval-of-convergence", "endpoints", "divergence-test", "product-of-odds"], R`f. $\displaystyle\sum_{n=1}^\infty\frac{n!\,x^n}{1\cdot3\cdot5\cdots(2n-1)}$: interval?`, [
    ["*$(-2, 2)$", R`Ratio $= \frac{n+1}{2n+1}|x| \to \frac{|x|}2$. At $x = \pm2$, $|a_n| = \frac{2\cdot4\cdots(2n)}{1\cdot3\cdots(2n-1)} \ge 1$, so the terms don't approach 0 — both endpoints diverge.`],
    ["$[-2, 2]$", "The endpoint terms have size $\\ge 1$."],
    ["$(-\\tfrac12, \\tfrac12)$", R`Ratio limit is $\frac{|x|}{2}$, so $R = 2$.`],
  ]);

  window.QUIZ = {
    id: "mat231-quiz-11-8", course: "MAT 231", sec: "11.8", title: "Slide quiz 11.8 — Power Series", short: "Power Series",
    deck: "11-8", hw: "hw/hw-11-8/index.html",
    scoring: "Every question is worth 1 point, all or nothing.",
    toolsNote: R`Page tags open the <b>answers</b> version of the 11.8 slides (answer key p. 8–9).`,
    questions: QS,
  };
})();
