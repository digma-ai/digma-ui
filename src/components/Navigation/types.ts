import { ViewData } from "../Main/types";
import { CodeDetails } from "../common/App/types";

export interface NavigationProps {
  view: ViewData;
  onViewChange: (viewId: string) => void;
}

export interface OpenDocumentationPayload {
  page: string;
}

export interface OpenDashboardPayload {
  environment?: string | null;
}

export interface GoToCodeLocationPayload {
  codeDetails: CodeDetails;
}

// export interface ChangeEnvironmentPayload {
//   environment: string;
// }

// export interface ChangeViewPayload {
//   view: string;
// }

/**
 * @deprecated
 */
export interface TabData {
  title: string;
  id: string;
  isSelected: boolean;
  isDisabled: boolean;
  hasNewData: boolean;
  isHidden: boolean;
  cardName: string;
  tooltipMessage?: string;
  path?: string;
}

/**
 * @deprecated
 */
export interface SetViewsPayload {
  views: TabData[];
  createHistoryStep: boolean;
}

export interface AutoFixMissingDependencyPayload {
  methodId: string;
}

export interface AddAnnotationPayload {
  methodId: string;
}

export interface HighlightMethodInEditorPayload {
  methodId: string;
}

export interface CodeContext {
  spans: {
    assets: {
      spanCodeObjectId: string;
      displayName: string;
    }[];
    errorData: {
      codeObjectId: string;
      count: number;
    } | null;
  };
  isInstrumented: boolean | null;
  methodId: string | null;
  displayName: string;
  hasMissingDependency: boolean | null;
  canInstrumentMethod: boolean | null;
}
