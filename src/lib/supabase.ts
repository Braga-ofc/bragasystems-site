// Leitura pública do contador de vagas (tabela site_config, só leitura pela chave publicável).
export const vagasMax = 5;

/** Endereço da leitura do contador, ou null quando as variáveis públicas não estão configuradas. */
export function enderecoVagas(url = import.meta.env.PUBLIC_SUPABASE_URL): string | null {
  if (!url) return null;
  return `${url.replace(/\/$/, "")}/rest/v1/site_config?id=eq.1&select=vagas_restantes`;
}

/** Confere se o valor que veio do Supabase é um número de vagas válido (0 a 5). */
export function validarVagas(dados: unknown): number | null {
  const linha = Array.isArray(dados) ? dados[0] : null;
  const valor = linha && typeof linha === "object" ? (linha as { vagas_restantes?: unknown }).vagas_restantes : null;
  return Number.isInteger(valor) && (valor as number) >= 0 && (valor as number) <= vagasMax ? (valor as number) : null;
}

/**
 * Lê as vagas na hora do build. O número vai junto com a página, para ela carregar
 * já com o valor certo. Sem variáveis ou sem resposta, devolve null (sem quebrar o build).
 */
export async function lerVagasNoBuild(): Promise<number | null> {
  const endereco = enderecoVagas();
  const chave = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!endereco || !chave) {
    console.warn("[vagas] PUBLIC_SUPABASE_URL ou PUBLIC_SUPABASE_PUBLISHABLE_KEY ausente: a página sai sem o número do build.");
    return null;
  }
  try {
    const resposta = await fetch(endereco, { headers: { apikey: chave }, signal: AbortSignal.timeout(5000) });
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const vagas = validarVagas(await resposta.json());
    if (vagas === null) throw new Error("valor inválido");
    return vagas;
  } catch (erro) {
    console.warn(`[vagas] Não foi possível ler o contador no build (${(erro as Error).message}).`);
    return null;
  }
}

export type EstadoVagas = "com-vagas" | "esgotado" | "falha" | "carregando";

export function estadoDe(vagas: number | null): EstadoVagas {
  if (vagas === null) return "carregando";
  return vagas > 0 ? "com-vagas" : "esgotado";
}
