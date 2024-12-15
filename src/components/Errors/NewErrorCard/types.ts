import type { GlobalErrorData } from "../GlobalErrorsList/types";

export interface NewErrorCardProps {
  data: GlobalErrorData;
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

export interface PinUnpinErrorPayload {
  id: string;
  environment: string;
}
