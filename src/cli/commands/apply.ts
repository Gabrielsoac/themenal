import terminalKit from "terminal-kit";
import themeLoader from "../../services/theme-loader.js";
import configManager from "../../services/config-manager.js";
import terminalDetector from "../../services/terminal-detector.js";
import applyTheme from "../../services/applyTheme.js";

const term = terminalKit.terminal;

/**
 * Apply command - applies a theme to the terminal
 */
const apply = {
  command: "apply <theme>",
  describe: "Apply a theme to your terminal",
  builder: (y: any) =>
    y.positional("theme", {
      type: "string",
      describe: "Name of the theme to apply",
    }),
  handler: ({ theme }: any) => {
    // Check if theme exists
    if (!themeLoader.themeExists(theme)) {
      term.red(`\nError: Theme "${theme}" not found.\n`);
      term("Use ").green("themenal list").yellow(" to see available themes.\n\n");
      return;
    }

    // Load the theme
    const themeData = themeLoader.loadTheme(theme);
    if (!themeData) {
      term.red(`\nError: Could not load theme "${theme}".\n\n`);
      return;
    }

    // Detect terminal type
    const terminalType = terminalDetector.detect();
    const terminalName = terminalDetector.getTerminalName(terminalType);

    term.bold(`\nDetected terminal: `).cyan(terminalName).bold(`\n\n`);

    // Check if terminal is supported
    if (!terminalDetector.isSupported(terminalType)) {
      term.red(`Error: ${terminalName} is not currently supported.\n`);
      term.yellow("Currently supported terminals:\n");
      term("  • GNOME Terminal\n\n");
      term.dim("More terminal support coming soon!\n\n");
      return;
    }

    // Apply the theme
    try {
      term.bold(`Applying theme "`).green(theme).bold(`"...\n\n`);

      if (terminalType === "gnome") {
        applyTheme.gnome(themeData);
      }

      // Save current theme to config
      configManager.setCurrentTheme(theme);

      term.bold.green(`\n✔ Theme "${theme}" applied successfully!\n\n`);
    } catch (error: any) {
      term.red(`\nError applying theme: ${error.message}\n\n`);
      process.exit(1);
    }
  },
};

export default apply;
