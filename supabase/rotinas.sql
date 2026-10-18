-- Rotinas de retenção (mapa técnico, arquivo 07, e LGPD: só o tempo necessário).
-- Rode depois do schema.sql. Usa a extensão pg_cron (Database → Extensions → pg_cron).
-- Pode rodar de novo: agendar com o mesmo nome substitui a rotina.

create extension if not exists pg_cron with schema pg_catalog;

-- O hash do IP só serve para o limite de 24 h: depois disso, vira null (todo dia às 03:20 de Brasília)
select cron.schedule(
  'apaga-ip-hash-apos-24h',
  '20 6 * * *',
  $$ update public.geracoes_ia set ip_hash = null where ip_hash is not null and criado_em < now() - interval '24 hours' $$
);

-- Gerações que não viraram lead somem depois de 30 dias (todo dia às 03:15 de Brasília)
select cron.schedule(
  'limpa-geracoes-ia-sem-lead',
  '15 6 * * *',
  $$ delete from public.geracoes_ia g where g.criado_em < now() - interval '30 days' and not exists (select 1 from public.leads l where l.geracao_id = g.id) $$
);
