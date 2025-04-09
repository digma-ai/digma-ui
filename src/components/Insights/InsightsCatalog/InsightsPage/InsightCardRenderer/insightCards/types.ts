import type { RefObject } from "react";
import type { GenericCodeObjectInsight } from "../../../../types";
import type { InsightCardViewMode } from "./common/InsightCard/types";

export interface InsightCardCommonProps {
  onJiraTicketCreate?: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => void;
  onGoToSpan: (spanCodeObjectId: string) => void;
  isJiraHintEnabled?: boolean;
  isMarkAsReadButtonEnabled: boolean;
  viewMode: InsightCardViewMode;
  onDismissalChange?: (action: string, insightId: string) => void;
  onOpenSuggestion?: (insightId: string) => void;
  tooltipBoundaryRef?: RefObject<HTMLElement>;
}
