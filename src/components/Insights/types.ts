import { MemoExoticComponent } from "react";
import { Duration } from "../../globals";
import { InsightType, SpanInfo, SpanInstanceInfo } from "../../types";
import { Sorting } from "../common/SortingSelector/types";
import { IconProps } from "../common/icons/types";

export enum ViewMode {
  PREVIEW = "PREVIEW",
  INSIGHTS = "INSIGHTS"
}

export enum InsightsStatus {
  STARTUP = "Startup",
  DEFAULT = "Default",
  NO_INSIGHTS = "NoInsights",
  INSIGHT_PENDING = "InsightPending",
  NO_SPANS_DATA = "NoSpanData",
  NO_OBSERVABILITY = "NoObservability",
  LOADING = "Loading"
}

export type GenericCodeObjectInsight =
  | GenericFunctionInsight
  | GenericEndpointInsight
  | GenericSpanInsight;

export type GenericFunctionInsight =
  | CodeObjectHotSpotInsight
  | CodeObjectErrorsInsight;

export type GenericEndpointInsight =
  | EndpointLowUsageInsight
  | EndpointNormalUsageInsight
  | EndpointHighUsageInsight
  | EndpointSlowestSpansInsight
  | EndpointBottleneckInsight
  | SlowEndpointInsight
  | EndpointSuspectedNPlusOneInsight
  | EndpointSpanNPlusOneInsight
  | EndpointDurationSlowdownInsight
  | EndpointSlowdownSourceInsight
  | EndpointBreakdownInsight
  | SessionInViewEndpointInsight
  | ChattyApiEndpointInsight
  | EndpointHighNumberOfQueriesInsight
  | EndpointQueryOptimizationInsight;

export type GenericSpanInsight =
  | SpanDurationsInsight
  | SpanUsagesInsight
  | SpanEndpointBottleneckInsight
  | SpanDurationBreakdownInsight
  | SpanScalingBadlyInsight
  | SpanNPlusOneInsight
  | SpanScalingWellInsight
  | SpanScalingInsufficientDataInsight
  | SpanNexusInsight
  | QueryOptimizationInsight;

export interface MethodSpan {
  spanCodeObjectId: string;
  spanDisplayName: string;
}

export interface Method {
  id: string;
  name: string;
}

export interface InsightsData {
  insights: GenericCodeObjectInsight[];
  totalCount: number;
  insightsStatus: InsightsStatus; // ??  default
  viewMode: ViewMode; // Insights

  // methods: Method[]; // empty
  // assetId?: string; // remove
  // environment: string; // remove
  // serviceName: string; //
  // spans: MethodSpan[]; // to add on plugin
  // hasMissingDependency: boolean; // remove
  // canInstrumentMethod: boolean; // remove
  // needsObservabilityFix: boolean; //remove
}

export interface InsightsProps {
  data?: InsightsData;
}

export interface InsightGroup {
  insights: GenericCodeObjectInsight[];
  name?: string;
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
}

export interface InsightProps {
  onRecalculate: (insightId: string) => void;
  onRefresh: (insightType: InsightType) => void;
  onJiraTicketCreate?: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => void;
  onGoToSpan: (spanCodeObjectId: string) => void;
  isJiraHintEnabled?: boolean;
}

export interface InsightTicketInfo<T extends GenericCodeObjectInsight> {
  insight: T;
  spanCodeObjectId?: string;
}

export enum InsightScope {
  EntrySpan = "EntrySpan",
  Span = "Span",
  Function = "Function",
  ChildSpan = "ChildSpan"
}

export enum InsightCategory {
  Performance = "Performance",
  Errors = "Errors",
  Usage = "Usage"
}

export enum InsightSpecificity {
  ChildInfo = 6,
  Symptomatic = 5,
  OwnInsight = 4,
  TargetFound = 3,
  TargetAndReasonFound = 2,
  PinPoint = 1
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

export interface Trace {
  name?: string;
  id: string;
}

export interface Insight {
  category: string;
  type: InsightType;
  specifity: InsightSpecificity;
}

export interface CodeObjectDecorator {
  description: string;
  title: string;
}

export interface CodeObjectInsight extends Insight {
  shortDisplayInfo: {
    title: string;
    targetDisplayName: string;
    subtitle: string;
    description: string;
  };
  name: string;
  scope: InsightScope;
  codeObjectId: string;
  decorators: CodeObjectDecorator[] | null;
  environment: string;
  importance: InsightImportance;
  severity: number;
  isRecalculateEnabled: boolean;
  prefixedCodeObjectId: string | null;
  customStartTime: string | null;
  actualStartTime: string | null;
  criticality: number;
  impact: number;
  firstCommitId: string | null;
  lastCommitId: string | null;
  deactivatedCommitId: string | null;
  firstDetected: string | null;
  lastDetected: string | null;
  reopenCount: number;
  ticketLink: string | null;
  id: string;
  sourceSpanCodeObjectInsight: string;
}

export interface SpanInsight extends CodeObjectInsight {
  spanInfo: SpanInfo | null;
}

export interface HistogramBarData {
  index: number;
  count: number;
  start: Duration;
  end: Duration;
}

export interface NormalizedHistogramBarData extends HistogramBarData {
  normalizedCount: number;
}

export interface SpanDurationsInsight extends SpanInsight {
  name: "Performance Stats";
  type: InsightType.SpanDurations;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.OwnInsight;
  isRecalculateEnabled: true;
  percentiles: {
    percentile: number;
    currentDuration: Duration;
    previousDuration: Duration | null;
    changeTime: string | null;
    changeVerified: boolean | null;
    traceIds: string[];
  }[];
  lastSpanInstanceInfo: SpanInstanceInfo | null;
  isAsync: boolean;

  /**
   * @deprecated
   */
  spanCodeObjectId: string;
  /**
   * @deprecated
   */
  span: SpanInfo;
  histogramPlot?: {
    bars: HistogramBarData[];
    quantiles: {
      timestamp: Duration;
      quantileValue: number;
    }[];
  } | null;
  average?: Duration;
  standardDeviation?: Duration;
}

export interface FlowSpan {
  service: string;
  span: string;
  codeObjectId: string;
  spanCodeObjectId: string;
}

export interface SpanUsagesInsight extends SpanInsight {
  name: "Top Usage";
  type: InsightType.SpanUsages;
  category: InsightCategory.Usage;
  specifity: InsightSpecificity.OwnInsight;
  isRecalculateEnabled: true;
  importance: InsightImportance.Interesting;
  sampleTrace: string | null;
  flows: {
    sampleTraceIds: string[];
    percentage: number;
    firstService: FlowSpan;
    intermediateSpan: string | null;
    lastService: FlowSpan | null;
    lastServiceSpan: string | null;
  }[];

  /**
   * @deprecated
   */
  span: string;
}

interface Percentile {
  fraction: number;
  maxDuration: Duration;
}

export interface BottleneckEndpointInfo {
  endpointInfo: {
    route: string;
    instrumentationLibrary: string;
    serviceName: string;
    codeObjectId: string;
    spanCodeObjectId: string;
    spanName: string;
  };
  probabilityOfBeingBottleneck: number;
  avgDurationWhenBeingBottleneck: Duration;
  avgFractionWhenBeingBottleneck: number;
  impact: number;
  severity: number;
  criticality: number;
  requestPercentage: number;

  /**
   * @deprecated
   */
  p50: Percentile;
  /**
   * @deprecated
   */
  p95: Percentile;
  /**
   * @deprecated
   */
  p99: Percentile;
}

export interface SpanEndpointBottleneckInsight extends SpanInsight {
  name: "Bottleneck";
  type: InsightType.SpanEndpointBottleneck;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.TargetFound;
  importance: InsightImportance.Critical;
  slowEndpoints: BottleneckEndpointInfo[];

  /**
   * @deprecated
   */
  p50: Percentile;
  /**
   * @deprecated
   */
  p95: Percentile;
  /**
   * @deprecated
   */
  p99: Percentile;
  /**
   * @deprecated
   */
  span: SpanInfo;
}

export interface DurationPercentile {
  percentile: number;
  duration: Duration;
}

export interface SpanDurationBreakdownEntry {
  spanName: string;
  spanDisplayName: string;
  spanInstrumentationLibrary: string;
  spanCodeObjectId: string;
  percentiles: DurationPercentile[];
  codeObjectId: string | null;
}

export interface SpanDurationBreakdownInsight extends SpanInsight {
  name: "Span Duration Breakdown";
  type: InsightType.SpanDurationBreakdown;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.OwnInsight;
  isRecalculateEnabled: true;
  importance: InsightImportance.Info;
  breakdownEntries: SpanDurationBreakdownEntry[];

  /**
   * @deprecated
   */
  spanName: string;
  /**
   * @deprecated
   */
  spanCodeObjectId: string;
}

export interface EndpointInsight extends SpanInsight {
  route: string;
  serviceName: string;

  /**
   * @deprecated
   */
  endpointSpan: string;
  /**
   * @deprecated
   */
  spanCodeObjectId: string;
}

export interface EndpointLowUsageInsight extends EndpointInsight {
  name: "Low Usage";
  type: InsightType.LowUsage;
  category: InsightCategory.Usage;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.Info;
  decorators: CodeObjectDecorator[];
  maxCallsIn1Min: number;
}

export interface EndpointNormalUsageInsight extends EndpointInsight {
  name: "Normal Usage";
  type: InsightType.NormalUsage;
  category: InsightCategory.Usage;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.NotInteresting;
  decorators: CodeObjectDecorator[];
  maxCallsIn1Min: number;
}

export interface EndpointHighUsageInsight extends EndpointInsight {
  name: "High Usage";
  type: InsightType.HighUsage;
  category: InsightCategory.Usage;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.Interesting;
  decorators: CodeObjectDecorator[];
  maxCallsIn1Min: number;
}

/**
 * @deprecated
 */
export interface EndpointSlowestSpansInsight extends EndpointInsight {
  name: "Bottleneck Detected";
  type: InsightType.SlowestSpans;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.TargetFound;
  importance: InsightImportance.Critical;
  isRecalculateEnabled: true;
  spans: {
    spanInfo: SpanInfo;
    probabilityOfBeingBottleneck: number;
    avgDurationWhenBeingBottleneck: Duration;
    criticality: number;
    ticketLink: string | null;

    /**
     * @deprecated
     */
    p50: Percentile;
    /**
     * @deprecated
     */
    p95: Percentile;
    /**
     * @deprecated
     */
    p99: Percentile;
  }[];
}

export interface EndpointBottleneckInsight extends EndpointInsight {
  name: "Bottleneck Detected";
  type: InsightType.EndpointBottleneck;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.TargetFound;
  importance: InsightImportance.Critical;
  isRecalculateEnabled: true;
  span: {
    spanInfo: SpanInfo;
    probabilityOfBeingBottleneck: number;
    avgDurationWhenBeingBottleneck: Duration;
    avgFractionWhenBeingBottleneck: number;
    criticality: number;
    ticketLink: string | null;
    requestPercentage: number;

    /**
     * @deprecated
     */
    p50: Percentile;
    /**
     * @deprecated
     */
    p95: Percentile;
    /**
     * @deprecated
     */
    p99: Percentile;
  };
}

export interface SlowEndpointInsight extends EndpointInsight {
  name: "Slow Endpoint";
  type: InsightType.SlowEndpoint;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.Symptomatic;
  importance: InsightImportance.Critical;
  decorators: CodeObjectDecorator[];
  endpointsMedian: Duration;
  endpointsMedianOfMedians: Duration;
  endpointsP75: Duration;
  median: Duration;

  /**
   * @deprecated
   */
  endpointsMedianOfP75: Duration;
  /**
   * @deprecated
   */
  min: Duration;
  /**
   * @deprecated
   */
  max: Duration;
  /**
   * @deprecated
   */
  mean: Duration;
  /**
   * @deprecated
   */
  p75: Duration;
  /**
   * @deprecated
   */
  p95: Duration;
  /**
   * @deprecated
   */
  p99: Duration;
}

export interface RootCauseSpanInfo extends SpanInfo {
  sampleTraceId: string | null;
  flowHash: string;
}

export interface AffectedEndpoint extends SpanInfo {
  route: string;
  serviceName: string;
  sampleTraceId: string | null;
  flowHash: string;
}

export interface SpanScalingBadlyInsight extends SpanInsight {
  name: "Scaling Issue Found";
  type: InsightType.SpanScalingBadly;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.Critical;
  turningPointConcurrency: number;
  maxConcurrency: number;
  minDuration: Duration;
  maxDuration: Duration;
  rootCauseSpans: RootCauseSpanInfo[];
  affectedEndpoints: AffectedEndpoint[];
  flowHash: string | null;

  /**
   * @deprecated
   */
  spanName: string;
  /**
   * @deprecated
   */
  spanInstrumentationLibrary: string;
}

export interface NPlusOneEndpointInfo {
  endpointInfo: {
    route: string;
    instrumentationLibrary: string;
    spanCodeObjectId: string;
    entrySpanCodeObjectId: string;
    serviceName: string;
  };
  occurrences: number;
  criticality: number;
  impact: number;
  severity: number;
  traceId: string;
  duration: Duration;
  commitId: string;
  requestPercentage: number;
}

export interface SpanNPlusOneInsight extends SpanInsight {
  name: "N+1";
  type: InsightType.SpanNPlusOne;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.TargetAndReasonFound;
  importance: InsightImportance.Critical;
  occurrences: number;
  traceId: string | null;
  clientSpanName: string | null;
  clientSpanCodeObjectId: string | null;
  duration: Duration;
  endpoints: NPlusOneEndpointInfo[];

  /**
   * @deprecated
   */
  span: SpanInfo;
}

/**
 * @deprecated
 */
export interface EndpointSuspectedNPlusOneInsight extends EndpointInsight {
  name: "Suspected N+1 Query";
  type: InsightType.EndpointSpanNPlusOne;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.TargetAndReasonFound;
  importance: InsightImportance.HighlyImportant;
  isRecalculateEnabled: true;
  spans: {
    occurrences: number;
    internalSpan: SpanInfo | null;
    clientSpan: SpanInfo;
    traceId: string;
    duration: Duration;
    fraction: number;
    criticality: number;
    impact: number;
    severity: number;
    ticketLink: string | null;
  }[];
}

export interface EndpointSpanNPlusOneInsight extends EndpointInsight {
  name: "Suspected N+1 Query";
  type: InsightType.EndpointSpanNPlusOneV2;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.TargetAndReasonFound;
  importance: InsightImportance.HighlyImportant;
  isRecalculateEnabled: true;
  span: {
    occurrences: number;
    internalSpan: SpanInfo | null;
    clientSpan: SpanInfo;
    traceId: string;
    duration: Duration;
    fraction: number;
    criticality: number;
    impact: number;
    severity: number;
    ticketLink: string | null;
    requestPercentage: number;
  };
}

export interface CodeObjectHotSpotInsight extends CodeObjectInsight {
  name: "Errors Hotspot";
  type: InsightType.HotSpot;
  scope: InsightScope.Function;
  category: InsightCategory.Errors;
  specifity: InsightSpecificity.TargetFound;
  importance: InsightImportance.Critical;
  score: number;
  updatedAt: string;
}

export interface CodeObjectErrorsInsight extends CodeObjectInsight {
  name: "Errors";
  type: InsightType.Errors;
  scope: InsightScope.Function;
  category: InsightCategory.Errors;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.Interesting;
  errorCount: number;
  unhandledCount: number;
  unexpectedCount: number;
  topErrors: {
    uid: string;
    codeObjectId: string;
    errorType: string;
    sourceCodeObjectId: string;
  }[];
}

export interface EndpointSlowdownSource {
  percentile: string;
  spanInfo: SpanInfo;
  level: number;
  previousDuration: Duration;
  currentDuration: Duration;
  changeTime: string;
  changeVerified: boolean;
}

/**
 * @deprecated
 */
export type DurationSlowdownSource = EndpointSlowdownSource;

/**
 * @deprecated
 */
export interface EndpointDurationSlowdownInsight extends EndpointInsight {
  name: "Endpoint Duration Slowdown Source";
  type: InsightType.EndpointDurationSlowdown;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.Critical;
  durationSlowdownSources: DurationSlowdownSource[];
  decorators: CodeObjectDecorator[];
}

export interface EndpointSlowdownSourceInsight extends EndpointInsight {
  name: "Endpoint Slowdown Source";
  type: InsightType.EndpointSlowdownSource;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.Critical;
  endpointSlowdownSources: EndpointSlowdownSource[] | null;
  decorators: CodeObjectDecorator[];
}

export enum ComponentType {
  Internal = "Internal",
  DbQueries = "DB Queries",
  HttpClients = "HTTP Clients",
  Rendering = "Rendering"
}

export interface Component {
  type: ComponentType;
  fraction: number;
  duration: Duration | null;
}

export interface EndpointBreakdownInsight extends EndpointInsight {
  name: "Request Breakdown";
  type: InsightType.EndpointBreakdown;
  category: InsightCategory.Usage;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.Info;
  isRecalculateEnabled: true;
  components: Component[];
  p50Components: Component[] | null;
  p95Components: Component[] | null;
  hasAsyncSpans: boolean;
}

/**
 * @deprecated
 */
export interface SpanScalingWellInsight extends SpanInsight {
  name: "Scaling Well";
  type: InsightType.SpanScalingWell;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.Interesting;
  maxConcurrency: number;
  minDuration: Duration;
  maxDuration: Duration;
  flowHash: string | null;
}

/**
 * @deprecated
 */
export interface Concurrency {
  calls: number;
  meanDuration: Duration;
}

/**
 * @deprecated
 */
export interface SpanScalingInsufficientDataInsight extends SpanInsight {
  name: "Scaling Insufficient Data";
  type: InsightType.SpanScalingInsufficientData;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.OwnInsight;
  importance: InsightImportance.Interesting;
  concurrencies: Concurrency[];
}

export interface SessionInViewEndpointInsight extends EndpointInsight {
  name: "Session in View Query";
  type: InsightType.EndpointSessionInView;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.TargetAndReasonFound;
  importance: InsightImportance.HighlyImportant;
  spans: {
    renderSpan: SpanInfo;
    clientSpan: SpanInfo;
    traceId?: string;
  }[];
}

export interface ChattyApiEndpointInsight extends EndpointInsight {
  name: "HTTP Chatter";
  type: InsightType.EndpointChattyApi;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.TargetAndReasonFound;
  importance: InsightImportance.HighlyImportant;
  spans: {
    repeats: number;
    clientSpan: SpanInfo;
    traceId?: string;
  }[];
}

export interface EndpointHighNumberOfQueriesInsight extends EndpointInsight {
  type: InsightType.EndpointHighNumberOfQueries;
  queriesCount: number;
  typicalCount: number;
  traceId: string | null;
  quantile?: number;
}

export interface SpanNexusInsight extends SpanInsight {
  type: InsightType.SpanNexus;
  services: number;
  entries: number;
  flows: number;
  usage?: string | null;
  isEntriesHigh: boolean;
  isFlowsHigh: boolean;
  isServicesHigh: boolean;
}

export interface QueryOptimizationInsight extends SpanInsight {
  type: InsightType.SpanQueryOptimization;
  duration: Duration;
  typicalDuration: Duration;
  dbStatement: string;
  traceId: string | null;
  span: SpanInfo;
  serviceName: string;
  dbName: string;
  endpoints: {
    endpointInfo: {
      route: string;
      instrumentationLibrary: string;
      spanCodeObjectId: string;
      serviceName: string;
    };
  }[];
}

export interface EndpointQueryOptimizationSpan {
  spanInfo: SpanInfo;
  traceId: string;
  duration: Duration;
  criticality: number;
  impact: number;
  severity: number;
  ticketLink: string | null;
}

export interface EndpointQueryOptimizationInsight extends EndpointInsight {
  name: "Query Optimization";
  type: InsightType.EndpointQueryOptimization;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.TargetAndReasonFound;
  importance: InsightImportance.HighlyImportant;
  isRecalculateEnabled: true;
  spans: EndpointQueryOptimizationSpan[];
}

export interface InsightsQuery {
  page: number;
  sorting: Sorting;
  searchQuery: string | null;
}

export interface ScopedInsightsQuery extends InsightsQuery {
  scopedSpanCodeObjectId: string | null;
}

export { InsightType };
