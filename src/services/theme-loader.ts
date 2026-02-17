import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";
import { Theme } from "../interfaces/theme.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get the themes directory path
 * When running from dist, themes are in dist/themes
 */
function getThemesPath(): string {
  // The compiled file is in dist/services, so themes are in dist/themes
  return path.resolve(__dirname, "../themes");
}

/**
 * Theme loader service
 * Handles loading and validating theme files
 */
class ThemeLoader {
  private themesPath: string;

  constructor() {
    this.themesPath = getThemesPath();
  }

  /**
   * Get all available theme names
   */
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

  /**
   * Load a theme by name
   */
  loadTheme(themeName: string): Theme | null {
    try {
      const themePath = this.getThemePath(themeName);

      if (!fs.existsSync(themePath)) {
        return null;
      }

      const content = fs.readFileSync(themePath, "utf-8");
      const data = yaml.load(content) as any;

      // Validate theme structure
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

  /**
   * Get the full path to a theme file
   */
  private getThemePath(themeName: string): string {
    // Try both .yml and .yaml extensions
    const ymlPath = path.join(this.themesPath, `${themeName}.yml`);
    const yamlPath = path.join(this.themesPath, `${themeName}.yaml`);

    if (fs.existsSync(ymlPath)) {
      return ymlPath;
    }
    return yamlPath;
  }

  /**
   * Validate theme structure
   */
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

  /**
   * Check if a theme exists
   */
  themeExists(themeName: string): boolean {
    const themePath = this.getThemePath(themeName);
    return fs.existsSync(themePath);
  }
}

export default new ThemeLoader();
