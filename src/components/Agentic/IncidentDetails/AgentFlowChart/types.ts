import type { Position } from "@xyflow/react";
import type { Agent } from "../../../../redux/services/types";

export interface AgentFlowChartProps {
  agents: ExtendedAgent[];
  onAgentSelect: (agentId: string | null) => void;
  selectedAgentId: string | null;
  className?: string;
  isEditMode?: boolean;
  onAddMCPServer?: (agentId: string, position: Position) => void;
}

export interface MCPServersSideContainerProps {
  $zoomLevel?: number;
}

export interface ExtendedAgent extends Agent {
  mcp_servers: {
    name: string;
    display_name: string;
    active: boolean;
    position?: Position;
  }[];
}
