export interface JiraButtonProps {
  onTicketInfoButtonClick(
    spanCodeObjectId: string | undefined,
    event: string
  ): void;
  ticketLink?: string | null;
  isHintEnabled?: boolean;
  spanCodeObjectId?: string;
}
