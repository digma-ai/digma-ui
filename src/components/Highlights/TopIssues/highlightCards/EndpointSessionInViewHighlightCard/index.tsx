import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../../common/Table";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import { EndpointSessionInViewMetrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
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
        <>
          <DescriptionContainer>
            Query execution was detected during the view rendering
            {data.asset && <AssetLink asset={data.asset} />}
          </DescriptionContainer>
          <Table<EnvironmentData<EndpointSessionInViewMetrics>>
            columns={columns}
            data={data.environments}
          />
        </>
      }
    />
  );
};
