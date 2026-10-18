import { site } from "../config/site";
import { mensagens, type Origem } from "../content/whatsapp";

/**
 * Monta o link wa.me com a mensagem da origem, trocando {nome} e {tipo de projeto} quando houver.
 * A troca usa função: assim $&, $' e $` digitados no nome não viram comandos do replace.
 */
export function montarLinkWhatsapp(origem: Origem, dados: { nome?: string; tipo?: string } = {}): string {
  const texto = mensagens[origem]
    .replace("{nome}", () => dados.nome ?? "")
    .replace("{tipo de projeto}", () => dados.tipo ?? "");
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/* ---------- Número de WhatsApp: a mesma regra no navegador e, na próxima etapa, no servidor ---------- */

export const soDigitos = (valor: string) => valor.replace(/\D/g, "");

/** DDDs em uso no Brasil (Anatel). */
const DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/** O começo de um DDD que existe: um dígito de 1 a 9, ou os dois primeiros na lista. */
const podeSerDdd = (d: string) => (d.length === 1 ? /[1-9]/.test(d) : DDDS.has(Number(d.slice(0, 2))));

/**
 * Tira o que vem antes do DDD: zeros do interurbano e o código do país (55).
 * O 55 só sai quando não pode ser o DDD 55 (RS) e o que sobra começa com um DDD:
 * mais de 11 dígitos, 11 dígitos sem o 9 do celular, ou um terceiro dígito que nenhum número
 * do DDD 55 tem (0, 1, 6, 7 ou 8). Funciona tecla por tecla: "+5561…" vira "(61" no terceiro dígito.
 */
export function semCodigoPais(digitos: string): { digitos: string; removidos: number } {
  let d = digitos.replace(/^0+/, "");
  if (d.startsWith("55") && d.length >= 3) {
    const terceiro = d[2];
    const naoEDdd55 = d.length > 11 || (d.length === 11 && terceiro !== "9") || !/[2-59]/.test(terceiro);
    const resto = d.slice(2).replace(/^0+/, "");
    if (naoEDdd55 && podeSerDdd(resto)) d = resto;
  }
  return { digitos: d, removidos: digitos.length - d.length };
}

/** DDD que existe; 11 dígitos com o 9 do celular; 10 dígitos só para fixo (começa com 2 a 5). */
export function whatsappValido(d: string): boolean {
  if (!DDDS.has(Number(d.slice(0, 2)))) return false;
  if (d.length === 11) return d[2] === "9";
  if (d.length === 10) return /[2-5]/.test(d[2]);
  return false;
}
