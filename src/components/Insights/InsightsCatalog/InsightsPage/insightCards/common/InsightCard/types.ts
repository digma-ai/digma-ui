import type { ReactNode } from "react";
import type { ScopeSpan } from "../../../../../../common/App/types";
import type { CardProps } from "../../../../../../common/v3/Card/types";
import type {
  GenericCodeObjectInsight,
  InsightType
} from "../../../../../types";

export type InsightCardViewMode = "full" | "compact";

export interface InsightCardProps {
  insight: GenericCodeObjectInsight;
  content?: ReactNode;
  isAsync?: boolean;
  isActive?: boolean;
  onOpenHistogram?: (
    spanCodeObjectId: string,
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
  isMarkAsReadButtonEnabled: boolean;
  viewMode: InsightCardViewMode;
  mainMetric?: ReactNode;
}

export interface StyledCardProps extends CardProps {
  $isDismissed?: boolean;
  $isRead?: boolean;
  $isReadable?: boolean;
}

export interface DismissUndismissResponsePayload {
  insightId: string;
  id: string;
  status: "success" | "failure";
  error?: string;
}

export interface MarkAsReadPayload {
  insightIds: string[];
}

export interface MarkAllAsReadPayload {
  scope: ScopeSpan | null;
}

export interface SetMarkAsReadResponsePayload {
  insightIds: string[];
  status: "success" | "failure";
  error?: string;
}

export interface SetMarkAllAsReadResponsePayload {
  scope: ScopeSpan | null;
  status: "success" | "failure";
  error?: string;
}

export interface RecalculateResponse {
  insightId: string;
}

export interface InsightCardCommonProps {
  onRecalculate: (insightId: string) => void;
  onRefresh: (insightType: InsightType) => void;
  onJiraTicketCreate?: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => void;
  onGoToSpan: (spanCodeObjectId: string) => void;
  isJiraHintEnabled?: boolean;
  isMarkAsReadButtonEnabled: boolean;
  viewMode: InsightCardViewMode;
}

export type Action =
  | "markAsRead"
  | "openHistogram"
  | "recheck"
  | "viewTicketInfo"
  | "openTrace"
  | "openLiveView"
  | "pin"
  | "info";
