import type { ReactNode, RefObject } from "react";
import type { InsightType } from "../../../../../../../../types";
import type { CardProps } from "../../../../../../../common/v3/Card/types";
import type { GenericCodeObjectInsight } from "../../../../../../types";

export type InsightCardViewMode = "full" | "compact";

export interface InsightCardProps {
  insight: GenericCodeObjectInsight;
  content?: ReactNode;
  isAsync?: boolean;
  isActive?: boolean;
  onOpenHistogram?: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string,
    environmentId: string
  ) => void;
  onPin?: (insightId: string) => void;
  onGoToLive?: () => void;
  onGoToTrace?: () => void;
  onGoToP50Trace?: () => void;
  onGoToP95Trace?: () => void;
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
  onDismissalChange: (action: string, insightId: string) => void;
  onOpenSuggestion?: (insightId: string) => void;
  tooltipBoundaryRef?: RefObject<HTMLElement>;
}

export interface StyledCardProps extends CardProps {
  $isDismissed?: boolean;
  $isRead?: boolean;
  $isReadable?: boolean;
}

export type Action =
  | "info"
  | "markAsRead"
  | "openHistogram"
  | "recheck"
  | "ide"
  | "viewTicketInfo"
  | "openP50Trace"
  | "openP95Trace"
  | "openTrace"
  | "openLiveView"
  | "pin"
  | "openSuggestion";
