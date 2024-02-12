import { SpanInfo } from "../../../types";

export interface AssetsViewConfigurationProps {
  onAssetViewChanged: (val: string) => void;
  scope: SpanInfo | null;
}
