import styled, { css } from "styled-components";
import { subscriptRegularTypography } from "../../../../../../common/App/typographies";
import { Card } from "../../../../../../common/v3/Card";
import { NewIconButton } from "../../../../../../common/v3/NewIconButton";
import { StyledCardProps } from "./types";

export const InsightFooter = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const Description = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const RefreshContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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

export const DismissDialog = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px;
  align-items: center;
  margin: -7px;
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};

  ${subscriptRegularTypography}
`;

export const DismissDialogActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoActionButton = styled(NewIconButton)`
  &:hover {
    color: ${({ theme }) => theme.colors.v3.status.medium};
  }
`;
