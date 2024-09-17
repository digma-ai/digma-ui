import { Severity } from "./MetricsTable/types";

export const getSeverity = (
  min: number,
  max: number,
  value: number
): Severity => {
  const range = max - min;
  const lowThreshold = min + 0.15 * range;
  const mediumThreshold = min + 0.5 * range;
  const highThreshold = min + 0.85 * range;

  if (value <= lowThreshold) {
    return "Low";
  }

  if (value <= mediumThreshold) {
    return "Medium";
  }

  if (value <= highThreshold) {
    return "High";
  }

  return "Top";
};
