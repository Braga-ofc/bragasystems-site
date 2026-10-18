-- Tabelas do site BRAGA SYSTEMS (mapa técnico, arquivo 07).
-- Rode no Supabase: SQL Editor → New query → cole e clique em Run. Pode rodar de novo sem erro.

-- Já existe desde a etapa 1: o contador de vagas de fundador (leitura pública).
create table if not exists public.site_config (
  id              int primary key,
  vagas_restantes int not null check (vagas_restantes between 0 and 5)
);

-- Headlines do gerador e controle do limite diário (3 por IP a cada 24 h).
create table if not exists public.geracoes_ia (
  id        uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  -- IP embaralhado com sal (SHA-256 em hexadecimal), nunca o IP real
  ip_hash   text not null check (ip_hash ~ '^[0-9a-f]{64}$'),
  vende     text not null check (char_length(vende) between 2 and 80),
  para_quem text not null check (char_length(para_quem) between 2 and 80),
  -- As 3 versões geradas
  headlines jsonb not null check (jsonb_typeof(headlines) = 'array' and jsonb_array_length(headlines) = 3)
);

-- Contatos vindos do gerador e do formulário curto.
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  criado_em     timestamptz not null default now(),
  origem        text not null check (origem in ('gerador', 'formulario')),
  nome          text not null check (char_length(nome) between 1 and 120),
  -- Só números, com DDD: 61995752594
  whatsapp      text not null check (whatsapp ~ '^[1-9][0-9]{9,10}$'),
  tipo_projeto  text check (tipo_projeto in ('landing', 'site', 'nao-sei')),
  investimento  text check (investimento in ('Até R$ 1.500', 'De R$ 1.500 a R$ 3.000', 'Acima de R$ 3.000', 'Prefiro conversar antes')),
  -- Sem "on delete": uma geração com lead não pode ser apagada antes do lead
  geracao_id    uuid references public.geracoes_ia (id),
  -- utm_source, utm_medium, utm_campaign, utm_content da primeira visita
  utm           jsonb check (utm is null or jsonb_typeof(utm) = 'object'),
  consentimento boolean not null check (consentimento),
  status        text not null default 'novo'
                check (status in ('novo', 'contatado', 'proposta', 'fechado', 'perdido')),
  -- Cada origem traz os seus campos: o gerador liga a geração; o formulário, tipo e investimento
  constraint leads_campos_por_origem check (
    (origem = 'gerador' and geracao_id is not null)
    or (origem = 'formulario' and geracao_id is null and tipo_projeto is not null and investimento is not null)
  )
);

-- Limite diário: contar as gerações de um IP nas últimas 24 h
create index if not exists geracoes_ia_ip_hash_criado_em_idx on public.geracoes_ia (ip_hash, criado_em desc);
-- Chave estrangeira com índice (exclusão por pedido LGPD e limpeza de 30 dias)
create index if not exists leads_geracao_id_idx on public.leads (geracao_id);
-- Painel: leads mais novos primeiro
create index if not exists leads_criado_em_idx on public.leads (criado_em desc);

comment on table public.site_config is 'Contador de vagas de fundador. Linha id = 1. Diminuir vagas_restantes a cada entrada paga.';
comment on table public.geracoes_ia is 'Headlines do gerador. Sem lead, são apagadas depois de 30 dias (rotinas.sql).';
comment on table public.leads is 'Leads do gerador e do formulário. Atualize o status: novo → contatado → proposta → fechado ou perdido.';
