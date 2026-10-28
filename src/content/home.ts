// Textos da home (copy oficial v2.2, §1 a §18). Nada aqui é inventado: mudou a copy, mude aqui.
// Convenções: **texto** vira negrito; {X} é trocado pelo número de vagas.

// Copy §0: compartilhamento (Open Graph). Título e descrição da página ficam no index e no Base.
export const compartilhar = {
  titulo: "Seu cliente chega no WhatsApp pronto para fechar.",
  descricao: "Landing pages e sites com copy inclusa, design personalizado e garantia no layout. BRAGA SYSTEMS.",
  imagem: "/og/home.jpg",
  imagemAlt: "Gustavo Braga, com a mão no queixo, ao lado da frase “Venda enquanto dorme.” e do logo da BRAGA SYSTEMS",
} as const;

export const topo = {
  links: [
    { texto: "Método", ancora: "metodo" },
    { texto: "Projetos", ancora: "projetos" },
    { texto: "Planos", ancora: "planos" },
    { texto: "Quem sou", href: "/quem-sou" },
    { texto: "Dúvidas", ancora: "duvidas" },
  ],
  botao: "Falar no WhatsApp",
} as const;

export const hero = {
  selo: {
    comVagas: "5 vagas de fundador · 25% off · restam {X}",
    // Copy 2.3: concordância quando resta 1 vaga.
    comUmaVaga: "5 vagas de fundador · 25% off · resta 1",
    esgotado: "Vagas de fundador esgotadas",
    falha: "Vagas de fundador limitadas",
  },
  // Copy 2.6: a headline abre com a promessa; a dor fica para a §4
  titulo: "Venda enquanto dorme.",
  subtitulo:
    "A BRAGA SYSTEMS desenvolve páginas estratégicas, com copy de conversão, que apresentam a sua empresa, organizam o seu portfólio e esclarecem as dúvidas do cliente 24 horas por dia. Fora do expediente, sua página continua vendendo, e o cliente chega ao seu WhatsApp pronto para fechar negócio.",
  // Copy 2.8: o rosto de quem atende, na primeira dobra (pedido do Gustavo, 19/10/2026)
  retrato: {
    alt: "Gustavo Braga, fundador da BRAGA SYSTEMS, sentado de camisa preta com as mãos entrelaçadas",
    legenda: "Gustavo Braga · fundador da BRAGA SYSTEMS",
  },
  // Copy 2.6: um botão só, que leva ao portfólio (a curiosidade vem antes do WhatsApp)
  botao: "Ver projetos",
  microcopy: ["Resposta em até 1 dia útil", "Preços abertos na página"],
} as const;

export const gerador = {
  titulo: "Veja o Método Pré-Venda funcionando no seu negócio.",
  texto: "Diga o que você vende e para quem. Nossa IA escreve a primeira frase da sua página em segundos.",
  campos: {
    vende: { rotulo: "O que você vende?", exemplo: "lentes de contato dental" },
    paraQuem: { rotulo: "Para quem?", exemplo: "adultos que têm vergonha de sorrir" },
  },
  botao: "Gerar minha headline",
  carregando: "Escrevendo a sua headline...",
  resultadoRotulo: "Sua headline:",
  depois: {
    titulo: "Gostou? Tenho mais 2 versões prontas para você.",
    texto:
      "Deixe seu nome e WhatsApp que eu envio as outras duas, junto com uma análise rápida de como elas funcionariam na sua página.",
    nome: "Seu nome",
    whatsapp: "Seu WhatsApp",
    consentimento: "Autorizo o contato pelo WhatsApp e o uso dos meus dados conforme a [Política de Privacidade].",
    botao: "Receber no WhatsApp",
  },
  rodape: ["Sugestão gerada por inteligência artificial", "uso limitado por dia"],
  erros: {
    campoVazio: "Preencha os dois campos para gerar a sua headline.",
    limite: "Você já usou todas as gerações de hoje. Quer ver mais? Fale comigo no WhatsApp.",
    erro: "Não foi possível gerar agora. Tente de novo em alguns instantes.",
    semConsentimento: "Marque a autorização para receber as versões no WhatsApp.",
  },
  confirmacao: "Pronto! Suas outras duas headlines chegam no seu WhatsApp em breve.",
} as const;

export const dor = {
  // Proposta 2.7 "Fora do expediente" (opção 1 do PROPOSTAS-DOR.md, escolhida pelo Gustavo; aguardando aprovação final)
  abertura:
    'Dez da noite. O último atendimento acabou, e o celular tem três mensagens: "quanto custa?". Você explica tudo com calma e manda o valor. Dois visualizam. Um diz que vai pensar. Ninguém volta.',
  titulo: "Seu expediente acaba. A dúvida do cliente, não.",
  itens: [
    "As mesmas perguntas chegam todo dia, e cada resposta começa do zero.",
    "O perfil mostra o trabalho, mas não explica o que você entrega.",
    "O preço parece caro porque ninguém mostrou o valor antes.",
    "O concorrente mais barato fecha porque parece mais profissional.",
    "O investimento em anúncio cai num lugar que não convence.",
    "Quando você para de atender, a venda para junto.",
  ],
  virada: "O pior não é perder o cliente. É começar a duvidar do seu próprio preço.",
  fechamento: "Seu serviço é excelente. Só falta uma página que trabalhe enquanto você descansa.",
} as const;

// Copy 2.11: Proposta + Benefícios numa seção só (escolhida pelo Gustavo em 20/10/2026)
export const proposta = {
  titulo: "Um site bonito não basta. Ele precisa vender.",
  frase: "Quando o cliente te chama, a conversa já começa no meio da venda, não no começo.",
  beneficiosTitulo: "O que muda no seu dia",
  beneficios: [
    { destaque: "Você para de repetir explicação.", texto: "A página responde por você." },
    { destaque: "Seu preço deixa de parecer caro.", texto: "Quem entende o valor não pede desconto." },
    { destaque: "Você não escreve nada.", texto: "A copy vem pronta, a partir de um briefing de 10 minutos." },
    { destaque: "Seu anúncio rende mais.", texto: "O clique cai numa página feita para converter." },
  ],
} as const;

export const metodo = {
  rotulo: "O MÉTODO",
  titulo: "Método Pré-Venda",
  texto:
    "Todo projeto da BRAGA SYSTEMS segue o mesmo método: uma página que faz o trabalho de um vendedor antes de o cliente falar com você.",
  intro: "São 4 camadas, construídas juntas:",
  camadas: [
    {
      numero: "01",
      titulo: "Copy que responde antes da pergunta",
      texto: "Os textos são escritos para quebrar as dúvidas e objeções do seu cliente. Você não precisa escrever nada.",
    },
    {
      numero: "02",
      titulo: "Design que justifica o preço",
      texto:
        "Visual exclusivo, criado para a sua marca. Quem vê entende na hora que você é profissional, e o preço passa a fazer sentido.",
    },
    {
      numero: "03",
      titulo: "Tecnologia que não deixa ninguém esperando",
      texto:
        "Página rápida, feita para o celular e pronta para receber anúncios. Se carregar devagar, o cliente já foi embora.",
    },
    {
      numero: "04",
      titulo: "Um caminho só: até o seu WhatsApp",
      texto: "Cada seção leva ao mesmo lugar. O cliente chega com uma mensagem pronta e você sabe de onde ele veio.",
    },
  ],
} as const;

export const projetos = {
  rotulo: "PROJETOS",
  titulo: "Páginas que já estão trabalhando",
  eben: {
    nome: "EBEN Creative Studio",
    tipo: "Estúdio criativo e audiovisual",
    desafioRotulo: "O desafio:",
    desafio:
      "apresentar um serviço criativo e personalizado de forma que o cliente entendesse o valor antes de pedir orçamento.",
    solucaoRotulo: "A solução:",
    solucao:
      "landing page completa com manifesto, portfólio, método, processo, investimento e perguntas frequentes, tudo levando ao WhatsApp.",
    botao: "Ver o site no ar",
    url: "https://ebencreative.com.br",
    // Nome acessível do botão sobre o vídeo do site (copy 2.3, §8)
    videoPausar: "Pausar o vídeo",
    videoTocar: "Tocar o vídeo",
    frase: "O resultado ficou muito alinhado com o que eu buscava.",
    depoimento:
      "Gostei muito do processo de criação do site da EBEN Creative Studio. Ele conseguiu entender a proposta da marca e traduzir isso em um site com identidade, boa organização visual e uma comunicação alinhada ao posicionamento que quero construir para a empresa. Além da estética, achei importante o cuidado com a estrutura e a forma como as informações foram apresentadas, tornando a navegação mais clara e profissional. O resultado ficou muito alinhado com o que eu buscava e contribuiu para transmitir a imagem que quero que a EBEN tenha no mercado.",
    autora: "Geovana Silva",
    cargo: "CEO da EBEN Creative Studio",
  },
  fundador: {
    titulo: "Seu projeto pode ser o próximo case.",
    texto: "Restam {X} vagas de fundador com 25% de desconto.",
    textoUmaVaga: "Resta 1 vaga de fundador com 25% de desconto.",
    // Estado "falha ao carregar" (mapa técnico, arquivo 03): o cartão aparece sem número.
    textoSemNumero: "Restam vagas de fundador com 25% de desconto.",
    botao: "Quero ser fundador",
  },
} as const;

export const processo = {
  rotulo: "PROCESSO",
  titulo: "Do briefing ao site no ar",
  etapas: [
    { titulo: "Briefing", texto: "Você responde um formulário de cerca de 10 minutos." },
    { titulo: "Copy", texto: "Eu escrevo os textos da sua página." },
    { titulo: "Design", texto: "Você valida o visual." },
    { titulo: "Desenvolvimento", texto: "Construo a página." },
    { titulo: "No ar", texto: "Publicada e pronta para receber clientes." },
  ],
  nota: "Cada etapa só avança com o seu ok.",
  conta:
    "**Faça a conta:** se o seu serviço custa R$ 2.000 ou mais, **um único cliente a mais** já paga a sua página. Cada semana sem ela é cliente que pergunta, não entende e vai para o concorrente.",
} as const;

export const objecoes = {
  titulo: "Talvez você ainda esteja em dúvida",
  itens: [
    {
      pergunta: '"Mas tá caro..."',
      resposta:
        "Caro é pagar anúncio e mandar o cliente para um lugar que não convence. A página não é gasto, é a vendedora que trabalha todo dia, sem salário. E o preço está aberto aqui, sem surpresa.",
    },
    {
      pergunta: '"Mas eu posso fazer no Wix..."',
      resposta:
        "Pode, sim. A diferença não é a ferramenta, é o que vai escrito e onde cada coisa fica. Montar uma página é fácil. Fazer ela vender exige copy, método e técnica, e isso vem incluso aqui.",
    },
    {
      pergunta: '"Mas meu Instagram já basta..."',
      resposta:
        "O Instagram mostra o seu trabalho. A página **vende** o seu trabalho. No perfil, o cliente rola e esquece. Na página, ele lê, entende e chama você.",
    },
    {
      pergunta: '"Mas não sei se site traz cliente..."',
      resposta:
        "Site parado não traz mesmo. Uma página com a copy certa, que você usa nos anúncios, na bio e quando manda proposta, faz o cliente chegar mais preparado. E você acompanha os números com o relatório de visitas.",
    },
    {
      pergunta: '"Mas você tem pouco portfólio..."',
      resposta:
        "É verdade, e é por isso que existem as vagas de fundador: você paga 25% menos e recebe o mesmo cuidado de quem está construindo a própria reputação a cada projeto. Além disso, tem garantia no layout e contrato com escopo fechado.",
      // Copy §11: quando as vagas de fundador esgotarem, esta é a resposta.
      respostaSemVagas:
        "Cada projeto é tratado como se fosse o único do portfólio. E você tem garantia no layout e contrato com escopo fechado.",
    },
  ],
} as const;

export const garantia = {
  titulo: "Não gostou do primeiro layout? Eu refaço do zero, sem custo.",
  texto: "Você só segue para o desenvolvimento quando aprovar o visual.",
  intro: "Além disso, todo projeto tem:",
  itens: [
    { destaque: "Contrato", texto: "com escopo, prazos e valores definidos" },
    { destaque: "Validação em cada etapa,", texto: "com seu ok antes de avançar" },
    { destaque: "Ajustes depois da entrega,", texto: "conforme o plano" },
  ],
  nota: "Garantia válida uma vez por projeto, solicitada em até 3 dias úteis após a apresentação do layout. Detalhes nas dúvidas frequentes.",
} as const;

// Copy 2.8: nome, missão e valor, escritos pelo Gustavo; a seção vem logo depois da Dor
export const sobre = {
  titulo: "Muito prazer, sou Gustavo Braga, fundador da BRAGA SYSTEMS.",
  paragrafos: [
    "Eu crio páginas que fazem a pré-venda por você: explicam o seu serviço, mostram por que ele vale o preço e trazem o cliente pronto para fechar.",
    "Do briefing à publicação, é comigo que você fala. Sem atendente, sem repasse, nada de telefone sem fio.",
  ],
  retratoAlt: "Gustavo Braga, de camiseta preta, com a mão no queixo, olhando para a câmera",
  botaoHistoria: "Conheça minha história",
} as const;

export const urgencia = {
  titulo: "Só 5 vagas de fundador. Restam {X}.",
  tituloUmaVaga: "Só 5 vagas de fundador. Resta 1.",
  paragrafos: [
    "As primeiras 5 empresas pagam **25% menos** em qualquer plano. Em troca, o projeto entra no portfólio e você grava um depoimento curto.",
    "E como cada site é feito por mim, do briefing à publicação, **a agenda é limitada a poucos projetos por mês.**",
  ],
  botao: "Garantir minha vaga",
  // Copy §14, estado sem vagas (e falha ao carregar, mapa técnico arquivo 03).
  semVagas: {
    titulo: "Agenda limitada a poucos projetos por mês. Garanta a sua data.",
    botao: "Verificar disponibilidade",
  },
} as const;

export const ctaFinal = {
  titulo: 'Amanhã, o cliente abre o seu WhatsApp e pergunta: "Como faço para fechar?"',
  paragrafos: [
    "É isso que uma página bem feita faz. Ela explica, convence e entrega o cliente pronto para você.",
    "Você continua fazendo o que faz de melhor. A página cuida da pré-venda.",
  ],
  campos: {
    nome: "Seu nome",
    whatsapp: "Seu WhatsApp",
    tipo: { rotulo: "O que você precisa?", opcoes: ["Landing page", "Site completo", "Ainda não sei"] },
    investimento: {
      rotulo: "Quanto pretende investir?",
      opcoes: ["Até R$ 1.500", "De R$ 1.500 a R$ 3.000", "Acima de R$ 3.000", "Prefiro conversar antes"],
    },
    consentimento: "Autorizo o contato pelo WhatsApp e o uso dos meus dados conforme a [Política de Privacidade].",
  },
  botao: "Quero meu site",
  microcopy: ["Resposta em até 1 dia útil", "Preço de fundador enquanto houver vagas"],
  erros: {
    campoVazio: "Preencha este campo para continuar.",
    whatsappInvalido: "Confira o número com DDD.",
    semConsentimento: "Marque a autorização para continuar.",
  },
  // Mapa técnico, arquivo 08: se a função falhar, o cliente nunca fica sem caminho.
  falhaEnvio: "Não foi possível enviar agora",
  falhaBotao: "Falar no WhatsApp",
} as const;

export const ps = {
  texto:
    "**PS:** seu cliente já está procurando o que você vende. A pergunta é se ele vai encontrar uma página que convence, ou só um perfil que ele esquece. Restam **{X} vagas de fundador** com 25% de desconto e garantia no layout.",
  textoUmaVaga:
    "**PS:** seu cliente já está procurando o que você vende. A pergunta é se ele vai encontrar uma página que convence, ou só um perfil que ele esquece. Resta **1 vaga de fundador** com 25% de desconto e garantia no layout.",
  // Mapa técnico, arquivo 03: sem vagas, a frase sai; na falha, sai só o número.
  textoSemVagas:
    "**PS:** seu cliente já está procurando o que você vende. A pergunta é se ele vai encontrar uma página que convence, ou só um perfil que ele esquece.",
  textoSemNumero:
    "**PS:** seu cliente já está procurando o que você vende. A pergunta é se ele vai encontrar uma página que convence, ou só um perfil que ele esquece. Restam **vagas de fundador** com 25% de desconto e garantia no layout.",
  botao: "Garantir minha vaga",
  // Sem vagas, o botão do PS segue o da Urgência (copy 2.3).
  botaoSemVagas: "Verificar disponibilidade",
} as const;

export const rodape = {
  slogan: "Tecnologia construída com propósito.",
  whatsappRotulo: "WhatsApp:",
  instagramRotulo: "Instagram:",
  facebookRotulo: "Facebook:",
  local: ["Brasília – DF", "Atendimento em todo o Brasil"],
  cnpjRotulo: "CNPJ:",
  links: [
    { texto: "Quem sou eu", href: "/quem-sou" },
    { texto: "Política de Privacidade", href: "/privacidade" },

    // Proposta §26 (26/10/2026, aguardando aprovação)
    { texto: "Termos de uso", href: "/termos" },
  ],
  direitos: "© {ANO} BRAGA SYSTEMS. Todos os direitos reservados.",
} as const;
