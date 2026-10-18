/** Troca aspas retas em pares por aspas tipográficas (“ ”), sem mudar o texto da copy. */
export function aspas(texto: string): string {
  return texto.replace(/"([^"]*)"/g, "\u201C$1\u201D");
}

/** Escapa HTML, ajusta as aspas e transforma **trecho** em <strong>. Use com set:html em textos da copy. */
export function rich(texto: string): string {
  const seguro = aspas(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return seguro.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

/** Troca {X} por um span que o contador de vagas atualiza ao vivo. */
export function comVagas(html: string, vagas: number): string {
  return html.replace("{X}", `<span class="num" data-vagas>${vagas}</span>`);
}

/**
 * Texto da copy com [Política de Privacidade] virando link para /privacidade.
 * Abre em nova aba: quem está no meio do formulário ou do gerador não perde o que digitou.
 */
export function comLinkPrivacidade(texto: string): string {
  return rich(texto).replace(
    "[Política de Privacidade]",
    '<a href="/privacidade" target="_blank" rel="noopener">Política de Privacidade</a>',
  );
}
