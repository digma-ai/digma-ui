import styled from "styled-components";
import { Link } from "../../common/Link";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px 8px;
  margin: 0;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const NoDataContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmptyStateDescription = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  text-align: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#7c7c94";
    }
  }};
`;

export const TroubleshootingLink = styled(Link)`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#92affa";
    }
  }};
`;
