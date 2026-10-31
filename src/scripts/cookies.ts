/*
  Consentimento de cookies (mapa técnico 09 e 12). A escolha fica em localStorage "braga-cookies".
  GA4 e Clarity (medição) e Pixel da Meta (marketing) só carregam depois do aceite, e só se o ID
  existir nas variáveis de build. Retirar um consentimento recarrega a página, porque um script já
  carregado não tem como ser descarregado.
*/
import { depois } from "./depois";

type Escolha = { medicao: boolean; marketing: boolean };
const CHAVE = "braga-cookies";

const GA4 = import.meta.env.PUBLIC_GA4_ID;
const PIXEL = import.meta.env.PUBLIC_META_PIXEL_ID;
const CLARITY = import.meta.env.PUBLIC_CLARITY_ID;

function ler(): Escolha | null {
  try {
    const e = JSON.parse(localStorage.getItem(CHAVE) ?? "null");
    return e && typeof e.medicao === "boolean" && typeof e.marketing === "boolean" ? e : null;
  } catch {
    return null;
  }
}

function script(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.append(s);
}

const carregados = new Set<string>();
function carregar({ medicao, marketing }: Escolha) {
  const w = window as any;
  if (medicao && GA4 && !carregados.has("ga4")) {
    carregados.add("ga4");
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag("js", new Date());
    w.gtag("config", GA4);
    script(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4)}`);
  }
  if (medicao && CLARITY && !carregados.has("clarity")) {
    carregados.add("clarity");
    w.clarity = w.clarity || function () { (w.clarity.q = w.clarity.q || []).push(arguments); };
    script(`https://www.clarity.ms/tag/${encodeURIComponent(CLARITY)}`);
  }
  if (marketing && PIXEL && !carregados.has("pixel")) {
    carregados.add("pixel");
    const fbq: any = (w.fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); });
    if (!w._fbq) w._fbq = fbq;
    fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0"; fbq.queue = [];
    fbq("init", PIXEL);
    fbq("track", "PageView");
    script("https://connect.facebook.net/en_US/fbevents.js");
  }
}

const banner = document.querySelector<HTMLElement>("[data-cookies]");
const categorias = banner?.querySelector<HTMLElement>("[data-cookies-categorias]");
const caixa = (nome: string) => banner?.querySelector<HTMLInputElement>(`input[name="${nome}"]`);

function abrir(preferencias: boolean) {
  if (!banner || !categorias) return;
  const atual = ler();
  caixa("medicao")!.checked = atual?.medicao ?? false;
  caixa("marketing")!.checked = atual?.marketing ?? false;
  categorias.hidden = !preferencias;
  banner.dataset.modo = preferencias ? "preferencias" : "banner";
  banner.hidden = false;
  if (preferencias) caixa("medicao")?.focus();
}

/** Expira os cookies pelo nome no endereço atual e em cada domínio pai (o GA4 grava no domínio raiz). */
function apagarCookies(nomes: RegExp) {
  const partes = location.hostname.split(".");
  const dominios = [""].concat(partes.slice(0, -1).map((_, i) => `; domain=.${partes.slice(i).join(".")}`));
  for (const par of document.cookie.split(";")) {
    const nome = par.split("=")[0].trim();
    if (!nomes.test(nome)) continue;
    for (const d of dominios) document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
  }
}

function salvar(nova: Escolha) {
  const antes = ler();
  try { localStorage.setItem(CHAVE, JSON.stringify(nova)); } catch {}
  if (banner) banner.hidden = true;
  const tirouMedicao = !!antes?.medicao && !nova.medicao;
  const tirouMarketing = !!antes?.marketing && !nova.marketing;
  // LGPD: retirar o aceite apaga os cookies que já ficaram (GA4 e Clarity; Pixel)
  if (tirouMedicao) apagarCookies(/^(_ga|_gid|_gat|_clck|_clsk)/);
  if (tirouMarketing) apagarCookies(/^(_fbp|_fbc)$/);
  const retirou = tirouMedicao || tirouMarketing;
  if (retirou && carregados.size) location.reload();
  else carregar(nova);
}

banner?.querySelector(".cookies__aceitar")?.addEventListener("click", () => salvar({ medicao: true, marketing: true }));
banner?.querySelector(".cookies__recusar")?.addEventListener("click", () => salvar({ medicao: false, marketing: false }));
banner?.querySelector(".cookies__salvar")?.addEventListener("click", () =>
  salvar({ medicao: !!caixa("medicao")?.checked, marketing: !!caixa("marketing")?.checked }));
banner?.querySelector("[data-cookies-escolher]")?.addEventListener("click", () => abrir(true));
document.querySelectorAll("[data-cookies-abrir]").forEach((b) => b.addEventListener("click", () => abrir(true)));

const escolha = ler();
if (escolha) carregar(escolha);
// Primeira visita: o banner entra depois que a primeira tela já está de pé (e depois da abertura, que fica por cima)
else depois(() => abrir(false));
