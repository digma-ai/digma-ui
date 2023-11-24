import styled from "styled-components";
import { Link } from "../common/Link";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

export const Header = styled.div`
  display: flex;
  padding: 12px 16px 0;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 700;
  align-items: flex-end;
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

export const EnvironmentName = styled.span`
  color: #5a5d63;
  font-size: 14px;
  font-weight: 500;
`;

export const OpenInBrowserLink = styled(Link)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  gap: 8px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  flex-grow: 1;
`;
