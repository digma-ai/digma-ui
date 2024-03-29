import { Fragment, useEffect, useState } from "react";
import { actions as globalActions } from "../../../actions";
import { usePrevious } from "../../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { ChangeViewPayload } from "../../../types";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { Link } from "../../common/v3/Link";
import { EmptyStateCard } from "../EmptyStateCard";
import { SectionHeader } from "../styles";
import { trackingEvents } from "../tracking";
import { EndpointBottleneckHighlightCard } from "./highlightCards/EndpointBottleneckHighlightCard";
import { EndpointChattyApiV2HighlightCard } from "./highlightCards/EndpointChattyApiV2HighlightCard";
import { EndpointHighNumberOfQueriesHighlightCard } from "./highlightCards/EndpointHighNumberOfQueriesHighlightCard";
import { EndpointQueryOptimizationV2HighlightCard } from "./highlightCards/EndpointQueryOptimizationV2HighlightCard";
import { EndpointSessionInViewHighlightCard } from "./highlightCards/EndpointSessionInViewHighlightCard";
import { EndpointSlowdownSourceHighlightCard } from "./highlightCards/EndpointSlowdownSourceHighlightCard";
import { EndpointSpanNPlusOneHighlightCard } from "./highlightCards/EndpointSpanNPlusOneHighlightCard";
import { HotSpotHighlightCard } from "./highlightCards/HotSpotHighlightCard";
import { SpanEndpointBottleneckHighlightCard } from "./highlightCards/SpanEndpointBottleneckHighlightCard";
import { SpanNPlusOneHighlightCard } from "./highlightCards/SpanNPlusOneHighlightCard";
import { SpanQueryOptimizationHighlightCard } from "./highlightCards/SpanQueryOptimizationHighlightCard";
import { SpanScalingHighlightCard } from "./highlightCards/SpanScalingHighlightCard";
import * as s from "./styles";
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
  isSpanNPlusOneHighlight,
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

  if (isSpanNPlusOneHighlight(highlight)) {
    return <SpanNPlusOneHighlightCard data={highlight} />;
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
    sendTrackingEvent(globalTrackingEvents.USER_ACTION, {
      actions: trackingEvents.VIEW_ALL_LINK_CLICKED
    });

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
    <s.Container>
      <SectionHeader>
        Top Issues
        <Link onClick={handleViewAllLinkClick} disabled={isViewAllLinkDisabled}>
          View all
        </Link>
      </SectionHeader>
      {data && data.topInsights.length > 0 ? (
        data.topInsights.map((x) => (
          <Fragment key={x.insightType}>{renderHighlightCard(x)}</Fragment>
        ))
      ) : (
        <EmptyStateCard isLoading={isInitialLoading} />
      )}
    </s.Container>
  );
};
