import type { Environment } from "../../../redux/services/types";

export interface FinishScreenContentProps {
  onOpenEnvironment: (id: string) => void;
  environment?: Environment;
}
