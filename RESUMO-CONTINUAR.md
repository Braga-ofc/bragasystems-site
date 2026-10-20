# BRAGA SYSTEMS: resumo para continuar no terminal (19/10/2026)

## Objetivo
Site oficial da BRAGA SYSTEMS (Astro 7 + Cloudflare Workers, CSS puro, sem React). Ele faz a pré-venda e leva o visitante ao WhatsApp. A home está no link de teste:
https://bragasystems-site.gubragah-oficiaal.workers.dev

A frente atual é a seção **Dor**. Depois dela vêm as demais seções da home, uma por vez, e para cada uma:
- personalizar a copy;
- animar;
- integrar ao fundo vivo.

## Repositórios (GitHub)
- **Site:** `Braga-ofc/bragasystems-site`. Até o lançamento, os commits vão direto para a `main`, que aparece no link de teste. Branch de sessão: `ccr-72deea9b-k8yw2m`.
- **Marca:** `Braga-ofc/BRAGASYSTEMS`. Fica em `docs/contexto/` (prd, architecture, rules, design, task, memory), além de `docs/referencias.md`, `site/COPY-OFICIAL-SITE.md` (versão 2.6) e `site/mapa-tecnico/`.

## Regras que valem
- Leia o CLAUDE.md dos dois repositórios e `docs/contexto/` antes de mexer.
- **Só altere e só publique quando o Gustavo mandar.** Se precisar de uma escolha dele, deixe para o fim, numa lista só, sem interromper o trabalho.
- Uma tarefa por vez. Antes de cada uma, diga o que entra, o que sai e como testar.
- Toda decisão importante vai para `docs/contexto/memory.md`.
- Texto só da copy oficial. Copy nova é proposta, aprovada pelo Gustavo e registrada como nova versão da copy oficial, com changelog.
- Todo trabalho de interface passa pela skill `/impeccable` e segue o `docs/referencias.md`.
- Nenhuma chave ou senha no código, no GitHub ou no chat. Só variáveis `PUBLIC_` vão para o navegador.
- Identidade "Painel":
  - fundo escuro #0B0F14 e um só destaque ciano por bloco;
  - cantos chanfrados em 45°;
  - fontes Space Grotesk, Inter e JetBrains Mono.
- Limites técnicos:
  - movimento reduzido sempre respeitado;
  - CLS 0 (nada de animar o layout);
  - loops pausam fora da tela;
  - PageSpeed de 90+ como meta (o ambiente atual está mais lento, então compare versões lado a lado).
- Commits em português, assinados como Braga-ofc.

## Decisões tomadas (detalhes no memory.md)
- **Copy 2.6 do hero:**
  - headline "Venda enquanto dorme.";
  - subheadline empresarial ("páginas estratégicas, com copy de conversão… 24 horas por dia…");
  - um botão só, "Ver projetos", que leva ao portfólio. A origem `hero` do WhatsApp ficou sem uso, e o WhatsApp segue no topo.
- **Efeitos:** sem limite de quantidade. A regra agora é de qualidade: leve, CLS 0 e um ciano por bloco.
- **Animações contínuas aceitas:** o risco do WCAG 2.2.2 (sem botão de pausa) foi aceito por enquanto. Também ficaram como estão a digitação de cerca de 8 s e o neon completo do topo.
- **Camada viva do site inteiro:**
  - o núcleo do B desce com a rolagem e muda de forma por seção;
  - uma luz fraca segue o cursor;
  - o fundo é contínuo e sempre em movimento, branco nas seções claras.
- **Novas seções:** o Claude propõe a copy e o Gustavo aprova, uma seção por vez.

## O que já foi feito (tudo publicado na main)
- **Hero, aprovado pelo Gustavo:**
  - névoa em WebGL, com foto parada quando não há placa de vídeo;
  - grade de pontos cinética;
  - headline letra por letra;
  - explicação digitada;
  - selo com luz no contorno e "25% off" piscando entre vermelho e prata;
  - gerador com entrada e loops;
  - WhatsApp do topo com neon contínuo, aurora e degradê;
  - "Ver projetos" na variante `vitrine`.
- **Botões:** brilho (Shiny) em todo primário e em todo link de WhatsApp. Os secundários de navegação têm os cantos que se fecham no hover.
- **Revisão adversarial:** 14 achados confirmados e corrigidos.
- **Camada viva:** `CamadaViva` mais `camada-viva.ts`. As seções escuras ficaram transparentes, e as claras (Proposta e Garantia) ganharam fundo branco vivo.

## O que falta
1. **Seção Dor (em andamento):** o Gustavo precisa escolher a copy e a animação.
   - **Copy A, "Fora do expediente" (recomendada):** cena "Dez da noite…" mais curta. Título "Seu expediente acaba. A dúvida do cliente, não.". A lista termina em "Quando você para de atender, a venda para junto.". A virada continua a aprovada. Fechamento: "Seu serviço é bom. Só falta uma página que trabalhe enquanto você descansa."
   - **Copy B, "A venda depende de você":** sem números. Título "A sua venda depende só de você?". Virada sobre dar desconto. Fechamento: "…Só falta uma página que venda quando você não está."
   - **Animação 1, "Dez da noite" (recomendada):** a seção escurece com a rolagem, os itens acendem na faixa central, a virada acende palavra por palavra e a luz volta em ciano no fechamento. A luz do cursor fica neutra nesta seção.
   - **Animação 2, "Registro que se escreve":** as linhas da lista se desenham conforme a rolagem e o marcador acende no hover.
   - O texto completo das duas copies e dos dois conceitos está no resultado do workflow `dor-propostas` (nesta sessão).
   - Depois da escolha:
     - copy oficial vira 2.7 e o `memory.md` registra a decisão;
     - implementar em `src/content/home.ts` (objeto `dor`) e `src/components/sections/Dor.astro`;
     - testar em 390 e 1440 px, com movimento reduzido e no Lighthouse lado a lado;
     - publicar só com o "pode publicar".
2. **Depois, as demais seções**, no mesmo processo: Proposta, Método, Benefícios, Projetos, Planos, Processo, Objeções, Garantia, Sobre, Urgência, Dúvidas, CTA final e PS.
3. **Escolhas pendentes do Gustavo:**
   - botão de pausar as animações (WCAG 2.2.2);
   - velocidade da digitação;
   - aliviar o neon do topo no celular.
4. **Próxima tarefa do `task.md`, depois da home:** gerador de headline com IA, com limite diário e Turnstile. Precisa de conta na Anthropic e no Turnstile da Cloudflare, e as chaves entram só como Secret no Cloudflare.

## Arquivos principais (site)
- **Páginas e layout:** `src/pages/index.astro` (dobra, névoa e grade) e `src/layouts/Base.astro`, que monta a CamadaViva, o Topo e o Rodapé.
- **Seções:** `src/components/sections/*.astro`. Hero, Gerador, Dor e Topo são as mais mexidas.
- **Componentes:** `src/components/ui/`:
  - `Botao.astro`: variantes `primario`, `secundario` e `vitrine`; props `brilho` e `sempre`;
  - `Selo.astro`;
  - `Secao.astro`: temas `escuro`, `elevado` e `claro`;
  - `CamadaViva.astro`.
- **Scripts:** `src/scripts/`: `nevoa.ts`, `grade-cinetica.ts`, `camada-viva.ts`, `brilho.ts`, `contador.ts` e `gerador.ts`.
- **Textos:** `src/content/home.ts` e `planos.ts`.
- **Estilos:** `src/styles/tokens.css` e `global.css`.
- **Imagens:** `public/nevoa/`, com as fotos da névoa para aparelhos sem placa de vídeo.
- **Design:** `DESIGN.md`, `.impeccable/design.json` e `.impeccable/surfaces/src-pages-index-astro.md`.

## Como testar localmente
```
cd bragasystems-site
npm install
npx astro check
npm run build
npx astro preview --port 4321
```
A simulação de vagas funciona com `?vagas=0..5` ou `?vagas=falha`, só em localhost e em `*.workers.dev`.

---

## Onde paramos (19/10/2026, ~20h)

**No ar no link de teste:**
- `5ba2224`: foto do hero em quadro chanfrado, com luz no contorno e a cabeça passando por cima.
- `987560e`: Sobre logo depois da Dor, com a copy 2.8 e o fundo #E0ECFF.
- Antes disso: Dor, linha do site, Lenis, grade leve e abertura sem travar.

**Repositório da marca (BRAGASYSTEMS):** copy 2.8 e `memory.md` atualizados até o Sobre (`e94705e`). O quadro do hero ainda não foi registrado; só depois da aprovação.

**Estrutura aprovada (11 seções):** Hero (com foto) → Gerador → Dor → Sobre (claro) → Proposta + Benefícios → Método → Projetos (claro) → Planos → Como funciona + Garantia (claro) → Dúvidas (com as Objeções) → CTA final (com Urgência e PS).

**Esperando o Gustavo:**
1. Aprovar o quadro do hero, com a cabeça passando por cima do contorno.
2. Escolher a copy da Proposta + Benefícios:
   - **Opção 1 (recomendada):** título "A maioria dos sites só é bonita. Os meus trabalham.", frase sobre a página que explica, mostra o valor e responde as dúvidas, e 4 benefícios: repetir explicação, preço caro, não escrever nada, anúncio.
   - **Opção 2:** título "O cliente chega sabendo o que quer.", com os mesmos 4 benefícios.
3. Dizer o que quer mudar na página `/quem-sou`.

**Regras novas desta sessão:**
- Todos os testes e o build rodam antes de todo commit.
- Fundo claro em #E0ECFF, com `--accent` #096A78.
- Python: use o 3.12 (`pythoncore-3.12-64`). O `python` do PATH é o 3.15 de teste.

**Recursos no computador:**
- O rembg está instalado no Python 3.12.
- O recorte da foto está em `src/assets/gustavo/gustavo-braga-recorte.png`.
