import { DefaultTheme } from "styled-components";

export const getInsightCriticalityColor = (
  criticality: number,
  theme: DefaultTheme
): string | undefined => {
  if (criticality < 0.2) {
    switch (theme.mode) {
      case "light":
        return "#1dc693";
      case "dark":
      case "dark-jetbrains":
        return "#67d28b";
    }
  }

  if (criticality < 0.6) {
    switch (theme.mode) {
      case "light":
        return "#e8b500";
      case "dark":
      case "dark-jetbrains":
        return "#ffcb14";
    }
  }

  switch (theme.mode) {
    case "light":
      return "#e00036";
    case "dark":
    case "dark-jetbrains":
      return "#f93967";
  }
};
