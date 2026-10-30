// Lint do site: regras recomendadas de JavaScript, TypeScript e Astro. Rodar: npm run lint
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import globals from "globals";

export default [
  { ignores: ["dist/", ".astro/", ".wrangler/", "node_modules/", "metricas/", "supabase/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    rules: {
      "no-empty": ["error", { allowEmptyCatch: true }], // catch {} vazio é de propósito (localStorage bloqueado)
      "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true }],
    },
  },
  {
    // Trechos oficiais do GA4, Clarity e Pixel: o gtag exige o objeto arguments
    files: ["src/scripts/cookies.ts"],
    rules: { "prefer-rest-params": "off", "prefer-spread": "off", "@typescript-eslint/no-explicit-any": "off", "@typescript-eslint/no-unused-expressions": "off" },
  },
];
