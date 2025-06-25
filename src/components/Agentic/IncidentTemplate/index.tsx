import { useEffect, useState } from "react";
import {
  useDeleteIncidentAgentMCPServerMutation,
  useGetIncidentAgentMCPServersQuery
} from "../../../redux/services/digma";
import { CancelConfirmation } from "../../common/CancelConfirmation";
import { Overlay } from "../../common/Overlay";
import type { ExtendedAgent } from "../IncidentDetails/AgentFlowChart/types";
import { MCPServerDialog } from "./MCPServerDialog";
import * as s from "./styles";

const initialAgents: ExtendedAgent[] = [
  {
    name: "digma",
    display_name: "Digma",
    description: "Digma",
    running: false,
    status: "active",
    mcp_servers: []
  },
  {
    name: "watchman",
    display_name: "Watchman",
    description: "Watchman",
    running: false,
    status: "active",
    mcp_servers: []
  },
  {
    name: "triager",
    display_name: "Triager",
    description: "Triager",
    running: false,
    status: "active",
    mcp_servers: []
  },

  {
    name: "code_resolver",
    display_name: "Code Resolver",
    description: "Code Resolver",
    running: false,
    status: "active",
    mcp_servers: []
  },
  {
    name: "infra_resolver",
    display_name: "Infrastructure Resolver",
    description: "Infrastructure Resolver",
    running: false,
    status: "active",
    mcp_servers: []
  },
  {
    name: "validator",
    display_name: "Validator",
    description: "Validator",
    running: false,
    status: "active",
    mcp_servers: []
  }
];

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const IncidentTemplate = () => {
  const [agentId, setAgentId] = useState<string | null>("watchman");
  const [agents, setAgents] = useState<ExtendedAgent[]>(initialAgents);
  const [agentIdToUpdate, setAgentIdToUpdate] = useState<string>();
  const [mcpServerIdToUpdate, setMCPServerIdToUpdate] = useState<string>();
  const [mcpServerIdToDelete, setMCPServerIdToDelete] = useState<string>();

  const { data: mcpServers } = useGetIncidentAgentMCPServersQuery(undefined, {
    pollingInterval: REFRESH_INTERVAL
  });

  const [deleteMCPServer] = useDeleteIncidentAgentMCPServerMutation();

  const handleInputChange = () => {
    return undefined;
  };

  const handleInputSubmit = () => {
    return undefined;
  };

  const handleAddMCPServer = (agentId: string) => {
    setAgentIdToUpdate(agentId);
  };

  const handleEditMCPServer = (agentId: string, serverName: string) => {
    const serverId = mcpServers?.mcps.find((x) => x.name === serverName)?.uid;

    if (!serverId) {
      return;
    }

    setAgentIdToUpdate(agentId);
    setMCPServerIdToUpdate(serverId);
  };

  const handleDeleteMCPServer = (_: string, serverName: string) => {
    const serverId = mcpServers?.mcps.find((x) => x.name === serverName)?.uid;

    if (!serverId) {
      return;
    }

    setMCPServerIdToDelete(serverId);
  };

  const handleDeleteMCPServerDialogConfirm = () => {
    if (mcpServerIdToDelete) {
      void deleteMCPServer({ id: mcpServerIdToDelete });
    }
    setMCPServerIdToDelete(undefined);
  };

  const handleDeleteMCPServerDialogClose = () => {
    setMCPServerIdToDelete(undefined);
  };

  const handleMCPServerDialogComplete = () => {
    setAgentIdToUpdate(undefined);
    setMCPServerIdToUpdate(undefined);
  };

  const handleMCPServerDialogClose = () => {
    setAgentIdToUpdate(undefined);
    setMCPServerIdToUpdate(undefined);
  };

  const serverDataToUpdate = mcpServers?.mcps.find(
    (x) => x.uid === mcpServerIdToUpdate
  );

  useEffect(() => {
    if (mcpServers) {
      setAgents((prev) =>
        prev.map((agent) => {
          const agentMCPServers = mcpServers.mcps.filter((x) =>
            x.agents.includes(agent.name)
          );

          return {
            ...agent,
            mcp_servers: agentMCPServers.map((x) => ({
              name: x.name,
              display_name: x.name,
              active: true,
              isEditable: x.editable
            }))
          };
        })
      );
    }
  }, [mcpServers]);

  return (
    <s.Container>
      <s.Header>Template</s.Header>
      <s.StyledIncidentPromptInput
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
        value={""}
        isDisabled={true}
        placeholder={
          "You can add additional MCP servers and specific configurations in the template workflow below. You may also add specific prompts for additional instructions at each stage"
        }
      />
      <s.StyledAgentFlowChart
        agents={agents}
        onAgentSelect={setAgentId}
        selectedAgentId={agentId}
        isEditMode={true}
        onAddMCPServer={handleAddMCPServer}
        onEditMCPServer={handleEditMCPServer}
        onDeleteMCPServer={handleDeleteMCPServer}
      />
      <s.StyledAgentPromptInput
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
        value={""}
        isDisabled={true}
        placeholder={"Enter a custom prompt"}
      />
      {agentIdToUpdate && (
        <Overlay>
          <MCPServerDialog
            agentId={agentIdToUpdate}
            serverData={serverDataToUpdate}
            onComplete={handleMCPServerDialogComplete}
            onClose={handleMCPServerDialogClose}
          />
        </Overlay>
      )}
      {mcpServerIdToDelete && (
        <s.StyledOverlay>
          <CancelConfirmation
            header={"Delete MCP server"}
            description={"Are you sure you want to delete this MCP server?"}
            onClose={handleDeleteMCPServerDialogClose}
            onConfirm={handleDeleteMCPServerDialogConfirm}
            confirmBtnText={"Yes, delete"}
            cancelBtnText={"No, keep it"}
          />
        </s.StyledOverlay>
      )}
    </s.Container>
  );
};
