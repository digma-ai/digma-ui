import { ViewData } from "../Main/types";
import { CodeDetails } from "../common/App/types";

export interface NavigationProps {
  view: ViewData;
  onViewChange: (viewId: string) => void;
}

export interface ContainerProps {
  $isActive: boolean;
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
