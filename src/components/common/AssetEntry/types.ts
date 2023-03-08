import { AssetEntry } from "../../Assets/types";

export interface AssetEntryProps {
  entry: AssetEntry;
  relatedServices: string[];
  onAssetLinkClick: (entry: AssetEntry) => void;
}
