import { BaseButtonProps } from "../Button/types";

export interface JiraButtonProps extends BaseButtonProps {
  onTicketInfoButtonClick(
    spanCodeObjectId: string | undefined,
    event: string
  ): void;
  ticketLink?: string | null;
  isHintEnabled?: boolean;
  spanCodeObjectId?: string;
}
