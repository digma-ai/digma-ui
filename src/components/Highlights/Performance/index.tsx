import type { Row } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import {
  useGetAboutQuery,
  useGetPerformanceHighlightsQuery,
  useGetPerformanceHighlightsV2Query
} from "../../../redux/services/digma";
import type { EnvironmentPerformanceData } from "../../../redux/services/types";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { FeatureFlag, SCOPE_CHANGE_EVENTS } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getDurationString } from "../../../utils/getDurationString";
import { CrossCircleIcon } from "../../common/icons/16px/CrossCircleIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { TimerIcon } from "../../common/icons/16px/TimerIcon";
import { Card } from "../../common/v3/Card";
import { Tag } from "../../common/v3/Tag";
import { EmptyStateCard } from "../EmptyStateCard";
import { EnvironmentName } from "../common/EnvironmentName";
import { Section } from "../common/Section";
import { Table } from "../common/Table";
import { handleEnvironmentTableRowClick } from "../handleEnvironmentTableRowClick";
import { trackingEvents } from "../tracking";
import * as s from "./styles";

export const Performance = () => {
  const { scope, environments } = useConfigSelector();

  const { data: about } = useGetAboutQuery();

  const areImpactHighlightsEnabled = Boolean(
    about &&
      getFeatureFlagValue(about, FeatureFlag.IS_HIGHLIGHTS_IMPACT_ENABLED)
  );

  const payload = useMemo(
    () => ({
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId,
      environments: environments?.map((env) => env.id) ?? []
    }),
    [scope?.span?.spanCodeObjectId, environments]
  );

  const { data: dataV1 } = useGetPerformanceHighlightsQuery(payload, {
    skip:
      !about ||
      areImpactHighlightsEnabled ||
      !scope?.span?.spanCodeObjectId ||
      !environments ||
      environments.length === 0
  });

  const { data: dataV2 } = useGetPerformanceHighlightsV2Query(payload, {
    skip:
      !about ||
      !areImpactHighlightsEnabled ||
      !scope?.span?.spanCodeObjectId ||
      !environments ||
      environments.length === 0
  });

  const data = areImpactHighlightsEnabled ? dataV2 : dataV1;
  const isInitialLoading = !data;

  const renderPerformanceCard = (data: EnvironmentPerformanceData[]) => {
    const columnHelper = createColumnHelper<EnvironmentPerformanceData>();

    const columns = [
      columnHelper.accessor("environment", {
        header: "Env",
        cell: (info) => {
          const environment = info.getValue();
          return <EnvironmentName name={environment.name} />;
        }
      }),
      columnHelper.accessor((x) => x, {
        header: "Median",
        cell: (info) => {
          const value = info.getValue();
          const percentileData = value.p50;
          const durationString = getDurationString(percentileData.duration);
          const tagType = isBoolean(percentileData.isCritical)
            ? percentileData.isCritical
              ? "highSeverity"
              : "success"
            : undefined;

          return (
            <Tag
              title={durationString}
              content={durationString}
              type={tagType}
            />
          );
        }
      }),
      columnHelper.accessor((x) => x, {
        header: "Slowest 5%",
        cell: (info) => {
          const value = info.getValue();
          const percentileData = value.p95;
          const durationString = getDurationString(percentileData.duration);
          const tagType = isBoolean(percentileData.isCritical)
            ? percentileData.isCritical
              ? "highSeverity"
              : "success"
            : undefined;

          return (
            <Tag
              title={durationString}
              content={durationString}
              type={tagType}
            />
          );
        }
      }),
      columnHelper.accessor("lastCallTimeStamp", {
        header: "Last",
        cell: (info) => {
          const lastCallDateTime = info.getValue();

          if (!lastCallDateTime) {
            return null;
          }

          const value = formatTimeDistance(lastCallDateTime, {
            format: "short",
            withDescriptiveWords: false
          }).replace(" ", "");
          const title = new Date(lastCallDateTime).toString();

          return (
            <s.LastCallTableText title={title}>{value}</s.LastCallTableText>
          );
        }
      })
    ];

    const handleTableRowClick = (row: Row<EnvironmentPerformanceData>) => {
      sendUserActionTrackingEvent(
        trackingEvents.PERFORMANCE_CARD_TABLE_ROW_CLICKED
      );

      handleEnvironmentTableRowClick(
        scope,
        environments,
        row.original.environment.id,
        SCOPE_CHANGE_EVENTS.HIGHLIGHTS_PERFORMANCE_CARD_ITEM_CLICKED
      );
    };

    return (
      <Card
        header={
          <s.CardTitle>
            <Tag
              content={
                <s.CardIconContainer>
                  <TimerIcon color={"currentColor"} size={16} />
                </s.CardIconContainer>
              }
            />
            Duration
          </s.CardTitle>
        }
        content={
          <Table<EnvironmentPerformanceData>
            columns={columns}
            data={data}
            onRowClick={handleTableRowClick}
          />
        }
      />
    );
  };

  const renderCard = () => {
    if (isInitialLoading) {
      return (
        <EmptyStateCard
          icon={RefreshIcon}
          type={"lowSeverity"}
          title={"Waiting for data"}
          text={"Digma is collecting performance data"}
        />
      );
    }

    if (!data || data.performance.length === 0) {
      return (
        <EmptyStateCard
          icon={CrossCircleIcon}
          title={"No data"}
          text={"No performance data available"}
        />
      );
    }

    if (data && data.performance.length > 0) {
      return renderPerformanceCard(data.performance);
    }
  };

  return <Section title={"Performance"}>{renderCard()}</Section>;
};
