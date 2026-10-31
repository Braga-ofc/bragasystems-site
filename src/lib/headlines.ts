// Leitura da resposta da IA do gerador (api/gerar-headline). Sem dependências: testada em headlines.test.ts.

/** Tira o JSON da resposta da IA e confere: exatamente 3 frases limpas, de 1 a 160 caracteres. */
export function lerHeadlines(bruto: unknown): string[] | null {
  const texto = typeof bruto === "string" ? bruto : JSON.stringify(bruto ?? "");
  // O primeiro objeto JSON que lê inteiro: chaves num comentário depois do JSON não estragam a leitura
  const dados = primeiroJson(texto);
  if (!dados) return null;
  if (!Array.isArray(dados.headlines) || dados.headlines.length !== 3) return null;
  const frases = dados.headlines.map((h) => (typeof h === "string" ? h.replace(/["“”«»]/g, "").replace(/\s+/g, " ").trim() : ""));
  // A mesma regra do banco (^\S.{0,159}$): começa sem espaço e tem até 160 caracteres
  return frases.every((f) => /^\S/.test(f) && f.length <= 160) ? frases : null;
}

/** Tenta cada "{" até um "}" que feche um JSON válido, do começo para o fim. */
function primeiroJson(texto: string): { headlines?: unknown } | null {
  for (let i = texto.indexOf("{"); i >= 0; i = texto.indexOf("{", i + 1)) {
    for (let j = texto.indexOf("}", i); j >= 0; j = texto.indexOf("}", j + 1)) {
      try {
        const dados: unknown = JSON.parse(texto.slice(i, j + 1));
        if (dados && typeof dados === "object") return dados as { headlines?: unknown };
      } catch {
        /* ainda não fechou: tenta o próximo "}" */
      }
    }
  }
  return null;
}
