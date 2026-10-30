/*
  Turnstile (proteção contra robôs, mapa técnico 08): um token novo a cada envio, pedido na hora.
  O script da Cloudflare só baixa no primeiro envio, não na carga da página. O widget fica escondido
  e só aparece se a Cloudflare precisar que a pessoa clique ("interaction-only").
  Sem a chave pública (build sem PUBLIC_TURNSTILE_SITE_KEY) devolve "", e o servidor recusa:
  o formulário cai no aviso com o WhatsApp, nunca perde o pedido.
*/
interface Turnstile {
  render(el: HTMLElement, opcoes: Record<string, unknown>): string;
  execute(id: string): void;
  reset(id: string): void;
}
declare global {
  interface Window { turnstile?: Turnstile }
}

const CHAVE = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined;
let carregando: Promise<void> | null = null;

function carregar(): Promise<void> {
  carregando ??= new Promise((ok, falha) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => ok();
    s.onerror = () => { carregando = null; falha(new Error("turnstile")); };
    document.head.append(s);
  });
  return carregando;
}

const widgets = new WeakMap<HTMLElement, string>();
// Quem espera o token de cada widget: um por formulário, para os tokens nunca se misturarem
const esperando = new Map<string, (token: string) => void>();

/** Pede um token para o envio deste formulário (o container é um elemento vazio dentro dele). */
export async function pedirToken(container: HTMLElement | null, prazo = 30000): Promise<string> {
  if (!CHAVE || !container) return "";
  try {
    await carregar();
  } catch {
    return "";
  }
  const ts = window.turnstile;
  if (!ts) return "";
  let id = widgets.get(container);
  if (!id) {
    const meu = ts.render(container, {
      sitekey: CHAVE,
      appearance: "interaction-only",
      execution: "execute",
      language: "pt-br",
      callback: (token: string) => esperando.get(meu)?.(token),
      "error-callback": () => esperando.get(meu)?.(""),
    });
    id = meu;
    widgets.set(container, id);
  } else {
    // Cada token vale uma vez: recomeça antes de pedir o próximo
    ts.reset(id);
  }
  const widget = id;
  return new Promise((ok) => {
    const fim = (token: string) => {
      window.clearTimeout(timer);
      esperando.delete(widget);
      ok(token);
    };
    const timer = window.setTimeout(() => fim(""), prazo);
    esperando.set(widget, fim);
    ts.execute(widget);
  });
}
