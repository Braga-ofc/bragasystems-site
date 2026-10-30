// Página Quem sou eu (copy oficial §20; história, ferramentas e "Fora do código" da copy 2.25, 29/10/2026).

/** Um capítulo da linha do tempo: texto sempre; os extras, só no capítulo que os tem. */
export interface Marco {
  titulo: string;
  texto: readonly string[];
  funcoes?: readonly string[];
  carimbo?: string;
  virada?: { antes: string; riscada: string; depois: string; destaque: string };
  citacao?: { texto: string; autor: string; ponte: string; fecho: string };
}
export const quemSou = {
  seo: {
    titulo: "Quem sou eu: Gustavo Braga | BRAGA SYSTEMS",
    descricao:
      "Conheça Gustavo Braga, desenvolvedor web e fundador da BRAGA SYSTEMS. Landing pages e sites que fazem a pré-venda por você.",
    // Imagem de compartilhamento própria (origem: BRAGASYSTEMS/site/compartilhamento/home.html?v=quem-sou)
    imagem: "/og/quem-sou.jpg",
    imagemAlt: "Gustavo Braga, de blazer preto, ao lado da frase “Prazer, Gustavo Braga.” e do logo da BRAGA SYSTEMS",
  },
  abertura: {
    rotulo: "Quem sou eu",
    titulo: "Prazer, Gustavo Braga.",
    texto:
      "Desenvolvedor web e fundador da BRAGA SYSTEMS. Eu construo páginas que fazem a pré-venda para negócios que vendem serviços de alto valor e fecham pelo WhatsApp.",
    legenda: { nome: "Gustavo Braga", cargo: "fundador da BRAGA SYSTEMS" },
    fotoAlt: "Gustavo Braga, de blazer preto e camisa preta, olhando para a câmera",
  },
  historia: {
    titulo: "De onde vem a BRAGA SYSTEMS",
    saudacao:
      "Olá! Que bom ter você por aqui. Antes de falar de páginas, quero te contar de onde eu venho e por que eu trabalho do jeito que trabalho.",
    marcos: [
      {
        titulo: "Desde pequeno",
        texto: ["Sempre fui ligado em tecnologia. Desde os 12 anos eu enxergo a internet como trabalho, e foi isso que me impulsionou a seguir a carreira digital."],
      },
      {
        titulo: "Na prática",
        texto: ["Antes de criar páginas, fui social media, videomaker e designer. Cada função me ensinou um lado de como uma marca se comunica."],
        funcoes: ["Social media", "Videomaker", "Designer"],
      },
      {
        titulo: "A escolha",
        texto: ["Depois do ensino médio, precisei escolher uma faculdade, e escolhi sem dúvida: Engenharia de Software, que hoje curso na UNICEPLAC."],
        carimbo: "Engenharia de Software · UNICEPLAC",
      },
      {
        titulo: "A virada",
        texto: [
          "Eu sempre senti falta de conversão nos sites que visitava. Hoje existem muitas landing pages, e quase todas têm o mesmo problema: não convertem.",
          "Percebi que esse seria o forte da minha empresa quando fiz a landing page da EBEN. A parte mais difícil não é o código: é o que vem antes dele.",
          "O grande segredo está na etapa que muitos deixam para trás, ou nas mãos de uma inteligência artificial qualquer. Por isso a copy é um dos pontos mais fortes das páginas da BRAGA SYSTEMS.",
        ],
        // A frase do pico: "código" é riscado e "copy" ganha o marca-texto conforme a rolagem
        virada: { antes: "Não é o", riscada: "código.", depois: "É a", destaque: "copy." },
      },
      {
        titulo: "BRAGA SYSTEMS",
        texto: ["O desejo de criar uma empresa para resolver a dor do outro vem de muito cedo: eu via isso nos meus pais. É de lá, da minha família, que vem o nome BRAGA."],
      },
      {
        titulo: "Hoje",
        texto: ["Encaro cada projeto com seriedade e compromisso, porque sei que, por trás de cada página, existe alguém que confiou o próprio negócio a mim. E faço isso com gosto."],
        citacao: { texto: "O prazer no trabalho aperfeiçoa a obra.", autor: "Aristóteles", ponte: "Como dizia o filósofo", fecho: "É esse prazer que eu coloco em cada detalhe." },
      },
    ],
    fecho: "Hoje, cada projeto que sai daqui carrega o mesmo compromisso: uma página que trabalha pelo cliente enquanto ele cuida do próprio negócio.",
  },
  nome: {
    titulo: "Por que BRAGA SYSTEMS",
    paragrafos: [
      "**BRAGA** é o meu sobrenome. Ele está no nome porque eu assino cada projeto que entrego: quem contrata sabe exatamente quem é o responsável.",
      "**SYSTEMS** é a forma como eu enxergo uma página: um sistema, em que texto, design e tecnologia se encaixam com precisão para entregar um único resultado.",
      "O símbolo da marca traduz essa ideia: um B formado por peças que se encaixam, com um núcleo de luz no centro, o ponto onde tudo se conecta.",
    ],
    // Chamada do Instagram da marca (copy 2.25)
    instagram: "Acompanhe a BRAGA SYSTEMS no Instagram:",
  },
  compromissos: {
    titulo: "Quatro compromissos em cada projeto",
    itens: [
      { titulo: "Texto antes do visual", texto: "Primeiro eu entendo o seu negócio e escrevo a copy. O design nasce para valorizar a mensagem, e não o contrário." },
      { titulo: "Cada detalhe tem motivo", texto: "Nenhum elemento entra na página só para enfeitar. Se está lá, é porque ajuda o seu cliente a decidir." },
      { titulo: "Você fala com quem faz", texto: "Do briefing à publicação, o contato é direto comigo. Sem atendente, sem repasse, sem informação perdida no caminho." },
      { titulo: "Combinado é cumprido", texto: "Escopo, prazos e valores definidos em contrato antes de começar, e cada etapa validada por você." },
    ],
  },
  ajuda: {
    titulo: "Onde eu posso te ajudar",
    itens: [
      { titulo: "Landing pages", texto: "o meu foco. Páginas de uma única missão, feitas para converter visitantes em clientes." },
      { titulo: "Sites institucionais", texto: "presença completa para empresas que querem ser referência no que fazem." },
      { titulo: "Projetos sob medida", texto: "se o seu desafio é digital, vale conversar. Eu gosto de resolver problemas diferentes." },
    ],
  },
  ferramentas: {
    rotulo: "No meu dia a dia",
    itens: ["Astro", "Next.js", "React", "TypeScript", "Tailwind CSS", "CSS", "Lenis", "Supabase", "Cloudflare", "Remotion"],
  },
  confiou: {
    citacao: "O resultado ficou muito alinhado com o que eu buscava.",
    autor: "Geovana Silva",
    cargo: "CEO da EBEN Creative Studio",
    link: { texto: "Ver o projeto da EBEN", href: "https://ebencreative.com.br" },
  },
  foraDoCodigo: {
    titulo: "Fora do código",
    chamada: "Conheça um pouco mais o Gustavo por trás da BRAGA SYSTEMS.",
    paragrafos: [
      "Me chamo Gustavo Braga Costa e, como contei lá em cima, estudo Engenharia de Software na UNICEPLAC.",
      "Sou cristão e carrego comigo os princípios e valores cristãos. Valorizo minha família acima de tudo, e é nela que encontro o mesmo que busco como músico e produtor musical: harmonia.",
      "Por trás da BRAGA SYSTEMS existe um homem de princípios, que trata cada projeto com o mesmo cuidado que dedica à família e à música: com **seriedade**, **entrega** e **palavra cumprida**.",
    ],
    fotoAlt: "Gustavo Braga tocando teclado num palco, com um microfone à frente",
    instagram: { usuario: "@bragakeys", url: "https://www.instagram.com/bragakeys", chamada: "Conheça-me" },
  },
  fechamento: {
    titulo: "Agora você já sabe quem vai cuidar da sua página.",
    texto: "Me conta sobre o seu negócio. Eu te digo, com sinceridade, qual plano faz sentido para o seu momento. E do primeiro “oi” à publicação, quem fala com você sou eu.",
    botao: "Quero conversar com o Gustavo",
    planos: { texto: "Ver os planos", href: "/#planos" },
    micro: "Resposta em até 1 dia útil.",
  },
} as const;
