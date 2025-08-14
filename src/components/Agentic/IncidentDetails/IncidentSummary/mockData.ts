import type { IncidentSummaryRecord } from "../../../../redux/services/types";

export const mockedIncidentSummaryRecords: IncidentSummaryRecord[] = [
  {
    agent: "triager",
    agent_display_name: "Triager",
    timestamp: "2023-10-01T12:00:00Z",
    text: "Lorem ipsum dolor sit amet"
  },
  {
    agent: "code_resolver",
    agent_display_name: "Code resolver",
    timestamp: "2023-10-01T12:00:00Z",
    text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    agent: "infra_resolver",
    agent_display_name: "Infra resolver",
    timestamp: "2023-10-01T12:00:00Z",
    text: "Lorem ipsum dolor sit amet"
  }
];
