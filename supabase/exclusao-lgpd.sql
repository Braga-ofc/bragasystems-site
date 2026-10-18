-- Pedido de exclusão (LGPD, mapa técnico arquivo 09). Troque o número abaixo pelo WhatsApp da pessoa
-- (só números, com DDD) e rode. Apaga o lead e a geração ligada a ele, nessa ordem.
-- Depois: apague o e-mail de aviso desse lead no Gmail (busque pelo número) e o envio no painel do
-- Resend, e só então responda confirmando (prazo: 15 dias).
with apagados as (
  delete from public.leads where whatsapp = '61999999999' returning geracao_id
)
delete from public.geracoes_ia g using apagados a where g.id = a.geracao_id returning g.id;
