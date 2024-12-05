import { MemoExoticComponent } from "react";
import { ThemeableIconProps } from "../../../common/icons/types";
import { EnvironmentStatus } from "./EnvironmentTypeCard/types";
import { InsightCardType } from "./InsightCard/types";

export interface EnvironmentTypeData {
  id: string;
  icon: MemoExoticComponent<
    (props: ThemeableIconProps & { height: number }) => JSX.Element
  >;
  name: string;
  description?: string;
  status?: EnvironmentStatus;
  insights: {
    type: InsightCardType;
    count?: number;
  }[];
}

export interface ContainerProps {
  $columnCount: number;
}

export type HeaderProps = ContainerProps;
