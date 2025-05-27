import styled from "styled-components";
import type { MCPServerBlockElementProps } from "./types";

const DEFAULT_MCP_SERVER_BLOCK_SIZE = 50; // in pixels

export const MCPServerBlock = styled.div<MCPServerBlockElementProps>`
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.v3.text.primary : "#3B3D46"};
  background: ${({ $isActive }) =>
    $isActive
      ? `linear-gradient(180deg, #28292D 0%, #1A1B1E 100%), linear-gradient(180deg, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 0%) 100%)`
      : "none"};
`;
