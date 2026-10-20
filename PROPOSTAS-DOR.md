# Seção Dor: propostas completas (19/10/2026)

Nada disto está no site. O Gustavo escolhe uma copy e uma animação.

## Copy: duas opções finais do juiz

### Opção 1: Fora do expediente (recomendada)

**Cena:** Dez da noite. O último atendimento acabou, e o celular tem três mensagens: "quanto custa?". Você explica tudo com calma e manda o valor. Dois visualizam. Um diz que vai pensar. Ninguém volta.

**Título:** Seu expediente acaba. A dúvida do cliente, não.

**Lista:**
- As mesmas perguntas chegam todo dia, e cada resposta começa do zero.
- O perfil mostra o trabalho, mas não explica o que você entrega.
- O preço parece caro porque ninguém mostrou o valor antes.
- O concorrente mais barato fecha porque parece mais profissional.
- O investimento em anúncio cai num lugar que não convence.
- Quando você para de atender, a venda para junto.

**Virada:** O pior não é perder o cliente. É começar a duvidar do seu próprio preço.

**Fechamento:** Seu serviço é bom. Só falta uma página que trabalhe enquanto você descansa.

_Por que funciona:_ É o avesso exato de "Venda enquanto dorme.": a cena aprovada fica mais curta, o título empresarial dá nome ao problema, a lista termina em "a venda para junto", a virada aprovada segura a emoção e "trabalhe" leva direto ao "construídos para trabalhar" da §5.

### Opção 2: A venda depende de você

**Cena:** Você passa o dia entregando o serviço. Entre um atendimento e outro, responde "quanto custa?", explica o que faz e defende o valor, uma conversa por vez. Muitas terminam no preço.

**Título:** A sua venda depende só de você?

**Lista:**
- Seu tempo, o mais caro da empresa, vai para as mesmas perguntas.
- Sua empresa entrega mais do que a imagem dela mostra.
- O preço parece caro porque ninguém mostrou o valor antes.
- Seu portfólio está espalhado em posts, fotos e conversas antigas.
- Fora do expediente, as mensagens esperam e o cliente esfria.
- O investimento em anúncio cai num lugar que não convence.

**Virada:** O pior não é perder um cliente. É começar a dar desconto para não perder o próximo.

**Fechamento:** Seu serviço é bom. Só falta uma página que venda quando você não está.

_Por que funciona:_ É a versão mais empresarial e não tem nenhum número. Trata a venda como um processo que hoje depende do dono. O portfólio espalhado e o "fora do expediente" repetem a subheadline, o desconto prepara o "Quem entende o valor não pede desconto" da §7, e "uma página que venda" bate de frente com "a maioria dos sites só é bonita" da §5.

### Notas do juiz

Recomendo a opção 1, "Fora do expediente" (a primeira da lista; conto a partir de 1). Ela muda menos o que o Gustavo já aprovou (a cena e a virada continuam), fica mais empresarial e é a que melhor espelha a headline. Se ele quiser mais tom de empresa, a virada do desconto da opção 2 também funciona dentro da opção 1.

Como avaliei as três propostas:
- Proposta 1 (a noite). O melhor título e o melhor fechamento, e foram para a opção 1. Problemas:
  - A cena se contradiz: a pessoa deixa a resposta para amanhã, ou seja, foi dormir, e a virada diz que ela "perdeu o sono".
  - Os itens foram forçados para a noite e ficaram repetitivos ("o anúncio roda de madrugada", "no cansaço, o preço sai...").
  - A virada aprovada, que era a frase mais forte, saiu.
- Proposta 2 (gestão). A mais empresarial: o título, os itens e a virada do desconto formam a base da opção 2. Problemas:
  - A cena é longa e fria ("não aparece em relatório nenhum").
  - A cena termina dizendo o mesmo que o título logo abaixo.
  - O fechamento vem com **...**, mas o Dor.astro mostra virada e fechamento como texto simples, sem passar pelo rich(). Os asteriscos apareceriam na tela.
- Proposta 3 (espelho). O melhor ritmo de cena e a melhor linha da lista ("Quando você para de atender, a venda para junto."), que foi para a opção 1. Problemas:
  - Quatro itens começam com "Você".
  - O título de contagem soa menos empresarial.
  - O fechamento tem três frases, longo demais para o tamanho do h2 com 30ch no celular, e "E enquanto você dorme" repete a headline ao pé da letra.

Conferência das regras nas duas opções:
- Nenhuma frase promete resultado. A única promessa (uma página que trabalha ou vende fora do horário) é a mesma da headline e da subheadline aprovadas.
- Não há depoimento nem nada sobre clientes reais: as cenas estão na segunda pessoa e são hipotéticas.
- O "site parado" saiu da lista, porque a §5 abre com essa ideia.
- A cena da opção 1 usa "dez da noite", "três", "dois" e "um", que já estavam na cena aprovada da 2.4. São detalhes da narrativa, não resultados. Se o Gustavo ler "nada de números" ao pé da letra, a opção 2 não tem nenhum.

Notas para a implementação, depois da aprovação:
- Cada cena tem uma única fala entre aspas ("quanto custa?"), que o Dor.astro já destaca sem mudar código.
- As duas listas têm 6 itens, que fecham as duas colunas de 3.
- No home.ts o fechamento entra sem **. O negrito fica só no COPY-OFICIAL-SITE.md, como já é feito hoje.
- O que muda: o objeto dor em src/content/home.ts e a §4 da copy (vira a versão 2.7, com changelog), mais uma entrada no memory.md.

Nenhum arquivo foi alterado. Não conferi no navegador como os textos quebram. Risco conhecido: o título da opção 1 tem 47 caracteres e deve ocupar 3 linhas no h1 com 18ch (o atual ocupa 2); a virada da opção 2 deve ocupar umas 4 linhas no celular.

## Animação: dois conceitos

**Proposta de movimento para a seção Dor: dois conceitos**

Os dois conceitos dependem só da estrutura da seção (cena, título, lista, virada, fechamento), não do texto exato. Por isso servem para a copy nova que o Gustavo ainda vai aprovar. Nos dois:
- **Estado final:** é o visual de hoje, exatamente.
- **Estado inicial:** usa no mínimo `--ink-muted` (#8A96A6 sobre o preto, cerca de 6,5:1). O texto nunca some, desfoca nem muda de tamanho.
- **Ciano:** continua só na cunha do fechamento.
- **Rolagem:** como o movimento segue a rolagem, ele para quando o visitante para. Isso respeita a Regra do Liga e Para.

---

### Conceito 1: "Registro que se escreve"
A lista é um registro de ocorrências, e a rolagem é a caneta.

**Celular (390 px), conforme rola**
1. **Cena:** quando chega ao meio da tela, a fala do cliente passa de `--ink` para `--ink-strong`.
2. **Lista:** uma linha por vez, na ordem de leitura:
   - a divisória de 1 px se desenha da esquerda, com o começo em 45°;
   - o texto vai de `ink-muted` para `ink`;
   - a cunha vai de `--line` para `ink-muted`.
3. **Virada:** acima dela se desenha a divisória cortada em 45°, como a linha de total do registro, e o texto vai para `ink-strong`.
4. **Fechamento:** ao passar de 55% da tela, a cunha apagada dá lugar à acesa (troca por opacidade entre duas camadas). Junto com a seta do núcleo, ela aponta para a Proposta.

**Computador (1440 px):** o mesmo, com a ordem pelo índice e não pela posição. Desce 1-2-3 na coluna da esquerda e depois 4-5-6 na da direita. O fechamento fica na coluna da direita, na diagonal que o layout já tem.

**Mouse e toque**
- **Mouse** (só ponteiro fino): a linha sob o cursor puxa a cunha 4 px e ela acende em tinta forte, em 150 ms.
- **Implementação do hover:** usa as propriedades `translate` e `color` da cunha, que a rolagem não anima. Assim, a animação de rolagem não atropela o hover.
- **Toque:** fica só com a rolagem e a luz do cursor que já existe.

**Movimento reduzido:** tudo no estado final; o hover só muda a cor, sem deslocar.

**Técnica**
- CSS puro: `view-timeline: --registro` na `ul`, e cada `li` com `--i` e `animation-range: cover calc(15% + var(--i)*8%) cover calc(23% + var(--i)*8%)`.
- Tudo dentro de `@supports (animation-timeline: view())` e `prefers-reduced-motion: no-preference`.
- A `border-top` vira um pseudo-elemento de 1 px com `scaleX`, mantendo a mesma altura (CLS 0).
- Sem suporte (Firefox, até onde sei ainda atrás de flag; Safari anterior ao 26), fica o estado final parado. Não precisa de JavaScript.

**Desempenho:** 0 KB de JavaScript e cerca de 1 KB de CSS. `transform` e `opacity` rodam no compositor; a cor muda em uns 8 elementos, um custo desprezível.

**Riscos de acessibilidade**
- Quem para no meio vê metade da lista em `muted`. Isso não pode parecer item desativado: nada de risco no texto, nada abaixo de 4,5:1.
- O leitor de tela lê tudo como hoje (`role=list` mantido).
- Risco de identidade: não criar um trilho vertical, para não repetir o gesto do circuito do Método.

---

### Conceito 2: "Dez da noite"
A seção escurece com a cena, a virada é o ponto mais escuro e o fechamento acende a luz antes da Proposta branca. É a outra metade de "Venda enquanto dorme".

**Celular (390 px), conforme rola**
1. **Entrada:** um véu da própria seção (preto de 0 a 35%), atrás do conteúdo, apaga as manchas do fundo vivo. Anoitece; o texto não é coberto.
2. **Cena:** a fala do cliente acende para `ink-strong` no meio da tela.
3. **Lista:** cada item acende quando passa pela faixa central (texto `ink-strong`, cunha forte, 4 px para a direita) e volta para `ink` ao subir. São mensagens vistas e deixadas sem resposta. Antes e depois da faixa, o visual é o de hoje.
4. **Virada:** palavra por palavra, de `muted` para `strong`, entre 75% e 45% da tela. O véu chega a 40%, o ponto mais escuro.
5. **Fechamento:** ao passar de 60%, a cunha acende em ciano (troca por opacidade), e o véu se levanta até zero antes de chegar o branco da Proposta. Não há clarão, porque a luz volta antes do branco.

**Computador (1440 px):** o mesmo véu na seção inteira. A lista usa a ordem pelo índice, como no Conceito 1, para não acender os itens 1 e 4 juntos. Virada à esquerda e fechamento à direita: a luz anda na diagonal.

**Mouse e toque:** dentro da Dor, a luz do cursor passa de ciano para neutra (tinta forte a 6%), como a luz do celular no escuro. Assim o único ciano do bloco fica no fechamento. A mesma luz já funciona com o dedo. Não há hover nos itens.

**Movimento reduzido:** sem véu, itens em `ink`, virada inteira em `strong` e cunha acesa. A luz do cursor já fica desligada nesse caso.

**Técnica**
- **Véu:** `.dor::before` em posição absoluta, com `animation-timeline: view()` e keyframes por fase (`entry 0%` a 0, `entry 100%` a 0,35, `exit 0%` a 0,35, `exit 60%` a 0).
- **Virada:** dividida em `<span>` inline no Astro, com `view-timeline: --virada` no parágrafo e `--i` em cada palavra.
- **Luz neutra:** cerca de 3 linhas no `camada-viva.ts` (um atributo `data-neutra` como o `data-claro`, ligado na seção `dor`).
- **Sem suporte:** o mesmo fallback parado do Conceito 1.

**Desempenho:** a única camada grande é o véu, só com opacidade e no compositor. A cor muda em umas 15 palavras e 6 itens. O JavaScript existente ganha só o atributo, sem trabalho novo por quadro.

**Riscos de acessibilidade**
- O véu precisa ficar abaixo do texto e do anel de foco; se ficar por cima, derruba o contraste.
- Os spans das palavras precisam continuar inline. `inline-block` pode fazer o VoiceOver do iOS ler palavra por palavra.
- O escurecimento pode parecer "carregando" se passar de 40%.
- No alto contraste do Windows, o véu precisa de `display: none`.

---

**Minha recomendação: Conceito 2.** Ele conta a cena e fecha o arco da nova headline (noite, depois a luz). O Conceito 1 é o plano B se a copy nova tirar a cena noturna.

Não editei, não publiquei e não fiz commit de nada, e não li o `docs/referencias.md` da marca. Também não confirmei o suporte atual do Firefox a `animation-timeline` nem medi o Lighthouse com o véu; isso fica para o teste no link do Cloudflare.

## Anexo: as três propostas originais dos redatores

### Redator 1: A NOITE: a dor acontece fora do expediente, que é o momento exato em que a headline promete vender. A mensagem chega à noite, você está exausto, a resposta fica para amanhã e o cliente esfria no escuro. A seção é o avesso de "Venda enquanto dorme.": hoje, quando você dorme, a venda para.

**Cena:** Onze da noite. A agenda fechou, o celular não: "Oi, quanto custa?". Você está exausto e deixa para amanhã. De manhã, responde com todo o cuidado. Ele visualiza e não volta.

**Título:** Seu expediente acaba. A dúvida do cliente, não.

**Lista:**
- Você atende o dia inteiro e ainda responde mensagem até tarde.
- As mesmas perguntas, explicadas do zero, noite após noite.
- A resposta só sai de manhã, quando o cliente já esfriou.
- No cansaço, o preço sai antes do valor e parece caro.
- Quem procura você à noite encontra um perfil que não explica o que você entrega.
- O anúncio roda de madrugada e leva gente para um lugar que não convence.

**Virada:** O pior não é perder o sono. É perder o sono e, mesmo assim, perder o cliente.

**Fechamento:** Seu serviço é bom. Só falta uma página que trabalhe enquanto você descansa.

_Nota:_ Cena: mantive o formato aprovado na copy 2.4 (hora da noite, uma fala do cliente entre aspas, o silêncio no fim) e cortei para cinco frases curtas. Ela continua com uma única fala entre aspas, "Oi, quanto custa?", porque o Dor.astro destaca o primeiro trecho entre aspas (classe dor__fala), e a fala repete a dor que está no prd. "A agenda fechou, o celular não" junta o cansaço e o fora do expediente em poucas palavras. Título: o "Isso já aconteceu com você?" vira uma afirmação mais empresarial. Ela nomeia o problema na lógica da headline: o expediente tem hora para acabar, a dúvida do cliente não. A lista aparece logo abaixo como as consequências. Lista: são 6 itens, um número par, para as duas colunas do componente fecharem certas. Cada item passou para a noite ou para o cansaço: o expediente que vira noite (exaustão), as perguntas repetidas, o cliente que esfria até de manhã, o preço mandado com pressa e antes do valor, o perfil que não explica, o anúncio que roda de madrugada. Duas coisas saíram de propósito. O "site parado" saiu porque a §5 abre justamente com "Fica no ar, ninguém lê e nada acontece", e repetir enfraqueceria a ponte. O "concorrente mais barato" saiu porque não cabe no ângulo da noite e já está embutido no cliente que esfria. Virada: "perder o sono" espelha o "dorme" da headline, e a dor dobra: o esforço e a perda juntos. Ela troca o "duvidar do próprio preço", que era a virada boa do ângulo do preço, mas nesta versão o preço já aparece no item 4. Fechamento: guarda o ritmo "Seu serviço é bom. Só falta..." que ele já aprovou, e termina em "trabalhe", que a §5 contrasta logo em seguida ("A maioria dos sites só é bonita... nada acontece" / "os da BRAGA SYSTEMS são construídos para trabalhar"). Sem números, resultados, depoimentos nem casos de cliente: a cena é na segunda pessoa e hipotética, e a única promessa (uma página que trabalha fora do horário) é a mesma da subheadline aprovada. Nenhum arquivo foi alterado: fica para o Gustavo aprovar, e se ele aprovar, só o objeto dor de src/content/home.ts e a §4 de site/COPY-OFICIAL-SITE.md mudam, com entrada no changelog e no memory.md. Não conferi: como o texto quebra na tela, nem se "Onze da noite" esbarra na regra de "nada de números". Tratei como detalhe da cena, como o "dez da noite" que já estava aprovado.

### Redator 2: Ângulo 2, o dono de negócio que gere uma empresa. O texto trata a venda como um processo que hoje depende do dono e não roda sem ele. Isso é o oposto da promessa do hero ("Venda enquanto dorme."). O custo aparece como custo de oportunidade: o tempo do dono preso em explicar a mesma coisa, a imagem da empresa abaixo do serviço que ela entrega, o preço que parece caro porque o valor não foi mostrado e o desconto que vem depois. Tem menos melodrama que a versão 2.4 e nenhum número inventado.

**Cena:** Você passa o dia entregando o serviço. Entre um atendimento e outro, responde "quanto custa?", explica o que faz e defende o preço, uma conversa por vez. Esse trabalho não aparece em relatório nenhum, mas toma o tempo que deveria ir para a empresa. E a venda só acontece enquanto você está disponível.

**Título:** A sua venda depende só de você?

**Lista:**
- Seu tempo, o mais caro da empresa, vai para responder as mesmas perguntas.
- Sua empresa entrega mais do que a imagem dela mostra.
- O preço parece caro porque ninguém apresentou o valor antes dele.
- O seu portfólio está espalhado em posts, fotos e conversas antigas.
- Fora do expediente, as mensagens esperam e o interesse do cliente esfria.
- O investimento em anúncio leva o cliente a um lugar que não convence.

**Virada:** O pior não é perder um cliente. É começar a dar desconto para não perder o próximo.

**Fechamento:** **Seu serviço já é bom. Falta uma página que venda quando você não está.**

_Nota:_ Ligação com o hero: a cena termina em "a venda só acontece enquanto você está disponível", que é o contrário de "Venda enquanto dorme.". O fechamento traz a promessa de volta, com outras palavras, depois da dor. A cena saiu das dez da noite e foi para o dia de trabalho: "esse trabalho não aparece em relatório nenhum, mas toma o tempo que deveria ir para a empresa" troca o melodrama pela linguagem de gestão. A frase "quanto custa?" continua entre aspas de propósito, porque o Dor.astro destaca em cor forte o primeiro trecho entre aspas da abertura, e assim o efeito atual continua funcionando sem mudar código.

Título: em vez de "Isso já aconteceu com você?", entra uma pergunta de diagnóstico, e os seis itens viram sinais que respondem "sim". Cada item vem do pedido ou de um texto já aprovado. O tempo do dono vira "Você para de repetir explicação" na §7. A imagem abaixo do serviço vira "Você parece do tamanho que quer ser" na §7. O preço sem valor mostrado vira "Seu preço deixa de parecer caro" na §7. O portfólio espalhado bate com o "organizam o seu portfólio" da subheadline. O "fora do expediente" bate com o "fora do expediente" da subheadline. O anúncio vira "Seu anúncio rende mais" na §7 e "Caro é pagar anúncio..." na §11. Saíram o "cinco perguntas", que era um número, e o "concorrente mais barato", que já está coberto pelo item da imagem. Com seis itens, a grade continua em 3 + 3 colunas no computador: na primeira ficam os itens de dentro da empresa (tempo, imagem, preço) e na segunda os canais (portfólio, expediente, anúncio).

Virada: mantém a estrutura da frase que o Gustavo aprovou na 2.4 ("O pior não é perder... É começar a..."). A dúvida sobre o próprio preço virou o que ela causa na prática, o desconto. Isso prepara o "Quem entende o valor não pede desconto." da §7.

Fechamento: mantém o começo aprovado ("Seu serviço é bom") e termina em "uma página que venda". Isso faz a ponte direta com a §5, que abre com "A maioria dos sites só é bonita. Fica no ar, ninguém lê e nada acontece.": a dor pede uma página que venda, e a seção seguinte explica por que a maioria não vende.

Regras: não há números, resultados, depoimentos nem promessas além das que o site já faz. Também não há nada inventado sobre clientes, e a marca não é citada. Não mexi em nenhum arquivo (nem na COPY-OFICIAL-SITE.md, nem no home.ts, nem no memory.md), porque o Gustavo aprova antes de entrar. Não conferi no navegador como o título de 31 caracteres quebra com 18ch, mas deve dar 2 linhas, como o atual.

### Redator 3: Ângulo 3: o espelho. Frases em segunda pessoa, no ritmo de uma lista de checagem, para o leitor se reconhecer em cada linha. A última linha é o contrário de "Venda enquanto dorme." e prepara a virada.

**Cena:** Dez da noite. O último atendimento acabou, e o celular tem três mensagens: "quanto custa?". Você explica tudo, com calma, e manda o valor. Dois visualizam. Um vai pensar. Ninguém volta.

**Título:** Quantas destas são da sua rotina?

**Lista:**
- Você responde as mesmas perguntas todos os dias, uma por uma.
- Seu perfil mostra o trabalho, mas não explica o que você entrega.
- Você manda o preço antes de conseguir mostrar o valor.
- Você perde para um concorrente mais barato que só parece mais profissional.
- Você investe em anúncio, e o clique cai num lugar que não convence.
- Quando você para de atender, a venda para junto.

**Virada:** O pior não é perder o cliente. É começar a duvidar do seu próprio preço.

**Fechamento:** Seu preço não é o problema. Falta uma página mostrando o valor dele enquanto você atende. E enquanto você dorme.

_Nota:_ Cena: ficou mais curta e mais seca que a atual, com frases de duas a quatro palavras no fim para dar ritmo. A fala entre aspas ("quanto custa?") continua, porque o Dor.astro só dá cor forte ao texto que está entre aspas. Os números da cena (dez da noite, três mensagens) já estavam na copy aprovada e não são resultado nem promessa.

Título: troca a pergunta de sim ou não ("Isso já aconteceu com você?") por uma de contagem. Assim o leitor vai marcando as linhas como numa lista de checagem. "Rotina" também prepara o título da §7, "O que muda no seu dia a dia".

Itens: são seis, que fecham as duas colunas de três do componente. Todos estão na segunda pessoa e em paralelo ("Você...", "Seu..."). Cada um corresponde a algo que o site entrega de fato:
- as perguntas repetidas são respondidas pela copy;
- o perfil que não explica é a objeção do Instagram;
- o preço antes do valor e o concorrente que parece mais profissional são resolvidos pelo design que justifica o preço;
- o anúncio que não convence é tratado no Plano Performance e na objeção "Mas tá caro...".

Saiu o item do site parado: a §5 abre exatamente com essa ideia ("A maioria dos sites só é bonita..."), e repetir enfraqueceria a ponte. No lugar entrou "Quando você para de atender, a venda para junto.", o espelho da headline e a linha mais forte para fechar a lista antes da virada.

Virada: mantida palavra por palavra, porque é aprovada e é a frase mais forte da seção.

Fechamento: transforma a dúvida sobre o preço em esperança ("Seu preço não é o problema") e mostra o que falta, uma página que mostra o valor. "E enquanto você dorme" repete a headline. A §5 entra logo depois como contraste: não basta qualquer site, porque a maioria "só é bonita".

Não usei números de resultado, depoimentos nem promessas novas. Para entrar no site, falta a aprovação do Gustavo. Depois dela, é preciso atualizar a §4 da copy (vira a versão 2.7, com changelog) e o objeto dor em src/content/home.ts. Não mexi em nenhum arquivo.

Não conferi no navegador como o título de duas linhas e o item 4, o mais longo, ficam no celular.
