import { getAssetTypeInfo } from "../utils";
import { AssetTypeListItem } from "./AssetTypeListItem";
import * as s from "./styles";
import { AssetListProps } from "./types";

const ASSET_TYPE_IDS = [
  "Endpoint",
  "Consumer",
  "DatabaseQueries",
  "CodeLocation",
  "Other"
];

export const AssetTypeList = (props: AssetListProps) => {
  const handleSelect = (categoryId: string) => {
    props.onSelect(categoryId);
  };

  return (
    <s.List>
      {ASSET_TYPE_IDS.map((assetTypeId) => {
        const assetTypeInfo = getAssetTypeInfo(assetTypeId);
        const entryCount = props.data[assetTypeId]
          ? Object.values(props.data[assetTypeId]).flat().length
          : 0;

        return (
          <AssetTypeListItem
            id={assetTypeId}
            key={assetTypeId}
            icon={assetTypeInfo?.icon}
            entryCount={entryCount}
            label={assetTypeInfo?.label}
            onSelect={handleSelect}
          />
        );
      })}
    </s.List>
  );
};
