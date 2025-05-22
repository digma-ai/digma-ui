import { Position, type Node, type NodeProps } from "@xyflow/react";
import { Fragment, type ReactNode } from "react";
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
  isDisabled?: boolean;
  onClick: () => void;
  sideElements?: ReactNode[];
};

export type FlowChartNode = Node<FlowChartNodeData, "flowChart">;

export const FlowChartNode = ({ data }: NodeProps<FlowChartNode>) => {
  const handleClick = () => {
    data.onClick();
  };

  return (
    <s.Container
      $orientation={data.orientation}
      onClick={handleClick}
      $isActive={data.isActive}
      $isDisabled={data.isDisabled}
    >
      {data.label && (
        <s.Label $orientation={data.orientation}>{data.label}</s.Label>
      )}
      {data.isActive && <s.StyledPulsatingDot />}
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
      {data.sideElements && data.sideElements.length > 0 && (
        <s.SideElementsContainer>
          {data.sideElements.map((x, index) => (
            <Fragment key={index}>{x}</Fragment>
          ))}
        </s.SideElementsContainer>
      )}
    </s.Container>
  );
};
