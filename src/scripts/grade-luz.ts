/*
  Grade leve da primeira dobra (19/10/2026, no lugar da grade cinética em canvas): os pontos são CSS
  parado; com mouse, uma janela pequena (360 px) da mesma grade, em ciano, segue o cursor e acende os
  pontos em volta. Por quadro só mudam o transform e a posição do fundo dessa janela, então o custo
  fica perto de zero. Sem mouse (toque) ou com movimento reduzido: só os pontos parados.
*/
const area = document.querySelector<HTMLElement>(".abertura");
const luz = document.querySelector<HTMLElement>("[data-grade-luz]");
const LADO = 360;

if (area && luz && matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let x = 0;
  let y = 0;
  let quadro = 0;
  // Mesma origem da grade parada (index.astro): o padding esquerdo da abertura é a --borda-lateral
  const origemX = () => parseFloat(getComputedStyle(area).paddingLeft);
  const desenhar = () => {
    quadro = 0;
    const left = x - LADO / 2;
    const top = y - LADO / 2;
    luz.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    luz.style.backgroundPosition = `${origemX() - left}px ${-top}px`;
  };
  area.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = area.getBoundingClientRect();
    x = e.clientX - r.left;
    y = e.clientY - r.top;
    luz.setAttribute("data-ligada", "");
    if (!quadro) quadro = requestAnimationFrame(desenhar);
  }, { passive: true });
  area.addEventListener("pointerleave", () => luz.removeAttribute("data-ligada"));
}

export {};
