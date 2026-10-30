/*
  O que as duas funções do servidor (api/enviar-lead e api/gerar-headline) têm em comum: respostas JSON,
  a checagem do Turnstile, o acesso ao Supabase com a chave secreta e o IP embaralhado.
  Mapa técnico, arquivos 07, 08 e 09. Nada daqui vai para o navegador.
*/
import { env } from "cloudflare:workers";
import { faixaDoIp } from "./ip";

/** Segredos e ligações do Worker (painel: Variables and Secrets; wrangler.jsonc: vars e ai). */
export interface Ambiente {
  SUPABASE_SECRET_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  IP_HASH_SALT?: string;
  AVISO_EMAIL_PARA?: string;
  AI?: { run(modelo: string, entrada: unknown): Promise<unknown> };
}
export const amb = env as unknown as Ambiente;

/**
 * Prazo de cada chamada externa. A soma do pior caso de cada função fica abaixo dos 30 s que o
 * navegador espera (scripts/formulario: postarJson), para a pessoa nunca ver erro de algo que deu certo.
 */
export const PRAZO = 5000;

export const json = (corpo: unknown, status = 200) =>
  new Response(JSON.stringify(corpo), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

const LIMITE_CORPO = 8000;

/**
 * Lê o corpo como JSON de objeto, com tamanho máximo (um pedido honesto tem menos de 2 KB). Para de ler
 * assim que passa do limite: um corpo gigante nunca é carregado inteiro na memória.
 */
export async function lerCorpo(request: Request): Promise<Record<string, unknown> | null> {
  if (!request.body) return null;
  if (Number(request.headers.get("Content-Length") ?? 0) > LIMITE_CORPO) {
    // Cancela o corpo em vez de deixá-lo pendurado na conexão
    await request.body.cancel().catch(() => undefined);
    return null;
  }
  const leitor = request.body.getReader();
  const partes: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await leitor.read();
    if (done) break;
    total += value.byteLength;
    if (total > LIMITE_CORPO) {
      await leitor.cancel();
      return null;
    }
    partes.push(value);
  }
  const bytes = new Uint8Array(total);
  let pos = 0;
  for (const p of partes) {
    bytes.set(p, pos);
    pos += p.byteLength;
  }
  const texto = new TextDecoder().decode(bytes);
  try {
    const dados = JSON.parse(texto);
    return dados && typeof dados === "object" && !Array.isArray(dados) ? dados : null;
  } catch {
    return null;
  }
}

/** Texto limpo: sem espaços nas pontas, sem caracteres de controle, dentro do tamanho. */
export function textoLimpo(valor: unknown, min: number, max: number): string | null {
  if (typeof valor !== "string") return null;
  const t = valor.normalize("NFC").trim().replace(/\s+/g, " ");
  // Controles C0, DEL e C1: o banco recusa os mesmos ([[:cntrl:]])
  // eslint-disable-next-line no-control-regex
  if (t.length < min || t.length > max || /[\u0000-\u001f\u007f-\u009f]/.test(t)) return null;
  return t;
}

export const ipDe = (request: Request) => request.headers.get("CF-Connecting-IP") ?? "";

/** Confere o token do Turnstile na Cloudflare. Sem a chave secreta, recusa (nunca passa sem checar). */
export async function turnstileValido(token: unknown, ip: string): Promise<boolean> {
  if (!amb.TURNSTILE_SECRET_KEY || typeof token !== "string" || !token || token.length > 2048) return false;
  const corpo = new FormData();
  corpo.append("secret", amb.TURNSTILE_SECRET_KEY);
  corpo.append("response", token);
  if (ip) corpo.append("remoteip", ip);
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: corpo, signal: AbortSignal.timeout(PRAZO) });
    const dados = (await r.json()) as { success?: boolean };
    return dados.success === true;
  } catch {
    return false;
  }
}

/** Chamada à API do Supabase (PostgREST) com a chave secreta: só o servidor passa pela RLS. */
export function supabase(caminho: string, init: RequestInit = {}): Promise<Response> {
  const base = import.meta.env.PUBLIC_SUPABASE_URL;
  if (!base || !amb.SUPABASE_SECRET_KEY) return Promise.reject(new Error("Supabase sem configuração"));
  return fetch(`${base.replace(/\/$/, "")}/rest/v1/${caminho}`, {
    ...init,
    headers: { apikey: amb.SUPABASE_SECRET_KEY, "Content-Type": "application/json", ...init.headers },
    signal: AbortSignal.timeout(PRAZO),
  });
}

/**
 * IP embaralhado com o sal (SHA-256 em hexadecimal): serve para o limite diário sem guardar o IP.
 * No IPv6 vale a faixa /64, porque uma mesma pessoa troca de endereço dentro dela.
 */
export async function ipEmbaralhado(ip: string): Promise<string | null> {
  const base = faixaDoIp(ip);
  if (!base || !amb.IP_HASH_SALT) return null;
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${amb.IP_HASH_SALT}|${base}`));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const escapar = (t: string) => t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
