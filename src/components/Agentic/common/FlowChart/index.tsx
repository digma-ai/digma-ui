import {
  ConnectionLineType,
  Position,
  ReactFlow,
  StepEdge,
  type NodeProps,
  type NodeTypes
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "styled-components";
import { getThemeKind } from "../../../common/App/styles";
import { FlowChartNode } from "./FlowChartNode";
import * as s from "./styles";
import type { FlowChartProps } from "./types";

const nodeDefaults: Partial<NodeProps> = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  selectable: true,
  draggable: false,
  type: "flowChart"
};

const nodeTypes: NodeTypes = {
  flowChart: FlowChartNode
};

export const FlowChart = ({ nodes, edges, onNodeSelect }: FlowChartProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const extendedNodes = nodes.map((node) => ({
    ...nodeDefaults,
    ...node,
    data: {
      ...nodeDefaults.data,
      ...node.data,
      onClick: () => {
        onNodeSelect?.(node.id);
      }
    }
  }));

  return (
    <s.Container>
      <ReactFlow
        nodes={extendedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        fitView={true}
        colorMode={themeKind}
        connectionLineType={ConnectionLineType.Step}
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
