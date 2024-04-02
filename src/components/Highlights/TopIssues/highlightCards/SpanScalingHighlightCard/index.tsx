import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { HighlightCard } from "../../common/HighlightCard";
import { EnvironmentData, SpanScalingMetrics } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { SpanScalingHighlightCardProps } from "./types";

export const SpanScalingHighlightCard = ({
  data
}: SpanScalingHighlightCardProps) => {
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

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<SpanScalingMetrics>>
          columns={columns}
          data={data.environments}
        />
      }
    />
  );
};
