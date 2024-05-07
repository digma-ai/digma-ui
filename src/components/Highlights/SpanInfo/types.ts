import { Environment } from "../../common/App/types";

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
}
