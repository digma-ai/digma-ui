export const getCriticalityLabel = (criticality: number) => {
  if (criticality === 0) {
    return "N/A";
  }

  if (criticality < 0.3) {
    return "Low";
  }

  if (criticality < 0.7) {
    return "Medium";
  }

  return "High";
};
