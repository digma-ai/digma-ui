export const formatUnit = (value: number, unit: string, pluralForm?: string) =>
  value === 1 ? unit : (pluralForm ?? `${unit}s`);
