import { createColumnHelper } from "@tanstack/react-table";
import { Duration } from "../../../../../globals";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Tag } from "../../../../common/v3/Tag";
import { Table } from "../../../Table";
import { HighlightCard } from "../../HighlightCard";
import { EndpointBottleneckMetrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { EndpointBottleneckHighlightCardProps } from "./types";

export const EndpointBottleneckHighlightCard = ({
  data
}: EndpointBottleneckHighlightCardProps) => {
  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointBottleneckMetrics>>();

  const metricsColumns = [
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "PercentageWhenBottleneck"),
      {
        header: "% of Duration",
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
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "RequestPercentage"),
      {
        header: "Requests",
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
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "DurationWhenBottleneck"),
      {
        header: "Duration",
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
      }
    )
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<EndpointBottleneckMetrics>>
          columns={columns}
          data={data.environment}
        />
      }
    />
  );
};
