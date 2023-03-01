import { AssetsListCategory } from "./AssetsListItem";
import * as s from "./styles";
import { AssetsListProps } from "./types";

export const AssetsList = (props: AssetsListProps) => {
  const handleSelect = (categoryId: string) => {
    props.onSelect(categoryId);
  };

  return (
    <s.List>
      {props.groups.map((group) => (
        <AssetsListCategory
          id={group.id}
          key={group.id}
          icon={group.icon}
          items={group.items}
          label={group.label}
          onSelect={handleSelect}
        />
      ))}
    </s.List>
  );
};
