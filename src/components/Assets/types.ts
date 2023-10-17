import { Duration } from "../../globals";
import { SpanInfo, SpanInstanceInfo } from "../../types";

export interface AssetsProps {
  data?: AssetsData;
}

export interface ExtendedAssetEntry extends AssetEntry {
  id: string;
}

export interface ExtendedAssetEntryWithServices extends ExtendedAssetEntry {
  relatedServices: string[];
}

export interface GroupedAssetEntries {
  [key: string]: ExtendedAssetEntryWithServices[];
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

export interface ImpactScores {
  ScoreExp25: number;
  ScoreExp1000: number;
}

export interface AssetEntry {
  span: AssetEntrySpanInfo;
  assetType: string;
  serviceName: string;
  endpointCodeObjectId: string | null;
  p50: Duration | null;
  p95: Duration | null;
  /**
   * @deprecated
   */
  durationPercentiles: {
    percentile: number;
    currentDuration: Duration | null;
  }[];
  insights: Insight[];
  lastSpanInstanceInfo: SpanInstanceInfo;
  firstDataSeenTime: string;
  impactScores?: ImpactScores;
}

export interface AssetsData {
  accountId: string;
  environment: string;
  serviceAssetsEntries: ServiceAssetsEntry[];
}

export interface ServiceAssetsEntry {
  itemType: string;
  assetEntries: AssetEntry[];
  accountId: string;
  environment: string;
  serviceName: string;
}
