import { Duration } from "./globals";

export enum FeatureFlag {
  IS_DASHBOARD_CLIENT_SPANS_OVERALL_IMPACT_ENABLED,
  IS_ASSETS_SERVICE_FILTER_VISIBLE,
  IS_ASSETS_OVERALL_IMPACT_HIDDEN,
  IS_INSIGHT_TICKET_LINKAGE_ENABLED,
  IS_ASSETS_COMPLEX_FILTER_ENABLED,
  IS_INSIGHT_DISMISSAL_ENABLED,
  IS_ANALYTICS_TAB_VISIBLE
}

export enum InsightType {
  TopErrorFlows = "TopErrorFlows",
  HotSpot = "HotSpot",
  Errors = "Errors",
  SlowEndpoint = "SlowEndpoint",
  LowUsage = "LowUsage",
  NormalUsage = "NormalUsage",
  HighUsage = "HighUsage",
  SlowestSpans = "SlowestSpans", // deprecated
  EndpointBottleneck = "EndpointBottleneck",
  EndpointSpanNPlusOne = "EndpointSpaNPlusOne", // deprecated
  EndpointSpanNPlusOneV2 = "EndpointSpanNPlusOne",
  SpanUsages = "SpanUsages",
  SpanNPlusOne = "SpaNPlusOne",
  SpanEndpointBottleneck = "SpanEndpointBottleneck",
  SpanDurations = "SpanDurations",
  SpanScalingBadly = "SpanScaling",
  SpanDurationBreakdown = "SpanDurationBreakdown",
  EndpointDurationSlowdown = "EndpointDurationSlowdown", // deprecated
  EndpointBreakdown = "EndpointBreakdown",
  SpanScalingWell = "SpanScalingWell", // deprecated
  SpanScalingInsufficientData = "SpanScalingInsufficientData", // deprecated
  EndpointSessionInView = "EndpointSessionInView",
  EndpointChattyApi = "EndpointChattyApi",
  EndpointHighNumberOfQueries = "EndpointHighNumberOfQueries",
  SpanNexus = "SpanNexus",
  SpanQueryOptimization = "SpanQueryOptimization",
  EndpointQueryOptimization = "EndpointQueryOptimization",
  EndpointSlowdownSource = "EndpointSlowdownSource"
}

export type PercentileKey = "p50" | "p95";

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

export interface SpanInstanceInfo {
  traceId: string;
  spanId: string;
  startTime: string;
  duration: Duration;
}

export interface SetObservabilityPayload {
  isObservabilityEnabled: boolean;
}

export interface OpenInstallationWizardPayload {
  skipInstallationStep: boolean;
}
