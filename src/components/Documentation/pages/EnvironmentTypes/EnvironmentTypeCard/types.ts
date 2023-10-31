import { ThemeableIconProps } from "../../../../common/icons/types";
import { InsightCardType } from "./InsightCard/types";

export type EnvironmentStatus = "active" | "waiting-for-data";

export interface EnvironmentTypeCardProps {
  name: string;
  icon: React.MemoExoticComponent<
    (props: ThemeableIconProps & { height: number }) => JSX.Element
  >;
  description?: string;
  status?: EnvironmentStatus;
  insights: { type: InsightCardType; count?: number; isDisabled?: boolean }[];
}
