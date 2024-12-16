import type { ChangeEvent } from "react";

export interface TicketLinkButtonProps {
  ticketLink?: {
    link?: string | null;
    errorMessage?: string | null;
  };
  onTicketLinkChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  unlinkTicket?: () => void;
  linkTicket?: (value: string) => void;
}
