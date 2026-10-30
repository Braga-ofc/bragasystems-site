// node --test src/lib/ip.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { faixaDoIp } from "./ip.ts";

test("IPv4 fica igual", () => assert.equal(faixaDoIp("177.75.3.3"), "177.75.3.3"));
test("mesma faixa /64, escrita de jeitos diferentes, dá o mesmo resultado", () => {
  const a = faixaDoIp("2804:14c:1::abcd");
  assert.equal(a, "2804:14c:1:0::/64");
  assert.equal(faixaDoIp("2804:14c:1:0:1::1"), a);
  assert.equal(faixaDoIp("2804:014c:0001:0000:ffff:ffff:ffff:ffff"), a);
});
test("o identificador do aparelho não entra na faixa", () => {
  assert.equal(faixaDoIp("2001:db8::5"), "2001:db8:0:0::/64");
  assert.equal(faixaDoIp("2001:db8::9"), "2001:db8:0:0::/64");
});
test("recusa o que não é IP", () => {
  assert.equal(faixaDoIp(""), null);
  assert.equal(faixaDoIp("abc"), null);
  assert.equal(faixaDoIp("1::2::3"), null);
  assert.equal(faixaDoIp("1:2:3"), null);
});
