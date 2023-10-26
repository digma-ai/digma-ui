import styled from "styled-components";
import { Button } from "../../../../common/Button";
import { Link as CommonLink } from "../../../../common/Link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 280px;
  flex-grow: 1;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f7f8fa";
      case "dark":
      case "dark-jetbrains":
        return "#1e1f22";
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 12px 12px;
  gap: 4px;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fff";
      case "dark":
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
`;

export const Title = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  align-items: center;
`;

export const StatusContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NoDataContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #9b9b9b;
  font-weight: 500;
  font-size: 12px;
`;

export const Link = styled(CommonLink)`
  color: inherit;
`;

export const InsightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AddEnvironmentButton = styled(Button)`
  width: 100%;
`;
