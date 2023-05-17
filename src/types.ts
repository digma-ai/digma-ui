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
  SpanDurationBreakdown = "SpanDurationBreakdown"
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

export interface Insight {
  category: string;
  type: InsightType;
  specifity: InsightSpecificity;
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
  decorators: {
    title: string;
    description: string;
  }[];
  environment: string;
  importance: InsightImportance;
  severity: number;
  isRecalculateEnabled: boolean;
  prefixedCodeObjectId: string | null;
  customStartTime: string | null;
  actualStartTime: string | null;
}

export interface SpanInsight extends CodeObjectInsight {
  spanInfo: SpanInfo | null;
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

export interface SpanDurationsInsight extends SpanInsight {
  name: "Performance Stats";
  type: InsightType.SpanDurations;
  category: InsightCategory.Performance;
  specifity: InsightSpecificity.OwnInsight;
  isRecalculateEnabled: true;
  periodicPercentiles: {
    percentile: number;
    currentDuration: Duration;
    previousDuration: Duration | null;
    sampleTraces: string[];
    period: string;
  }[];
  percentiles: DurationPercentileWithChange[];
  lastSpanInstanceInfo: SpanInstanceInfo | null;

  /**
   * @deprecated
   */
  spanCodeObjectId: string;
  /**
   * @deprecated
   */
  span: SpanInfo;
}
