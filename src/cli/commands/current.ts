import terminalKit from "terminal-kit";
import themeLoader from "../../services/theme-loader.js";
import configManager from "../../services/config-manager.js";

const term = terminalKit.terminal;

/**
 * Current command - displays the currently active theme
 */
const current = {
  command: "current",
  describe: "Show the currently active theme",
  handler: () => {
    const currentTheme = configManager.getCurrentTheme();

    if (!currentTheme) {
      term.yellow("\nNo theme is currently active.\n");
      term("Use ").green("themenal apply <theme>").yellow(" to apply a theme.\n\n");
      return;
    }

    const theme = themeLoader.loadTheme(currentTheme);

    if (!theme) {
      term.red(`\nError: Could not load current theme "${currentTheme}".\n\n`);
      return;
    }

    const lastApplied = configManager.getLastApplied();
    const appliedDate = lastApplied
      ? new Date(lastApplied).toLocaleString()
      : "Unknown";

    term.bold.cyan(`\n╔══════════════════════════════════════╗\n`);
    term.bold.cyan(`║  Current Theme: `).bold.green(currentTheme.padEnd(19)).bold.cyan(`║\n`);
    term.bold.cyan(`╚══════════════════════════════════════╝\n\n`);
    
    term.dim(`Applied: ${appliedDate}\n\n`);

    // Display color preview
    term.bold("Color Preview:\n\n");

    const displayColor = (name: string, hexColor: string) => {
      const hex = hexColor.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      term.bold(`  ${name.padEnd(16)}: `);
      term.bgColorRgb(r, g, b)("   ");
      term(`  ${hexColor}\n`);
    };

    displayColor("Background", theme.background);
    displayColor("Foreground", theme.foreground);
    term("\n");
    displayColor("Black", theme.black);
    displayColor("Red", theme.red);
    displayColor("Green", theme.green);
    displayColor("Yellow", theme.yellow);
    displayColor("Blue", theme.blue);
    displayColor("Magenta", theme.magenta);
    displayColor("Cyan", theme.cyan);
    displayColor("White", theme.white);
    term("\n");
    displayColor("Bright Black", theme.brightBlack);
    displayColor("Bright Red", theme.brightRed);
    displayColor("Bright Green", theme.brightGreen);
    displayColor("Bright Yellow", theme.brightYellow);
    displayColor("Bright Blue", theme.brightBlue);
    displayColor("Bright Magenta", theme.brightMagenta);
    displayColor("Bright Cyan", theme.brightCyan);
    displayColor("Bright White", theme.brightWhite);

    term("\n");
  },
};

export default current;
