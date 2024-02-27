import { GenericCodeObjectInsight } from "../types";

export interface InsightPageProps {
  insights: GenericCodeObjectInsight[];
  isFilteringEnabled: boolean;
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onRefresh: () => void;
  page: number;
}

export interface isInsightJiraTicketHintShownPayload {
  value: boolean;
}
