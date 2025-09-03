import styled from "styled-components";
import type { ContainerProps, MCPServerBlockProps } from "./types";

const DEFAULT_GAP_SIZE = 13; // in pixels
const DEFAULT_MCP_SERVER_BLOCK_SIZE = 50; // in pixels

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ $zoomLevel }) =>
    $zoomLevel ? $zoomLevel * DEFAULT_GAP_SIZE : DEFAULT_GAP_SIZE}px;
  max-width: calc(
    3 *
      ${({ $zoomLevel }) =>
        $zoomLevel
          ? $zoomLevel * DEFAULT_MCP_SERVER_BLOCK_SIZE
          : DEFAULT_MCP_SERVER_BLOCK_SIZE}px +
      2 *
      ${({ $zoomLevel }) =>
        $zoomLevel ? $zoomLevel * DEFAULT_GAP_SIZE : DEFAULT_GAP_SIZE}px
  );
`;

export const MCPServerBlock = styled.div<MCPServerBlockProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: ${({ $zoomLevel }) =>
    $zoomLevel
      ? $zoomLevel * DEFAULT_MCP_SERVER_BLOCK_SIZE
      : DEFAULT_MCP_SERVER_BLOCK_SIZE}px;
  width: ${({ $zoomLevel }) =>
    $zoomLevel
      ? $zoomLevel * DEFAULT_MCP_SERVER_BLOCK_SIZE
      : DEFAULT_MCP_SERVER_BLOCK_SIZE}px;
  border-radius: 9px;
  border: 1px solid rgb(255 255 255 / 10%);
  color: ${
    ({ theme, $isActive }) =>
      $isActive
        ? theme.colors.v3.text.primary
        : "#3b3d46" /* TODO: change to color from the theme */
  };
  background: ${({ $isActive }) =>
    $isActive
      ? `linear-gradient(180deg, #28292D 0%, #1A1B1E 100%), linear-gradient(180deg, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 0%) 100%)`
      : "none"};
`;
