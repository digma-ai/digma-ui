import type { Agent, AgentMCPServer } from "../../../../redux/services/types";

export interface AgentFlowChartProps {
  agents: ExtendedAgent[];
  onAgentSelect: (agentId: string | null) => void;
  selectedAgentId: string | null;
  className?: string;
  isEditMode?: boolean;
  onAddMCPServer?: (agentId: string) => void;
  onEditMCPServer?: (agentId: string, server: string) => void;
  onDeleteMCPServer?: (agentId: string, server: string) => void;
}

export interface ExtendedAgentMCPServer extends AgentMCPServer {
  isEditable?: boolean;
}

export interface ExtendedAgent extends Agent {
  mcp_servers: ExtendedAgentMCPServer[];
}
