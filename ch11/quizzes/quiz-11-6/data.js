/* Slide quiz 11.6 — The Ratio & Root Tests. Built from slides/11.6_Ratio_Root_Tests.pdf (solutions on p. 17–21). */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  const ACD = (k, why) => ["Converges absolutely", "Converges conditionally", "Diverges"].map((t, i) => [(i === k ? "*" : "") + t, i === k ? why : ""]);
  const TEST = ["Ratio Test", "Root Test", "Alternating Series Test", "p-series / comparison"];

  mc(1, ["alternating-series", "divergence-test", "exponential"], R`Warm-up: use the Alternating Series Test on $\displaystyle\sum_{n=1}^\infty(-1)^{n-1}e^{8/n}$.`, [
    ["*Inconclusive: $b_n = e^{8/n} \\to 1 \\ne 0$. (The series diverges by the Test for Divergence.)", "If $\\lim b_n = L \\ne 0$, the AST says nothing; the terms don't shrink to 0, so it diverges."],
    ["Converges, because $e^{8/n}$ is decreasing.", "Decreasing isn't enough — the limit must be 0."],
    ["Converges absolutely.", "The terms don't even approach 0."],
  ]);
  multi(3, ["ratio-test", "theory"], R`Ratio Test, $L = \lim\left|\frac{a_{n+1}}{a_n}\right|$. Select every true statement.`, [
    ["*$L < 1$ ⇒ $\\sum a_n$ converges absolutely.", "Case 1."],
    ["*$L > 1$ or $L = \\infty$ ⇒ $\\sum a_n$ diverges.", "Case 2."],
    ["*$L = 1$ ⇒ inconclusive; try another test.", "Case 3 ☹."],
    ["$L = 1$ ⇒ the series converges conditionally.", R`"Concluding conditionally convergent from these tests" is listed as a common mistake — that needs the AST.`],
  ]);
  num(3, ["ratio-test", "factorial"], R`Example: $\displaystyle\sum\frac{n^2}{n!}$. Enter $L = \lim\left|\frac{a_{n+1}}{a_n}\right|$.`, 0, "$0$ (converges absolutely)",
    R`$\dfrac{(n+1)^2}{(n+1)!}\cdot\dfrac{n!}{n^2} = \dfrac{(n+1)^2}{(n+1)n^2} = \dfrac{n+1}{n^2} \to 0$.`);
  multi(4, ["ratio-test", "factorial", "algebra"], R`Algebra tools for the Ratio Test (p. 4). Which identities are correct? Select all.`, [
    ["*$(n+1)! = (n+1)\\cdot n!$, so $\\frac{n!}{(n+1)!} = \\frac1{n+1}$", ""],
    ["*$(2n+2)! = (2n+2)(2n+1)(2n)!$", "Two new factors, not one."],
    ["$(2n)! = 2\\cdot n!$", "Listed as a common mistake."],
    ["*$\\frac{b^{n+1}}{b^n} = b$", ""],
    ["$(n+1)! = n! + 1$", "Common mistake."],
  ]);
  mc(4, ["ratio-test", "test-selection", "rational"], R`When does the Ratio Test <b>always fail</b> (give $L = 1$)?`, [
    ["*When $a_n$ is a rational function of $n$ or a power of $n$, like $\\frac1{n^2}$ or $\\frac{n+1}{n^3+5}$.", "Use a comparison test or the p-series test for those."],
    ["When $a_n$ contains a factorial.", "Factorials are where the Ratio Test shines."],
    ["When $a_n$ contains $3^n$.", "Exponentials work well."],
    ["When the series alternates.", "The absolute value removes the sign."],
  ]);
  num(6, ["ratio-test"], R`Example 1a: $\displaystyle\sum\frac{n}{4^n}$. Enter $L$.`, 0.25, R`$\tfrac14$ (converges absolutely)`, R`$\dfrac{n+1}{4^{n+1}}\cdot\dfrac{4^n}{n} = \dfrac{n+1}{4n} \to \dfrac14$.`);
  num(6, ["ratio-test", "factorial", "alternating"], R`Example 1b: $\displaystyle\sum\frac{(-4)^n}{n!}$. Enter $L$.`, 0, "$0$ (converges absolutely)", R`$\left|\dfrac{-4}{n+1}\right| \to 0$.`);
  mc(7, ["ratio-test", "inconclusive", "alternating-series", "conditional-convergence"], R`Example 1c: $\displaystyle\sum\frac{(-1)^n}{\sqrt[3]n}$.`, ACD(1, R`Ratio: $\sqrt[3]{\frac{n}{n+1}} \to 1$, inconclusive. $\sum\frac1{n^{1/3}}$ diverges ($p = \tfrac13$), but $b_n = \frac1{\sqrt[3]n}$ decreases to 0, so the AST passes.`));
  num(8, ["root-test", "exponential"], R`Root Test example: $\displaystyle\sum\frac{n}{e^{2n}}$. Enter $L = \lim\sqrt[n]{|a_n|}$.`, Math.exp(-2), R`$\tfrac1{e^2} \approx 0.135$`,
    R`$\dfrac{\sqrt[n]{n}}{e^2} \to \dfrac1{e^2} < 1$ (since $n^{1/n} \to 1$). Converges absolutely.`, { tol: 5e-4 });
  multi(9, ["root-test", "limits"], R`Helpful limits for the Root Test. Select all that are correct.`, [
    ["*$\\lim n^{1/n} = 1$", ""],
    ["*$\\lim\\sqrt[n]{b} = 1$ for any constant $b > 0$", ""],
    ["*$\\lim\\left(1 + \\frac1n\\right)^n = e$", ""],
    ["$\\lim\\sqrt[n]{n^k} = k$", R`$(n^{1/n})^k \to 1^k = 1$.`],
    ["*$\\sqrt[n]{e^{2n}} = e^2$", ""],
  ]);
  mc(9, ["root-test", "test-selection"], R`When does the Root Test work well?`, [
    ["*When $a_n$ is a whole expression raised to the $n$th power, like $\\left(\\frac{2n+1}{3n}\\right)^n$ or $\\frac1{(n+1)^n}$.", "Taking the $n$th root undoes the $n$th power."],
    ["When $a_n$ contains $n!$.", "$\\sqrt[n]{n!}$ is awkward; use the Ratio Test."],
    ["When $a_n$ is a rational function.", "Both tests give $L = 1$ there."],
  ]);
  num(11, ["root-test"], R`Example 2a: $\displaystyle\sum\frac1{(n+1)^n}$. Enter $L$ from the Root Test.`, 0, "$0$", R`$\sqrt[n]{\frac1{(n+1)^n}} = \frac1{n+1} \to 0$. Converges absolutely.`);
  num(11, ["root-test", "divergent"], R`Example 2b: $\displaystyle\sum\frac{3^n}{n^3}$. Enter $L$ from the Root Test.`, 3, "$3$ (diverges)", R`$\dfrac{3}{(n^{1/n})^3} \to \dfrac31 = 3 > 1$.`);
  mc(12, ["root-test", "inconclusive", "alternating-series", "conditional-convergence", "harmonic"], R`Example 2c: $\displaystyle\sum\frac{(-1)^{n+1}}{n}$.`, ACD(1, R`Root Test: $\frac1{n^{1/n}} \to 1$, inconclusive. $\sum\frac1n$ diverges, but the AST passes — the alternating harmonic series.`));
  mc(13, ["test-selection", "ratio-test", "root-test"], R`Choosing between the tests: which test should you try first for $a_{n+1} = \dfrac{2n+1}{5n-1}a_n$?`, TEST.map((t, i) => [(i === 0 ? "*" : "") + t, i === 0 ? "A recursive formula hands you the ratio $a_{n+1}/a_n$ directly." : ""]));
  mc(13, ["test-selection", "root-test"], R`Which test first for $\left(\dfrac{2n+3}{3n-1}\right)^n$?`, TEST.map((t, i) => [(i === 1 ? "*" : "") + t, i === 1 ? "A whole expression to the $n$th power → Root Test." : ""]));
  mc(13, ["test-selection", "p-series"], R`Which test for $\dfrac{n^2+1}{n^3+2}$?`, TEST.map((t, i) => [(i === 3 ? "*" : "") + t, i === 3 ? "Only powers of $n$: Ratio/Root give $L = 1$. LCT with $\\frac1n$ shows it diverges." : ""]));
  mc(13, ["ratio-test", "common-mistakes"], R`Which is listed as a <b>common mistake</b> to avoid?`, [
    ["*Saying the series converges when $L = 1$.", "An inconclusive result means \"try another test\"."],
    ["Taking the absolute value of $\\frac{a_{n+1}}{a_n}$.", "You must take it — forgetting it is the mistake."],
    ["Using the AST to show conditional convergence.", "That is exactly what you should do."],
  ]);

  // Practice problems (p. 14–16) with solutions (p. 17–21)
  num(17, ["ratio-test", "factorial"], R`Problem 1: $\displaystyle\sum\frac{2^n}{n!}$. Enter $L$.`, 0, "$0$ (converges absolutely)", R`$\dfrac{2}{n+1} \to 0$.`);
  mc(17, ["ratio-test", "factorial", "divergent"], R`Problem 2: $\displaystyle\sum\frac{n!}{10^n}$.`, ACD(2, R`$L = \lim\frac{n+1}{10} = \infty$.`));
  num(17, ["ratio-test"], R`Problem 3: $\displaystyle\sum\frac{n^3}{3^n}$. Enter $L$.`, 1 / 3, R`$\tfrac13$ (converges absolutely)`, R`$\dfrac13\left(\dfrac{n+1}{n}\right)^3 \to \dfrac13$.`);
  mc(17, ["ratio-test", "alternating", "divergent"], R`Problem 4: $\displaystyle\sum\frac{(-1)^n5^n}{n\cdot4^n}$.`, ACD(2, R`$L = \frac54\cdot\lim\frac{n}{n+1} = \frac54 > 1$. The terms grow in size, so there is no conditional convergence to check.`));
  num(18, ["ratio-test", "factorial", "divergent"], R`Problem 5: $\displaystyle\sum\frac{(2n)!}{(n!)^2}$. Enter $L$.`, 4, "$4$ (diverges)", R`$\dfrac{(2n+2)(2n+1)}{(n+1)^2} = \dfrac{2(2n+1)}{n+1} \to 4$.`);
  num(18, ["ratio-test", "recursive"], R`Problem 6: $\sum a_n$ with $a_1 = 1$, $a_{n+1} = \dfrac{2n+1}{5n-1}a_n$. Enter $L$.`, 0.4, R`$\tfrac25$ (converges absolutely)`, R`The ratio is given: $\dfrac{2n+1}{5n-1} \to \dfrac25 < 1$. (All terms positive since $a_1 > 0$ and the factor is positive.)`);
  num(18, ["root-test"], R`Problem 7: $\displaystyle\sum\left(\frac{2n+3}{3n-1}\right)^n$. Enter $L$.`, 2 / 3, R`$\tfrac23$ (converges absolutely)`, R`$\sqrt[n]{a_n} = \dfrac{2n+3}{3n-1} \to \dfrac23$.`);
  num(19, ["root-test", "alternating"], R`Problem 8: $\displaystyle\sum\frac{(-2)^n}{n^n}$. Enter $L$.`, 0, "$0$ (converges absolutely)", R`$\sqrt[n]{\frac{2^n}{n^n}} = \frac2n \to 0$.`);
  num(19, ["root-test", "ratio-test"], R`Problem 9: $\displaystyle\sum\frac{n^2}{2^n}$. Enter $L$.`, 0.5, R`$\tfrac12$`, R`$\dfrac{(n^{1/n})^2}{2} \to \dfrac12$. (The Ratio Test gives the same limit.)`);
  num(19, ["root-test", "logarithm"], R`Problem 10: $\displaystyle\sum_{n=2}^\infty\frac1{(\ln n)^n}$. Enter $L$.`, 0, "$0$", R`$\sqrt[n]{a_n} = \dfrac1{\ln n} \to 0$. Converges absolutely.`);
  num(19, ["root-test", "e-limit"], R`Problem 11: $\displaystyle\sum\frac1{3^n}\left(1 + \frac1n\right)^{n^2}$. Enter $L$ (exact or decimal).`, Math.E / 3, R`$\tfrac e3 \approx 0.906$ (converges absolutely)`,
    R`$\sqrt[n]{a_n} = \dfrac13\left(1 + \dfrac1n\right)^{n} \to \dfrac e3 < 1$. Note $\left(\left(1 + \frac1n\right)^{n^2}\right)^{1/n} = \left(1 + \frac1n\right)^n$.`, { tol: 5e-4 });
  num(20, ["ratio-test", "factorial", "e-limit", "divergent"], R`Problem 12: $\displaystyle\sum\frac{n^n}{n!}$. Enter $L$ from the Ratio Test.`, Math.E, R`$e \approx 2.718$ (diverges)`,
    R`$\dfrac{(n+1)^{n+1}}{(n+1)!}\cdot\dfrac{n!}{n^n} = \left(\dfrac{n+1}{n}\right)^n = \left(1 + \dfrac1n\right)^n \to e > 1$.`, { tol: 5e-4 });
  mc(20, ["limit-comparison", "inconclusive", "harmonic"], R`Problem 13: $\displaystyle\sum\frac{n^2+1}{n^3+2}$.`, ACD(2, R`Ratio Test: $L = 1$ (rational function). LCT with $\frac1n$: limit 1, harmonic diverges.`));
  mc(20, ["alternating-series", "conditional-convergence", "p-series"], R`Problem 14: $\displaystyle\sum\frac{(-1)^{n+1}}{\sqrt n}$.`, ACD(1, R`Ratio/Root: $L = 1$. $\sum\frac1{\sqrt n}$ diverges ($p = \tfrac12$); AST: $\frac1{\sqrt n}$ decreases to 0.`));
  num(21, ["ratio-test", "factorial"], R`Problem 15: $\displaystyle\sum\frac{(n!)^2}{(2n)!}$. Enter $L$.`, 0.25, R`$\tfrac14$ (converges absolutely)`, R`$\dfrac{(n+1)^2}{(2n+2)(2n+1)} = \dfrac{n+1}{2(2n+1)} \to \dfrac14$ — the reciprocal of Problem 5's limit.`);

  window.QUIZ = {
    id: "mat231-quiz-11-6", course: "MAT 231", sec: "11.6", title: "Slide quiz 11.6 — The Ratio & Root Tests", short: "The Ratio & Root Tests",
    deck: "11-6", hw: "hw/hw-11-6/index.html",
    scoring: "Every question is worth 1 point. Single-choice and typed answers are all or nothing; select-all questions use right-minus-wrong per option.",
    toolsNote: R`Typed limits accept expressions: <code>1/4</code>, <code>e/3</code>, <code>e^-2</code>. Infinite limits are asked as multiple choice. Practice-problem solutions are on p. 17–21 of the deck.`,
    questions: QS,
  };
})();
