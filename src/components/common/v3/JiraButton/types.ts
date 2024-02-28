export interface JiraButtonProps {
  onTicketInfoButtonClick(event: string): void;
  ticketLink?: string | null;
  isHintEnabled?: boolean;
}
