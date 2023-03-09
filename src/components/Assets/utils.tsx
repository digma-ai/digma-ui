import { MemoExoticComponent } from "react";
import { DefaultTheme } from "styled-components";
import { BottleneckIcon } from "../common/icons/BottleneckIcon";
import { CodeMarkerPinIcon } from "../common/icons/CodeMarkerPinIcon";
import { DatabaseIcon } from "../common/icons/DatabaseIcon";
import { EndpointIcon } from "../common/icons/EndpointIcon";
import { HTTPClientIcon } from "../common/icons/HTTPClientIcon";
import { MeterHighIcon } from "../common/icons/MeterHighIcon";
import { MeterLowIcon } from "../common/icons/MeterLowIcon";
import { ScalesIcon } from "../common/icons/ScalesIcon";
import { SnailIcon } from "../common/icons/SnailIcon";
import { SpotIcon } from "../common/icons/SpotIcon";
import { SQLDatabaseIcon } from "../common/icons/SQLDatabaseIcon";
import { IconProps } from "../common/icons/types";
import { UserIcon } from "../common/icons/UserIcon";
import { WarningCircleIcon } from "../common/icons/WarningCircleIcon";
import { Insight, INSIGHT_TYPES } from "./types";

export const getInsightInfo = (
  type: string
):
  | {
      icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
      label: string;
    }
  | undefined => {
  const insightInfoMap: Record<
    string,
    {
      icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
      label: string;
    }
  > = {
    [INSIGHT_TYPES.Errors]: {
      icon: WarningCircleIcon,
      label: "Errors"
    },
    [INSIGHT_TYPES.HotSpot]: {
      icon: SpotIcon,
      label: "Error Hotspot"
    },
    [INSIGHT_TYPES.SlowEndpoint]: {
      icon: SnailIcon,
      label: "Slow Endpoint"
    },
    [INSIGHT_TYPES.LowUsage]: {
      icon: MeterLowIcon,
      label: "Endpoint Low Traffic"
    },
    [INSIGHT_TYPES.HighUsage]: {
      icon: MeterHighIcon,

      label: "Endpoint High Traffic"
    },
    [INSIGHT_TYPES.SlowestSpans]: {
      icon: BottleneckIcon,
      label: "Span Bottleneck"
    },
    [INSIGHT_TYPES.EndpointSpaNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: "Suspected N-Plus-1"
    },
    [INSIGHT_TYPES.SpaNPlusOne]: {
      icon: SQLDatabaseIcon,
      label: "Suspected N-Plus-1"
    },
    [INSIGHT_TYPES.SpanEndpointBottleneck]: {
      icon: BottleneckIcon,
      label: "Bottleneck"
    },
    [INSIGHT_TYPES.SpanScaling]: {
      icon: ScalesIcon,
      label: "Scaling Issue Found"
    },
    [INSIGHT_TYPES.SpanScalingRootCause]: {
      icon: ScalesIcon,
      label: "Scaling Issue Root Cause Found"
    }
  };

  return insightInfoMap[type];
};

const getImportanceColor = (
  importance: number,
  theme: DefaultTheme
): string => {
  if (importance < 3) {
    return theme.mode === "light" ? "#f93967" : "#e00036";
  }
  if (importance < 5) {
    return theme.mode === "light" ? "#e06c00" : "#ff810d";
  }
  if (importance > 7) {
    return theme.mode === "light" ? "#e8b500" : "#ffcb14";
  }

  return theme.mode === "light" ? "#1dc693" : "#67d28b";
};

export const getInsightIcon = (
  insight: Insight,
  theme: DefaultTheme,
  size?: number
): JSX.Element => {
  const insightInfo = getInsightInfo(insight.type);
  const color = getImportanceColor(insight.importance, theme);
  return insightInfo ? <insightInfo.icon color={color} size={size} /> : <></>;
};

export const getAssetTypeInfo = (
  assetTypeId: string
):
  | {
      label: string;
      icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
    }
  | undefined => {
  const assetTypeInfoMap: Record<
    string,
    {
      label: string;
      icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
    }
  > = {
    Endpoint: {
      label: "Endpoints",
      icon: EndpointIcon
    },
    EndpointClient: {
      label: "HTTP Clients",
      icon: HTTPClientIcon
    },
    Consumer: {
      label: "Consumers",
      icon: UserIcon
    },
    DatabaseQueries: {
      label: "Database queries",
      icon: DatabaseIcon
    },
    CodeLocation: {
      label: "Code locations",
      icon: CodeMarkerPinIcon
    },
    Other: {
      label: "Other"
    }
  };

  return assetTypeInfoMap[assetTypeId];
};
