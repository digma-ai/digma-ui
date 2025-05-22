import type { Edge, Node, NodeProps } from "@xyflow/react";
import type { ComponentType } from "react";

export interface FlowChartProps {
  nodes: Node[];
  edges: Edge[];
  nodeTypes?: Record<string, ComponentType<NodeProps>>;
  onNodeSelect?: (nodeId: string) => void;
}
