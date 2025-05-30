import type { Position } from "@xyflow/react";
import { useState } from "react";
import { Overlay } from "../../common/Overlay";
import type { ExtendedAgent } from "../IncidentDetails/AgentFlowChart/types";
import { AddMCPServerDialog } from "./AddMCPServerDialog";
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

export const IncidentTemplate = () => {
  const [agentId, setAgentId] = useState<string | null>("watchman");
  const [agents, setAgents] = useState<ExtendedAgent[]>(initialAgents);
  const [agentToUpdate, setAgentToUpdate] = useState<ExtendedAgent>();
  const [isAddMCPServerDialogOpen, setIsAddMCPServerDialogOpen] =
    useState(false);

  const handleInputChange = () => {
    return undefined;
  };

  const handleInputSubmit = () => {
    return undefined;
  };

  const handleAddMCPServer = (agentId: string, position: Position) => {
    const agent = agents.find((agent) => agent.name === agentId);

    if (!agent) {
      return;
    }

    setAgentToUpdate({
      ...agent,
      mcp_servers: [
        ...agent.mcp_servers,
        {
          name: "mcp",
          display_name: "MCP Server",
          active: true,
          position
        }
      ]
    });

    setIsAddMCPServerDialogOpen(true);
  };

  const handleSaveMCPServerSettings = () => {
    if (!agentToUpdate) {
      return;
    }

    const updatedAgents = agents.map((agent) => {
      if (agent.name === agentToUpdate.name) {
        return {
          ...agent,
          mcp_servers: agentToUpdate.mcp_servers
        };
      }
      return agent;
    });

    setAgents(updatedAgents);
    setIsAddMCPServerDialogOpen(false);
  };

  const handleCloseAddMCPServerDialog = () => {
    setIsAddMCPServerDialogOpen(false);
  };

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
      />
      <s.StyledAgentPromptInput
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
        value={""}
        isDisabled={true}
        placeholder={"Enter a custom prompt"}
      />
      {isAddMCPServerDialogOpen && (
        <Overlay>
          <AddMCPServerDialog
            onSave={handleSaveMCPServerSettings}
            onClose={handleCloseAddMCPServerDialog}
          />
        </Overlay>
      )}
    </s.Container>
  );
};
