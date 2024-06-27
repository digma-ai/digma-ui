import { MemoExoticComponent } from "react";
import * as descriptionProvider from "../components/common/InsightsDescription";
import { AlarmClockIcon } from "../components/common/icons/AlarmClockIcon";
import { BottleneckIcon } from "../components/common/icons/BottleneckIcon";
import { ClockWithTicksIcon } from "../components/common/icons/ClockWithTicksIcon";
import { MeterHighIcon } from "../components/common/icons/MeterHighIcon";
import { MeterLowIcon } from "../components/common/icons/MeterLowIcon";
import { MeterMediumIcon } from "../components/common/icons/MeterMediumIcon";
import { PieChartIcon } from "../components/common/icons/PieChartIcon";
import { SQLDatabaseIcon } from "../components/common/icons/SQLDatabaseIcon";
import { ScalesIcon } from "../components/common/icons/ScalesIcon";
import { SineIcon } from "../components/common/icons/SineIcon";
import { SnailIcon } from "../components/common/icons/SnailIcon";
import { SpotIcon } from "../components/common/icons/SpotIcon";
import { WarningCircleIcon } from "../components/common/icons/WarningCircleIcon";
import { IconProps } from "../components/common/icons/types";
import { InsightType } from "../types";

export interface InsightTypeInfo {
  icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  label: string;
  description?: () => JSX.Element;
  subTypes?: Record<string, Omit<InsightTypeInfo, "subTypes">>;
}

export const getInsightTypeInfo = (
  type: string,
  subType?: string
): InsightTypeInfo | undefined => {
  const insightTypeInfoMap: Record<string, InsightTypeInfo> = {
    [InsightType.Errors]: {
      icon: WarningCircleIcon,
      label: "Errors"
    },
    [InsightType.HotSpot]: {
      icon: SpotIcon,
      label: "Error Hotspot",
      description: descriptionProvider.HotSpotDescription
    },
    [InsightType.SlowEndpoint]: {
      icon: SnailIcon,
      label: "Slow Endpoint"
    },
    [InsightType.LowUsage]: {
      icon: MeterLowIcon,
      label: "Endpoint Low Traffic"
    },
    [InsightType.NormalUsage]: {
      icon: MeterMediumIcon,
      label: "Endpoint Normal Level of Traffic"
    },
    [InsightType.HighUsage]: {
      icon: MeterHighIcon,
      label: "Endpoint High Traffic"
    },

    [InsightType.EndpointBottleneck]: {
      icon: BottleneckIcon,
      label: "Bottleneck",
      description: descriptionProvider.BottleneckDescription
    },

    [InsightType.EndpointSpanNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: "Suspected N+1",
      description: descriptionProvider.NPlusOneDescription,
      subTypes: {
        repeatedQueries: {
          icon: SQLDatabaseIcon,
          label: "Repeated query"
        },
        repeatedInserts: {
          icon: SQLDatabaseIcon,
          label: "Repeated inserts"
        }
      }
    },
    [InsightType.SpaNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: "Suspected N+1",
      description: descriptionProvider.NPlusOneDescription,
      subTypes: {
        repeatedQueries: {
          icon: SQLDatabaseIcon,
          label: "Repeated query"
        },
        repeatedInserts: {
          icon: SQLDatabaseIcon,
          label: "Repeated inserts"
        }
      }
    },
    [InsightType.SpanEndpointBottleneck]: {
      icon: BottleneckIcon,
      label: "Bottleneck",
      description: descriptionProvider.BottleneckDescription
    },
    [InsightType.SpanScaling]: {
      icon: ScalesIcon,
      label: "Scaling Issue Found",
      description: descriptionProvider.SpanScalingDescription
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
    [InsightType.EndpointSlowdownSource]: {
      icon: SnailIcon,
      label: "Duration Slowdown Source Detected"
    },
    [InsightType.EndpointBreakdown]: {
      icon: PieChartIcon,
      label: "Request Breakdown"
    },
    [InsightType.SpanScalingWell]: {
      icon: ScalesIcon,
      label: "No Scaling Issue Detected"
    },
    [InsightType.SpanScalingInsufficientData]: {
      icon: ScalesIcon,
      label: "Performance at Scale"
    },
    [InsightType.EndpointSessionInView]: {
      icon: SQLDatabaseIcon,
      label: "Session in View Query Detected",
      description: descriptionProvider.EndpointSessionInViewDescription
    },
    [InsightType.EndpointChattyApiV2]: {
      icon: SQLDatabaseIcon,
      label: "Excessive API Calls Detected",
      description: descriptionProvider.ChattyApiDescription
    },
    [InsightType.EndpointHighNumberOfQueries]: {
      icon: SQLDatabaseIcon,
      label: "High number of queries",
      description: descriptionProvider.EndpointHighNumberOfQueriesDescription
    },
    [InsightType.SpanNexus]: {
      icon: BottleneckIcon,
      label: "Code Nexus Point",
      description: descriptionProvider.CodeNexusDescription
    },
    [InsightType.SpanQueryOptimization]: {
      icon: SQLDatabaseIcon,
      label: "Inefficient Query",
      description: descriptionProvider.QueryOptimizationDescription
    },
    [InsightType.EndpointQueryOptimizationV2]: {
      icon: SQLDatabaseIcon,
      label: "Inefficient Query",
      description: descriptionProvider.QueryOptimizationDescription
    }
  };

  const insightTypeInfo = insightTypeInfoMap[type];

  if (subType && insightTypeInfo.subTypes?.[subType]) {
    return insightTypeInfo.subTypes[subType];
  }

  return insightTypeInfo;
};
