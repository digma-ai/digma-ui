import styled from "styled-components";
import {
  caption1RegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Button } from "../../common/v3/Button";

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
  justify-content: space-between;
  padding: 8px;
  gap: 8px;
`;

export const DismissedDescription = styled.div`
  ${subscriptRegularTypography}
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.disabled};
`;

export const DismissedCount = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  padding-right: 4px;
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
