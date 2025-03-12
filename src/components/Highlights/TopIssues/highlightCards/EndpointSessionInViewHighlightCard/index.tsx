import type { Row } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type {
  EndpointSessionInViewMetrics,
  EnvironmentData
} from "../../../../../redux/services/types";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { ScopeChangeEvent } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { Table } from "../../../common/Table";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
import type { EndpointSessionInViewHighlightCardProps } from "./types";

export const EndpointSessionInViewHighlightCard = ({
  data
}: EndpointSessionInViewHighlightCardProps) => {
  const { scope, environments } = useConfigSelector();

  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointSessionInViewMetrics>>();

  const columns = addEnvironmentColumns(columnHelper, []);

  const handleTableRowClick = (
    row: Row<EnvironmentData<EndpointSessionInViewMetrics>>
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
      ScopeChangeEvent.HighlightsTopIssuesCardItemClicked
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
