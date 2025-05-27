import styled from "styled-components";
import type { MCPServersSideContainerProps } from "./types";

const DEFAULT_GAP_SIZE = 13; // in pixels

export const MCPServersSideContainer = styled.div<MCPServersSideContainerProps>`
  display: flex;
  gap: ${({ $zoomLevel }) =>
    $zoomLevel ? $zoomLevel * DEFAULT_GAP_SIZE : DEFAULT_GAP_SIZE}px;
`;
