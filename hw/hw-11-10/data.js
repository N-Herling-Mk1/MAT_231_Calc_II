/* Homework 11.10 — Taylor and Maclaurin Series (WebAssign, transcribed from img/). Schema: assets/js/hw-engine.js. */
(function () {
  const R = String.raw;
  const DEF = R`Find the Maclaurin series for $f(x)$ using the definition of a Maclaurin series. [Assume that $f$ has a power series expansion. Do not show that $R_n(x) \to 0$.]`;
  const TBL = R`Use a Maclaurin series in the table of important Maclaurin series to obtain the Maclaurin series for the given function.`;
  const TAY = R`Find the Taylor series for $f(x)$ centered at the given value of $a$. [Assume that $f$ has a power series expansion. Do not show that $R_n(x) \to 0$.]`;
  const tbl = (rows) => `<table class="tbl"><tr><th>$n$</th><th>$f^{(n)}(0)$</th></tr>${rows.map((r, i) => `<tr><td>${i}</td><td>${r}</td></tr>`).join("")}</table>`;
  window.HW = {
    id: "mat231-hw-11-10", sec: "11.10", title: "Taylor and Maclaurin Series", deck: "11-10", quiz: "quizzes/quiz-11-10/index.html",
    intro: R`Taylor series at $a$: $\displaystyle f(x) = \sum_{n=0}^\infty \frac{f^{(n)}(a)}{n!}(x-a)^n$ (Maclaurin: $a = 0$). Table: $e^x = \sum\frac{x^n}{n!}$, $\ \cos x = \sum\frac{(-1)^nx^{2n}}{(2n)!}$, $\ \sin x = \sum\frac{(-1)^nx^{2n+1}}{(2n+1)!}$, $\ \ln(1+x) = \sum_{n\ge1}\frac{(-1)^{n-1}x^n}{n}$, all with $R = \infty$ except $\ln(1+x)$ ($R = 1$).`,
    problems: [
      { n: 1, tags: ["maclaurin-series", "radius-of-convergence", "factorial"], src: ["p1_.png"],
        prompt: R`If $f^{(n)}(0) = (n+1)!$ for $n = 0, 1, 2, \dots$, find the Maclaurin series for $f$. Find its radius of convergence $R$.`,
        parts: [{ l: R`$\sum_{n=0}^\infty$`, a: R`$(n+1)x^n$` }, { l: "$R$", a: "$1$" }],
        w: R`<p>$c_n = \dfrac{f^{(n)}(0)}{n!} = \dfrac{(n+1)!}{n!} = n + 1$. Ratio: $\dfrac{n+2}{n+1}|x| \to |x|$, so $R = 1$. (This is $\frac1{(1-x)^2}$.)</p>` },
      { n: 2, tags: ["maclaurin-series", "radius-of-convergence", "binomial-series"], src: ["p2_.png"],
        prompt: DEF + R`$$f(x) = 7(1-x)^{-2}$$ Find the associated radius of convergence $R$.`,
        parts: [{ l: R`$\sum_{n=0}^\infty$`, a: R`$7(n+1)x^n$` }, { l: "$R$", a: "$1$" }],
        w: R`<p>$f^{(n)}(x) = 7(n+1)!\,(1-x)^{-(n+2)}$, so $f^{(n)}(0) = 7(n+1)!$ and $c_n = 7(n+1)$. Same ratio as problem 1: $R = 1$.</p>` },
      { n: 3, tags: ["maclaurin-series", "derivatives-table", "logarithm", "radius-of-convergence"], src: ["p3_a.png", "p3_b.png"],
        prompt: R`Consider $f(x) = \ln(1 + 4x)$. Complete the table of $f^{(n)}(0)$ for $n = 0, \dots, 4$. ` + DEF + R` Find the associated radius of convergence $R$.`,
        parts: [
          { l: "table", a: tbl(["$0$", "$4$", "$-16$", "$128$", "$-1536$"]),
            w: R`<p>$f' = \dfrac{4}{1+4x}$, $f'' = \dfrac{-16}{(1+4x)^2}$, $f''' = \dfrac{128}{(1+4x)^3}$, $f^{(4)} = \dfrac{-1536}{(1+4x)^4}$. In general $f^{(n)}(0) = (-1)^{n-1}(n-1)!\,4^n$.</p>` },
          { l: R`$\sum_{n=1}^\infty$`, a: R`$\dfrac{(-1)^{n-1}4^n}{n}x^n$`, w: R`<p>$c_n = \dfrac{(-1)^{n-1}(n-1)!\,4^n}{n!} = \dfrac{(-1)^{n-1}4^n}{n}$ — the $\ln(1+u)$ series with $u = 4x$.</p>` },
          { l: "$R$", a: R`$\tfrac14$`, w: R`<p>Need $|4x| < 1$.</p>` },
        ] },
      { n: 4, tags: ["maclaurin-series", "derivatives-table", "exponential", "radius-of-convergence"], src: ["p4_a.png", "p4_b.png"],
        prompt: R`Consider $f(x) = e^{-6x}$. Complete the table of $f^{(n)}(0)$ for $n = 0, \dots, 4$. ` + DEF + R` Find the associated radius of convergence $R$.`,
        parts: [
          { l: "table", a: tbl(["$1$", "$-6$", "$36$", "$-216$", "$1296$"]), w: R`<p>Each derivative multiplies by $-6$: $f^{(n)}(0) = (-6)^n$.</p>` },
          { l: R`$\sum_{n=0}^\infty$`, a: R`$\dfrac{(-1)^n6^n}{n!}x^n$` },
          { l: "$R$", a: R`$\infty$`, w: R`<p>Ratio $= \dfrac{6|x|}{n+1} \to 0$.</p>` },
        ] },
      { n: 5, tags: ["maclaurin-series", "exponential", "radius-of-convergence"], src: ["p5_.png"],
        prompt: DEF + R`$$f(x) = 9^x$$ Find the associated radius of convergence $R$.`,
        parts: [{ l: R`$\sum_{n=0}^\infty$`, a: R`$\dfrac{(\ln 9)^n}{n!}x^n$` }, { l: "$R$", a: R`$\infty$` }],
        w: R`<p>$f^{(n)}(x) = (\ln 9)^n9^x$, so $f^{(n)}(0) = (\ln 9)^n$. (Equivalently $9^x = e^{x\ln 9}$ in the $e^u$ series.)</p>` },
      { n: 6, tags: ["maclaurin-series", "exponential", "table-series"], src: ["p6_.png"],
        prompt: TBL + R`$$f(x) = 8e^x + e^{8x}$$`,
        a: R`$\displaystyle\sum_{n=0}^\infty \frac{(8 + 8^n)x^n}{n!}$`,
        w: R`<p>$8e^x = \sum\dfrac{8x^n}{n!}$ and $e^{8x} = \sum\dfrac{(8x)^n}{n!} = \sum\dfrac{8^nx^n}{n!}$. Add term by term.</p>` },
      { n: 7, tags: ["maclaurin-series", "trig", "table-series"], src: ["p7_.png"],
        prompt: TBL + R`$$f(x) = x\cos(2x)$$`,
        a: R`$\displaystyle\sum_{n=0}^\infty \frac{(-1)^n2^{2n}x^{2n+1}}{(2n)!}$`,
        w: R`<p>$\cos(2x) = \sum\dfrac{(-1)^n(2x)^{2n}}{(2n)!}$; multiply by $x$.</p>` },
      { n: 8, tags: ["maclaurin-series", "trig", "table-series"], src: ["p8_.png"],
        prompt: TBL + R`$$f(x) = 9x\cos\!\left(\tfrac14x^2\right)$$`,
        a: R`$\displaystyle\sum_{n=0}^\infty \frac{9(-1)^nx^{4n+1}}{4^{2n}(2n)!}$`,
        w: R`<p>$u = \tfrac{x^2}{4}$: $\cos u = \sum\dfrac{(-1)^nu^{2n}}{(2n)!} = \sum\dfrac{(-1)^nx^{4n}}{4^{2n}(2n)!}$. Multiply by $9x$.</p>` },
      { n: 9, tags: ["taylor-series", "logarithm", "radius-of-convergence"], src: ["p9_.png"],
        prompt: TAY + R`$$f(x) = \ln x, \qquad a = 4$$ Complete $f(x) = \ln 4 + \displaystyle\sum_{n=1}^\infty(\ \cdot\ )$. Find the associated radius of convergence $R$.`,
        parts: [{ l: "term", a: R`$\dfrac{(-1)^{n-1}(x-4)^n}{n\,4^n}$` }, { l: "$R$", a: "$4$" }],
        w: R`<p>$f^{(n)}(x) = (-1)^{n-1}(n-1)!\,x^{-n}$, so $\dfrac{f^{(n)}(4)}{n!} = \dfrac{(-1)^{n-1}}{n\,4^n}$.</p><p>Ratio $\to \dfrac{|x-4|}{4}$, so $R = 4$. (Check: $\ln x = \ln 4 + \ln\left(1 + \frac{x-4}4\right)$.)</p>` },
      { n: 10, tags: ["taylor-series", "exponential", "radius-of-convergence"], src: ["p10_.png"],
        prompt: TAY + R`$$f(x) = e^{2x}, \qquad a = 6$$ Find the associated radius of convergence $R$.`,
        parts: [{ l: R`$\sum_{n=0}^\infty$`, a: R`$\dfrac{e^{12}2^n(x-6)^n}{n!}$` }, { l: "$R$", a: R`$\infty$` }],
        w: R`<p>$f^{(n)}(x) = 2^ne^{2x}$, so $f^{(n)}(6) = 2^ne^{12}$. (Also $e^{2x} = e^{12}e^{2(x-6)}$.)</p>` },
    ],
  };
})();
