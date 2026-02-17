import terminalKit from "terminal-kit";
import themeLoader from "../../services/theme-loader.js";

const term = terminalKit.terminal;

const preview = {
  command: "preview <theme>",
  describe: "Show a visual preview of a theme",
  builder: (y: any) =>
    y.positional("theme", {
      type: "string",
      describe: "Name of the theme to preview",
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

    term.bold.cyan("\n╔══════════════════════════════════════╗\n");
    term.bold.cyan("║  Theme Preview: ").bold.yellow(theme.padEnd(19)).bold.cyan("║\n");
    term.bold.cyan("╚══════════════════════════════════════╝\n\n");

    const displayColor = (name: string, hexColor: string) => {
      const hex = hexColor.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      term.bold(`  ${name.padEnd(16)}: `);
      term.bgColorRgb(r, g, b)("   ");
      term(`  ${hexColor}\n`);
    };

    displayColor("Background", themeData.background);
    displayColor("Foreground", themeData.foreground);
    term("\n");
    displayColor("Black", themeData.black);
    displayColor("Red", themeData.red);
    displayColor("Green", themeData.green);
    displayColor("Yellow", themeData.yellow);
    displayColor("Blue", themeData.blue);
    displayColor("Magenta", themeData.magenta);
    displayColor("Cyan", themeData.cyan);
    displayColor("White", themeData.white);
    term("\n");
    displayColor("Bright Black", themeData.brightBlack);
    displayColor("Bright Red", themeData.brightRed);
    displayColor("Bright Green", themeData.brightGreen);
    displayColor("Bright Yellow", themeData.brightYellow);
    displayColor("Bright Blue", themeData.brightBlue);
    displayColor("Bright Magenta", themeData.brightMagenta);
    displayColor("Bright Cyan", themeData.brightCyan);
    displayColor("Bright White", themeData.brightWhite);

    term("\n");
  },
};

export default preview;
