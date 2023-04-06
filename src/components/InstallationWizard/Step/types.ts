import { ReactNode } from "react";

export type StepStatus = "completed" | "active" | "not-completed";

export interface TransitionProps {
  transitionClassName: string;
  transitionDuration: number;
}

export interface StepData {
  title: string;
  content: ReactNode;
}

export interface StepProps {
  data: StepData;
  number: number;
  status: StepStatus;
  transitionDuration?: number;
  onSkip: () => void;
}

export interface ContainerProps {
  status: StepStatus;
  contentHeight: number;
  transitionClassName: string;
  transitionDuration: number;
}

export interface HeaderProps {
  status: StepStatus;
  transitionDuration: number;
}

export interface NumberContainerProps {
  isActive: boolean;
  transitionDuration: number;
}

export interface NumberProps extends TransitionProps {
  status: StepStatus;
}
