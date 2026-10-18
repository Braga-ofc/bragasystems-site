/*
  Contador de vagas de fundador (mapa técnico, arquivos 03 e 08).
  A página já vem com o número do build em <html data-vagas-build>. Aqui o navegador lê o
  valor ao vivo uma vez, com no máximo 3 segundos, e troca só se vier outro número.
  Sem build e sem resposta ao vivo, aplica o estado "falha".
  Fora do domínio oficial, ?vagas=0..5 ou ?vagas=falha simula os estados para teste.
*/
import { enderecoVagas, estadoDe, validarVagas, vagasMax, type EstadoVagas } from "../lib/supabase";

const raiz = document.documentElement;
const dominiosOficiais = ["bragasystems.com.br", "www.bragasystems.com.br"];
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function aplicar(vagas: number | null, estado: EstadoVagas = estadoDe(vagas)) {
  const anterior = raiz.dataset.vagasN ? Number(raiz.dataset.vagasN) : null;
  raiz.dataset.vagasEstado = estado;
  if (vagas === null) {
    delete raiz.dataset.vagasN;
    return;
  }
  raiz.dataset.vagasN = String(vagas);
  document.querySelectorAll<HTMLElement>("[data-vagas]").forEach((el) => {
    if (anterior === null || anterior === vagas || semMovimento) {
      el.textContent = String(vagas);
    } else {
      contar(el, anterior, vagas);
    }
  });
}

/** Number ticker: o número anda um a um até o valor novo (recriado em TS; ideia do Magic UI, MIT). */
function contar(el: HTMLElement, de: number, ate: number) {
  const passo = de < ate ? 1 : -1;
  let atual = de;
  const tique = () => {
    atual += passo;
    el.textContent = String(atual);
    if (atual !== ate) window.setTimeout(tique, 120);
  };
  window.setTimeout(tique, 120);
}

function simulacao(): number | "falha" | undefined {
  if (dominiosOficiais.includes(location.hostname)) return undefined;
  const valor = new URLSearchParams(location.search).get("vagas");
  if (valor === null) return undefined;
  if (valor === "falha") return "falha";
  const n = Number(valor);
  return Number.isInteger(n) && n >= 0 && n <= vagasMax ? n : undefined;
}

async function lerAoVivo(): Promise<number | null> {
  const endereco = enderecoVagas();
  const chave = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!endereco || !chave) return null;
  try {
    const resposta = await fetch(endereco, { headers: { apikey: chave }, signal: AbortSignal.timeout(3000) });
    if (!resposta.ok) return null;
    return validarVagas(await resposta.json());
  } catch {
    return null;
  }
}

async function iniciar() {
  const simulado = simulacao();
  if (simulado !== undefined) {
    simulado === "falha" ? aplicar(null, "falha") : aplicar(simulado);
    return;
  }
  const doBuild = raiz.dataset.vagasBuild ? Number(raiz.dataset.vagasBuild) : null;
  const aoVivo = await lerAoVivo();
  if (aoVivo !== null) aplicar(aoVivo);
  else if (doBuild !== null) aplicar(doBuild);
  else aplicar(null, "falha");
}

iniciar();
