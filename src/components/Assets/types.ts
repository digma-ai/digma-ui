import { Duration } from "../../globals";

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

export interface AssetsProps {
  data: CodeObjectAssetsResponse;
}

export interface ExtendedAssetEntry extends AssetEntry {
  id: string;
}

export interface GroupedAssetEntries {
  [key: string]: {
    [key: string]: ExtendedAssetEntry[];
  };
}

export interface Insight {
  type: string;
  importance: number;
  shortDisplayInfo: {
    title: string;
    targetDisplayName: string;
    subtitle: string;
    description: string;
  };
}

export interface DurationPercentiles {
  percentile: number;
  currentDuration: Duration;
  previousDuration: Duration | null;
  changeTime: string | null;
  changeVerified: boolean | null;
  traceIds: string[];
}

export interface AssetEntry {
  span: {
    classification: string;
    role: string;
    name: string;
    displayName: string;
    instrumentationLibrary: string;
    methodCodeObjectId: string;
    spanCodeObjectId: string;
    kind: string;
    codeObjectId: string;
  };
  assetType: string;
  serviceName: string;
  endpointCodeObjectId: string | null;
  durationPercentiles: DurationPercentiles[];
  insights: Insight[];
  lastSpanInstanceInfo: {
    traceId: string;
    spanId: string;
    startTime: string;
    duration: Duration;
  };
  firstDataSeenTime: string;
}

export interface CodeObjectAssetsResponse {
  accountId: string;
  environment: string;
  serviceAssetsEntries: {
    itemType: string;
    assetEntries: AssetEntry[];
    accountId: string;
    environment: string;
    serviceName: string;
  }[];
}
