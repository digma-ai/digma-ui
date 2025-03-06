import type { ReactNode } from "react";
import type { SpanInfo } from "../../../../../redux/services/types";
import type { InsightType } from "../../../../../types";
import type {
  GenericCodeObjectInsight,
  InsightImportance
} from "../../../types";

export interface InsightCardProps {
  data: GenericCodeObjectInsight;
  content?: ReactNode;
  expandableContent?: ReactNode;
  menuItems?: string[];
  stats?: string;
  buttons?: ReactNode[];
  onRecalculate: (insightId: string, insightType: InsightType) => void;
  onPercentileViewModeChange?: (value: number) => void;
  isRecent?: boolean;
  onRefresh: (insightType: InsightType) => void;
  isAsync?: boolean;
  spanInfo?: SpanInfo | null;
  onRead?: () => void;
}

export interface PercentileViewModeOptionProps {
  selected: boolean;
}

export interface InsightIconContainerProps {
  $importance: InsightImportance;
}
