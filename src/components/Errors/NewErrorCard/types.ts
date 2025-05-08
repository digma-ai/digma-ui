import type { ErrorListItem } from "../../../redux/services/types";

export interface NewErrorCardProps {
  data: ErrorListItem;
  onSourceLinkClick: (
    codeObjectId: string,
    spanCodeObjectId?: string | null
  ) => void;
  onPinStatusChange: (errorId: string) => void;
  onDismissStatusChange: (errorId: string) => void;
  onPinStatusToggle: () => void;
}

export interface ContainerProps {
  $isPinned?: boolean;
  $isCritical?: boolean;
}

export interface OccurrenceChartContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}

export interface DismissUndismissResultPayload {
  id: string;
  status: "success" | "failure";
}
