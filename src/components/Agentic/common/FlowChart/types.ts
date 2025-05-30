import type { Edge, NodeProps } from "@xyflow/react";
import type { ComponentType } from "react";
import type { FlowChartNode } from "./FlowChartNode";

export interface FlowChartProps {
  nodes: FlowChartNode[];
  edges: Edge[];
  nodeTypes?: Record<string, ComponentType<NodeProps>>;
  onNodeClick?: (nodeId: string) => void;
  onZoomLevelChange?: (zoomLevel: number) => void;
  className?: string;
}
