import { ReactNode } from "react";
import { InstallationType } from "../types";

export type InstallationTypeButtonProps = {
  disabled?: boolean;
  installationType: InstallationType;
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  onClick: (installationType: InstallationType) => void;
};

export type InstallationTypeButtonElementProps = {
  disabled?: boolean;
};
