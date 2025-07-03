import styled, { css } from "styled-components";
import { Card } from "../../../../../../../common/v3/Card";
import { NewButton } from "../../../../../../../common/v3/NewButton";
import { NewIconButton } from "../../../../../../../common/v3/NewIconButton";
import { Spinner } from "../../../../../../../common/v3/Spinner";
import type { StyledCardProps } from "./types";

export const InsightFooter = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  min-height: 27px;
`;

export const Actions = styled.div`
  margin-left: auto;
  display: flex;
`;

export const MainActionContainer = styled.div`
  margin-left: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledCard = styled(Card)<StyledCardProps>`
  ${({ $isDismissed, theme }) =>
    $isDismissed
      ? css`
          background: ${theme.colors.v3.surface.sidePanelHeader};
        `
      : ""}
  ${({ $isRead, $isReadable, theme }) =>
    $isReadable && $isRead === false
      ? css`
          background: ${theme.colors.v3.surface.brandDarkest};
          border: 1px solid ${theme.colors.v3.stroke.primary};

          &:hover {
            background: ${theme.colors.v3.surface.brandDark};
            border: 1px solid ${theme.colors.v3.stroke.primaryLight};
          }
        `
      : ""}
`;

export const InfoActionButton = styled(NewIconButton)`
  &:hover {
    color: ${({ theme }) => theme.colors.v3.status.medium};
  }
`;

export const SuggestionButton = styled(NewButton)`
  background: ${({ theme }) => theme.colors.v3.status.medium};
  border-color: ${({ theme }) => theme.colors.v3.status.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.v3.status.medium};
    border-color: ${({ theme }) => theme.colors.v3.status.medium};
  }

  &:active {
    background: #b66b26;
    border-color: #b66b26;
  }
`;

export const InvestigateButton = styled(SuggestionButton)`
  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.white};

    span {
      color: currentcolor;
    }
  }
`;

export const InvestigateButtonSpinner = styled(Spinner)`
  color: currentcolor;
`;

export const TraceActionButtonIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
