import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../../common/Table";
import { HighlightCard } from "../../common/HighlightCard";
import { EnvironmentData, HotSpotMetrics } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { HotSpotHighlightCardProps } from "./types";

export const HotSpotHighlightCard = ({ data }: HotSpotHighlightCardProps) => {
  const columnHelper = createColumnHelper<EnvironmentData<HotSpotMetrics>>();

  const metricsColumns = [
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Score"), {
      header: "Score",
      cell: (info) => {
        const metric = info.getValue();
        return metric ? metric.value : null;
      }
    })
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<HotSpotMetrics>>
          columns={columns}
          data={data.environment}
        />
      }
    />
  );
};
