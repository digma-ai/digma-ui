import { useTheme } from "styled-components";
import { getInsightStatusInfo } from "../../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightStatusBadge/getInsightStatusInfo";
import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import type { TableInsightStatusBadgeProps } from "./types";

export const TableInsightStatusBadge = ({
  status
}: TableInsightStatusBadgeProps) => {
  const theme = useTheme();
  const statusInfo = getInsightStatusInfo(status, theme);
  return (
    <Tooltip title={statusInfo?.label}>
      <s.Badge status={status} />
    </Tooltip>
  );
};
