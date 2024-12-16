import { mockedEndpointChattyApiV2HighlightData } from "./highlightCards/EndpointChattyApiV2HighlightCard/mockData";
import { mockedEndpointHighNumberOfQueriesHighlightData } from "./highlightCards/EndpointHighNumberOfQueriesHighlightCard/mockData";
import { mockedSpanScalingHighlightData } from "./highlightCards/SpanScalingHighlightCard/mockData";
import type { TopIssuesData } from "./types";

export const mockedTopIssuesData: TopIssuesData = {
  topInsights: [
    mockedSpanScalingHighlightData,
    mockedEndpointHighNumberOfQueriesHighlightData,
    mockedEndpointChattyApiV2HighlightData
  ]
};
