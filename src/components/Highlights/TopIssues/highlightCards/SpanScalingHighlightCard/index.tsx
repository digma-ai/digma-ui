import { Row, createColumnHelper } from "@tanstack/react-table";
import { useGlobalStore } from "../../../../../containers/Main/stores/useGlobalStore";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { SCOPE_CHANGE_EVENTS } from "../../../../Main/types";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { HighlightCard } from "../../common/HighlightCard";
import { EnvironmentData, SpanScalingMetrics } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { SpanScalingHighlightCardProps } from "./types";

export const SpanScalingHighlightCard = ({
  data
}: SpanScalingHighlightCardProps) => {
  const scope = useGlobalStore().scope;
  const environments = useGlobalStore().environments;

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
      SCOPE_CHANGE_EVENTS.HIGHLIGHTS_TOP_ISSUES_CARD_ITEM_CLICKED
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
