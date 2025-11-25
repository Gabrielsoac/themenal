import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import terminalKit from "terminal-kit";

const term = terminalKit.terminal;

const preview = {
  command: "preview <theme>",
  describe: "Show Theme Preview",
  builder: (y: any) => y.positional("theme", { type: "string" }),
  handler: ({ theme }: any) => {
    const filepath = path.resolve("src/themes", `${theme}.yml`);
    if (!fs.existsSync(filepath)) {
      term.red("Theme not found\n");
      return;
    }

    const data = yaml.load(fs.readFileSync(filepath, "utf-8")) as any;
    term.bold("\nTheme Preview ").yellow(`${data.name}\n\n`);

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string" && value.startsWith("#")) {
        const hex = value.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        term.bold(`${key.padEnd(12)}: `);
        term.bgColorRgb(r, g, b)("   ");
        term("  " + value + "\n");
      }
    });
    term("\n");
  },
};

export default preview;
