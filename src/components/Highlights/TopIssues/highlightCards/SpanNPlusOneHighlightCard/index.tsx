import { createColumnHelper } from "@tanstack/react-table";
import { Duration } from "../../../../../globals";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Tag } from "../../../../common/v3/Tag";
import { Table } from "../../../Table";
import { HighlightCard } from "../../HighlightCard";
import { EnvironmentData, SpanNPlusOneMetrics } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { SpanNPlusOneHighlightCardProps } from "./types";

export const SpanNPlusOneHighlightCard = ({
  data
}: SpanNPlusOneHighlightCardProps) => {
  const columnHelper =
    createColumnHelper<EnvironmentData<SpanNPlusOneMetrics>>();

  const metricsColumns = [
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "AffectedEndpoints"),
      {
        header: "Affected endpoints",
        meta: {
          width: "20%",
          minWidth: 60
        },
        cell: (info) => {
          const metric = info.getValue();
          return metric ? metric.value : null;
        }
      }
    ),
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Repeats"), {
      header: "Max Repeats",
      meta: {
        width: "20%",
        minWidth: 60
      },
      cell: (info) => {
        const metric = info.getValue();
        return metric ? metric.value : null;
      }
    }),
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "RequestPercentage"),
      {
        header: "Max Requests",
        meta: {
          width: "20%",
          minWidth: 60
        },
        cell: (info) => {
          const metric = info.getValue();
          return metric ? `${metric.value as number}%` : null;
        }
      }
    ),
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Duration"), {
      header: "Max Duration",
      meta: {
        width: "20%",
        minWidth: 60
      },
      cell: (info) => {
        const metric = info.getValue();
        return metric ? (
          <Tag content={getDurationString(metric.value as Duration)} />
        ) : null;
      }
    })
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<SpanNPlusOneMetrics>>
          columns={columns}
          data={data.environment}
        />
      }
    />
  );
};
