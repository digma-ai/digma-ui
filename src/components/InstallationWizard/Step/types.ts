import { ReactNode } from "react";

export type StepStatus = "completed" | "active" | "not-completed";

export interface TransitionProps {
  $transitionClassName: string;
  $transitionDuration: number;
}

export interface StepData {
  key: string;
  title: string;
  content: ReactNode;
}

export interface StepProps {
  data: StepData;
  stepIndex: number;
  status: StepStatus;
  transitionDuration?: number;
  onGoToStep: (stepIndex: number) => void;
}

export interface ContainerProps extends TransitionProps {
  $status: StepStatus;
  $contentHeight: number;
}

export interface HeaderProps {
  $status: StepStatus;
  $transitionDuration: number;
}

export interface NumberContainerProps {
  $isActive: boolean;
  $transitionDuration: number;
}

export interface NumberProps extends TransitionProps {
  $status: StepStatus;
}
