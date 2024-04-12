import { InsightType } from "../../types";
import {
  CodeObjectErrorsInsight,
  CodeObjectHotSpotInsight,
  CodeObjectInsight,
  EndpointBottleneckInsight,
  EndpointBreakdownInsight,
  EndpointChattyApiInsight,
  EndpointChattyApiV2Insight,
  EndpointDurationSlowdownInsight,
  EndpointHighNumberOfQueriesInsight,
  EndpointHighUsageInsight,
  EndpointInsight,
  EndpointLowUsageInsight,
  EndpointNormalUsageInsight,
  EndpointQueryOptimizationInsight,
  EndpointQueryOptimizationV2Insight,
  EndpointSessionInViewInsight,
  EndpointSlowdownSourceInsight,
  EndpointSlowestSpansInsight,
  EndpointSpanNPlusOneInsight,
  EndpointSuspectedNPlusOneInsight,
  GenericFunctionInsight,
  InsightScope,
  SlowEndpointInsight,
  SpaNPlusOneInsight,
  SpanDurationBreakdownInsight,
  SpanDurationsInsight,
  SpanEndpointBottleneckInsight,
  SpanInsight,
  SpanNexusInsight,
  SpanQueryOptimizationInsight,
  SpanScalingInsight,
  SpanScalingInsufficientDataInsight,
  SpanScalingWellInsight,
  SpanUsagesInsight
} from "./types";

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

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const isEndpointSlowestSpansInsight = (
  insight: CodeObjectInsight
): insight is EndpointSlowestSpansInsight =>
  insight.type === InsightType.SlowestSpans;

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

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const isEndpointSuspectedNPlusOneInsight = (
  insight: CodeObjectInsight
): insight is EndpointSuspectedNPlusOneInsight =>
  insight.type === InsightType.EndpointSpaNPlusOne;

export const isEndpointSpanNPlusOneInsight = (
  insight: CodeObjectInsight
): insight is EndpointSpanNPlusOneInsight =>
  insight.type === InsightType.EndpointSpanNPlusOne;

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const isEndpointQueryOptimizationInsight = (
  insight: CodeObjectInsight
): insight is EndpointQueryOptimizationInsight =>
  insight.type === InsightType.EndpointQueryOptimization;

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

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const isEndpointDurationSlowdownInsight = (
  insight: CodeObjectInsight
): insight is EndpointDurationSlowdownInsight =>
  insight.type === InsightType.EndpointDurationSlowdown;

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

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const isChattyApiEndpointInsight = (
  insight: CodeObjectInsight
): insight is EndpointChattyApiInsight =>
  insight.type === InsightType.EndpointChattyApi;

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
