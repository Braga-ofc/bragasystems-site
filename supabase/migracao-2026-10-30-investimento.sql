-- Faixas de investimento novas do formulário (30/10/2026), uma por plano:
-- Até R$ 1.000 (Essencial) · De R$ 1.000 a R$ 2.000 (Performance) · Acima de R$ 2.000 (Signature).
-- Rode uma vez no Supabase: SQL Editor → New query → cole tudo → Run. Pode rodar de novo sem erro.
-- As faixas antigas continuam aceitas, para os leads que já estão salvos com elas.
alter table public.leads drop constraint if exists leads_investimento_check;
alter table public.leads add constraint leads_investimento_check check (investimento in (
  'Até R$ 1.000', 'De R$ 1.000 a R$ 2.000', 'Acima de R$ 2.000', 'Prefiro conversar antes',
  'Até R$ 1.500', 'De R$ 1.500 a R$ 3.000', 'Acima de R$ 3.000'
));
-- Conferência: deve mostrar a regra nova com as 7 faixas
select pg_get_constraintdef(oid) as regra from pg_constraint where conname = 'leads_investimento_check';
