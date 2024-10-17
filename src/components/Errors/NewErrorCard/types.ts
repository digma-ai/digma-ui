import { GlobalErrorData } from "../GlobalErrorsList/types";

export interface NewErrorCardProps {
  data: GlobalErrorData;
  onSourceLinkClick: (codeObjectId: string) => void;
}

export interface ContainerProps {
  $isPinned?: boolean;
  $isCritical?: boolean;
}

export interface OccurrenceChartContainerProps {
  $transitionDuration: number;
  $transitionClassName: string;
}
