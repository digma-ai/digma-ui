import { ExtendedAssetEntryWithServices } from "../types";

export interface AssetListProps {
  data: { [key: string]: ExtendedAssetEntryWithServices[] };
  onAssetTypeSelect: (assetTypeId: string) => void;
}
