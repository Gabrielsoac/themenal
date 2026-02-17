import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { Theme } from "../interfaces/theme.js";

/**
 * Apply theme to GNOME Terminal
 * Creates a new terminal profile with the theme colors and sets it as default
 */
function applyToGnome(theme: Theme): void {
  try {
    // Get the current default profile UUID
    const currentProfile = execSync(
      "dconf read /org/gnome/terminal/legacy/profiles:/default"
    )
      .toString()
      .trim()
      .replace(/'/g, "");

    // Generate a new UUID for the theme profile
    const newThemeUUID = randomUUID();

    // Get existing profiles list
    const existingThemes = execSync(
      "dconf read /org/gnome/terminal/legacy/profiles:/list"
    ).toString();

    // Parse existing themes array
    const parsedExistingThemes: Array<string> = JSON.parse(
      existingThemes
        .replace(/'/g, '"')
        .replace(/^\[|\]$/g, (m) => (m === "[" ? "[" : "]"))
    );

    // Add new theme UUID to the list
    parsedExistingThemes.push(newThemeUUID);

    // Update the profiles list
    execSync(
      `dconf write /org/gnome/terminal/legacy/profiles:/list "${JSON.stringify(
        parsedExistingThemes
      ).replace(/"/g, "'")}"`
    );

    // Dump current profile settings
    const dump = execSync(
      `dconf dump /org/gnome/terminal/legacy/profiles:/:${currentProfile}/`
    ).toString();

    // Load settings into new profile
    execSync(
      `echo "${dump}" | dconf load /org/gnome/terminal/legacy/profiles:/:${newThemeUUID}/`
    );

    // Base path for profile settings
    const base = `/org/gnome/terminal/legacy/profiles:/:${newThemeUUID}`;

    // Build color palette array in the correct order
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

    // Apply background and foreground colors
    execSync(`dconf write ${base}/background-color "'${theme.background}'"`);
    execSync(`dconf write ${base}/foreground-color "'${theme.foreground}'"`);

    // Apply color palette
    execSync(
      `dconf write ${base}/palette "${JSON.stringify(palette).replace(
        /"/g,
        "'"
      )}"`
    );

    // Set the new profile as default
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

/**
 * Theme application service
 * Provides functions to apply themes to different terminal emulators
 */
const applyTheme = {
  gnome: applyToGnome,
};

export default applyTheme;

