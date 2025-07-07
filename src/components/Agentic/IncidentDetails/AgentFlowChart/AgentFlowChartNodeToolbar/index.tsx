import { Position } from "@xyflow/react";
import { PlusIcon } from "../../../../common/icons/16px/PlusIcon";
import { MCPServersContainer } from "../MCPServersContainer";
import { MCPServersToolbar } from "../MCPServersToolbar";
import * as s from "./styles";
import type { AgentFlowChartNodeToolbarProps } from "./types";

export const AgentFlowChartNodeToolbar = ({
  servers,
  position,
  isEditMode,
  onAddMCPServer,
  onSetMCPServer,
  onDeleteMCPServer,
  showPlusButton
}: AgentFlowChartNodeToolbarProps) => {
  const handleAddMCPServer = () => {
    onAddMCPServer();
  };

  const handleSetMCPServer = (server: string) => {
    onSetMCPServer(server);
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
            onSetMCPServer={handleSetMCPServer}
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
