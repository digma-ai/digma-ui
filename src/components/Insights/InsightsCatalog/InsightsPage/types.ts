import type {
  GenericCodeObjectInsight,
  InsightType,
  InsightViewType
} from "../../types";

export interface InsightsPageProps {
  insights: GenericCodeObjectInsight[];
  isFilteringEnabled: boolean;
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onRefresh: () => void;
  page: number;
  isMarkAsReadButtonEnabled: boolean;
  insightsViewType: InsightViewType | null;
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

export interface OpenLiveViewPayload {
  codeObjectId: string;
}

export interface OpenHistogramPayload {
  spanCodeObjectId: string;
  insightType: InsightType;
  displayName: string;
}
