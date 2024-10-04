import { Environment } from "../../common/App/types";

export interface SpanInfoProps {
  onCollapse: () => void;
  data: SpanInfoData;
}

export interface GetHighlightsSpanInfoDataPayload {
  query: {
    spanCodeObjectId: string | null;
  };
}

export interface SpanInfoData {
  displayName: string;
  services: string[];
  environments: Environment[];
  assetTypeId: string;
  firstSeen?: string;
  lastSeen?: string;
}
