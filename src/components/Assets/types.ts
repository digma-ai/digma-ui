import {
  DurationPercentileWithChange,
  SpanInfo,
  SpanInstanceInfo
} from "../../types";

export enum ImpactScore {
  High = 2,
  Medium = 1,
  Low = 0
}

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

export interface ImpactScores {
  ScoreExp25: number;
  ScoreExp1000: number;
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
