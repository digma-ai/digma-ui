import * as s from "./styles";
import { AssetTypeListItemProps } from "./types";

export const AssetTypeListItem = ({
  onAssetTypeClick,
  id,
  icon: Icon,
  label,
  entryCount
}: AssetTypeListItemProps) => {
  const handleAssetTypeClick = () => {
    onAssetTypeClick(id);
  };

  return (
    <s.ListItem onClick={handleAssetTypeClick}>
      {Icon && <Icon size={16} color={"currentColor"} />}
      {label ?? id}
      <s.EntryCount>{entryCount}</s.EntryCount>
    </s.ListItem>
  );
};
