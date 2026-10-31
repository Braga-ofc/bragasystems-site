/*
  Marca-texto (pedido do Gustavo, 19/10/2026): a tinta passa da esquerda para a direita quando a palavra
  entra na faixa de leitura e recolhe da direita para a esquerda quando ela sai (subindo ou descendo),
  para marcar de novo na volta.
  data-marca-atraso (ms) segura a primeira passada, como na headline, que espera as letras pousarem.
  A marca nasce apagada no HTML (data-marca="pronta"); com movimento reduzido o CSS já mostra marcada.
*/
const marcas = [...document.querySelectorAll<HTMLElement>("[data-marca]")];
const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (marcas.length && !reduzido && "IntersectionObserver" in window) {
  // Passada pendente de cada palavra: sair da faixa antes do atraso cancela, para animar na próxima entrada
  const pendentes = new Map<HTMLElement, number>();
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) {
          // O atraso conta da abertura da página: o script só liga quando o navegador fica livre
          const falta = Number(el.dataset.marcaAtraso ?? 0) - performance.now();
          pendentes.set(el, window.setTimeout(() => {
            pendentes.delete(el);
            el.setAttribute("data-marca", "marcada");
          }, Math.max(0, falta)));
        } else {
          window.clearTimeout(pendentes.get(el));
          pendentes.delete(el);
          if (el.getAttribute("data-marca") === "marcada") el.setAttribute("data-marca", "pronta");
        }
      }
    },
    { rootMargin: "-8% 0px -20% 0px" },
  );
  for (const el of marcas) {
    el.setAttribute("data-marca", "pronta");
    observador.observe(el);
  }
}

export {};
