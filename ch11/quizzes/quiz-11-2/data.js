/* Slide quiz 11.2 — Series. Built from every problem and key fact in slides/11.2_Series.pdf. */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  num(1, ["sequence", "limit", "exponential", "lhopital"], R`Warm-up: does $a_n = n^2e^{-5n}$ converge? If so, enter the limit.`, 0, "converges to $0$",
    R`$\dfrac{n^2}{e^{5n}}$: L'Hôpital twice gives $\dfrac{2}{25e^{5n}} \to 0$. (First terms: $e^{-5}, 4e^{-10}, 9e^{-15}, 16e^{-20}$.)`);
  num(3, ["series", "partial-sums", "geometric"], R`Let $a_n = \dfrac1{2^n}$. What is the partial sum $s_4$?`, 15 / 16, R`$\tfrac{15}{16}$`,
    R`$\tfrac12 + \tfrac14 + \tfrac18 + \tfrac1{16} = \tfrac{15}{16}$.`);
  mc(3, ["series", "partial-sums", "geometric"], R`For $a_n = \dfrac1{2^n}$, which formula gives $s_n$, and what is $\sum_{n=1}^\infty \frac1{2^n}$?`, [
    ["*$s_n = \\dfrac{2^n - 1}{2^n}$, so the sum is $\\lim s_n = 1$.", R`$s_1 = \tfrac12, s_2 = \tfrac34, s_3 = \tfrac78$: always $1 - \tfrac1{2^n}$ ("rip some paper": each step covers half of what is left).`],
    ["$s_n = \\dfrac{n}{2^n}$, so the sum is 0.", R`$s_2 = \tfrac34$, not $\tfrac24$.`],
    ["$s_n = \\dfrac{2^n - 1}{2^n}$, so the sum is $\\infty$.", R`$\tfrac{2^n-1}{2^n} = 1 - 2^{-n} \to 1$.`],
    ["$s_n = \\dfrac1{2^n}$, so the sum is 0.", "That is the term $a_n$, not the partial sum."],
  ]);
  mc(4, ["series", "definitions", "partial-sums"], R`A series $\sum a_n$ <b>converges</b> when…`, [
    ["*the sequence of partial sums $s_n = a_1 + \\cdots + a_n$ has a finite limit.", "And then $\\sum a_n = \\lim s_n$ (p. 4)."],
    ["$\\lim a_n = 0$.", "Necessary but not sufficient — the harmonic series is the counterexample."],
    ["its terms are decreasing.", R`$\sum\frac1n$ has decreasing terms and diverges.`],
    ["the sequence $\\{a_n\\}$ is bounded.", R`$\sum 1$ has bounded terms and diverges.`],
  ]);
  multi(5, ["series", "divergence-test", "theory"], R`Test for divergence (p. 5). Which statements are true? Select all that apply.`, [
    ["*If $\\lim a_n \\ne 0$ (or does not exist), then $\\sum a_n$ diverges.", "The Test for Divergence."],
    ["*$\\sum 2^n$ diverges because $\\lim 2^n \\ne 0$.", "The slide's example."],
    ["If $\\lim a_n = 0$, then $\\sum a_n$ converges.", R`"IMPORTANT: … not enough." $\sum\frac1n$ is the counterexample.`],
    ["*If $\\sum a_n$ converges, then $\\lim a_n = 0$.", "This is the theorem the test comes from (p. 4)."],
  ]);
  mc(5, ["series", "properties"], R`If $\sum a_n = L$ and $\sum b_n = M$ (both convergent), which is true?`, [
    ["*$\\sum (a_n - b_n) = L - M$ and $\\sum ca_n = cL$.", "Sum/difference/constant-multiple laws (p. 5)."],
    ["$\\sum a_nb_n = LM$.", R`There is no product law: $\sum\frac1{2^n}\cdot\sum\frac1{2^n} = 1$, but $\sum\frac1{4^n} = \frac13$.`],
    ["$\\sum \\frac{a_n}{b_n} = \\frac LM$.", "No quotient law either."],
    ["$\\sum (a_n + b_n)$ may diverge.", "Two convergent series always add to a convergent one."],
  ]);
  mc(6, ["series", "partial-sums", "p-series"], R`The first six partial sums of $\sum \frac1{n^2}$ are $1, 1.25, 1.3611, 1.4236, 1.4636, 1.4914$. Does the series appear convergent or divergent?`, [
    ["*Convergent — the partial sums grow by less and less and level off (to $\\pi^2/6 \\approx 1.645$).", "Section 11.3 proves it: p-series with $p = 2 > 1$."],
    ["Divergent — the partial sums keep increasing.", "Increasing partial sums can still have a finite limit."],
    ["Divergent by the Test for Divergence.", R`$\frac1{n^2} \to 0$, so that test says nothing.`],
  ]);
  mc(7, ["series", "geometric", "theory"], R`The geometric series $\sum_{n=1}^\infty ar^{n-1}$ ($a \ne 0$)…`, [
    ["*converges to $\\dfrac{a}{1-r}$ if and only if $-1 < r < 1$.", R`From $s_n = \frac{a(1-r^n)}{1-r}$ and $r^n \to 0$ when $|r| < 1$.`],
    ["converges to $\\dfrac{a}{1-r}$ for every $r \\ne 1$.", "For $|r| > 1$, $r^n$ blows up."],
    ["converges to $\\dfrac{1}{1-r}$ whenever $|r| < 1$.", "Forgot the first term $a$."],
    ["converges when $r = -1$.", R`$a - a + a - \cdots$: partial sums flip between $a$ and 0.`],
  ]);
  num(8, ["series", "geometric"], R`$\displaystyle\sum_{n=1}^\infty 4\left(\tfrac13\right)^{n-1}$ is geometric. Enter its sum.`, 6, "$6$",
    R`$a = 4$, $r = \tfrac13$: $\dfrac{4}{1 - 1/3} = \dfrac{4}{2/3} = 6$.`);
  mc(9, ["series", "harmonic", "divergence-test"], R`The harmonic sequence $\frac1n \to 0$. What does that tell us about the harmonic series $\sum\frac1n$?`, [
    ["*Nothing by itself — and in fact the harmonic series diverges.", R`If $\lim a_n = 0$ the Test for Divergence is silent. The grouping argument (HW 11.2 #25) shows $s_{2^n} > 1 + n/2$.`],
    ["It converges, because the terms go to 0.", "This is the classic mistake the slide warns about."],
    ["It converges to 0.", "All terms are positive; the sum is at least 1."],
  ]);
  mc(10, ["series", "geometric", "divergent"], R`Is $\displaystyle\sum_{n=1}^\infty \frac{2^n}{100}$ geometric? Does it converge?`, [
    ["*Geometric with $r = 2$; it diverges.", R`$|r| = 2 \ge 1$ (also $a_n \to \infty$).`],
    ["Geometric with $r = \\tfrac1{100}$; it converges.", R`The ratio of consecutive terms is $\frac{2^{n+1}/100}{2^n/100} = 2$.`],
    ["Not geometric; it converges.", "It is geometric, and its terms grow."],
  ]);
  num(13, ["series", "geometric"], R`Is $\displaystyle\sum_{n=1}^\infty\left(-\tfrac29\right)^n$ geometric? If it converges, enter the sum.`, -2 / 11, R`$-\tfrac2{11}$`,
    R`Geometric, $r = -\tfrac29$, first term ($n = 1$) $a = -\tfrac29$: $\dfrac{-2/9}{1 + 2/9} = \dfrac{-2/9}{11/9} = -\dfrac2{11}$.`);
  mc(14, ["series", "harmonic", "divergent"], R`Does $\displaystyle\sum_{n=1}^\infty \frac6n$ converge?`, [
    ["*No — it is 6 times the harmonic series.", R`If $\sum\frac6n$ converged, so would $\frac16\sum\frac6n = \sum\frac1n$.`],
    ["Yes, because $\\frac6n \\to 0$.", "Terms → 0 is not enough."],
    ["Yes, to 6.", "The harmonic series has no finite sum."],
  ]);
  num(15, ["series", "geometric"], R`Does $\displaystyle\sum_{n=1}^\infty \frac{2^n}{3^{n+1}}$ converge? If so, enter the sum.`, 2 / 3, R`$\tfrac23$`,
    R`$\dfrac{2^n}{3^{n+1}} = \dfrac13\left(\dfrac23\right)^n$. First term $a = \tfrac29$, $r = \tfrac23$: $\dfrac{2/9}{1/3} = \dfrac23$.`);
  num(16, ["series", "telescoping", "partial-fractions"], R`Telescoping sum: show $\displaystyle\sum_{n=1}^\infty \frac{1}{n(n+1)}$ converges and enter its sum.`, 1, "$1$",
    R`$\dfrac1{n(n+1)} = \dfrac1n - \dfrac1{n+1}$. Then $s_n = \left(1 - \tfrac12\right) + \left(\tfrac12 - \tfrac13\right) + \cdots + \left(\tfrac1n - \tfrac1{n+1}\right) = 1 - \dfrac1{n+1} \to 1$.`);
  mc(17, ["series", "geometric", "interval-of-convergence"], R`Geometric series in disguise: for which $x$ does $\displaystyle\sum_{n=1}^\infty (-4)^n(x-5)^n$ converge?`, [
    ["*$\\tfrac{19}{4} < x < \\tfrac{21}4$", R`$r = -4(x - 5)$. Need $|4(x-5)| < 1 \iff |x - 5| < \tfrac14$.`],
    ["$1 < x < 9$", R`That solves $|x - 5| < 4$; the 4 multiplies, so divide by it.`],
    ["$4 < x < 6$", R`That is $|x - 5| < 1$, ignoring the factor $-4$.`],
    ["all $x$", "A geometric series needs $|r| < 1$."],
  ]);
  mc(18, ["series", "geometric", "interval-of-convergence"], R`For which $x$ does $\displaystyle\sum_{n=1}^\infty (x+2)^n$ converge?`, [
    ["*$-3 < x < -1$", R`$|x + 2| < 1$.`],
    ["$1 < x < 3$", "Sign error: $x + 2$ is centered at $-2$."],
    ["$-3 \\le x \\le -1$", R`At $x = -1$ the series is $\sum 1$; at $x = -3$ it is $\sum(-1)^n$. Both diverge.`],
  ]);
  mc(18, ["series", "geometric", "interval-of-convergence"], R`For which $x$ does $\displaystyle\sum_{n=1}^\infty \frac{2^n}{x^n}$ converge?`, [
    ["*$|x| > 2$, i.e. $x < -2$ or $x > 2$", R`$r = \frac2x$; $\left|\frac2x\right| < 1 \iff |x| > 2$.`],
    ["$-2 < x < 2$", "Flipped: the $x$ is in the denominator."],
    ["$|x| > \\tfrac12$", R`$|2/x| < 1$ gives $|x| > 2$.`],
  ]);

  window.QUIZ = {
    id: "mat231-quiz-11-2", course: "MAT 231", sec: "11.2", title: "Slide quiz 11.2 — Series", short: "Series",
    deck: "11-2", hw: "hw/hw-11-2/index.html",
    scoring: "Every question is worth 1 point. Single-choice and typed answers are all or nothing; select-all questions use right-minus-wrong per option.",
    toolsNote: R`Typed answers accept fractions and expressions (<code>-2/11</code>, <code>ln(3)</code>, <code>pi/4</code>). The page tag on each question opens that slide.`,
    questions: QS,
  };
})();
