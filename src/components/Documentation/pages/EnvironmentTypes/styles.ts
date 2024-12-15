import styled from "styled-components";
import type { ContainerProps, HeaderProps } from "./types";

// in pixels
const COLUMN_MIN_WIDTH = 280;
const COLUMN_PADDING = 8;

const getContainerMinWidth = (columnCount: number) => {
  return COLUMN_MIN_WIDTH * columnCount + (columnCount + 1) * COLUMN_PADDING;
};

export const Container = styled.div<ContainerProps>`
  height: 100%;
  min-width: ${({ $columnCount }) => getContainerMinWidth($columnCount)}px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "rgb(235 236 240 / 59%)";
      case "dark":
      case "dark-jetbrains":
        return "rgb(66 65 65 / 59%)";
    }
  }};
  backdrop-filter: blur(12px);
  overflow: hidden;
`;

export const TopGradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: -2.7%;
  right: -5%;
  height: 56%;
  border-radius: 107.7vw;
  opacity: 0.2;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4f5da3 0%,
    rgb(79 93 163 / 0%) 100%
  );
  filter: blur(5px);
  z-index: -1;
`;

export const BottomGradientBackground = styled.div`
  position: absolute;
  top: 47%;
  left: -3.9%;
  right: -3.9%;
  height: 156%;
  border-radius: 156vh;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4f5da3 0%,
    rgb(79 93 163 / 0%) 100%
  );
  filter: blur(5px);
  z-index: -1;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

export const Header = styled.div<HeaderProps>`
  position: sticky;
  top: 0;
  display: flex;
  padding: 16px 16px 1px;
  flex-direction: column;
  gap: 7px;
  border-bottom: 1px solid #484848;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const EnvironmentsContainer = styled.div`
  padding: 15px 16px ${COLUMN_PADDING}px;
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const TableRow = styled.div`
  display: flex;
  gap: 8px;
  flex-grow: 1;
`;

export const TableCell = styled.div`
  display: flex;
  flex: 1 1 0;
  padding-bottom: 12px;
`;
