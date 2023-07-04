import { ReactNode } from "react";
import { InsightType } from "../../../types";
import { GenericCodeObjectInsight } from "../types";

export interface InsightCardProps {
  data: GenericCodeObjectInsight;
  content?: ReactNode;
  expandableContent?: ReactNode;
  menuItems?: string[];
  stats?: string;
  buttons?: ReactNode[];
  isExpandable?: boolean;
  onRecalculate?: (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onPercentileViewModeChange?: (value: number) => void;
}

export interface PercentileViewModeOptionProps {
  selected: boolean;
}
