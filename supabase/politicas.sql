-- Regras de acesso (RLS) do site BRAGA SYSTEMS (mapa técnico, arquivos 07 e 09).
-- Rode depois do schema.sql (ou junto, no mesmo envio). Pode rodar de novo sem erro.
--
-- Quem acessa o quê:
--   site_config: o navegador LÊ com a chave publicável (anon). Ninguém de fora escreve.
--   leads e geracoes_ia: só as rotas do servidor, com a chave secreta (service_role). Nenhum acesso público.

alter table public.site_config enable row level security;
alter table public.geracoes_ia enable row level security;
alter table public.leads       enable row level security;

-- site_config: só leitura pública (cria a política só se ainda não existir)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_config' and policyname = 'leitura publica'
  ) then
    create policy "leitura publica" on public.site_config for select to anon, authenticated using (true);
  end if;
end
$$;
revoke all on public.site_config from anon, authenticated;
grant select on public.site_config to anon, authenticated;

-- leads e geracoes_ia: nenhuma política para o público e nenhuma permissão também (dupla proteção)
revoke all on public.geracoes_ia, public.leads from anon, authenticated;

-- O servidor (chave secreta) precisa das permissões mesmo quando o projeto não expõe tabelas novas sozinho
grant select, insert, update, delete on public.site_config, public.geracoes_ia, public.leads to service_role;
grant execute on function public.reservar_geracao(text, text, text) to service_role;
