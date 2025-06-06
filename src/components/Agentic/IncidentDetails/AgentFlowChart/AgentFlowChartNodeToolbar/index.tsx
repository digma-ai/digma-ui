import { Position } from "@xyflow/react";
import { PlusIcon } from "../../../../common/icons/16px/PlusIcon";
import { MCPServersSideContainer } from "../MCPServersSideContainer";
import { MCPServersToolbar } from "../MCPServersToolbar";
import * as s from "./styles";
import type { AgentFlowChartNodeToolbarProps } from "./types";

export const AgentFlowChartNodeToolbar = ({
  servers,
  position,
  isEditMode,
  onAddMCPServer,
  onEditMCPServers
}: AgentFlowChartNodeToolbarProps) => {
  const handleAddMCPServer = () => {
    onAddMCPServer(position);
  };

  const handleEditMCPServers = () => {
    onEditMCPServers(position);
  };

  const toolbarItems = [
    ...(servers.length > 0
      ? [
          <MCPServersToolbar
            key={"mcp-servers-toolbar"}
            servers={servers}
            onAddMCPServer={handleAddMCPServer}
            onEditMCPServers={handleEditMCPServers}
          />
        ]
      : []),
    <s.PlusButton
      key={"add-mcp-server-button"}
      buttonType={"secondaryBorderless"}
      icon={PlusIcon}
      onClick={handleAddMCPServer}
    />
  ];

  const sortedToolbarItems =
    position === Position.Top ? toolbarItems.reverse() : toolbarItems;

  return (
    <>
      {isEditMode ? (
        [Position.Top, Position.Bottom].includes(position) && (
          <s.NodeToolbarContainer>{sortedToolbarItems}</s.NodeToolbarContainer>
        )
      ) : (
        <MCPServersSideContainer servers={servers} />
      )}
    </>
  );
};
