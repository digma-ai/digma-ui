import { GenericCodeObjectInsight, InsightType } from "../types";

export interface InsightPageProps {
  insights: GenericCodeObjectInsight[];
  isFilteringEnabled: boolean;
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onRefresh: () => void;
  page: number;
  onDismiss: (insightId: string) => void;
}

export interface isInsightJiraTicketHintShownPayload {
  value: boolean;
}

export interface MarkInsightTypesAsViewedPayload {
  insightTypes: {
    type: InsightType;
    reopenCount: number;
  }[];
}

export interface RecalculatePayload {
  id: string;
}
