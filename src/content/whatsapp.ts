// Mensagem pronta de cada botão de WhatsApp (copy oficial §21).
export const mensagens = {
  topo: "Olá, Gustavo! Vim pelo site da BRAGA SYSTEMS e quero saber mais sobre os sites.",
  hero: "Olá, Gustavo! Quero um site que traga clientes prontos para fechar.",
  gerador: "Olá, Gustavo! Gerei uma headline no seu site e quero receber as outras versões.",
  fundador: "Olá, Gustavo! Quero garantir uma vaga de fundador.",
  essencial: "Olá, Gustavo! Tenho interesse no Plano Essencial.",
  performance: "Olá, Gustavo! Tenho interesse no Plano Performance.",
  signature: "Olá, Gustavo! Tenho interesse no Plano Signature.",
  sobre: "Olá, Gustavo! Vi seu site e quero conversar sobre um projeto.",
  "quem-sou": "Olá, Gustavo! Li sua história no site e quero conversar sobre um projeto.",
  urgencia: "Olá, Gustavo! Quero garantir uma vaga de fundador.",
  formulario: "Olá, Gustavo! Acabei de preencher o formulário no seu site. Sou {nome} e preciso de {tipo de projeto}.",
  // Copy 2.28: quem escolhe "Ainda não sei" (o "preciso de ainda não sei" não fechava)
  "formulario-nao-sei": "Olá, Gustavo! Acabei de preencher o formulário no seu site. Sou {nome} e ainda não sei se preciso de uma landing page ou de um site completo.",
} as const;

export type Origem = keyof typeof mensagens;
