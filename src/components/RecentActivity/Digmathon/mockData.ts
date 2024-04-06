import { InsightType } from "../../Insights/types";
import { DigmathonProgressData } from "./types";

export const mockedDigmathonProgressData: DigmathonProgressData = {
  insights: [
    { type: InsightType.SpanScaling, isFound: true },
    { type: InsightType.SpanNexus, isFound: false },
    { type: InsightType.EndpointQueryOptimizationV2, isFound: false },
    { type: InsightType.EndpointQueryOptimization, isFound: false },
    { type: InsightType.SpanQueryOptimization, isFound: false },
    { type: InsightType.HotSpot, isFound: false },
    { type: InsightType.EndpointSpanNPlusOne, isFound: false },
    { type: InsightType.EndpointSpaNPlusOne, isFound: false },
    { type: InsightType.SpaNPlusOne, isFound: false },
    { type: InsightType.EndpointSessionInView, isFound: false },
    { type: InsightType.SpanUsages, isFound: false },
    { type: InsightType.EndpointHighNumberOfQueries, isFound: false },
    { type: InsightType.EndpointBottleneck, isFound: false },
    { type: InsightType.SpanEndpointBottleneck, isFound: false }
  ]
};
