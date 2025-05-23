import { Position, type Edge } from "@xyflow/react";
import { useAgenticDispatch } from "../../../../containers/Agentic/hooks";
import type {
  Agent,
  GetIncidentAgentsResponse
} from "../../../../redux/services/types";
import { setAgentId } from "../../../../redux/slices/incidentsSlice";
import { FlowChart } from "../../common/FlowChart";
import type {
  FlowChartNode,
  FlowChartNodeData
} from "../../common/FlowChart/FlowChartNode";
import { MCPServerBlock } from "./MCPServerBlock";
import * as s from "./styles";

const mockData: GetIncidentAgentsResponse = {
  agents: [
    {
      name: "digma",
      displayName: "Digma",
      running: false,
      status: "active",
      mcpServers: []
    },
    {
      name: "watchman",
      displayName: "Watchman",
      running: true,
      status: "active",
      mcpServers: [
        {
          name: "github",
          displayName: "GitHub",
          active: false
        },
        {
          name: "postgres",
          displayName: "Postgres",
          active: false
        },
        {
          name: "digma",
          displayName: "Digma",
          active: true
        }
      ]
    },
    {
      name: "triager",
      displayName: "Triage",
      running: false,
      status: "pending",
      mcpServers: [
        {
          name: "github",
          displayName: "GitHub",
          active: false
        },
        {
          name: "postgres",
          displayName: "Postgres",
          active: true
        },
        {
          name: "digma",
          displayName: "Digma",
          active: true
        }
      ]
    },
    {
      name: "infra_resolver",
      displayName: "Infra Resolution",
      running: false,
      status: "pending",
      mcpServers: [
        {
          name: "github",
          displayName: "GitHub",
          active: false
        },
        {
          name: "kubernetes",
          displayName: "Kubernetes",
          active: true
        },
        {
          name: "digma",
          displayName: "Digma",
          active: false
        }
      ]
    },
    {
      name: "code_resolver",
      displayName: "Code Resolution",
      running: false,
      status: "inactive",
      mcpServers: [
        {
          name: "github",
          displayName: "GitHub",
          active: false
        },
        {
          name: "kubernetes",
          displayName: "Kubernetes",
          active: false
        },
        {
          name: "digma",
          displayName: "Digma",
          active: false
        }
      ]
    },
    {
      name: "validator",
      displayName: "Validator",
      running: false,
      status: "pending",
      mcpServers: [
        {
          name: "github",
          displayName: "GitHub",
          active: true
        },
        {
          name: "postgres",
          displayName: "Postgres",
          active: false
        },
        {
          name: "digma",
          displayName: "Digma",
          active: false
        }
      ]
    }
  ]
};

// const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const getFlowChartNodeData = (
  agent?: Agent,
  sideContainerPosition?: Position
): Partial<FlowChartNodeData> => {
  return agent
    ? {
        label: agent.displayName,
        isActive: agent.running,
        isDisabled: agent.status === "inactive",
        sideContainer: {
          isVisible: agent.mcpServers.length > 0,
          position: sideContainerPosition,
          element: (
            <s.MCPServersSideContainer>
              {agent.mcpServers.map((x) => (
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
  // const incidentId = useAgenticSelector((state) => state.incidents.incidentId);
  const dispatch = useAgenticDispatch();

  // const { data } = useGetIncidentAgentsQuery(
  //   { id: incidentId ?? "" },
  //   { skip: !incidentId, pollingInterval: REFRESH_INTERVAL }
  // );

  const data = mockData; // TODO: remove this line and uncomment the above line

  const handleNodeClick = (id: string) => {
    switch (id) {
      case "digma":
        dispatch(setAgentId(null));
        break;
      case "watchman":
      case "triager":
      case "infra_resolver":
      case "code_resolver":
        dispatch(setAgentId(id));
        break;
      case "validator":
      default:
        break;
    }
  };

  const nodes: FlowChartNode[] = data
    ? [
        {
          id: "digma",
          position: { x: 0, y: -31 }, // TODO: find a way to center this
          data: {
            ...getFlowChartNodeData(
              data?.agents.find((a) => a.name === "digma")
            ),
            orientation: "vertical",
            type: "input"
          }
        },
        {
          id: "watchman",
          position: { x: 200, y: 0 },
          data: {
            ...getFlowChartNodeData(
              data?.agents.find((a) => a.name === "watchman")
            )
          }
        },
        {
          id: "triager",
          position: { x: 500, y: 0 },
          data: {
            ...getFlowChartNodeData(
              data?.agents.find((a) => a.name === "triager")
            )
          }
        },
        {
          id: "infra_resolver",
          position: { x: 800, y: -50 },
          data: {
            ...getFlowChartNodeData(
              data?.agents.find((a) => a.name === "infra_resolver")
            )
          }
        },
        {
          id: "code_resolver",
          position: { x: 800, y: 50 },
          data: {
            ...getFlowChartNodeData(
              data?.agents.find((a) => a.name === "code_resolver"),
              Position.Bottom
            )
          }
        },
        {
          id: "validator",
          position: { x: 1100, y: 0 },
          data: {
            ...getFlowChartNodeData(
              data?.agents.find((a) => a.name === "validator")
            ),
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

  return (
    <FlowChart nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
  );
};
