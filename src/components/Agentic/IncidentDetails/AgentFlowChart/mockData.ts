import type { Agent } from "../../../../redux/services/types";

export const mockedAgents: Agent[] = [
  {
    name: "digma",
    display_name: "Digma",
    description: "Digma",
    status: "waiting",
    mcp_servers: []
  },
  {
    name: "watchman",
    display_name: "Watchman",
    description: "Watchman",
    status: "waiting",
    mcp_servers: [
      {
        name: "github",
        display_name: "GitHub",
        active: false
      },
      {
        name: "postgres",
        display_name: "Postgres",
        active: false
      },
      {
        name: "digma",
        display_name: "Digma",
        active: true
      }
    ]
  },
  {
    name: "triager",
    display_name: "Triage",
    description: "Triage",
    status: "pending",
    mcp_servers: [
      {
        name: "github",
        display_name: "GitHub",
        active: false
      },
      {
        name: "postgres",
        display_name: "Postgres",
        active: true
      },
      {
        name: "digma",
        display_name: "Digma",
        active: true
      }
    ]
  },
  {
    name: "infra_resolver",
    display_name: "Infra Resolution",
    description: "Infra Resolution",
    status: "pending",
    mcp_servers: [
      {
        name: "github",
        display_name: "GitHub",
        active: false
      },
      {
        name: "k8s",
        display_name: "k8s",
        active: true
      },
      {
        name: "digma",
        display_name: "Digma",
        active: false
      }
    ]
  },
  {
    name: "code_resolver",
    display_name: "Code Resolution",
    description: "Code Resolution",
    status: "skipped",
    mcp_servers: [
      {
        name: "github",
        display_name: "GitHub",
        active: false
      },
      {
        name: "k8s",
        display_name: "k8s",
        active: false
      },
      {
        name: "digma",
        display_name: "Digma",
        active: false
      }
    ]
  },
  {
    name: "validator",
    display_name: "Validator",
    description: "Validator",
    status: "pending",
    mcp_servers: [
      {
        name: "github",
        display_name: "GitHub",
        active: true
      },
      {
        name: "postgres",
        display_name: "Postgres",
        active: false
      },
      {
        name: "digma",
        display_name: "Digma",
        active: false
      }
    ]
  }
];
