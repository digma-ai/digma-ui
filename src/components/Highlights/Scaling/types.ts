import type { Duration } from "../../../globals";
import type { InsightStatus } from "../../Insights/types";

export interface ScalingMetrics {
  concurrency: number;
  duration: Duration;
}

export interface EnvironmentScalingData {
  environmentId: string;
  environmentName: string;
  insightStatus: InsightStatus;
  criticality: number;
  metrics: ScalingMetrics;
}

export interface ScalingData {
  dataState: "NoData" | "Partial" | "ScalingWell" | "ScalingBadly";
  scaling: EnvironmentScalingData[];
}

export interface GetHighlightsScalingDataPayload {
  query: {
    scopedSpanCodeObjectId: string | null;
    environments: string[];
  };
}
