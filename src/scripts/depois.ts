/*
  Roda o que não aparece na primeira tela só quando o navegador estiver livre (no máximo 1,2 s depois),
  para não disputar os primeiros quadros com a entrada do hero. Sem requestIdleCallback (Safari): 300 ms.
*/
export function depois(tarefa: () => void) {
  if ("requestIdleCallback" in window) requestIdleCallback(tarefa, { timeout: 1200 });
  else setTimeout(tarefa, 300);
}
