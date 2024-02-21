import { ReactNode } from "react";

export interface JiraTicketThemeColors {
  background: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
  };
  icon: string;
}

export interface JiraTicketProps {
  summary: string;
  description: {
    content: ReactNode;
    isLoading?: boolean;
    errorMessage?: string;
  };
  attachments?: { url: string; fileName: string }[];
  onClose: () => void;
  tracking?: {
    prefix?: string;
    additionalInfo?: Record<string, unknown>;
  };
  showLinkButton?: boolean;
  ticketLink?: {
    link?: string | null;
    errorMessage?: string | null;
  };
  onTicketLinkChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  unlinkTicket?: () => void;
  linkTicket?: (link: string) => void;
}
