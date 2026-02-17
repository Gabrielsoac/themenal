import fs from "fs";
import path from "path";
import os from "os";

interface ThemenalConfig {
  currentTheme: string | null;
  lastApplied: string | null;
}

const CONFIG_DIR = path.join(os.homedir(), ".config", "themenal");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

/**
 * Configuration manager for themenal
 * Handles reading and writing configuration including current theme tracking
 */
class ConfigManager {
  private config: ThemenalConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  /**
   * Load configuration from disk
   */
  private loadConfig(): ThemenalConfig {
    try {
      if (!fs.existsSync(CONFIG_FILE)) {
        return {
          currentTheme: null,
          lastApplied: null,
        };
      }

      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.warn("Warning: Could not load config, using defaults");
      return {
        currentTheme: null,
        lastApplied: null,
      };
    }
  }

  /**
   * Save configuration to disk
   */
  private saveConfig(): void {
    try {
      // Ensure config directory exists
      if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
      }

      fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2));
    } catch (error) {
      console.error("Error: Could not save config");
      throw error;
    }
  }

  /**
   * Get the currently active theme name
   */
  getCurrentTheme(): string | null {
    return this.config.currentTheme;
  }

  /**
   * Set the currently active theme
   */
  setCurrentTheme(themeName: string): void {
    this.config.currentTheme = themeName;
    this.config.lastApplied = new Date().toISOString();
    this.saveConfig();
  }

  /**
   * Clear the current theme
   */
  clearCurrentTheme(): void {
    this.config.currentTheme = null;
    this.saveConfig();
  }

  /**
   * Get when the theme was last applied
   */
  getLastApplied(): string | null {
    return this.config.lastApplied;
  }
}

export default new ConfigManager();
