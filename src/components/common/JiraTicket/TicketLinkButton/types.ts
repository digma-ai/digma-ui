export interface TicketLinkButtonProps {
  ticketLink?: {
    link?: string | null;
    errorMessage?: string | null;
  };
  onTicketLinkChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  unlinkTicket?: () => void;
  linkTicket?: (value: string) => void;
}
