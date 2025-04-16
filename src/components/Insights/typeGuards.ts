import { InsightType } from "../../types";
import type {
  CodeObjectErrorsInsight,
  CodeObjectHotSpotInsight,
  CodeObjectInsight,
  EndpointBottleneckInsight,
  EndpointBreakdownInsight,
  EndpointChattyApiV2Insight,
  EndpointHighNumberOfQueriesInsight,
  EndpointHighUsageInsight,
  EndpointInsight,
  EndpointLowUsageInsight,
  EndpointNormalUsageInsight,
  EndpointQueryOptimizationV2Insight,
  EndpointScalingInsight,
  EndpointSessionInViewInsight,
  EndpointSlowdownSourceInsight,
  EndpointSpanNPlusOneInsight,
  GenericFunctionInsight,
  SlowEndpointInsight,
  SpaNPlusOneInsight,
  SpanDurationBreakdownInsight,
  SpanDurationsInsight,
  SpanEndpointBottleneckInsight,
  SpanInsight,
  SpanNexusInsight,
  SpanPerformanceAnomalyInsight,
  SpanQueryOptimizationInsight,
  SpanScalingInsight,
  SpanScalingInsufficientDataInsight,
  SpanScalingWellInsight,
  SpanUsagesInsight
} from "./types";
import { InsightScope } from "./types";

export const isFunctionInsight = (
  insight: CodeObjectInsight
): insight is GenericFunctionInsight => insight.scope === InsightScope.Function;

export const isSpanInsight = (
  insight: CodeObjectInsight
): insight is SpanInsight => insight.scope === InsightScope.Span;

export const isEndpointInsight = (
  insight: CodeObjectInsight
): insight is EndpointInsight => insight.scope === InsightScope.EntrySpan;

export const isSpanDurationsInsight = (
  insight: CodeObjectInsight
): insight is SpanDurationsInsight =>
  insight.type === InsightType.SpanDurations;

export const isSpanDurationBreakdownInsight = (
  insight: CodeObjectInsight
): insight is SpanDurationBreakdownInsight =>
  insight.type === InsightType.SpanDurationBreakdown;

export const isSpanUsagesInsight = (
  insight: CodeObjectInsight
): insight is SpanUsagesInsight => insight.type === InsightType.SpanUsages;

export const isSpanEndpointBottleneckInsight = (
  insight: CodeObjectInsight
): insight is SpanEndpointBottleneckInsight =>
  insight.type === InsightType.SpanEndpointBottleneck;

export const isEndpointLowUsageInsight = (
  insight: CodeObjectInsight
): insight is EndpointLowUsageInsight => insight.type === InsightType.LowUsage;

export const isEndpointNormalUsageInsight = (
  insight: CodeObjectInsight
): insight is EndpointNormalUsageInsight =>
  insight.type === InsightType.NormalUsage;

export const isEndpointHighUsageInsight = (
  insight: CodeObjectInsight
): insight is EndpointHighUsageInsight =>
  insight.type === InsightType.HighUsage;

export const isEndpointBottleneckInsight = (
  insight: CodeObjectInsight
): insight is EndpointBottleneckInsight =>
  insight.type === InsightType.EndpointBottleneck;

export const isSlowEndpointInsight = (
  insight: CodeObjectInsight
): insight is SlowEndpointInsight => insight.type === InsightType.SlowEndpoint;

export const isSpanNPlusOneInsight = (
  insight: CodeObjectInsight
): insight is SpaNPlusOneInsight => insight.type === InsightType.SpaNPlusOne;

export const isEndpointSpanNPlusOneInsight = (
  insight: CodeObjectInsight
): insight is EndpointSpanNPlusOneInsight =>
  insight.type === InsightType.EndpointSpanNPlusOne;

export const isEndpointQueryOptimizationV2Insight = (
  insight: CodeObjectInsight
): insight is EndpointQueryOptimizationV2Insight =>
  insight.type === InsightType.EndpointQueryOptimizationV2;

export const isSpanScalingBadlyInsight = (
  insight: CodeObjectInsight
): insight is SpanScalingInsight => insight.type === InsightType.SpanScaling;

export const isCodeObjectErrorsInsight = (
  insight: CodeObjectInsight
): insight is CodeObjectErrorsInsight => insight.type === InsightType.Errors;

export const isCodeObjectHotSpotInsight = (
  insight: CodeObjectInsight
): insight is CodeObjectHotSpotInsight => insight.type === InsightType.HotSpot;

export const isEndpointSlowdownSourceInsight = (
  insight: CodeObjectInsight
): insight is EndpointSlowdownSourceInsight =>
  insight.type === InsightType.EndpointSlowdownSource;

export const isEndpointBreakdownInsight = (
  insight: CodeObjectInsight
): insight is EndpointBreakdownInsight =>
  insight.type === InsightType.EndpointBreakdown;

export const isSpanScalingWellInsight = (
  insight: CodeObjectInsight
): insight is SpanScalingWellInsight =>
  insight.type === InsightType.SpanScalingWell;

export const isSpanScalingInsufficientDataInsight = (
  insight: CodeObjectInsight
): insight is SpanScalingInsufficientDataInsight =>
  insight.type === InsightType.SpanScalingInsufficientData;

export const isSessionInViewEndpointInsight = (
  insight: CodeObjectInsight
): insight is EndpointSessionInViewInsight =>
  insight.type === InsightType.EndpointSessionInView;

export const isEndpointChattyApiV2Insight = (
  insight: CodeObjectInsight
): insight is EndpointChattyApiV2Insight =>
  insight.type === InsightType.EndpointChattyApiV2;

export const isEndpointHighNumberOfQueriesInsight = (
  insight: CodeObjectInsight
): insight is EndpointHighNumberOfQueriesInsight =>
  insight.type === InsightType.EndpointHighNumberOfQueries;

export const isSpanNexusInsight = (
  insight: CodeObjectInsight
): insight is SpanNexusInsight => insight.type === InsightType.SpanNexus;

export const isSpanQueryOptimizationInsight = (
  insight: CodeObjectInsight
): insight is SpanQueryOptimizationInsight =>
  insight.type === InsightType.SpanQueryOptimization;

export const isSpanPerformanceAnomalyInsight = (
  insight: CodeObjectInsight
): insight is SpanPerformanceAnomalyInsight =>
  insight.type === InsightType.SpanPerformanceAnomaly;

export const isEndpointScalingInsight = (
  insight: CodeObjectInsight
): insight is EndpointScalingInsight =>
  insight.type === InsightType.EndpointScaling;
