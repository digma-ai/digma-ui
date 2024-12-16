import type { MemoExoticComponent } from "react";
import type { PercentileKey } from "../../../types";
import type { IconProps } from "../../common/icons/types";
import type { WidgetType } from "../widgets/types";

export interface ListWidgetProps<T> {
  icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  title: string;
  environment: string;
  type: WidgetType;
  showPercentileToggleSwitch?: boolean;
  renderListItem: (
    item: T,
    environment: string,
    percentileViewMode?: number
  ) => JSX.Element;
}

export interface ListWidgetData<T> {
  data: {
    entries: T[];
    totalCount: number;
  } | null;
  error: {
    message: string;
  } | null;
  type: string;
}

export interface GetDataPayload {
  environment: string;
  type: WidgetType;
  query: { page: number; pageSize?: number; percentile?: PercentileKey | null };
}
