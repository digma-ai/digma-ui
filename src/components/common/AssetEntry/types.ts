import { ExtendedAssetEntryWithServices } from "../../Assets/AssetList/types";

export interface AssetEntryProps {
  entry: ExtendedAssetEntryWithServices;
  onAssetLinkClick: (entry: ExtendedAssetEntryWithServices) => void;
}
