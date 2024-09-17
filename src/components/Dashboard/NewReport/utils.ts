import { Severity } from "./MetricsTable/types";

export const getRank = (maxImpactScore: number, value: number): Severity => {
  const rangeStep = maxImpactScore / 4;
  const rangeValue = value / rangeStep;

  if (rangeValue < 1) {
    return "Low";
  }

  if (rangeValue < 2) {
    return "Medium";
  }

  if (rangeValue < 3) {
    return "High";
  }

  return "Critical";
};

export const getChangesSeverity = (impactScore: number): Severity => {
  if (impactScore < 0) {
    return "Low";
  }

  if (impactScore > 0) {
    return "Critical";
  }

  return "Medium";
};
