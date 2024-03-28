import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../../Table";
import { HighlightCard } from "../../HighlightCard";
import { EndpointChattyApiV2Metrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { EndpointChattyApiV2HighlightCardProps } from "./types";

export const EndpointChattyApiV2HighlightCard = ({
  data
}: EndpointChattyApiV2HighlightCardProps) => {
  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointChattyApiV2Metrics>>();

  const metricsColumns = [
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Repeats"), {
      header: "Repeats",
      meta: {
        width: "20%",
        minWidth: 60
      },
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
        <Table<EnvironmentData<EndpointChattyApiV2Metrics>>
          columns={columns}
          data={data.environment}
        />
      }
    />
  );
};
