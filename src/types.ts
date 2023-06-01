import { Duration } from "./globals";

export enum InsightType {
  TopErrorFlows = "TopErrorFlows",
  SpanDurationChange = "SpanDurationChange",
  SpanUsageStatus = "SpanUsageStatus",
  HotSpot = "HotSpot",
  Errors = "Errors",
  SlowEndpoint = "SlowEndpoint",
  LowUsage = "LowUsage",
  NormalUsage = "NormalUsage",
  HighUsage = "HighUsage",
  SlowestSpans = "SlowestSpans",
  EndpointSpanNPlusOne = "EndpointSpaNPlusOne",
  SpanUsages = "SpanUsages",
  SpanNPlusOne = "SpaNPlusOne",
  SpanEndpointBottleneck = "SpanEndpointBottleneck",
  SpanDurations = "SpanDurations",
  SpanScaling = "SpanScaling",
  SpanScalingRootCause = "SpanScalingRootCause",
  SpanDurationBreakdown = "SpanDurationBreakdown",
  EndpointDurationSlowdown = "EndpointDurationSlowdown"
}

export enum InsightImportance {
  Spam = 9,
  Clutter = 8,
  NotInteresting = 7,
  Info = 6,
  Interesting = 5,
  Important = 4,
  HighlyImportant = 3,
  Critical = 2,
  ShowStopper = 1
}

export interface SpanInfo {
  name: string;
  displayName: string;
  instrumentationLibrary: string;
  spanCodeObjectId: string;
  methodCodeObjectId: string | null;
  kind: string;

  /**
   * @deprecated
   */
  codeObjectId: string | null;
}

export interface DurationPercentileWithChange {
  percentile: number;
  currentDuration: Duration;
  previousDuration: Duration | null;
  changeTime: string | null;
  changeVerified: boolean | null;
  traceIds: string[];
}

export interface SpanInstanceInfo {
  traceId: string;
  spanId: string;
  startTime: string;
  duration: Duration;
}
