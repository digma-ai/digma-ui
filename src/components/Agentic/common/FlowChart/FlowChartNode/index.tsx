import {
  NodeToolbar,
  Position,
  type Node,
  type NodeProps
} from "@xyflow/react";
import { useState, type ReactNode } from "react";
import { ChevronIcon } from "../../../../common/icons/16px/ChevronIcon";
import { CopyIcon } from "../../../../common/icons/16px/CopyIcon";
import { RefreshIcon } from "../../../../common/icons/16px/RefreshIcon";
import { TrashBinIcon } from "../../../../common/icons/16px/TrashBinIcon";
import { WrenchIcon } from "../../../../common/icons/16px/WrenchIcon";
import { ThreeDotsVerticalIcon } from "../../../../common/icons/ThreeDotsVerticalIcon";
import { Direction } from "../../../../common/icons/types";
import { NewPopover } from "../../../../common/NewPopover";
import { MenuList } from "../../../../Navigation/common/MenuList";
import type { MenuItem } from "../../../../Navigation/common/MenuList/types";
import { Popup } from "../../../../Navigation/common/Popup";
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
  sideContainers?: {
    element: ReactNode;
    isVisible: boolean;
    position?: Position;
  }[];
  isKebabMenuVisible?: boolean;
};

export type FlowChartNode = Node<FlowChartNodeData, "flowChart">;

export const FlowChartNode = ({ data }: NodeProps<FlowChartNode>) => {
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);

  const handleKebabMenuOpenChange = (isOpen: boolean) => {
    setIsKebabMenuOpen(isOpen);
  };

  const handleKebabMenuItemClick = () => {
    setIsKebabMenuOpen(false);
  };

  const kebabMenuItems: MenuItem[] = [
    {
      id: "edit",
      icon: <WrenchIcon size={16} color={"currentColor"} />,
      label: "Edit",
      onClick: handleKebabMenuItemClick
    },
    {
      id: "replace",
      icon: <RefreshIcon size={16} color={"currentColor"} />,
      label: "Replace",
      onClick: handleKebabMenuItemClick
    },
    {
      id: "copy",
      label: "Copy",
      icon: <CopyIcon size={16} color={"currentColor"} />,
      onClick: handleKebabMenuItemClick
    },
    {
      id: "delete",
      label: "Delete",
      icon: <TrashBinIcon size={16} color={"currentColor"} />,
      onClick: handleKebabMenuItemClick
    }
  ];

  return (
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
        {data.isKebabMenuVisible && (
          <NewPopover
            placement={"bottom-start"}
            content={
              <Popup>
                <MenuList items={kebabMenuItems} />
              </Popup>
            }
            isOpen={isKebabMenuOpen}
            onOpenChange={handleKebabMenuOpenChange}
          >
            <s.KebabMenuButton>
              <ThreeDotsVerticalIcon color={"currentColor"} size={16} />
            </s.KebabMenuButton>
          </NewPopover>
        )}
      </s.Node>
      {data.sideContainers?.map((x, i) => (
        <NodeToolbar key={i} isVisible={x.isVisible} position={x.position}>
          {x.element}
        </NodeToolbar>
      ))}
    </>
  );
};
