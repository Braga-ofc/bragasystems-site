/*
  Contador de vagas de fundador (mapa técnico, arquivos 03 e 08).
  A página já vem com o número do build em <html data-vagas-build>. Aqui o navegador lê o
  valor ao vivo uma vez, com no máximo 3 segundos, e troca só se vier outro número.
  Sem build e sem resposta ao vivo, aplica o estado "falha".
  Só nos endereços de teste (localhost, 127.0.0.1 e *.workers.dev), ?vagas=0..5 ou ?vagas=falha
  simula os estados. Depois de aplicar o estado, avisa a página com o evento "vagas:estado"
  (detail: { estado, vagas }), para quem depende dele (o medidor da Urgência) não correr na frente.
*/
import { enderecoVagas, estadoDe, validarVagas, type EstadoVagas } from "../lib/supabase";

const raiz = document.documentElement;
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function aplicar(vagas: number | null, estado: EstadoVagas = estadoDe(vagas)) {
  const anterior = raiz.dataset.vagasN ? Number(raiz.dataset.vagasN) : null;
  raiz.dataset.vagasEstado = estado;
  if (vagas === null) {
    delete raiz.dataset.vagasN;
  } else {
    raiz.dataset.vagasN = String(vagas);
    document.querySelectorAll<HTMLElement>("[data-vagas]").forEach((el) => {
      if (anterior === null || anterior === vagas || semMovimento) {
        el.textContent = String(vagas);
      } else {
        contar(el, anterior, vagas);
      }
    });
  }
  document.dispatchEvent(new CustomEvent("vagas:estado", { detail: { estado, vagas } }));
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

/** Endereço de teste: a máquina local ou o link do Cloudflare (*.workers.dev). Nunca o domínio oficial. */
function enderecoDeTeste(): boolean {
  // "bragasystemsofc.com.br." (com ponto no fim) é o mesmo site: o ponto sai antes de comparar.
  const host = location.hostname.toLowerCase().replace(/\.+$/, "");
  return host === "localhost" || host === "127.0.0.1" || host.endsWith(".workers.dev");
}

function simulacao(): number | "falha" | undefined {
  if (!enderecoDeTeste()) return undefined;
  const valor = new URLSearchParams(location.search).get("vagas");
  if (valor === "falha") return "falha";
  // Só um dígito de 0 a 5: "", " ", "0x3", "1e0" e "2.0" não simulam nada.
  return valor !== null && /^[0-5]$/.test(valor) ? Number(valor) : undefined;
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
