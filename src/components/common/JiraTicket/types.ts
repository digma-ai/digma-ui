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
  attachments: Attachment[];
  onClose: () => void;
  tracking?: {
    prefix?: string;
    additionalInfo?: Record<string, unknown>;
  };
  ticketLink?: {
    link?: string | null;
    errorMessage?: string | null;
  };
  onTicketLinkChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  unlinkTicket?: () => void;
  linkTicket?: (link: string) => void;
}

export interface Attachment {
  url: string;
  fileName: string;
}
