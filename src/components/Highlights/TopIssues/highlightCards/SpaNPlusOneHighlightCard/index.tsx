import type { Row } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type {
  EnvironmentData,
  SpaNPlusOneMetrics
} from "../../../../../redux/services/types";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { ScopeChangeEvent } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Tag } from "../../../../common/v3/Tag";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { HighlightCard } from "../../common/HighlightCard";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import type { SpaNPlusOneHighlightCardProps } from "./types";

export const SpaNPlusOneHighlightCard = ({
  data
}: SpaNPlusOneHighlightCardProps) => {
  const { scope, environments } = useConfigSelector();

  const columnHelper =
    createColumnHelper<EnvironmentData<SpaNPlusOneMetrics>>();

  const metricsColumns = [
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "AffectedEndpoints"),
      {
        header: "Affected endpoints",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? String(metric.value) : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
        }
      }
    ),
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Repeats"), {
      header: "Max Repeats",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? String(metric.value) : "";
        return metric ? <TableText title={value}>{value}</TableText> : null;
      }
    }),
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "RequestPercentage"),
      {
        header: "Max Requests",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? `${String(metric.value)}%` : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
        }
      }
    ),
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Duration"), {
      header: "Max Duration",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? getDurationString(metric.value) : "";
        return metric ? <Tag title={value} content={value} /> : null;
      }
    })
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  const handleTableRowClick = (
    row: Row<EnvironmentData<SpaNPlusOneMetrics>>
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
        <Table<EnvironmentData<SpaNPlusOneMetrics>>
          columns={columns}
          data={data.environments}
          onRowClick={handleTableRowClick}
        />
      }
    />
  );
};
