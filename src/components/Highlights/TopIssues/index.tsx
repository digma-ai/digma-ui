import { Fragment, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFetchData } from "../../../hooks/useFetchData";
import { usePagination } from "../../../hooks/usePagination";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { InsightType } from "../../Insights/types";
import { actions as mainActions } from "../../Main/actions";
import type { GetHighlightsTopIssuesDataPayload } from "../../Main/types";
import { CheckmarkCircleIcon } from "../../common/icons/16px/CheckmarkCircleIcon";
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
import type { GenericMetrics, HighlightData, TopIssuesData } from "./types";

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
  const { scope, environments } = useConfigSelector();

  const payload: GetHighlightsTopIssuesDataPayload = useMemo(
    () => ({
      query: {
        scopedCodeObjectId: scope?.span?.spanCodeObjectId ?? null,
        environments: environments?.map((env) => env.id) ?? []
      }
    }),
    [scope?.span?.spanCodeObjectId, environments]
  );

  const { data } = useFetchData<
    GetHighlightsTopIssuesDataPayload,
    TopIssuesData
  >(
    {
      requestAction: mainActions.GET_HIGHLIGHTS_TOP_ISSUES_DATA,
      responseAction: mainActions.SET_HIGHLIGHTS_TOP_ISSUES_DATA,
      refreshOnPayloadChange: true,
      isEnabled: Boolean(
        scope?.span?.spanCodeObjectId && environments && environments.length > 0
      )
    },
    payload
  );

  // Do not show unimplemented insights
  const filteredInsights = useMemo(
    () =>
      (data?.topInsights ?? []).filter(
        (x) => x.insightType !== InsightType.SlowEndpoint
      ),
    [data]
  );
  const [pageItems, page, setPage] = usePagination(
    filteredInsights,
    PAGE_SIZE,
    scope?.span?.spanCodeObjectId
  );

  const isInitialLoading = !data;

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

    if (!data || filteredInsights.length === 0) {
      return (
        <EmptyStateCard
          icon={CheckmarkCircleIcon}
          title={"No issues found"}
          text={"No issues found in this asset"}
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
          itemsCount={filteredInsights.length}
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
