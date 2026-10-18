-- Conferência depois de rodar schema.sql, politicas.sql e rotinas.sql. Só lê, não muda nada.
select tablename, rowsecurity as rls_ligado
from pg_tables where schemaname = 'public' and tablename in ('site_config', 'geracoes_ia', 'leads')
order by tablename;

select tablename, policyname, cmd, roles from pg_policies where schemaname = 'public' order by tablename;

select table_name, grantee, string_agg(privilege_type, ', ' order by privilege_type) as permissoes
from information_schema.role_table_grants
where table_schema = 'public' and table_name in ('site_config', 'geracoes_ia', 'leads')
  and grantee in ('anon', 'authenticated', 'service_role')
group by table_name, grantee order by table_name, grantee;

select jobname, schedule from cron.job where jobname = 'limpa-geracoes-ia-sem-lead';

select id, vagas_restantes from public.site_config;
