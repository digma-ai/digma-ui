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
  SpanScalingBadly = "SpanScaling",
  SpanDurationBreakdown = "SpanDurationBreakdown",
  EndpointDurationSlowdown = "EndpointDurationSlowdown",
  EndpointBreakdown = "EndpointBreakdown",
  SpanScalingWell = "SpanScalingWell",
  SpanScalingInsufficientData = "SpanScalingInsufficientData",
  EndpointSessionInView = "EndpointSessionInView",
  EndpointChattyApi = "EndpointChattyApi"
}

export interface SpanInfo {
  name: string;
  displayName: string;
  instrumentationLibrary: string;
  spanCodeObjectId: string;
  methodCodeObjectId: string | null;
  kind: string | null;

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
