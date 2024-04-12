import { View } from "./components/Main/types";
import { Environment } from "./components/common/App/types";
import { Duration } from "./globals";

export enum FeatureFlag {
  IS_DASHBOARD_CLIENT_SPANS_OVERALL_IMPACT_ENABLED,
  IS_ASSETS_SERVICE_FILTER_VISIBLE,
  IS_ASSETS_OVERALL_IMPACT_HIDDEN,
  IS_INSIGHT_TICKET_LINKAGE_ENABLED,
  IS_ASSETS_COMPLEX_FILTER_ENABLED,
  IS_INSIGHT_DISMISSAL_ENABLED,
  IS_RECALCULATE_BUBBLE_ENABLED,
  IS_ANALYTICS_TAB_VISIBLE,
  IS_INSIGHT_MARKING_AS_READ_ENABLED,
  IS_HIGHLIGHTS_TAB_VISIBLE
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
  environment: Environment;
}

export interface ChangeScopePayload {
  span: {
    spanCodeObjectId: string;
  } | null;
}

export interface ChangeViewPayload {
  view: View;
}
