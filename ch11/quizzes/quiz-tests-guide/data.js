/* Quiz built from the handout "Which Convergence Test Should I Use?" (slides/Convergence_Tests_Guide.pdf). */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  const TESTS = ["Divergence Test", "Geometric Series Test", "p-Series Test", "Integral Test", "Direct Comparison", "Limit Comparison", "Alternating Series Test", "Ratio Test", "Root Test"];
  const pick = (page, tags, prompt, k, why) => mc(page, ["test-selection", ...tags], prompt, TESTS.map((t, i) => [(i === k ? "*" : "") + t, i === k ? why : ""]));

  mc(1, ["test-selection", "divergence-test"], R`Quick Decision Guide: what is the <b>first</b> question to ask about $\sum a_n$?`, [
    ["*Do the terms fail to go to zero? (Divergence Test)", "If $\\lim a_n \\ne 0$ (or doesn't exist), stop: it diverges."],
    ["Is it a geometric series?", "Second question."],
    ["Does it contain factorials?", "Question 5 (Ratio Test)."],
    ["Can I integrate the term?", "The last resort in the guide's order."],
  ]);
  pick(1, ["factorial"], R`Which test does the guide point to for terms with $n!$, $2^n$, or $n^n$?`, 7, "Factorials and exponentials → Ratio Test (question 5).");
  pick(1, [], R`…and for a whole term raised to the $n$th power, like $\left(\frac{2n+1}{3n}\right)^n$?`, 8, "Question 6 → Root Test.");
  pick(1, ["p-series"], R`…and for a fraction of powers of $n$ (rational or algebraic terms with roots) that is not exactly $\sum\frac1{n^p}$?`, 5, "Question 7: behaves like a p-series → Comparison or Limit Comparison Test (LCT is usually easier).");
  num(2, ["divergence-test", "examples"], R`Divergence Test example: $\displaystyle\sum\frac{n}{2n+1}$. Enter $\lim a_n$.`, 0.5, R`$\tfrac12$ — not 0, so it diverges`, R`$\frac{n}{2n+1} \to \frac12 \ne 0$.`);
  mc(2, ["divergence-test", "harmonic"], R`Watch out (Divergence Test): which statement is right?`, [
    ["*This test can never prove that a series converges.", "If $\\lim a_n = 0$ it is inconclusive — the harmonic series has terms → 0 and diverges."],
    ["If $\\lim a_n = 0$, the series converges.", "Harmonic series counterexample."],
    ["It applies only to positive series.", "It applies to every series."],
  ]);
  num(3, ["geometric", "examples"], R`Geometric example: $\displaystyle\sum_{n=1}^\infty 3\left(\tfrac25\right)^{n-1}$. Enter the sum.`, 5, "$5$", R`$a = 3$, $r = \tfrac25$: $\dfrac{3}{1 - 2/5} = 5$.`);
  num(3, ["geometric", "examples"], R`Watch out: $a$ is the <em>first term</em>, not the number in front. Enter $\displaystyle\sum_{n=1}^\infty\left(\tfrac12\right)^n$.`, 1, "$1$", R`First term $a = \tfrac12$ (at $n = 1$): $\dfrac{1/2}{1/2} = 1$.`);
  mc(3, ["p-series"], R`p-series watch out: rewrite roots as powers. $\displaystyle\sum\frac1{\sqrt n}$ and $\displaystyle\sum\frac1{n^{3/2}}$ are…`, [
    ["*divergent ($p = \\tfrac12$) and convergent ($p = \\tfrac32$).", ""],
    ["both convergent.", "$\\tfrac12 \\le 1$."],
    ["both divergent.", "$\\tfrac32 > 1$."],
  ]);
  mc(4, ["integral-test", "logarithm", "examples"], R`Integral Test example: $\displaystyle\sum_{n=2}^\infty\frac1{n\ln n}$.`, [
    ["*Diverges: $\\displaystyle\\int_2^\\infty\\frac{dx}{x\\ln x} = \\lim_{t\\to\\infty}[\\ln(\\ln x)]_2^t = \\infty$", ""],
    ["Converges because $n\\ln n > n$.", "Bigger than $n$ in the denominator makes the term smaller than $\\frac1n$ — which proves nothing."],
    ["Converges to $\\ln(\\ln 2)$.", "The integral diverges."],
  ]);
  mc(4, ["integral-test"], R`Integral Test watch out: if $\int_1^\infty f(x)dx = 5$, then…`, [
    ["*$\\sum a_n$ converges, but its sum is generally <b>not</b> 5.", "The integral value is not the sum of the series."],
    ["$\\sum a_n = 5$.", "Only convergence transfers, not the value."],
    ["$\\sum a_n$ diverges.", "A finite integral means convergence."],
  ]);
  mc(4, ["direct-comparison", "examples"], R`Direct Comparison example: $\displaystyle\sum\frac1{n^2+5}$.`, [
    ["*Converges: $\\frac1{n^2+5} \\le \\frac1{n^2}$ and $\\sum\\frac1{n^2}$ converges.", ""],
    ["Diverges: $\\frac1{n^2+5} \\le \\frac1n$.", "Smaller than divergent tells you nothing."],
    ["Inconclusive.", "The inequality points the right way."],
  ]);
  num(5, ["limit-comparison", "examples"], R`LCT example: $\displaystyle\sum\frac{2n^2+3}{n^4+1}$ with $b_n = \frac1{n^2}$. Enter $c = \lim\frac{a_n}{b_n}$.`, 2, "$2$ (converges)", R`$\dfrac{2n^4 + 3n^2}{n^4 + 1} \to 2$; $0 < 2 < \infty$ and $\sum\frac1{n^2}$ converges.`);
  mc(6, ["alternating-series", "alternating-series-estimate"], R`Alternating Series Test watch out: which is right?`, [
    ["*It cannot prove divergence; if $\\lim b_n \\ne 0$, use the Divergence Test. After it, check absolute convergence.", ""],
    ["If $b_n$ is not decreasing, the series diverges.", "Failing a condition makes the AST silent, not the series divergent."],
    ["The error after $s_n$ is at most $b_n$.", "At most $b_{n+1}$, the next term."],
  ]);
  num(6, ["ratio-test", "examples"], R`Ratio Test example: $\displaystyle\sum\frac{n^2}{2^n}$. Enter $L$.`, 0.5, R`$\tfrac12$`, R`$\dfrac12\left(\dfrac{n+1}{n}\right)^2 \to \dfrac12$. A useful simplification: $\frac{(n+1)!}{n!} = n + 1$.`);
  num(7, ["root-test", "examples"], R`Root Test example: $\displaystyle\sum\left(\frac{2n+3}{3n+2}\right)^n$. Enter $L$.`, 2 / 3, R`$\tfrac23$`, R`$\frac{2n+3}{3n+2} \to \frac23 < 1$; converges absolutely. Helpful limit: $\sqrt[n]{n} \to 1$.`);
  mc(7, ["absolute-convergence", "conditional-convergence", "alternating-series", "harmonic"], R`The alternating harmonic series $\sum\frac{(-1)^{n-1}}{n}$…`, [
    ["*converges conditionally.", "AST passes; $\\sum\\frac1n$ diverges."],
    ["converges absolutely.", "$\\sum|a_n| = \\sum\\frac1n$ diverges."],
    ["diverges.", "The AST shows it converges (to $\\ln 2$)."],
  ]);
  multi(7, ["theory", "reminders"], R`Reminders (p. 7). Select all that are true.`, [
    ["*Changing or dropping finitely many terms doesn't affect whether a series converges, but it does change the sum.", ""],
    ["*\"Inconclusive\" means try a different test, not that the series diverges.", ""],
    ["*Always state which test you are using and check its conditions.", ""],
    ["If two tests disagree, the Ratio Test wins.", "Valid tests never disagree; if they seem to, a condition was not checked."],
  ]);

  window.QUIZ = {
    id: "mat231-quiz-tests-guide", kind: "review", course: "MAT 231", sec: "Guide", title: "Guide quiz — Which Convergence Test Should I Use?", short: "Which test should I use?",
    deck: "guide-tests", deckLabel: "Tests guide PDF",
    scoring: "Every question is worth 1 point. Single-choice and typed answers are all or nothing; select-all questions use right-minus-wrong per option.",
    questions: QS,
  };
})();
