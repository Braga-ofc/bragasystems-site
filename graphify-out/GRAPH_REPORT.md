# Graph Report - bragasystems-site  (2026-10-18)

## Corpus Check
- 80 files · ~67,445 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .woff2 7, .example 2, (none) 2)

## Summary
- 351 nodes · 660 edges · 22 communities (13 shown, 9 thin omitted)
- Extraction: 88% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 75 edges (avg confidence: 0.86)
- Token cost: 99,265 input · 0 output

## Community Hubs (Navigation)
- Seções e Componentes Visuais
- Regras do Projeto e Design System
- Topo, Rodapé e Navegação
- Configuração e Dependências
- Vagas de Fundadoras (Supabase)
- Planos e Preços
- Cases e Depoimentos
- Formulário de Leads
- Hero e Botões
- Névoa WebGL
- Grade Cinética
- Schema do Banco
- Config TypeScript
- FAQ
- Tipos de Ambiente

## God Nodes (most connected - your core abstractions)
1. `Design System: BRAGA SYSTEMS` - 37 edges
2. `Product (PRODUCT.md)` - 18 edges
3. `montarLinkWhatsapp()` - 14 edges
4. `rich()` - 13 edges
5. `Home de venda (surface brief)` - 13 edges
6. `iniciar()` - 12 edges
7. `iniciarFormulario()` - 11 edges
8. `scripts` - 7 edges
9. `ligarMascara()` - 7 edges
10. `ligarNevoa()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Direction Contract` --semantically_similar_to--> `Creative North Star: O Painel em Operação`  [INFERRED] [semantically similar]
  .impeccable/surfaces/src-pages-index-astro.md → DESIGN.md
- `First Viewport` --semantically_similar_to--> `Headline palavra por palavra`  [INFERRED] [semantically similar]
  .impeccable/surfaces/src-pages-index-astro.md → DESIGN.md
- `Home de venda (surface brief)` --conceptually_related_to--> `Skill /impeccable`  [INFERRED]
  .impeccable/surfaces/src-pages-index-astro.md → CLAUDE.md
- `Home de venda (surface brief)` --references--> `Case EBEN Creative Studio`  [INFERRED]
  .impeccable/surfaces/src-pages-index-astro.md → PRODUCT.md
- `Form: Painel (seed e9f0ae38)` --references--> `Circuito do Método`  [INFERRED]
  .impeccable/surfaces/src-pages-index-astro.md → DESIGN.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Live founder-vaga counter flow** — product_desconto_fundadoras, readme_site_config_table, design_medidor_de_vagas, design_selo_de_vagas, src_scripts_contador [INFERRED 0.85]
- **Single conversion path to WhatsApp** — product_metodo_pre_venda, design_circuito_do_metodo, product_whatsapp_com_mensagem_por_origem, design_regra_do_ciano_unico, impeccable_surfaces_src_pages_index_astro_home_de_venda [INFERRED 0.85]
- **AI headline generator experience** — product_gerador_de_headline_ia, design_console_do_gerador, design_feixe, src_scripts_gerador, src_components_sections_gerador [INFERRED 0.85]

## Communities (22 total, 9 thin omitted)

### Community 0 - "Seções e Componentes Visuais"
Cohesion: 0.05
Nodes (46): Acordeão, Inputs / Campos, Retrato fantasma, Gustavo Braga, lista, codigos, corte, tipos (+38 more)

### Community 1 - "Regras do Projeto e Design System"
Cohesion: 0.07
Nodes (33): Copy Oficial (COPY-OFICIAL-SITE.md), Repositório da marca Braga-ofc/BRAGASYSTEMS, Site BRAGA SYSTEMS (CLAUDE.md), Skill /impeccable, Chanfro em 45°, Circuito do Método, Console do gerador, Cunha (paralelogramo 45°) (+25 more)

### Community 2 - "Topo, Rodapé e Navegação"
Cohesion: 0.07
Nodes (24): Topo fixo / Navegação, Onde mexer (mapa de arquivos), ../assets/logo/logo-horizontal-escuro.svg?raw, ../../assets/logo/logo-vertical-escuro.svg?raw, Contato, contatos, direitos, links (+16 more)

### Community 3 - "Configuração e Dependências"
Cohesion: 0.07
Nodes (27): dependencies, astro, @astrojs/cloudflare, @astrojs/sitemap, devDependencies, @astrojs/check, typescript, wrangler (+19 more)

### Community 4 - "Vagas de Fundadoras (Supabase)"
Cohesion: 0.12
Nodes (20): Entradas ao rolar, Medidor de vagas, Desconto de fundadoras (25%, 5 vagas), Supabase (leads), Tabela site_config (vagas de fundador), Props, Props, enderecoVagas() (+12 more)

### Community 5 - "Planos e Preços"
Cohesion: 0.10
Nodes (23): Cartão de plano, Selo de vagas, Plano Contínuo (R$ 147/mês), Plano Essencial (R$ 1.497), Plano Signature (a partir de R$ 4.497), ordem, sep, cartoes (+15 more)

### Community 6 - "Cases e Depoimentos"
Cohesion: 0.11
Nodes (14): Depoimento, Tela do case, Case EBEN Creative Studio, controleDe(), marcarControle(), pausadosPeloVisitante, Props, semMovimento (+6 more)

### Community 7 - "Formulário de Leads"
Cohesion: 0.25
Nodes (19): soDigitos(), whatsappValido(), comPrazo(), Controle, definirCarregando(), formatarWhatsapp(), formulario, iniciarFormulario() (+11 more)

### Community 8 - "Hero e Botões"
Cohesion: 0.15
Nodes (11): Botões, Brilho de CTA, Headline palavra por palavra, First Viewport, palavras, Props, classes, ehWhatsapp (+3 more)

### Community 9 - "Névoa WebGL"
Cohesion: 0.26
Nodes (10): Névoa (WebGL), compilar(), FOTOS, ligarNevoa(), desenhar(), laco(), tocar(), mostrarFoto() (+2 more)

### Community 10 - "Grade Cinética"
Cohesion: 0.24
Nodes (8): Grade cinética, COR, COR_PERTO, ligarGrade(), desenhar(), laco(), tocar(), tela

### Community 11 - "Schema do Banco"
Cohesion: 0.39
Nodes (6): geracoes_ia_ip_hash_criado_em_idx, leads_criado_em_idx, public.geracoes_ia, public.leads, public.reservar_geracao(), public.site_config

### Community 12 - "Config TypeScript"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

## Ambiguous Edges - Review These
- `Cloudflare Workers (deploy)` → `Sitemap bragasystems.com.br/sitemap-index.xml`  [AMBIGUOUS]
  public/robots.txt · relation: conceptually_related_to

## Knowledge Gaps
- **10 isolated node(s):** `@astrojs/check`, `typescript`, `wrangler`, `../../assets/logo/logo-vertical-escuro.svg?raw`, `astro/tsconfigs/strict` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 138 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `astro` connect `Configuração e Dependências` to `Cases e Depoimentos`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Product (PRODUCT.md)` (e.g. with `Copy Oficial (COPY-OFICIAL-SITE.md)` and `Repositório da marca Braga-ofc/BRAGASYSTEMS`) actually correct?**
  _`Product (PRODUCT.md)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@astrojs/check`, `typescript`, `wrangler` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Seções e Componentes Visuais` be split into smaller, more focused modules?**
  _Cohesion score 0.05223880597014925 - nodes in this community are weakly interconnected._
- **Why does `Design System: BRAGA SYSTEMS` connect `Regras do Projeto e Design System` to `Seções e Componentes Visuais`, `Topo, Rodapé e Navegação`, `Vagas de Fundadoras (Supabase)`, `Planos e Preços`, `Cases e Depoimentos`, `Hero e Botões`, `Névoa WebGL`, `Grade Cinética`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Home de venda (surface brief)` (e.g. with `Copy Oficial (COPY-OFICIAL-SITE.md)` and `Skill /impeccable`) actually correct?**
  _`Home de venda (surface brief)` has 5 INFERRED edges - model-reasoned connections that need verification._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Cloudflare Workers (deploy)` and `Sitemap bragasystems.com.br/sitemap-index.xml`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._