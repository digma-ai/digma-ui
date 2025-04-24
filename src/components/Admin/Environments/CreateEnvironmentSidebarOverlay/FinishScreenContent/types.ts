import type { Environment } from "../../../../../redux/services/types";

export interface FinishScreenContentProps {
  onGoToDashboard: (id: string | null) => void;
  environment?: Environment;
}
