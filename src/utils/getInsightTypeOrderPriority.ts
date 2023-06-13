import { InsightType } from "../types";

export const getInsightTypeOrderPriority = (type: string): number => {
  const insightOrderPriorityMap: Record<string, number> = {
    [InsightType.HotSpot]: 1,
    [InsightType.Errors]: 2,
    [InsightType.TopErrorFlows]: 3,

    [InsightType.SpanDurations]: 60,
    [InsightType.SpanUsages]: 61,
    [InsightType.SpanScaling]: 63,
    [InsightType.SpanNPlusOne]: 65,
    [InsightType.SpanDurationChange]: 66,
    [InsightType.SpanEndpointBottleneck]: 67,
    [InsightType.SpanDurationBreakdown]: 68,

    [InsightType.EndpointSpanNPlusOne]: 55,
    [InsightType.SlowestSpans]: 40,
    [InsightType.LowUsage]: 30,
    [InsightType.NormalUsage]: 50,
    [InsightType.HighUsage]: 10,
    [InsightType.SlowEndpoint]: 20,
    [InsightType.EndpointDurationSlowdown]: 25,
    [InsightType.EndpointBreakdown]: 5
  };

  return insightOrderPriorityMap[type] || Infinity;
};
