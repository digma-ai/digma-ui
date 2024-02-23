import { ReactNode } from "react";
import { InsightType } from "../../../../types";
import { GenericCodeObjectInsight } from "../../../Insights/types";

export interface InsightCardProps {
  insight: GenericCodeObjectInsight;
  content?: ReactNode;
  isNew?: boolean;
  isAsync?: boolean;
  isActive?: boolean;
  onDismiss?: (insightId: string) => void;
  onOpenHistogram?: (
    insightType: InsightType,
    spanCodeObjectId: string
  ) => void;
  onRecalculate?: (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onRefresh?: (insightType: InsightType, spanCodeObjectId?: string) => void;
  onOpenJiraTicket?: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => void;
  onPin?: (insightId: string) => void;
  onGoToLive?: () => void;
  onGoToTrace?: () => void;
}
