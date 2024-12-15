import type { Duration } from "../../../globals";
import type { EnvironmentType } from "../../common/App/types";

interface PerformancePercentileData {
  duration: Duration;
  isCritical?: boolean;
}

export interface EnvironmentPerformanceData {
  environment: {
    name: string;
    id: string;
    type: EnvironmentType;
  };
  p50: PerformancePercentileData;
  p95: PerformancePercentileData;
  lastCallTimeStamp: string | null;
}

export interface PerformanceData {
  performance: EnvironmentPerformanceData[];
}

export interface GetHighlightsPerformanceDataPayload {
  query: {
    scopedSpanCodeObjectId: string | null;
    environments: string[];
  };
}
