// Leitura da resposta da IA do gerador (api/gerar-headline). Sem dependências: testada em headlines.test.ts.

/** Tira o JSON da resposta da IA e confere: exatamente 3 frases limpas, de 1 a 160 caracteres. */
export function lerHeadlines(bruto: unknown): string[] | null {
  const texto = typeof bruto === "string" ? bruto : JSON.stringify(bruto ?? "");
  const achado = texto.match(/\{[\s\S]*\}/);
  if (!achado) return null;
  try {
    const dados = JSON.parse(achado[0]) as { headlines?: unknown };
    if (!Array.isArray(dados.headlines) || dados.headlines.length !== 3) return null;
    const frases = dados.headlines.map((h) => (typeof h === "string" ? h.replace(/["“”«»]/g, "").replace(/\s+/g, " ").trim() : ""));
    return frases.every((f) => f.length >= 1 && f.length <= 160) ? frases : null;
  } catch {
    return null;
  }
}
