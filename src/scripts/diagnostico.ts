/*
  Medidor de fluidez para testar no celular de verdade (só abre com ?fps no endereço).
  Mostra os quadros por segundo e, por seção, quantos quadros passaram de 33 ms (travadas).
  Tocar no painel mostra o resumo por seção, para mandar print.
*/
const secoes = [...document.querySelectorAll<HTMLElement>("main > *")];
const nomeDe = (el: HTMLElement) => el.id || el.classList[1] || el.classList[0] || el.tagName.toLowerCase();
const porSecao = new Map<string, { quadros: number; travados: number; pior: number }>();

const painel = document.createElement("div");
painel.setAttribute("role", "status");
painel.style.cssText =
  // No alto, logo abaixo do topo: embaixo, a barra do navegador do celular cobria o painel
  "position:fixed;left:8px;top:calc(env(safe-area-inset-top) + 76px);z-index:2147483647;padding:8px 10px;max-width:calc(100vw - 16px);font:600 12px/1.45 'JetBrains Mono',monospace;color:#F2F5F8;background:#080B0F;border:2px solid #35D5E8;white-space:pre;pointer-events:auto";
painel.textContent = "medindo…";
document.body.append(painel);
let aberto = false;
painel.addEventListener("click", () => (aberto = !aberto));

function secaoNoMeio() {
  const y = innerHeight / 2;
  for (const s of secoes) {
    const r = s.getBoundingClientRect();
    if (r.top <= y && r.bottom > y) return nomeDe(s);
  }
  return "?";
}

let ultimo = performance.now();
let janela: number[] = [];
let secao = "?";
let contaSecao = 0;
function quadro(t: number) {
  const d = t - ultimo;
  ultimo = t;
  janela.push(d);
  if (++contaSecao % 10 === 0) secao = secaoNoMeio();
  const s = porSecao.get(secao) ?? { quadros: 0, travados: 0, pior: 0 };
  s.quadros++;
  if (d > 33.4) s.travados++;
  s.pior = Math.max(s.pior, d);
  porSecao.set(secao, s);
  requestAnimationFrame(quadro);
}
requestAnimationFrame(quadro);

setInterval(() => {
  const soma = janela.reduce((a, b) => a + b, 0);
  const fps = soma ? Math.round((1000 * janela.length) / soma) : 0;
  const pior = Math.round(Math.max(0, ...janela));
  janela = [];
  let texto = `${fps} qps · pior ${pior} ms · ${secao}\n${devicePixelRatio}x · ${innerWidth}px · toque p/ resumo`;
  if (aberto) {
    texto += "\n— travados por seção —";
    for (const [nome, s] of porSecao) {
      if (s.quadros < 30) continue;
      texto += `\n${nome.padEnd(14).slice(0, 14)} ${String(Math.round((100 * s.travados) / s.quadros)).padStart(3)}% · pior ${Math.round(s.pior)} ms`;
    }
  }
  painel.textContent = texto;
}, 500);

export {};
