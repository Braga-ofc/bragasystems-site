/*
  Rolagem suave do site inteiro com Lenis (MIT, pedido do Gustavo em 19/10/2026, a partir do site da EBEN).
  O Lenis rola a própria janela, então as animações por rolagem (CSS view() e camada-viva) seguem iguais.
  Com movimento reduzido fica a rolagem nativa. Âncoras (#planos etc.) também deslizam, descontando o topo fixo.
*/
import Lenis from "lenis";
import "lenis/dist/lenis.css";

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 } });
  // O laço só roda enquanto há rolagem: parado, ele pedia um quadro novo a cada 16 ms para sempre
  // e a página nunca descansava (medido em 27/10/2026)
  let quadro = 0;
  let acordou = true;
  const passo = (t: number) => {
    // Ao acordar, o Lenis mediria o tempo desde o último quadro (segundos) e terminaria a rolagem num pulo
    if (acordou) {
      lenis.time = t - 1000 / 60;
      acordou = false;
    }
    lenis.raf(t);
    // Dorme só depois de 10 quadros seguidos parados: o Lenis pode levar alguns quadros para começar
    parados = lenis.isScrolling ? 0 : parados + 1;
    quadro = parados < 10 ? requestAnimationFrame(passo) : 0;
    if (!quadro) acordou = true;
  };
  let parados = 0;
  const acordar = () => {
    parados = 0;
    if (!quadro) quadro = requestAnimationFrame(passo);
  };
  lenis.on("virtual-scroll", acordar);
  lenis.on("scroll", acordar);
  // Âncoras e teclado: o Lenis começa a rolar no clique; o laço acorda logo depois
  for (const t of ["click", "keydown"]) addEventListener(t, acordar, { passive: true });
  acordar();
}

export {};
