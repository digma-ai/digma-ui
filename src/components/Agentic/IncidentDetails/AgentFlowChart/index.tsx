import type { Edge, Node } from "@xyflow/react";
import type {
  Agent,
  GetIncidentAgentsResponse
} from "../../../../redux/services/types";
import { FlowChart } from "../../common/FlowChart";
import type { FlowChartNodeData } from "../../common/FlowChart/FlowChartNode";

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
      mcpServers: []
    },
    {
      name: "triage",
      displayName: "Triage",
      running: false,
      status: "pending",
      mcpServers: []
    },
    {
      name: "infraResolution",
      displayName: "Infra Resolution",
      running: false,
      status: "pending",
      mcpServers: []
    },
    {
      name: "codeResolution",
      displayName: "Code Resolution",
      running: false,
      status: "inactive",
      mcpServers: []
    },
    {
      name: "validator",
      displayName: "Validator",
      running: false,
      status: "pending",
      mcpServers: []
    }
  ]
};

// const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const getFlowChartNodeData = (agent?: Agent): Partial<FlowChartNodeData> => {
  return agent
    ? {
        label: agent.displayName,
        isActive: agent.running,
        isDisabled: agent.status === "inactive"
      }
    : {};
};

export const AgentFlowChart = () => {
  // const incidentId = useAgenticSelector((state) => state.incidents.incidentId);
  // const { data } = useGetIncidentAgentsQuery(
  //   { id: incidentId ?? "" },
  //   { skip: !incidentId, pollingInterval: REFRESH_INTERVAL }
  // );

  const data = mockData; // TODO: remove this line and uncomment the above line

  const nodes: Node[] = data
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
          id: "triage",
          position: { x: 500, y: 0 },
          data: {
            ...getFlowChartNodeData(
              data?.agents.find((a) => a.name === "triage")
            )
          }
        },
        {
          id: "infraResolution",
          position: { x: 800, y: -50 },
          data: {
            ...getFlowChartNodeData(
              data?.agents.find((a) => a.name === "infraResolution")
            )
          }
        },
        {
          id: "codeResolution",
          position: { x: 800, y: 50 },
          data: {
            ...getFlowChartNodeData(
              data?.agents.find((a) => a.name === "codeResolution")
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
        { id: "watchman-triage", source: "watchman", target: "triage" },
        {
          id: "triage-infraResolution",
          source: "triage",
          target: "infraResolution"
        },
        {
          id: "triage-codeResolution",
          source: "triage",
          target: "codeResolution"
        },
        {
          id: "infraResolution-validator",
          source: "infraResolution",
          target: "validator"
        },
        {
          id: "codeResolution-validator",
          source: "codeResolution",
          target: "validator"
        }
      ]
    : [];

  return <FlowChart nodes={nodes} edges={edges} />;
};
