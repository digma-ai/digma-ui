import { Fragment, useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { ChangeViewPayload } from "../../../types";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { actions } from "../../Main/actions";
import { ConfigContext } from "../../common/App/ConfigContext";
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
import { GenericMetrics, HighlightData, TopIssuesData } from "./types";

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
  const [data, setData] = useState<TopIssuesData>();
  const [isLoading, setIsLoading] = useState(false);
  const config = useContext(ConfigContext);

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
    window.sendMessageToDigma({
      action: actions.GET_HIGHLIGHTS_TOP_ISSUES_DATA,
      payload: {
        spanCodeObjectId: config.scope?.span?.spanCodeObjectId || null
      }
    });
    setIsLoading(true);
  }, [config.scope?.span?.spanCodeObjectId]);

  useEffect(() => {
    const handleTopIssuesData = (data: any) => {
      setData(data as TopIssuesData);
      setIsLoading(false);
    };

    dispatcher.addActionListener(
      actions.SET_HIGHLIGHTS_TOP_ISSUES_DATA,
      handleTopIssuesData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_HIGHLIGHTS_TOP_ISSUES_DATA,
        handleTopIssuesData
      );
    };
  }, []);

  return (
    <s.Container>
      <SectionHeader>
        Top Issues
        <Link onClick={handleViewAllLinkClick}>View all</Link>
      </SectionHeader>
      {data && data.topInsights.length > 0 ? (
        data.topInsights.map((x) => (
          <Fragment key={x.insightType}>{renderHighlightCard(x)}</Fragment>
        ))
      ) : (
        <EmptyStateCard isLoading={isLoading} />
      )}
    </s.Container>
  );
};
