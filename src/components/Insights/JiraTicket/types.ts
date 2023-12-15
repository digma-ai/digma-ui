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
  insight: GenericCodeObjectInsight;
  onClose: () => void;
}

export interface CodeLocationsData {
  codeLocations: [];
}
