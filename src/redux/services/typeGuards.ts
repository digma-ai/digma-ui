import { InsightType } from "../../types";
import type {
  EndpointBottleneckMetrics,
  EndpointChattyApiV2Metrics,
  EndpointHighNumberOfQueriesMetrics,
  EndpointQueryOptimizationV2Metrics,
  EndpointSessionInViewMetrics,
  EndpointSlowdownSourceMetrics,
  EndpointSpanNPlusOneMetrics,
  GenericMetrics,
  HighlightData,
  HotSpotMetrics,
  SpaNPlusOneMetrics,
  SpanEndpointBottleneckMetrics,
  SpanPerformanceAnomalyMetrics,
  SpanQueryOptimizationMetrics,
  SpanScalingMetrics
} from "./types";

export const isEndpointBottleneckHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<EndpointBottleneckMetrics> =>
  highlight.insightType === InsightType.EndpointBottleneck;

export const isSpanEndpointBottleneckHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<SpanEndpointBottleneckMetrics> =>
  highlight.insightType === InsightType.SpanEndpointBottleneck;

export const isEndpointChattyApiV2Highlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<EndpointChattyApiV2Metrics> =>
  highlight.insightType === InsightType.EndpointChattyApiV2;

export const isEndpointHighNumberOfQueriesHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<EndpointHighNumberOfQueriesMetrics> =>
  highlight.insightType === InsightType.EndpointHighNumberOfQueries;

export const isEndpointQueryOptimizationV2Highlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<EndpointQueryOptimizationV2Metrics> =>
  highlight.insightType === InsightType.EndpointQueryOptimizationV2;

export const isSpanQueryOptimizationHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<SpanQueryOptimizationMetrics> =>
  highlight.insightType === InsightType.SpanQueryOptimization;

export const isEndpointSessionInViewHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<EndpointSessionInViewMetrics> =>
  highlight.insightType === InsightType.EndpointSessionInView;

export const isEndpointSlowdownSourceHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<EndpointSlowdownSourceMetrics> =>
  highlight.insightType === InsightType.EndpointSlowdownSource;

export const isEndpointSpanNPlusOneHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<EndpointSpanNPlusOneMetrics> =>
  highlight.insightType === InsightType.EndpointSpanNPlusOne;

export const isSpaNPlusOneHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<SpaNPlusOneMetrics> =>
  highlight.insightType === InsightType.SpaNPlusOne;

export const isHotSpotHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<HotSpotMetrics> =>
  highlight.insightType === InsightType.HotSpot;

export const isSpanScalingHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<SpanScalingMetrics> =>
  highlight.insightType === InsightType.SpanScaling;

export const isSpanPerformanceAnomalyHighlight = (
  highlight: HighlightData<GenericMetrics>
): highlight is HighlightData<SpanPerformanceAnomalyMetrics> =>
  highlight.insightType === InsightType.SpanPerformanceAnomaly;
