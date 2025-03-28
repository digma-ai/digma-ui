import type { RefObject } from "react";
import type { InsightType } from "../../../../types";
import type { ActionButtonType } from "../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/ActionButton/types";

export interface JiraButtonProps {
  onTicketInfoOpen: (
    spanCodeObjectId: string | undefined,
    event: string
  ) => void;
  ticketLink?: string | null;
  isHintEnabled?: boolean;
  spanCodeObjectId?: string;
  type?: ActionButtonType;
  label?: string;
  insightType: InsightType;
  boundaryRef?: RefObject<HTMLElement>;
}
