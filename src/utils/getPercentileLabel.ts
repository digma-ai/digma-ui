const PERCENTILES = [
  { label: "Median", percentile: 0.5 },
  { label: "Slowest 5%", percentile: 0.95 },
];

export const getPercentileLabel = (percentile: number) =>
  PERCENTILES.find((x) => x.percentile === percentile)?.label ||
  `P${percentile * 100}`;
