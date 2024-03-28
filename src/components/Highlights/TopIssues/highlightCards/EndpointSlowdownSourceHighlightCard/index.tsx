import { createColumnHelper } from "@tanstack/react-table";
import { Duration } from "../../../../../globals";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Tag } from "../../../../common/v3/Tag";
import { Table } from "../../../Table";
import { HighlightCard } from "../../HighlightCard";
import { EndpointSlowdownSourceMetrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { EndpointSlowdownSourceHighlightCardProps } from "./types";

export const EndpointSlowdownSourceHighlightCard = ({
  data
}: EndpointSlowdownSourceHighlightCardProps) => {
  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointSlowdownSourceMetrics>>();

  const metricsColumns = [
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "DifferenceDelta"),
      {
        header: "Slower by",
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
    ),
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "DifferencePercentage"),
      {
        header: "% Slower",
        meta: {
          width: "20%",
          minWidth: 60
        },
        cell: (info) => {
          const metric = info.getValue();
          return metric ? `${metric.value as number}%` : null;
        }
      }
    )
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<EndpointSlowdownSourceMetrics>>
          columns={columns}
          data={data.environment}
        />
      }
    />
  );
};
