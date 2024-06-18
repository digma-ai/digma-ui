import { Duration } from "../../../globals";
import { EnvironmentData } from "../TopIssues/types";

export interface EnvironmentScalingData {
  concurrency: number;
  duration: Duration;
}

export interface ScalingData {
  dataState: "NoData" | "Partial" | "ScalingWell" | "ScalingBadly";
  scaling: EnvironmentData<EnvironmentScalingData>[];
}

export interface GetHighlightsScalingDataPayload {
  query: {
    scopedSpanCodeObjectId: string | null;
    environments: string[];
  };
}
