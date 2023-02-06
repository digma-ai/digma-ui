type Duration = {
  value: number;
  unit: string;
  raw: number;
};

export type EntrySpan = {
  displayText: string;
  serviceName: string;
  scopeId: string;
  spanCodeObjectId: string;
  methodCodeObjectId: string | null;
};

type SlimInsight = {
  type: string;
  codeObjectIds: string[];
};

export type ActivityEntry = {
  environment: string;
  traceFlowDisplayName: string;
  firstEntrySpan: EntrySpan;
  lastEntrySpan: EntrySpan | null;
  latestTraceId: string;
  latestTraceTimestamp: string;
  latestTraceDuration: Duration;
  slimAggregatedInsights: SlimInsight[];
  isDisabled?: boolean;
};

export interface RecentActivityData {
  envs: string[];
  currentEnv: string;
  entries: ActivityEntry[];
}
