import { ReactNode } from "react";
import { InsightType, SpanInfo } from "../../../types";
import { GenericCodeObjectInsight } from "../types";

export interface InsightCardProps {
  data: GenericCodeObjectInsight;
  content?: ReactNode;
  expandableContent?: ReactNode;
  menuItems?: string[];
  stats?: string;
  buttons?: ReactNode[];
  onRecalculate: (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onPercentileViewModeChange?: (value: number) => void;
  isRecent?: boolean;
  onRefresh: (insightType: InsightType) => void;
  isAsync?: boolean;
  spanInfo?: SpanInfo | null;
}

export interface PercentileViewModeOptionProps {
  selected: boolean;
}
