import { InsightType } from "../../Insights/types";
import { DigmathonInsightCardData } from "../types";

export const getDigmathonInsightCardData = (
  type: InsightType
): DigmathonInsightCardData | undefined => {
  switch (type) {
    case InsightType.SpanScaling:
      return {
        title: "Span Scaling",
        description: "How well does this scale?",
        illustration: (
          <img src={"/images/insightCards/SpanScalingInsightCard.svg"} />
        )
      };
    case InsightType.SpanNexus:
      return {
        title: "Code Nexus",
        description: "The most important piece in your code Jenga tower",
        illustration: (
          <img src={"/images/insightCards/SpanNexusInsightCard.svg"} />
        )
      };
    case InsightType.EndpointQueryOptimizationV2:
    case InsightType.SpanQueryOptimization:
      return {
        title: "Query Optimization Suggested",
        description: "Caching anyone?",
        illustration: (
          <img src={"/images/insightCards/QueryOptimizationInsightCard.svg"} />
        )
      };
    case InsightType.HotSpot:
      return {
        title: "Error Hotspot",
        description: "Where errors congregate",
        illustration: (
          <img src={"/images/insightCards/HotSpotInsightCard.svg"} />
        )
      };
    case InsightType.EndpointSpanNPlusOne:
    case InsightType.SpaNPlusOne:
      return {
        title: "N+1 Select",
        description: "Excuse me sir, your abstraction is leaking",
        illustration: (
          <img src={"/images/insightCards/NPlusOneInsightCard.svg"} />
        )
      };
    case InsightType.EndpointSessionInView:
      return {
        title: "Open Session in View",
        description: "Why'd you go and do that?",
        illustration: (
          <img
            src={"/images/insightCards/EndpointSessionInViewInsightCard.svg"}
          />
        )
      };
    case InsightType.SpanUsages:
      return {
        title: "Top Usage",
        description: "Know where you're coming from to know where you're going",
        illustration: (
          <img src={"/images/insightCards/SpanUsagesInsightCard.svg"} />
        )
      };
    case InsightType.EndpointHighNumberOfQueries:
      return {
        title: "High Number of Queries",
        description: "Stop hitting that DB",
        illustration: (
          <img
            src={
              "/images/insightCards/EndpointHighNumberOfQueriesInsightCard.svg"
            }
          />
        )
      };
    case InsightType.EndpointBottleneck:
    case InsightType.SpanEndpointBottleneck:
      return {
        title: "Bottleneck",
        description: "Only one way to handle clogged pipes",
        illustration: (
          <img src={"/images/insightCards/BottleneckInsightCard.svg"} />
        )
      };
  }
};
