import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext } from "react";
import { Duration } from "../../../../../globals";
import { getDurationString } from "../../../../../utils/getDurationString";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { Table } from "../../../common/Table";
import { TableTag } from "../../../common/TableTag";
import { TableText } from "../../../common/TableText";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import { EndpointSpanNPlusOneMetrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { handleEnvironmentTableRowClick } from "../goToEnvironmentIssues";
import { DescriptionContainer } from "../styles";
import { EndpointSpanNPlusOneHighlightCardProps } from "./types";

export const EndpointSpanNPlusOneHighlightCard = ({
  data
}: EndpointSpanNPlusOneHighlightCardProps) => {
  const config = useContext(ConfigContext);

  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointSpanNPlusOneMetrics>>();

  const metricsColumns = [
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Repeats"), {
      header: "Repeats",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? String(metric.value) : "";
        return metric ? <TableText title={value}>{value}</TableText> : null;
      }
    }),
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "RequestPercentage"),
      {
        header: "Requests",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? `${String(metric.value)}%` : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
        }
      }
    ),
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Duration"), {
      header: "Duration",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? getDurationString(metric.value as Duration) : "";
        return metric ? <TableTag title={value} content={value} /> : null;
      }
    })
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  const handleTableRowClick = (
    row: Row<EnvironmentData<EndpointSpanNPlusOneMetrics>>
  ) => {
    handleEnvironmentTableRowClick(
      config.environments,
      row.original.environmentName,
      data.insightType
    );
  };

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
          <Table<EnvironmentData<EndpointSpanNPlusOneMetrics>>
            columns={columns}
            data={data.environments}
            onRowClick={handleTableRowClick}
          />
        </>
      }
    />
  );
};
