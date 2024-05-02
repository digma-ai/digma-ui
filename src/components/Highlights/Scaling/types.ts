import { Duration } from "../../../globals";
import { EnvironmentData } from "../TopIssues/types";

export type EnvironmentScalingData = {
  concurrency: number;
  duration: Duration;
};

export type ScalingData = {
  dataState: "noData" | "partial" | "scalingWell" | "scalingBadly";
  scaling: EnvironmentData<EnvironmentScalingData>[];
};

export interface GetHighlightsScalingDataPayload {
  query: {
    scopedSpanCodeObjectId: string | null;
    environments: string[];
  };
}
