import { InsightType } from "../../types";
import {
  ChattyApiEndpointInsight,
  CodeObjectErrorsInsight,
  CodeObjectHotSpotInsight,
  CodeObjectInsight,
  EndpointBottleneckInsight,
  EndpointBreakdownInsight,
  EndpointDurationSlowdownInsight,
  EndpointHighNumberOfQueriesInsight,
  EndpointHighUsageInsight,
  EndpointInsight,
  EndpointLowUsageInsight,
  EndpointNormalUsageInsight,
  EndpointQueryOptimizationInsight,
  EndpointSlowdownSourceInsight,
  EndpointSlowestSpansInsight,
  EndpointSpanNPlusOneInsight,
  EndpointSuspectedNPlusOneInsight,
  GenericFunctionInsight,
  InsightScope,
  QueryOptimizationInsight,
  SessionInViewEndpointInsight,
  SlowEndpointInsight,
  SpanDurationBreakdownInsight,
  SpanDurationsInsight,
  SpanEndpointBottleneckInsight,
  SpanInsight,
  SpanNPlusOneInsight,
  SpanNexusInsight,
  SpanScalingBadlyInsight,
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

// obsolete
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
): insight is SpanNPlusOneInsight => insight.type === InsightType.SpanNPlusOne;

// obsolete
export const isEndpointSuspectedNPlusOneInsight = (
  insight: CodeObjectInsight
): insight is EndpointSuspectedNPlusOneInsight =>
  insight.type === InsightType.EndpointSpanNPlusOne;

export const isEndpointSpanNPlusOneInsight = (
  insight: CodeObjectInsight
): insight is EndpointSpanNPlusOneInsight =>
  insight.type === InsightType.EndpointSpanNPlusOneV2;

export const isEndpointQueryOptimizationInsight = (
  insight: CodeObjectInsight
): insight is EndpointQueryOptimizationInsight =>
  insight.type === InsightType.EndpointQueryOptimization;

export const isSpanScalingBadlyInsight = (
  insight: CodeObjectInsight
): insight is SpanScalingBadlyInsight =>
  insight.type === InsightType.SpanScalingBadly;

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

// obsolete
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
): insight is SessionInViewEndpointInsight =>
  insight.type === InsightType.EndpointSessionInView;

export const isChattyApiEndpointInsight = (
  insight: CodeObjectInsight
): insight is ChattyApiEndpointInsight =>
  insight.type === InsightType.EndpointChattyApi;

export const isEndpointHighNumberOfQueriesInsight = (
  insight: CodeObjectInsight
): insight is EndpointHighNumberOfQueriesInsight =>
  insight.type === InsightType.EndpointHighNumberOfQueries;

export const isSpanNexusInsight = (
  insight: CodeObjectInsight
): insight is SpanNexusInsight => insight.type === InsightType.SpanNexus;

export const isSpanQueryOptimizationInsight = (
  insight: CodeObjectInsight
): insight is QueryOptimizationInsight =>
  insight.type === InsightType.SpanQueryOptimization;

export const isInsightHeaderNavigationEnabled = (
  insight: CodeObjectInsight
): insight is SpanInsight =>
  isSpanInsight(insight) || isEndpointHighNumberOfQueriesInsight(insight);
