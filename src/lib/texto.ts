/** Escapa HTML e transforma **trecho** em <strong>. Use com set:html em textos da copy. */
export function rich(texto: string): string {
  const seguro = texto
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

/** Texto da copy com [Política de Privacidade] virando link para /privacidade. */
export function comLinkPrivacidade(texto: string): string {
  return rich(texto).replace("[Política de Privacidade]", '<a href="/privacidade">Política de Privacidade</a>');
}
