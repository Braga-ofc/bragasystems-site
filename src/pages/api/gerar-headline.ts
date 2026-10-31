/*
  Função gerar-headline (mapa técnico, arquivo 08): confere o Turnstile, reserva a geração no Supabase
  (limite de 3 por pessoa a cada 24 h, pela função reservar_geracao, que trava pelo IP embaralhado),
  pede 3 headlines à Cloudflare Workers AI (decisão de 30/10/2026: grátis, sem conta) e devolve a 1ª.
  Se a IA não responder (fora do ar ou fora do prazo), a reserva é desfeita: o erro não gasta o limite.
  Se ela responder fora do tema ou com algo que não dá para usar, a reserva conta: senão, quem insiste
  em pedidos inválidos gastaria a cota grátis da IA sem limite.
*/
import type { APIRoute } from "astro";
import { amb, ipDe, ipEmbaralhado, json, lerCorpo, supabase, textoLimpo, turnstileValido } from "../../lib/servidor";
import { lerHeadlines } from "../../lib/headlines";

export const prerender = false;

// Modelo aberto de texto da Workers AI com bom português; trocar aqui se a qualidade não agradar
const MODELO = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

const INSTRUCAO =
  "Você é o copywriter da BRAGA SYSTEMS e escreve pelo Método Pré-Venda. Recebe o que o negócio vende e para quem. " +
  "Escreva 3 headlines diferentes para a primeira dobra de uma landing page: uma pelo resultado, uma pela dor e uma pelo mecanismo. " +
  "Cada uma com no máximo 12 palavras, em português do Brasil, sem emojis, sem aspas e sem promessas absolutas ou garantidas. " +
  'Responda só com JSON, sem nenhum texto antes ou depois: {"headlines": ["...", "...", "..."]}. ' +
  'Se o pedido não for sobre um negócio real, responda {"erro": "fora_do_tema"}.';

export const POST: APIRoute = async ({ request }) => {
  const dados = await lerCorpo(request);
  const vende = textoLimpo(dados?.vende, 2, 80);
  const paraQuem = textoLimpo(dados?.paraQuem, 2, 80);
  if (!dados || !vende || !paraQuem) return json({ erro: "campos" }, 400);

  const ip = ipDe(request);
  if (!(await turnstileValido(dados.turnstile, ip))) return json({ erro: "verificacao" }, 403);

  const ipHash = await ipEmbaralhado(ip);
  if (!ipHash || !amb.AI) return json({ erro: "servidor" }, 503);

  let id: string | null;
  try {
    const r = await supabase("rpc/reservar_geracao", {
      method: "POST",
      body: JSON.stringify({ p_ip_hash: ipHash, p_vende: vende, p_para_quem: paraQuem }),
    });
    if (!r.ok) return json({ erro: "servidor" }, 502);
    id = (await r.json()) as string | null;
  } catch {
    return json({ erro: "servidor" }, 502);
  }
  if (!id) return json({ erro: "limite" }, 429);

  let headlines: string[] | null;
  // A IA que estoura o prazo continua rodando e gastando a cota: essa tentativa conta no limite, como a que respondeu
  let conta = false;
  let relogio: ReturnType<typeof setTimeout> | undefined;
  try {
    const saida = (await Promise.race([
      amb.AI.run(MODELO, {
        messages: [
          { role: "system", content: INSTRUCAO },
          { role: "user", content: `O que o negócio vende: ${vende}\nPara quem: ${paraQuem}` },
        ],
        max_tokens: 300,
        temperature: 0.8,
      }),
      // 8 s: com o Turnstile, a reserva e o PATCH (PRAZO cada), fica abaixo dos 30 s do navegador
      new Promise((_, falha) => {
        relogio = setTimeout(() => {
          conta = true;
          falha(new Error("prazo"));
        }, 8000);
      }),
    ])) as { response?: unknown };
    conta = true;
    headlines = lerHeadlines(saida?.response);
  } catch {
    headlines = null;
  } finally {
    clearTimeout(relogio);
  }

  const desfazer = () => supabase(`geracoes_ia?id=eq.${id}`, { method: "DELETE" }).catch(() => undefined);
  if (!headlines) {
    if (!conta) await desfazer();
    return json({ erro: "ia" }, 502);
  }
  // As 3 headlines precisam ficar salvas: é delas que sai o aviso com as outras 2 versões
  const salvo = await supabase(`geracoes_ia?id=eq.${id}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ headlines }) }).catch(() => null);
  if (!salvo?.ok) {
    await desfazer();
    return json({ erro: "servidor" }, 502);
  }
  return json({ headline: headlines[0], geracao_id: id });
};
