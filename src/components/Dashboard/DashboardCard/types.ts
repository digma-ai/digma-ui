import type { MemoExoticComponent, ReactNode } from "react";
import type { IconProps } from "../../common/icons/types";

export interface DashboardCardProps {
  icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  title: string;
  content: ReactNode;
  headerContent?: ReactNode;
}
