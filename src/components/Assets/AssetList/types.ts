import { AssetEntry } from "../types";

export interface AssetListProps {
  onBackButtonClick: () => void;
  assetTypeId: string;
  entries: { [key: string]: AssetEntry[] };
}
