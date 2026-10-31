/*
  Função enviar-lead (mapa técnico, arquivo 08): recebe o formulário curto (origem "formulario") ou o
  pedido das outras versões do gerador (origem "gerador"). Confere o Turnstile, valida tudo de novo,
  salva em leads e manda o aviso por e-mail. O aviso é melhor esforço: se o e-mail falhar, o lead
  já está salvo e a resposta continua sendo sucesso (o lead nunca se perde por causa do e-mail).
*/
import type { APIRoute } from "astro";
import { amb, escapar, ipDe, json, lerCorpo, supabase, textoLimpo, turnstileValido } from "../../lib/servidor";
import { formatarWhatsapp, soDigitos, whatsappValido } from "../../lib/whatsapp";
import { ctaFinal } from "../../content/home";

export const prerender = false;

const TIPOS: Record<string, string> = ctaFinal.campos.tipo.opcoes;
const INVESTIMENTOS: readonly string[] = ctaFinal.campos.investimento.opcoes;
const CHAVES_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Só as 4 chaves de UTM, em texto de 1 a 100 caracteres (a mesma regra da tabela). */
function limparUtm(valor: unknown): Record<string, string> | null {
  if (!valor || typeof valor !== "object") return null;
  const saida: Record<string, string> = {};
  for (const k of CHAVES_UTM) {
    const t = textoLimpo((valor as Record<string, unknown>)[k], 1, 100);
    if (t) saida[k] = t;
  }
  return Object.keys(saida).length ? saida : null;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const dados = await lerCorpo(request);
  if (!dados) return json({ erro: "pedido_invalido" }, 400);

  if (!(await turnstileValido(dados.turnstile, ipDe(request)))) return json({ erro: "verificacao" }, 403);

  const origem = dados.origem;
  const nome = textoLimpo(dados.nome, 1, 80);
  const whatsapp = typeof dados.whatsapp === "string" ? soDigitos(dados.whatsapp) : "";
  if ((origem !== "formulario" && origem !== "gerador") || !nome || !whatsappValido(whatsapp) || dados.consentimento !== true) {
    return json({ erro: "campos" }, 400);
  }

  const lead: Record<string, unknown> = { origem, nome, whatsapp, consentimento: true, utm: limparUtm(dados.utm) };
  if (origem === "formulario") {
    if (typeof dados.tipo_projeto !== "string" || !Object.hasOwn(TIPOS, dados.tipo_projeto)) return json({ erro: "campos" }, 400);
    if (typeof dados.investimento !== "string" || !INVESTIMENTOS.includes(dados.investimento)) return json({ erro: "campos" }, 400);
    lead.tipo_projeto = dados.tipo_projeto;
    lead.investimento = dados.investimento;
  } else {
    if (typeof dados.geracao_id !== "string" || !UUID.test(dados.geracao_id)) return json({ erro: "campos" }, 400);
    lead.geracao_id = dados.geracao_id.toLowerCase();
  }

  // Um pedido do formulário por número (31/10/2026): o repetido não vira lead nem manda outro aviso.
  // shortcut: conferir antes de gravar deixa passar dois envios no mesmo instante; se acontecer, um índice único parcial no banco resolve
  if (origem === "formulario") {
    try {
      const r = await supabase(`leads?origem=eq.formulario&whatsapp=eq.${whatsapp}&select=id&limit=1`);
      if (!r.ok) return json({ erro: "servidor" }, 502);
      if (((await r.json()) as unknown[]).length) return json({ ok: true, repetido: true });
    } catch {
      return json({ erro: "servidor" }, 502);
    }
  }

  let salvo: Response;
  try {
    salvo = await supabase("leads", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(lead) });
  } catch {
    return json({ erro: "servidor" }, 502);
  }
  if (salvo.status === 409) {
    const { code } = ((await salvo.json().catch(() => ({}))) ?? {}) as { code?: string };
    // 23505: essa geração já virou lead (o reenvio não duplica nem manda outro aviso)
    if (code === "23505") return json({ ok: true });
    // 23503: a geração não existe mais (rotina de 30 dias ou exclusão LGPD): a pessoa vai pelo WhatsApp
    return json({ erro: "geracao" }, 409);
  }
  if (!salvo.ok) return json({ erro: "servidor" }, 502);

  // O aviso sai depois da resposta (waitUntil): o e-mail lento nunca faz a pessoa ver erro de um lead salvo
  // O erro fica no log do Worker (Observability): o lead está salvo, mas o aviso não chegou
  const aviso = avisar(lead).catch((e) => console.error("aviso por e-mail falhou:", e instanceof Error ? e.message : e));
  const ctx = (locals as { cfContext?: { waitUntil(p: Promise<unknown>): void } }).cfContext;
  if (ctx) ctx.waitUntil(aviso);
  else await aviso;
  return json({ ok: true });
};

/** Aviso por e-mail (Resend) com o WhatsApp do lead já como link e, do gerador, as 3 headlines. */
async function avisar(lead: Record<string, unknown>) {
  if (!amb.RESEND_API_KEY || !amb.AVISO_EMAIL_PARA) return;
  const nome = String(lead.nome);
  const zap = String(lead.whatsapp);
  const linhas: [string, string][] = [
    ["Nome", nome],
    ["WhatsApp", `<a href="https://wa.me/55${zap}">${formatarWhatsapp(zap)}</a>`],
  ];
  let headlines: string[] = [];
  let resposta = "";
  const primeiro = nome.split(" ")[0];
  if (lead.origem === "formulario") {
    // Copy 2.29 (aprovada em 31/10/2026): a resposta do Gustavo ao lead, pronta
    const faixa = String(lead.investimento);
    const quanto = faixa.startsWith("Prefiro") ? "" : ` e pretende investir ${faixa.charAt(0).toLocaleLowerCase("pt-BR")}${faixa.slice(1)}`;
    resposta =
      lead.tipo_projeto === "nao-sei"
        ? `Oi, ${primeiro}! Aqui é o Gustavo, da BRAGA SYSTEMS. Recebi seu pedido pelo site. Para eu te ajudar a escolher entre landing page e site completo, me conta: o que você vende e para quem?`
        : `Oi, ${primeiro}! Aqui é o Gustavo, da BRAGA SYSTEMS. Recebi seu pedido pelo site: você precisa de ${TIPOS[String(lead.tipo_projeto)].toLocaleLowerCase("pt-BR")}${quanto}. Para eu te indicar o melhor caminho, me conta: o que você vende e para quem?`;
    linhas.push(["Precisa de", TIPOS[String(lead.tipo_projeto)]], ["Investimento", String(lead.investimento)]);
  } else {
    const r = await supabase(`geracoes_ia?id=eq.${lead.geracao_id}&select=vende,para_quem,headlines`);
    const [g] = r.ok ? ((await r.json()) as { vende: string; para_quem: string; headlines: string[] | null }[]) : [];
    if (g) {
      linhas.push(["Vende", g.vende], ["Para quem", g.para_quem]);
      headlines = g.headlines ?? [];
    }
  }
  if (lead.utm) linhas.push(["Origem (UTM)", Object.entries(lead.utm as object).map(([k, v]) => `${k}=${v}`).join(" · ")]);

  // Os textos digitados entram escapados; só o link do WhatsApp é HTML montado aqui
  const tabela = linhas
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#566170">${k}</td><td style="padding:4px 0"><b>${k === "WhatsApp" ? v : escapar(v)}</b></td></tr>`)
    .join("");
  let extra = "";
  if (headlines.length) {
    resposta = `Oi, ${primeiro}! Aqui é o Gustavo, da BRAGA SYSTEMS. Como prometido, aqui estão as outras versões da sua headline:\n\n1. ${headlines[1] ?? ""}\n2. ${headlines[2] ?? ""}\n\nQual combina mais com o seu negócio?`;
    extra = `<p style="margin-top:16px"><b>Headlines geradas:</b></p><ol>${headlines.map((h) => `<li>${escapar(h)}</li>`).join("")}</ol>`;
  }
  // Um toque: o WhatsApp abre na conversa do lead com a resposta escrita; quem envia é o Gustavo
  if (resposta) {
    const rotulo = headlines.length ? "Responder no WhatsApp com as 2 versões" : "Responder no WhatsApp";
    extra += `<p style="margin-top:16px"><a href="https://wa.me/55${zap}?text=${encodeURIComponent(resposta)}" style="display:inline-block;padding:10px 16px;background:#35D5E8;color:#0B0F14;font-weight:bold;text-decoration:none">${rotulo}</a></p>`;
  }
  const origem = lead.origem === "gerador" ? "gerador" : "formulário";
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${amb.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Domínio verificado no Resend em 31/10/2026 (DKIM, SPF e DMARC): sai do spam do Gmail
      from: "Site BRAGA SYSTEMS <contato@bragasystemsofc.com.br>",
      to: [amb.AVISO_EMAIL_PARA],
      subject: `Novo lead · ${origem} · ${nome}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0B0F14"><p>Novo lead pelo site (${origem}).</p><table>${tabela}</table>${extra}</div>`,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!r.ok) throw new Error(`Resend respondeu ${r.status}: ${(await r.text().catch(() => "")).slice(0, 200)}`);
}
