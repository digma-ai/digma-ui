import type { ErrorDetails } from "../types";

export interface ErrorDetailsCardHeaderProps {
  onGoBack: () => void;
  data: ErrorDetails;
}
