import { ForwardedRef, forwardRef } from "react";
import { useTheme } from "styled-components";
import { getInsightStatusInfo } from "./getInsightStatusInfo";
import * as s from "./styles";
import { InsightStatusBadgeProps } from "./types";

export const InsightStatusBadgeComponent = (
  { status, className, withLabel = true }: InsightStatusBadgeProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const theme = useTheme();

  const statusInfo = getInsightStatusInfo(status, theme);

  if (!statusInfo) {
    return null;
  }

  return (
    <s.Container className={className} ref={ref}>
      <s.Indicator $status={status} />
      {withLabel && <s.Status>{statusInfo.label}</s.Status>}
    </s.Container>
  );
};

export const InsightStatusBadge = forwardRef(InsightStatusBadgeComponent);
