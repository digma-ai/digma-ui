import { PERCENTILES } from "../constants";

export const getPercentileLabel = (percentile: number) =>
  PERCENTILES.find((x) => x.percentile === percentile)?.label ||
  `P${percentile * 100}`;
