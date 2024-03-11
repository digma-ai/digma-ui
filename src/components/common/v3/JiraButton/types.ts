import { InsightType } from "../../../../types";
import { BaseButtonProps } from "../Button/types";

export interface JiraButtonProps extends BaseButtonProps {
  onTicketInfoOpen(spanCodeObjectId: string | undefined, event: string): void;
  ticketLink?: string | null;
  isHintEnabled?: boolean;
  spanCodeObjectId?: string;
  insightType: InsightType;
}
