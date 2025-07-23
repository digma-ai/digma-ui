import { Position, type Edge } from "@xyflow/react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents } from "../../tracking";
import { FlowChart } from "../FlowChart";
import type {
  FlowChartNode,
  FlowChartNodeData
} from "../FlowChart/FlowChartNode";
import { AgentFlowChartNodeToolbar } from "./AgentFlowChartNodeToolbar";
import type { AgentFlowChartProps, ExtendedAgent } from "./types";

const getFlowChartNodeData = ({
  agent,
  isSelected,
  isInteractive,
  isEditMode,
  onAddMCPServer,
  onEditMCPServer,
  onDeleteMCPServer
}: {
  agent?: ExtendedAgent;
  isInteractive?: boolean;
  isSelected?: boolean;
  isEditMode?: boolean;
  onAddMCPServer?: (agentName: string) => void;
  onEditMCPServer?: (agentName: string, server: string) => void;
  onDeleteMCPServer?: (agentName: string, server: string) => void;
}): Partial<FlowChartNodeData> => {
  const handleAddMCPServer = () => {
    sendUserActionTrackingEvent(
      trackingEvents.AGENT_FLOW_CHART_NODE_ADD_MCP_SERVER_BUTTON_CLICKED,
      {
        agentName: agent?.name
      }
    );

    if (!agent) {
      return;
    }

    onAddMCPServer?.(agent.name);
  };

  const handleEditMCPServer = (server: string) => {
    if (!agent) {
      return;
    }

    onEditMCPServer?.(agent.name, server);
  };

  const handleDeleteMCPServer = (server: string) => {
    if (!agent) {
      return;
    }

    onDeleteMCPServer?.(agent.name, server);
  };

  const sideContainerPosition =
    agent?.name === "code_resolver" ? Position.Bottom : Position.Top;

  return agent
    ? {
        label: agent.display_name,
        isActive: isSelected,
        isRunning: agent.status === "running",
        isPending: agent.status === "pending",
        hasError: agent.status === "error",
        isInteractive,
        isDisabled: agent.status === "skipped",
        sideContainers: [
          {
            isVisible: Boolean(agent.mcp_servers.length > 0 || isEditMode),
            position: sideContainerPosition,
            element: (
              <AgentFlowChartNodeToolbar
                isEditMode={isEditMode}
                position={sideContainerPosition}
                servers={agent.mcp_servers}
                onAddMCPServer={handleAddMCPServer}
                onEditMCPServer={handleEditMCPServer}
                onDeleteMCPServer={handleDeleteMCPServer}
                showPlusButton={isEditMode}
              />
            )
          }
        ],
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
  onEditMCPServer,
  onDeleteMCPServer
}: AgentFlowChartProps) => {
  const extendedAgents: ExtendedAgent[] = [
    {
      name: "digma",
      display_name: "Digma",
      description: "Digma",
      status: "waiting",
      status_details: {},
      mcp_servers: []
    },
    ...agents.map((agent) => ({
      ...agent,
      mcp_servers: agent.mcp_servers.map((server) => ({
        ...server
      }))
    })),
    {
      name: "validator",
      display_name: "Validator",
      description: "Validator",
      status: "waiting",
      status_details: {},
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
            extendedAgents?.find((a) => a.name === id)?.status === "skipped"
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
      type: "flowChart",
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
      type: "flowChart",
      id: "watchman",
      position: { x: 200, y: 0 },
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "watchman"),
          isSelected: "watchman" === selectedAgentId,
          isInteractive:
            extendedAgents?.find((a) => a.name === "watchman")?.status !==
            "skipped",
          isEditMode,
          onAddMCPServer,
          onEditMCPServer,
          onDeleteMCPServer
        })
      }
    },
    {
      type: "flowChart",
      id: "triager",
      position: { x: 500, y: 0 },
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "triager"),
          isSelected: "triager" === selectedAgentId,
          isInteractive:
            extendedAgents?.find((a) => a.name === "triager")?.status !==
            "skipped",
          isEditMode,
          onAddMCPServer,
          onEditMCPServer,
          onDeleteMCPServer
        })
      }
    },
    {
      type: "flowChart",
      id: "infra_resolver",
      position: { x: 800, y: -50 },
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "infra_resolver"),
          isSelected: "infra_resolver" === selectedAgentId,
          isInteractive:
            extendedAgents?.find((a) => a.name === "infra_resolver")?.status !==
            "skipped",
          isEditMode,
          onAddMCPServer,
          onEditMCPServer,
          onDeleteMCPServer
        })
      }
    },
    {
      type: "flowChart",
      id: "code_resolver",
      position: { x: 800, y: 50 },
      data: {
        ...getFlowChartNodeData({
          agent: extendedAgents?.find((a) => a.name === "code_resolver"),
          isSelected: "code_resolver" === selectedAgentId,
          isInteractive:
            extendedAgents?.find((a) => a.name === "code_resolver")?.status !==
            "skipped",
          isEditMode,
          onAddMCPServer,
          onEditMCPServer,
          onDeleteMCPServer
        })
      }
    },
    {
      type: "flowChart",
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
