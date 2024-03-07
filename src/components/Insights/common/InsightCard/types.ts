import { ReactNode } from "react";
import { InsightType } from "../../../../types";
import { CardProps } from "../../../common/Card/types";
import { GenericCodeObjectInsight } from "../../types";

export interface InsightCardProps {
  insight: GenericCodeObjectInsight;
  content?: ReactNode;
  isAsync?: boolean;
  isActive?: boolean;
  onOpenHistogram?: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType,
    displayName: string
  ) => void;
  onRecalculate: (insightId: string) => void;
  onRefresh: (insightType: InsightType, spanCodeObjectId?: string) => void;
  onPin?: (insightId: string) => void;
  onGoToLive?: () => void;
  onGoToTrace?: () => void;
  jiraTicketInfo?: {
    ticketLink?: string | null;
    isHintEnabled?: boolean;
    spanCodeObjectId?: string;
  };
  onJiraButtonClick?: (
    spanCodeObjectId: string | undefined,
    event: string
  ) => void;
  onGoToSpan: (spanCodeObjectId: string) => void;
}

export interface StyledInsightCardProps extends CardProps {
  $isDismissed?: boolean;
}

export interface DismissResponsePayload {
  insightId: string;
  status: "success" | "failure";
  error?: string;
}

export interface UndismissResponsePayload {
  insightId: string;
  status: "success" | "failure";
  error?: string;
}
