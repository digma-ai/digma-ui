import { ReactNode } from "react";
import { GenericCodeObjectInsight } from "../types";

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
  insight: GenericCodeObjectInsight;
  onClose: () => void;
}
