import simbolo from "../assets/logo/simbolo-escuro.svg?raw";

/**
 * O B da marca em peças (haste, corpo e núcleo), lidas do arquivo do símbolo. Animar só com translate,
 * opacidade e traço: montado, fica idêntico ao arquivo (manual: nunca distorcer nem girar).
 * A conta quebra o build se as peças deixarem de somar o desenho original.
 */
const caminhos = [...simbolo.matchAll(/<path fill="(#[0-9A-F]+)"[^>]*? d="([^"]+)"/gi)].map((m) => ({ cor: m[1], d: m[2] }));
const [corpoD, hasteD] = caminhos[0]?.d.split(/(?=M)/) ?? [];
if (caminhos.length !== 2 || corpoD + hasteD !== caminhos[0].d) throw new Error("marca: as peças do B não somam o símbolo do arquivo");

export const pecasDoB = {
  haste: hasteD,
  corpo: corpoD,
  nucleo: caminhos[1].d,
  /** Cor do B (prata) e do núcleo aceso (ciano), como no arquivo */
  corPeca: caminhos[0].cor,
  corLuz: caminhos[1].cor,
};
