/*
  Formulário curto do CTA final (copy §16; mapa técnico, arquivo 08).
  Também exporta as peças que o gerador usa no pedido de nome e WhatsApp: máscara,
  validação, erros dos campos, botão carregando, UTM e envio com prazo.
  Nenhum dado pessoal vai para a URL, o console ou a medição.
*/
import { formatarWhatsapp, montarLinkWhatsapp, semCodigoPais, soDigitos, whatsappValido } from "../lib/whatsapp";
import { pedirToken } from "./turnstile";

type Controle = HTMLInputElement | HTMLSelectElement;

/* ---------- Peças compartilhadas ---------- */

// A regra do número mora em lib/whatsapp.ts: o servidor usa a mesma.
export { formatarWhatsapp, soDigitos, whatsappValido };

/**
 * Máscara leve enquanto digita, sem perder a posição do cursor.
 * Aceita o número com +55 ou 0 na frente (digitado tecla por tecla ou colado) e deixa
 * apagar para trás e para a frente passando pelos separadores.
 */
export function ligarMascara(input: HTMLInputElement) {
  let anteriores = soDigitos(input.value);
  // Seleção de antes da tecla: apagar uma seleção só de separadores não come dígito.
  let selecao = { inicio: 0, fim: 0 };
  input.addEventListener("beforeinput", () => {
    selecao = { inicio: input.selectionStart ?? 0, fim: input.selectionEnd ?? 0 };
  });

  input.addEventListener("input", (evento) => {
    const tipo = (evento as InputEvent).inputType ?? "";
    const valor = input.value;
    const cursor = input.selectionStart ?? valor.length;
    let digitos = soDigitos(valor);
    let antesDoCursor = soDigitos(valor.slice(0, cursor)).length;

    // Apagou só um separador: apaga também o dígito vizinho, senão o cursor trava.
    if (digitos === anteriores && selecao.inicio === selecao.fim) {
      if (tipo === "deleteContentBackward" && antesDoCursor > 0) {
        digitos = digitos.slice(0, antesDoCursor - 1) + digitos.slice(antesDoCursor);
        antesDoCursor -= 1;
      } else if (tipo === "deleteContentForward" && antesDoCursor < digitos.length) {
        digitos = digitos.slice(0, antesDoCursor) + digitos.slice(antesDoCursor + 1);
      }
    }
    selecao = { inicio: 0, fim: 0 };

    // Código do país (55) e zeros antes do DDD saem antes de cortar em 11 dígitos.
    const limpo = semCodigoPais(digitos);
    digitos = limpo.digitos;
    antesDoCursor = Math.max(0, antesDoCursor - limpo.removidos);

    // Número completo: mais um dígito digitado não entra, como um limite de tamanho.
    if (digitos.length > 11 && tipo === "insertText" && anteriores.length === 11) {
      const voltar = Math.max(0, cursor - 1);
      input.value = formatarWhatsapp(anteriores);
      input.setSelectionRange(voltar, voltar);
      return;
    }
    digitos = digitos.slice(0, 11);
    antesDoCursor = Math.min(antesDoCursor, digitos.length);
    anteriores = digitos;

    const formatado = formatarWhatsapp(digitos);
    if (formatado === valor) return;
    input.value = formatado;
    if (document.activeElement !== input) return;
    let pos = 0;
    for (let contados = 0; pos < formatado.length && contados < antesDoCursor; pos++) {
      if (/\d/.test(formatado[pos])) contados++;
    }
    input.setSelectionRange(pos, pos);
  });
}

/** Mostra o erro no <p class="campo__erro"> do Campo, mantendo o ícone. */
export function mostrarErroCampo(controle: Controle, mensagem: string) {
  const erro = document.getElementById(`${controle.id}-erro`);
  if (erro) {
    const icone = erro.querySelector("svg");
    erro.replaceChildren(...(icone ? [icone] : []), document.createTextNode(mensagem));
    erro.hidden = false;
  }
  controle.setAttribute("aria-invalid", "true");
  controle.closest(".campo")?.classList.add("campo--erro");
}

export function limparErroCampo(controle: Controle) {
  const erro = document.getElementById(`${controle.id}-erro`);
  if (erro) erro.hidden = true;
  controle.removeAttribute("aria-invalid");
  controle.closest(".campo")?.classList.remove("campo--erro");
}

/**
 * Liga e desliga o estado "carregando" do Botao: o texto fica e o ícone vira o quadrado girando.
 * O quadrado recebe o mesmo atributo de escopo do botão, para usar o estilo aprovado em /amostra.
 */
export function definirCarregando(botao: HTMLButtonElement, carregando: boolean) {
  const icone = botao.querySelector<SVGElement>(".botao__icone");
  if (carregando) {
    botao.setAttribute("aria-busy", "true");
    if (icone) icone.style.display = "none";
    if (!botao.querySelector(".botao__giro")) {
      const giro = document.createElement("span");
      giro.className = "botao__giro";
      giro.setAttribute("aria-hidden", "true");
      for (const nome of botao.getAttributeNames()) {
        if (nome.startsWith("data-astro-cid-")) giro.setAttribute(nome, "");
      }
      botao.append(giro);
    }
  } else {
    botao.removeAttribute("aria-busy");
    botao.querySelector(".botao__giro")?.remove();
    if (icone) icone.style.display = "";
  }
}

/** UTMs da primeira página visitada (mapa técnico, arquivo 12), se o site já tiver guardado. */
export function lerUtm(): Record<string, string> | null {
  try {
    const bruto = sessionStorage.getItem("utm");
    if (!bruto) return null;
    const dados: unknown = JSON.parse(bruto);
    return dados && typeof dados === "object" ? (dados as Record<string, string>) : null;
  } catch {
    return null;
  }
}

function comPrazo(ms: number): AbortSignal {
  if (typeof AbortSignal.timeout === "function") return AbortSignal.timeout(ms);
  const controle = new AbortController();
  window.setTimeout(() => controle.abort(), ms);
  return controle.signal;
}

/** POST com JSON e prazo máximo. Falha de rede ou de prazo vira exceção. */
// 30 s: acima do pior caso das funções do servidor (lib/servidor: PRAZO), para nunca desistir de algo que deu certo
export function postarJson(endereco: string, corpo: unknown, ms = 30000): Promise<Response> {
  return fetch(endereco, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(corpo),
    signal: comPrazo(ms),
  });
}

/**
 * Copia um <template> para dentro de uma região de aviso (role="alert"), ou a esvazia com null.
 * A região fica sempre no HTML (vazia), para o leitor de tela anunciar o que entrar nela.
 */
export function mostrarAviso(alvo: HTMLElement, modelo: HTMLTemplateElement | null): HTMLElement {
  alvo.replaceChildren(...(modelo ? [modelo.content.cloneNode(true)] : []));
  return alvo;
}

/* ---------- Formulário do CTA final (§16) ---------- */

function iniciarFormulario(form: HTMLFormElement) {
  if (form.dataset.pronto) return;
  form.dataset.pronto = "true";

  const campo = <T extends Controle>(nome: string) => form.elements.namedItem(nome) as T;
  const nome = campo<HTMLInputElement>("nome");
  const whatsapp = campo<HTMLInputElement>("whatsapp");
  const tipo = campo<HTMLSelectElement>("tipo_projeto");
  const investimento = campo<HTMLSelectElement>("investimento");
  const consentimento = campo<HTMLInputElement>("consentimento");
  const botao = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const aviso = form.querySelector<HTMLElement>("[data-aviso]");
  const modeloFalha = form.querySelector<HTMLTemplateElement>('template[data-modelo="falha"]');
  const modulo = form.closest<HTMLElement>("[data-modulo]");
  const msg = {
    vazio: form.dataset.erroVazio ?? "",
    whatsapp: form.dataset.erroWhatsapp ?? "",
    consentimento: form.dataset.erroConsentimento ?? "",
  };
  let codigosTipo: Record<string, string> = {};
  try {
    codigosTipo = JSON.parse(form.dataset.tipos ?? "{}");
  } catch {
    /* sem mapa: o tipo vai como texto */
  }
  let enviando = false;

  ligarMascara(whatsapp);

  // Voltar do /obrigado traz a página da memória (bfcache) como ficou: destrava o envio.
  window.addEventListener("pageshow", (evento) => {
    if (!evento.persisted) return;
    enviando = false;
    if (botao) definirCarregando(botao, false);
    modulo?.classList.remove("feixe--continuo");
  });

  // Cada regra devolve a mensagem de erro, ou "" quando o campo está certo.
  const regras: [Controle, () => string][] = [
    [nome, () => (nome.value.trim() ? "" : msg.vazio)],
    [whatsapp, () => {
      const d = soDigitos(whatsapp.value);
      if (!d) return msg.vazio;
      return whatsappValido(d) ? "" : msg.whatsapp;
    }],
    [tipo, () => (tipo.value ? "" : msg.vazio)],
    [investimento, () => (investimento.value ? "" : msg.vazio)],
    [consentimento, () => (consentimento.checked ? "" : msg.consentimento)],
  ];

  // Limpa o erro do campo assim que ele fica certo.
  for (const [controle, regra] of regras) {
    const evento = controle instanceof HTMLInputElement && controle.type !== "checkbox" ? "input" : "change";
    controle.addEventListener(evento, () => {
      if (controle.getAttribute("aria-invalid") === "true" && !regra()) limparErroCampo(controle);
    });
  }

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (enviando) return;
    if (aviso) mostrarAviso(aviso, null);

    let primeiro: Controle | null = null;
    for (const [controle, regra] of regras) {
      const erro = regra();
      if (erro) {
        mostrarErroCampo(controle, erro);
        primeiro ??= controle;
      } else {
        limparErroCampo(controle);
      }
    }
    // O foco no primeiro campo errado faz o leitor de tela ler o rótulo e o erro ligado a ele.
    if (primeiro) {
      primeiro.focus();
      return;
    }

    const dadosNome = nome.value.trim();
    const textoTipo = tipo.value;
    const tipoMinusculo = textoTipo.toLocaleLowerCase("pt-BR");

    enviando = true;
    if (botao) definirCarregando(botao, true);
    modulo?.classList.add("feixe--continuo");

    try {
      const turnstile = await pedirToken(form.querySelector<HTMLElement>("[data-turnstile]"));
      const resposta = await postarJson("/api/enviar-lead", {
        turnstile,
        origem: "formulario",
        nome: dadosNome,
        whatsapp: soDigitos(whatsapp.value),
        tipo_projeto: codigosTipo[textoTipo] ?? textoTipo,
        investimento: investimento.value,
        consentimento: true,
        utm: lerUtm(),
      });
      if (!resposta.ok) throw new Error(String(resposta.status));
      // Nome e tipo ficam só no navegador (nunca na URL), para a página de obrigado abrir o WhatsApp.
      try {
        sessionStorage.setItem("lead", JSON.stringify({ nome: dadosNome, tipo: tipoMinusculo, novo: true }));
      } catch {
        /* sem sessionStorage: a página de obrigado usa a mensagem sem nome */
      }
      window.location.assign("/obrigado");
    } catch {
      // O cliente nunca fica sem caminho: o mesmo pedido, já escrito, vai pelo WhatsApp.
      if (aviso) {
        mostrarAviso(aviso, modeloFalha)
          .querySelector<HTMLAnchorElement>("a[href]")
          ?.setAttribute("href", montarLinkWhatsapp("formulario", { nome: dadosNome, tipo: tipoMinusculo }));
      }
      enviando = false;
      if (botao) definirCarregando(botao, false);
      modulo?.classList.remove("feixe--continuo");
    }
  });
}

const formulario = document.querySelector<HTMLFormElement>("[data-formulario]");
if (formulario) iniciarFormulario(formulario);
