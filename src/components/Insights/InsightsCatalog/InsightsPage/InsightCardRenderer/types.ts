import type { RefObject } from "react";
import type { GenericCodeObjectInsight } from "../../../types";
import type { InsightCardViewMode } from "./insightCards/common/InsightCard/types";

export interface InsightCardRendererProps {
  insight: GenericCodeObjectInsight;
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => void;
  isJiraHintEnabled: boolean;
  onRefresh: () => void;
  isMarkAsReadButtonEnabled: boolean;
  viewMode: InsightCardViewMode;
  onDismissalChange: (action: string, insightId: string) => void;
  onOpenSuggestion?: (insightId: string) => void;
  tooltipBoundaryRef?: RefObject<HTMLElement>;
}
