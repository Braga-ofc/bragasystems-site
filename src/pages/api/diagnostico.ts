/*
  TEMPORÁRIO (30/10/2026): diz SE cada chave existe e se o Supabase e o Resend respondem, sem mostrar
  nenhum valor. Serve para achar por que o formulário falha no link de teste. APAGAR antes do lançamento.
*/
import type { APIRoute } from "astro";
import { amb, json, supabase } from "../../lib/servidor";

export const prerender = false;

export const GET: APIRoute = async () => {
  let supabaseStatus: number | string = "sem chave";
  try {
    supabaseStatus = (await supabase("site_config?select=id&limit=1")).status;
  } catch (e) {
    supabaseStatus = String((e as Error).message);
  }
  let resendStatus: number | string = "sem chave";
  if (amb.RESEND_API_KEY) {
    resendStatus = (await fetch("https://api.resend.com/domains", { headers: { Authorization: `Bearer ${amb.RESEND_API_KEY}` } }).catch(() => null))?.status ?? "falhou";
  }
  return json({
    turnstileSecreta: Boolean(amb.TURNSTILE_SECRET_KEY),
    turnstileChavePublica: Boolean(import.meta.env.PUBLIC_TURNSTILE_SITE_KEY),
    supabaseUrl: Boolean(import.meta.env.PUBLIC_SUPABASE_URL),
    supabaseSecreta: Boolean(amb.SUPABASE_SECRET_KEY),
    supabaseSecretaTipo: amb.SUPABASE_SECRET_KEY?.startsWith("eyJ") ? "service_role (antiga)" : amb.SUPABASE_SECRET_KEY?.startsWith("sb_secret_") ? "secret (nova)" : amb.SUPABASE_SECRET_KEY ? "outro formato" : "nenhuma",
    supabaseStatus,
    resendStatus,
    salt: Boolean(amb.IP_HASH_SALT),
    avisoPara: Boolean(amb.AVISO_EMAIL_PARA),
    ia: Boolean(amb.AI),
  });
};
