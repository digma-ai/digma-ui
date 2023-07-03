import styled from "styled-components";
import { AreaLegendIllustrationProps, AxisChartContainerProps } from "./types";

// In pixels
const CONTAINER_GAP = 12;
const HEADER_HEIGHT = 24;
const ZOOM_BUTTONS_CONTAINER_HEIGHT = 26;
const CHANGE_STATUS_CONTAINER_HEIGHT = 32;
const FOOTER_HEIGHT = 20;

const getContainerMinHeight = (isChangeStatusBarPresent: boolean) =>
  [
    HEADER_HEIGHT,
    ZOOM_BUTTONS_CONTAINER_HEIGHT,
    isChangeStatusBarPresent ? CHANGE_STATUS_CONTAINER_HEIGHT : 0,
    FOOTER_HEIGHT
  ]
    .filter((x) => x > 0)
    .reduce((acc, cur) => acc + cur + CONTAINER_GAP, 0) + CONTAINER_GAP;

export const Container = styled.div<{ isChangeStatusBarPresent: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${CONTAINER_GAP}px;
  min-height: ${({ isChangeStatusBarPresent }) =>
    getContainerMinHeight(isChangeStatusBarPresent)}px;

  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#d1d1d1";
        case "dark":
        case "dark-jetbrains":
          return "#323232";
      }
    }};

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#383838";
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  gap: 12px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  height: ${HEADER_HEIGHT}px;
  box-sizing: border-box;
  flex: none;

  border-bottom: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "1px solid #d1d1d1";
      case "dark":
      case "dark-jetbrains":
        return "none";
    }
  }};

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e3e7ed";
      case "dark":
      case "dark-jetbrains":
        return "#3c3f41";
    }
  }};
`;

export const Title = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
`;

export const SpanIconContainer = styled.span`
  display: flex;
`;

export const SpanName = styled.span`
  font-size: 12px;
  line-height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#7891d0";
    }
  }};
`;

export const LiveBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  padding: 2px 4px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#426dda";
      case "dark":
      case "dark-jetbrains":
        return "#b9c2eb";
    }
  }};
`;

export const CloseButton = styled.button`
  display: flex;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ChartsContainer = styled.div<{
  isChangeStatusBarPresent: boolean;
}>`
  display: flex;
  height: calc(
    100% -
      ${({ isChangeStatusBarPresent }) =>
        getContainerMinHeight(isChangeStatusBarPresent)}px
  );
  padding-right: 12px;
`;

export const ZoomButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  padding: 0 12px;
  height: ${ZOOM_BUTTONS_CONTAINER_HEIGHT}px;
  flex: none;
`;

export const ZoomButton = styled.button`
  box-sizing: border-box;
  display: flex;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};

  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#fbfdff";
        case "dark":
        case "dark-jetbrains":
          return "#383838";
      }
    }};

  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "1px 1px 3px rgba(0, 0, 0, 0.15)";
      case "dark":
      case "dark-jetbrains":
        return "1px 1px 4px rgba(0, 0, 0, 0.25)";
    }
  }};
`;

export const ChangeStatusContainer = styled.div`
  padding: 0 12px;
  height: ${CHANGE_STATUS_CONTAINER_HEIGHT}px;
  flex: none;
`;

export const AxisChartContainer = styled.div<AxisChartContainerProps>`
  width: ${({ width }) => width + 1}px;
  height: ${({ scrollbarOffset }) =>
    scrollbarOffset ? `calc(100% - ${scrollbarOffset}px)` : "100%"};
  flex-shrink: 0;
`;

export const ChartContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  padding: 0 12px;
  height: ${FOOTER_HEIGHT}px;
  box-sizing: border-box;
  flex: none;
`;

export const LegendContainer = styled.div`
  display: flex;
  gap: 4px;
  font-size: 10px;
  padding: 4px 0;
  line-height: 12px;

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

export const AreaLegendIllustration = styled.div<AreaLegendIllustrationProps>`
  background: ${({ color }) => color}33; // 20% opacity
  border-color: ${({ color }) => color};
  border-style: solid none;
  border-width: 1px;
  width: 10px;
  box-sizing: border-box;
  height: 100%;
`;

export const LatestDataButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 4px;
  gap: 2px;
  border-radius: 2px;
  align-self: flex-end;
  font-size: 10px;
  line-height: 12px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#3538cd";
      case "dark":
      case "dark-jetbrains":
        return "#e2e7ff";
    }
  }};

  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#3538cd";
        case "dark":
        case "dark-jetbrains":
          return "#5154ec";
      }
    }};

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "none";
      case "dark":
      case "dark-jetbrains":
        return "#414363";
    }
  }};
`;

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
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
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;

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
  width: 208px;
`;
