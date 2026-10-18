import { site } from "../config/site";
import { mensagens, type Origem } from "../content/whatsapp";

/** Monta o link wa.me com a mensagem da origem, trocando {nome} e {tipo de projeto} quando houver. */
export function montarLinkWhatsapp(origem: Origem, dados: { nome?: string; tipo?: string } = {}): string {
  const texto = mensagens[origem]
    .replace("{nome}", dados.nome ?? "")
    .replace("{tipo de projeto}", dados.tipo ?? "");
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}
