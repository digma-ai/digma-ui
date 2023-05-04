import { Duration } from "../../globals";

export interface AssetsProps {
  data?: AssetsData;
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

export interface AssetsData {
  serviceAssetsEntries: {
    itemType: string;
    assetEntries: AssetEntry[];
    accountId: string;
    environment: string;
    serviceName: string;
  }[];
}
