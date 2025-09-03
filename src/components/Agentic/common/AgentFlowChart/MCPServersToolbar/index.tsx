import { useNodeId, useViewport } from "@xyflow/react";
import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { TrashBinIcon } from "../../../../common/icons/16px/TrashBinIcon";
import { WrenchIcon } from "../../../../common/icons/16px/WrenchIcon";
import { NewPopover } from "../../../../common/NewPopover";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { MenuList } from "../../../../Navigation/common/MenuList";
import type { MenuItem } from "../../../../Navigation/common/MenuList/types";
import { Popup } from "../../../../Navigation/common/Popup";
import { trackingEvents } from "../../../tracking";
import { MCPServerIcon } from "../MCPServerIcon";
import * as s from "./styles";
import type { MCPServersToolbarProps } from "./types";

export const MCPServersToolbar = ({
  servers,
  onEditMCPServer,
  onDeleteMCPServer
}: MCPServersToolbarProps) => {
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const [selectedMCPServer, setSelectedMCPServer] = useState<string>();
  const id = useNodeId();
  const viewport = useViewport();
  const zoomLevel = viewport.zoom;

  const handleKebabMenuOpenChange = (server: string) => (isOpen: boolean) => {
    if (isOpen) {
      sendUserActionTrackingEvent(
        trackingEvents.FLOW_CHART_NODE_MCP_TOOLBAR_SERVER_ICON_CLICKED,
        {
          id
        }
      );
      setSelectedMCPServer(server);
    } else {
      setSelectedMCPServer(undefined);
    }
    setIsKebabMenuOpen(isOpen);
  };

  const handleKebabMenuItemClick = (id: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.FLOW_CHART_NODE_MCP_TOOLBAR_SERVER_ICON_MENU_ITEM_CLICKED,
      {
        id
      }
    );

    switch (id) {
      case "edit": {
        if (selectedMCPServer) {
          onEditMCPServer(selectedMCPServer);
        }
        break;
      }
      case "delete": {
        if (selectedMCPServer) {
          onDeleteMCPServer(selectedMCPServer);
        }
        break;
      }
    }

    setIsKebabMenuOpen(false);
  };

  const kebabMenuItems: MenuItem[] = [
    {
      id: "edit",
      icon: <WrenchIcon size={16} color={"currentColor"} />,
      label: "Edit",
      onClick: () => handleKebabMenuItemClick("edit")
    },
    {
      id: "delete",
      icon: <TrashBinIcon size={16} color={"currentColor"} />,
      label: "Delete",
      onClick: () => handleKebabMenuItemClick("delete")
    }
  ];

  return (
    <s.Container $zoomLevel={zoomLevel}>
      {servers.map((x, i) => (
        <NewPopover
          key={`${x.name}__${i}`}
          placement={"bottom-end"}
          content={
            <Popup>
              <MenuList items={kebabMenuItems} />
            </Popup>
          }
          isOpen={Boolean(
            isKebabMenuOpen && selectedMCPServer === x.name && x.isEditable
          )}
          onOpenChange={handleKebabMenuOpenChange(x.name)}
        >
          <div>
            <Tooltip title={x.display_name}>
              <s.MCPServerIconContainer $isEditable={x.isEditable}>
                <MCPServerIcon server={x} size={s.MCP_SERVER_ICON_SIZE} />
              </s.MCPServerIconContainer>
            </Tooltip>
          </div>
        </NewPopover>
      ))}
    </s.Container>
  );
};
