import type { Position } from "@xyflow/react";
import type { Agent, AgentMCPServer } from "../../../../redux/services/types";

export interface AgentFlowChartProps {
  agents: ExtendedAgent[];
  onAgentSelect: (agentId: string | null) => void;
  selectedAgentId: string | null;
  className?: string;
  isEditMode?: boolean;
  onAddMCPServer?: (agentId: string, position: Position) => void;
  onEditMCPServers?: (agentId: string) => void;
}

export interface ExtendedAgentMCPServer extends AgentMCPServer {
  position?: Position;
}

export interface ExtendedAgent extends Agent {
  mcp_servers: ExtendedAgentMCPServer[];
}
