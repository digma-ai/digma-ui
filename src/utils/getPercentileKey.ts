import { PERCENTILES } from "../constants";
import { PercentileKey } from "../types";

export const getPercentileKey = (percentile: number): PercentileKey | null =>
  PERCENTILES.find((x) => x.percentile === percentile)?.key || null;
