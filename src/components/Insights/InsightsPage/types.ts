import { GenericCodeObjectInsight } from "../types";

export interface InsightPageProps {
  insights: GenericCodeObjectInsight[];
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
}

export interface isInsightJiraTicketHintShownPayload {
  value: boolean;
}
