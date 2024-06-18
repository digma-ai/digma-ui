import * as s from "./styles";
import { AssetTypeListItemProps } from "./types";

export const AssetTypeListItem = (props: AssetTypeListItemProps) => {
  const handleAssetTypeClick = () => {
    props.onAssetTypeClick(props.id);
  };

  return (
    <s.ListItem onClick={handleAssetTypeClick}>
      {props.icon && <props.icon size={16} color={"currentColor"} />}
      {props.label ?? props.id}
      <s.EntryCount>{props.entryCount}</s.EntryCount>
    </s.ListItem>
  );
};
