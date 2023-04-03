import { Duration } from "../../globals";

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

export interface RecentActivityData {
  environments: string[];
  entries: ActivityEntry[];
}

export interface RecentActivityProps {
  data?: RecentActivityData;
}

export interface SetIsJaegerData {
  isJaegerEnabled: boolean;
}
