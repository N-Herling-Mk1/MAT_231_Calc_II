/* Homework 11.6 — Absolute Convergence and the Ratio and Root Tests (WebAssign, transcribed from img/). Schema: assets/js/hw-engine.js. */
(function () {
  const R = String.raw;
  const RT = R`Use the Ratio Test to determine whether the series is convergent or divergent.`;
  const ROOT = R`Use the Root Test to determine whether the series is convergent or divergent.`;
  const four = ["absolutely convergent", "conditionally convergent", "divergent", "cannot be determined"];
  const icd = ["inconclusive", "conclusive (convergent)", "conclusive (divergent)"];
  const since = (cmp, concl, root) => ({ l: "complete", q: root ? R`Since $\lim\sqrt[n]{|a_n|}$ ____ 1, ____.` : R`Since $\lim\left|\frac{a_{n+1}}{a_n}\right|$ ____ 1, ____.`, a: `${cmp} · ${concl}` });
  window.HW = {
    id: "mat231-hw-11-6", sec: "11.6", title: "Ratio and Root Tests", deck: "11-6", quiz: "quizzes/quiz-11-6/index.html",
    intro: R`Ratio Test: $L = \lim\left|\dfrac{a_{n+1}}{a_n}\right|$. Root Test: $L = \lim\sqrt[n]{|a_n|}$. In both, $L < 1$ ⇒ absolutely convergent; $L > 1$ (or $\infty$) ⇒ divergent; $L = 1$ ⇒ inconclusive.`,
    problems: [
      { n: 1, tags: ["ratio-test", "theory", "absolute-convergence"], src: ["p1_a.png", "p1_b.png"],
        prompt: R`What can you say about the series $\sum a_n$ in each of the following cases?`,
        parts: [
          { l: "(a)", q: R`$\lim\left|\dfrac{a_{n+1}}{a_n}\right| = 9$`, opts: four, key: 2, w: R`<p>$L = 9 > 1$ ⇒ divergent.</p>` },
          { l: "(b)", q: R`$\lim\left|\dfrac{a_{n+1}}{a_n}\right| = 0.2$`, opts: four, key: 0, w: R`<p>$L = 0.2 < 1$ ⇒ absolutely convergent.</p>` },
          { l: "(c)", q: R`$\lim\left|\dfrac{a_{n+1}}{a_n}\right| = 1$`, opts: four, key: 3, w: R`<p>$L = 1$: the Ratio Test gives no information ($\sum \tfrac1n$ and $\sum\tfrac1{n^2}$ both have $L = 1$).</p>` },
        ] },
      { n: 2, tags: ["ratio-test"], src: ["p2_.png"],
        prompt: RT + R`$$\sum_{n=1}^\infty \frac{n}{7^n}$$ Identify $a_n$. Evaluate $\lim\left|\frac{a_{n+1}}{a_n}\right|$.`,
        parts: [{ l: R`$a_n$`, a: R`$\dfrac{n}{7^n}$` }, { l: "limit", a: R`$\dfrac17$` }, since("<", "the series is convergent")],
        w: R`<p>$\left|\dfrac{a_{n+1}}{a_n}\right| = \dfrac{n+1}{7^{n+1}}\cdot\dfrac{7^n}{n} = \dfrac{n+1}{7n} \to \dfrac17 < 1$.</p>` },
      { n: 3, tags: ["ratio-test", "alternating", "divergent"], src: ["p3_.png"],
        prompt: RT + R`$$\sum_{n=1}^\infty (-1)^{n-1}\frac{8^n}{3^n n^3}$$ Identify $a_n$. Evaluate $\lim\left|\frac{a_{n+1}}{a_n}\right|$.`,
        parts: [{ l: R`$a_n$`, a: R`$(-1)^{n-1}\dfrac{8^n}{3^nn^3}$` }, { l: "limit", a: R`$\dfrac83$` }, since(">", "the series is divergent")],
        w: R`<p>$\left|\dfrac{a_{n+1}}{a_n}\right| = \dfrac{8^{n+1}}{3^{n+1}(n+1)^3}\cdot\dfrac{3^nn^3}{8^n} = \dfrac83\left(\dfrac{n}{n+1}\right)^3 \to \dfrac83 > 1$.</p>` },
      { n: 4, tags: ["ratio-test", "factorial"], src: ["p4_.png"],
        prompt: RT + R`$$\sum_{k=1}^\infty \frac4{k!}$$ Identify $a_k$. Evaluate $\lim\left|\frac{a_{k+1}}{a_k}\right|$.`,
        parts: [{ l: R`$a_k$`, a: R`$\dfrac4{k!}$` }, { l: "limit", a: "$0$" }, since("<", "the series is convergent")],
        w: R`<p>$\dfrac{4/(k+1)!}{4/k!} = \dfrac{k!}{(k+1)!} = \dfrac1{k+1} \to 0 < 1$. (The sum is $4(e - 1)$.)</p>` },
      { n: 5, tags: ["ratio-test", "factorial", "divergent"], src: ["p5_.png"],
        prompt: RT + R`$$\sum_{n=1}^\infty \frac{n!}{86^n}$$ Identify $a_n$. Evaluate $\lim\left|\frac{a_{n+1}}{a_n}\right|$.`,
        parts: [{ l: R`$a_n$`, a: R`$\dfrac{n!}{86^n}$` }, { l: "limit", a: R`$\infty$` }, since(">", "the series is divergent")],
        w: R`<p>$\dfrac{(n+1)!}{86^{n+1}}\cdot\dfrac{86^n}{n!} = \dfrac{n+1}{86} \to \infty$. Factorials beat any exponential.</p>` },
      { n: 6, tags: ["ratio-test", "alternating", "absolute-convergence"], src: ["p6_.png"],
        prompt: RT + R`$$\sum_{n=1}^\infty \frac{n\pi^n}{(-9)^{n-1}}$$ Identify $a_n$. Evaluate $\lim\left|\frac{a_{n+1}}{a_n}\right|$.`,
        parts: [{ l: R`$a_n$`, a: R`$\dfrac{n\pi^n}{(-9)^{n-1}}$` }, { l: "limit", a: R`$\dfrac\pi9$` }, since("<", "the series is convergent")],
        w: R`<p>$\left|\dfrac{(n+1)\pi^{n+1}}{9^n}\cdot\dfrac{9^{n-1}}{n\pi^n}\right| = \dfrac{n+1}{n}\cdot\dfrac\pi9 \to \dfrac\pi9 \approx 0.349 < 1$.</p>` },
      { n: 7, tags: ["ratio-test", "factorial", "alternating", "product-of-odds"], src: ["p7_.png"],
        prompt: RT + R`$$1 - \frac{2!}{1\cdot3} + \frac{3!}{1\cdot3\cdot5} - \frac{4!}{1\cdot3\cdot5\cdot7} + \cdots + (-1)^{n-1}\frac{n!}{1\cdot3\cdot5\cdots(2n-1)} + \cdots$$ Identify $a_n$. Evaluate $\lim\left|\frac{a_{n+1}}{a_n}\right|$.`,
        parts: [{ l: R`$a_n$`, a: R`$\dfrac{(-1)^{n-1}\,n!}{1\cdot3\cdot5\cdots(2n-1)}$` }, { l: "limit", a: R`$\dfrac12$` }, since("<", "the series is convergent")],
        w: R`<p>Going from $n$ to $n+1$ multiplies the numerator by $(n+1)$ and the denominator by the next odd number $(2n+1)$:</p>$$\left|\frac{a_{n+1}}{a_n}\right| = \frac{n+1}{2n+1} \to \frac12 < 1.$$` },
      { n: 8, tags: ["ratio-test", "factorial", "divergent"], src: ["p8_.png"],
        prompt: RT + R`$$\sum_{n=1}^\infty \frac{7\cdot14\cdot21\cdots(7n)}{n!}$$ Identify $a_n$. Evaluate $\lim\left|\frac{a_{n+1}}{a_n}\right|$.`,
        parts: [
          { l: R`$a_n$`, opts: [R`$\dfrac{7n!}{n!}$`, R`$\dfrac{(7n)!}{n!}$`, R`$\dfrac{7\cdot14\cdot21\cdots(7n)}{n!}$`, R`$\dfrac{(7n)!}{n}$`, R`$\dfrac{7\cdot14\cdot21\cdots(7n)}{n}$`], key: 2 },
          { l: "limit", a: "$7$" }, since(">", "the series is divergent"),
        ],
        w: R`<p>$\dfrac{a_{n+1}}{a_n} = \dfrac{7(n+1)}{n+1} = 7 > 1$. (In fact $7\cdot14\cdots(7n) = 7^n n!$, so $a_n = 7^n$.) Note $(7n)!$ is <em>not</em> the same as $7\cdot14\cdots(7n)$.</p>` },
      { n: 9, tags: ["root-test", "rational"], src: ["p9_.png"],
        prompt: ROOT + R`$$\sum_{n=1}^\infty \left(\frac{n^2+8}{5n^2+2}\right)^n$$ Identify $a_n$. Evaluate $\lim\sqrt[n]{|a_n|}$.`,
        parts: [{ l: R`$a_n$`, a: R`$\left(\dfrac{n^2+8}{5n^2+2}\right)^n$` }, { l: "limit", a: R`$\dfrac15$` }, since("<", "the series is convergent", true)],
        w: R`<p>$\sqrt[n]{a_n} = \dfrac{n^2+8}{5n^2+2} \to \dfrac15 < 1$.</p>` },
      { n: 10, tags: ["root-test", "divergent"], src: ["p10_.png"],
        prompt: ROOT + R`$$\sum_{n=1}^\infty \left(\frac{-9n}{n+1}\right)^{2n}$$ Identify $a_n$. Evaluate $\lim\sqrt[n]{|a_n|}$.`,
        parts: [{ l: R`$a_n$`, a: R`$\left(-\dfrac{9n}{n+1}\right)^{2n}$` }, { l: "limit", a: "$81$" }, since(">", "the series is divergent", true)],
        w: R`<p>$\sqrt[n]{|a_n|} = \left(\dfrac{9n}{n+1}\right)^2 \to 9^2 = 81 > 1$. (The exponent is $2n$, so the $n$th root leaves a square.)</p>` },
      { n: 11, tags: ["root-test", "e-limit", "divergent"], src: ["p11_.png"],
        prompt: ROOT + R`$$\sum_{n=1}^\infty 7\left(1 + \frac1n\right)^{n^2}$$ Identify $a_n$. Evaluate $\lim\sqrt[n]{|a_n|}$.`,
        parts: [{ l: R`$a_n$`, a: R`$7\left(1 + \dfrac1n\right)^{n^2}$` }, { l: "limit", a: "$e$" }, since(">", "the series is divergent", true)],
        w: R`<p>$\sqrt[n]{a_n} = 7^{1/n}\left(1 + \dfrac1n\right)^{n} \to 1\cdot e = e > 1$. (Recall $\lim(1 + 1/n)^n = e$ and $7^{1/n} \to 1$.)</p>` },
      { n: 12, tags: ["ratio-test", "inconclusive", "p-series"], src: ["p12_a.png", "p12_b.png"],
        prompt: R`Determine whether the Ratio Test is inconclusive (that is, it fails to give a definite answer), conclusive (convergent), or conclusive (divergent) for each series.`,
        parts: [
          { l: "(a)", q: R`$\displaystyle\sum_{n=3}^\infty \frac7{n^3}$`, opts: icd, key: 0, w: R`<p>$\left(\frac{n}{n+1}\right)^3 \to 1$: inconclusive (it converges as a p-series, but the Ratio Test can't tell).</p>` },
          { l: "(b)", q: R`$\displaystyle\sum_{n=1}^\infty \frac{n}{6^n}$`, opts: icd, key: 1, w: R`<p>$\frac{n+1}{6n} \to \frac16 < 1$.</p>` },
          { l: "(c)", q: R`$\displaystyle\sum_{n=3}^\infty \frac{(-4)^{n-1}}{\sqrt n}$`, opts: icd, key: 2, w: R`<p>$4\sqrt{\frac{n}{n+1}} \to 4 > 1$.</p>` },
          { l: "(d)", q: R`$\displaystyle\sum_{n=1}^\infty \frac{\sqrt n}{1+n^2}$`, opts: icd, key: 0, w: R`<p>Rational-type terms always give ratio $\to 1$: inconclusive. (LCT with $n^{-3/2}$ shows it converges.)</p>` },
        ] },
    ],
  };
})();
