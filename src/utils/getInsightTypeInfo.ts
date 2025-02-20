import type { MemoExoticComponent } from "react";
import * as descriptionProvider from "../components/common/InsightsDescription";
import { PulseIcon } from "../components/common/icons/16px/PulseIcon";
import { SoundWaveIcon } from "../components/common/icons/16px/SoundWaveIcon";
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
import type { IconProps } from "../components/common/icons/types";
import {
  BOTTLENECK_ISSUE_DOCUMENTATION_URL,
  CHATTY_API_ISSUE_DOCUMENTATION_URL,
  CODE_NEXUS_DOCUMENTATION_URL,
  HIGH_NUMBER_OF_QUERIES_DOCUMENTATION_URL,
  QUERY_OPTIMIZATION_ISSUES_DOCUMENTATION_URL,
  SCALING_ISSUE_DOCUMENTATION_URL,
  SESSION_IN_VIEW_DOCUMENTATION_URL,
  SUSPECTED_N_PLUS_ONE_ISSUE_DOCUMENTATION_URL
} from "../constants";
import { InsightType } from "../types";

export interface InsightTypeInfo {
  icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  label: string;
  description?: () => JSX.Element;
  documentationLink?: string | null;
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
      description: descriptionProvider.BottleneckDescription,
      documentationLink: BOTTLENECK_ISSUE_DOCUMENTATION_URL
    },

    [InsightType.EndpointSpanNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: "Repeated query",
      subTypes: {
        repeatedQueries: {
          icon: SQLDatabaseIcon,
          label: "Suspected N+1",
          description: descriptionProvider.NPlusOneDescription,
          documentationLink: SUSPECTED_N_PLUS_ONE_ISSUE_DOCUMENTATION_URL
        },
        repeatedInserts: {
          icon: SQLDatabaseIcon,
          label: "Repeated inserts"
        }
      }
    },
    [InsightType.SpaNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: "Repeated query",
      subTypes: {
        repeatedQueries: {
          icon: SQLDatabaseIcon,
          label: "Suspected N+1",
          description: descriptionProvider.NPlusOneDescription,
          documentationLink: SUSPECTED_N_PLUS_ONE_ISSUE_DOCUMENTATION_URL
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
      description: descriptionProvider.BottleneckDescription,
      documentationLink: BOTTLENECK_ISSUE_DOCUMENTATION_URL
    },
    [InsightType.SpanScaling]: {
      icon: ScalesIcon,
      label: "Scaling Issue Found",
      description: descriptionProvider.SpanScalingDescription,
      documentationLink: SCALING_ISSUE_DOCUMENTATION_URL
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
      description: descriptionProvider.EndpointSessionInViewDescription,
      documentationLink: SESSION_IN_VIEW_DOCUMENTATION_URL
    },
    [InsightType.EndpointChattyApiV2]: {
      icon: SoundWaveIcon,
      label: "Excessive API Calls Detected",
      description: descriptionProvider.ChattyApiDescription,
      documentationLink: CHATTY_API_ISSUE_DOCUMENTATION_URL
    },
    [InsightType.EndpointHighNumberOfQueries]: {
      icon: SQLDatabaseIcon,
      label: "High number of queries",
      description: descriptionProvider.EndpointHighNumberOfQueriesDescription,
      documentationLink: HIGH_NUMBER_OF_QUERIES_DOCUMENTATION_URL
    },
    [InsightType.SpanNexus]: {
      icon: BottleneckIcon,
      label: "Code Nexus Point",
      description: descriptionProvider.CodeNexusDescription,
      documentationLink: CODE_NEXUS_DOCUMENTATION_URL
    },
    [InsightType.SpanQueryOptimization]: {
      icon: SQLDatabaseIcon,
      label: "Inefficient Query",
      description: descriptionProvider.QueryOptimizationDescription,
      documentationLink: QUERY_OPTIMIZATION_ISSUES_DOCUMENTATION_URL
    },
    [InsightType.EndpointQueryOptimizationV2]: {
      icon: SQLDatabaseIcon,
      label: "Inefficient Query",
      description: descriptionProvider.QueryOptimizationDescription,
      documentationLink: QUERY_OPTIMIZATION_ISSUES_DOCUMENTATION_URL
    },
    [InsightType.SpanPerformanceAnomaly]: {
      icon: PulseIcon,
      label: "Performance Anomaly"
    }
  };

  const insightTypeInfo = insightTypeInfoMap[type];

  if (subType && insightTypeInfo.subTypes?.[subType]) {
    return insightTypeInfo.subTypes[subType];
  }

  return insightTypeInfo;
};
