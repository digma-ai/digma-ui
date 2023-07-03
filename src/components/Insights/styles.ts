import styled from "styled-components";
import { Link as CommonLink } from "../common/Link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  min-height: 100vh;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#3d3f41";
    }
  }};
`;

export const InsightsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  flex-grow: 1;
`;

export const Description = styled.span`
  font-size: 10px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const Link = styled(CommonLink)`
  font-size: 10px;
  line-height: normal;
  text-decoration: none;

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

export const InsightGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InsightGroupName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: normal;
  height: 16px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;
