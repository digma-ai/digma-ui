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
  description: { text: string; isLoading?: boolean };
  attachment?: { url: string; fileName: string };
  insight: GenericCodeObjectInsight;
  onClose: () => void;
}
