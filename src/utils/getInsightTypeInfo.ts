import { MemoExoticComponent } from "react";
import { AlarmClockIcon } from "../components/common/icons/AlarmClockIcon";
import { BottleneckIcon } from "../components/common/icons/BottleneckIcon";
import { ClockWithTicksIcon } from "../components/common/icons/ClockWithTicksIcon";
import { MeterHighIcon } from "../components/common/icons/MeterHighIcon";
import { MeterLowIcon } from "../components/common/icons/MeterLowIcon";
import { PieChartIcon } from "../components/common/icons/PieChartIcon";
import { SQLDatabaseIcon } from "../components/common/icons/SQLDatabaseIcon";
import { ScalesIcon } from "../components/common/icons/ScalesIcon";
import { SineIcon } from "../components/common/icons/SineIcon";
import { SnailIcon } from "../components/common/icons/SnailIcon";
import { SpotIcon } from "../components/common/icons/SpotIcon";
import { WarningCircleIcon } from "../components/common/icons/WarningCircleIcon";
import { IconProps } from "../components/common/icons/types";
import { InsightType } from "../types";

export const getInsightTypeInfo = (
  type: string
):
  | {
      icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
      label: string;
    }
  | undefined => {
  const insightTypeInfoMap: Record<
    string,
    {
      icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
      label: string;
    }
  > = {
    [InsightType.Errors]: {
      icon: WarningCircleIcon,
      label: "Errors"
    },
    [InsightType.HotSpot]: {
      icon: SpotIcon,
      label: "Error Hotspot"
    },
    [InsightType.SlowEndpoint]: {
      icon: SnailIcon,
      label: "Slow Endpoint"
    },
    [InsightType.LowUsage]: {
      icon: MeterLowIcon,
      label: "Endpoint Low Traffic"
    },
    [InsightType.HighUsage]: {
      icon: MeterHighIcon,
      label: "Endpoint High Traffic"
    },
    [InsightType.SlowestSpans]: {
      icon: BottleneckIcon,
      label: "Span Bottleneck"
    },
    [InsightType.EndpointSpanNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: "Suspected N-Plus-1"
    },
    [InsightType.SpanNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: "Suspected N-Plus-1"
    },
    [InsightType.SpanEndpointBottleneck]: {
      icon: BottleneckIcon,
      label: "Bottleneck"
    },
    [InsightType.SpanScaling]: {
      icon: ScalesIcon,
      label: "Scaling Issue Found"
    },
    [InsightType.SpanScalingRootCause]: {
      icon: ScalesIcon,
      label: "Scaling Issue Root Cause Found"
    },
    [InsightType.SpanUsages]: {
      icon: SineIcon,
      label: "Top Usage"
    },
    [InsightType.SpanDurations]: {
      icon: AlarmClockIcon,
      label: "Duration"
    },
    [InsightType.SpanDurationBreakdown]: {
      icon: ClockWithTicksIcon,
      label: "Duration Breakdown"
    },
    [InsightType.EndpointDurationSlowdown]: {
      icon: SnailIcon,
      label: "Duration Slowdown Source Detected"
    },
    [InsightType.EndpointBreakdown]: {
      icon: PieChartIcon,
      label: "Request Breakdown"
    }
  };

  return insightTypeInfoMap[type];
};
