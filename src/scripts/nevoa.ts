/*
  Névoa da primeira dobra: luz viva em grafite e ciano atrás do painel.
  Recriação do Velaris (21st.dev, Aman Shakya: ruído simplex em camadas, vinheta e grão) em WebGL
  puro, nas cores da marca. Ruído simplex 2D de Ian McEwan e Stefan Gustavson (Ashima Arts, MIT).

  - Começa depois do carregamento, no tempo livre do navegador: não atrasa a primeira pintura.
  - Desenha em meia resolução e a no máximo 30 quadros por segundo.
  - Para fora da tela e com a aba escondida.
  - Com movimento reduzido ou economia de dados, desenha um quadro parado.
  - Sem placa de vídeo (WebGL desenhado pelo processador, como no teste do PageSpeed, em aparelhos
    muito simples ou com a aceleração gráfica desligada) ou sem WebGL, nem compila: o canvas mostra
    uma foto parada da própria névoa (public/nevoa, ~7 KB, gerada deste shader). Num canvas, e não
    como imagem de fundo, ela não conta como o maior elemento da página e não atrasa o LCP. Se a
    foto não carregar, fica o brilho em CSS (.is-estatica).
*/

const VERTICE = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENTO = `
precision mediump float;
uniform vec2 u_res;
uniform vec2 u_foco;
uniform float u_t;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  float lado = min(u_res.x, u_res.y);
  vec2 p = gl_FragCoord.xy / lado;
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_t * 0.035;

  // Duas camadas de ruído, uma deformando a outra: a névoa escorre devagar
  vec2 q = vec2(snoise(p * 1.1 + vec2(0.0, t)), snoise(p * 1.1 + vec2(5.2, -t)));
  float n = snoise(p * 1.7 + q * 0.9 + vec2(t * 0.6, -t * 0.4)) * 0.5 + 0.5;
  float n2 = snoise(p * 3.4 - q * 0.6 + t) * 0.5 + 0.5;

  // Núcleo de luz: no vão entre a oferta e o gerador no computador, no alto à direita no celular
  vec2 foco = u_foco + vec2(sin(t * 2.0), cos(t * 1.6)) * 0.04 * lado;
  vec2 d = (gl_FragCoord.xy - foco) / lado;
  float luz = exp(-dot(d, d) * 2.4);

  vec3 base = vec3(0.043, 0.059, 0.078);     // preto profundo
  vec3 grafite = vec3(0.125, 0.157, 0.200);
  vec3 profundo = vec3(0.043, 0.486, 0.549); // ciano profundo
  vec3 eletrico = vec3(0.208, 0.835, 0.910); // ciano elétrico

  vec3 c = base;
  c = mix(c, grafite, smoothstep(0.35, 0.95, n) * (0.25 + 0.45 * luz));
  c = mix(c, profundo, smoothstep(0.45, 1.0, n) * luz * 0.5);
  c = mix(c, eletrico, smoothstep(0.62, 1.0, n * n2 + 0.2) * luz * 0.2);

  // Vinheta e saída suave para o preto na base da dobra
  c = mix(base, c, smoothstep(0.0, 0.4, uv.y) * smoothstep(1.05, 0.55, abs(uv.x - 0.55) * 1.6));

  // Grão de filme, quase invisível
  float g = fract(sin(dot(gl_FragCoord.xy + fract(u_t) * 97.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (g - 0.5) * 0.018;

  gl_FragColor = vec4(c, 1.0);
}
`;

const FOTOS = { computador: "/nevoa/nevoa-computador.webp", celular: "/nevoa/nevoa-celular.webp" };
const COMPUTADOR = "(min-width: 1024px)";

/** Sem placa de vídeo: a foto da névoa num canvas 2D novo, cobrindo a dobra a partir do topo. */
function mostrarFoto(antiga: HTMLCanvasElement, area: HTMLElement) {
  // O canvas antigo já está preso ao WebGL; um canvas novo, igual, recebe o desenho em 2D
  const tela = antiga.cloneNode(false) as HTMLCanvasElement;
  antiga.replaceWith(tela);
  const ctx = tela.getContext("2d");
  if (!ctx) return area.classList.add("is-estatica");
  const computador = window.matchMedia(COMPUTADOR);
  const fotos = new Map<string, HTMLImageElement>();

  function desenhar() {
    const src = computador.matches ? FOTOS.computador : FOTOS.celular;
    let foto = fotos.get(src);
    if (!foto) {
      foto = new Image();
      foto.decoding = "async";
      foto.src = src;
      fotos.set(src, foto);
      foto.addEventListener("load", desenhar, { once: true });
      foto.addEventListener("error", () => area.classList.add("is-estatica"), { once: true });
      return;
    }
    if (!foto.complete || !foto.naturalWidth) return;
    const r = area.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    tela.width = Math.max(1, Math.round(r.width * dpr));
    tela.height = Math.max(1, Math.round(r.height * dpr));
    const escala = Math.max(tela.width / foto.naturalWidth, tela.height / foto.naturalHeight);
    const w = foto.naturalWidth * escala;
    const h = foto.naturalHeight * escala;
    ctx!.fillStyle = "#0B0F14";
    ctx!.fillRect(0, 0, tela.width, tela.height);
    ctx!.drawImage(foto, (tela.width - w) / 2, 0, w, h);
    tela.classList.add("is-acesa");
  }

  desenhar();
  new ResizeObserver(desenhar).observe(area);
}

const ESCALA = 0.5; // meia resolução: a névoa é macia, não precisa de mais
const QUADRO_MS = 1000 / 30;

function compilar(gl: WebGLRenderingContext, tipo: number, fonte: string) {
  const s = gl.createShader(tipo);
  if (!s) return null;
  gl.shaderSource(s, fonte);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

function ligarNevoa(tela: HTMLCanvasElement) {
  const area = tela.parentElement;
  if (!area) return;
  const gl = tela.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  const info = gl?.getExtension("WEBGL_debug_renderer_info");
  const placa = gl && info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  if (!gl || /swiftshader|llvmpipe|software|basic render/i.test(placa)) {
    mostrarFoto(tela, area);
    return;
  }

  const vs = compilar(gl, gl.VERTEX_SHADER, VERTICE);
  const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENTO);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) return;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "u_res");
  const uFoco = gl.getUniformLocation(prog, "u_foco");
  const uT = gl.getUniformLocation(prog, "u_t");

  const parado =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  // Um ponto qualquer do ruído, para o quadro parado não começar sempre igual ao zero
  const inicio = performance.now() - 40000;

  // No computador, o núcleo de luz fica no vão entre a oferta e o console do gerador (o console é
  // opaco: atrás dele a luz não apareceria); no celular, no alto à direita
  function medir() {
    const r = area!.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width * ESCALA));
    const h = Math.max(1, Math.round(r.height * ESCALA));
    if (tela.width !== w || tela.height !== h) {
      tela.width = w;
      tela.height = h;
      gl!.viewport(0, 0, w, h);
    }
    const gerador = area!.querySelector<HTMLElement>(".gerador");
    let fx = r.width * 0.85;
    let fy = Math.min(r.height, 420) * 0.35;
    if (gerador && window.matchMedia(COMPUTADOR).matches) {
      const g = gerador.getBoundingClientRect();
      fx = g.left - r.left - 24;
      fy = g.top - r.top + Math.min(g.height, 480) * 0.45;
    }
    // WebGL conta o y de baixo para cima
    gl!.uniform2f(uRes, w, h);
    gl!.uniform2f(uFoco, fx * ESCALA, h - fy * ESCALA);
  }

  function desenhar(agora: number) {
    gl!.uniform1f(uT, (agora - inicio) / 1000);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }

  let visivel = false;
  let quadro = 0;
  let ultimo = 0;
  function laco(agora: number) {
    quadro = 0;
    if (!visivel || document.hidden) return;
    if (agora - ultimo >= QUADRO_MS) {
      ultimo = agora;
      desenhar(agora);
    }
    quadro = requestAnimationFrame(laco);
  }
  function tocar() {
    if (!parado && !quadro && visivel && !document.hidden) quadro = requestAnimationFrame(laco);
  }

  medir();
  desenhar(performance.now());
  tela.classList.add("is-acesa");

  new ResizeObserver(() => {
    medir();
    if (parado || !quadro) desenhar(performance.now());
  }).observe(area);

  if (parado) return;
  new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    tocar();
  }).observe(area);
  document.addEventListener("visibilitychange", tocar);
  tela.addEventListener("webglcontextlost", () => {
    visivel = false;
    cancelAnimationFrame(quadro);
    tela.classList.remove("is-acesa");
  });
}

const tela = document.querySelector<HTMLCanvasElement>("[data-nevoa]");
if (tela) {
  const iniciar = () =>
    "requestIdleCallback" in window
      ? requestIdleCallback(() => ligarNevoa(tela), { timeout: 2000 })
      : setTimeout(() => ligarNevoa(tela), 200);
  if (document.readyState === "complete") iniciar();
  else window.addEventListener("load", iniciar, { once: true });
}

export {};
