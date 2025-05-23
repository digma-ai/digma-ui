import {
  ConnectionLineType,
  Position,
  ReactFlow,
  StepEdge,
  type Edge,
  type NodeTypes
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo, type MouseEvent } from "react";
import { useTheme } from "styled-components";
import { getThemeKind } from "../../../common/App/styles";
import { FlowChartNode } from "./FlowChartNode";
import * as s from "./styles";
import type { FlowChartProps } from "./types";

const nodeDefaults: Partial<FlowChartNode> = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  type: "flowChart"
};

const nodeTypes: NodeTypes = {
  flowChart: FlowChartNode
};

export const FlowChart = ({ nodes, edges, onNodeClick }: FlowChartProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const handleNodeClick = (e: MouseEvent, node: FlowChartNode) => {
    if (onNodeClick) {
      onNodeClick(node.id);
    }
  };

  const extendedNodes: FlowChartNode[] = useMemo(
    () =>
      nodes.map((node) => ({
        ...nodeDefaults,
        ...node
      })),
    [nodes]
  );

  const extendedEdges: Edge[] = useMemo(
    () =>
      edges.map((edge) => ({
        ...edge,
        selectable: false
      })),
    [edges]
  );

  return (
    <s.Container>
      <ReactFlow
        nodes={extendedNodes}
        edges={extendedEdges}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        fitView={true}
        colorMode={themeKind}
        connectionLineType={ConnectionLineType.Step}
        onNodeClick={handleNodeClick}
        nodesConnectable={false}
        defaultEdgeOptions={{
          animated: true
        }}
        edgeTypes={{
          default: StepEdge
        }}
      />
    </s.Container>
  );
};
