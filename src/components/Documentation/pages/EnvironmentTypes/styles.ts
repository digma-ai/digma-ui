import styled from "styled-components";
import { ContainerProps, HeaderProps } from "./types";

// in pixels
const COLUMN_MIN_WIDTH = 280;
const COLUMN_PADDING = 8;
const ENVIRONMENT_TYPES_OFFSET = 93;

const getContainerMinWidth = (columnCount: number) => {
  return COLUMN_MIN_WIDTH * columnCount + (columnCount + 1) * COLUMN_PADDING;
};

export const Container = styled.div<ContainerProps>`
  min-height: 100vh;
  min-width: ${({ $columnCount }) => getContainerMinWidth($columnCount)}px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
      case "dark-jetbrains":
        return "#191919";
    }
  }};
`;

export const Header = styled.div<HeaderProps>`
  position: absolute;
  min-width: ${({ $columnCount }) => getContainerMinWidth($columnCount)}px;
  box-sizing: border-box;
  left: 0;
  right: 0;
  display: flex;
  height: 151px;
  padding: 12px 12px ${ENVIRONMENT_TYPES_OFFSET}px;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
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

export const Title = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
`;

export const EnvironmentsContainer = styled.div`
  position: relative;
  padding: ${ENVIRONMENT_TYPES_OFFSET}px ${COLUMN_PADDING}px ${COLUMN_PADDING}px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
`;

export const EnvironmentTypeContainer = styled.div`
  min-width: ${COLUMN_MIN_WIDTH}px;
`;
