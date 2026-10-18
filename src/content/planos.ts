// Planos, preços e prazos (copy oficial §9). Preço de fundador = 25% de desconto, valores da copy.
import type { Origem } from "./whatsapp";

export const secaoPlanos = {
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
    precoCheio: "R$ 1.497",
    precoFundador: "R$ 1.123",
    para: "Para quem precisa de uma página bem feita, rápido.",
    itens: [
      "Landing page com até 8 seções",
      "Copy de conversão inclusa",
      "Layout responsivo e de carregamento rápido",
      "WhatsApp e formulário integrados",
      "2 rodadas de revisão",
      "7 dias de ajustes após a publicação",
    ],
    prazo: "Entrega em até 7 dias úteis.",
    botao: "Quero o Essencial",
    origem: "essencial",
  },
  {
    id: "performance",
    nome: "PLANO PERFORMANCE",
    precoCheio: "R$ 2.497",
    precoFundador: "R$ 1.873",
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
    precoCheio: "R$ 4.497",
    precoFundador: "R$ 3.373",
    para: "Para empresas que querem ser referência no que fazem.",
    itens: [
      "Site com até 5 páginas",
      "Tudo do Plano Performance",
      "Copy de conversão em todas as páginas",
      "SEO essencial para aparecer no Google",
      "1 integração extra (CRM, agenda ou e-mail)",
      "30 dias de ajustes após a publicação",
    ],
    prazo: "Entrega em até 25 dias úteis.",
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
    { texto: "Pixel da Meta e Google Analytics configurados", valor: "R$ 300" },
    { texto: "Kit de divulgação (imagem de compartilhamento + 3 artes)", valor: "R$ 300" },
    { texto: "30 dias de ajustes depois de publicar", valor: "R$ 300" },
  ],
  valorTotalRotulo: "Valor total:",
  valorTotal: "R$ 4.200",
  vocePagaRotulo: "Você paga:",
  vocePagaFundador: "R$ 1.873 no preço de fundador",
  // Copy §9, estado sem vagas: o "Você paga" do Performance passa a R$ 2.497.
  vocePagaCheio: "R$ 2.497",
  tambem:
    "Também inclui: até 12 seções, animações personalizadas, relatório de performance na entrega e 3 rodadas de revisão.",
} as const;

export const continuo = {
  nome: "+ PLANO CONTÍNUO · R$ 147/mês",
  opcional: "(opcional)",
  texto:
    "Seu site sempre no ar e atualizado: hospedagem e domínio gerenciados, até 2 alterações por mês e relatório mensal de visitas.",
} as const;

export const pagamento =
  "**Pagamento:** 50% para começar, 50% na entrega · **5% off no Pix** · ou em até 6x no cartão.";
