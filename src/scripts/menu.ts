/*
  Menu do topo no celular (mapa técnico, arquivos 06 e 11).
  O botão tem aria-expanded e aria-controls. O painel abre como uma camada acima da página, com um
  véu por baixo. Fecha com Esc (e o foco volta ao botão), com clique num link, com toque no véu ou
  fora do topo, com Tab para fora, ao rolar a página e ao passar para o computador.
  A rolagem da página continua livre.
*/
const ROLAGEM_PARA_FECHAR = 24; // px: tolera o ajuste da barra do navegador no celular

function ligarMenu(botao: HTMLButtonElement, painel: HTMLElement, topo: HTMLElement, veu: HTMLElement | null) {
  const computador = window.matchMedia("(min-width: 960px)");
  const aberto = () => botao.getAttribute("aria-expanded") === "true";
  let rolagemAoAbrir = 0;

  const aoTeclar = (evento: KeyboardEvent) => {
    if (evento.key === "Escape") fechar(true);
  };
  // O véu fica dentro do topo: tocar nele também conta como tocar fora.
  const aoTocarFora = (evento: PointerEvent) => {
    const alvo = evento.target as Node;
    if (!topo.contains(alvo) || veu?.contains(alvo)) fechar();
  };
  // Se o foco estava num link do painel (ex.: setas do teclado), ele volta ao botão.
  const aoRolar = () => {
    if (Math.abs(window.scrollY - rolagemAoAbrir) > ROLAGEM_PARA_FECHAR) fechar(painel.contains(document.activeElement));
  };

  function abrir() {
    painel.hidden = false;
    botao.setAttribute("aria-expanded", "true");
    rolagemAoAbrir = window.scrollY;
    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("pointerdown", aoTocarFora);
    window.addEventListener("scroll", aoRolar, { passive: true });
  }

  function fechar(devolverFoco = false) {
    if (!aberto()) return;
    painel.hidden = true;
    botao.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", aoTeclar);
    document.removeEventListener("pointerdown", aoTocarFora);
    window.removeEventListener("scroll", aoRolar);
    if (devolverFoco) botao.focus({ preventScroll: true });
  }

  botao.addEventListener("click", () => (aberto() ? fechar() : abrir()));

  // Clique num link: fecha e deixa a âncora rolar normalmente.
  painel.addEventListener("click", (evento) => {
    if ((evento.target as Element).closest("a")) fechar();
  });

  // Tab para fora do topo (para outro elemento da página) também fecha.
  topo.addEventListener("focusout", (evento) => {
    const destino = evento.relatedTarget as Node | null;
    if (destino && !topo.contains(destino)) fechar();
  });

  computador.addEventListener("change", (evento) => {
    if (evento.matches) fechar();
  });
}

const botao = document.querySelector<HTMLButtonElement>("[data-menu-botao]");
const painel = botao ? document.getElementById(botao.getAttribute("aria-controls") ?? "") : null;
const topo = botao?.closest<HTMLElement>("header");
if (botao && painel && topo) ligarMenu(botao, painel, topo, topo.querySelector<HTMLElement>("[data-menu-veu]"));

export {};
