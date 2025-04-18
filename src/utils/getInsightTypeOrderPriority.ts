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
    [InsightType.EndpointSlowdownSource]: 25,
    [InsightType.LowUsage]: 30,
    [InsightType.EndpointBottleneck]: 40,
    [InsightType.NormalUsage]: 50,
    [InsightType.EndpointSpanNPlusOne]: 51,
    [InsightType.EndpointSessionInView]: 52,
    [InsightType.EndpointChattyApiV2]: 53,
    [InsightType.EndpointHighNumberOfQueries]: 54,
    [InsightType.EndpointQueryOptimizationV2]: 55,
    [InsightType.EndpointScaling]: 56,

    // Span insights
    [InsightType.SpanDurations]: 60,
    [InsightType.SpanUsages]: 61,
    [InsightType.SpanScaling]: 63,
    [InsightType.SpaNPlusOne]: 65,
    [InsightType.SpanEndpointBottleneck]: 67,
    [InsightType.SpanDurationBreakdown]: 68,
    [InsightType.SpanNexus]: 69,
    [InsightType.SpanQueryOptimization]: 70,
    [InsightType.SpanPerformanceAnomaly]: 71
  };

  return insightOrderPriorityMap[type] || Infinity;
};
