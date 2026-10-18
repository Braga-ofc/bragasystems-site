-- Rotina de retenção (mapa técnico, arquivo 07): gerações sem lead somem depois de 30 dias.
-- Rode depois do schema.sql. Precisa da extensão pg_cron (Database → Extensions → pg_cron).

create extension if not exists pg_cron with schema pg_catalog;

-- Agenda (ou reagenda) todo dia às 06:15 UTC (03:15 em Brasília)
select cron.schedule(
  'limpa-geracoes-ia-sem-lead',
  '15 6 * * *',
  $$
    delete from public.geracoes_ia g
    where g.criado_em < now() - interval '30 days'
      and not exists (select 1 from public.leads l where l.geracao_id = g.id)
  $$
);
