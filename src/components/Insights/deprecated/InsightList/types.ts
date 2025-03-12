import type { RefObject } from "react";
import type { InsightType } from "../../../../types";
import type { InsightCardViewMode } from "../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/types";
import type { GenericCodeObjectInsight, MethodSpan } from "../../types";

/** @deprecated */
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
  isMarkAsReadButtonEnabled: boolean;
}

/** @deprecated */
export interface isInsightJiraTicketHintShownPayload {
  value: boolean;
}

/** @deprecated */
export interface InsightCardCommonProps {
  onRecalculate: (insightId: string) => void;
  onRefresh: (insightType: InsightType) => void;
  onJiraTicketCreate?: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => void;
  onGoToSpan: (spanCodeObjectId: string) => void;
  isJiraHintEnabled?: boolean;
  isMarkAsReadButtonEnabled: boolean;
  viewMode: InsightCardViewMode;
  onDismissalChange: (action: string, insightId: string) => void;
  onOpenSuggestion?: (insightId: string) => void;
  tooltipBoundaryRef?: RefObject<HTMLElement>;
}
