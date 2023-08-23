import styled from "styled-components";
import { Link as CommonLink } from "../common/Link";

export const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const NoDataContainer = styled.div`
  min-height: 100vh;
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

export const TroubleshootingLink = styled(CommonLink)`
  font-size: 14px;
  line-height: normal;
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
