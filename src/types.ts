import type { Duration } from "./redux/services/types";

export enum FeatureFlag {
  IsHighlightsImpactEnabled,
  IsHighlightsScalingEnabled,
  AreInsightStatsEnabled,
  IsHighlightsSpanInfoEnabled,
  AreNewInstrumentationAttributesEnabled,
  IsDurationBreakdownQuantityEnabled,
  AreIssuesFiltersEnabled,
  AreSpanEnvironmentsEnabled,
  IsReportEnabled,
  AreIssuesServicesFiltersEnabled,
  AreExtendedAssetsFiltersEnabled,
  IsNewImpactScoreCalculationEnabled,
  IsMetricsReportEnabled,
  RecentActivitySpansCountEnabled,
  IsMetricsReportCriticalityEnabled,
  IsMetricsReportDataFilterEnabled,
  IsMetricsReportEndpointViewEnabled,
  AreGlobalErrorsEnabled,
  AreGlobalErrorsFiltersEnabled,
  IsErrorOccurrenceChartEnabled,
  AreGlobalErrorsCriticalityAndUnhandledFiltersEnabled,
  IsGlobalErrorPinEnabled,
  IsGlobalErrorDismissEnabled,
  IsGlobalErrorsLastDaysFilterEnabled,
  IsDurationBreakdownPercentageOfCallsEnabled,
  IsInsightSeveritySortingEnabled,
  IsHttpGetMethodSpanPercentilesHistogramEnabled,
  IsUserIdEnabled,
  IsIssuesCriticalityLevelsFilterEnabled,
  IsNewBehaviorForMetricsTimeModesEnabled
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
  SpanPerformanceAnomaly = "SpanPerformanceAnomaly",
  EndpointScaling = "EndpointScaling"
}

export enum ScopeChangeEvent {
  HistoryNavigated = "HISTORY/NAVIGATED",
  HistoryCleared = "HISTORY/CLEARED",
  JaegerSpanLinkClicked = "JAEGER/SPAN_LINK_CLICKED",
  DashboardClientSpansPerformanceImpactWidgetItemLinkClicked = "DASHBOARD/CLIENT_SPANS_PERFORMANCE_IMPACT_WIDGET_ITEM_LINK_CLICKED",
  DashboardSlowQueriesWidgetItemLinkClicked = "DASHBOARD/SLOW_QUERIES_WIDGET_ITEM_LINK_CLICKED",
  MetricsServiceSelected = "METRICS/SERVICE_SELECTED",
  MetricsEndpointSelected = "METRICS/ENDPOINT_SELECTED",
  NavigationCodeButtonMenuItemSelected = "NAVIGATION/CODE_BUTTON_MENU_ITEM_SELECTED",
  NavigationCodeButtonClicked = "NAVIGATION/CODE_BUTTON_CLICKED",
  NavigationHomeButtonClicked = "NAVIGATION/HOME_BUTTON_CLICKED",
  HighlightsTopIssuesCardAssetLinkClicked = "HIGHLIGHTS/TOP_ISSUES_CARD_ASSET_LINK_CLICKED",
  HighlightsTopIssuesCardItemClicked = "HIGHLIGHTS/TOP_ISSUES_CARD_ITEM_CLICKED",
  HighlightsPerformanceCardItemClicked = "HIGHLIGHTS/PERFORMANCE_CARD_ITEM_CLICKED",
  HighlightsImpactCardItemClicked = "HIGHLIGHTS/IMPACT_CARD_ITEM_CLICKED",
  HighlightsScalingCardItemClicked = "HIGHLIGHTS/SCALING_CARD_ITEM_CLICKED",
  InsightsInsightCardTitleAssetLinkClicked = "INSIGHTS/INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED",
  InsightsInsightCardAssetLinkClicked = "INSIGHTS/INSIGHT_CARD_ASSET_LINK_CLICKED",
  AssetsAssetCardTitleLinkClicked = "ASSETS/ASSET_CARD_TITLE_LINK_CLICKED",
  AssetsEmptyCategoryParentLinkClicked = "ASSETS/EMPTY_CATEGORY_PARENT_LINK_CLICKED",
  ErrorCardLinkClicked = "ERROR/CARD_LINK_CLICKED",
  TestsTestCardTitleLinkClicked = "TESTS/TEST_CARD_TITLE_LINK_CLICKED",
  NotificationsNotificationCardAssetLinkClicked = "NOTIFICATIONS/NOTIFICATION_CARD_ASSET_LINK_CLICKED",
  RecentActivitySpanLinkClicked = "RECENT_ACTIVITY_SPAN_LINK_CLICKED",
  IdeCodeLensClicked = "IDE/CODE_LENS_CLICKED",
  IdeNotificationLinkClicked = "IDE/NOTIFICATION_LINK_CLICKED",
  IdeRestApiCall = "IDE/REST_API_CALL"
}

export type PercentileKey = "p50" | "p95";

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
