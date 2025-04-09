import {
  isEndpointBottleneckHighlight,
  isEndpointChattyApiV2Highlight,
  isEndpointHighNumberOfQueriesHighlight,
  isEndpointQueryOptimizationV2Highlight,
  isEndpointSessionInViewHighlight,
  isEndpointSlowdownSourceHighlight,
  isEndpointSpanNPlusOneHighlight,
  isHotSpotHighlight,
  isSpanEndpointBottleneckHighlight,
  isSpanPerformanceAnomalyHighlight,
  isSpaNPlusOneHighlight,
  isSpanQueryOptimizationHighlight,
  isSpanScalingHighlight
} from "../../../../redux/services/typeGuards";
import { EndpointBottleneckHighlightCard } from "../highlightCards/EndpointBottleneckHighlightCard";
import { EndpointChattyApiV2HighlightCard } from "../highlightCards/EndpointChattyApiV2HighlightCard";
import { EndpointHighNumberOfQueriesHighlightCard } from "../highlightCards/EndpointHighNumberOfQueriesHighlightCard";
import { EndpointQueryOptimizationV2HighlightCard } from "../highlightCards/EndpointQueryOptimizationV2HighlightCard";
import { EndpointSessionInViewHighlightCard } from "../highlightCards/EndpointSessionInViewHighlightCard";
import { EndpointSlowdownSourceHighlightCard } from "../highlightCards/EndpointSlowdownSourceHighlightCard";
import { EndpointSpanNPlusOneHighlightCard } from "../highlightCards/EndpointSpanNPlusOneHighlightCard";
import { HotSpotHighlightCard } from "../highlightCards/HotSpotHighlightCard";
import { SpanEndpointBottleneckHighlightCard } from "../highlightCards/SpanEndpointBottleneckHighlightCard";
import { SpanPerformanceAnomalyHighlightCard } from "../highlightCards/SpanPerformanceAnomalyHighlightCard";
import { SpaNPlusOneHighlightCard } from "../highlightCards/SpaNPlusOneHighlightCard";
import { SpanQueryOptimizationHighlightCard } from "../highlightCards/SpanQueryOptimizationHighlightCard";
import { SpanScalingHighlightCard } from "../highlightCards/SpanScalingHighlightCard";
import type { HighlightCardRendererProps } from "./types";

export const HighlightCardRenderer = ({
  highlight
}: HighlightCardRendererProps) => {
  if (isEndpointBottleneckHighlight(highlight)) {
    return <EndpointBottleneckHighlightCard data={highlight} />;
  }

  if (isEndpointChattyApiV2Highlight(highlight)) {
    return <EndpointChattyApiV2HighlightCard data={highlight} />;
  }

  if (isEndpointHighNumberOfQueriesHighlight(highlight)) {
    return <EndpointHighNumberOfQueriesHighlightCard data={highlight} />;
  }

  if (isEndpointQueryOptimizationV2Highlight(highlight)) {
    return <EndpointQueryOptimizationV2HighlightCard data={highlight} />;
  }

  if (isEndpointSessionInViewHighlight(highlight)) {
    return <EndpointSessionInViewHighlightCard data={highlight} />;
  }

  if (isEndpointSlowdownSourceHighlight(highlight)) {
    return <EndpointSlowdownSourceHighlightCard data={highlight} />;
  }

  if (isEndpointSpanNPlusOneHighlight(highlight)) {
    return <EndpointSpanNPlusOneHighlightCard data={highlight} />;
  }

  if (isHotSpotHighlight(highlight)) {
    return <HotSpotHighlightCard data={highlight} />;
  }

  if (isSpanEndpointBottleneckHighlight(highlight)) {
    return <SpanEndpointBottleneckHighlightCard data={highlight} />;
  }

  if (isSpaNPlusOneHighlight(highlight)) {
    return <SpaNPlusOneHighlightCard data={highlight} />;
  }

  if (isSpanQueryOptimizationHighlight(highlight)) {
    return <SpanQueryOptimizationHighlightCard data={highlight} />;
  }

  if (isSpanScalingHighlight(highlight)) {
    return <SpanScalingHighlightCard data={highlight} />;
  }

  if (isSpanPerformanceAnomalyHighlight(highlight)) {
    return <SpanPerformanceAnomalyHighlightCard data={highlight} />;
  }
};
