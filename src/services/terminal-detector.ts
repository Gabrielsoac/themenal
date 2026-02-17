import { execSync } from "child_process";

export type TerminalType = "gnome" | "konsole" | "xfce" | "unknown";

class TerminalDetector {
  detect(): TerminalType {
    try {
      const colorterm = process.env.COLORTERM;
      const term = process.env.TERM;
      const termProgram = process.env.TERM_PROGRAM;

      if (colorterm === "gnome-terminal" || colorterm === "truecolor") {
        try {
          execSync("which gnome-terminal", { stdio: "pipe" });
          return "gnome";
        } catch {
        }
      }

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
      }

      if (term?.includes("konsole") || termProgram === "konsole") {
        return "konsole";
      }
      if (colorterm === "xfce4-terminal" || termProgram === "xfce4-terminal") {
        return "xfce";
      }

      return "unknown";
    } catch (error) {
      return "unknown";
    }
  }

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

  isSupported(type: TerminalType): boolean {
    return type === "gnome";
  }
}

export default new TerminalDetector();
