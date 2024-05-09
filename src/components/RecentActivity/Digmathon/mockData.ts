import { InsightType } from "../../Insights/types";
import { SetDigmathonProgressDataPayload } from "../types";

export const mockedDigmathonProgressData: SetDigmathonProgressDataPayload = {
  insights: [
    { type: InsightType.SpanScaling, foundAt: "2024-01-05T13:14:47.010Z" },
    { type: InsightType.SpanNexus, foundAt: "2024-01-05T13:14:47.010Z" },
    {
      type: InsightType.EndpointQueryOptimizationV2,
      foundAt: "2024-01-05T13:14:47.010Z"
    },
    {
      type: InsightType.EndpointQueryOptimization,
      foundAt: "2024-01-05T11:14:47.010Z"
    },
    {
      type: InsightType.SpanQueryOptimization,
      foundAt: "2024-01-05T13:14:47.010Z"
    },
    { type: InsightType.HotSpot, foundAt: "2024-01-05T12:14:47.010Z" },
    {
      type: InsightType.EndpointSpanNPlusOne,
      foundAt: "2024-01-05T13:14:47.010Z"
    },
    {
      type: InsightType.EndpointSpaNPlusOne,
      foundAt: "2024-01-05T13:14:47.010Z"
    },
    { type: InsightType.SpaNPlusOne, foundAt: "2024-01-05T13:14:47.010Z" },
    {
      type: InsightType.EndpointSessionInView,
      foundAt: "2024-01-05T13:14:47.010Z"
    },
    { type: InsightType.SpanUsages, foundAt: "2024-01-05T11:14:47.010Z" },
    {
      type: InsightType.EndpointHighNumberOfQueries,
      foundAt: "2024-01-05T13:14:47.010Z"
    },
    {
      type: InsightType.EndpointBottleneck,
      foundAt: "2024-01-05T13:14:47.010Z"
    },
    {
      type: InsightType.SpanEndpointBottleneck,
      foundAt: "2024-01-05T13:14:47.010Z"
    }
  ],
  lastUpdatedByUserAt: "2026-01-05T13:14:47.010Z"
};
