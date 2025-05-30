import { Position, type Edge } from "@xyflow/react";
import { useState } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import { useGetIncidentAgentsQuery } from "../../../../redux/services/digma";
import type { Agent } from "../../../../redux/services/types";
import { FlowChart } from "../../common/FlowChart";
import type {
  FlowChartNode,
  FlowChartNodeData
} from "../../common/FlowChart/FlowChartNode";
import { MCPServerBlock } from "./MCPServerBlock";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const getFlowChartNodeData = ({
  agent,
  sideContainerPosition,
  zoomLevel,
  isSelected,
  isInteractive
}: {
  agent?: Agent;
  sideContainerPosition?: Position;
  isInteractive?: boolean;
  isSelected?: boolean;
  zoomLevel?: number;
}): Partial<FlowChartNodeData> => {
  return agent
    ? {
        label: agent.display_name,
        isActive: isSelected,
        isRunning: agent.running,
        isInteractive,
        isDisabled: agent.status === "inactive",
        sideContainer: {
          isVisible: agent.mcp_servers.length > 0,
          position: sideContainerPosition,
          element: (
            <s.MCPServersSideContainer $zoomLevel={zoomLevel}>
              {agent.mcp_servers.map((x) => (
                <MCPServerBlock
                  key={x.name}
                  type={x.name}
                  isActive={x.active}
                />
              ))}
            </s.MCPServersSideContainer>
          )
        }
      }
    : {};
};

export const AgentFlowChart = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const params = useParams();
  const incidentId = params.id;
  const [searchParams, setSearchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");

  const { data } = useGetIncidentAgentsQuery(
    { id: incidentId ?? "" },
    { skip: !incidentId, pollingInterval: REFRESH_INTERVAL }
  );

  const agents: Agent[] | undefined = data
    ? [
        {
          name: "digma",
          display_name: "Digma",
          running: false,
          status: "active",
          mcp_servers: []
        },
        ...data.agents,
        {
          name: "validator",
          display_name: "Validator",
          running: false,
          status: "active",
          mcp_servers: []
        }
      ]
    : undefined;

  const handleNodeClick = (id: string) => {
    switch (id) {
      case "digma":
        setSearchParams((params) => {
          params.delete("agent");
          return params;
        });
        break;
      case "watchman":
      case "triager":
      case "infra_resolver":
      case "code_resolver":
        {
          if (agents?.find((a) => a.name === id)?.status === "inactive") {
            break;
          }

          setSearchParams((params) => {
            params.set("agent", id);
            return params;
          });
        }
        break;
      case "validator":
      default:
        break;
    }
  };

  const handleZoomLevelChange = (newZoomLevel: number) => {
    setZoomLevel(newZoomLevel);
  };

  const nodes: FlowChartNode[] = data
    ? [
        {
          id: "digma",
          position: { x: 0, y: -31 }, // TODO: find a way to center this
          data: {
            ...getFlowChartNodeData({
              agent: agents?.find((a) => a.name === "digma"),
              sideContainerPosition: Position.Top,
              isSelected: !agentId,
              zoomLevel,
              isInteractive: true
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
              agent: agents?.find((a) => a.name === "watchman"),
              sideContainerPosition: Position.Top,
              zoomLevel,
              isSelected: "watchman" === agentId,
              isInteractive:
                agents?.find((a) => a.name === "watchman")?.status !==
                "inactive"
            })
          }
        },
        {
          id: "triager",
          position: { x: 500, y: 0 },
          data: {
            ...getFlowChartNodeData({
              agent: agents?.find((a) => a.name === "triager"),
              sideContainerPosition: Position.Top,
              zoomLevel,
              isSelected: "triager" === agentId,
              isInteractive:
                agents?.find((a) => a.name === "triager")?.status !== "inactive"
            })
          }
        },
        {
          id: "infra_resolver",
          position: { x: 800, y: -50 },
          data: {
            ...getFlowChartNodeData({
              agent: agents?.find((a) => a.name === "infra_resolver"),
              sideContainerPosition: Position.Top,
              zoomLevel,
              isSelected: "infra_resolver" === agentId,
              isInteractive:
                agents?.find((a) => a.name === "infra_resolver")?.status !==
                "inactive"
            })
          }
        },
        {
          id: "code_resolver",
          position: { x: 800, y: 50 },
          data: {
            ...getFlowChartNodeData({
              agent: agents?.find((a) => a.name === "code_resolver"),
              sideContainerPosition: Position.Bottom,
              zoomLevel,
              isSelected: "code_resolver" === agentId,
              isInteractive:
                agents?.find((a) => a.name === "code_resolver")?.status !==
                "inactive"
            })
          }
        },
        {
          id: "validator",
          position: { x: 1100, y: 0 },
          data: {
            ...getFlowChartNodeData({
              agent: agents?.find((a) => a.name === "validator"),
              sideContainerPosition: Position.Top,
              zoomLevel,
              isSelected: false,
              isInteractive: false
            }),
            type: "output"
          }
        }
      ]
    : [];

  const edges: Edge[] = data
    ? [
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
      ]
    : [];

  return data ? (
    <FlowChart
      nodes={nodes}
      edges={edges}
      onNodeClick={handleNodeClick}
      onZoomLevelChange={handleZoomLevelChange}
    />
  ) : null;
};
