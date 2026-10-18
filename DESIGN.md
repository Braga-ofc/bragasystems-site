---
name: BRAGA SYSTEMS
description: O painel de um sistema que já está ligado. Preto profundo, módulos chanfrados em 45°, leituras em mono e um só ponto de luz ciano por bloco.
colors:
  preto-profundo: "#0B0F14"
  fundo-rebaixado: "#080B0F"
  faixa-elevada: "color-mix(in srgb, #0B0F14 72%, #202833)"
  grafite: "#202833"
  linha: "#2E3946"
  linha-forte: "#4A5768"
  tinta-apagada: "#8A96A6"
  prata-fria: "#D6DDE6"
  tinta-forte: "#F2F5F8"
  ciano-eletrico: "#35D5E8"
  ciano-eletrico-forte: "#6FE3F0"
  brilho: "rgb(53 213 232 / 0.22)"
  erro: "#FF8A80"
  claro-fundo: "#F5F7FA"
  claro-elevado: "#FFFFFF"
  claro-rebaixado: "#E9EDF2"
  claro-linha: "#C9D1DB"
  claro-linha-forte: "#8E9AA8"
  claro-tinta-apagada: "#566170"
  claro-tinta-forte: "#000000"
  ciano-profundo: "#0B7C8C"
  ciano-profundo-forte: "#096A78"
  claro-brilho: "rgb(11 124 140 / 0.16)"
  claro-erro: "#B42318"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.55rem + 3vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.45rem + 1.8vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.32rem + 0.75vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "\"cv11\", \"ss01\""
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.005em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.18em"
  reading:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.06em"
rounded:
  nenhum: "0px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
  grade: "32px"
  gutter: "clamp(20px, 5vw, 32px)"
  secao: "clamp(64px, 10vw, 128px)"
components:
  botao-primario:
    backgroundColor: "{colors.ciano-eletrico}"
    textColor: "{colors.preto-profundo}"
    typography: "{typography.button}"
    rounded: "{rounded.nenhum}"
    padding: "0 22px 0 24px"
    height: "52px"
  botao-primario-hover:
    backgroundColor: "{colors.ciano-eletrico-forte}"
    textColor: "{colors.preto-profundo}"
  botao-primario-claro:
    backgroundColor: "{colors.ciano-profundo}"
    textColor: "{colors.claro-elevado}"
    typography: "{typography.button}"
    rounded: "{rounded.nenhum}"
    padding: "0 22px 0 24px"
    height: "52px"
  botao-primario-claro-hover:
    backgroundColor: "{colors.ciano-profundo-forte}"
    textColor: "{colors.claro-elevado}"
  botao-secundario:
    backgroundColor: "{colors.preto-profundo}"
    textColor: "{colors.tinta-forte}"
    typography: "{typography.button}"
    rounded: "{rounded.nenhum}"
    padding: "0 22px 0 24px"
    height: "52px"
  botao-desativado:
    backgroundColor: "{colors.grafite}"
    textColor: "{colors.tinta-apagada}"
  campo:
    backgroundColor: "{colors.fundo-rebaixado}"
    textColor: "{colors.tinta-forte}"
    typography: "{typography.body}"
    rounded: "{rounded.nenhum}"
    padding: "0 16px"
    height: "52px"
  selo-vagas:
    backgroundColor: "{colors.preto-profundo}"
    textColor: "{colors.prata-fria}"
    typography: "{typography.reading}"
    rounded: "{rounded.nenhum}"
    padding: "6px 14px 6px 12px"
    height: "32px"
  selo-recomendado:
    backgroundColor: "{colors.ciano-eletrico}"
    textColor: "{colors.preto-profundo}"
    rounded: "{rounded.nenhum}"
    padding: "4px 12px"
    height: "26px"
  modulo:
    backgroundColor: "{colors.preto-profundo}"
    textColor: "{colors.prata-fria}"
    rounded: "{rounded.nenhum}"
    padding: "24px"
  modulo-rebaixado:
    backgroundColor: "{colors.fundo-rebaixado}"
    textColor: "{colors.prata-fria}"
    rounded: "{rounded.nenhum}"
    padding: "clamp(20px, 7cqi, 32px)"
  modulo-grafite:
    backgroundColor: "{colors.grafite}"
    textColor: "{colors.prata-fria}"
    rounded: "{rounded.nenhum}"
    padding: "24px"
  no-circuito:
    backgroundColor: "{colors.preto-profundo}"
    textColor: "{colors.tinta-forte}"
    typography: "{typography.label}"
    rounded: "{rounded.nenhum}"
    size: "36px"
  medidor-segmento:
    backgroundColor: "{colors.ciano-eletrico}"
    width: "18px"
    height: "8px"
  medidor-segmento-apagado:
    backgroundColor: "{colors.linha}"
    width: "18px"
    height: "8px"
  topo:
    backgroundColor: "{colors.preto-profundo}"
    textColor: "{colors.prata-fria}"
    height: "64px"
---

# Design System: BRAGA SYSTEMS

## Overview

**Creative North Star: "O Painel em Operação"**

O site é o painel de um sistema que já está ligado. O fundo é preto profundo; por cima, uma grade fina de 32 px na cor das linhas que se dissolve nas bordas (na primeira dobra, uma grade de pontos que se curva na direção do mouse, sobre uma névoa de luz). O conteúdo mora em módulos de borda 1 px com canto chanfrado em 45°, os dados aparecem como leituras em JetBrains Mono com números tabulares, e cada bloco tem um único ponto de luz em ciano. Nenhum traço é enfeite: cada linha é trilho, régua, divisória ou leitura, e o que acende acende uma vez e para.

A densidade é calma e medida. O desenho nasce no celular (390 px) e abre para uma grade de 12 colunas no computador, com divisões assimétricas (7/5, 5/7, 4/8) em vez de colunas iguais. Títulos em Space Grotesk, texto corrido em Inter, dados e rótulos em mono. O escuro é o padrão; duas seções claras dão ritmo à página e faixas um passo acima do preto marcam prova, pessoa e fechamento.

O sistema recusa o hero centralizado sobre uma fileira de cartões iguais, os cantos arredondados, a sombra cinza embaixo de cartão, o ciano elétrico como texto sobre fundo claro, o aparelho desenhado em volta de uma tela e o avatar falso. Listas viram registros, placas, trilhos e circuitos.

**Key Characteristics:**
- Preto profundo dominante, com profundidade feita de tom e de linha, não de sombra.
- Módulos de borda 1 px com chanfro em 45° nos cantos superior esquerdo e inferior direito; nenhum raio.
- Leituras em JetBrains Mono, caixa alta e números tabulares, só para dados e rótulos da copy.
- Um só destaque ciano por bloco: botão preenchido, borda do módulo em destaque, nó de destino ou cunha acesa.
- A cunha em 45° (o núcleo do símbolo) no lugar de marcador, asterisco e avatar.
- O medidor de vagas: cinco paralelogramos acesos, ligados ao estado real do contador.
- Movimento que liga uma vez e para; nada em laço sem motivo e sem jeito de parar.

## Colors

Uma paleta quase monocromática de azul-ardósia muito escuro, com um único ponto de luz em ciano que muda de tom quando a seção fica clara.

### Primary
- **Ciano Elétrico** (#35D5E8): o destaque no escuro. Preenche o botão principal do bloco, acende o medidor de vagas, a borda do plano Performance, o nó do WhatsApp no fim do Método, a cunha do fechamento da Dor, o traço do corte da placa de Benefícios, o contorno de foco e a seleção de texto. Contraste de 10,83:1 sobre o preto profundo; o texto sobre ele é preto profundo.
- **Ciano Elétrico Forte** (#6FE3F0): hover do botão primário e cor da luz em movimento (o feixe na borda, o pulso do circuito).
- **Brilho** (rgb(53 213 232 / 0.22)): o halo do ciano. Nunca é cor de superfície; só aparece desfocado em volta do que já é ciano.
- **Ciano Profundo** (#0B7C8C): o destaque nas seções claras (4,58:1 sobre o fundo claro). Preenche o botão primário com texto branco e borda o selo da Garantia. Hover em **Ciano Profundo Forte** (#096A78); halo em **Brilho Claro** (rgb(11 124 140 / 0.16)).

### Neutral
- **Preto Profundo** (#0B0F14): o fundo da página e de todo módulo comum. É também a tinta das seções claras.
- **Fundo Rebaixado** (#080B0F): o nível abaixo do preto. Console do gerador, campos de formulário, módulos das camadas 01 a 03 do Método, janela do medidor na Urgência, cartão de fundador, painel do menu e rodapé.
- **Faixa Elevada** (color-mix 72% preto profundo, 28% grafite): o fundo das seções que sobem um passo (Projetos, Sobre, CTA final).
- **Grafite** (#202833): a superfície do módulo que importa no bloco. Plano Performance, camada 04 do Método, formulário do CTA, a conta do Processo, botão do acordeão aberto e botão desativado.
- **Linha** (#2E3946): bordas de módulo, divisórias, trilhos, régua das objeções e a grade de 32 px.
- **Linha Forte** (#4A5768): borda do botão secundário e de módulos com ênfase neutra, traço do circuito, cunhas apagadas, barra de rolagem. É traço, nunca texto.
- **Tinta Apagada** (#8A96A6): texto secundário, legendas, leituras em mono, placeholder, a consequência apagada de um título (6,40:1 no preto, 4,95:1 no grafite).
- **Prata Fria** (#D6DDE6): o texto corrido (14,04:1 no preto).
- **Tinta Forte** (#F2F5F8): títulos, números, valores e a palavra que precisa pesar.
- **Seção clara:** fundo **Claro Fundo** (#F5F7FA), superfície **Claro Elevado** (#FFFFFF), rebaixado **Claro Rebaixado** (#E9EDF2), linhas **Claro Linha** (#C9D1DB) e **Claro Linha Forte** (#8E9AA8), texto secundário **Claro Tinta Apagada** (#566170, 5,86:1) e tinta forte **Claro Tinta Forte** (#000000).

### Erro
- **Erro** (#FF8A80) no escuro e **Claro Erro** (#B42318) no claro: borda do campo inválido, ícone de alerta e a mensagem do erro. Sempre com ícone e texto, nunca só a cor.

### Named Rules
**A Regra do Ciano Único.** Cada bloco tem um só destaque ciano: o botão preenchido, ou a borda do módulo em destaque, ou o nó de destino, ou a cunha acesa, ou a frase-chave de uma conta. Links de texto dentro de um bloco que já tem destaque ficam em tinta forte com sublinhado em linha forte. A única luz que pode acender junto com o destaque é a leitura do medidor de vagas (e a cunha do selo dele), porque é dado ao vivo e não ênfase.

**A Regra do Ciano Profundo.** Em seção clara, o destaque é o ciano profundo. Ciano elétrico nunca é texto, traço fino ou borda sobre fundo claro: lá ele dá 1,65:1.

**A Regra das Três Tintas.** Texto tem três degraus: tinta forte para títulos, números e o que importa; prata fria para o corpo; tinta apagada para o secundário. Ênfase dentro de uma frase sobe um degrau de tinta e vai a peso 600; não muda de cor.

## Typography

**Display Font:** Space Grotesk 500 e 600 (com system-ui, sans-serif)
**Body Font:** Inter 400, 500 e 600 (com system-ui, sans-serif), com os recursos cv11 e ss01
**Label/Mono Font:** JetBrains Mono 400 e 500 (com ui-monospace, monospace)

**Character:** Space Grotesk dá aos títulos um desenho técnico e um pouco geométrico, sempre com espaçamento fechado. Inter carrega a leitura sem chamar atenção. JetBrains Mono é o instrumento: só aparece onde há um dado para ler. As três fontes são servidas pelo próprio site (woff2, `font-display: swap`), com Space Grotesk 600 e Inter 400 pré-carregadas.

### Hierarchy
- **Display** (600, clamp(2.25rem, 1.55rem + 3vw, 3.5rem), 1.04, -0.03em): a frase que segura a seção. A pergunta do CTA final, "Restam {X}." na Urgência e o título da Proposta no computador. A headline do hero usa o mesmo peso com tamanho próprio, clamp(2rem, 11.4vw - 0.1875rem, 3.5rem), para fechar em 4 linhas no celular.
- **Headline** (600, clamp(1.875rem, 1.45rem + 1.8vw, 2.5rem), 1.12, -0.02em): o título de cada seção, com largura máxima entre 12ch e 20ch. Também o número grande do preço (a 1, -0.03em; 1,25x no plano em destaque).
- **Title** (500, clamp(1.5rem, 1.32rem + 0.75vw, 1.75rem), 1.2, -0.02em): falas e frases de virada. As objeções, a citação do depoimento, o fechamento da Dor, a frase-nó da Proposta, o slogan do rodapé, o nome do case.
- **Title Small** (500, 1.25rem, 1.3, -0.01em): nomes dentro de módulos (camadas do Método, benefícios, etapas do Processo, perguntas do FAQ no computador).
- **Body Large** (400, 1.125rem, 1.6): o primeiro parágrafo de cada seção e o texto de abertura, até 44ch a 52ch.
- **Body** (400, 1rem, 1.625): texto corrido, até 58ch a 64ch.
- **Body Small** (400, 0.875rem, 1.5): listas dos planos, rótulos de campo (500, tinta forte), ajudas, notas e erros.
- **Button** (600, 1rem, 1.2, -0.005em): todo botão.
- **Label** (500, 0.75rem, 1.3, 0.18em, caixa alta): o rótulo técnico da copy e os nomes dos planos (0.16em). Sempre tinta apagada.
- **Reading** (500, 0.75rem, 1.5, 0.05em a 0.08em, caixa alta): leituras do painel. Microcopy do hero, rodapé do console e do formulário, selo de vagas (de 0.6875rem a 0.75rem), prazo do plano, local no rodapé. Os valores riscados e os números dos nós usam o mono a 400 ou 500 em 0.75rem a 0.875rem.

### Named Rules
**A Regra do Mono como Instrumento.** JetBrains Mono só para dados e rótulos: preços, valores, prazos, números dos nós e etapas, rótulos da copy, microcopy de leitura e nomes de plano. Nunca para frases de argumento. Todo número que muda ou se compara leva números tabulares.

**A Regra do Rótulo que Vem da Copy.** O rótulo técnico (um traço de 14 px em 45° seguido do texto em mono caixa alta) só existe onde a copy oficial tem um: O MÉTODO, PROJETOS, PLANOS, PROCESSO, QUEM FAZ e o rótulo do resultado do gerador. Nenhuma seção ganha rótulo para enfeitar o título.

## Layout

O espaço é um contêiner de 1120 px com respiro lateral de clamp(20px, 5vw, 32px) e versão estreita de 760 px. Cada seção tem clamp(64px, 10vw, 128px) de respiro em cima e embaixo. A escala de espaço é base 4/8: 4, 8, 12, 16, 24, 32, 48, 64 e 96 px; 24 px é o passo mais usado (padding de módulo no celular e intervalo das colunas), 48 px separa título e conteúdo, 64 px abre a primeira dobra.

A primeira dobra fica sobre a grade do painel: linhas de 1 px a cada 32 px na cor das linhas (55% de opacidade), alinhadas à margem do conteúdo e com a primeira horizontal no topo dele, dissolvidas por uma máscara radial. A grade volta só por dentro de módulos que são encaixes (o visor do gerador e o cartão de fundador), nunca como fundo de seção comum.

O celular é a base (390 px). A partir de 960 px (1024 px na primeira dobra, nos planos, no Processo e no PS) o conteúdo vai para 12 colunas com 24 px entre elas, sempre em divisões assimétricas: oferta em 7 e console em 5; título em 5 e circuito em 7 a 12; FAQ em 4 e 8; selo da Garantia em 7 e termos em 9 a 12; carta do PS em 7 e retrato em 8 a 12. Títulos ficam presos abaixo do topo (72 px mais um respiro) enquanto o conteúdo passa: Método, FAQ, CTA final e o cartão de fundador. Leituras descem em degrau (Proposta em 1, 4 e 7; objeções em zigue-zague, com a coluna da direita 96 px abaixo).

Pontos de quebra: 480, 640, 720, 960 e 1024 px, com ajustes finos em 375, 380 e 520 px no topo e no selo. Dentro dos módulos, consultas de contêiner reorganizam o miolo (console em 600 px, cartão de plano em 600, ficha do case em 560, case em 880, formulário em 440).

Entre duas seções do mesmo tom corre uma divisória: linha de 1 px na largura do conteúdo, com o começo cortado em 45° à esquerda, como as fendas do símbolo. Ela some na entrada e na saída de uma seção clara.

### Named Rules
**A Regra do Ritmo de Tons.** O escuro é o padrão. Seção clara é rara e nunca vem colada em outra clara: na home são só a Proposta (§5) e a Garantia (§12). A faixa elevada marca prova, pessoa e fechamento: Projetos (§8), Sobre (§13) e CTA final (§16). O rodapé desce para o fundo rebaixado.

## Elevation & Depth

O sistema é plano e em camadas de tom. A profundidade vem de quatro níveis de fundo (rebaixado, preto, faixa elevada e grafite) e da borda de 1 px, que sobe de linha para linha forte quando o módulo pede ênfase neutra e vira ciano só no destaque do bloco. Não há sombra cinza embaixo de módulo. O que existe é luz: um halo ciano desfocado em volta do que já é ciano.

### Shadow Vocabulary
- **Brilho do destaque** (camada com o recorte chanfrado em brilho, `filter: blur(40px)`, deslocada 16 px para baixo): atrás do plano Performance. É uma camada parada, para o feixe animado não obrigar o navegador a refazer o desfoque.
- **Brilho de leitura** (`filter: drop-shadow(0 0 6px var(--brilho))`): cada segmento aceso do medidor de vagas.
- **Brilho de destino** (`filter: drop-shadow(0 0 14px var(--brilho))`): o nó do WhatsApp no fim do circuito do Método.
- **Brilho da cunha** (`filter: drop-shadow(0 0 8px var(--brilho))` e `0 0 4px`): a cunha acesa da Dor e o traço do corte da placa de Benefícios.
- **Halo do hero** (radial-gradient com 42% do brilho, parado): atrás da headline.
- **Painel sobreposto** (`box-shadow: 0 24px 48px -12px rgb(0 0 0 / 0.6)`): só o painel do menu no celular, que flutua sobre a página com um véu de 60% do fundo rebaixado. O topo fixo usa 88% do preto com desfoque de 12 px.

### Named Rules
**A Regra da Luz, Não Sombra.** Módulos não projetam sombra. A única luz é o halo do ciano, e ela só existe em volta do destaque do bloco, da leitura das vagas ou, parada, atrás da headline do hero. A única sombra escura é a do painel do menu.

## Shapes

A forma vem do símbolo B: ângulos de 0°, 45° e 90°, traço de espessura única e cantos chanfrados. Nenhum elemento tem raio, nem a caixa de consentimento.

- **Chanfro:** corte em 45° nos cantos superior esquerdo e inferior direito; os outros dois ficam retos. Três tamanhos: 8 px nos controles pequenos (campos, nós, botão do menu e do acordeão, controle do vídeo, retrato do depoimento), 12 px em botões e módulos médios, 20 px nos módulos grandes (console, planos, ficha do case, formulário, placa, selo da Garantia, cartão de fundador). Os selos usam 6 px e 7 px.
- **Como o chanfro é feito:** o recorte fica só nas camadas de fundo (uma para a borda, outra para o preenchimento, com o chanfro interno compensado por 0,586 da espessura). Conteúdo, área de toque e contorno de foco nunca são cortados. No alto contraste do Windows a moldura vira borda real.
- **Cunha:** paralelogramo de 12 x 8 px com lados em 45°, o núcleo do símbolo. Marca item de registro, autoria de depoimento, nota no lugar de asterisco, prazo do plano, rodapé de leitura e o selo de vagas.
- **Segmento do medidor:** paralelogramo em 45° (18 x 8 px no pequeno), com fendas de 3 px. O trilho do Processo usa o mesmo corte.
- **Divisória:** linha de 1 px com o começo cortado em 45°.
- **Traços do circuito:** trilhos de 1 px, hastes em 90°, dobras e ramos em 45°, ponto quadrado de 5 px na origem.
- **Marcas de enquadramento:** cantos em 90° de 1 px nos cantos retos do retrato do Sobre.
- **Losango:** quadrado girado de 14 px, o nó da Proposta.
- **Ícones:** SVG de 24 px de grade, traço de 1,75 em currentColor, pontas quadradas e junções em quina, só ângulos de 0°, 45° e 90° (curva só no círculo do Instagram).

### Named Rules
**A Regra dos Três Ângulos.** Todo traço, corte e ícone usa 0°, 45° ou 90°. Se uma forma pede curva ou raio, ela não é deste sistema.

## Components

### Buttons
Diretos e firmes: uma lâmina chanfrada que desce 1 px ao toque.
- **Shape:** chanfro de 12 px, sem raio; altura mínima de 52 px; padding 0 22px 0 24px; ícone de 20 px à direita, a 10 px do texto.
- **Primary:** preenchido e bordado em ciano elétrico, texto preto profundo; na seção clara, ciano profundo com texto branco. Um por bloco.
- **Hover / Focus:** o primário passa para o tom forte do ciano; o ícone desliza 3 px para a direita; ao toque, o botão desce 1 px; foco com contorno de 2 px no ciano a 4 px de distância. As cores da moldura transitam em 240 ms.
- **Secondary (vazado):** borda de 1 px em linha forte, fundo da superfície, texto tinta forte; no hover só a borda acende em ciano.
- **Carregando:** o texto fica e o ícone vira um quadrado de 14 px com borda de 2 px girando (0,9 s).
- **Desativado:** borda em linha, fundo grafite, texto tinta apagada, sem deslocamento.
- **Celular:** os botões do hero, do Sobre, da Urgência e do PS ocupam a largura toda até 480 a 640 px. No topo, o botão do WhatsApp fica compacto (44 px, texto de 14 px) e abaixo de 380 px vira só o ícone, com o texto para leitor de tela.

### Chips
- **Selo de vagas:** chanfro de 7 px, borda linha forte, fundo da superfície, leitura em mono caixa alta (de 11 a 12 px, 0.05em), altura mínima de 32 px. À esquerda, a cunha: ciano quando há vagas contadas, tinta apagada no esgotado e na falha. O número de vagas sai em tinta forte. Todas as versões (com vagas, com 1 vaga, esgotado, falha) já vêm no HTML; o estado do contador escolhe qual aparece.
- **Selo recomendado:** chanfro de 6 px, preenchido em ciano, texto preto profundo, mono a 0.16em, 26 px de altura, preso na borda de cima do plano Performance como uma etiqueta.

### Cards / Containers (módulos)
- **Corner Style:** chanfro de 12 px nos módulos médios e 20 px nos grandes.
- **Background:** fundo rebaixado para módulos de trabalho (console, campos, camadas 01 a 03, cartão de fundador, janela do medidor); preto para módulos comuns (planos, ficha do case, placa, Plano Contínuo); grafite para o módulo que importa no bloco.
- **Shadow Strategy:** nenhuma; ver Elevation & Depth.
- **Border:** 1 px em linha; linha forte para ênfase neutra; ciano só no destaque do bloco. O módulo de plano comum acende a borda para linha forte quando o botão dele está em hover ou foco.
- **Internal Padding:** 24 px no celular e 32 px a partir de 720 px; console em clamp(20px, 7cqi, 32px), formulário em clamp(20px, 6.5cqi, 40px). Zonas internas separadas por linhas de 1 px; o rodapé do módulo é uma leitura em mono com a cunha.

### Inputs / Fields
- **Style:** moldura chanfrada de 8 px, fundo rebaixado, borda de 1 px numa mistura de 75% tinta apagada e 25% linha forte (3:1 ou mais no escuro e no claro), altura de 52 px, padding 0 16px, texto de 16 px (sem zoom automático no iPhone). Rótulo em cima (Inter 500, 14 px, tinta forte), ajuda em 14 px apagada, placeholder em tinta apagada. Seleção com a seta para baixo a 16 px da direita.
- **Focus:** a borda vira ciano com 2 px de espessura.
- **Error / Disabled:** borda em erro; com foco, a borda segue vermelha e ganha o contorno ciano de 2 px a 3 px. A mensagem tem ícone de alerta de 16 px e texto de 14 px, ligada ao campo e anunciada. Desativado a 55% de opacidade.
- **Consentimento:** caixa quadrada de 22 px com borda de 1,5 px; marcada, fundo ciano com o visto desenhado. A linha inteira é clicável e tem pelo menos 44 px.

### Navigation
- **Topo fixo** de 64 px (72 no computador) com linha inferior de 1 px, fundo preto a 88% com desfoque de 12 px. Logo de 128 px (148 no computador), só tamanho, nunca efeito.
- **Links (a partir de 960 px):** Inter 500 de 15 px em prata fria; no hover e na página atual, tinta forte com um sublinhado ciano de 1 px que corre da esquerda. Uma divisória vertical de 1 x 24 px separa os links do botão do WhatsApp, que nunca sai da tela.
- **Celular:** botão de menu de 44 px com chanfro de 8 px; o ícone troca de menu para fechar com um giro de 45°. O painel desce abrindo de cima (240 ms) sobre o fundo rebaixado, com links em Space Grotesk 500 de 22 px, 56 px de altura e uma seta que desliza 4 px e acende em ciano. Fecha com Esc, com toque no véu ou com a rolagem. Sem JavaScript, os links aparecem numa linha logo abaixo da barra.

### Medidor de vagas (assinatura)
Cinco paralelogramos em 45°, um por vaga de fundador. Com vagas, os N primeiros acendem em ciano com o brilho de leitura e o resto fica cheio em linha. Esgotado, os cinco ficam cheios em linha (zero). Sem leitura (falha ou carregando), os cinco ficam vazados, só o contorno de 1 px em linha forte, para não parecer zero. Ao carregar, as vagas acendem uma a uma (360 ms cada, 90 ms de intervalo), como um instrumento ligando; o recorte tem sempre os mesmos 10 pontos, então a troca entre cheio e vazado se anima de fora para dentro. Tamanhos: 18 x 8 px no hero e no cartão de fundador, ligado ao selo por um traço de 1 px; na Urgência, uma janela chanfrada com os segmentos esticados na largura toda (20, 28 e 36 px de altura). É sempre decorativo: quem informa é o texto ao lado.

### Console do gerador
Um módulo rebaixado com chanfro de 20 px dividido em zonas por linhas de 1 px: cabeça, visor, entrada, depois do resultado, enviado e rodapé de leitura. O visor imprime a headline gerada em Space Grotesk 600 (clamp(1.625rem, 1rem + 3.4cqi, 2.25rem)) sobre a grade fina, que se dissolve a partir do canto de cima à esquerda; as letras acendem em ordem com um cursor de 2 px. Os estados (inicial, carregando, resultado, enviado) já estão no HTML. Carregando: o feixe corre sem parar na borda, uma leitura em mono com a cunha aparece sob o botão e a cunha do rodapé passa para tinta forte. Enviado: o ciano sai do botão e vai para o visto chanfrado de 40 px.

### Circuito do Método
O gesto assinado do sistema. Um trilho vertical de 1 px em linha forte, com um ponto quadrado de 5 px na origem, passa por nós chanfrados de 36 px (48 no computador) com o número em mono; uma haste em 90° liga cada nó ao seu módulo. As camadas 01 a 03 são módulos rebaixados; a 04 é grafite com borda em linha forte. Depois dela o trilho desce, dobra em 45° e corre reto até o nó do WhatsApp (48 px, borda e ícone em ciano, brilho de destino), o único ciano do bloco. No computador o título fica preso à esquerda (colunas 1 a 5) e o circuito corre nas colunas 7 a 12.

### Cartão de plano
- **Padrão:** chanfro de 20 px, borda em linha, fundo preto. Nome em mono caixa alta (0.16em), preço cheio riscado em mono de 14 px apagado, preço de fundador em headline (moeda a meio tamanho), legenda em mono, lista com visto de 18 px apagado, prazo como leitura com a cunha e o botão vazado na largura toda.
- **Destaque (Performance):** grafite, borda ciano, selo RECOMENDADO, brilho do destaque, feixe de uma volta ao entrar na tela e botão primário com o ícone do WhatsApp. A lista mostra o valor de mercado de cada item à direita em mono; a conta fecha com o total riscado e o "você paga" em Space Grotesk 600 de 20 px.
- **Disposição:** no computador, três colunas de 1fr, 1.18fr e 1fr, com o Performance no centro, mais alto, e os três botões alinhados embaixo. No celular o Performance vem primeiro, também no HTML. O Plano Contínuo é uma faixa de linha sem botão, não um quarto cartão.

### Acordeão
Linha inteira como alvo (64 px, 72 no computador), pergunta em Space Grotesk 500, botão chanfrado de 36 px (40 no computador) com um "mais" que gira 45° e vira "fechar"; aberto, o botão vira grafite com borda em linha forte. A resposta desliza onde o navegador sabe animar até a altura do conteúdo e abre na hora nos outros. Sem ciano: é leitura calma.

### Depoimento
A frase escolhida em title, com a aspa de abertura pendurada na margem; o texto completo em corpo (1.7) com o mesmo trecho marcado só pelo tom (tinta forte, 500). A autoria leva a cunha em linha forte, ou um retrato de 48 px com chanfro de 8 px quando há foto autorizada. No case, um traço de 1 px sai da ficha, desce ao lado da citação e vira em 90° até a cunha da autora.

### Tela do case
A gravação real do site do cliente (16:10, sem som) vai de ponta a ponta no topo da ficha e herda o chanfro de cima do módulo, sem aparelho desenhado em volta. A capa fica atrás e carrega perto da tela; o vídeo só baixa quando vai tocar. Toca enquanto pelo menos 40% dele aparece, com a aba visível, sem movimento reduzido e sem economia de dados; para ao sair. Um controle de pausar e tocar (44 px, chanfro de 8 px, neutro) aparece no canto de baixo à direita assim que o vídeo começa; quem pausa decide, e o vídeo não volta sozinho.

### Retrato fantasma
No PS, o retrato de quem assina aparece como presença apagada: tons de cinza (contraste 1,25, brilho 0,95), modo de mistura "lighten" para a parte escura da foto sumir no preto, opacidade de 0,22 (0,24 no computador) e máscara radial que dissolve nas bordas. No celular fica atrás do texto, em cima e à direita, encostado na borda da tela; no computador ocupa as colunas 8 a 12 da borda de cima à de baixo da seção. É decorativo: o texto não depende dele.

### Movimento
Três durações (150 ms para toque e ícones, 240 ms para cores e giros, 400 ms para entradas) e uma curva de saída, cubic-bezier(0.16, 1, 0.3, 1). Botões e controles chanfrados descem 1 px ao toque.
- **Feixe:** uma luz em ciano forte percorre a borda chanfrada. Dá uma volta em 3,2 s e para no plano Performance quando ele entra na tela. Corre sem parar (2,4 s por volta) só enquanto o sistema espera uma resposta: no console ao gerar e no formulário do CTA ao enviar; desliga quando a resposta chega.
- **Circuito do Método:** acende uma vez, em dois tempos. Quando o circuito entra na tela, o trilho desce (700 ms), as hastes abrem em escada e um pulso de luz corre de 01 a 04 (1 s), piscando cada nó. Quando o nó do WhatsApp entra na tela, a dobra e a linha se desenham, a luz corre até ele e ele acende (cerca de 1,5 s). Quem chega direto em #metodo já encontra tudo aceso.
- **Headline palavra por palavra:** só a headline do hero, uma vez ao carregar, em CSS puro. Cada palavra sobe 0,35 em, sai de um desfoque de 12 px e acende em 760 ms, 70 ms depois da anterior (cerca de 1,5 s no total). O leitor de tela lê a frase inteira num texto oculto.
- **Névoa:** luz viva em grafite e ciano atrás da grade da primeira dobra, em WebGL, meia resolução e 30 qps; para fora da tela. Quadro parado com movimento reduzido; brilho parado em CSS sem placa de vídeo.
- **Grade cinética:** a grade da primeira dobra é de pontos a cada 32 px; com mouse, os pontos se curvam na direção do cursor (alcance de 130 px), crescem e esquentam para o ciano, e voltam ao lugar quando ele sai. Parada no toque e com movimento reduzido.
- **Brilho de CTA:** nos botões primários e no "Falar no WhatsApp" do topo, uma luz corre a borda chanfrada e uma faixa atravessa o botão: 2 voltas em 4,8 s quando ele aparece, e sem parar só com o mouse em cima ou o foco do teclado, quando acende também uma trama de pontos.
- **Entradas ao rolar:** opacidade, 14 px de subida e desfoque de 6 px em 400 ms, só no que ainda está abaixo da tela e só em blocos de prova e de sequência: na home, o case e o cartão de fundador (§8), as etapas e a conta do Processo (§10) e a lista de objeções (§11).
- **Medidor ligando:** no carregamento, e de novo uma vez quando a janela da Urgência entra na tela.
- **Console:** cada zona nova entra com 6 px de subida e desfoque de 4 px; a headline gerada se digita no lugar.
- **Brilho sob o cursor:** na placa de Benefícios, um círculo de 280 px com 7% de tinta forte segue o mouse na linha sob ele. Neutro, só com ponteiro fino.

### Named Rules
**A Regra do Liga e Para.** Todo efeito roda uma vez e para em menos de 5 s. Só corre sem parar o que mostra espera real (o feixe contínuo e o giro do botão carregando) ou o vídeo do case, que para fora da tela e tem botão de pausa.

## Do's and Don'ts

### Do:
- **Faça** cada módulo com borda de 1 px e chanfro em 45° (8, 12 ou 20 px) por camadas de fundo, para o conteúdo e o foco nunca serem cortados.
- **Faça** um só destaque ciano por bloco; na seção clara, troque para o ciano profundo (#0B7C8C).
- **Faça** a profundidade com os quatro fundos (rebaixado, preto, faixa elevada, grafite) e com a borda subindo de linha para linha forte.
- **Faça** dados em JetBrains Mono com números tabulares: preços, prazos, vagas, números de nó e rótulos da copy.
- **Faça** a cunha em 45° onde caberia um marcador, um asterisco ou um avatar.
- **Faça** o medidor de vagas com os três estados (aceso, zerado, vazado) e todas as variantes de texto no HTML, para a página não pular quando o contador responde.
- **Faça** contraste de pelo menos 4,5:1 no texto e 3:1 nas bordas de campo, nos dois temas; tinta apagada é o degrau mais fraco permitido para texto (6,40:1 no preto, 4,95:1 no grafite).
- **Faça** foco visível em todo controle: contorno de 2 px no ciano a 3 px (4 px nos botões).
- **Faça** área de toque de pelo menos 44 px (botões com 52 px, linhas do acordeão com 64 px).
- **Faça** cada efeito com um estado final parado: com movimento reduzido, o circuito já aparece desenhado e aceso, o medidor já aceso, a headline já inteira, a grade parada, os botões sem brilho correndo, nenhum feixe e o vídeo parado na capa.
- **Faça** erros com ícone e texto, ligados ao campo e anunciados; nunca só a cor.
- **Faça** o que é decorativo invisível para leitor de tela (medidor, retrato fantasma, tela do case, ícones) e mantenha o texto real do título num texto oculto, com as palavras animadas escondidas do leitor de tela.
- **Faça** tudo funcionar sem JavaScript: entradas visíveis, circuito aceso, menu com os links abertos abaixo da barra, formulários com envio por POST.

### Don't:
- **Não use** raio de borda, pílula ou cantos arredondados em nada, nem na caixa de consentimento.
- **Não use** ciano elétrico como texto, traço fino ou borda sobre fundo claro.
- **Não ponha** dois destaques ciano no mesmo bloco; o medidor de vagas aceso é leitura, não segundo destaque, e nenhuma outra peça ganha essa exceção.
- **Não ponha** sombra cinza embaixo de módulo; a única luz é o halo do ciano, e a única sombra escura é a do painel do menu.
- **Não monte** fileiras de cartões iguais nem hero centralizado sobre elas; listas viram registro, placa, trilho ou circuito.
- **Não use** mono para frase de argumento, nem invente rótulo técnico onde a copy não tem.
- **Não deixe** nada em laço sem motivo: efeito sem espera real roda uma vez e para.
- **Não anime** entrada fora dos blocos de prova e de sequência, nem esconda o que já está na tela ao carregar.
- **Não anime** outro texto palavra por palavra além da headline do hero.
- **Não desenhe** aparelho em volta da tela do case nem avatar falso no depoimento.
- **Não aplique** efeito no logo: só tamanho.
- **Não use** curva ou ângulo fora de 0°, 45° e 90° em traço, corte ou ícone.
- **Não use** fonte abaixo de 16 px em campos de formulário.
