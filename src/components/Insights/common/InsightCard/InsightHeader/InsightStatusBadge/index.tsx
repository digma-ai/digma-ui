import { ForwardedRef, forwardRef } from "react";
import { useTheme } from "styled-components";
import { getInsightStatusInfo } from "./getInsightStatusInfo";
import * as s from "./styles";
import { InsightStatusBadgeProps } from "./types";

export const InsightStatusBadgeComponent = (
  props: InsightStatusBadgeProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const theme = useTheme();

  const statusInfo = getInsightStatusInfo(props.status, theme);

  if (!statusInfo) {
    return null;
  }

  return (
    <s.Container className={props.className} ref={ref}>
      <s.Indicator $status={props.status} />
      {statusInfo.label}
    </s.Container>
  );
};

export const InsightStatusBadge = forwardRef(InsightStatusBadgeComponent);
