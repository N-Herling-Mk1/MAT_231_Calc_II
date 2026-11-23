/* Slide quiz 11.1 — Sequences. Built from every problem and key fact in slides/decks/11.1_Sequences.pdf.
 * Types: single (radio), multi (checkboxes, right-minus-wrong), numeric (typed: 5/7, ln(3), pi/4, e^-2 all work).
 * src/page = the slide page (links into the viewer); tags = search tags. */
(function () {
  // ---- authoring helpers (same block in every quiz data.js) ----
  // opts: [["*right answer", "why"], ["wrong answer", "why"], ...] — a leading * marks the key
  const R = String.raw, QS = [];
  const opt = (o) => ({ text: o[0].replace(/^\*/, ""), correct: o[0].startsWith("*"), why: o[1] || "" });
  const mc = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "single", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const multi = (page, tags, prompt, opts, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "multi", src: `p. ${page}`, page, tags, prompt, options: opts.map(opt) }, more));
  const num = (page, tags, prompt, answer, answerText, why, more) => QS.push(Object.assign({ n: QS.length + 1, points: 1, type: "numeric", src: `p. ${page}`, page, tags, prompt, answer, answerText, why, tol: 1e-4 }, more));

  // ---------------- fill in the tables (p. 1–2, worked on p. 5–7)
  num(2, ["sequence", "terms"], R`Fill in the table for $a_n = \dfrac{n^3}{(n+1)^2}$: what is $a_{10}$? (Type a fraction or decimal.)`, 1000 / 121, R`$\tfrac{1000}{121} \approx 8.264$`,
    R`$a_{10} = \dfrac{10^3}{11^2} = \dfrac{1000}{121}$. The table row is $\tfrac14, \tfrac89, \tfrac{27}{16}, \tfrac{64}{25}, \dots$ (p. 5).`);
  num(2, ["sequence", "terms", "factorial"], R`Fill in the table for $a_n = \dfrac{1}{n!}$: what is $a_4$?`, 1 / 24, R`$\tfrac1{24}$`,
    R`$4! = 4\cdot3\cdot2\cdot1 = 24$. (Row: $1, \tfrac12, \tfrac16, \tfrac1{24}$; by $n = 50$ it is $\approx 0$.)`);
  num(2, ["sequence", "terms", "trig", "alternating"], R`Fill in the table for $a_n = \cos(n\pi)$: what is $a_{112}$?`, 1, "$1$",
    R`$\cos(n\pi) = (-1)^n$: $-1, 1, -1, 1, \dots$ Even $n = 112$ gives $+1$.`);
  mc(6, ["sequence", "limit", "divergent", "graph"], R`What happens to $a_n = \dfrac{n^3}{(n+1)^2}$ in the long run (p. 5–6, graph it on Desmos)?`, [
    ["*It grows without bound: the sequence diverges to $\\infty$.", R`Numerator degree 3 beats denominator degree 2: $a_n \approx n \to \infty$. The Desmos dots climb in a near-straight line.`],
    ["It levels off at 1.", "That would need equal degrees with equal leading coefficients."],
    ["It approaches 0.", "That needs the denominator to have the higher degree."],
    ["It oscillates between two values.", "All terms are positive and increasing."],
  ]);
  mc(6, ["sequence", "limit", "factorial"], R`What happens to $a_n = \dfrac1{n!}$ in the long run?`, [
    ["*It converges to 0.", R`$n! \to \infty$, so $1/n! \to 0$ (≈ 0 already at $n = 50$).`],
    ["It converges to 1.", "Only $a_1 = 1$; the terms shrink fast."],
    ["It diverges to $\\infty$.", "The terms get smaller, not larger."],
    ["It oscillates.", "All terms are positive and decreasing."],
  ]);
  mc(7, ["sequence", "limit", "divergent", "oscillating", "trig"], R`What happens to $a_n = \cos(n\pi)$ in the long run?`, [
    ["*It diverges: the terms alternate $-1, 1, -1, 1, \\dots$ and never settle.", "A limit must be a single number $L$ the terms get arbitrarily close to."],
    ["It converges to 0.", "The terms are always $\\pm1$, never near 0."],
    ["It converges to 1.", "Every odd term is $-1$."],
    ["It converges to the average, 0.", "Averaging is not a limit."],
  ]);

  // ---------------- general term (p. 3) and formula types (p. 4)
  mc(3, ["sequence", "general-term", "pattern", "geometric"], R`Find a formula for the general term of $\left\{4, -1, \tfrac14, -\tfrac1{16}, \tfrac1{64}, \dots\right\}$ (start at $n = 1$).`, [
    ["*$a_n = 4\\left(-\\tfrac14\\right)^{n-1}$", R`Each term is the previous one times $-\tfrac14$: geometric with $a_1 = 4$, $r = -\tfrac14$.`],
    ["$a_n = 4\\left(-\\tfrac14\\right)^{n}$", R`That gives $a_1 = -1$; the exponent must be $n - 1$ so $a_1 = 4$.`],
    ["$a_n = \\dfrac{(-1)^n}{4^{n-2}}$", R`Sign is wrong: $n = 1$ gives $-4$.`],
    ["$a_n = 4 - 5(n-1)$", "The terms are not equally spaced; the ratio is constant, not the difference."],
  ]);
  mc(3, ["sequence", "general-term", "pattern", "alternating"], R`Find a formula for the general term of $\left\{\tfrac12, -\tfrac43, \tfrac94, -\tfrac{16}5, \tfrac{25}6, \dots\right\}$ (start at $n = 1$).`, [
    ["*$a_n = \\dfrac{(-1)^{n+1}n^2}{n+1}$", R`Numerators are squares $n^2$, denominators $n + 1$, signs $+, -, +, \dots$ so $(-1)^{n+1}$ (or $(-1)^{n-1}$).`],
    ["$a_n = \\dfrac{(-1)^{n}n^2}{n+1}$", "That starts negative."],
    ["$a_n = \\dfrac{(-1)^{n+1}n}{n+1}$", "The numerators 1, 4, 9, 16, 25 are squares."],
    ["$a_n = \\dfrac{(-1)^{n+1}n^2}{2n}$", "Denominators are 2, 3, 4, 5, 6 = $n + 1$."],
  ]);
  mc(4, ["sequence", "recursive", "arithmetic"], R`For the sequence $19, -81, -181, -281, \dots$ the explicit formula is $a_n = -100n + 119$. Which is the <b>recursive</b> formula?`, [
    ["*$a_n = a_{n-1} - 100,\\ a_1 = 19$", "Recursive formulas use the previous term; each step subtracts 100."],
    ["$a_n = -100a_{n-1} + 119$", "That multiplies the previous term by $-100$."],
    ["$a_n = a_{n-1} + 119,\\ a_1 = -100$", "The common difference is $-100$, and $a_1 = 19$."],
    ["$a_n = 19 - 100^{n-1}$", "That is not linear."],
  ]);
  mc(4, ["sequence", "recursive", "geometric"], R`Which explicit formula matches $-4, -2, -1, -\tfrac12, -\tfrac14, \dots$?`, [
    ["*$a_n = -4\\left(\\tfrac12\\right)^{n-1}$", R`Geometric, $a_1 = -4$, ratio $\tfrac12$ (recursively $a_n = a_{n-1}\cdot\tfrac12$).`],
    ["$a_n = -4 + 2(n-1)$", "The differences are 2, 1, ½ — not constant."],
    ["$a_n = -4\\cdot 2^{n-1}$", "That doubles: $-4, -8, -16, \\dots$"],
    ["$a_n = -\\tfrac12 a_{n-1}$", "That alternates the sign."],
  ]);
  mc(4, ["sequence", "recursive", "definitions"], R`When is an <b>explicit</b> formula better than a recursive one (p. 4)?`, [
    ["*To jump straight to a specific term, e.g. $a_{500}$.", "Explicit: needs only the term number. Recursive: needs the previous term, best for seeing the pattern."],
    ["When you know only the previous term.", "That is what recursive formulas use."],
    ["They are always equivalent in effort.", "Recursive needs all earlier terms first."],
    ["Only for arithmetic sequences.", "Geometric sequences have explicit formulas too ($2\\cdot3^{n-1}$)."],
  ]);

  // ---------------- convergence (p. 8–9)
  mc(8, ["sequence", "limit", "definitions"], R`A sequence $\{a_n\}$ <b>converges</b> when…`, [
    ["*$\\lim_{n\\to\\infty} a_n = L$ for a finite number $L$.", "Definition on p. 8."],
    ["$\\lim a_n = \\infty$.", "That is divergence: the terms grow without bound."],
    ["Its terms are all positive.", "Positivity says nothing about a limit ($a_n = n$)."],
    ["$a_{n+1} - a_n \\to 0$.", "$\\ln n$ has shrinking gaps but diverges."],
  ]);
  multi(9, ["sequence", "limit", "theory", "absolute-value-theorem"], R`Which statements are true (p. 9)? Select all that apply.`, [
    ["*If $f(n) = a_n$ and $\\lim_{x\\to\\infty} f(x) = L$, then $\\lim a_n = L$.", "This is how L'Hôpital's rule gets used on sequences."],
    ["If $\\lim a_n = L$, then $\\lim_{x\\to\\infty} f(x) = L$ for any $f$ with $f(n) = a_n$.", R`The converse is false: $a_n = \sin(\pi n) = 0$, but $\sin(\pi x)$ has no limit.`],
    ["*If $\\lim |a_n| = 0$, then $\\lim a_n = 0$.", "Squeeze: $-|a_n| \\le a_n \\le |a_n|$."],
    ["If $\\lim |a_n| = 1$, then $\\lim a_n = 1$.", R`$a_n = (-1)^n$ has $|a_n| = 1$ but no limit. Only the limit 0 transfers.`],
  ]);
  num(9, ["sequence", "limit", "lhopital", "logarithm"], R`Example 1: evaluate $\displaystyle\lim_{n\to\infty}\frac{\ln n}{n^2}$.`, 0, "$0$",
    R`$\tfrac\infty\infty$, L'Hôpital: $\dfrac{1/x}{2x} = \dfrac{1}{2x^2} \to 0$.`);
  num(9, ["sequence", "limit", "rational"], R`Example 3: evaluate $\displaystyle\lim_{n\to\infty}\left(\frac1n + \frac{3(n^2-1)}{n^2+1}\right)$.`, 3, "$3$",
    R`$\tfrac1n \to 0$, and $\dfrac{3n^2 - 3}{n^2 + 1} \to 3$ (leading coefficients). Sum law: $0 + 3 = 3$.`);

  // ---------------- Boards: try it (p. 10–13)
  num(11, ["sequence", "limit", "rational"], R`4a. Does $x_n = \dfrac{n}{n^2+1}$ converge? If so, enter the limit.`, 0, "converges to $0$",
    R`Divide by $n^2$: $\dfrac{1/n}{1 + 1/n^2} \to 0$. Denominator has the higher degree.`);
  mc(11, ["sequence", "limit", "divergent", "rational"], R`4b. Does $b_n = \dfrac{n^2+1}{2n}$ converge?`, [
    ["*No — it diverges to $\\infty$.", R`$\dfrac{n^2+1}{2n} = \dfrac n2 + \dfrac1{2n} \to \infty$.`],
    ["Yes, to $\\tfrac12$.", "That would need equal degrees."],
    ["Yes, to 0.", "The numerator has the higher degree."],
  ]);
  mc(12, ["sequence", "limit", "divergent", "alternating", "oscillating"], R`4c. Does $s_n = \dfrac{(-1)^n n}{n+1}$ converge?`, [
    ["*No — the terms approach $1$ for even $n$ and $-1$ for odd $n$.", R`$\dfrac{n}{n+1} \to 1$, so $s_n$ flips between values near $\pm1$. The $|a_n| \to 0$ trick does not apply since $|s_n| \to 1$.`],
    ["Yes, to 0.", R`Only works if $|s_n| \to 0$.`],
    ["Yes, to 1.", "The odd terms are near $-1$."],
  ]);
  num(12, ["sequence", "limit", "rational"], R`4d. Does $d_n = \dfrac{n}{n+1} + \dfrac{2}{n^2}$ converge? If so, enter the limit.`, 1, "converges to $1$",
    R`$\dfrac{n}{n+1} \to 1$ and $\dfrac2{n^2} \to 0$; sum law gives $1$.`);
  mc(13, ["sequence", "limit", "squeeze-theorem", "trig"], R`5. Find $\displaystyle\lim_{n\to\infty}\frac{\cos n}{n}$.`, [
    ["*$0$, by the Squeeze Theorem: $-\\tfrac1n \\le \\tfrac{\\cos n}{n} \\le \\tfrac1n$.", "Both bounds go to 0."],
    ["It does not exist because $\\cos n$ oscillates.", "The oscillation is crushed by $1/n$."],
    ["$1$", R`That is $\lim \frac{\sin x}{x}$ as $x \to 0$, a different limit.`],
    ["$\\infty$", "The numerator is bounded."],
  ]);
  num(13, ["sequence", "limit", "lhopital", "trig"], R`6. Find $\displaystyle\lim_{n\to\infty}\frac{1 - \cos(1/n)}{\sin(1/n)}$.`, 0, "$0$",
    R`Let $t = 1/n \to 0^+$: $\dfrac{1 - \cos t}{\sin t}$ is $\tfrac00$. L'Hôpital: $\dfrac{\sin t}{\cos t} \to \dfrac01 = 0$.`);

  // ---------------- describing sequences (p. 14–16)
  mc(14, ["sequence", "monotonic", "definitions"], R`A sequence is <b>monotonic</b> when…`, [
    ["*it is either increasing for all $n$ or decreasing for all $n$ (not both).", "Definition, p. 14. Otherwise it is non-monotonic."],
    ["it is bounded above and below.", "That is bounded."],
    ["it converges.", R`$(-1)^n/n$ converges but is not monotonic.`],
    ["its terms are all the same sign.", "Sign is unrelated."],
  ]);
  multi(14, ["sequence", "bounded", "monotonic", "monotone-sequence-theorem", "theory"], R`The "two theorems" on p. 14. Which statements are true? Select all that apply.`, [
    ["*Every convergent sequence is bounded.", "Theorem 1."],
    ["*If $\\{a_n\\}$ is bounded and monotonic, then it converges.", "Theorem 2 (Monotonic Sequence Theorem)."],
    ["Every bounded sequence converges.", R`$(-1)^n$ is bounded but diverges — it also needs to be monotonic.`],
    ["Every monotonic sequence converges.", R`$a_n = n$ is increasing and diverges — it also needs to be bounded.`],
  ]);
  mc(15, ["sequence", "monotonic", "bounded"], R`Example a: $a_n = n^2 + 1$ is…`, [
    ["*increasing; bounded below (by 2) but not bounded.", "Terms 2, 5, 10, 17, … grow forever."],
    ["increasing and bounded.", "No upper bound."],
    ["decreasing and bounded.", "The terms grow."],
    ["neither; bounded.", "It is clearly increasing."],
  ]);
  mc(15, ["sequence", "monotonic", "bounded"], R`Example b: $b_n = \dfrac1n$ is…`, [
    ["*decreasing and bounded ($0 < b_n \\le 1$).", R`$1, \tfrac12, \tfrac13, \dots$`],
    ["increasing and bounded.", "The terms shrink."],
    ["decreasing; not bounded.", "Bounded between 0 and 1."],
  ]);
  mc(15, ["sequence", "monotonic", "bounded", "alternating"], R`Example c: $c_n = \dfrac{(-1)^n}{n^2}$ is…`, [
    ["*neither increasing nor decreasing (not monotonic), but bounded.", R`$-1, \tfrac14, -\tfrac19, \tfrac1{16}, \dots$ jumps up and down; $|c_n| \le 1$.`],
    ["decreasing and bounded.", R`$c_2 = \tfrac14 > c_1 = -1$.`],
    ["increasing and bounded.", R`$c_3 = -\tfrac19 < c_2$.`],
  ]);
  mc(15, ["sequence", "monotonic", "bounded", "exponential"], R`Example d: $t_n = 1 + \dfrac1{e^n}$ is…`, [
    ["*decreasing and bounded ($1 < t_n \\le 1 + \\tfrac1e$).", R`$e^n$ grows, so $1/e^n$ shrinks toward 0; $t_n \to 1$.`],
    ["increasing and bounded.", "The added piece shrinks."],
    ["decreasing; not bounded.", "Bounded between 1 and $1 + 1/e$."],
  ]);

  // ---------------- indeterminate forms (p. 17)
  multi(17, ["lhopital", "indeterminate-forms", "limit"], R`Which forms are <b>indeterminate</b> (p. 17 table)? Select all that apply.`, [
    ["*$0\\cdot\\infty$", "Product form: rewrite as $f/(1/g)$."],
    ["*$\\infty - \\infty$", "Difference form: common denominator / rationalize."],
    ["*$1^\\infty$", "Power form: take $\\ln y = g\\ln f$, then $L = e^{\\lim \\ln y}$."],
    ["$\\infty + \\infty$", "That is just $\\infty$."],
    ["*$0^0$ and $\\infty^0$", "Power forms, same log technique."],
    ["$\\tfrac{1}{\\infty}$", "That is just 0."],
  ]);
  mc(17, ["lhopital", "indeterminate-forms"], R`L'Hôpital's rule applies <b>directly</b> only to which forms?`, [
    ["*Quotients $\\tfrac00$ and $\\tfrac{\\pm\\infty}{\\pm\\infty}$.", "Everything else is first converted to one of these (Step 3 of the protocol)."],
    ["Any indeterminate form.", "Products, differences and powers must be converted first."],
    ["Only $\\tfrac00$.", "$\\tfrac\\infty\\infty$ works too."],
    ["Any limit as $x\\to\\infty$.", "It needs an indeterminate quotient."],
  ]);

  window.QUIZ = {
    id: "mat231-quiz-11-1", course: "MAT 231", sec: "11.1", title: "Slide quiz 11.1 — Sequences", short: "Sequences",
    deck: "11-1", hw: "hw/hw-11-1/index.html",
    scoring: "Every question is worth 1 point. Single-choice and typed answers are all or nothing; select-all questions use right-minus-wrong per option.",
    toolsNote: R`Typed answers accept fractions and expressions: <code>1000/121</code>, <code>ln(3)</code>, <code>pi/4</code>, <code>e^-2</code>, <code>sqrt(2)/2</code>. The tag on each question links to its slide page.`,
    questions: QS,
  };
})();
