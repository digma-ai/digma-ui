import type { Environment } from "../../common/App/types";

export interface SpanInfoProps {
  onCollapse: () => void;
  data: SpanInfoData;
  spanCodeObjectId?: string;
}

export interface GetHighlightsSpanInfoDataPayload {
  query: {
    spanCodeObjectId: string | null;
  };
}

export interface LinkedEndpoint {
  spanCodeObjectId: string;
  displayName: string;
  environment: string;
}

export interface SpanInfoData {
  displayName: string;
  services: string[];
  environments: Environment[];
  assetTypeId: string;
  firstSeen?: string;
  lastSeen?: string;
  linkedEndpoints?: LinkedEndpoint[];
}
