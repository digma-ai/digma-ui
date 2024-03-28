import { createColumnHelper } from "@tanstack/react-table";
import { Duration } from "../../../../../globals";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Tag } from "../../../../common/v3/Tag";
import { Table } from "../../../Table";
import { HighlightCard } from "../../HighlightCard";
import {
  EndpointHighNumberOfQueriesMetrics,
  EnvironmentData
} from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { EndpointHighNumberOfQueriesHighlightCardProps } from "./types";

export const EndpointHighNumberOfQueriesHighlightCard = ({
  data
}: EndpointHighNumberOfQueriesHighlightCardProps) => {
  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointHighNumberOfQueriesMetrics>>();

  const metricsColumns = [
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "QueriesCount"),
      {
        header: "# of Queries",
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
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "TypicalQueriesCount"),
      {
        header: "Typical",
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
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Duration"), {
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
    })
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<EndpointHighNumberOfQueriesMetrics>>
          columns={columns}
          data={data.environment}
        />
      }
    />
  );
};
