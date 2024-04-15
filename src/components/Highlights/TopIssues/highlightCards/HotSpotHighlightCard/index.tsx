import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { Table } from "../../../common/Table";
import { TableText } from "../../../common/TableText";
import { handleEnvironmentTableRowClick } from "../../../handleEnvironmentTableRowClick";
import { trackingEvents } from "../../../tracking";
import { HighlightCard } from "../../common/HighlightCard";
import { EnvironmentData, HotSpotMetrics } from "../../types";
import { addEnvironmentColumns } from "../addEnvironmentColumns";
import { HotSpotHighlightCardProps } from "./types";

export const HotSpotHighlightCard = ({ data }: HotSpotHighlightCardProps) => {
  const config = useContext(ConfigContext);

  const columnHelper = createColumnHelper<EnvironmentData<HotSpotMetrics>>();

  const metricsColumns = [
    columnHelper.accessor((x) => x.metrics.find((x) => x.id === "Score"), {
      header: "Score",
      cell: (info) => {
        const metric = info.getValue();
        const value = metric ? String(metric.value) : "";
        return metric ? <TableText title={value}>{value}</TableText> : null;
      }
    })
  ];

  const columns = addEnvironmentColumns(columnHelper, metricsColumns);

  const handleTableRowClick = (row: Row<EnvironmentData<HotSpotMetrics>>) => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_CARD_TABLE_ROW_CLICKED,
      {
        insightType: data.insightType
      }
    );
    handleEnvironmentTableRowClick(
      config.environments,
      row.original.environmentName,
      "insights"
    );
  };

  return (
    <HighlightCard
      highlight={data}
      content={
        <Table<EnvironmentData<HotSpotMetrics>>
          columns={columns}
          data={data.environments}
          onRowClick={handleTableRowClick}
        />
      }
    />
  );
};
