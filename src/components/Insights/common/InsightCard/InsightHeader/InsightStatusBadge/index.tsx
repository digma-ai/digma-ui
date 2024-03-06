import { useTheme } from "styled-components";
import { getInsightStatusInfo } from "./getInsightStatusInfo";
import * as s from "./styles";
import { InsightStatusBadgeProps } from "./types";

export const InsightStatusBadge = (props: InsightStatusBadgeProps) => {
  const theme = useTheme();

  const statusInfo = getInsightStatusInfo(props.status, theme);

  if (statusInfo) {
    return (
      <s.Container>
        <s.Indicator $status={props.status} />
        {statusInfo.label}
      </s.Container>
    );
  }

  return null;
};
