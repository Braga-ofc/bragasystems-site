// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// Páginas estáticas por padrão. Só as rotas de API (src/pages/api/) rodam no servidor,
// marcadas com `export const prerender = false`.
export default defineConfig({
  site: "https://bragasystems.com.br",
  trailingSlash: "never",
  adapter: cloudflare({
    // Imagens otimizadas na hora do build, sem depender do Cloudflare Images.
    imageService: "compile",
  }),
  // O site não usa sessões: evita criar um KV no Cloudflare sem necessidade.
  session: false,
  integrations: [
    sitemap({
      filter: (page) => !["/obrigado", "/briefing", "/404", "/amostra"].some((p) => page.includes(p)),
    }),
  ],
});
