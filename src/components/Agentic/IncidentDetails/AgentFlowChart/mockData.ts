import type { Agent } from "../../../../redux/services/types";

export const mockedAgents: Agent[] = [
  {
    name: "digma",
    display_name: "Digma",
    running: false,
    status: "active",
    mcp_servers: []
  },
  {
    name: "watchman",
    display_name: "Watchman",
    running: true,
    status: "active",
    mcp_servers: [
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
    display_name: "Triage",
    running: false,
    status: "pending",
    mcp_servers: [
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
    display_name: "Infra Resolution",
    running: false,
    status: "pending",
    mcp_servers: [
      {
        name: "github",
        displayName: "GitHub",
        active: false
      },
      {
        name: "k8s",
        displayName: "k8s",
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
    display_name: "Code Resolution",
    running: false,
    status: "inactive",
    mcp_servers: [
      {
        name: "github",
        displayName: "GitHub",
        active: false
      },
      {
        name: "k8s",
        displayName: "k8s",
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
    display_name: "Validator",
    running: false,
    status: "pending",
    mcp_servers: [
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
];
