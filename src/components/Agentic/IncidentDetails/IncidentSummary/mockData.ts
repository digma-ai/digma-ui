import type { IncidentSummaryRecord } from "../../../../redux/services/types";

export const mockedIncidentSummaryRecords: IncidentSummaryRecord[] = [
  {
    id: "1",
    agent_display_name: "triager",
    timestamp: "2023-10-01T12:00:00Z",
    text: "Lorem ipsum dolor sit amet"
  },
  {
    id: "2",
    agent_display_name: "code resolver",
    timestamp: "2023-10-01T12:00:00Z",
    text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: "3",
    agent_display_name: "infra resolver",
    timestamp: "2023-10-01T12:00:00Z",
    text: "Lorem ipsum dolor sit amet"
  }
];
