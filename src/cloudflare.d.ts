// Só o que o servidor usa do runtime da Cloudflare. O "wrangler types" gera os tipos completos, mas eles
// trocam os do navegador (DOM) e quebram os scripts da página; o formato das chaves está em lib/servidor.
declare module "cloudflare:workers" {
  export const env: Record<string, unknown>;
}
