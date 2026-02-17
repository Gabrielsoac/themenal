import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { Theme } from "../interfaces/theme.js";


function applyToGnome(theme: Theme): void {
  try {
    const currentProfile = execSync(
      "dconf read /org/gnome/terminal/legacy/profiles:/default"
    )
      .toString()
      .trim()
      .replace(/'/g, "");

    const newThemeUUID = randomUUID();

    const existingThemes = execSync(
      "dconf read /org/gnome/terminal/legacy/profiles:/list"
    ).toString();

    const parsedExistingThemes: Array<string> = JSON.parse(
      existingThemes
        .replace(/'/g, '"')
        .replace(/^\[|\]$/g, (m) => (m === "[" ? "[" : "]"))
    );

    parsedExistingThemes.push(newThemeUUID);

    execSync(
      `dconf write /org/gnome/terminal/legacy/profiles:/list "${JSON.stringify(
        parsedExistingThemes
      ).replace(/"/g, "'")}"`
    );

    const dump = execSync(
      `dconf dump /org/gnome/terminal/legacy/profiles:/:${currentProfile}/`
    ).toString();

    execSync(
      `echo "${dump}" | dconf load /org/gnome/terminal/legacy/profiles:/:${newThemeUUID}/`
    );

    const base = `/org/gnome/terminal/legacy/profiles:/:${newThemeUUID}`;

    const palette = [
      theme.black,
      theme.red,
      theme.green,
      theme.yellow,
      theme.blue,
      theme.magenta,
      theme.cyan,
      theme.white,
      theme.brightBlack,
      theme.brightRed,
      theme.brightGreen,
      theme.brightYellow,
      theme.brightBlue,
      theme.brightMagenta,
      theme.brightCyan,
      theme.brightWhite,
    ];

    execSync(`dconf write ${base}/background-color "'${theme.background}'"`);
    execSync(`dconf write ${base}/foreground-color "'${theme.foreground}'"`);

    execSync(
      `dconf write ${base}/palette "${JSON.stringify(palette).replace(
        /"/g,
        "'"
      )}"`
    );

    execSync(
      `dconf write /org/gnome/terminal/legacy/profiles:/default "'${newThemeUUID}'"`
    );

    console.log(`✔ New profile created: ${newThemeUUID}`);
    console.log("✔ GNOME Terminal theme applied successfully!");
    console.log("✔ Please open a new terminal window to see the changes.");
  } catch (error: any) {
    console.error("Error applying theme to GNOME Terminal:");
    console.error(error.message);
    throw error;
  }
}

const applyTheme = {
  gnome: applyToGnome,
};

export default applyTheme;

