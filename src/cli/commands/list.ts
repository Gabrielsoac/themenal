import terminalKit from "terminal-kit";
import themeLoader from "../../services/theme-loader.js";
import configManager from "../../services/config-manager.js";

const term = terminalKit.terminal;

const list = {
  command: "list",
  describe: "List all available themes",
  handler: () => {
    const themes = themeLoader.getAvailableThemes();
    const currentTheme = configManager.getCurrentTheme();

    if (themes.length === 0) {
      term.red("\nNo themes found.\n\n");
      return;
    }

    term.bold.cyan("\n╔══════════════════════════════════════╗\n");
    term.bold.cyan("║     Available Themes                 ║\n");
    term.bold.cyan("╚══════════════════════════════════════╝\n\n");

    themes.forEach((theme) => {
      const isCurrent = theme === currentTheme;
      
      if (isCurrent) {
        term.bold.green(" ► ");
        term.bold.green(theme);
        term.dim(" (current)\n");
      } else {
        term("   ");
        term.white(theme + "\n");
      }
    });

    term("\n");
    term.dim(`Total: ${themes.length} theme${themes.length !== 1 ? "s" : ""}\n\n`);
  },
};

export default list;
