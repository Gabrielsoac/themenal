import terminalKit from "terminal-kit";
import themeLoader from "../../services/theme-loader.js";
import configManager from "../../services/config-manager.js";
import terminalDetector from "../../services/terminal-detector.js";
import applyTheme from "../../services/applyTheme.js";

const term = terminalKit.terminal;

const apply = {
  command: "apply <theme>",
  describe: "Apply a theme to your terminal",
  builder: (y: any) =>
    y.positional("theme", {
      type: "string",
      describe: "Name of the theme to apply",
    }),
  handler: ({ theme }: any) => {
    if (!themeLoader.themeExists(theme)) {
      term.red(`\nError: Theme "${theme}" not found.\n`);
      term("Use ").green("themenal list").yellow(" to see available themes.\n\n");
      return;
    }

    const themeData = themeLoader.loadTheme(theme);
    if (!themeData) {
      term.red(`\nError: Could not load theme "${theme}".\n\n`);
      return;
    }

    const terminalType = terminalDetector.detect();
    const terminalName = terminalDetector.getTerminalName(terminalType);

    term.bold(`\nDetected terminal: `).cyan(terminalName).bold(`\n\n`);

    if (!terminalDetector.isSupported(terminalType)) {
      term.red(`Error: ${terminalName} is not currently supported.\n`);
      term.yellow("Currently supported terminals:\n");
      term("  • GNOME Terminal\n\n");
      term.dim("More terminal support coming soon!\n\n");
      return;
    }

    try {
      term.bold(`Applying theme "`).green(theme).bold(`"...\n\n`);

      if (terminalType === "gnome") {
        applyTheme.gnome(themeData);
      }

      configManager.setCurrentTheme(theme);

      term.bold.green(`\n✔ Theme "${theme}" applied successfully!\n\n`);
    } catch (error: any) {
      term.red(`\nError applying theme: ${error.message}\n\n`);
      process.exit(1);
    }
  },
};

export default apply;
