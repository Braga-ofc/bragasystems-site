/*
  Rolagem suave do site inteiro com Lenis (MIT, pedido do Gustavo em 19/10/2026, a partir do site da EBEN).
  O Lenis rola a própria janela, então as animações por rolagem (CSS view() e camada-viva) seguem iguais.
  Com movimento reduzido fica a rolagem nativa. Âncoras (#planos etc.) também deslizam, descontando o topo fixo.
*/
import Lenis from "lenis";
import "lenis/dist/lenis.css";

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 } });
  const quadro = (t: number) => {
    lenis.raf(t);
    requestAnimationFrame(quadro);
  };
  requestAnimationFrame(quadro);
}

export {};
