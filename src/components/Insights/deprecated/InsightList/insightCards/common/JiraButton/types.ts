export interface JiraButtonProps {
  onTicketInfoButtonClick(
    spanCodeObjectId: string | undefined,
    event: string
  ): void;
  ticketLink?: string | null;
  spanCodeObjectId?: string;
  buttonType: "small" | "large";
  isHintEnabled?: boolean;
}
