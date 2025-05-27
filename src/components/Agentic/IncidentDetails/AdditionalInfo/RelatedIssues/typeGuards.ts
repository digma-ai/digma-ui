import type {
  ErrorIncidentIssue,
  IncidentIssue,
  InsightIncidentIssue
} from "../../../../../redux/services/types";

export const isInsightIncidentIssue = (
  issue: IncidentIssue
): issue is InsightIncidentIssue => issue.type === "issue";

export const isErrorIncidentIssue = (
  issue: IncidentIssue
): issue is ErrorIncidentIssue => issue.type === "error";
