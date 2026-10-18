/*
  Headline que se decifra uma vez ao carregar (Decrypted Text do React Bits, MIT + Commons Clause,
  recriado do zero em TS, sem dependências).
  Sem mudar o layout: mede cada letra já desenhada, trava a largura dela num inline-block (palavras
  sem quebra), embaralha e resolve da esquerda para a direita em ~700 ms. No fim, o título volta a
  ser um nó de texto só. Enquanto anima, o h1 leva o texto real no aria-label e as letras ficam
  escondidas dos leitores de tela. Não anima com movimento reduzido, se as fontes demorarem mais
  de 1 s ou se a quebra de linha mudar ao montar as letras.
*/
const DURACAO = 700;
const ESPERA_INICIAL = 90; // tudo embaralhado antes da primeira letra resolver
const TROCA = 45; // intervalo entre sorteios das letras ainda embaralhadas
const PRAZO_FONTES = 1000;
const SIMBOLOS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>";

interface Letra {
  el: HTMLSpanElement;
  original: string;
  candidatos: string[];
}

const sortear = (lista: string[]) => lista[Math.floor(Math.random() * lista.length)];

/** Símbolos com largura parecida com a da letra, para o embaralhado não invadir a vizinha. */
function parecidos(largura: number, medidas: Array<[string, number]>): string[] {
  const perto = medidas.filter(([, l]) => Math.abs(l - largura) <= largura * 0.2 + 1).map(([s]) => s);
  if (perto.length >= 4) return perto;
  return [...medidas]
    .sort((a, b) => Math.abs(a[1] - largura) - Math.abs(b[1] - largura))
    .slice(0, 6)
    .map(([s]) => s);
}

/** Índices das palavras que começam uma linha nova (para conferir que nada mudou de lugar). */
function quebras(topos: number[]): string {
  return topos.flatMap((t, i) => (i > 0 && t > topos[i - 1] + 2 ? [i] : [])).join(",");
}

function decifrar(titulo: HTMLElement) {
  const no = titulo.firstChild;
  if (titulo.childNodes.length !== 1 || !(no instanceof Text)) return;
  const texto = no.data;
  if (!texto.trim()) return;

  const estilo = getComputedStyle(titulo);
  const espacamento = parseFloat(estilo.letterSpacing) || 0;
  const alturaAntes = titulo.getBoundingClientRect().height;

  // 1. Mede o que já está na tela: largura de cada letra e o topo de cada palavra.
  const faixa = document.createRange();
  const caracteres = Array.from(texto);
  const larguras: number[] = [];
  const toposAntes: number[] = [];
  let posicao = 0;
  let novaPalavra = true;
  for (const c of caracteres) {
    faixa.setStart(no, posicao);
    faixa.setEnd(no, posicao + c.length);
    const caixa = faixa.getBoundingClientRect();
    larguras.push(caixa.width);
    if (/\s/.test(c)) novaPalavra = true;
    else if (novaPalavra) {
      toposAntes.push(caixa.top);
      novaPalavra = false;
    }
    posicao += c.length;
  }

  // Larguras dos símbolos na mesma fonte do título.
  const contexto = document.createElement("canvas").getContext("2d");
  if (!contexto) return;
  contexto.font = `${estilo.fontWeight} ${estilo.fontSize} ${estilo.fontFamily}`;
  const medidas = Array.from(SIMBOLOS, (s): [string, number] => [s, contexto.measureText(s).width + espacamento]);

  // 2. Monta as letras com a largura travada, palavra por palavra.
  const camada = document.createElement("span");
  camada.setAttribute("aria-hidden", "true");
  const letras: Letra[] = [];
  const palavras: HTMLSpanElement[] = [];
  let palavra: HTMLSpanElement | null = null;
  caracteres.forEach((c, i) => {
    if (/\s/.test(c)) {
      palavra = null;
      camada.append(c);
      return;
    }
    if (!palavra) {
      palavra = document.createElement("span");
      palavra.className = "decifra__palavra";
      palavras.push(palavra);
      camada.append(palavra);
    }
    const el = document.createElement("span");
    el.className = "decifra__letra";
    el.style.width = `${larguras[i]}px`;
    el.textContent = c;
    palavra.append(el);
    letras.push({ el, original: c, candidatos: parecidos(larguras[i], medidas) });
  });

  titulo.setAttribute("aria-label", texto);
  titulo.replaceChildren(camada);

  const restaurar = () => {
    titulo.replaceChildren(document.createTextNode(texto));
    titulo.removeAttribute("aria-label");
  };

  // 3. Confere que a altura e as quebras de linha continuam as mesmas; se não, desiste.
  const toposDepois = palavras.map((p) => p.getBoundingClientRect().top);
  const alturaDepois = titulo.getBoundingClientRect().height;
  if (Math.abs(alturaDepois - alturaAntes) > 1 || quebras(toposAntes) !== quebras(toposDepois)) {
    restaurar();
    return;
  }

  // 4. Embaralha tudo e resolve da esquerda para a direita.
  for (const l of letras) {
    l.el.dataset.cifrada = "";
    l.el.textContent = sortear(l.candidatos);
  }
  const total = letras.length;
  let inicio = -1;
  let ultimaTroca = 0;
  let resolvidas = 0;

  const quadro = (agora: number) => {
    if (inicio < 0) inicio = agora;
    const decorrido = agora - inicio;
    const alvo = Math.min(total, Math.floor((Math.max(0, decorrido - ESPERA_INICIAL) / (DURACAO - ESPERA_INICIAL)) * total));
    for (; resolvidas < alvo; resolvidas++) {
      const l = letras[resolvidas];
      l.el.textContent = l.original;
      delete l.el.dataset.cifrada;
    }
    if (resolvidas >= total) {
      restaurar();
      return;
    }
    if (agora - ultimaTroca >= TROCA) {
      ultimaTroca = agora;
      for (let i = resolvidas; i < total; i++) letras[i].el.textContent = sortear(letras[i].candidatos);
    }
    requestAnimationFrame(quadro);
  };
  requestAnimationFrame(quadro);
}

const titulo = document.querySelector<HTMLElement>("[data-decifra]");
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (titulo && !semMovimento && "fonts" in document) {
  const estilo = getComputedStyle(titulo);
  const fonte = `${estilo.fontWeight} ${estilo.fontSize} ${estilo.fontFamily}`;
  const prazo = new Promise<false>((resolver) => window.setTimeout(() => resolver(false), PRAZO_FONTES));
  const fontesProntas = document.fonts
    .load(fonte)
    .then(() => document.fonts.ready)
    .then(() => true as const)
    .catch(() => false as const);

  Promise.race([fontesProntas, prazo]).then((pronto) => {
    if (!pronto) return;
    const caixa = titulo.getBoundingClientRect();
    // Só vale a pena se o título está na tela (ex.: quem abre direto em /#planos não vê nada).
    if (caixa.bottom <= 0 || caixa.top >= window.innerHeight) return;
    requestAnimationFrame(() => decifrar(titulo));
  });
}

export {};
