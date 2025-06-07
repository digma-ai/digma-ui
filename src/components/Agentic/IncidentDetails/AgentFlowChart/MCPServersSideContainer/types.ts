import type { ExtendedAgentMCPServer } from "../types";

export interface MCPServersSideContainerProps {
  servers: ExtendedAgentMCPServer[];
}

export interface ContainerProps {
  $zoomLevel?: number;
}

export interface MCPServerBlockProps {
  $isActive?: boolean;
  $zoomLevel?: number;
}
