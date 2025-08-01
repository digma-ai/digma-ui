import type { SelectItem } from "../../../common/v3/Select/types";

export interface IdeProjectSelectProps {
  items: SelectItem[];
  onChange: (value: string | string[]) => void;
}
