/*
  Marca-texto (pedido do Gustavo, 19/10/2026): a tinta passa da esquerda para a direita quando a palavra
  entra na faixa de leitura e recolhe da direita para a esquerda quando ela sai (subindo ou descendo),
  para marcar de novo na volta.
  data-marca-atraso (ms) segura a primeira passada, como na headline, que espera as letras pousarem.
  Sem JavaScript ou com movimento reduzido, a palavra já aparece marcada (CSS).
*/
const marcas = [...document.querySelectorAll<HTMLElement>("[data-marca]")];
const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (marcas.length && !reduzido && "IntersectionObserver" in window) {
  const inicio = performance.now();
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) {
          const falta = Number(el.dataset.marcaAtraso ?? 0) - (performance.now() - inicio);
          window.setTimeout(() => el.setAttribute("data-marca", "marcada"), Math.max(0, falta));
        } else if (el.getAttribute("data-marca") === "marcada") {
          el.setAttribute("data-marca", "pronta");
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
