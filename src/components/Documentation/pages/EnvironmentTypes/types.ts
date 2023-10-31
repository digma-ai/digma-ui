import { ThemeableIconProps } from "../../../common/icons/types";
import { InsightCardType } from "./EnvironmentTypeCard/InsightCard/types";
import { EnvironmentStatus } from "./EnvironmentTypeCard/types";

export interface EnvironmentTypeData {
  id: string;
  icon: React.MemoExoticComponent<
    (props: ThemeableIconProps & { height: number }) => JSX.Element
  >;
  name: string;
  description?: string;
  status?: EnvironmentStatus;
  insights: {
    type: InsightCardType;
    count?: number;
    isDisabled?: boolean;
  }[];
}

export interface ContainerProps {
  $columnCount: number;
}

export type HeaderProps = ContainerProps;
