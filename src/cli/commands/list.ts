import fs from "fs";
import path from "path";

const list = {
  command: "list",
  describe: "List all themes",
  handler: () => {
    const themesPath = path.resolve("src/themes");
    const files = fs.readdirSync(themesPath);
    console.log("Available Themes: ");
    files.forEach((file) => console.log(" —", file.replace(".yml", "")));
  },
};

export default list;
