// Faixa do IP usada no limite do gerador (api/gerar-headline). Sem dependências: testada em ip.test.ts.

/**
 * IPv4 fica como está. No IPv6 vale a faixa /64 (os 4 primeiros grupos), porque uma mesma pessoa
 * troca de endereço dentro dela; o "::" é expandido antes, senão endereços da mesma faixa sairiam
 * diferentes. Devolve null se o texto não for um IP.
 */
export function faixaDoIp(ip: string): string | null {
  const t = ip.trim().toLowerCase();
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(t)) return t;
  if (!t.includes(":") || !/^[0-9a-f:.]+$/.test(t) || t.split("::").length > 2) return null;
  const [cabeca, cauda] = t.split("::");
  const grupos = (s: string | undefined) => (s ? s.split(":") : []);
  const ini = grupos(cabeca);
  const fim = grupos(cauda);
  // IPv4 no fim (::ffff:1.2.3.4) ocupa 2 grupos
  const tamanho = (g: string[]) => g.reduce((n, x) => n + (x.includes(".") ? 2 : 1), 0);
  const faltam = 8 - tamanho(ini) - tamanho(fim);
  if (cauda === undefined ? faltam !== 0 : faltam < 1) return null;
  const todos = [...ini, ...Array(cauda === undefined ? 0 : faltam).fill("0"), ...fim];
  if (todos.slice(0, 4).some((g) => !/^[0-9a-f]{1,4}$/.test(g))) return null;
  return todos.slice(0, 4).map((g) => g.replace(/^0+(?=.)/, "")).join(":") + "::/64";
}
