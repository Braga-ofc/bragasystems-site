-- Tabelas do site BRAGA SYSTEMS (mapa técnico, arquivo 07).
-- Rode no Supabase: SQL Editor → New query → cole e clique em Run. Pode rodar de novo sem erro.
-- A RLS e o bloqueio do público já vêm neste mesmo arquivo: as tabelas nunca ficam abertas.

-- Já existe desde a etapa 1: o contador de vagas de fundador (leitura pública).
create table if not exists public.site_config (
  id              int primary key,
  vagas_restantes int not null check (vagas_restantes between 0 and 5)
);

-- Headlines do gerador e controle do limite diário (3 por IP a cada 24 h).
-- A linha nasce na reserva (headlines vazio) e recebe as 3 headlines quando a IA responde.
create table if not exists public.geracoes_ia (
  id        uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  -- IP (ou faixa /64 do IPv6) embaralhado com sal, SHA-256 em hexadecimal; vira null depois de 24 h (rotinas.sql)
  ip_hash   text check (ip_hash ~ '^[0-9a-f]{64}$'),
  vende     text not null check (char_length(vende) between 2 and 80),
  para_quem text not null check (char_length(para_quem) between 2 and 80),
  -- As 3 versões geradas: textos de 1 a 160 caracteres
  headlines jsonb check (
    headlines is null or (
      jsonb_typeof(headlines) = 'array' and jsonb_array_length(headlines) = 3
      and not jsonb_path_exists(headlines, '$[*] ? (@.type() != "string" || !(@ like_regex "^\\S.{0,159}$" flag "s"))')
    )
  )
);

-- Contatos vindos do gerador e do formulário curto.
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  criado_em     timestamptz not null default now(),
  origem        text not null check (origem in ('gerador', 'formulario')),
  nome          text not null check (char_length(nome) between 1 and 120 and btrim(nome) = nome and nome !~ '[[:cntrl:]]'),
  -- Só números, com DDD válido: celular com 9 na frente (11 dígitos) ou fixo (10 dígitos)
  whatsapp      text not null check (
    whatsapp ~ '^(1[1-9]|2[12478]|3[1-578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])(9[0-9]{8}|[2-5][0-9]{7})$'
  ),
  tipo_projeto  text check (tipo_projeto in ('landing', 'site', 'nao-sei')),
  investimento  text check (investimento in ('Até R$ 1.500', 'De R$ 1.500 a R$ 3.000', 'Acima de R$ 3.000', 'Prefiro conversar antes')),
  -- Uma geração vira no máximo um lead (o reenvio não duplica). Sem "on delete": apague o lead antes da geração
  geracao_id    uuid unique references public.geracoes_ia (id),
  -- Só utm_source, utm_medium, utm_campaign e utm_content, em texto de até 100 caracteres
  utm           jsonb check (
    utm is null or (
      jsonb_typeof(utm) = 'object'
      and utm - array['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] = '{}'::jsonb
      and not jsonb_path_exists(utm, '$.* ? (@.type() != "string" || !(@ like_regex "^.{1,100}$"))')
    )
  ),
  consentimento boolean not null check (consentimento),
  status        text not null default 'novo'
                check (status in ('novo', 'contatado', 'proposta', 'fechado', 'perdido')),
  -- Cada origem traz os seus campos: o gerador liga a geração; o formulário, tipo e investimento
  constraint leads_campos_por_origem check (
    (origem = 'gerador' and geracao_id is not null)
    or (origem = 'formulario' and geracao_id is null and tipo_projeto is not null and investimento is not null)
  )
);

-- Proteção já na criação: RLS ligada e nenhum acesso público a leads e geracoes_ia
alter table public.site_config enable row level security;
alter table public.geracoes_ia enable row level security;
alter table public.leads       enable row level security;
revoke all on public.geracoes_ia, public.leads from anon, authenticated;

-- Limite diário: contar as gerações de um IP nas últimas 24 h
create index if not exists geracoes_ia_ip_hash_criado_em_idx on public.geracoes_ia (ip_hash, criado_em desc);
-- Painel: leads mais novos primeiro (geracao_id já tem índice pelo unique)
create index if not exists leads_criado_em_idx on public.leads (criado_em desc);

/*
  Reserva atômica de uma geração: conta as do IP nas últimas 24 h e, se houver vaga, cria a linha
  antes de chamar a IA. Devolve o id, ou null quando o limite de 3 já foi atingido.
  O trava por IP (advisory lock) impede que pedidos simultâneos furem o limite.
  Só o servidor (service_role) pode chamar.
*/
create or replace function public.reservar_geracao(p_ip_hash text, p_vende text, p_para_quem text)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $f$
declare
  v_id uuid;
begin
  if p_ip_hash is null then
    raise exception 'ip_hash obrigatório';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(p_ip_hash, 0));
  if (select count(*) from public.geracoes_ia
      where ip_hash = p_ip_hash and criado_em > now() - interval '24 hours') >= 3 then
    return null;
  end if;
  insert into public.geracoes_ia (ip_hash, vende, para_quem)
  values (p_ip_hash, p_vende, p_para_quem)
  returning id into v_id;
  return v_id;
end
$f$;
revoke execute on function public.reservar_geracao(text, text, text) from public, anon, authenticated;

comment on table public.site_config is 'Contador de vagas de fundador. Linha id = 1. Diminuir vagas_restantes a cada entrada paga.';
comment on table public.geracoes_ia is 'Headlines do gerador. ip_hash vira null depois de 24 h; sem lead, a linha some depois de 30 dias (rotinas.sql).';
comment on table public.leads is 'Leads do gerador e do formulário. Atualize o status: novo → contatado → proposta → fechado ou perdido.';
