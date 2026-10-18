-- Conferência depois de rodar os scripts. Só lê, não muda nada. Uma consulta só, porque o
-- SQL Editor mostra apenas o último resultado.
-- Esperado: RLS "ligado" nas 3 tabelas; 1 política (site_config, SELECT); anon e authenticated com
-- "SELECT" só em site_config e "nenhuma" em leads e geracoes_ia; service_role com SELECT, INSERT,
-- UPDATE, DELETE nas 3; função com EXECUTE só para service_role; 2 rotinas; vagas = 5.
select 'RLS' as item, c.relname::text as alvo, case when c.relrowsecurity then 'ligado' else 'DESLIGADO' end as valor
from pg_class c
where c.oid in ('public.site_config'::regclass, 'public.geracoes_ia'::regclass, 'public.leads'::regclass)
union all
select 'Política', p.tablename || ' · ' || p.policyname, p.cmd || ' para ' || array_to_string(p.roles, ', ')
from pg_policies p where p.schemaname = 'public'
union all
select 'Permissão', t.t || ' · ' || r.r, coalesce(nullif(concat_ws(', ',
  case when has_table_privilege(r.r, t.t, 'SELECT') then 'SELECT' end,
  case when has_table_privilege(r.r, t.t, 'INSERT') then 'INSERT' end,
  case when has_table_privilege(r.r, t.t, 'UPDATE') then 'UPDATE' end,
  case when has_table_privilege(r.r, t.t, 'DELETE') then 'DELETE' end,
  case when has_table_privilege(r.r, t.t, 'TRUNCATE') then 'TRUNCATE' end), ''), 'nenhuma')
from unnest(array['public.site_config', 'public.geracoes_ia', 'public.leads']) as t(t)
cross join unnest(array['anon', 'authenticated', 'service_role']) as r(r)
union all
select 'Função', 'reservar_geracao · ' || r.r,
  case when has_function_privilege(r.r, 'public.reservar_geracao(text, text, text)', 'EXECUTE') then 'EXECUTE' else 'nenhuma' end
from unnest(array['anon', 'authenticated', 'service_role']) as r(r)
union all
select 'Rotina', j.jobname::text, j.schedule::text || case when j.active then ' (ativa)' else ' (parada)' end
from cron.job j where j.jobname in ('apaga-ip-hash-apos-24h', 'limpa-geracoes-ia-sem-lead')
union all
select 'Vagas', 'site_config · id ' || s.id, s.vagas_restantes::text from public.site_config s
order by 1, 2;
