enum PLATFORMS {
  Linux = "linux",
  Mac = "mac",
  Windows = "windows"
}

enum THEMES {
  LIGHT,
  DARK
}

export const theme = {
  fonts: {
    [PLATFORMS.Linux]: {
      main: 'system-ui, "Ubuntu", "Droid Sans", sans-serif',
      code: 'Consolas, "Courier New", monospace'
    },
    [PLATFORMS.Mac]: {
      main: "-apple-system, BlinkMacSystemFont, sans-serif",
      code: 'SF Mono", Monaco, Menlo, Courier, monospace'
    },
    [PLATFORMS.Windows]: {
      main: '"Segoe WPC", "Segoe UI", system-ui, "Ubuntu", "Droid Sans", sans-serif',
      code: '"Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace'
    }
  },
  colors: {
    [THEMES.LIGHT]: {
      system: {
        primaryBlue: "#3538cd",
        hoverBlue: "#5154ec",
        gradientBlue:
          "background: linear-gradient(90deg, #6165b2 0%, #2e2d9d 100%)"
      },
      background: {
        light: "#1e1e1e",
        dark: "#0f0f0f"
      },
      text: {
        lightText: "#dadada",
        lightTitle: "#b9C2eb",
        code: "#7891d0",
        darkLink: "#7c7c94",
        primary: "#49494d",
        gradientStroke:
          "background: linear-gradient(0deg, #1e1e1e, #1e1e1e), linear-gradient(109.83deg, #3a3d41 0.01%, rgba(0, 0, 0, 0) 102.21%)"
      },
      severity: {
        low: "#a7f4c1",
        medium: "#ffcb14",
        high: "#ff810d",
        critical: "#f93967"
      }
    },
    [THEMES.DARK]: {
      system: {
        primaryBlue: "#3538cd",
        hoverBlue: "#5154ec",
        gradientBlue:
          "background: linear-gradient(90deg, #6165b2 0%, #2e2d9d 100%)"
      },
      background: {
        light: "#fbfdff",
        dark: "#f1f5fa"
      },
      text: {
        lightText: "#b9c0d4",
        lightTitle: "#828797",
        code: "#426dda",
        darkLink: "#4d668a",
        primary: "#002d61",
        gradientStroke:
          "linear-gradient(125.97deg, #d5e4ff 17.33%, #e4eeff 85.67%), linear-gradient(0deg, #f1f5fa, #f1f5fa)"
      },
      severity: {
        low: "#1dc693",
        medium: "#e8b500",
        high: "#e06c00",
        critical: "#e00036"
      }
    }
  }
};
