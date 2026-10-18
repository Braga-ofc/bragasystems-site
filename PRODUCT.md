# Product

<!-- impeccable:product-schema 1 -->

Fonte: documentos de contexto confirmados com o Gustavo no repositório `Braga-ofc/BRAGASYSTEMS` (`docs/contexto/prd.md`, `rules.md`, `design-system/`, `site/COPY-OFICIAL-SITE.md`). Este arquivo resume esses fatos para o trabalho de interface; em caso de conflito, valem os documentos de origem.

## Platform

web

## Users

Donos de negócio que vendem serviço de alto valor e fecham pelo WhatsApp: clínicas, consultórios, estúdios, especialistas, consultores e prestadores de serviço. Chegam quase sempre pelo celular, vindos do Instagram (@braga.systems), do Facebook (Braga Systems), de indicação, do rodapé de sites de clientes (como a EBEN Creative Studio) e, mais tarde, do Google. O problema deles: recebem "quanto custa?" de quem não entende o valor e some depois do preço.

## Product Purpose

Site oficial da BRAGA SYSTEMS, estúdio de desenvolvimento web de Gustavo Braga, em Brasília. O site faz a pré-venda e entrega o visitante no WhatsApp pronto para fechar. Ele é, ao mesmo tempo, a vitrine e a prova do Método Pré-Venda: se for lento, confuso ou genérico, trabalha contra a marca. Sucesso: conversas no WhatsApp e leads vindos do site, nenhum lead sem resposta por mais de um dia útil e nota 90+ no PageSpeed no celular.

## Positioning

Uma pessoa só, do briefing à publicação: o cliente fala direto com quem desenvolve. Toda página segue o Método Pré-Venda, com copy de conversão inclusa em todos os planos e um único caminho até o WhatsApp. Preços abertos na página.

## Operating Context

O visitante lê no celular, entre um atendimento e outro, e decide se chama no WhatsApp. Ele pode testar o método na hora num gerador de headline com IA. O Gustavo acompanha os leads por e-mail (bragasystemsofc@gmail.com) e pelo Supabase.

## Capabilities and Constraints

- Planos: Essencial (R$ 1.497), Performance (R$ 2.497, recomendado), Signature (a partir de R$ 4.497) e Contínuo (R$ 147/mês). 25% de desconto para as 5 primeiras empresas (fundadoras), com contador de vagas ao vivo.
- Gerador de headline com IA (3 por pessoa a cada 24 h), formulário curto, botões de WhatsApp com mensagem própria por origem.
- Astro, CSS puro, sem React; JavaScript só onde há interação; 90+ no PageSpeed no celular.
- Fora do escopo por enquanto: blog, área de cliente, pagamento no site, chatbot.

## Brand Commitments

- Nome BRAGA SYSTEMS, com S no final. "Braga" é inegociável.
- Identidade escura, tech, premium e moderna, com um único ponto de luz em ciano. Cores, fontes (Space Grotesk, Inter, JetBrains Mono), símbolo B com cortes em 45° e regras de uso definidos no manual de identidade (`design-system/`). Ângulos de 0°, 45° e 90°, cantos chanfrados, espessura de traço única, um só destaque ciano por bloco.
- Ciano elétrico nunca como texto sobre fundo claro; lá vale o ciano profundo.
- Os rótulos técnicos (JetBrains Mono, caixa alta) fazem parte da copy aprovada.
- Tom de voz: direto, confiante e técnico sem ser frio. Frases curtas, foco no resultado do cliente.

## Evidence on Hand

- Case EBEN Creative Studio, com depoimento autorizado da Geovana Silva (CEO), em `clientes/eben/` do repositório da marca.
- Copy oficial completa (versão 2.2).
- Logo e símbolo em SVG; foto profissional do Gustavo ainda pendente.
- Não existem números de anos, projetos ou clientes: nada disso pode ser inventado.

## Product Principles

1. Celular primeiro: tudo é desenhado e testado em 390 px.
2. WhatsApp sempre a um toque.
3. Rápido de verdade: o site é a vitrine do serviço.
4. Nenhuma promessa que o site não cumpre.
5. Texto separado do código; a copy oficial é a fonte única.

## Accessibility & Inclusion

Contraste de pelo menos 4,5:1 no texto, foco visível em todo controle, área de toque de 44 px, formulários com rótulos e erros anunciados, tudo funcionando com `prefers-reduced-motion`. Meta de 95+ em acessibilidade no Lighthouse.
