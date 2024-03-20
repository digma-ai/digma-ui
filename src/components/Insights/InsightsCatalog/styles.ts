import styled from "styled-components";
import {
  caption1RegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Button } from "../../common/v3/Button";
import { Link } from "../../common/v3/Link";

export const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 8px;
  ${caption1RegularTypography}
`;

export const FooterItemsCount = styled.span`
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const FooterPageItemsCount = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
`;

export const ToolbarRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

export const ViewModeToolbarRow = styled(ToolbarRow)`
  padding: 4px 0;
`;

export const BackToAllInsightsButtonIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.disabled};
`;

export const BackToAllInsightsButton = styled.button`
  ${subscriptRegularTypography}

  font-family: inherit;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const MarkingAsReadToolbarActionsContainer = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  align-items: center;
`;

export const MarkingAsReadToolbarActionLink = styled(Link)`
  ${subscriptRegularTypography}

  text-decoration: underline;
`;

export const InsightCountDescription = styled.div`
  ${subscriptRegularTypography}
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  gap: 5px;
`;

export const InsightCount = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const InsightsViewModeToolbar = styled(Toolbar)`
  padding: 0 8px;
`;

export const RefreshButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};

  &:hover:enabled {
    color: ${({ theme }) => theme.colors.v3.icon.white};
    background: none;
  }
`;
