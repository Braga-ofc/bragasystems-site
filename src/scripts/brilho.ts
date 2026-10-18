/*
  Liga o brilho dos botões de CTA (ui/Botao, .botao--brilho) quando cada um aparece na tela:
  2 voltas e para. Cada botão brilha uma vez só por visita.
*/
const botoes = document.querySelectorAll<HTMLElement>(".botao--brilho");
if (botoes.length && "IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add("is-brilhando");
        observador.unobserve(entrada.target);
      }
    },
    { threshold: 0.9 },
  );
  botoes.forEach((b) => observador.observe(b));
}

export {};
