import styled from "styled-components";
import { Button } from "../../common/v3/Button";

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 18px;
  border-radius: 12px;
  gap: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
        return "#1e1e1e";
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
`;

export const NoDataTitle = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#002d61";
      case "dark":
      case "dark-jetbrains":
        return "#b9c2eb";
    }
  }};
`;

export const NoDataText = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#7c7c94";
    }
  }};
`;

export const TroubleshootButton = styled(Button)`
  margin-top: 8px;
`;
