import {
  ConnectionLineType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  StepEdge,
  useReactFlow,
  useViewport,
  type Edge,
  type NodeTypes
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, type MouseEvent } from "react";
import useDimensions from "react-cool-dimensions";
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

const FlowChartInner = ({
  nodes,
  edges,
  onNodeClick,
  onZoomLevelChange,
  className
}: FlowChartProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const { observe, width, height } = useDimensions();
  const { fitView } = useReactFlow();
  const viewport = useViewport();

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

  useEffect(() => {
    if (width && height) {
      void fitView();
    }
  }, [width, height, fitView]);

  useEffect(() => {
    onZoomLevelChange?.(viewport.zoom);
  }, [viewport.zoom, onZoomLevelChange]);

  return (
    <s.Container ref={observe} className={className}>
      <ReactFlow
        nodes={extendedNodes}
        edges={extendedEdges}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        fitView={true}
        colorMode={themeKind}
        connectionLineType={ConnectionLineType.Step}
        onNodeClick={handleNodeClick}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
        panOnScroll={false}
        nodesDraggable={false}
        nodesConnectable={false}
        maxZoom={1}
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

export const FlowChart = (props: FlowChartProps) => (
  <ReactFlowProvider>
    <FlowChartInner {...props} />
  </ReactFlowProvider>
);
