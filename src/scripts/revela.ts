/*
  Entradas ao rolar (Blur Fade do Magic UI, MIT, recriado em CSS e TS).
  Um só IntersectionObserver para o site todo. Só esconde o que ainda está abaixo da tela,
  então nada pisca no carregamento e, sem JavaScript, tudo aparece normalmente.
*/
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-revela]"));

if (!semMovimento && "IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        const el = entrada.target as HTMLElement;
        el.dataset.revela = "visivel";
        observador.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  for (const el of alvos) {
    if (el.getBoundingClientRect().top < window.innerHeight) continue;
    el.dataset.revela = "pendente";
    observador.observe(el);
  }
}

export {};
