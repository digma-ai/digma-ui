import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import { EndpointChattyApiV2Metrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
import { EndpointChattyApiV2HighlightCardProps } from "./types";

export const EndpointChattyApiV2HighlightCard = ({
  data
}: EndpointChattyApiV2HighlightCardProps) => {
  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointChattyApiV2Metrics>>();

  const metricsColumns = [
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Repeats"), {
      header: "Repeats",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? String(metric.value) : "";
        return metric ? <TableText title={value}>{value}</TableText> : null;
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
            Excessive API calls to specific endpoint found
            {data.asset && <AssetLink asset={data.asset} />}
          </DescriptionContainer>
          <Table<EnvironmentData<EndpointChattyApiV2Metrics>>
            columns={columns}
            data={data.environments}
          />
        </>
      }
    />
  );
};
