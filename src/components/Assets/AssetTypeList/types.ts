import { AssetEntry } from "../types";

export interface AssetListProps {
  data: { [key: string]: { [key: string]: AssetEntry[] } };
  onAssetTypeSelect: (categoryId: string) => void;
}
