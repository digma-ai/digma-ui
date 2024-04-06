import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext } from "react";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { Table } from "../../../common/Table";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import { EndpointSessionInViewMetrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { handleEnvironmentTableRowClick } from "../goToEnvironmentIssues";
import { DescriptionContainer } from "../styles";
import { EndpointSessionInViewHighlightCardProps } from "./types";

export const EndpointSessionInViewHighlightCard = ({
  data
}: EndpointSessionInViewHighlightCardProps) => {
  const config = useContext(ConfigContext);

  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointSessionInViewMetrics>>();

  const columns = addEnvironmentColumns(columnHelper, []);

  const handleTableRowClick = (
    row: Row<EnvironmentData<EndpointSessionInViewMetrics>>
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
          <DescriptionContainer>
            Query execution was detected during the view rendering
            {data.asset && <AssetLink asset={data.asset} />}
          </DescriptionContainer>
          <Table<EnvironmentData<EndpointSessionInViewMetrics>>
            columns={columns}
            data={data.environments}
            onRowClick={handleTableRowClick}
          />
        </>
      }
    />
  );
};
