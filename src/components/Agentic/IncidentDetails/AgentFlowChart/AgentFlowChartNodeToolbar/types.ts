import type { Position } from "@xyflow/react";
import type { ExtendedAgentMCPServer } from "../types";

export interface AgentFlowChartNodeToolbarProps {
  isEditMode?: boolean;
  position: Position;
  servers: ExtendedAgentMCPServer[];
  onAddMCPServer: (position: Position) => void;
  onEditMCPServers: (position: Position) => void;
}
