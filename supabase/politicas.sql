-- Regras de acesso (RLS) do site BRAGA SYSTEMS (mapa técnico, arquivos 07 e 09).
-- Rode depois do schema.sql. Pode rodar de novo sem erro.
--
-- Quem acessa o quê:
--   site_config: o navegador LÊ com a chave publicável (anon). Ninguém de fora escreve.
--   leads e geracoes_ia: só as rotas do servidor, com a chave secreta (service_role). Nenhum acesso público.

alter table public.site_config enable row level security;
alter table public.geracoes_ia enable row level security;
alter table public.leads       enable row level security;

-- site_config: só leitura pública
drop policy if exists "leitura publica" on public.site_config;
create policy "leitura publica" on public.site_config for select to anon, authenticated using (true);
grant select on public.site_config to anon, authenticated;
revoke insert, update, delete, truncate, references, trigger on public.site_config from anon, authenticated;

-- leads e geracoes_ia: nenhuma política para o público, e nenhuma permissão também (dupla proteção)
revoke all on public.geracoes_ia from anon, authenticated;
revoke all on public.leads       from anon, authenticated;

-- O servidor (chave secreta) precisa das permissões mesmo quando o projeto não expõe tabelas novas sozinho
grant select, insert, update, delete on public.site_config, public.geracoes_ia, public.leads to service_role;
