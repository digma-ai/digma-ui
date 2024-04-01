import { GenericCodeObjectInsight, InsightType } from "../../types";
import { ViewMode } from "../types";

export interface InsightsPageProps {
  insights: GenericCodeObjectInsight[];
  isFilteringEnabled: boolean;
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onRefresh: () => void;
  page: number;
  viewMode: ViewMode;
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
