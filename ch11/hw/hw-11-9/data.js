/* Homework 11.9 — Representations of Functions as Power Series (WebAssign, transcribed from img/). Schema: assets/js/hw-engine.js. */
(function () {
  const R = String.raw;
  const PS = R`Find a power series representation for the function. (Give your power series representation centered at $x = 0$.)`;
  window.HW = {
    id: "mat231-hw-11-9", sec: "11.9", title: "Functions as Power Series", deck: "11-9", quiz: "quizzes/quiz-11-9/index.html",
    intro: R`Master series: $\displaystyle\frac1{1-u} = \sum_{n=0}^\infty u^n$ for $|u| < 1$. Substitute for $u$, multiply by powers of $x$, and differentiate or integrate term by term (the radius stays the same; endpoints may change).`,
    problems: [
      { n: 1, tags: ["power-series-representation", "geometric", "interval-of-convergence"], src: ["p1_.png"],
        prompt: R`Find a power series representation for the function. (Center your power series representation at $x = 0$.) $$f(x) = \frac{1}{5 + x}$$ Determine the interval of convergence.`,
        parts: [{ l: R`$f(x) = \sum_{n=0}^\infty$`, a: R`$\dfrac{(-1)^nx^n}{5^{n+1}}$` }, { l: "$I$", a: "$(-5, 5)$" }],
        w: R`<p>$\dfrac1{5+x} = \dfrac15\cdot\dfrac{1}{1 - (-x/5)} = \dfrac15\sum\left(-\dfrac x5\right)^n = \sum\dfrac{(-1)^nx^n}{5^{n+1}}$.</p><p>Valid for $|x/5| < 1$; geometric series diverge at both endpoints.</p>` },
      { n: 2, tags: ["power-series-representation", "geometric", "interval-of-convergence"], src: ["p2_.png"],
        prompt: PS + R`$$f(x) = \frac{4}{1 - x^2}$$ Determine the interval of convergence.`,
        parts: [{ l: R`$f(x) = \sum_{n=0}^\infty$`, a: R`$4x^{2n}$` }, { l: "$I$", a: "$(-1, 1)$" }],
        w: R`<p>$u = x^2$: $4\sum (x^2)^n = \sum 4x^{2n}$, valid for $x^2 < 1$.</p>` },
      { n: 3, tags: ["power-series-representation", "geometric", "interval-of-convergence"], src: ["p3_.png"],
        prompt: PS + R`$$f(x) = \frac{x}{4 + x^2}$$ Determine the interval of convergence.`,
        parts: [{ l: R`$f(x) = \sum_{n=0}^\infty$`, a: R`$\dfrac{(-1)^nx^{2n+1}}{4^{n+1}}$` }, { l: "$I$", a: "$(-2, 2)$" }],
        w: R`<p>$\dfrac{x}{4}\cdot\dfrac1{1 + x^2/4} = \dfrac x4\sum\left(-\dfrac{x^2}4\right)^n = \sum\dfrac{(-1)^nx^{2n+1}}{4^{n+1}}$; need $x^2 < 4$.</p>` },
      { n: 4, tags: ["power-series-representation", "geometric", "interval-of-convergence"], src: ["p4_.png"],
        prompt: PS + R`$$f(x) = \frac{x^2}{x^4 + 81}$$ Determine the interval of convergence.`,
        parts: [{ l: R`$f(x) = \sum_{n=0}^\infty$`, a: R`$\dfrac{(-1)^nx^{4n+2}}{3^{4n+4}}$` }, { l: "$I$", a: "$(-3, 3)$" }],
        w: R`<p>$\dfrac{x^2}{81}\cdot\dfrac1{1 + x^4/81} = \dfrac{x^2}{81}\sum\left(-\dfrac{x^4}{81}\right)^n = \sum\dfrac{(-1)^nx^{4n+2}}{81^{n+1}}$, and $81^{n+1} = 3^{4n+4}$. Need $x^4 < 81 \iff |x| < 3$.</p>` },
      { n: 5, tags: ["power-series-representation", "differentiation-of-series", "radius-of-convergence"], src: ["p5_.png"],
        prompt: R`Find a power series representation for the function. $$f(x) = \frac{x^3}{(x-3)^2}$$ Determine the radius of convergence, $R$.`,
        parts: [{ l: R`$f(x) = \sum_{n=0}^\infty$`, a: R`$\dfrac{(n+1)x^{n+3}}{3^{n+2}}$` }, { l: "$R$", a: "$3$" }],
        w: R`<p>$(x-3)^2 = (3-x)^2$. Start from $\dfrac1{3-x} = \dfrac13\cdot\dfrac{1}{1 - x/3} = \sum_{n=0}^\infty\dfrac{x^n}{3^{n+1}}$.</p>
            <p>Differentiate: $\dfrac1{(3-x)^2} = \sum_{n=1}^\infty\dfrac{nx^{n-1}}{3^{n+1}} = \sum_{n=0}^\infty\dfrac{(n+1)x^n}{3^{n+2}}$.</p>
            <p>Multiply by $x^3$: $\sum\dfrac{(n+1)x^{n+3}}{3^{n+2}}$, $R = 3$.</p>` },
      { n: 6, tags: ["power-series-representation", "differentiation-of-series", "radius-of-convergence"], src: ["p6_.png"],
        prompt: R`Find a power series representation for the function. $$f(x) = \frac{x}{(1+4x)^2}$$ Determine the radius of convergence, $R$.`,
        parts: [{ l: R`$f(x) = \sum_{n=0}^\infty$`, a: R`$(-4)^n(n+1)x^{n+1}$` }, { l: "$R$", a: R`$\tfrac14$` }],
        w: R`<p>$\dfrac1{1+4x} = \sum(-4x)^n = \sum(-4)^nx^n$. Differentiate: $\dfrac{-4}{(1+4x)^2} = \sum_{n=1}^\infty n(-4)^nx^{n-1}$, so</p>
            $$\frac1{(1+4x)^2} = \sum_{n=1}^\infty n(-4)^{n-1}x^{n-1} = \sum_{n=0}^\infty (n+1)(-4)^nx^n.$$
            <p>Times $x$: $\sum(-4)^n(n+1)x^{n+1}$. Need $|4x| < 1$.</p>` },
      { n: 7, tags: ["power-series-representation", "integration-of-series", "logarithm", "radius-of-convergence"], src: ["p7_.png"],
        prompt: PS + R`$$f(x) = \ln(7 - x)$$ Complete: $f(x) = \ln 7 - \displaystyle\sum_{n=1}^\infty(\ \cdot\ )$. Determine the radius of convergence, $R$.`,
        parts: [{ l: "term", a: R`$\dfrac{x^n}{n\cdot 7^n}$` }, { l: "$R$", a: "$7$" }],
        w: R`<p>$f'(x) = -\dfrac1{7-x} = -\sum_{n=0}^\infty\dfrac{x^n}{7^{n+1}}$. Integrate: $f(x) = C - \sum_{n=0}^\infty\dfrac{x^{n+1}}{(n+1)7^{n+1}} = C - \sum_{n=1}^\infty\dfrac{x^n}{n7^n}$.</p><p>$x = 0$ gives $C = \ln 7$.</p>` },
      { n: 8, tags: ["power-series-representation", "geometric", "partial-sums", "graph", "interval-of-convergence"], src: ["p8_.png"],
        prompt: R`A graphing calculator is recommended. Find a power series representation for $f$ (centered at $x = 0$). $$f(x) = \frac{x^2}{x^2 + 1}$$ Graph $f$ and several partial sums $s_n(x)$ on the same screen. What happens as $n$ increases? As $n$ increases, $s_n(x)$ approximates $f$ better on the interval of convergence, which is ____.`,
        parts: [{ l: R`$f(x) = \sum_{n=0}^\infty$`, a: R`$(-1)^nx^{2n+2}$` }, { l: "interval", a: "$(-1, 1)$" }],
        w: R`<p>$x^2\cdot\dfrac{1}{1 - (-x^2)} = x^2\sum(-x^2)^n = \sum(-1)^nx^{2n+2}$, valid for $x^2 < 1$. Outside $(-1,1)$ the partial sums blow up even though $f$ is defined everywhere.</p>` },
    ],
  };
})();
