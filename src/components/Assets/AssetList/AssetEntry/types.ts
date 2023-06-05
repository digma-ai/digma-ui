import { ExtendedAssetEntryWithServices } from "../types";

export interface AssetEntryProps {
  entry: ExtendedAssetEntryWithServices;
  onAssetLinkClick: (entry: ExtendedAssetEntryWithServices) => void;
}
