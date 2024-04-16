import { Fragment, useEffect, useState } from "react";
import { actions as globalActions } from "../../../actions";
import { usePrevious } from "../../../hooks/usePrevious";
import { ChangeViewPayload } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { Link } from "../../common/v3/Link";
import { EmptyStateCard } from "../EmptyStateCard";
import { Section } from "../common/Section";
import { trackingEvents } from "../tracking";
import { EndpointBottleneckHighlightCard } from "./highlightCards/EndpointBottleneckHighlightCard";
import { EndpointChattyApiV2HighlightCard } from "./highlightCards/EndpointChattyApiV2HighlightCard";
import { EndpointHighNumberOfQueriesHighlightCard } from "./highlightCards/EndpointHighNumberOfQueriesHighlightCard";
import { EndpointQueryOptimizationV2HighlightCard } from "./highlightCards/EndpointQueryOptimizationV2HighlightCard";
import { EndpointSessionInViewHighlightCard } from "./highlightCards/EndpointSessionInViewHighlightCard";
import { EndpointSlowdownSourceHighlightCard } from "./highlightCards/EndpointSlowdownSourceHighlightCard";
import { EndpointSpanNPlusOneHighlightCard } from "./highlightCards/EndpointSpanNPlusOneHighlightCard";
import { HotSpotHighlightCard } from "./highlightCards/HotSpotHighlightCard";
import { SpaNPlusOneHighlightCard } from "./highlightCards/SpaNPlusOneHighlightCard";
import { SpanEndpointBottleneckHighlightCard } from "./highlightCards/SpanEndpointBottleneckHighlightCard";
import { SpanQueryOptimizationHighlightCard } from "./highlightCards/SpanQueryOptimizationHighlightCard";
import { SpanScalingHighlightCard } from "./highlightCards/SpanScalingHighlightCard";
import {
  isEndpointBottleneckHighlight,
  isEndpointChattyApiV2Highlight,
  isEndpointHighNumberOfQueriesHighlight,
  isEndpointQueryOptimizationV2Highlight,
  isEndpointSessionInViewHighlight,
  isEndpointSlowdownSourceHighlight,
  isEndpointSpanNPlusOneHighlight,
  isHotSpotHighlight,
  isSpaNPlusOneHighlight,
  isSpanEndpointBottleneckHighlight,
  isSpanQueryOptimizationHighlight,
  isSpanScalingHighlight
} from "./typeGuards";
import { GenericMetrics, HighlightData } from "./types";
import { useTopIssuesData } from "./useTopIssuesData";

const renderHighlightCard = (highlight: HighlightData<GenericMetrics>) => {
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
};

export const TopIssues = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { data, getData } = useTopIssuesData();
  const previousData = usePrevious(data);

  const handleViewAllLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.VIEW_ALL_LINK_CLICKED);

    window.sendMessageToDigma<ChangeViewPayload>({
      action: globalActions.CHANGE_VIEW,
      payload: {
        view: "insights"
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  const isViewAllLinkDisabled = (data?.topInsights || []).length === 0;

  return (
    <Section
      title={"Top Issues"}
      toolbarContent={
        <Link onClick={handleViewAllLinkClick} disabled={isViewAllLinkDisabled}>
          View all
        </Link>
      }
    >
      {data && data.topInsights.length > 0 ? (
        data.topInsights.map((x) => (
          <Fragment key={x.insightType}>{renderHighlightCard(x)}</Fragment>
        ))
      ) : (
        <EmptyStateCard
          type={isInitialLoading ? "loading" : "noData"}
          text={
            isInitialLoading
              ? "Detected issues will appear here"
              : "No Issues available at the moment"
          }
        />
      )}
    </Section>
  );
};
