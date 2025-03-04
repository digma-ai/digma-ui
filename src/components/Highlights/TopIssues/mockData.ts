import type { GetTopIssuesHighlightsResponse } from "../../../redux/services/types";
import { mockedEndpointChattyApiV2HighlightData } from "./highlightCards/EndpointChattyApiV2HighlightCard/mockData";
import { mockedEndpointHighNumberOfQueriesHighlightData } from "./highlightCards/EndpointHighNumberOfQueriesHighlightCard/mockData";
import { mockedSpanScalingHighlightData } from "./highlightCards/SpanScalingHighlightCard/mockData";

export const mockedTopIssuesData: GetTopIssuesHighlightsResponse = {
  topInsights: [
    mockedSpanScalingHighlightData,
    mockedEndpointHighNumberOfQueriesHighlightData,
    mockedEndpointChattyApiV2HighlightData
  ]
};
