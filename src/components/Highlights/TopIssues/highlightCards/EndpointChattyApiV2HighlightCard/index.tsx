import { Row, createColumnHelper } from "@tanstack/react-table";
import { useGlobalStore } from "../../../../../containers/Main/stores/useGlobalStore";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { SCOPE_CHANGE_EVENTS } from "../../../../Main/types";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import { EndpointChattyApiV2Metrics, EnvironmentData } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
import { EndpointChattyApiV2HighlightCardProps } from "./types";

export const EndpointChattyApiV2HighlightCard = ({
  data
}: EndpointChattyApiV2HighlightCardProps) => {
  const scope = useGlobalStore().scope;
  const environments = useGlobalStore().environments;

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

  const handleTableRowClick = (
    row: Row<EnvironmentData<EndpointChattyApiV2Metrics>>
  ) => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_CARD_TABLE_ROW_CLICKED,
      {
        insightType: data.insightType
      }
    );
    handleEnvironmentTableRowClick(
      scope,
      environments,
      row.original.environmentId,
      SCOPE_CHANGE_EVENTS.HIGHLIGHTS_TOP_ISSUES_CARD_ITEM_CLICKED
    );
  };

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
            onRowClick={handleTableRowClick}
          />
        </>
      }
    />
  );
};
