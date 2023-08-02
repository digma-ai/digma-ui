import { ReactNode } from "react";
import { InstallationType } from "../types";

export type InstallationTypeCardProps = {
  disabled?: boolean;
  installationType: InstallationType;
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  onClick: (installationType: InstallationType) => void;
  additionalContent?: ReactNode;
};

export type ButtonProps = {
  disabled?: boolean;
};

export type ContainerProps = ButtonProps;
