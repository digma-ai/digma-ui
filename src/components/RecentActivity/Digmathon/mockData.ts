import { InsightType } from "../../Insights/types";
import { DigmathonProgressData } from "../types";

export const mockedDigmathonProgressData: DigmathonProgressData = {
  insights: [
    InsightType.SpanScaling,
    InsightType.SpanNexus,
    InsightType.EndpointQueryOptimizationV2,
    InsightType.EndpointQueryOptimization,
    InsightType.SpanQueryOptimization,
    InsightType.HotSpot,
    InsightType.EndpointSpanNPlusOne,
    InsightType.EndpointSpaNPlusOne,
    InsightType.SpaNPlusOne,
    InsightType.EndpointSessionInView,
    InsightType.SpanUsages,
    InsightType.EndpointHighNumberOfQueries,
    InsightType.EndpointBottleneck,
    InsightType.SpanEndpointBottleneck
  ]
};
