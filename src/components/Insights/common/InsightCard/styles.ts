import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";
import { Button } from "../../../common/v3/Button";
import { Card } from "../../../common/v3/Card";
import { StyledInsightCardProps } from "./types";

export const InsightFooter = styled.div`
  display: flex;
  justify-content: space-between;
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

export const MainActions = styled(Actions)`
  padding-left: 4px;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledInsightCard = styled(Card)<StyledInsightCardProps>`
  ${({ $isDismissed, theme }) => {
    if ($isDismissed) {
      return `background: ${theme.colors.v3.surface.sidePanelHeader}`;
    }
  }}
`;

export const DismissButton = styled(Button)`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;
