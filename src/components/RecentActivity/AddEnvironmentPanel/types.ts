import { ExtendedEnvironment } from "../types";

export interface AddEnvironmentPanelProps {
  environment: ExtendedEnvironment;
  onAddEnvironmentToRunConfig: () => void;
}
