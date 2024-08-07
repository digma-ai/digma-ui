import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { usePagination } from "../../../hooks/usePagination";
import { usePrevious } from "../../../hooks/usePrevious";
import { CrossCircleIcon } from "../../common/icons/16px/CrossCircleIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { EmptyStateCard } from "../EmptyStateCard";
import { CarouselPagination } from "../common/CarouselPagination";
import { Section } from "../common/Section";
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

const PAGE_SIZE = 2;

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
  const scope = useGlobalStore.use.scope();
  const [pageItems, page, setPage] = usePagination(
    data?.topInsights ?? [],
    PAGE_SIZE,
    scope?.span?.spanCodeObjectId
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  const renderContent = () => {
    if (isInitialLoading) {
      return (
        <EmptyStateCard
          icon={RefreshIcon}
          type={"lowSeverity"}
          title={"Waiting for data"}
          text={"Detected issues will appear here"}
        />
      );
    }

    if (!data || data.topInsights.length === 0) {
      return (
        <EmptyStateCard
          icon={CrossCircleIcon}
          title={"No data"}
          text={"No issues available at the moment"}
        />
      );
    }

    return pageItems.map((x) => (
      <Fragment key={`${uuidv4()}`}>{renderHighlightCard(x)}</Fragment>
    ));
  };

  return (
    <Section
      title={"Top Issues"}
      toolbarContent={
        <CarouselPagination
          itemsCount={data?.topInsights.length ?? 0}
          onPageChange={setPage}
          pageSize={PAGE_SIZE}
          page={page}
          trackingEventPrefix={"highlights top issues"}
        />
      }
    >
      {renderContent()}
    </Section>
  );
};
