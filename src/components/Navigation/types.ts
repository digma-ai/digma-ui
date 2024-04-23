import { View } from "../Main/types";
import { CodeDetails } from "../common/App/types";

export interface TabData {
  title: string;
  id: View;
  isSelected: boolean;
  isDisabled: boolean;
  hasNewData: boolean;
  isHidden: boolean;
  cardName: string;
  tooltipMessage?: string;
  path?: string;
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

export interface ChangeEnvironmentPayload {
  environment: string;
}

export interface ChangeViewPayload {
  view: string;
}

export interface SetViewsPayload {
  views: TabData[];
  triggeredByJcef: boolean;
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
