import { SpanInstanceInfo } from "../../../types";
import { PercentileDurations, Plot } from "../../Insights/types";

export type EnvironmentPerformanceData = {
  environment: string;
  percentiles: PercentileDurations[];
  lastSpanInstanceInfo: SpanInstanceInfo | null;
  histogramPlot: Plot | null;
};

export type PerformanceData = EnvironmentPerformanceData[];

export interface GetHighlightsPerformanceDataPayload {
  query: {
    scopedSpanCodeObjectId: string | null;
    environments: string[];
  };
}
