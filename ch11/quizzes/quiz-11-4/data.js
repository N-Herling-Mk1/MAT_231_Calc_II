/* Slide quiz 11.4 — The Comparison Tests. Built from slides/11.4_Comparison_Tests.pdf
 * plus the handout Comparison_Tests_Teaching_Notes.pdf (questions tagged "Notes", deck "notes-comparison"). */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  const N = { deck: "notes-comparison" };   // questions from the teaching-notes handout
  const notes = (page, tags, prompt, opts) => mc(page, tags, prompt, opts, Object.assign({ src: `Notes p. ${page}` }, N));

  num(1, ["remainder-estimate", "p-series", "integral-test"], R`Try this (from 11.3): $s_6 = \sum_{n=1}^6\frac1{n^2} = \frac{5369}{3600} \approx 1.4914$. Estimate $R_6$: enter the upper bound $\int_6^\infty\frac{dx}{x^2}$.`, 1 / 6, R`$\tfrac16$`,
    R`$R_6 \le \frac16$ (and $\ge \frac17$), so $1.6342 \le s \le 1.6581$.`);
  mc(3, ["comparison-test", "direct-comparison", "theory"], R`The Comparison Test (CT), positive terms only. Which statement is correct?`, [
    ["*If $a_n \\le b_n$ for all $n$ and $\\sum b_n$ converges, then $\\sum a_n$ converges.", "Smaller than convergent ⇒ convergent."],
    ["If $a_n \\le b_n$ and $\\sum b_n$ diverges, then $\\sum a_n$ diverges.", "Smaller than divergent tells you nothing."],
    ["If $a_n \\ge b_n$ and $\\sum b_n$ converges, then $\\sum a_n$ converges.", "Bigger than convergent tells you nothing."],
    ["The test also works for alternating series.", R`"No alternators allowed here!" — both series need positive terms.`],
  ]);
  multi(4, ["limit-comparison", "theory"], R`The Limit Comparison Test (LCT) with positive terms. Select every true statement.`, [
    ["*If $\\lim\\frac{a_n}{b_n} = c > 0$ (finite), both series converge or both diverge.", "Case i."],
    ["*If $\\lim\\frac{a_n}{b_n} = 0$ and $\\sum b_n$ converges, then $\\sum a_n$ converges.", "Case ii: $a_n$ is eventually much smaller."],
    ["*If $\\lim\\frac{a_n}{b_n} = \\infty$ and $\\sum b_n$ diverges, then $\\sum a_n$ diverges.", "Case iii: $a_n$ is eventually much bigger."],
    ["If $\\lim\\frac{a_n}{b_n} = 0$ and $\\sum b_n$ diverges, then $\\sum a_n$ diverges.", "Being much smaller than a divergent series proves nothing."],
  ]);
  mc(5, ["comparison-test", "direct-comparison", "p-series", "divergent"], R`Example 1: use the Comparison Test on $\displaystyle\sum_{n=1}^\infty\frac1{\sqrt n + 4}$.`, [
    ["*Diverges: for $n \\ge 16$, $\\sqrt n + 4 \\le 2\\sqrt n$, so $\\frac1{\\sqrt n + 4} \\ge \\frac1{2\\sqrt n}$, and $\\sum\\frac1{2\\sqrt n}$ diverges.", "Need a <em>smaller</em> divergent series; the obvious $\\frac1{\\sqrt n}$ is bigger, which proves nothing."],
    ["Converges because $\\frac1{\\sqrt n+4} < \\frac1{\\sqrt n}$.", R`$\sum\frac1{\sqrt n}$ diverges; being smaller than it proves nothing.`],
    ["Diverges because $\\frac1{\\sqrt n+4} < \\frac1{\\sqrt n}$ and $\\sum \\frac1{\\sqrt n}$ diverges.", "Wrong direction for a divergence argument."],
  ]);
  num(6, ["limit-comparison", "p-series"], R`Example 2: LCT on $\displaystyle\sum\frac1{\sqrt n + 4}$ with $b_n = \frac1{\sqrt n}$. Enter $\lim\frac{a_n}{b_n}$.`, 1, "$1$ (so the series diverges)",
    R`$\dfrac{\sqrt n}{\sqrt n + 4} = \dfrac{1}{1 + 4/\sqrt n} \to 1$, and $\sum\frac1{\sqrt n}$ diverges ($p = \tfrac12$). LCT avoids the inequality-direction trap.`);
  mc(8, ["comparison-test", "direct-comparison", "p-series"], R`3a. $\displaystyle\sum_{n=1}^\infty\frac{1}{n^2+n}$ — which $b_n$ and conclusion?`, [
    ["*$b_n = \\frac1{n^2}$: $\\frac1{n^2+n} < \\frac1{n^2}$, converges.", "Bigger denominator ⇒ smaller term. (It also telescopes to 1.)"],
    ["$b_n = \\frac1n$: $\\frac1{n^2+n} < \\frac1n$, diverges.", "Smaller than divergent proves nothing."],
    ["$b_n = \\frac1{n^2}$: diverges.", "$p = 2 > 1$."],
  ]);
  mc(8, ["limit-comparison", "p-series", "divergent"], R`3b. $\displaystyle\sum_{n=1}^\infty\frac{\sqrt[3]n}{n+4}$ — which $b_n$ and conclusion?`, [
    ["*$b_n = \\frac{n^{1/3}}{n} = \\frac1{n^{2/3}}$; $\\lim\\frac{a_n}{b_n} = 1$, diverges.", R`$p = \tfrac23 \le 1$. $\frac{n^{1/3}/(n+4)}{n^{-2/3}} = \frac{n}{n+4} \to 1$.`],
    ["$b_n = \\frac1{n^{4/3}}$; converges.", R`$\frac{n^{1/3}}{n} = n^{-2/3}$, not $n^{-4/3}$.`],
    ["$b_n = \\frac1n$; $\\lim = 0$, so it converges.", R`$\frac{a_n}{1/n} = \frac{n^{4/3}}{n+4} \to \infty$, not 0.`],
  ]);
  mc(9, ["comparison-test", "direct-comparison", "geometric"], R`3c. $\displaystyle\sum_{n=1}^\infty\frac1{n+2^n}$ — which $b_n$ and conclusion?`, [
    ["*$b_n = \\frac1{2^n}$: $\\frac1{n+2^n} < \\frac1{2^n}$, a convergent geometric series, so it converges.", "Exponential is the boss term in the denominator."],
    ["$b_n = \\frac1n$: diverges.", "The $2^n$ dominates, not the $n$."],
    ["$b_n = \\frac1{2^n}$: diverges.", "$r = \\frac12 < 1$."],
  ]);
  mc(10, ["comparison-test", "remainder-estimate", "theory"], R`Estimation with the Comparison Test (p. 10): if $\sum a_n = s$ converges by comparison with $\sum b_n = t$ ($a_n \le b_n$), then…`, [
    ["*$R_n = s - s_n \\le t - t_n = T_n$: the remainder of the comparison series bounds the error.", "Each leftover term $a_k \\le b_k$."],
    ["$s = t$.", "The sums are different; only an inequality holds."],
    ["$R_n \\le b_{n+1}$.", "That is the alternating-series estimate."],
  ]);
  num(10, ["comparison-test", "remainder-estimate", "geometric"], R`Example 1: $s = \displaystyle\sum_{n=1}^\infty\frac{5+n}{n\cdot4^n}$ converges by comparison with $\sum\frac{6}{4^n}$ (since $\frac{5+n}{n} \le 6$). Enter the upper bound $T_5 = \displaystyle\sum_{n=6}^\infty\frac{6}{4^n}$ for $s - s_5$.`, 1 / 512, R`$\tfrac1{512} \approx 0.00195$`,
    R`Geometric tail: $\dfrac{6/4^6}{1 - 1/4} = \dfrac{6}{4^6}\cdot\dfrac43 = \dfrac{8}{4096} = \dfrac1{512}$. (Actual $s - s_5 \approx 0.00058$.) A tighter bound uses $\frac{5+n}{n} \le \frac{11}6$ for $n \ge 6$.`, { tol: 1e-6 });
  num(11, ["comparison-test", "partial-sums", "geometric"], R`Example 2: $\displaystyle\sum\frac1{n+2^n}$ converges. Enter $s_4$ to four decimals.`, 0.6409, "0.6409",
    R`$\tfrac13 + \tfrac16 + \tfrac1{11} + \tfrac1{20} = 0.64091$.`, { tol: 6e-5 });
  num(11, ["comparison-test", "remainder-estimate", "geometric"], R`Example 2 (cont.): bound the difference $s - s_4$ using $\frac1{n+2^n} < \frac1{2^n}$. Enter $\displaystyle\sum_{n=5}^\infty\frac1{2^n}$.`, 1 / 16, R`$\tfrac1{16} = 0.0625$`,
    R`$\dfrac{1/32}{1 - 1/2} = \dfrac1{16}$.`);
  mc(12, ["p-series", "integral-test"], R`From the review table: which of these <b>converge</b>? $\sum\frac5{n^{-2}}$, $\sum\frac1{\sqrt n}$, $\sum\frac{3n}{2n^3}$, $\sum\frac{\ln n}{n}$, $\sum n^2e^{-n^3}$, $\sum\frac{\arctan n}{1+n^2}$`, [
    ["*$\\sum\\frac{3n}{2n^3}$, $\\sum n^2e^{-n^3}$, $\\sum\\frac{\\arctan n}{1+n^2}$", "The other three diverge ($5n^2$; $p = \\tfrac12$; $\\frac{\\ln n}n > \\frac1n$)."],
    ["$\\sum\\frac1{\\sqrt n}$, $\\sum\\frac{3n}{2n^3}$, $\\sum n^2e^{-n^3}$", "$p = \\tfrac12 \\le 1$ diverges."],
    ["only $\\sum\\frac{3n}{2n^3}$", "The integral test shows the two Medium ones with exponentials/arctan converge."],
  ]);

  // ---------------- teaching notes: how to pick b_n
  notes(1, ["comparison-test", "limit-comparison", "test-selection"], R`Notes, Step 1: to pick $b_n$, keep only the "boss" terms. What does $\dfrac{3n^2+5}{n^4 - 2n + 7}$ look like for large $n$?`, [
    ["*$\\dfrac{3n^2}{n^4} = \\dfrac3{n^2}$, so choose $b_n = \\dfrac1{n^2}$ (convergent p-series).", "Highest power on top and bottom; drop the constant 3."],
    ["$\\dfrac{5}{7}$", "Constants are the least important terms."],
    ["$\\dfrac{3n^2}{-2n}$", "The highest power in the denominator is $n^4$."],
  ]);
  notes(1, ["comparison-test", "test-selection"], R`Notes: which rule of thumb for boss terms is correct?`, [
    ["*Exponentials beat polynomials ($3^n + n^2$ behaves like $3^n$), and $\\ln n$ grows slower than any positive power of $n$.", "Also: treat $\\sqrt{n^2+1}$ like $n$."],
    ["Polynomials beat exponentials.", "$3^n$ eventually dwarfs $n^{100}$."],
    ["$\\ln n$ grows faster than $\\sqrt n$.", "$\\ln n < \\sqrt n$ for all $n \\ge 1$ — used in the table's last row."],
  ]);
  notes(2, ["comparison-test", "limit-comparison", "test-selection"], R`Notes, Step 2: when should you use the <b>LCT</b> instead of the direct test?`, [
    ["*When $a_n$ \"looks like\" $b_n$ but isn't obviously smaller or larger (mixed $+$/$-$ terms).", "Then check $\\lim a_n/b_n$ is finite and positive."],
    ["Only when the series alternates.", "Both comparison tests need positive terms."],
    ["When an inequality is obvious.", "That's when the DCT is quickest."],
  ]);
  notes(2, ["comparison-test", "direct-comparison"], R`"The catch students must know": if $a_n \le b_n$ and $\sum b_n$ <b>diverges</b>, you learn…`, [
    ["*nothing.", "Inequalities must point the right way: smaller-than-convergent or bigger-than-divergent."],
    ["that $\\sum a_n$ diverges.", "Smaller than divergent can still converge ($\\frac1{n^2} < \\frac1n$)."],
    ["that $\\sum a_n$ converges.", "$\\frac1{2n} < \\frac1n$ and diverges."],
  ]);
  notes(2, ["comparison-test", "limit-comparison", "p-series", "test-selection"], R`Quick practice table: $\dfrac{1}{\sqrt{n^2+n}}$ — choose $b_n$ and the test.`, [
    ["*$b_n = \\frac1n$, LCT; diverges.", R`$\frac{1/\sqrt{n^2+n}}{1/n} = \frac{1}{\sqrt{1 + 1/n}} \to 1$, harmonic diverges.`],
    ["$b_n = \\frac1{n^2}$, DCT; converges.", R`$\sqrt{n^2+n} \approx n$, not $n^2$.`],
    ["$b_n = \\frac1{\\sqrt n}$, LCT; diverges.", R`The ratio $\to 0$ with that choice — the boss term is $n$.`],
  ]);
  notes(2, ["comparison-test", "direct-comparison", "logarithm", "p-series"], R`Quick practice table: $\dfrac{\ln n}{n^2}$ has no clean boss term. Which comparison works?`, [
    ["*DCT with $b_n = \\frac1{n^{3/2}}$, using $\\ln n < \\sqrt n$: converges.", R`$\frac{\ln n}{n^2} < \frac{\sqrt n}{n^2} = \frac1{n^{3/2}}$, $p = \tfrac32 > 1$.`],
    ["LCT with $b_n = \\frac1{n^2}$: converges.", R`$\frac{a_n}{b_n} = \ln n \to \infty$, and case iii needs $\sum b_n$ divergent — inconclusive.`],
    ["DCT with $b_n = \\frac1n$: diverges.", "$\\frac{\\ln n}{n^2} < \\frac1n$ points the useless way."],
  ]);
  notes(3, ["limit-comparison", "p-series"], R`Problem 1: $\displaystyle\sum_{n=2}^\infty\frac{3n+1}{n^3-2}$ with $b_n = \frac1{n^2}$. The ratio limit is 3. Conclusion?`, [
    ["*Converges: $0 < 3 < \\infty$ and $\\sum\\frac1{n^2}$ converges.", ""],
    ["Diverges because the limit is bigger than 1.", "LCT only needs a finite positive limit; 1 is not a threshold here (that's the Ratio Test)."],
    ["Inconclusive.", "A positive finite limit is the conclusive case."],
  ]);
  notes(4, ["limit-comparison", "p-series", "divergent"], R`Problem 3: $\displaystyle\sum_{n=1}^\infty\frac{2n+1}{\sqrt{n^3+4n}}$. Boss terms and conclusion?`, [
    ["*Behaves like $\\frac{2n}{n^{3/2}} = \\frac2{\\sqrt n}$; LCT with $\\frac1{\\sqrt n}$ gives limit 2, so it diverges.", "$p = \\tfrac12 \\le 1$."],
    ["Behaves like $\\frac{2}{n^2}$; converges.", R`$\sqrt{n^3} = n^{3/2}$, not $n^3$.`],
    ["Behaves like $\\frac{2n}{n^3}$; converges.", "The square root halves the power."],
  ]);

  window.QUIZ = {
    id: "mat231-quiz-11-4", course: "MAT 231", sec: "11.4", title: "Slide quiz 11.4 — The Comparison Tests", short: "The Comparison Tests",
    deck: "11-4", hw: "hw/hw-11-4/index.html",
    scoring: "Every question is worth 1 point. Single-choice and typed answers are all or nothing; select-all questions use right-minus-wrong per option.",
    toolsNote: R`Questions marked <b>Notes p. N</b> come from the <em>How to Pick $b_n$</em> teaching-notes handout. Typed answers accept fractions (<code>1/512</code>).`,
    questions: QS,
  };
})();
