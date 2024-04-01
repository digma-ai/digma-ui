import { createColumnHelper } from "@tanstack/react-table";
import { Duration } from "../../../../../globals";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Table } from "../../../common/Table";
import { TableTag } from "../../../common/TableTag";
import { TableText } from "../../../common/TableText";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import {
  EndpointHighNumberOfQueriesMetrics,
  EnvironmentData
} from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
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
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? String(metric.value) : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
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
          const value = metric ? String(metric.value) : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
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
        const value = metric ? getDurationString(metric.value as Duration) : "";
        return metric ? <TableTag title={value} content={value} /> : null;
      }
    })
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  return (
    <HighlightCard
      highlight={data}
      content={
        <>
          {data.asset && (
            <DescriptionContainer>
              Asset
              <AssetLink asset={data.asset} />
            </DescriptionContainer>
          )}
          <Table<EnvironmentData<EndpointHighNumberOfQueriesMetrics>>
            columns={columns}
            data={data.environments}
          />
        </>
      }
    />
  );
};
