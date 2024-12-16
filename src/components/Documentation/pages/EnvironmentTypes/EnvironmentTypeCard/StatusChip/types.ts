import type { EnvironmentStatus } from "../types";

export interface StatusChipProps {
  status: EnvironmentStatus;
}

export interface ContainerProps {
  $status: EnvironmentStatus;
}
