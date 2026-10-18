/*
  Menu do topo no celular (mapa técnico, arquivos 06 e 11).
  O botão tem aria-expanded e aria-controls. O painel fecha com Esc (e o foco volta ao botão),
  com clique num link, com toque fora do topo e ao passar para o computador.
  A rolagem da página continua livre.
*/
function ligarMenu(botao: HTMLButtonElement, painel: HTMLElement, topo: HTMLElement) {
  const computador = window.matchMedia("(min-width: 960px)");
  const aberto = () => botao.getAttribute("aria-expanded") === "true";

  const aoTeclar = (evento: KeyboardEvent) => {
    if (evento.key === "Escape") fechar(true);
  };
  const aoTocarFora = (evento: PointerEvent) => {
    if (!topo.contains(evento.target as Node)) fechar();
  };

  function abrir() {
    painel.hidden = false;
    botao.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("pointerdown", aoTocarFora);
  }

  function fechar(devolverFoco = false) {
    if (!aberto()) return;
    painel.hidden = true;
    botao.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", aoTeclar);
    document.removeEventListener("pointerdown", aoTocarFora);
    if (devolverFoco) botao.focus();
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
if (botao && painel && topo) ligarMenu(botao, painel, topo);

export {};
