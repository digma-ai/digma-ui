import styled from "styled-components";
import { NewButton } from "../../../common/v3/NewButton";
import type { MCPServersSideContainerProps } from "./types";

const DEFAULT_GAP_SIZE = 13; // in pixels

export const MCPServersSideContainer = styled.div<MCPServersSideContainerProps>`
  display: flex;
  gap: ${({ $zoomLevel }) =>
    $zoomLevel ? $zoomLevel * DEFAULT_GAP_SIZE : DEFAULT_GAP_SIZE}px;
`;

export const PlusButton = styled(NewButton)`
  padding: 5px;
`;
