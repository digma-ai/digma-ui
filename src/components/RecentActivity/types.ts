import { Duration } from "../../globals";
import { LiveData } from "./LiveView/types";

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
  isPending: boolean;
  additionToConfigResult: "success" | "failure" | null;
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
