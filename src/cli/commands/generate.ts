import terminalKit from "terminal-kit";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const term = terminalKit.terminal;

export default {
  command: "generate",
  describe: "Create a new theme",
  handler: async () => {
    term("Set theme name: ");
    const field = await term.inputField().promise;
    let name;
    if (field) name = field.trim();

    const colors: any = {};
    const keys = [
      "background",
      "foreground",
      "black",
      "red",
      "green",
      "blue",
      "yellow",
      "cyan",
      "magenta",
      "white",
    ];

    for (const key of keys) {
      term(`\nEnter the hex color for ${key}: `);
      const value = await term.inputField().promise;
      let hex;
      if (value) hex = value.trim();
      colors[key] = hex;
    }

    const yamlStr = yaml.dump({ name, ...colors });
    const filepath = path.resolve("src/themes", `${name}.yml`);

    fs.writeFileSync(filepath, yamlStr);
    term.green("Created theme with success!\n");
  },
};
