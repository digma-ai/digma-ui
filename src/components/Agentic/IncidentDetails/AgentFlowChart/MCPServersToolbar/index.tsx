import { useNodeId, useViewport } from "@xyflow/react";
import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { PlusIcon } from "../../../../common/icons/16px/PlusIcon";
import { WrenchIcon } from "../../../../common/icons/16px/WrenchIcon";
import { ThreeDotsVerticalIcon } from "../../../../common/icons/ThreeDotsVerticalIcon";
import { NewPopover } from "../../../../common/NewPopover";
import { MenuList } from "../../../../Navigation/common/MenuList";
import type { MenuItem } from "../../../../Navigation/common/MenuList/types";
import { Popup } from "../../../../Navigation/common/Popup";
import { trackingEvents } from "../../../tracking";
import { MCPServerIcon } from "../MCPServerIcon";
import * as s from "./styles";
import type { MCPServersToolbarProps } from "./types";

export const MCPServersToolbar = ({
  servers,
  onAddMCPServer,
  onEditMCPServers
}: MCPServersToolbarProps) => {
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const id = useNodeId();
  const viewport = useViewport();
  const zoomLevel = viewport.zoom;

  const handleKebabMenuOpenChange = (isOpen: boolean) => {
    sendUserActionTrackingEvent(
      trackingEvents.FLOW_CHART_NODE_MCP_TOOLBAR_MENU_CLICKED,
      {
        id,
        isOpen
      }
    );
    setIsKebabMenuOpen(isOpen);
  };

  const handleKebabMenuItemClick = (id: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.FLOW_CHART_NODE_MCP_TOOLBAR_MENU_ITEM_CLICKED,
      {
        id
      }
    );

    switch (id) {
      case "edit":
        onEditMCPServers?.();
        break;
      case "add":
        onAddMCPServer?.();
        break;
    }

    setIsKebabMenuOpen(false);
  };

  const kebabMenuItems: MenuItem[] = [
    {
      id: "edit",
      icon: <WrenchIcon size={16} color={"currentColor"} />,
      label: "Edit MCPs",
      onClick: () => handleKebabMenuItemClick("edit")
    },
    {
      id: "add",
      icon: <PlusIcon size={16} color={"currentColor"} />,
      label: "Add new MCP",
      onClick: () => handleKebabMenuItemClick("add")
    }
  ];

  return (
    <s.Container $zoomLevel={zoomLevel}>
      {servers.map((x) => (
        <MCPServerIcon
          key={x.name}
          type={x.name}
          isActive={x.active}
          size={17}
        />
      ))}
      <NewPopover
        placement={"bottom-end"}
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
    </s.Container>
  );
};
