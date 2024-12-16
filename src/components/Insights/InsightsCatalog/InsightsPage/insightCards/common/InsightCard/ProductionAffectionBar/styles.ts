import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../../../../common/App/typographies";
import type { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  ${footnoteRegularTypography}

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.status.high};
  background: ${({ theme, $isActive }) =>
    $isActive
      ? theme.colors.v3.status.backgroundHigh
      : theme.colors.v3.pieChart.darkRed};
  display: flex;
  align-items: center;
  padding: 6px 8px;
  gap: 4px;
`;

export const SparkleIconContainer = styled.div`
  color: ${({ theme }) => theme.colors.v3.status.high};
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: auto;
`;

export const TicketStatus = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
