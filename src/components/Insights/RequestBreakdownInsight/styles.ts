import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PieChartContainer = styled.div`
  padding: 2px;
  border-radius: 50%;
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e5eaf1";
      case "dark":
      case "dark-jetbrains":
        return "#1e1e1e";
    }
  }};
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const LegendItemDataColor = styled.div<{ color: string }>`
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

export const LegendItemDataLabel = styled.span`
  font-size: 10px;
  line-height: normal;
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

export const LegendItemDataValue = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: normal;
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
