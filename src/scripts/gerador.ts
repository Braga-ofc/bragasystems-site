/*
  Gerador de headline com IA (copy §3; mapa técnico, arquivo 08).
  Estados do console em data-estado: inicial → carregando → resultado → enviado.
  A headline aparece como se fosse digitada (Typing Animation do Magic UI, MIT, recriado em TS).
  Nenhum dado pessoal vai para a URL, o console ou a medição.
*/
import {
  definirCarregando,
  lerUtm,
  ligarMascara,
  limparErroCampo,
  mostrarAviso,
  mostrarErroCampo,
  postarJson,
  soDigitos,
  whatsappValido,
} from "./formulario";

type Estado = "inicial" | "carregando" | "resultado" | "enviado";

const semMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 2 a 80 caracteres e nenhum link (a função confere de novo no servidor). */
function textoValido(valor: string): boolean {
  return valor.length >= 2 && valor.length <= 80 && !/(https?:\/\/|www\.|\.(com|net|org|io|br)\b)/i.test(valor);
}

/**
 * Digita a headline: o texto inteiro já ocupa o lugar (nada pula) e as letras acendem
 * da esquerda para a direita em cerca de 1 s. O leitor de tela recebe a frase inteira.
 */
function digitar(alvo: HTMLElement, texto: string): Promise<void> {
  if (semMovimento()) {
    alvo.textContent = texto;
    return Promise.resolve();
  }
  const letras = Array.from(texto);
  const leitura = document.createElement("span");
  leitura.className = "sr-only";
  leitura.textContent = texto;
  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  const spans = letras.map((letra) => {
    const span = document.createElement("span");
    span.className = "console__letra";
    span.textContent = letra;
    return span;
  });
  visual.append(...spans);
  alvo.replaceChildren(leitura, visual);

  const passo = Math.min(38, Math.max(14, 1050 / letras.length));
  return new Promise((resolver) => {
    let inicio = 0;
    let acesas = 0;
    const quadro = (agora: number) => {
      inicio ||= agora;
      const total = Math.min(letras.length, Math.floor((agora - inicio) / passo) + 1);
      if (total > acesas) {
        spans[acesas - 1]?.removeAttribute("data-cursor");
        for (; acesas < total; acesas++) spans[acesas].dataset.on = "";
        spans[acesas - 1].dataset.cursor = "";
      }
      if (acesas < letras.length) {
        requestAnimationFrame(quadro);
        return;
      }
      // O cursor fica um instante no fim e o texto volta a ser um nó só.
      window.setTimeout(() => {
        alvo.textContent = texto;
        resolver();
      }, 420);
    };
    requestAnimationFrame(quadro);
  });
}

function iniciar(raiz: HTMLElement) {
  const formGerar = raiz.querySelector<HTMLFormElement>("[data-gerador-form]");
  const formLead = raiz.querySelector<HTMLFormElement>("[data-gerador-lead]");
  const secao = raiz.closest("section");
  if (!formGerar || !formLead || !secao) return;

  const modelo = (nome: string) => secao.querySelector<HTMLTemplateElement>(`template[data-modelo="${nome}"]`);
  const vende = formGerar.elements.namedItem("vende") as HTMLInputElement;
  const paraQuem = formGerar.elements.namedItem("paraQuem") as HTMLInputElement;
  const botaoGerar = formGerar.querySelector<HTMLButtonElement>('button[type="submit"]');
  const avisoGeracao = formGerar.querySelector<HTMLElement>("[data-aviso-geracao]");
  const nome = formLead.elements.namedItem("nome") as HTMLInputElement;
  const whatsapp = formLead.elements.namedItem("whatsapp") as HTMLInputElement;
  const consentimento = formLead.elements.namedItem("consentimento") as HTMLInputElement;
  const botaoLead = formLead.querySelector<HTMLButtonElement>('button[type="submit"]');
  const avisoLead = formLead.querySelector<HTMLElement>("[data-aviso-lead]");
  const headline = raiz.querySelector<HTMLElement>("[data-headline]");
  const resultado = raiz.querySelector<HTMLElement>("[data-resultado]");
  const confirmacao = raiz.querySelector<HTMLElement>("[data-confirmacao]");
  const anuncio = raiz.querySelector<HTMLElement>("[data-anuncio]");
  const textoCarregando = raiz.querySelector(".console__status")?.textContent?.trim() ?? "";
  const msg = {
    vazio: formLead.dataset.erroVazio ?? "",
    whatsapp: formLead.dataset.erroWhatsapp ?? "",
    consentimento: formLead.dataset.erroConsentimento ?? "",
  };

  let geracaoId: unknown = null;
  let ocupado = false;

  const definirEstado = (estado: Estado) => {
    raiz.dataset.estado = estado;
  };
  // Feixe de luz contínuo na borda enquanto espera a resposta (Border Beam, em global.css).
  const processando = (sim: boolean, botao: HTMLButtonElement | null) => {
    raiz.classList.toggle("feixe--continuo", sim);
    if (botao) definirCarregando(botao, sim);
  };

  /* ---------- 1. Gerar a headline ---------- */

  const marcar = (campo: HTMLInputElement, invalido: boolean) => {
    if (invalido) {
      campo.setAttribute("aria-invalid", "true");
      campo.closest(".campo")?.classList.add("campo--erro");
    } else {
      limparErroCampo(campo);
    }
  };

  for (const campo of [vende, paraQuem]) {
    campo.addEventListener("input", () => {
      if (campo.getAttribute("aria-invalid") !== "true") return;
      if (!textoValido(campo.value.trim())) return;
      marcar(campo, false);
      if (avisoGeracao && ![vende, paraQuem].some((c) => c.getAttribute("aria-invalid") === "true")) {
        mostrarAviso(avisoGeracao, null);
      }
    });
  }

  formGerar.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (ocupado) return;
    if (avisoGeracao) mostrarAviso(avisoGeracao, null);

    const valores = { vende: vende.value.trim(), paraQuem: paraQuem.value.trim() };
    const invalidos = [vende, paraQuem].filter((campo) => !textoValido(campo.value.trim()));
    for (const campo of [vende, paraQuem]) marcar(campo, invalidos.includes(campo));
    if (invalidos.length) {
      if (avisoGeracao) mostrarAviso(avisoGeracao, modelo("campoVazio"));
      invalidos[0].focus();
      return;
    }

    ocupado = true;
    definirEstado("carregando");
    processando(true, botaoGerar);
    vende.readOnly = paraQuem.readOnly = true;
    if (anuncio) anuncio.textContent = textoCarregando;

    let falha: "limite" | "erro" | null = null;
    let frase = "";
    try {
      // Próxima etapa: o token do Turnstile entra aqui (campo "turnstile" no corpo do pedido).
      const resposta = await postarJson("/api/gerar-headline", valores);
      if (resposta.status === 429) {
        falha = "limite";
      } else if (!resposta.ok) {
        falha = "erro";
      } else {
        const dados = (await resposta.json()) as { headline?: unknown; geracao_id?: unknown };
        frase = typeof dados.headline === "string" ? dados.headline.trim() : "";
        geracaoId = dados.geracao_id ?? null;
        if (!frase || geracaoId === null) falha = "erro";
      }
    } catch {
      falha = "erro";
    }

    ocupado = false;
    processando(false, botaoGerar);
    vende.readOnly = paraQuem.readOnly = false;
    if (anuncio) anuncio.textContent = "";

    if (falha || !headline) {
      definirEstado("inicial");
      if (avisoGeracao) mostrarAviso(avisoGeracao, modelo(falha ?? "erro"));
      return;
    }

    // Próxima etapa (medição): evento headline_gerada, sem nenhum dado digitado.
    headline.textContent = frase;
    const animar = !semMovimento();
    if (animar) raiz.dataset.digitando = "";
    definirEstado("resultado");
    // O formulário some: o foco vai para a headline, que o leitor de tela lê inteira.
    resultado?.focus({ preventScroll: true });
    resultado?.scrollIntoView({ block: "nearest", behavior: animar ? "smooth" : "auto" });
    await digitar(headline, frase);
    delete raiz.dataset.digitando;
  });

  /* ---------- 2. Pedir as outras duas versões ---------- */

  ligarMascara(whatsapp);

  const regras: [HTMLInputElement, () => string][] = [
    [nome, () => (nome.value.trim() ? "" : msg.vazio)],
    [whatsapp, () => {
      const d = soDigitos(whatsapp.value);
      if (!d) return msg.vazio;
      return whatsappValido(d) ? "" : msg.whatsapp;
    }],
    [consentimento, () => (consentimento.checked ? "" : msg.consentimento)],
  ];
  for (const [campo, regra] of regras) {
    campo.addEventListener(campo.type === "checkbox" ? "change" : "input", () => {
      if (campo.getAttribute("aria-invalid") === "true" && !regra()) limparErroCampo(campo);
    });
  }

  formLead.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (ocupado) return;
    if (avisoLead) mostrarAviso(avisoLead, null);

    let primeiro: HTMLInputElement | null = null;
    for (const [campo, regra] of regras) {
      const erro = regra();
      if (erro) {
        mostrarErroCampo(campo, erro);
        primeiro ??= campo;
      } else {
        limparErroCampo(campo);
      }
    }
    // O foco no primeiro campo errado faz o leitor de tela ler o rótulo e o erro ligado a ele.
    if (primeiro) {
      primeiro.focus();
      return;
    }

    ocupado = true;
    processando(true, botaoLead);
    let enviado = false;
    try {
      // Próxima etapa: um novo token do Turnstile entra aqui (campo "turnstile" no corpo do pedido).
      const resposta = await postarJson("/api/enviar-lead", {
        origem: "gerador",
        nome: nome.value.trim(),
        whatsapp: soDigitos(whatsapp.value),
        geracao_id: geracaoId,
        consentimento: true,
        utm: lerUtm(),
      });
      enviado = resposta.ok;
    } catch {
      enviado = false;
    }
    ocupado = false;
    processando(false, botaoLead);

    if (!enviado) {
      // O cliente nunca fica sem caminho: o mesmo pedido vai direto pelo WhatsApp.
      if (avisoLead) mostrarAviso(avisoLead, modelo("falha"));
      return;
    }
    // Próxima etapa (medição): evento generate_lead com origem "gerador", sem nome nem telefone.
    definirEstado("enviado");
    confirmacao?.focus({ preventScroll: true });
    confirmacao?.scrollIntoView({ block: "nearest", behavior: semMovimento() ? "auto" : "smooth" });
  });
}

const raiz = document.querySelector<HTMLElement>("[data-gerador]");
if (raiz) iniciar(raiz);
