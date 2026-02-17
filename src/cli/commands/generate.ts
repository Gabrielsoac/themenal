import terminalKit from "terminal-kit";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const term = terminalKit.terminal;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate command - interactively creates a new theme
 */
export default {
  command: "generate",
  describe: "Create a new theme interactively",
  handler: async () => {
    term.bold.cyan("\n╔══════════════════════════════════════╗\n");
    term.bold.cyan("║     Theme Generator                  ║\n");
    term.bold.cyan("╚══════════════════════════════════════╝\n\n");

    term("Theme name: ");
    const nameField = await term.inputField().promise;
    let name = "";
    if (nameField) name = nameField.trim();

    if (!name) {
      term.red("\n\nError: Theme name is required.\n\n");
      return;
    }

    const colors: any = {};
    const colorKeys = [
      { key: "background", label: "Background" },
      { key: "foreground", label: "Foreground" },
      { key: "black", label: "Black" },
      { key: "red", label: "Red" },
      { key: "green", label: "Green" },
      { key: "yellow", label: "Yellow" },
      { key: "blue", label: "Blue" },
      { key: "magenta", label: "Magenta" },
      { key: "cyan", label: "Cyan" },
      { key: "white", label: "White" },
      { key: "brightBlack", label: "Bright Black" },
      { key: "brightRed", label: "Bright Red" },
      { key: "brightGreen", label: "Bright Green" },
      { key: "brightYellow", label: "Bright Yellow" },
      { key: "brightBlue", label: "Bright Blue" },
      { key: "brightMagenta", label: "Bright Magenta" },
      { key: "brightCyan", label: "Bright Cyan" },
      { key: "brightWhite", label: "Bright White" },
    ];

    term("\n");

    for (const { key, label } of colorKeys) {
      term.bold(`${label}: `);
      const value = await term.inputField().promise;
      let hex = "";
      if (value) hex = value.trim();

      // Validate hex color
      if (!hex.startsWith("#") || (hex.length !== 7 && hex.length !== 4)) {
        term.red(" ✗ Invalid hex color format. Use #RRGGBB or #RGB\n");
        return;
      }

      colors[key] = hex;
    }

    // Create theme object
    const themeData = {
      background: colors.background,
      foreground: colors.foreground,
      black: colors.black,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
      blue: colors.blue,
      magenta: colors.magenta,
      cyan: colors.cyan,
      white: colors.white,
      brightBlack: colors.brightBlack,
      brightRed: colors.brightRed,
      brightGreen: colors.brightGreen,
      brightYellow: colors.brightYellow,
      brightBlue: colors.brightBlue,
      brightMagenta: colors.brightMagenta,
      brightCyan: colors.brightCyan,
      brightWhite: colors.brightWhite,
    };

    const yamlStr = yaml.dump(themeData);
    const themesPath = path.resolve(__dirname, "../../themes");
    const filepath = path.join(themesPath, `${name}.yml`);

    // Ensure themes directory exists
    if (!fs.existsSync(themesPath)) {
      fs.mkdirSync(themesPath, { recursive: true });
    }

    fs.writeFileSync(filepath, yamlStr);
    term.bold.green(`\n\n✔ Theme "${name}" created successfully!\n`);
    term.dim(`Location: ${filepath}\n\n`);
  },
};
