import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  command: "apply <theme>",
  describe: "Apply the theme",
  builder: (y: any) => y.positional("theme", { type: "string" }),
  handler: ({ theme }: any) => {
    const filepath = path.resolve(__dirname, "../themes", `${theme}.yml`);

    if (!fs.existsSync(filepath)) {
      console.error("Theme not found:", filepath);
      return;
    }

    const data = yaml.load(fs.readFileSync(filepath, "utf8")) as any;

    const dest = path.resolve(process.env.HOME!, ".config/terminal-colors.d");
    fs.mkdirSync(dest, { recursive: true });

    const output = Object.entries(data)
      .map(([k, v]) => `export ${k.toUpperCase()}=${v}`)
      .join("\n");

    fs.writeFileSync(path.join(dest, "theme.sh"), output);

    console.log("Applied with success!");
    console.log("Please, restart your terminal.");
  },
};
