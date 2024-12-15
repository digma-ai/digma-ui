import type { ReactNode } from "react";
import type { InstallationType } from "../types";

export interface InstallationTypeCardProps {
  disabled?: boolean;
  installationType: InstallationType;
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  onClick: (installationType: InstallationType) => void;
  additionalContent?: ReactNode;
}

export interface ContainerProps {
  $disabled?: boolean;
}
