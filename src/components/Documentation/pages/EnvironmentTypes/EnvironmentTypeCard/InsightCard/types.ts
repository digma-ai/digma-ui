import { IconProps } from "../../../../../common/icons/types";

export interface InsightCardProps {
  type: InsightCardType;
  count?: number;
  isDisabled?: boolean;
}

export interface ContainerProps {
  $isDisabled?: boolean;
}

export interface CountChipProps {
  $count: number;
}

export interface InsightCardTypeData {
  icon?: React.MemoExoticComponent<(props: IconProps) => JSX.Element>;
  name: string;
  description: string;
}

export enum InsightCardType {
  TRACING_DATA,
  QUERY_ISSUES,
  BOTTLENECKS,
  ERRORS,
  SCALING_ISSUES,
  SLOWDOWN_PERF_IMPROVEMENTS,
  SLOWDOWN_ROOT_CAUSE_DETECTION,
  PERFORMANCE_IMPACT,
  USAGE_ANALYSIS,
  ERROR_HOTSPOTS,
  TOO_MANY_HTTP_CALLS
}
