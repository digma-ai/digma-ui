import type { ExtendedAgentMCPServer } from "../types";

export interface MCPServersToolbarProps {
  servers: ExtendedAgentMCPServer[];
  onAddMCPServer: () => void;
  onEditMCPServers: () => void;
}

export interface ContainerProps {
  $zoomLevel?: number;
}
