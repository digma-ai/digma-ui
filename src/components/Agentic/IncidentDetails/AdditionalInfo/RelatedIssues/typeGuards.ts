import type {
  ErrorIncidentIssue,
  GenericIncidentIssue,
  InsightIncidentIssue
} from "../../../../../redux/services/types";

export const isInsightIncidentIssue = (
  issue: GenericIncidentIssue
): issue is InsightIncidentIssue => issue.type === "issue";

export const isErrorIncidentIssue = (
  issue: GenericIncidentIssue
): issue is ErrorIncidentIssue => issue.type === "error";
