import type { Position } from "@xyflow/react";
import type { ExtendedAgentMCPServer } from "../types";

export interface AgentFlowChartNodeToolbarProps {
  isEditMode?: boolean;
  position: Position;
  servers: ExtendedAgentMCPServer[];
  onAddMCPServer: () => void;
  onSetMCPServer: (server: string) => void;
  onDeleteMCPServer: (server: string) => void;
  showPlusButton?: boolean;
}
