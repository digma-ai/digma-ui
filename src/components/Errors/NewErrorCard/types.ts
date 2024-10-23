import { GlobalErrorData } from "../GlobalErrorsList/types";

export interface NewErrorCardProps {
  data: GlobalErrorData;
  onSourceLinkClick: (codeObjectId: string) => void;
  onPinChange: () => void;
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
