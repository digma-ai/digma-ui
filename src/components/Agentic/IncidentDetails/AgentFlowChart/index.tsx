import { Position, type Edge } from "@xyflow/react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { groupBy } from "../../../../utils/groupBy";
import { PlusIcon } from "../../../common/icons/16px/PlusIcon";
import { FlowChart } from "../../common/FlowChart";
import type {
  FlowChartNode,
  FlowChartNodeData
} from "../../common/FlowChart/FlowChartNode";
import { trackingEvents } from "../../tracking";
import { MCPServersSideContainer } from "./MCPServersSideContainer";
import { MCPServersToolbar } from "./MCPServersToolbar";
import * as s from "./styles";
import type { AgentFlowChartProps, ExtendedAgent } from "./types";

const getFlowChartNodeData = ({
  agent,
  isSelected,
  isInteractive,
  isEditMode,
  onAddMCPServer,
  onEditMCPServers
}: {
  agent?: ExtendedAgent;
  isInteractive?: boolean;
  isSelected?: boolean;
  isEditMode?: boolean;
  onAddMCPServer?: (agentName: string, position: Position) => void;
  onEditMCPServers?: (agentName: string, position: Position) => void;
}): Partial<FlowChartNodeData> => {
  const handleAddMCPServer = (position: Position) => () => {
    sendUserActionTrackingEvent(
      trackingEvents.AGENT_FLOW_CHART_NODE_ADD_MCP_SERVER_BUTTON_CLICKED,
      {
        agentName: agent?.name,
        position
      }
    );

    if (!agent) {
      return;
    }

    onAddMCPServer?.(agent.name, position);
  };

  const handleEditMCPServers = (position: Position) => () => {
    if (!agent) {
      return;
    }

    onEditMCPServers?.(agent.name, position);
  };

  const serverGroups = groupBy(
    agent?.mcp_servers ?? [],
    (server) => server.position ?? Position.Top
  );

  return agent
    ? {
        label: agent.display_name,
        isActive: isSelected,
        isRunning: agent.running,
        isInteractive,
        isDisabled: agent.status === "inactive",
        sideContainers: Object.values(Position).map((position) => ({
          isVisible: Boolean(
            serverGroups[position]?.length > 0 ||
              (isEditMode && [Position.Top, Position.Bottom].includes(position))
          ),
          position,
          element: () => {
            const servers = serverGroups[position] ?? [];
            const toolbarItems = [
              ...(servers.length > 0
                ? [
                    <MCPServersToolbar
                      key={"mcp-servers-toolbar"}
                      servers={servers}
                      onAddMCPServer={handleAddMCPServer(position)}
                      onEditMCPServers={handleEditMCPServers(position)}
                    />
                  ]
                : []),
              <s.PlusButton
                key={"add-mcp-server-button"}
                buttonType={"secondaryBorderless"}
                icon={PlusIcon}
                onClick={handleAddMCPServer(position)}
              />
            ];
            const sortedToolbarItems =
              position === Position.Top ? toolbarItems.reverse() : toolbarItems;

            return (
              <>
                {isEditMode ? (
                  [Position.Top, Position.Bottom].includes(position) && (
                    <s.NodeToolbarContainer>
                      {sortedToolbarItems}
                    </s.NodeToolbarContainer>
                  )
                ) : (
                  <MCPServersSideContainer servers={servers} />
                )}
              </>
            );
          }
        })),
        isKebabMenuVisible: isEditMode
      }
    : {};
};

export const AgentFlowChart = ({
  agents,
  onAgentSelect,
  selectedAgentId,
  className,
  isEditMode,
  onAddMCPServer,
  onEditMCPServers
}: AgentFlowChartProps) => {
  const extendedAgents: ExtendedAgent[] = [
    {
      name: "digma",
      display_name: "Digma",
      description: "Digma",
      running: false,
      status: "active",
      mcp_servers: []
    },
    ...agents.map((agent) => ({
      ...agent,
      mcp_servers: agent.mcp_servers.map((server) => ({
        ...server,
        position:
          agent.name === "code_resolver" ? Position.Bottom : server.position
      }))
    })),
    {
      name: "validator",
      display_name: "Validator",
      description: "Validator",
      running: false,
      status: "active",
      mcp_servers: []
    }
  ];

  const handleNodeClick = (id: string) => {
    switch (id) {
      case "digma": {
        if (!isEditMode) {
          onAgentSelect(null);
        }
        break;
      }
      case "watchman":
      case "triager":
      case "infra_resolver":
      case "code_resolver":
        {
          if (
            extendedAgents?.find((a) => a.name === id)?.status === "inactive"
          ) {
            break;
          }

          onAgentSelect(id);
        }
        break;
      case "validator":
      default:
        break;
    }
  };

  const nodes: FlowChartNode[] = [
    {
      id: "digma",
      position: { x: 0, y: -31 }, // TODO: find a way to center this
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "digma"),
          isSelected: !selectedAgentId,
          isInteractive: !isEditMode
        }),
        orientation: "vertical",
        type: "input"
      }
    },
    {
      id: "watchman",
      position: { x: 200, y: 0 },
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "watchman"),
          isSelected: "watchman" === selectedAgentId,
          isInteractive:
            extendedAgents?.find((a) => a.name === "watchman")?.status !==
            "inactive",
          isEditMode,
          onAddMCPServer,
          onEditMCPServers
        })
      }
    },
    {
      id: "triager",
      position: { x: 500, y: 0 },
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "triager"),
          isSelected: "triager" === selectedAgentId,
          isInteractive:
            extendedAgents?.find((a) => a.name === "triager")?.status !==
            "inactive",
          isEditMode,
          onAddMCPServer,
          onEditMCPServers
        })
      }
    },
    {
      id: "infra_resolver",
      position: { x: 800, y: isEditMode ? -100 : -50 },
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "infra_resolver"),
          isSelected: "infra_resolver" === selectedAgentId,
          isInteractive:
            extendedAgents?.find((a) => a.name === "infra_resolver")?.status !==
            "inactive",
          isEditMode,
          onAddMCPServer,
          onEditMCPServers
        })
      }
    },
    {
      id: "code_resolver",
      position: { x: 800, y: isEditMode ? 100 : 50 },
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "code_resolver"),
          isSelected: "code_resolver" === selectedAgentId,
          isInteractive:
            extendedAgents?.find((a) => a.name === "code_resolver")?.status !==
            "inactive",
          isEditMode,
          onAddMCPServer,
          onEditMCPServers
        })
      }
    },
    {
      id: "validator",
      position: { x: 1100, y: 0 },
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "validator"),
          isSelected: false,
          isInteractive: false
        }),
        type: "output"
      }
    }
  ];

  const edges: Edge[] = [
    { id: "digma-watchman", source: "digma", target: "watchman" },
    { id: "watchman-triager", source: "watchman", target: "triager" },
    {
      id: "triager-infra_resolver",
      source: "triager",
      target: "infra_resolver"
    },
    {
      id: "triager-code_resolver",
      source: "triager",
      target: "code_resolver"
    },
    {
      id: "infra_resolver-validator",
      source: "infra_resolver",
      target: "validator"
    },
    {
      id: "code_resolver-validator",
      source: "code_resolver",
      target: "validator"
    }
  ].map((edge) => ({
    ...edge,
    animated: !isEditMode
  }));

  return (
    <FlowChart
      nodes={nodes}
      edges={edges}
      onNodeClick={handleNodeClick}
      className={className}
    />
  );
};
