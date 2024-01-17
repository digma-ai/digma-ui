export interface JiraButtonProps {
  handleTicketInfoButtonClick(spanCodeObjectId?: string): void;
  ticketLink?: string | null;
  spanCodeObjectId?: string;
  buttonText?: string;
}
