import { createColumnHelper } from "@tanstack/react-table";
import { Duration } from "../../../../../globals";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Table } from "../../../common/Table";
import { TableTag } from "../../../common/TableTag";
import { TableText } from "../../../common/TableText";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import { EndpointSlowdownSourceMetrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
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
        cell: (info) => {
          const metric = info.getValue();
          const value = metric
            ? getDurationString(metric.value as Duration)
            : "";
          return metric ? <TableTag title={value} content={value} /> : null;
        }
      }
    ),
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "DifferencePercentage"),
      {
        header: "% Slower",
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
        <>
          <DescriptionContainer>
            Found spans slowing the endpoint
            {data.asset && <AssetLink asset={data.asset} />}
          </DescriptionContainer>
          <Table<EnvironmentData<EndpointSlowdownSourceMetrics>>
            columns={columns}
            data={data.environments}
          />
        </>
      }
    />
  );
};
