import { Severity } from "./MetricsTable/types";

export const getSeverity = (
  min: number,
  max: number,
  value: number
): Severity => {
  const normalizedMin = Math.max(min, 0);
  const range = max - normalizedMin;
  const lowThreshold = normalizedMin + 0.15 * range;
  const mediumThreshold = normalizedMin + 0.5 * range;
  const highThreshold = normalizedMin + 0.85 * range;

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
