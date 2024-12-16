import type { DefaultTheme } from "styled-components";

export const getInsightCriticalityColor = (
  criticality: number,
  theme: DefaultTheme
): string => {
  if (criticality < 0.2) {
    return theme.colors.v3.status.low;
  }

  if (criticality < 0.6) {
    return theme.colors.v3.status.medium;
  }

  return theme.colors.v3.status.high;
};
