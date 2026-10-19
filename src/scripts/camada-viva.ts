/*
  Camada viva (ui/CamadaViva.astro): núcleo do B que desce com a rolagem, troca de forma por seção
  e gira com a velocidade; luz fraca que segue o cursor; tom do fundo por seção.
  Só trabalha em quadros com algo mudando (rolagem, mouse ou o núcleo ainda assentando).
*/

// Forma do núcleo e tom do fundo por seção (classe ou id da seção). O resto usa o núcleo e o tom padrão.
const MAPA: Array<[string, string, string]> = [
  ["abertura", "nucleo", "padrao"],
  ["dor", "seta", "calmo"],
  ["proposta", "nucleo", "padrao"],
  ["metodo", "seta", "aceso"],
  ["beneficios", "check", "padrao"],
  ["projetos", "quadro", "aceso"],
  ["planos", "preco", "aceso"],
  ["processo", "seta", "padrao"],
  ["objecoes", "check", "calmo"],
  ["garantia", "check", "padrao"],
  ["sobre", "nucleo", "calmo"],
  ["urgencia", "medidor", "aceso"],
  ["duvidas", "nucleo", "calmo"],
  ["contato", "balao", "aceso"],
  ["ps", "balao", "padrao"],
];

const fundo = document.querySelector<HTMLElement>("[data-fundo-vivo]");
const nucleo = document.querySelector<HTMLElement>("[data-nucleo]");
const luz = document.querySelector<HTMLElement>("[data-luz-cursor]");
const secoes = [...document.querySelectorAll<HTMLElement>("main > *")];
const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function chave(el: HTMLElement) {
  return MAPA.find(([nome]) => el.id === nome || el.classList.contains(nome));
}
const info = secoes.map((el) => {
  const achado = chave(el);
  return { el, forma: achado?.[1] ?? "nucleo", tom: achado?.[2] ?? "padrao", claro: el.classList.contains("tema-claro") };
});

/** Seção que ocupa a altura y da tela (coordenadas da janela). */
function secaoEm(y: number) {
  for (const s of info) {
    const r = s.el.getBoundingClientRect();
    if (r.top <= y && r.bottom > y) return s;
  }
  return info[info.length - 1];
}

let formaAtual = "";
function marcarForma(forma: string) {
  if (!nucleo || forma === formaAtual) return;
  formaAtual = forma;
  for (const p of nucleo.querySelectorAll<SVGPathElement>("[data-forma]")) p.toggleAttribute("data-ativa", p.dataset.forma === forma);
}

// Estado do quadro
let ultimoY = window.scrollY;
let giro = 0;
let mouseX = -1;
let mouseY = -1;
let incX = 0;
let incY = 0;
let luzX = 0;
let luzY = 0;
let quadro = 0;

function desenhar() {
  quadro = 0;
  let ocupado = false;
  const alto = window.innerHeight;

  if (nucleo) {
    const max = Math.max(1, document.documentElement.scrollHeight - alto);
    const progresso = Math.min(1, Math.max(0, window.scrollY / max));
    const y = alto * (0.14 + 0.72 * progresso);

    // Gira com a velocidade da rolagem e volta devagar ao repouso
    const v = window.scrollY - ultimoY;
    ultimoY = window.scrollY;
    if (!reduzido) giro = giro * 0.9 + Math.max(-40, Math.min(40, v * 0.6)) * 0.1;
    // Inclina na direção do mouse, até 12 px
    const r = nucleo.getBoundingClientRect();
    const alvoX = !reduzido && mouseX >= 0 ? Math.max(-12, Math.min(12, (mouseX - (r.left + r.width / 2)) * 0.02)) : 0;
    const alvoY = !reduzido && mouseY >= 0 ? Math.max(-12, Math.min(12, (mouseY - y) * 0.02)) : 0;
    incX += (alvoX - incX) * 0.12;
    incY += (alvoY - incY) * 0.12;
    nucleo.style.transform = `translate3d(${incX.toFixed(2)}px, ${(y + incY).toFixed(2)}px, 0) rotate(${giro.toFixed(2)}deg)`;
    if (Math.abs(giro) > 0.05 || Math.abs(alvoX - incX) > 0.05 || Math.abs(alvoY - incY) > 0.05) ocupado = true;

    const s = secaoEm(y);
    marcarForma(s.forma);
    nucleo.toggleAttribute("data-claro", s.claro);
    if (fundo && fundo.dataset.tom !== s.tom) fundo.dataset.tom = s.tom;
  }

  if (luz && !reduzido && mouseX >= 0) {
    luzX += (mouseX - luzX) * 0.18;
    luzY += (mouseY - luzY) * 0.18;
    luz.style.transform = `translate3d(${luzX.toFixed(1)}px, ${luzY.toFixed(1)}px, 0)`;
    luz.toggleAttribute("data-claro", secaoEm(Math.min(alto - 1, Math.max(0, luzY))).claro);
    if (Math.abs(mouseX - luzX) > 0.5 || Math.abs(mouseY - luzY) > 0.5) ocupado = true;
  }

  if (ocupado) pedir();
}
function pedir() {
  if (!quadro) quadro = requestAnimationFrame(desenhar);
}

if (secoes.length && (nucleo || luz)) {
  window.addEventListener("scroll", pedir, { passive: true });
  window.addEventListener("resize", pedir, { passive: true });
  if (!reduzido) {
    let apagar = 0;
    window.addEventListener("pointermove", (e) => {
      if (mouseX < 0) { luzX = e.clientX; luzY = e.clientY; }
      mouseX = e.clientX;
      mouseY = e.clientY;
      luz?.setAttribute("data-ligada", "");
      window.clearTimeout(apagar);
      // No toque, a luz apaga pouco depois de o dedo sair da tela
      if (e.pointerType !== "mouse") apagar = window.setTimeout(() => luz?.removeAttribute("data-ligada"), 700);
      pedir();
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => {
      luz?.removeAttribute("data-ligada");
      mouseX = mouseY = -1;
      pedir();
    });
  }
  pedir();
}

export {};
