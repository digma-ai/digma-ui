import styled, { css } from "styled-components";
import { footnoteRegularTypography } from "../../../../common/App/typographies";
import { Chip } from "../../../../common/Chip";
import { activeStyles } from "../../../../common/Chip/styles";
import { CounterProps, ISSUE_CRITICALITY, StyledChipProps } from "./types";

export const StyledChip = styled(Chip)<StyledChipProps>`
  gap: 4px;

  ${({ $isActive }) => ($isActive ? activeStyles : "")}
  ${({ $isActive }) =>
    $isActive
      ? css`
          cursor: initial;
        `
      : ""}
`;

export const IconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.secondary};
  opacity: 0.5;
`;

export const Name = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Counter = styled.div<CounterProps>`
  ${footnoteRegularTypography}

  height: 16px;
  display: flex;
  justify-content: center;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  border-radius: 2px;
  margin-left: auto;

  ${({ $criticality }) => {
    switch ($criticality) {
      case ISSUE_CRITICALITY.HIGH:
        return css`
          background: ${({ theme }) => theme.colors.v3.status.high};
        `;
      case ISSUE_CRITICALITY.MEDIUM:
        return css`
          background: ${({ theme }) => theme.colors.v3.status.medium};
        `;
      case ISSUE_CRITICALITY.LOW:
      default:
        return css`
          background: ${({ theme }) => theme.colors.v3.status.backgroundLow};
        `;
    }
  }}
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TooltipContentIssueCountsContainer = styled.span`
  display: flex;
  flex-direction: column;
`;
