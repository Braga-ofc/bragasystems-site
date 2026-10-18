/*
  Grade cinética da primeira dobra: pontos a cada 32 px que se curvam na direção do mouse.
  Recriação do Kinetic Grid (21st.dev, satoriui, MIT) em canvas 2D: só a grade e o efeito de hover,
  sem a onda de clique.

  - A grade parada já vem no CSS (.abertura::before), nos mesmos pontos: o canvas assume sem salto.
  - Só desenha quando o mouse se mexe e até os pontos voltarem ao lugar; parado, não gasta nada.
  - No toque e com movimento reduzido, a grade fica parada (o CSS basta).
*/

const PASSO = 32;
const RAIO = 130; // alcance do mouse, em px
const PUXAO = 0.38; // quanto o ponto anda na direção do mouse, perto do pico
const SUAVE = 0.14; // quanto o ponto se aproxima do alvo a cada quadro
const COR = { r: 74, g: 87, b: 104, a: 0.85 }; // --line-forte, no mesmo tom da grade do CSS
const COR_PERTO = { r: 53, g: 213, b: 232 }; // --accent, só nos pontos mais próximos

function ligarGrade(tela: HTMLCanvasElement) {
  const area = tela.parentElement;
  const ctx = tela.getContext("2d");
  if (!area || !ctx) return;

  let largura = 0;
  let altura = 0;
  let dpr = 1;
  let xs: number[] = [];
  let ys: number[] = [];
  let dx = new Float32Array(0);
  let dy = new Float32Array(0);
  let mouse: { x: number; y: number } | null = null;
  let quadro = 0;

  // Os pontos caem nos mesmos lugares da grade do CSS: a primeira coluna na margem do conteúdo.
  function medir() {
    const r = area!.getBoundingClientRect();
    largura = r.width;
    altura = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    tela.width = Math.round(largura * dpr);
    tela.height = Math.round(altura * dpr);
    const gutter = Math.min(32, Math.max(20, window.innerWidth * 0.05));
    const inicio = Math.max(gutter, (largura - 1120 + PASSO) / 2) % PASSO;
    xs = [];
    ys = [];
    for (let x = inicio; x <= largura; x += PASSO) xs.push(x);
    for (let y = 0; y <= altura; y += PASSO) ys.push(y);
    dx = new Float32Array(xs.length * ys.length);
    dy = new Float32Array(xs.length * ys.length);
  }

  /** Um passo da física; devolve true enquanto algum ponto ainda se mexe. */
  function desenhar(): boolean {
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, largura, altura);
    let mexendo = false;
    let k = 0;
    for (const y of ys) {
      for (const x of xs) {
        let alvoX = 0;
        let alvoY = 0;
        let perto = 0;
        if (mouse) {
          const ox = mouse.x - x;
          const oy = mouse.y - y;
          const queda = Math.exp(-(ox * ox + oy * oy) / (RAIO * RAIO));
          alvoX = ox * PUXAO * queda;
          alvoY = oy * PUXAO * queda;
          perto = queda;
        }
        dx[k] += (alvoX - dx[k]) * SUAVE;
        dy[k] += (alvoY - dy[k]) * SUAVE;
        if (Math.abs(alvoX - dx[k]) > 0.05 || Math.abs(alvoY - dy[k]) > 0.05) mexendo = true;

        // Perto do mouse, o ponto cresce e esquenta para o ciano
        const t = Math.min(1, perto * 1.4);
        const tam = 1.75 + t * 1.25;
        const r = Math.round(COR.r + (COR_PERTO.r - COR.r) * t);
        const g = Math.round(COR.g + (COR_PERTO.g - COR.g) * t);
        const b = Math.round(COR.b + (COR_PERTO.b - COR.b) * t);
        ctx!.fillStyle = `rgb(${r} ${g} ${b} / ${COR.a + (0.9 - COR.a) * t})`;
        ctx!.fillRect(x + dx[k] - tam / 2 + 0.875, y + dy[k] - tam / 2 + 0.875, tam, tam);
        k++;
      }
    }
    return mexendo;
  }

  function laco() {
    quadro = desenhar() ? requestAnimationFrame(laco) : 0;
  }
  function tocar() {
    if (!quadro) quadro = requestAnimationFrame(laco);
  }

  medir();
  desenhar();
  area.classList.add("is-grade-viva");

  new ResizeObserver(() => {
    medir();
    desenhar();
  }).observe(area);

  area.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = area.getBoundingClientRect();
    mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    tocar();
  });
  area.addEventListener("pointerleave", () => {
    mouse = null;
    tocar();
  });
  // Rolar com o mouse parado tira a referência: os pontos voltam ao lugar
  window.addEventListener("scroll", () => {
    if (mouse) {
      mouse = null;
      tocar();
    }
  }, { passive: true });
}

const tela = document.querySelector<HTMLCanvasElement>("[data-grade-cinetica]");
const comMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (tela && comMouse && !semMovimento) ligarGrade(tela);

export {};
