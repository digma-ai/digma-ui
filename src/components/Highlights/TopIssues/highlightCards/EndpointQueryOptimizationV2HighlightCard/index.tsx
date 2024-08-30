import { Row, createColumnHelper } from "@tanstack/react-table";
import { useGlobalStore } from "../../../../../containers/Main/stores/useGlobalStore";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../../../utils/getDurationString";
import { SCOPE_CHANGE_EVENTS } from "../../../../Main/types";
import { Tag } from "../../../../common/v3/Tag";
import { Table } from "../../../common/Table";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import {
  EndpointQueryOptimizationV2Metrics,
  EnvironmentData
} from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
import { EndpointQueryOptimizationV2HighlightCardProps } from "./types";

export const EndpointQueryOptimizationV2HighlightCard = ({
  data
}: EndpointQueryOptimizationV2HighlightCardProps) => {
  const scope = useGlobalStore().scope;
  const environments = useGlobalStore().environments;

  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointQueryOptimizationV2Metrics>>();

  const metricsColumns = [
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Duration"), {
      header: "Duration",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? getDurationString(metric.value) : "";
        return metric ? <Tag title={value} content={value} /> : null;
      }
    })
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  const handleTableRowClick = (
    row: Row<EnvironmentData<EndpointQueryOptimizationV2Metrics>>
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
            Query is slow compared to other SELECT statements
            {data.asset && <AssetLink asset={data.asset} />}
          </DescriptionContainer>
          <Table<EnvironmentData<EndpointQueryOptimizationV2Metrics>>
            columns={columns}
            data={data.environments}
            onRowClick={handleTableRowClick}
          />
        </>
      }
    />
  );
};
