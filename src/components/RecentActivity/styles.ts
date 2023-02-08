import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 12px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
        return "#0f0f0f";
    }
  }};
`;

export const Header = styled.div`
  margin: 8px 0;
  padding-left: 12px;
  line-height: 16px;
  font-family: "Nunito";
  font-weight: 400;
  font-size: 10px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#b9c0d4";
      case "dark":
        return "#49494d";
    }
  }};
`;

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 18px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfbff";
      case "dark":
        return "#1e1e1e";
    }
  }};
  border-radius: 12px;
`;

export const NoDataTitle = styled.span`
  font-family: "Nunito";
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#002d61";
      case "dark":
        return "#b9c2eb";
    }
  }};
  margin-top: 4px;
`;

export const NoDataText = styled.span`
  font-family: "Nunito";
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
        return "#7c7c94";
    }
  }};
  margin-top: 4px;
`;

export const DocumentationLink = styled.a`
  font-family: "Nunito";
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#426dda";
      case "dark":
        return "#7891d0";
    }
  }};
  text-decoration: none;
`;
