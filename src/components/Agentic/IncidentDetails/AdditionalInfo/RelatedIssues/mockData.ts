import type { GenericIncidentIssue } from "../../../../../redux/services/types";
import { InsightType } from "../../../../../types";

export const mockedIncidentIssues: GenericIncidentIssue[] = [
  {
    type: "issue",
    span_uid: "span-456",
    criticality: 1,
    issue_id: "issue-123",
    issue_type: InsightType.EndpointBottleneck
  },
  {
    type: "issue",
    span_uid: "span-012",
    criticality: 0.2,
    issue_id: "issue-124",
    issue_type: InsightType.SlowEndpoint
  },
  {
    type: "issue",
    span_uid: "span-678",
    criticality: 0.3,
    issue_id: "issue-125",
    issue_type: InsightType.EndpointChattyApiV2
  }
];
