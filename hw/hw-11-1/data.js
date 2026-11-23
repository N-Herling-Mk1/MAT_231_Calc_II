/* Homework 11.1 — Sequences (WebAssign, transcribed from screenshots in img/).
 * Schema: see the header of assets/js/hw-engine.js. Answers match the graded submissions in the screenshots. */
(function () {
  const R = String.raw;
  const conv = R`Determine whether the sequence converges or diverges. If it converges, find the limit. (If the sequence diverges, write DIVERGES.)`;
  const graph = R`Use a graph of the sequence to decide whether the sequence is convergent or divergent. If the sequence is convergent, guess the value of the limit from the graph and then prove your guess. (If the quantity diverges, write DIVERGES.)`;
  window.HW = {
    id: "mat231-hw-11-1", sec: "11.1", title: "Sequences", deck: "11-1", quiz: "quizzes/quiz-11-1/index.html",
    problems: [
      { n: 1, tags: ["sequence", "terms", "alternating"], src: ["p1_0.png"],
        prompt: R`List the first five terms of the sequence. $$a_n = \frac{(-1)^{n-1}}{n^2}$$`,
        parts: [
          { l: R`$a_1$`, a: "$1$" }, { l: R`$a_2$`, a: R`$-\tfrac14$` }, { l: R`$a_3$`, a: R`$\tfrac19$` },
          { l: R`$a_4$`, a: R`$-\tfrac1{16}$` }, { l: R`$a_5$`, a: R`$\tfrac1{25}$` },
        ],
        w: R`<p>Plug in $n = 1,\dots,5$. The factor $(-1)^{n-1}$ is $+1$ for odd $n$ and $-1$ for even $n$, so the signs alternate starting positive; the size is $1/n^2$.</p>` },
      { n: 2, tags: ["sequence", "recursive", "terms"], src: ["p2_0.png"],
        prompt: R`List the first five terms of the sequence. $$a_1 = 6, \qquad a_{n+1} = \frac{a_n}{1 + a_n}$$`,
        parts: [
          { l: R`$a_1$`, a: "$6$" }, { l: R`$a_2$`, a: R`$\tfrac67$` }, { l: R`$a_3$`, a: R`$\tfrac6{13}$` },
          { l: R`$a_4$`, a: R`$\tfrac6{19}$` }, { l: R`$a_5$`, a: R`$\tfrac6{25}$` },
        ],
        w: R`<p>$a_2 = \dfrac{6}{1+6} = \dfrac67$, $\;a_3 = \dfrac{6/7}{1 + 6/7} = \dfrac{6/7}{13/7} = \dfrac{6}{13}$, $\;a_4 = \dfrac{6/13}{19/13} = \dfrac6{19}$, $\;a_5 = \dfrac{6/19}{25/19} = \dfrac6{25}$.</p>
            <p>Pattern: if $a_n = \dfrac{6}{k}$ then $a_{n+1} = \dfrac{6}{k+6}$, so $a_n = \dfrac{6}{6n-5}$ (and $a_n \to 0$).</p>` },
      { n: 3, tags: ["sequence", "general-term", "pattern"], src: ["p3_0.png"],
        prompt: R`Find a formula for the general term $a_n$ of the sequence, assuming that the pattern of the first few terms continues. (Assume that $n$ begins with 1.) $$\left\{1, \frac13, \frac15, \frac17, \frac19, \dots\right\}$$`,
        a: R`$a_n = \dfrac{1}{2n-1}$`,
        w: R`<p>The denominators $1, 3, 5, 7, 9$ are the odd numbers, $2n - 1$ for $n = 1, 2, 3, \dots$; numerators are all 1.</p>` },
      { n: 4, tags: ["sequence", "general-term", "pattern", "alternating", "geometric"], src: ["p4_0.png"],
        prompt: R`Find a formula for the general term $a_n$ of the sequence, assuming that the pattern of the first few terms continues. (Assume that $n$ begins with 1.) $$\left\{-8, \frac{16}{3}, -\frac{32}{9}, \frac{64}{27}, -\frac{128}{81}, \dots\right\}$$`,
        a: R`$a_n = \dfrac{(-1)^n\, 4\cdot 2^n}{3^{\,n-1}} = (-1)^n \dfrac{2^{n+2}}{3^{n-1}}$`,
        w: R`<p>Numerators $8, 16, 32, 64, 128 = 2^{n+2}$; denominators $1, 3, 9, 27, 81 = 3^{n-1}$; the sign is negative for odd $n$, so $(-1)^n$.</p>
            <p>Equivalently a geometric sequence with $a_1 = -8$ and ratio $r = -\tfrac23$: $a_n = -8\left(-\tfrac23\right)^{n-1}$.</p>` },
      { n: 5, tags: ["sequence", "general-term", "pattern", "arithmetic"], src: ["p5_0.png"],
        prompt: R`Find a formula for the general term $a_n$ of the sequence, assuming that the pattern of the first few terms continues. (Assume that $n$ begins with 1.) $$\{2, 5, 8, 11, 14, \dots\}$$`,
        a: R`$a_n = 3n - 1$`,
        w: R`<p>Arithmetic: common difference $d = 3$, $a_1 = 2$, so $a_n = 2 + 3(n-1) = 3n - 1$.</p>` },
      { n: 6, tags: ["sequence", "terms", "graph", "limit", "geometric"], src: ["p6_1.png", "p6_2.png", "p6_3.png", "p6_4.png", "p6_5.png"],
        fig: [{ img: "img/p6_2.png", alt: "Figures A and B: plots of four candidate sequences" }, { img: "img/p6_3.png", alt: "Figures C and D" }],
        prompt: R`Calculate, to four decimal places, the first ten terms of the sequence $$a_n = 1 + \left(-\frac12\right)^n.$$ Using the calculations, plot the graph of the sequence (select the correct figure). Does the sequence appear to have a limit? If so, calculate it. If not, enter DNE.`,
        parts: [
          { l: "terms", q: R`$a_1, \dots, a_{10}$`, a: R`$0.5000,\ 1.2500,\ 0.8750,\ 1.0625,\ 0.9688,\ 1.0156,\ 0.9922,\ 1.0039,\ 0.9980,\ 1.0010$`,
            w: R`<p>$(-\tfrac12)^n = -0.5,\ 0.25,\ -0.125,\ 0.0625,\ -0.03125,\ 0.015625,\ -0.0078125,\ 0.00390625,\ -0.001953,\ 0.000977$; add 1 and round.</p>` },
          { l: "figure", q: "Which figure?", opts: ["Figure A", "Figure B", "Figure C", "Figure D"], key: 1,
            w: R`<p>Figure B starts at $0.5$, jumps to $1.25$, and zig-zags in toward $1$. (A sits below 0, C and D oscillate between about $\pm 1$.)</p>` },
          { l: "limit?", q: "Does the sequence appear to have a limit?", opts: ["Yes", "No"], key: 0 },
          { l: "limit", q: "If so, calculate it.", a: "$1$",
            w: R`<p>$|{-\tfrac12}| < 1$, so $\left(-\tfrac12\right)^n \to 0$ and $a_n \to 1 + 0 = 1$.</p>` },
        ] },
      { n: 7, tags: ["sequence", "limit", "continuous-function", "trig"], src: ["p7_.png"],
        prompt: R`Determine whether the sequence converges or diverges. If it converges, find the limit. (If an answer does not exist, write DNE.) $$a_n = \tan\!\left(\frac{4n\pi}{1 + 16n}\right)$$`,
        a: R`$\displaystyle\lim_{n\to\infty} a_n = 1$`,
        w: R`<p>Inside: $\dfrac{4n\pi}{1+16n} = \dfrac{4\pi}{1/n + 16} \to \dfrac{4\pi}{16} = \dfrac{\pi}{4}$.</p>
            <p>$\tan$ is continuous at $\pi/4$, so $a_n \to \tan(\pi/4) = 1$. Converges.</p>` },
      { n: 8, tags: ["sequence", "limit", "alternating", "absolute-value-theorem"], src: ["p8_.png"],
        prompt: conv + R`$$a_n = \frac{(-1)^{n-1}\, n}{n^2 + 7}$$`,
        a: R`$\displaystyle\lim_{n\to\infty} a_n = 0$`,
        w: R`<p>$|a_n| = \dfrac{n}{n^2+7} = \dfrac{1/n}{1 + 7/n^2} \to 0$.</p>
            <p>If $|a_n| \to 0$ then $a_n \to 0$ (absolute-value theorem). Converges to 0.</p>` },
      { n: 9, tags: ["sequence", "limit", "rational", "continuous-function", "graph"], src: ["p9_.png"],
        prompt: graph + R`$$a_n = \sqrt{\frac{5 + 4n^2}{16n^2 + 3n}}$$`,
        a: R`$\displaystyle\lim_{n\to\infty} a_n = \frac12$`,
        w: R`<p>Divide top and bottom by $n^2$: $\dfrac{5/n^2 + 4}{16 + 3/n} \to \dfrac{4}{16} = \dfrac14$.</p>
            <p>$\sqrt{x}$ is continuous, so $a_n \to \sqrt{1/4} = \tfrac12$. The graph levels off at $0.5$.</p>` },
      { n: 10, tags: ["sequence", "limit", "rational"], src: ["p10_.png"],
        prompt: conv + R`$$a_n = \frac{1 + 5n^2}{n + 7n^2}$$`,
        a: R`$\displaystyle\lim_{n\to\infty} a_n = \frac57$`,
        w: R`<p>Same degree top and bottom: ratio of leading coefficients. $\dfrac{1/n^2 + 5}{1/n + 7} \to \dfrac57$.</p>` },
      { n: 11, tags: ["sequence", "limit", "continuous-function", "exponential"], src: ["p11_.png"],
        prompt: conv,
        parts: [
          { l: "(a)", q: R`$a_n = -\dfrac{1}{\sqrt n}$`, a: R`$\displaystyle\lim a_n = 0$`, w: R`<p>$\sqrt n \to \infty$, so $1/\sqrt n \to 0$.</p>` },
          { l: "(b)", q: R`$b_n = e^{-1/\sqrt n}$`, a: R`$\displaystyle\lim b_n = 1$`, w: R`<p>The exponent $-1/\sqrt n \to 0$ and $e^x$ is continuous, so $b_n \to e^0 = 1$.</p>` },
        ] },
      { n: 12, tags: ["sequence", "limit", "lhopital", "exponential"], src: ["p12_.png"],
        prompt: conv + R` $$\{n^2 e^{-7n}\}$$ Justify your answer.`,
        parts: [
          { l: "limit", a: R`$\displaystyle\lim a_n = 0$` },
          { l: "why", q: "Justify your answer.", opts: ["Use L'Hôpital's Rule to find an equivalent limit that does not have an indeterminate form.", "Use the Power Rule by finding a common exponent of the products.", R`Use the Squeeze Theorem by comparing to the sequence $b_n = (1)e^{-7n}$.`, "Rewrite the expression as a quotient and use the Quotient Rule."], key: 0 },
        ],
        w: R`<p>$n^2 e^{-7n} = \dfrac{n^2}{e^{7n}}$ is $\tfrac{\infty}{\infty}$. Apply L'Hôpital to $f(x) = x^2/e^{7x}$ twice:</p>
            $$\lim_{x\to\infty}\frac{x^2}{e^{7x}} = \lim\frac{2x}{7e^{7x}} = \lim\frac{2}{49e^{7x}} = 0.$$
            <p>Since $f(n) = a_n$, the sequence converges to 0 too.</p>` },
      { n: 13, tags: ["sequence", "limit", "squeeze-theorem", "geometric", "trig"], src: ["p13_.png"],
        prompt: conv,
        parts: [
          { l: "(a)", q: R`$a_n = \dfrac{1}{3^n}$`, a: R`$\displaystyle\lim a_n = 0$`, w: R`<p>$\left(\tfrac13\right)^n \to 0$ because $|r| = \tfrac13 < 1$.</p>` },
          { l: "(b)", q: R`$b_n = \dfrac{\cos^2(n)}{3^n}$`, a: R`$\displaystyle\lim b_n = 0$` },
          { l: "why", q: "Justify your answer.", opts: ["Use the Squeeze Theorem by considering the range of cosine.", "Use the Power Rule on the numerator cosine.", "Use the Quotient Rule to find the limit of each of the numerator and the denominator.", "Use L'Hôpital's Rule to find a limit that does not have an indeterminate form."], key: 0,
            w: R`<p>$0 \le \cos^2 n \le 1$, so $0 \le \dfrac{\cos^2 n}{3^n} \le \dfrac{1}{3^n}$. Both bounds $\to 0$, so $b_n \to 0$.</p>` },
        ] },
      { n: 14, tags: ["sequence", "limit", "trig", "sinx-over-x", "lhopital"], src: ["p14_.png"],
        prompt: conv + R`$$a_n = \frac{n}{3}\sin\!\left(\frac3n\right)$$`,
        a: R`$\displaystyle\lim a_n = 1$`,
        w: R`<p>Let $t = 3/n \to 0^+$. Then $\dfrac n3 = \dfrac1t$ and $a_n = \dfrac{\sin t}{t} \to 1$.</p>
            <p>(Or: $\dfrac{\sin(3/n)}{3/n}$ is $\tfrac00$; L'Hôpital gives $\dfrac{\cos(3/n)\cdot(-3/n^2)}{-3/n^2} = \cos(3/n) \to 1$.)</p>` },
      { n: 15, tags: ["sequence", "limit", "logarithm", "continuous-function"], src: ["p15_.png"],
        prompt: conv + R`$$a_n = \ln(3n^2 + 4) - \ln(n^2 + 4)$$`,
        a: R`$\displaystyle\lim a_n = \ln 3$`,
        w: R`<p>Combine: $a_n = \ln\dfrac{3n^2+4}{n^2+4}$. The fraction $\to 3$ and $\ln$ is continuous, so $a_n \to \ln 3 \approx 1.0986$.</p>` },
      { n: 16, tags: ["sequence", "limit", "divergent", "oscillating", "graph", "trig"], src: ["p16_.png"],
        prompt: graph + R`$$a_n = \frac{n^2\cos(n)}{8 + n^2}$$`,
        a: "DIVERGES",
        w: R`<p>$\dfrac{n^2}{8+n^2} \to 1$, so for large $n$, $a_n \approx \cos n$. The values $\cos n$ keep wandering through $[-1, 1]$ (they come arbitrarily close to both $1$ and $-1$ infinitely often), so $a_n$ has no limit. The graph oscillates between about $\pm1$ without settling.</p>` },
      { n: 17, tags: ["sequence", "monotonic", "bounded", "derivative"], src: ["p17_.png"],
        prompt: R`Consider $$a_n = \frac{n}{5n^2 + 2}.$$ Determine whether the sequence is increasing, decreasing, or not monotonic. (Assume that $n$ begins with 1.) Is the sequence bounded?`,
        parts: [
          { l: "monotonic", opts: ["increasing", "decreasing", "not monotonic"], key: 1,
            w: R`<p>$f(x) = \dfrac{x}{5x^2+2}$, $f'(x) = \dfrac{(5x^2+2) - x(10x)}{(5x^2+2)^2} = \dfrac{2 - 5x^2}{(5x^2+2)^2} < 0$ for $x \ge 1$. So $a_{n+1} < a_n$. ($a_1 = \tfrac17 \approx 0.143$, $a_2 = \tfrac2{22} \approx 0.091$, …)</p>` },
          { l: "bounded", opts: ["bounded", "not bounded"], key: 0,
            w: R`<p>$0 < a_n \le a_1 = \tfrac17$ for all $n$.</p>` },
        ] },
      { n: 18, tags: ["sequence", "recursive", "word-problem", "geometric"], src: ["p18_.png"],
        prompt: R`A fish farmer has 4,000 catfish in his pond. The number of catfish increases by 8% per month and the farmer harvests 600 catfish per month.
          <p>(a) Show that the catfish population $P_n$ after $n$ months is given recursively by $P_n = 1.08P_{n-1} - 600$, $P_0 = 4{,}000$.<br>
          We are given that the initial population is 4,000, so $P_0 = \underline{\quad}$. The number of catfish increases by 8% per month and is decreased by 600 per month, so
          $P_1 = P_0 + 8\%P_0 - (\underline{\quad}) = 1.08P_0 - 600$, $\;P_2 = 1.08(\underline{\quad}) - 600$, and so on. This pattern will continue, and thus $P_n = 1.08P_{n-1} - (\underline{\quad})$.</p>
          <p>(b) Find the number of catfish in the pond after six months. (Round your answer to the nearest integer.)</p>`,
        parts: [
          { l: R`$P_0$`, a: "4000" },
          { l: R`$P_1$ blank`, a: "600" },
          { l: R`$P_2$ blank`, a: R`$P_1$` },
          { l: R`$P_n$ blank`, a: "600" },
          { l: "(b)", q: "catfish after six months", a: "1946 catfish",
            w: R`<p>Iterate: $P_1 = 3720$, $P_2 = 3417.6$, $P_3 = 3091.0$, $P_4 = 2738.3$, $P_5 = 2357.4$, $P_6 = 1946.0$.</p>
                <p>Closed form check: the fixed point is $P^* = 600/0.08 = 7500$, so $P_n = 7500 - 3500(1.08)^n$; $P_6 = 7500 - 3500(1.586874) = 1945.9 \approx 1946$.</p>` },
        ] },
      { n: 19, tags: ["sequence", "monotonic", "bounded"], src: ["p19_.png"],
        prompt: R`Consider $$a_n = \frac{1}{5n + 7}.$$ Determine whether the sequence is increasing, decreasing, or not monotonic. (Assume that $n$ begins with 1.) Is the sequence bounded?`,
        parts: [
          { l: "monotonic", opts: ["increasing", "decreasing", "not monotonic"], key: 1, w: R`<p>The denominator $5n + 7$ increases with $n$, so $a_{n+1} = \dfrac1{5n+12} < \dfrac1{5n+7} = a_n$.</p>` },
          { l: "bounded", opts: ["bounded", "not bounded"], key: 0, w: R`<p>$0 < a_n \le a_1 = \tfrac1{12}$.</p>` },
        ] },
      { n: 20, tags: ["sequence", "limit", "geometric", "graph"], src: ["p20_.png"],
        prompt: graph + R`$$a_n = 9 + \left(-\frac{2}{e}\right)^n$$`,
        a: R`$\displaystyle\lim a_n = 9$`,
        w: R`<p>$\left|-\tfrac2e\right| = \tfrac{2}{2.718} \approx 0.736 < 1$, so $\left(-\tfrac2e\right)^n \to 0$ (oscillating, shrinking). $a_n \to 9$.</p>` },
    ],
  };
})();
