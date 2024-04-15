import { Duration } from "../../../globals";

interface PerformancePercentileData {
  duration: Duration;
  isCritical?: boolean;
}

export type EnvironmentPerformanceData = {
  environment: {
    name: string;
    id: string;
    type: string;
  };
  p50: PerformancePercentileData;
  p95: PerformancePercentileData;
  lastCallTimeStamp: string | null;
};

export type PerformanceData = { performance: EnvironmentPerformanceData[] };

export interface GetHighlightsPerformanceDataPayload {
  query: {
    scopedSpanCodeObjectId: string | null;
    environments: string[];
  };
}
