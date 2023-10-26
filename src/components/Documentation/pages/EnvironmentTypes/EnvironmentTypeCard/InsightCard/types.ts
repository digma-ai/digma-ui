import { InsightType } from "../../../../../../types";

export interface InsightCardProps {
  type: InsightType;
  count?: number;
  isDisabled?: boolean;
}

export interface ContainerProps {
  $isDisabled?: boolean;
}

export interface CountChipProps {
  $count: number;
}
