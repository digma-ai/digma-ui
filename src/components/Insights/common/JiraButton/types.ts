export interface JiraButtonProps {
  onTicketInfoButtonClick(spanCodeObjectId?: string): void;
  ticketLink?: string | null;
  spanCodeObjectId?: string;
  buttonText?: string;
}
