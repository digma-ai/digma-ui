import type { ExtendedAgentMCPServer } from "../types";

export interface MCPServerIconProps {
  server: ExtendedAgentMCPServer;
  size?: number;
}

export interface CustomImageProps {
  $size: number;
  $isActive?: boolean;
}
