import styled from "styled-components";
import theme from "styled-theming";

export const Container = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  background-color: ${theme("mode", {
    light: "#f1f5fa",
    dark: "#0f0f0f"
  })};
`;

export const Header = styled.div`
  margin: 8px 0;
  padding-left: 12px;
  line-height: 16px;
  font-family: "Nunito";
  font-weight: 400;
  font-size: 10px;
  color: ${theme("mode", {
    light: "#b9c0d4",
    dark: "#49494d"
  })};
`;

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 18px;
  background: ${theme("mode", {
    light: "#fbfbff",
    dark: "#1e1e1e"
  })};
  border-radius: 12px;
`;

export const NoDataTitle = styled.span`
  font-family: "Nunito";
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
  color: ${theme("mode", {
    light: "#002d61",
    dark: "#b9c2eb"
  })};
  margin-top: 4px;
`;

export const NoDataText = styled.span`
  font-family: "Nunito";
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: ${theme("mode", {
    light: "#828797",
    dark: "#7c7c94"
  })};
  margin-top: 4px;
`;

export const DocumentationLink = styled.a`
  font-family: "Nunito";
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: ${theme("mode", {
    light: "#426dda",
    dark: "#7891d0"
  })};
  text-decoration: none;
`;
