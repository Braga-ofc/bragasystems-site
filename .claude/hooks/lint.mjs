// Hook PostToolUse: depois que o Claude edita um arquivo de código, roda o ESLint só nele.
// Se houver erro, sai com código 2 e o relatório vai para o Claude corrigir na hora.
import { execFileSync } from "node:child_process";
import { join } from "node:path";

let entrada = "";
for await (const parte of process.stdin) entrada += parte;
const arquivo = JSON.parse(entrada || "{}").tool_input?.file_path ?? "";

if (!/\.(astro|ts|tsx|js|mjs)$/.test(arquivo) || /[\\/](node_modules|dist|\.astro)[\\/]/.test(arquivo)) process.exit(0);

try {
  // Chama o ESLint do projeto direto pelo Node: sem npx e sem shell, que no Windows quebram com espaços e barras.
  const projeto = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  execFileSync(process.execPath, [join(projeto, "node_modules/eslint/bin/eslint.js"), "--no-warn-ignored", arquivo], { cwd: projeto, encoding: "utf8", stdio: "pipe" });
} catch (e) {
  // Código 1 = o ESLint achou erros no código: bloqueia e manda para o Claude corrigir.
  if (e.status === 1) {
    process.stderr.write(`ESLint encontrou problemas em ${arquivo}. Corrija antes de seguir:\n${e.stdout}`);
    process.exit(2);
  }
  // Qualquer outra falha é do próprio lint (config, instalação): só avisa, sem travar o trabalho.
  process.stderr.write(`Lint não rodou em ${arquivo}: ${(e.stderr || e.message).trim().split("\n").slice(-3).join(" ")}`);
  process.exit(1);
}
