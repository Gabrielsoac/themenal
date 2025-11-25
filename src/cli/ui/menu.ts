import terminalKit from "terminal-kit";
const term = terminalKit.terminal;

export async function mainMenu() {
  const menu = [
    "List Themes",
    "Preview",
    "Apply",
    "Generate new theme",
    "Exit",
  ];

  const res = await term.singleColumnMenu(menu).promise;
  return res.selectedIndex;
}
