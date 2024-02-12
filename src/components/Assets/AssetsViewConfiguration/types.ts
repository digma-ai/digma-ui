import { SpanInfo } from "../../../types";

export interface AssetsViewConfigurationProps {
  onAssetViewChanged: (isDirect: boolean) => void;
  scope: SpanInfo | null;
}
