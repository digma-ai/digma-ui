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
import { EnvironmentData, SpanQueryOptimizationMetrics } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { goToEnvironmentIssues } from "../goToEnvironmentIssues";
import { DescriptionContainer } from "../styles";
import { SpanQueryOptimizationHighlightCardProps } from "./types";

export const SpanQueryOptimizationHighlightCard = ({
  data
}: SpanQueryOptimizationHighlightCardProps) => {
  const config = useContext(ConfigContext);

  const columnHelper =
    createColumnHelper<EnvironmentData<SpanQueryOptimizationMetrics>>();

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
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Duration"), {
      header: "Duration",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? getDurationString(metric.value as Duration) : "";
        return metric ? <TableTag title={value} content={value} /> : null;
      }
    }),
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "TypicalDuration"),
      {
        header: "Typical Duration",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric
            ? getDurationString(metric.value as Duration)
            : "";
          return metric ? <TableTag title={value} content={value} /> : null;
        }
      }
    ),
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Database"), {
      header: "Database",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? String(metric.value) : "";
        return metric ? <TableText title={value}>{value}</TableText> : null;
      }
    })
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  const handleTableRowClick = (
    row: Row<EnvironmentData<SpanQueryOptimizationMetrics>>
  ) => {
    goToEnvironmentIssues(
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
          <DescriptionContainer>
            Query is slow compared to other SELECT statements
            {data.asset && <AssetLink asset={data.asset} />}
          </DescriptionContainer>
          <Table<EnvironmentData<SpanQueryOptimizationMetrics>>
            columns={columns}
            data={data.environments}
            onRowClick={handleTableRowClick}
          />
        </>
      }
    />
  );
};
