import type { Row } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type {
  EnvironmentData,
  SpanPerformanceAnomalyMetrics
} from "../../../../../redux/services/types";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { ScopeChangeEvent } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../../../utils/getDurationString";
import { roundTo } from "../../../../../utils/roundTo";
import { Tag } from "../../../../common/v3/Tag";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { HighlightCard } from "../../common/HighlightCard";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import type { SpanPerformanceAnomalyHighlightCardProps } from "./types";

export const SpanPerformanceAnomalyHighlightCard = ({
  data
}: SpanPerformanceAnomalyHighlightCardProps) => {
  const { scope, environments } = useConfigSelector();

  const columnHelper =
    createColumnHelper<EnvironmentData<SpanPerformanceAnomalyMetrics>>();

  const metricsColumns = [
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "P50"), {
      header: "Median",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? getDurationString(metric.value) : "";
        return metric ? <Tag title={value} content={value} /> : null;
      }
    }),
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "P95"), {
      header: "Slowest 5%",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? getDurationString(metric.value) : "";
        return metric ? <Tag title={value} content={value} /> : null;
      }
    }),
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "SlowerByPercentage"),
      {
        header: "The slowest 5% slower than the Median by",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? `${String(roundTo(metric.value, 2))}%` : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
        }
      }
    )
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  const handleTableRowClick = (
    row: Row<EnvironmentData<SpanPerformanceAnomalyMetrics>>
  ) => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_CARD_TABLE_ROW_CLICKED,
      {
        insightType: data.insightType
      }
    );
    handleEnvironmentTableRowClick(
      scope,
      environments,
      row.original.environmentId,
      ScopeChangeEvent.HighlightsTopIssuesCardItemClicked
    );
  };

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<SpanPerformanceAnomalyMetrics>>
          columns={columns}
          data={data.environments}
          onRowClick={handleTableRowClick}
        />
      }
    />
  );
};
