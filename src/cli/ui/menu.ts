import terminalKit from "terminal-kit";
const term = terminalKit.terminal;

export async function mainMenu() {
  const menu = ["Listar temas", "Preview", "Aplicar", "Gerar novo", "Sair"];

  const res = await term.singleColumnMenu(menu).promise;
  return res.selectedIndex;
}
