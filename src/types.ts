import { Duration } from "./globals";

export enum FeatureFlag {
  IS_HIGHLIGHTS_IMPACT_ENABLED,
  IS_HIGHLIGHTS_SCALING_ENABLED,
  ARE_INSIGHT_STATS_ENABLED,
  IS_HIGHLIGHTS_SPAN_INFO_ENABLED,
  ARE_NEW_INSTRUMENTATION_ATTRIBUTES_ENABLED,
  IS_DURATION_BREAKDOWN_QUANTITY_ENABLED
}

export enum InsightType {
  TopErrorFlows = "TopErrorFlows",
  HotSpot = "HotSpot",
  Errors = "Errors",
  SlowEndpoint = "SlowEndpoint",
  LowUsage = "LowUsage",
  NormalUsage = "NormalUsage",
  HighUsage = "HighUsage",
  SlowestSpans = "SlowestSpans", // deprecated - safe to delete after 2024-06-05
  EndpointBottleneck = "EndpointBottleneck",
  EndpointSpaNPlusOne = "EndpointSpaNPlusOne", // deprecated - safe to delete after 2024-06-05
  EndpointSpanNPlusOne = "EndpointSpanNPlusOne",
  SpanUsages = "SpanUsages",
  SpaNPlusOne = "SpaNPlusOne",
  SpanEndpointBottleneck = "SpanEndpointBottleneck",
  SpanDurations = "SpanDurations",
  SpanScaling = "SpanScaling",
  SpanDurationBreakdown = "SpanDurationBreakdown",
  EndpointDurationSlowdown = "EndpointDurationSlowdown", // deprecated - safe to delete after 2024-06-05
  EndpointBreakdown = "EndpointBreakdown",
  SpanScalingWell = "SpanScalingWell",
  SpanScalingInsufficientData = "SpanScalingInsufficientData",
  EndpointSessionInView = "EndpointSessionInView",
  EndpointChattyApi = "EndpointChattyApi", // deprecated - safe to delete after 2024-06-05
  EndpointChattyApiV2 = "EndpointChattyApiV2",
  EndpointHighNumberOfQueries = "EndpointHighNumberOfQueries",
  SpanNexus = "SpanNexus",
  SpanQueryOptimization = "SpanQueryOptimization",
  EndpointQueryOptimization = "EndpointQueryOptimization", // deprecated to delete after 2024-06-05
  EndpointQueryOptimizationV2 = "EndpointQueryOptimizationV2",
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

export interface GetInsightStatsPayload {
  scope: {
    span: {
      spanCodeObjectId: string;
    };
  } | null;
}

export interface ChangeEnvironmentPayload {
  environment: string;
}

export interface ChangeScopePayload {
  span: {
    spanCodeObjectId: string;
  } | null;
  forceNavigation?: boolean;
}

export interface ChangeViewPayload {
  view: string;
  isUserAction?: boolean;
}
