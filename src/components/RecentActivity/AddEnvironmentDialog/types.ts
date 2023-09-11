import { ExtendedEnvironment } from "../types";

export interface AddEnvironmentDialogProps {
  onClose: () => void;
  onEnvironmentAdd: (environmentName: string) => void;
  environments: ExtendedEnvironment[];
}
