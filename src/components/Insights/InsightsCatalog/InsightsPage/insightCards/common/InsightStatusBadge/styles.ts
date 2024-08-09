import styled, { css } from "styled-components";
import { footnoteRegularTypography } from "../../../../../../common/App/typographies";
import { getInsightStatusInfo } from "./getInsightStatusInfo";
import { IndicatorProps } from "./types";

export const Container = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  padding: 4px 0;
`;

export const Indicator = styled.div<IndicatorProps>`
  border-radius: 50%;
  width: 6px;
  height: 6px;
  ${({ theme, $status }) => {
    const statusInfo = getInsightStatusInfo($status, theme);

    return statusInfo
      ? css`
          background: ${statusInfo.color};
        `
      : "";
  }}
`;

export const Status = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
