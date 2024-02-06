import { InsightType } from "../types";

export const getInsightTypeOrderPriority = (type: string): number => {
  const insightOrderPriorityMap: Record<string, number> = {
    [InsightType.HotSpot]: 1,
    [InsightType.Errors]: 2,
    [InsightType.TopErrorFlows]: 3,

    // Endpoint insights
    [InsightType.EndpointBreakdown]: 5,
    [InsightType.HighUsage]: 10,
    [InsightType.SlowEndpoint]: 20,
    [InsightType.EndpointDurationSlowdown]: 25,
    [InsightType.LowUsage]: 30,
    [InsightType.SlowestSpans]: 40,
    [InsightType.NormalUsage]: 50,
    [InsightType.EndpointSpanNPlusOne]: 55,
    [InsightType.EndpointSessionInView]: 56,
    [InsightType.EndpointChattyApi]: 57,
    [InsightType.EndpointHighNumberOfQueries]: 58,
    [InsightType.EndpointQueryOptimization]: 59,

    // Span insights
    [InsightType.SpanDurations]: 60,
    [InsightType.SpanUsages]: 61,
    [InsightType.SpanScalingInsufficientData]: 62,
    [InsightType.SpanScalingBadly]: 63,
    [InsightType.SpanScalingWell]: 64,
    [InsightType.SpanNPlusOne]: 65,
    [InsightType.SpanDurationChange]: 66,
    [InsightType.SpanEndpointBottleneck]: 67,
    [InsightType.SpanDurationBreakdown]: 68,
    [InsightType.SpanNexus]: 69,
    [InsightType.SpanQueryOptimization]: 70
  };

  return insightOrderPriorityMap[type] || Infinity;
};
