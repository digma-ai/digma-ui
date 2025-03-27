import type { Row } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type {
  EnvironmentData,
  SpanScalingMetrics
} from "../../../../../redux/services/types";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { ScopeChangeEvent } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { HighlightCard } from "../../common/HighlightCard";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import type { SpanScalingHighlightCardProps } from "./types";

export const SpanScalingHighlightCard = ({
  data
}: SpanScalingHighlightCardProps) => {
  const { scope, environments } = useConfigSelector();

  const columnHelper =
    createColumnHelper<EnvironmentData<SpanScalingMetrics>>();

  const metricsColumns = [
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "IncreasePercentage"),
      {
        header: "Increased by",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? `${String(metric.value)}%` : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
        }
      }
    )
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  const handleTableRowClick = (
    row: Row<EnvironmentData<SpanScalingMetrics>>
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
        <Table<EnvironmentData<SpanScalingMetrics>>
          columns={columns}
          data={data.environments}
          onRowClick={handleTableRowClick}
        />
      }
    />
  );
};
