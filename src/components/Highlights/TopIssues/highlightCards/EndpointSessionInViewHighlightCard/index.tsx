import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../../Table";
import { HighlightCard } from "../../HighlightCard";
import { EndpointSessionInViewMetrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { EndpointSessionInViewHighlightCardProps } from "./types";

export const EndpointSessionInViewHighlightCard = ({
  data
}: EndpointSessionInViewHighlightCardProps) => {
  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointSessionInViewMetrics>>();

  const columns = addEnvironmentColumns(columnHelper, []);

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<EndpointSessionInViewMetrics>>
          columns={columns}
          data={data.environment}
        />
      }
    />
  );
};
