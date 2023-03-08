import { AssetEntry } from "../types";

export type AssetListProps = {
  data: { [key: string]: { [key: string]: AssetEntry[] } };
  onSelect: (categoryId: string) => void;
};
