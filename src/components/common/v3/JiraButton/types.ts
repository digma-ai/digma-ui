import { InsightType } from "../../../../types";
import { ActionButtonType } from "../../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/ActionButton/types";

export interface JiraButtonProps {
  onTicketInfoOpen(spanCodeObjectId: string | undefined, event: string): void;
  ticketLink?: string | null;
  isHintEnabled?: boolean;
  spanCodeObjectId?: string;
  type?: ActionButtonType;
  label?: string;
  insightType: InsightType;
}
