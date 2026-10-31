// node --test src/lib/headlines.test.ts (Node 24 roda TypeScript direto)
import { test } from "node:test";
import assert from "node:assert/strict";
import { lerHeadlines } from "./headlines.ts";

test("aceita JSON puro com 3 frases e tira as aspas", () => {
  assert.deepEqual(lerHeadlines('{"headlines": ["“Venda mais”", "Dor  sem fim", "Método claro"]}'), ["Venda mais", "Dor sem fim", "Método claro"]);
});
test("acha o JSON no meio de texto", () => {
  assert.deepEqual(lerHeadlines('Claro! {"headlines": ["a", "b", "c"]} pronto'), ["a", "b", "c"]);
});
test("chaves num comentário depois do JSON não estragam a leitura", () => {
  assert.deepEqual(lerHeadlines('{"headlines": ["a", "b {c}", "d"]}\nObs: evitei promessas {absolutas}'), ["a", "b {c}", "d"]);
});
test("aceita a resposta já como objeto", () => {
  assert.deepEqual(lerHeadlines({ headlines: ["a", "b", "c"] }), ["a", "b", "c"]);
});
test("recusa fora do tema, menos de 3, frase vazia ou longa e lixo", () => {
  assert.equal(lerHeadlines('{"erro": "fora_do_tema"}'), null);
  assert.equal(lerHeadlines('{"headlines": ["a", "b"]}'), null);
  assert.equal(lerHeadlines('{"headlines": ["a", " ", "c"]}'), null);
  assert.equal(lerHeadlines(`{"headlines": ["a", "b", "${"x".repeat(161)}"]}`), null);
  assert.equal(lerHeadlines("sem json"), null);
  assert.equal(lerHeadlines(undefined), null);
});
