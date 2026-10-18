# Site BRAGA SYSTEMS

Site oficial da BRAGA SYSTEMS, feito em [Astro](https://astro.build) e publicado no Cloudflare Workers.

O planejamento completo (copy, mapa técnico, regras e fila de tarefas) está no repositório da marca, [Braga-ofc/BRAGASYSTEMS](https://github.com/Braga-ofc/BRAGASYSTEMS).

## Como publicar

O Cloudflare acompanha este repositório. Cada envio para a `main` gera um build e atualiza o site sozinho em 1 a 2 minutos. Para voltar a uma versão anterior: Cloudflare → Workers & Pages → `bragasystems-site` → Deployments → Rollback.

## Rodar no computador (opcional)

Precisa do Node.js 22.12 ou mais novo.

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera a versão final em dist/
npm run preview  # testa a versão final como no Cloudflare
```

Para testar o gerador e o formulário no computador, copie `.dev.vars.example` para `.dev.vars` e preencha os segredos. Esse arquivo nunca vai para o GitHub.

## Onde mexer

| Quero mudar... | Arquivo |
|---|---|
| WhatsApp, redes sociais, cidade | `src/config/site.ts` |
| Mensagem de um botão de WhatsApp | `src/content/whatsapp.ts` |
| Textos das seções | `src/content/` |
| Cores e fontes | `src/styles/` |
| Número de vagas de fundador | Supabase, tabela `site_config` (sem mexer no código) |

## Segredos

As chaves (Supabase secreta, Anthropic, Turnstile, Resend) ficam só no painel do Cloudflare, em Settings → Variables and Secrets, como **Secret**. A lista de nomes está em `.dev.vars.example`.
