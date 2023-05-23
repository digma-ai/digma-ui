import {
  DurationPercentileWithChange,
  SpanInfo,
  SpanInstanceInfo
} from "../../types";

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

export interface AssetEntrySpanInfo extends SpanInfo {
  classification: string;
  role: string;
}

export interface AssetEntry {
  span: AssetEntrySpanInfo;
  assetType: string;
  serviceName: string;
  endpointCodeObjectId: string | null;
  durationPercentiles: DurationPercentileWithChange[];
  insights: Insight[];
  lastSpanInstanceInfo: SpanInstanceInfo;
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
