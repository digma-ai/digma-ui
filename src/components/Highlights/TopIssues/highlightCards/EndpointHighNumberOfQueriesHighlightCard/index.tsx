import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { SCOPE_CHANGE_EVENTS } from "../../../../Main/types";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import {
  EndpointHighNumberOfQueriesMetrics,
  EnvironmentData
} from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
import { EndpointHighNumberOfQueriesHighlightCardProps } from "./types";

export const EndpointHighNumberOfQueriesHighlightCard = ({
  data
}: EndpointHighNumberOfQueriesHighlightCardProps) => {
  const config = useContext(ConfigContext);

  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointHighNumberOfQueriesMetrics>>();

  const metricsColumns = [
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "QueriesCount"),
      {
        header: "# of Queries",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? String(metric.value) : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
        }
      }
    ),
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "TypicalQueriesCount"),
      {
        header: "Typical",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? String(metric.value) : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
        }
      }
    )
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  const handleTableRowClick = (
    row: Row<EnvironmentData<EndpointHighNumberOfQueriesMetrics>>
  ) => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_CARD_TABLE_ROW_CLICKED,
      {
        insightType: data.insightType
      }
    );
    handleEnvironmentTableRowClick(
      config.scope,
      config.environments,
      row.original.environmentId,
      SCOPE_CHANGE_EVENTS.HIGHLIGHTS_TOP_ISSUES_CARD_ITEM_CLICKED
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
          <Table<EnvironmentData<EndpointHighNumberOfQueriesMetrics>>
            columns={columns}
            data={data.environments}
            onRowClick={handleTableRowClick}
          />
        </>
      }
    />
  );
};
