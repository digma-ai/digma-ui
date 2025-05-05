import type { ValueLabel } from "./types";

export const getValueLabel = (value: number): ValueLabel => {
  if (value < 0.2) {
    return "Low";
  }

  if (value < 0.6) {
    return "Medium";
  }

  return "High";
};
