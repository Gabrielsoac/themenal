import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";
import { Theme } from "../interfaces/theme.js";

const _filename = typeof __filename !== 'undefined' ? __filename : fileURLToPath(import.meta.url);
const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(_filename);

function getThemesPath(): string {
  return path.resolve(_dirname, "../themes");
}

class ThemeLoader {
  private themesPath: string;

  constructor() {
    this.themesPath = getThemesPath();
  }

  getAvailableThemes(): string[] {
    try {
      if (!fs.existsSync(this.themesPath)) {
        return [];
      }

      const files = fs.readdirSync(this.themesPath);
      return files
        .filter((file) => file.endsWith(".yml") || file.endsWith(".yaml"))
        .map((file) => file.replace(/\.(yml|yaml)$/, ""))
        .sort();
    } catch (error) {
      console.error("Error reading themes directory:", error);
      return [];
    }
  }

  loadTheme(themeName: string): Theme | null {
    try {
      const themePath = this.getThemePath(themeName);

      if (!fs.existsSync(themePath)) {
        return null;
      }

      const content = fs.readFileSync(themePath, "utf-8");
      const data = yaml.load(content) as any;

      if (!this.isValidTheme(data)) {
        console.error(`Invalid theme structure in ${themeName}`);
        return null;
      }

      return data as Theme;
    } catch (error) {
      console.error(`Error loading theme ${themeName}:`, error);
      return null;
    }
  }

  private getThemePath(themeName: string): string {
    const ymlPath = path.join(this.themesPath, `${themeName}.yml`);
    const yamlPath = path.join(this.themesPath, `${themeName}.yaml`);

    if (fs.existsSync(ymlPath)) {
      return ymlPath;
    }
    return yamlPath;
  }

  private isValidTheme(data: any): boolean {
    const requiredFields = [
      "background",
      "foreground",
      "black",
      "red",
      "green",
      "yellow",
      "blue",
      "magenta",
      "cyan",
      "white",
      "brightBlack",
      "brightRed",
      "brightGreen",
      "brightYellow",
      "brightBlue",
      "brightMagenta",
      "brightCyan",
      "brightWhite",
    ];

    return requiredFields.every((field) => {
      const value = data[field];
      return typeof value === "string" && value.startsWith("#");
    });
  }

  themeExists(themeName: string): boolean {
    const themePath = this.getThemePath(themeName);
    return fs.existsSync(themePath);
  }
}

export default new ThemeLoader();
