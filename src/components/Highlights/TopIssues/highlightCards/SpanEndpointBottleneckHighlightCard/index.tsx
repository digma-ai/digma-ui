import { createColumnHelper } from "@tanstack/react-table";
import { Duration } from "../../../../../globals";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Table } from "../../../common/Table";
import { TableTag } from "../../../common/TableTag";
import { TableText } from "../../../common/TableText";
import { HighlightCard } from "../../common/HighlightCard";
import { EnvironmentData, SpanEndpointBottleneckMetrics } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { SpanEndpointBottleneckHighlightCardProps } from "./types";

export const SpanEndpointBottleneckHighlightCard = ({
  data
}: SpanEndpointBottleneckHighlightCardProps) => {
  const columnHelper =
    createColumnHelper<EnvironmentData<SpanEndpointBottleneckMetrics>>();

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
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "DurationWhenBottleneck"),
      {
        header: "Max Duration",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric
            ? getDurationString(metric.value as Duration)
            : "";
          return metric ? <TableTag title={value} content={value} /> : null;
        }
      }
    )
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<SpanEndpointBottleneckMetrics>>
          columns={columns}
          data={data.environments}
        />
      }
    />
  );
};