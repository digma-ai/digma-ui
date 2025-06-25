import { Position } from "@xyflow/react";
import { PlusIcon } from "../../../../common/icons/16px/PlusIcon";
import { MCPServersContainer } from "../MCPServersSideContainer";
import { MCPServersToolbar } from "../MCPServersToolbar";
import * as s from "./styles";
import type { AgentFlowChartNodeToolbarProps } from "./types";

export const AgentFlowChartNodeToolbar = ({
  servers,
  position,
  isEditMode,
  onAddMCPServer,
  onEditMCPServer,
  onDeleteMCPServer,
  showPlusButton
}: AgentFlowChartNodeToolbarProps) => {
  const handleAddMCPServer = () => {
    onAddMCPServer();
  };

  const handleEditMCPServer = (server: string) => {
    onEditMCPServer(server);
  };

  const handleDeleteMCPServer = (server: string) => {
    onDeleteMCPServer(server);
  };

  const toolbarItems = [
    ...(servers.length > 0
      ? [
          <MCPServersToolbar
            key={"mcp-servers-toolbar"}
            servers={servers}
            onEditMCPServer={handleEditMCPServer}
            onDeleteMCPServer={handleDeleteMCPServer}
          />
        ]
      : []),
    ...(showPlusButton
      ? [
          <s.PlusButton
            key={"add-mcp-server-button"}
            buttonType={"secondaryBorderless"}
            icon={PlusIcon}
            onClick={handleAddMCPServer}
          />
        ]
      : [])
  ];

  const sortedToolbarItems =
    position === Position.Top ? toolbarItems.reverse() : toolbarItems;

  return (
    <>
      {isEditMode ? (
        <s.NodeToolbarContainer>{sortedToolbarItems}</s.NodeToolbarContainer>
      ) : (
        <MCPServersContainer servers={servers} />
      )}
    </>
  );
};
