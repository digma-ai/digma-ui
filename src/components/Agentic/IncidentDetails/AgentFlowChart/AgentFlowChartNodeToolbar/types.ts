import type { Position } from "@xyflow/react";
import type { ExtendedAgentMCPServer } from "../types";

export interface AgentFlowChartNodeToolbarProps {
  isEditMode?: boolean;
  position: Position;
  servers: ExtendedAgentMCPServer[];
  onAddMCPServer: (position: Position) => void;
  onEditMCPServer: (server: string, position: Position) => void;
  showPlusButton?: boolean;
}
