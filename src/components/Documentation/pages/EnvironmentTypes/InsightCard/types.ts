import type { MemoExoticComponent } from "react";
import type { IconProps } from "../../../../common/icons/types";

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
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  name: string;
  description: string;
}

export enum InsightCardType {
  TracingData,
  QueryIssues,
  Bottlenecks,
  Errors,
  ScalingIssuesCI,
  ScalingIssuesProduction,
  SlowdownPerfImprovements,
  SlowdownRootCauseDetection,
  PerformanceImpact,
  UsageAnalysis,
  ErrorHotSpots,
  ConcurrencyAndCostOptimization,
  ChattyMicroservices
}
