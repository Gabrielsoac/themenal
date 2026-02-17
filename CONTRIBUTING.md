# Contributing to Themenal

First off, thank you for considering contributing to Themenal! It's people like you that make Themenal such a great tool.

## 🌟 Ways to Contribute

- **Add new themes**: Share your beautiful color schemes
- **Terminal support**: Help add support for more terminal emulators
- **Bug fixes**: Fix issues and improve stability
- **Documentation**: Improve or translate documentation
- **Features**: Propose and implement new features

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- Git
- A Debian/Ubuntu system (for testing terminal themes)
- GNOME Terminal installed

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/therminal.git
   cd therminal
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Gabrielsoac/therminal.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Build the project**:
   ```bash
   npm run build
   ```

6. **Link for local testing**:
   ```bash
   npm link
   ```

Now you can run `themenal` commands and they'll use your local development version!

## 🎨 Adding a New Theme

Adding a new theme is one of the easiest and most impactful ways to contribute!

### Step 1: Create the Theme File

Create a new YAML file in `src/themes/`:

```bash
touch src/themes/your-theme-name.yml
```

### Step 2: Define Your Theme

Use this template and replace with your colors:

```yaml
background: "#282a36"
foreground: "#f8f8f2"
black: "#21222c"
red: "#ff5555"
green: "#50fa7b"
yellow: "#f1fa8c"
blue: "#bd93f9"
magenta: "#ff79c6"
cyan: "#8be9fd"
white: "#f8f8f2"
brightBlack: "#6272a4"
brightRed: "#ff6e6e"
brightGreen: "#69ff94"
brightYellow: "#ffffa5"
brightBlue: "#d6acff"
brightMagenta: "#ff92df"
brightCyan: "#a4ffff"
brightWhite: "#ffffff"
```

**Important**: 
- All 18 color fields are required
- Colors must be in hex format (`#RRGGBB`)
- Use lowercase for field names (camelCase for bright colors)

### Step 3: Test Your Theme

```bash
# Build the project
npm run build

# Preview your theme
themenal preview your-theme-name

# Apply it to test
themenal apply your-theme-name
```

Open a new terminal window to see the results!

### Step 4: Submit Your Theme

1. **Create a new branch**:
   ```bash
   git checkout -b add-your-theme-name
   ```

2. **Commit your theme**:
   ```bash
   git add src/themes/your-theme-name.yml
   git commit -m "Add your-theme-name theme"
   ```

3. **Push to your fork**:
   ```bash
   git push origin add-your-theme-name
   ```

4. **Open a Pull Request** on GitHub with:
   - A clear title: "Add [Theme Name] theme"
   - A description of the theme
   - A screenshot showing the theme applied (optional but appreciated!)

## 💻 Code Contributions

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Project Structure

```
src/
├── cli/
│   ├── commands/          # Each command is a separate file
│   │   ├── apply.ts
│   │   ├── current.ts
│   │   ├── generate.ts
│   │   ├── list.ts
│   │   └── preview.ts
│   └── index.ts           # CLI setup and command registration
├── interfaces/
│   └── theme.ts           # TypeScript interfaces
├── services/
│   ├── applyTheme.ts      # Theme application logic
│   ├── config-manager.ts  # Configuration management
│   ├── terminal-detector.ts # Terminal detection
│   └── theme-loader.ts    # Theme loading and validation
└── themes/                # Theme YAML files
```

### Making Code Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Edit the code
   - Test thoroughly
   - Build: `npm run build`

3. **Test your changes**:
   ```bash
   npm link
   # Test all relevant commands
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Clear description of your changes"
   ```

5. **Push and create a Pull Request**

## 🔧 Adding Terminal Support

Want to add support for a new terminal emulator? Great!

### Requirements

- Knowledge of how the terminal stores its configuration
- Ability to test on that terminal

### Steps

1. **Update `terminal-detector.ts`**:
   - Add detection logic for the new terminal
   - Add the terminal type to the enum

2. **Update `applyTheme.ts`**:
   - Add a new function to apply themes to your terminal
   - Handle the terminal-specific configuration format

3. **Test thoroughly** on the target terminal

4. **Update documentation** to mention the new support

## 📝 Pull Request Guidelines

### Before Submitting

- ✅ Test your changes thoroughly
- ✅ Ensure `npm run build` completes without errors
- ✅ Follow the existing code style
- ✅ Update documentation if needed

### PR Description Should Include

- **What**: What changes did you make?
- **Why**: Why are these changes necessary?
- **How**: How did you implement the changes?
- **Testing**: How did you test the changes?

### Example PR Title

- ✅ "Add Gruvbox Dark theme"
- ✅ "Fix theme loading on case-sensitive systems"
- ✅ "Add support for Konsole terminal"
- ❌ "Update"
- ❌ "Fix bug"

## 🐛 Reporting Bugs

### Before Creating an Issue

- Check if the issue already exists
- Make sure you're using the latest version
- Try to reproduce the bug

### Creating a Good Bug Report

Include:
1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - OS version
   - Terminal emulator and version
   - Node.js version
   - Themenal version

## 💡 Suggesting Features

We love feature suggestions! Please:

1. Check if it's already been suggested
2. Explain the use case
3. Describe how it would work
4. Consider if it fits the project's scope

## 🤔 Questions?

- Open a GitHub Discussion
- Create an issue with the "question" label

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Themenal! 🎉
