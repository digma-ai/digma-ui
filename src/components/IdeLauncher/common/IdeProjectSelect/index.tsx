import { Select } from "../../../common/v3/Select";
import * as s from "./styles";
import type { IdeProjectSelectProps } from "./types";

export const IdeProjectSelect = ({
  items,
  onChange
}: IdeProjectSelectProps) => {
  const selectedItem = items?.find((item) => item.selected);

  return (
    <s.Container>
      <Select
        placeholder={selectedItem?.label ?? "Select IDE Project"}
        items={items}
        onChange={onChange}
      />
    </s.Container>
  );
};
