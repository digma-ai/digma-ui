import { ActivityEntry, EntrySpan } from "../RecentActivity/types";

export type RecentActivityTableProps = {
  data: ActivityEntry[];
  onSpanLinkClick: (span: EntrySpan) => void;
  onTraceButtonClick: (traceId: string, span: EntrySpan) => void;
};

export enum INSIGHT_TYPES {
  SpanUsageStatus = "SpanUsageStatus",
  TopErrorFlows = "TopErrorFlows",
  SpanDurationChange = "SpanDurationChange",
  HotSpot = "HotSpot",
  Errors = "Errors",
  SlowEndpoint = "SlowEndpoint",
  LowUsage = "LowUsage",
  NormalUsage = "NormalUsage",
  HighUsage = "HighUsage",
  SlowestSpans = "SlowestSpans",
  EndpointSpaNPlusOne = "EndpointSpaNPlusOne",
  SpanUsages = "SpanUsages",
  SpaNPlusOne = "SpaNPlusOne",
  SpanEndpointBottleneck = "SpanEndpointBottleneck",
  SpanHighUsage = "SpanHighUsage",
  SpanDurations = "SpanDurations",
  SpanScaling = "SpanScaling",
  SpanScalingRootCause = "SpanScalingRootCause",
  SpanDurationBreakdown = "SpanDurationBreakdown"
}
