// Planos, preços e prazos (copy oficial 2.15, §9). Preço de fundador = 25% de desconto, valores da copy.
import type { Origem } from "./whatsapp";

export const secaoPlanos = {
  // Copy 2.5: o custo de esperar, lido antes dos preços
  custo:
    "Cada semana sem uma página que vende é mais uma semana explicando a mesma coisa, mandando o preço e torcendo para alguém responder.",
  rotulo: "PLANOS",
  titulo: "Escolha o seu plano",
  texto: "Preços abertos, sem surpresa. Todos os planos incluem a copy de conversão.",
  nota: "Preço de fundador válido para as 5 primeiras vagas.",
  precoFundadorRotulo: "preço de fundador",
  aPartirDe: "A partir de",
} as const;

export interface Plano {
  id: "essencial" | "performance" | "signature";
  nome: string;
  aPartirDe?: boolean;
  precoCheio: string;
  precoFundador: string;
  para: string;
  itens: string[];
  prazo: string;
  botao: string;
  origem: Origem;
  destaque?: boolean;
}

export const planos: Plano[] = [
  {
    id: "essencial",
    nome: "PLANO ESSENCIAL",
    precoCheio: "R$ 932",
    precoFundador: "R$ 699",
    para: "Para quem precisa de uma página bem feita, rápido.",
    itens: [
      "Landing page com até 6 seções",
      "Copy de conversão inclusa",
      "Layout responsivo e de carregamento rápido",
      "WhatsApp e formulário integrados",
      "1 rodada de revisão",
      "7 dias de ajustes após a publicação",
    ],
    prazo: "Entrega em até 7 dias úteis.",
    botao: "Quero o Essencial",
    origem: "essencial",
  },
  {
    id: "performance",
    nome: "PLANO PERFORMANCE",
    precoCheio: "R$ 1.596",
    precoFundador: "R$ 1.197",
    para: "Para quem vai anunciar e quer cada clique valendo.",
    itens: [],
    prazo: "Entrega em até 12 dias úteis.",
    botao: "Quero o Performance",
    origem: "performance",
    destaque: true,
  },
  {
    id: "signature",
    nome: "PLANO SIGNATURE",
    aPartirDe: true,
    precoCheio: "R$ 2.796",
    precoFundador: "R$ 2.097",
    para: "Para empresas que querem ser referência no que fazem.",
    itens: [
      "Site com até 3 páginas",
      "Tudo do Plano Performance",
      "Copy de conversão em todas as páginas",
      "SEO essencial para aparecer no Google",
      "Página extra por R$ 400",
      "30 dias de ajustes após a publicação",
    ],
    prazo: "Entrega em até 20 dias úteis.",
    botao: "Quero o Signature",
    origem: "signature",
  },
];

/** Só o Performance mostra a lista com valor de mercado e o total riscado. */
export const performance = {
  selo: "RECOMENDADO",
  recebeTitulo: "O que você recebe:",
  itens: [
    { texto: "Landing page com design 100% personalizado", valor: "valor de mercado: R$ 2.500" },
    { texto: "Copy de conversão pelo Método Pré-Venda", valor: "R$ 800" },
    { texto: "Pixel da Meta e Google Analytics configurados", valor: "R$ 200" },
    { texto: "Kit de divulgação (imagem de compartilhamento + 3 artes)", valor: "R$ 300" },
    { texto: "30 dias de ajustes depois de publicar", valor: "R$ 300" },
  ],
  valorTotalRotulo: "Valor total:",
  valorTotal: "R$ 4.100",
  vocePagaRotulo: "Você paga:",
  vocePagaFundador: "R$ 1.197 no preço de fundador",
  // Copy §9, estado sem vagas: o "Você paga" do Performance passa a R$ 1.596.
  vocePagaCheio: "R$ 1.596",
  tambem:
    "Também inclui: até 12 seções, animações personalizadas, relatório de performance na entrega e 2 rodadas de revisão.",
} as const;

export const continuo = {
  nome: "+ PLANO CONTÍNUO · R$ 147/mês",
  opcional: "(opcional)",
  texto:
    "Seu site sempre no ar e atualizado: hospedagem e domínio gerenciados, até 2 alterações por mês e relatório mensal de visitas.",
} as const;

export const pagamento =
  "**Pagamento:** 50% para começar, 50% na entrega · **5% off no Pix** · ou em até 6x no cartão.";

// Copy 2.16 (letra miúda dos Planos, pedida pelo Gustavo em 27/10/2026)
export const dominio =
  "Domínio e hospedagem não entram no preço do projeto: ficam no seu nome, e o custo, quando houver, você paga direto ao fornecedor. Eu configuro tudo.";
