import {
  NodeToolbar,
  Position,
  type Node,
  type NodeProps
} from "@xyflow/react";
import { type ReactNode } from "react";
import { ChevronIcon } from "../../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../../common/icons/types";
import * as s from "./styles";

export type Orientation = "horizontal" | "vertical";

// TODO: Fix types
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type FlowChartNodeData = {
  label?: string;
  orientation?: Orientation;
  type?: "default" | "input" | "output";
  isActive?: boolean;
  isRunning?: boolean;
  isDisabled?: boolean;
  isInteractive?: boolean;
  sideContainer?: {
    element: ReactNode;
    isVisible: boolean;
    position?: Position;
  };
};

export type FlowChartNode = Node<FlowChartNodeData, "flowChart">;

export const FlowChartNode = ({ data }: NodeProps<FlowChartNode>) => (
  <>
    <s.Node
      $orientation={data.orientation}
      $isActive={data.isActive}
      $isDisabled={data.isDisabled}
      $isInteractive={data.isInteractive}
    >
      {data.label && (
        <s.Label $orientation={data.orientation}>{data.label}</s.Label>
      )}
      {data.isRunning && <s.StyledPulsatingDot />}
      {data.type !== "input" && (
        <s.InputHandle type={"target"} position={Position.Left} id={"a"}>
          <ChevronIcon
            direction={Direction.Right}
            color={"currentColor"}
            size={16}
          />
        </s.InputHandle>
      )}
      {data.type !== "output" && (
        <s.OutputHandle type={"source"} position={Position.Right} id={"b"} />
      )}
    </s.Node>
    <NodeToolbar
      isVisible={Boolean(data.sideContainer)}
      position={data.sideContainer?.position}
    >
      {data.sideContainer?.element}
    </NodeToolbar>
  </>
);
