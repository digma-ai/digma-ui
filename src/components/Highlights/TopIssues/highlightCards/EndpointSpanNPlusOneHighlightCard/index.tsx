import type { Row } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type {
  EndpointSpanNPlusOneMetrics,
  EnvironmentData
} from "../../../../../redux/services/types";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { ScopeChangeEvent } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Tag } from "../../../../common/v3/Tag";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { AssetLink } from "../../common/AssetLink";
import { HighlightCard } from "../../common/HighlightCard";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { DescriptionContainer } from "../styles";
import type { EndpointSpanNPlusOneHighlightCardProps } from "./types";

export const EndpointSpanNPlusOneHighlightCard = ({
  data
}: EndpointSpanNPlusOneHighlightCardProps) => {
  const { scope, environments } = useConfigSelector();

  const columnHelper =
    createColumnHelper<EnvironmentData<EndpointSpanNPlusOneMetrics>>();

  const metricsColumns = [
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Repeats"), {
      header: "Repeats",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? String(metric.value) : "";
        return metric ? <TableText title={value}>{value}</TableText> : null;
      }
    }),
    columnHelper.accessor(
      (x) => x.metrics.find((x) => x.id === "RequestPercentage"),
      {
        header: "Requests",
        cell: (info) => {
          const metric = info.getValue();
          const value = metric ? `${String(metric.value)}%` : "";
          return metric ? <TableText title={value}>{value}</TableText> : null;
        }
      }
    ),
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
    row: Row<EnvironmentData<EndpointSpanNPlusOneMetrics>>
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
          {data.asset && (
            <DescriptionContainer>
              Asset
              <AssetLink asset={data.asset} />
            </DescriptionContainer>
          )}
          <Table<EnvironmentData<EndpointSpanNPlusOneMetrics>>
            columns={columns}
            data={data.environments}
            onRowClick={handleTableRowClick}
          />
        </>
      }
    />
  );
};
