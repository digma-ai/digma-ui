import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../../../utils/getDurationString";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { Tag } from "../../../../common/v3/Tag";
import { Table } from "../../../common/Table";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import { EndpointSlowdownSourceMetrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
import { EndpointSlowdownSourceHighlightCardProps } from "./types";

export const EndpointSlowdownSourceHighlightCard = ({
  data
}: EndpointSlowdownSourceHighlightCardProps) => {
  const config = useContext(ConfigContext);

  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointSlowdownSourceMetrics>>();

  const metricsColumns = [
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "DifferenceDelta"),
      {
        header: "Slower by",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? getDurationString(metric.value) : "";
          return metric ? <Tag title={value} content={value} /> : null;
        }
      }
    )
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  const handleTableRowClick = (
    row: Row<EnvironmentData<EndpointSlowdownSourceMetrics>>
  ) => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_CARD_TABLE_ROW_CLICKED,
      {
        insightType: data.insightType
      }
    );
    handleEnvironmentTableRowClick(
      config.environments,
      row.original.environmentId,
      "insights"
    );
  };

  return (
    <HighlightCard
      highlight={data}
      content={
        <>
          <DescriptionContainer>
            Found spans slowing the endpoint
            {data.asset && <AssetLink asset={data.asset} />}
          </DescriptionContainer>
          <Table<EnvironmentData<EndpointSlowdownSourceMetrics>>
            columns={columns}
            data={data.environments}
            onRowClick={handleTableRowClick}
          />
        </>
      }
    />
  );
};
