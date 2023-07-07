import styled from "styled-components";
import { Link } from "../common/Link";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 62px 38px;
  font-weight: 500;
  font-size: 12px;
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

export const NoDataTitle = styled.span`
  font-size: 14px;
  text-transform: capitalize;
  margin: 20px 0 4px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const NoDataText = styled.span`
  margin-bottom: 14px;
`;

export const Circle = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#d0d6eb";
      case "dark":
      case "dark-jetbrains":
        return "#323334";
    }
  }};
`;

export const SlackLink = styled(Link)`
  font-size: 12px;
  line-height: 16px;
`;
