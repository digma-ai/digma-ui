import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePagination } from "../../../hooks/usePagination";
import {
  useGetTopIssuesHighlightsQuery,
  useGetTopIssuesHighlightsV2Query
} from "../../../redux/services/digma";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { FeatureFlag, InsightType } from "../../../types";
import { CheckmarkCircleIcon } from "../../common/icons/16px/CheckmarkCircleIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { EmptyStateCard } from "../EmptyStateCard";
import { CarouselPagination } from "../common/CarouselPagination";
import { Section } from "../common/Section";
import { HighlightCardRenderer } from "./HighlightCardRenderer";

const PAGE_SIZE = 2;

export const TopIssues = () => {
  const { scope, environments, backendInfo } = useConfigSelector();

  const areImpactHighlightsEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsHighlightsImpactEnabled
  );

  const { data: dataV1 } = useGetTopIssuesHighlightsQuery(
    {
      environments: environments?.map((env) => env.id) ?? [],
      scopedCodeObjectId: scope?.span?.spanCodeObjectId
    },
    {
      skip:
        !backendInfo ||
        areImpactHighlightsEnabled ||
        !scope?.span?.spanCodeObjectId ||
        !environments ||
        environments.length === 0
    }
  );

  const { data: dataV2 } = useGetTopIssuesHighlightsV2Query(
    {
      environments: environments?.map((env) => env.id) ?? [],
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId
    },
    {
      skip:
        !backendInfo ||
        !areImpactHighlightsEnabled ||
        !scope?.span?.spanCodeObjectId ||
        !environments ||
        environments.length === 0
    }
  );

  const data = areImpactHighlightsEnabled ? dataV2 : dataV1;

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
      <HighlightCardRenderer key={`${uuidv4()}`} highlight={x} />
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
