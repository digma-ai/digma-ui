import type { ExtendedAgentMCPServer } from "../types";

export interface MCPServersToolbarProps {
  servers: ExtendedAgentMCPServer[];
  onSetMCPServer: (server: string) => void;
  onDeleteMCPServer: (server: string) => void;
}

export interface ContainerProps {
  $zoomLevel?: number;
}

export interface MCPServerIconContainerProps {
  $isEditable?: boolean;
}
