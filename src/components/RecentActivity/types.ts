import type { ComponentType } from "react";
import type { Duration } from "../../globals";
import type { InsightType } from "../Insights/types";
import type { EnvironmentType } from "../common/App/types";
import type { IconProps } from "../common/icons/types";
import type { ViewMode } from "./EnvironmentPanel/types";

export interface RecentActivityThemeColors {
  background: string;
  header: {
    text: string;
  };
  table: {
    header: {
      text: string;
    };
    row: {
      default: {
        border: string;
        background: string;
        link: string;
      };
      new: {
        border: string;
        background: string;
        link: string;
      };
    };
  };
}

export interface ViewModeOption {
  value: ViewMode;
  icon: ComponentType<IconProps>;
}

export interface EntrySpan {
  displayText: string;
  serviceName: string;
  scopeId: string;
  spanCodeObjectId: string;
  methodCodeObjectId: string | null;
}

export interface SlimInsight {
  type: string;
  codeObjectIds: string[];
  importance: number;
  criticality?: number;
}

export interface ActivityEntry {
  environment: string;
  traceFlowDisplayName: string;
  firstEntrySpan: EntrySpan;
  lastEntrySpan: EntrySpan | null;
  latestTraceId: string;
  latestTraceTimestamp: string;
  latestTraceDuration: Duration;
  slimAggregatedInsights: SlimInsight[];
  spansCount?: number;
}

export interface Environment {
  name: string;
  id: string;
  isPending: boolean;
  type: EnvironmentType | null;
  token: string | null;
  serverApiUrl: string | null;
  isOrgDigmaSetupFinished: boolean;
}

export interface ExtendedEnvironment extends Environment {
  hasRecentActivity: boolean;
}

export interface RecentActivityData {
  environments: Environment[];
  entries: ActivityEntry[];
}

export interface SetIsJaegerData {
  isJaegerEnabled: boolean;
}

export interface ViewModeOptionProps {
  $selected: boolean;
}

export interface DigmathonProgressInsightData {
  type: InsightType;
  foundAt: string;
}

export interface SetDigmathonProgressDataPayload {
  insights: DigmathonProgressInsightData[];
  lastUpdatedByUserAt: string | null;
}

export interface DigmathonInsightCardData {
  title: string;
  description: string;
  illustration: JSX.Element;
}

export interface DigmathonInsightData {
  type: InsightType;
  data: DigmathonInsightCardData | undefined;
  foundAt: string | null;
}

export interface DigmathonProgressData {
  insights: DigmathonInsightData[];
  lastUpdatedByUserAt: string | null;
}

export interface CreateEnvironmentPayload {
  environment: string;
  type: EnvironmentType | null;
}

export interface ErrorResponseData {
  errorCode: string;
  errorDescription: string;
}

export interface EnvironmentCreatedData {
  errors?: ErrorResponseData[];
  id: string;
}

export interface EnvironmentInstructionsVisibility {
  isOpen: boolean;
  newlyCreatedEnvironmentId?: string;
  keepOpen: boolean;
}

export type EnvironmentClearDataTimeStamps = Record<string, string>;
