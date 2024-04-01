import styled from "styled-components";
import { Description } from "../../../../styles";
import { ChartContainerProps, LastCallTimeDistanceProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 6px;
`;

export const Stats = styled.div`
  display: flex;
  gap: 8px;
`;

export const StatsTitle = styled(Description)`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const ValueContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const LastCallTimeDistance = styled.div<LastCallTimeDistanceProps>`
  color: ${({ theme, $isRecent }) => {
    if ($isRecent) {
      switch (theme.mode) {
        case "light":
          return "#426dda";
        case "dark":
        case "dark-jetbrains":
          return "#92affa";
      }
    }

    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const ChartContainer = styled.div<ChartContainerProps>`
  width: 100%;
  height: ${({ $height }) => $height}px;
`;

export const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 0 6px rgb(0 0 0 / 15%);
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
`;
