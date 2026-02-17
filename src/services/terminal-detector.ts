import { execSync } from "child_process";

export type TerminalType = "gnome" | "konsole" | "xfce" | "unknown";

/**
 * Terminal detector service
 * Detects which terminal emulator is currently running
 */
class TerminalDetector {
  /**
   * Detect the current terminal emulator
   */
  detect(): TerminalType {
    try {
      // Check environment variables
      const colorterm = process.env.COLORTERM;
      const term = process.env.TERM;
      const termProgram = process.env.TERM_PROGRAM;

      // GNOME Terminal detection
      if (colorterm === "gnome-terminal" || colorterm === "truecolor") {
        // Additional check for GNOME Terminal
        try {
          execSync("which gnome-terminal", { stdio: "pipe" });
          return "gnome";
        } catch {
          // gnome-terminal not found
        }
      }

      // Check if dconf command exists (GNOME Terminal uses dconf)
      try {
        execSync("which dconf", { stdio: "pipe" });
        const profiles = execSync(
          "dconf list /org/gnome/terminal/legacy/profiles:/",
          { stdio: "pipe" }
        ).toString();
        if (profiles) {
          return "gnome";
        }
      } catch {
        // Not GNOME Terminal
      }

      // Konsole detection
      if (term?.includes("konsole") || termProgram === "konsole") {
        return "konsole";
      }

      // XFCE Terminal detection
      if (colorterm === "xfce4-terminal" || termProgram === "xfce4-terminal") {
        return "xfce";
      }

      return "unknown";
    } catch (error) {
      return "unknown";
    }
  }

  /**
   * Get a human-readable name for the terminal
   */
  getTerminalName(type: TerminalType): string {
    switch (type) {
      case "gnome":
        return "GNOME Terminal";
      case "konsole":
        return "Konsole";
      case "xfce":
        return "XFCE Terminal";
      default:
        return "Unknown Terminal";
    }
  }

  /**
   * Check if the terminal is supported
   */
  isSupported(type: TerminalType): boolean {
    return type === "gnome";
  }
}

export default new TerminalDetector();
