import { ViewMode } from "../InsightsCatalog/types";
import { GenericCodeObjectInsight, MethodSpan } from "../types";

export interface InsightListProps {
  insights: GenericCodeObjectInsight[];
  spans: MethodSpan[];
  environment: string;
  serviceName?: string;
  assetId: string;
  hasObservability: boolean;
  hasMissingDependency: boolean;
  canInstrumentMethod: boolean;
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  viewMode: ViewMode;
}

export interface isInsightJiraTicketHintShownPayload {
  value: boolean;
}

export interface RecalculatePayload {
  id: string;
}
