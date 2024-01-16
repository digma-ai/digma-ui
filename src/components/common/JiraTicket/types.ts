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
  attachment?: { url: string; fileName: string };
  onClose: () => void;
  tracking?: {
    prefix?: string;
    additionalInfo?: Record<string, unknown>;
  };
}
