import { createColumnHelper } from "@tanstack/react-table";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Table } from "../../../common/Table";
import { TableTag } from "../../../common/TableTag";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import {
  EndpointQueryOptimizationV2Metrics,
  EnvironmentData
} from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
import { EndpointQueryOptimizationV2HighlightCardProps } from "./types";

export const EndpointQueryOptimizationV2HighlightCard = ({
  data
}: EndpointQueryOptimizationV2HighlightCardProps) => {
  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointQueryOptimizationV2Metrics>>();

  const metricsColumns = [
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Duration"), {
      header: "Duration",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? getDurationString(metric.value) : "";
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
          <DescriptionContainer>
            Query is slow compared to other SELECT statements
            {data.asset && <AssetLink asset={data.asset} />}
          </DescriptionContainer>
          <Table<EnvironmentData<EndpointQueryOptimizationV2Metrics>>
            columns={columns}
            data={data.environments}
          />
        </>
      }
    />
  );
};