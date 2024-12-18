import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";

export type EmptyStatePreset = "noData" | "noUnreadData" | "loading" | "error";

export interface EmptyStateProps extends CommonEmptyStateProps {
  preset?: EmptyStatePreset;
}
