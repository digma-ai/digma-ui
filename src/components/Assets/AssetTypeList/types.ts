import { ExtendedAssetEntry } from "../types";

export interface AssetListProps {
  data: { [key: string]: { [key: string]: ExtendedAssetEntry[] } };
  onAssetTypeSelect: (categoryId: string) => void;
}
