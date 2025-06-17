import type { ExtendedAgentMCPServer } from "../types";

export interface MCPServersToolbarProps {
  servers: ExtendedAgentMCPServer[];
  onEditMCPServer: (server: string) => void;
}

export interface ContainerProps {
  $zoomLevel?: number;
}
