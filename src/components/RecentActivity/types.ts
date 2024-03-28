import { ComponentType } from "react";
import { Duration } from "../../globals";
import { EnvironmentType } from "../common/App/types";
import { IconProps } from "../common/icons/types";
import { ViewMode } from "./EnvironmentPanel/types";
import { LiveData } from "./LiveView/types";

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
}

export interface Environment {
  name: string;
  originalName: string;
  isPending: boolean;
  additionToConfigResult: "success" | "failure" | null;
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

export interface RecentActivityProps {
  data?: RecentActivityData;
  liveData?: LiveData;
}

export interface SetIsJaegerData {
  isJaegerEnabled: boolean;
}

export interface ViewModeOptionProps {
  $selected: boolean;
}

export interface CreateEnvironmentPayload {
  environment: string;
  type: EnvironmentType | null;
}

export interface EnvironmentCreatedData {
  errorCode: string;
  errorDescription: string;
  id: string;
}
