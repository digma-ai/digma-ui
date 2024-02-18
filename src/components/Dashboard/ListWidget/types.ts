import { MemoExoticComponent } from "react";
import { PercentileKey } from "../../../types";
import { IconProps } from "../../common/icons/types";
import { WidgetType } from "../widgets/types";

export interface ListWidgetProps<T> {
  icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  title: string;
  environment: string;
  type: WidgetType;
  data?: ListWidgetData<T>;
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
