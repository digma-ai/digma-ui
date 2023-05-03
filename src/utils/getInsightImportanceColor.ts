import { DefaultTheme } from "styled-components";

export const getInsightImportanceColor = (
  importance: number,
  theme: DefaultTheme
): string => {
  if (importance < 3) {
    return theme.mode === "light" ? "#f93967" : "#e00036";
  }
  if (importance < 5) {
    return theme.mode === "light" ? "#e06c00" : "#ff810d";
  }
  if (importance > 7) {
    return theme.mode === "light" ? "#e8b500" : "#ffcb14";
  }

  return theme.mode === "light" ? "#1dc693" : "#67d28b";
};
