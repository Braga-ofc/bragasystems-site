/*
  Animações infinitas de relógio (luzes, auroras, derivas, ponteiros) só rodam quando alguém pode vê-las.
  Medido em 27/10/2026: qualquer uma delas à vista fazia o Chrome produzir quadros sem parar, e com
  dezenas rodando fora da tela a página nunca descansava (Lighthouse: 94 s de bloqueio na carga).
  - Começam paradas e só andam na primeira interação ou 6 s depois da carga, e depois da abertura.
  - Fora da tela (com meia tela de folga), pausam; perto da tela, voltam.
  - Enquanto a página rola, todas pausam e voltam de onde estavam logo que a rolagem para (medido em
    28/10/2026 num celular simulado: de 37 para 47 quadros/s e nenhuma tarefa longa).
  As animações presas à rolagem (animation-timeline) e as finitas não passam por aqui.
  Só retoma o que este script pausou: o que a página pausa por conta própria continua com a página.
*/
const raiz = document.documentElement;
const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Áreas observadas: cada seção da página. Topo, rodapé e as camadas fixas ficam sempre "à vista". */
const areas = [...document.querySelectorAll<HTMLElement>("main > *, footer")];
const sempreVisiveis = [...document.querySelectorAll<HTMLElement>("header, [data-fundo-vivo], [data-nucleo]")];
const visivel = new Set<Element>(sempreVisiveis);
const pausadas = new WeakSet<Animation>();
let liberado = false;
let rolando = false;

const infinitas = (el: Element) =>
  el.getAnimations({ subtree: true }).filter(
    (a) => a.timeline === document.timeline && a.effect?.getComputedTiming().iterations === Infinity,
  );

/** Animações infinitas por área, guardadas: listar todas a cada rolagem forçava recálculo de estilo. */
const porArea = new Map<Element, Animation[]>();

function aplicar(area: Element, recontar = true) {
  if (recontar || !porArea.has(area)) porArea.set(area, infinitas(area));
  const rodar = liberado && !rolando && visivel.has(area);
  for (const a of porArea.get(area)!) {
    if (!rodar && a.playState === "running") {
      a.pause();
      pausadas.add(a);
    } else if (rodar && pausadas.has(a)) {
      a.play();
      pausadas.delete(a);
    }
  }
}
const aplicarTudo = () => [...areas, ...sempreVisiveis].forEach((a) => aplicar(a));

if (!reduzido && "IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) visivel.add(e.target);
        else visivel.delete(e.target);
        aplicar(e.target);
      }
    },
    { rootMargin: "50% 0px" },
  );
  areas.forEach((a) => observador.observe(a));
  aplicarTudo();

  // Durante a rolagem, o olho está no conteúdo: as luzes param e voltam 180 ms depois do último movimento
  let fimDaRolagem = 0;
  addEventListener(
    "scroll",
    () => {
      if (!rolando) {
        rolando = true;
        for (const area of visivel) aplicar(area, false);
      }
      clearTimeout(fimDaRolagem);
      fimDaRolagem = window.setTimeout(() => {
        rolando = false;
        for (const area of visivel) aplicar(area, false);
      }, 180);
    },
    { passive: true },
  );

  // Libera depois da carga, com o navegador livre, e só quando a abertura em vídeo já saiu
  const liberar = () => {
    if (raiz.hasAttribute("data-abertura")) {
      new MutationObserver((_, mo) => {
        if (raiz.hasAttribute("data-abertura")) return;
        mo.disconnect();
        liberar();
      }).observe(raiz, { attributes: true, attributeFilter: ["data-abertura"] });
      return;
    }
    liberado = true;
    aplicarTudo();
  };
  // Solta na primeira interação (rolar, tocar, mover o mouse, teclado) ou 6 s depois da carga,
  // o que vier antes: a carga e a primeira tela não disputam a thread com as luzes decorativas
  let solto = false;
  const soltar = () => {
    if (solto) return;
    solto = true;
    for (const t of eventos) removeEventListener(t, soltar);
    liberar();
  };
  const eventos = ["scroll", "wheel", "pointerdown", "pointermove", "keydown", "touchstart"];
  for (const t of eventos) addEventListener(t, soltar, { passive: true, once: true });
  const depoisDaCarga = () => setTimeout(soltar, 6000);
  if (document.readyState === "complete") depoisDaCarga();
  else addEventListener("load", depoisDaCarga, { once: true });
}

export {};
