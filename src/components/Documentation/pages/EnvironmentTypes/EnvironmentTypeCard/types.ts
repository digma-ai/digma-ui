import type { MemoExoticComponent } from "react";
import type { ThemeableIconProps } from "../../../../common/icons/types";
import type { InsightCardType } from "../InsightCard/types";

export type EnvironmentStatus = "active" | "waiting-for-data";

export interface EnvironmentTypeCardProps {
  name: string;
  icon: MemoExoticComponent<
    (props: ThemeableIconProps & { height: number }) => JSX.Element
  >;
  description?: string;
  status?: EnvironmentStatus;
  insights: { type: InsightCardType; count?: number; isDisabled?: boolean }[];
}
