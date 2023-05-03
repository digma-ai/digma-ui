import { DefaultTheme } from "styled-components";

export const getInsightImportanceColor = (
  importance: number,
  theme: DefaultTheme
): string | undefined => {
  if (importance === 0) {
    return undefined;
  }

  if (importance < 3) {
    switch (theme.mode) {
      case "light":
        return "#f93967";
      case "dark":
      case "dark-jetbrains":
        return "#e00036";
    }
  }
  if (importance < 5) {
    switch (theme.mode) {
      case "light":
        return "#e06c00";
      case "dark":
      case "dark-jetbrains":
        return "#ff810d";
    }
  }
  if (importance > 7) {
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
      return "#1dc693";
    case "dark":
    case "dark-jetbrains":
      return "#67d28b";
  }
};
