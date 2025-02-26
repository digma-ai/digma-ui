import type { Duration } from "./globals";

export enum FeatureFlag {
  IS_HIGHLIGHTS_IMPACT_ENABLED,
  IS_HIGHLIGHTS_SCALING_ENABLED,
  ARE_INSIGHT_STATS_ENABLED,
  IS_HIGHLIGHTS_SPAN_INFO_ENABLED,
  ARE_NEW_INSTRUMENTATION_ATTRIBUTES_ENABLED,
  IS_DURATION_BREAKDOWN_QUANTITY_ENABLED,
  ARE_ISSUES_FILTERS_ENABLED,
  ARE_SPAN_ENVIRONMENTS_ENABLED,
  IS_REPORT_ENABLED,
  ARE_ISSUES_SERVICES_FILTERS_ENABLED,
  ARE_EXTENDED_ASSETS_FILTERS_ENABLED,
  IS_NEW_IMPACT_SCORE_CALCULATION_ENABLED,
  IS_METRICS_REPORT_ENABLED,
  RECENT_ACTIVITY_SPANS_COUNT_ENABLED,
  IS_METRICS_REPORT_CRITICALITY_ENABLED,
  IS_METRICS_REPORT_DATA_FILTER_ENABLED,
  IS_METRICS_REPORT_ENDPOINT_VIEW_ENABLED,
  ARE_GLOBAL_ERRORS_ENABLED,
  ARE_GLOBAL_ERRORS_FILTERS_ENABLED,
  IS_ERROR_OCCURRENCE_CHART_ENABLED,
  ARE_GLOBAL_ERRORS_CRITICALITY_AND_UNHANDLED_FILTERS_ENABLED,
  IS_GLOBAL_ERROR_PIN_ENABLED,
  IS_GLOBAL_ERROR_DISMISS_ENABLED,
  IS_GLOBAL_ERROR_LAST_DAYS_FILTER_ENABLED,
  IS_DURATION_BREAKDOWN_PERCENTAGE_OF_CALLS_ENABLED,
  IS_INSIGHT_SEVERITY_SORTING_ENABLED,
  IS_HTTP_GET_METHOD_SPAN_PERCENTILES_HISTOGRAM_ENABLED,
  IS_USER_ID_ENABLED,
  IS_ISSUES_CRITICALITY_LEVELS_FILTER_ENABLED
}

export enum InsightType {
  TopErrorFlows = "TopErrorFlows",
  HotSpot = "HotSpot",
  Errors = "Errors",
  SlowEndpoint = "SlowEndpoint",
  LowUsage = "LowUsage",
  NormalUsage = "NormalUsage",
  HighUsage = "HighUsage",
  EndpointBottleneck = "EndpointBottleneck",
  EndpointSpanNPlusOne = "EndpointSpanNPlusOne",
  SpanUsages = "SpanUsages",
  SpaNPlusOne = "SpaNPlusOne",
  SpanEndpointBottleneck = "SpanEndpointBottleneck",
  SpanDurations = "SpanDurations",
  SpanScaling = "SpanScaling",
  SpanDurationBreakdown = "SpanDurationBreakdown",
  EndpointBreakdown = "EndpointBreakdown",
  SpanScalingWell = "SpanScalingWell",
  SpanScalingInsufficientData = "SpanScalingInsufficientData",
  EndpointSessionInView = "EndpointSessionInView",
  EndpointChattyApiV2 = "EndpointChattyApiV2",
  EndpointHighNumberOfQueries = "EndpointHighNumberOfQueries",
  SpanNexus = "SpanNexus",
  SpanQueryOptimization = "SpanQueryOptimization",
  EndpointQueryOptimizationV2 = "EndpointQueryOptimizationV2",
  EndpointSlowdownSource = "EndpointSlowdownSource",
  SpanPerformanceAnomaly = "SpanPerformanceAnomaly"
}

export enum SCOPE_CHANGE_EVENTS {
  HISTORY_NAVIGATED = "HISTORY/NAVIGATED",
  HISTORY_CLEARED = "HISTORY/CLEARED",
  JAEGER_SPAN_LINK_CLICKED = "JAEGER/SPAN_LINK_CLICKED",
  DASHBOARD_CLIENT_SPANS_PERFORMANCE_IMPACT_WIDGET_ITEM_LINK_CLICKED = "DASHBOARD/CLIENT_SPANS_PERFORMANCE_IMPACT_WIDGET_ITEM_LINK_CLICKED",
  DASHBOARD_SLOW_QUERIES_WIDGET_ITEM_LINK_CLICKED = "DASHBOARD/SLOW_QUERIES_WIDGET_ITEM_LINK_CLICKED",
  NAVIGATION_CODE_BUTTON_MENU_ITEM_SELECTED = "NAVIGATION/CODE_BUTTON_MENU_ITEM_SELECTED",
  NAVIGATION_CODE_BUTTON_CLICKED = "NAVIGATION/CODE_BUTTON_CLICKED",
  NAVIGATION_HOME_BUTTON_CLICKED = "NAVIGATION/HOME_BUTTON_CLICKED",
  HIGHLIGHTS_TOP_ISSUES_CARD_ASSET_LINK_CLICKED = "HIGHLIGHTS/TOP_ISSUES_CARD_ASSET_LINK_CLICKED",
  HIGHLIGHTS_TOP_ISSUES_CARD_ITEM_CLICKED = "HIGHLIGHTS/TOP_ISSUES_CARD_ITEM_CLICKED",
  HIGHLIGHTS_PERFORMANCE_CARD_ITEM_CLICKED = "HIGHLIGHTS/PERFORMANCE_CARD_ITEM_CLICKED",
  HIGHLIGHTS_IMPACT_CARD_ITEM_CLICKED = "HIGHLIGHTS/IMPACT_CARD_ITEM_CLICKED",
  HIGHLIGHTS_SCALING_CARD_ITEM_CLICKED = "HIGHLIGHTS/SCALING_CARD_ITEM_CLICKED",
  INSIGHTS_INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED = "INSIGHTS/INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED",
  INSIGHTS_INSIGHT_CARD_ASSET_LINK_CLICKED = "INSIGHTS/INSIGHT_CARD_ASSET_LINK_CLICKED",
  ASSETS_ASSET_CARD_TITLE_LINK_CLICKED = "ASSETS/ASSET_CARD_TITLE_LINK_CLICKED",
  TESTS_TEST_CARD_TITLE_LINK_CLICKED = "TESTS/TEST_CARD_TITLE_LINK_CLICKED",
  NOTIFICATIONS_NOTIFICATION_CARD_ASSET_LINK_CLICKED = "NOTIFICATIONS/NOTIFICATION_CARD_ASSET_LINK_CLICKED",
  RECENT_ACTIVITY_SPAN_LINK_CLICKED = "RECENT_ACTIVITY_SPAN_LINK_CLICKED",
  IDE_CODE_LENS_CLICKED = "IDE/CODE_LENS_CLICKED",
  IDE_NOTIFICATION_LINK_CLICKED = "IDE/NOTIFICATION_LINK_CLICKED",
  IDE_REST_API_CALL = "IDE/REST_API_CALL",
  ASSETS_EMPTY_CATEGORY_PARENT_LINK_CLICKED = "ASSETS/EMPTY_CATEGORY_PARENT_LINK_CLICKED",
  METRICS_SERVICE_SELECTED = "METRICS/SERVICE_SELECTED",
  METRICS_ENDPOINT_SELECTED = "METRICS/ENDPOINT_SELECTED",
  ERROR_CARD_LINK_CLICKED = "ERROR/CARD_LINK_CLICKED"
}

export type PercentileKey = "p50" | "p95";

export interface SpanInfo {
  name: string;
  displayName: string;
  instrumentationLibrary: string;
  spanCodeObjectId: string;
  methodCodeObjectId: string | null;
  kind: string | null;
  uid?: string;
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

export interface SendPluginEventPayload {
  name: string;
  payload?: Record<string, unknown>;
}
