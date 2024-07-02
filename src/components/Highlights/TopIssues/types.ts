import { Duration } from "../../../globals";
import { SpanInfo } from "../../../types";
import { InsightStatus, InsightType } from "../../Insights/types";

export interface EnvironmentData<T> {
  environmentId: string;
  environmentName: string;
  insightStatus: InsightStatus;
  insightCriticality: number;
  metrics: T;
}

export interface HighlightData<T> {
  insightType: InsightType;
  asset: SpanInfo | null;
  environments: EnvironmentData<T>[];
}

export type EndpointBottleneckMetrics = [
  {
    id: "PercentageWhenBottleneck";
    value: number;
  },
  {
    id: "RequestPercentage";
    value: number;
  },
  {
    id: "DurationWhenBottleneck";
    value: Duration;
  }
];

export type SpanEndpointBottleneckMetrics = [
  {
    id: "AffectedEndpoints";
    value: number;
  },
  { id: "RequestPercentage"; value: number },
  { id: "DurationWhenBottleneck"; value: Duration }
];

export type EndpointChattyApiV2Metrics = [
  {
    id: "Repeats";
    value: number;
  }
];

export type EndpointHighNumberOfQueriesMetrics = [
  {
    id: "QueriesCount";
    value: number;
  },
  {
    id: "TypicalQueriesCount";
    value: number;
  }
];

export type EndpointQueryOptimizationV2Metrics = [
  {
    id: "Duration";
    value: Duration;
  }
];

export type SpanQueryOptimizationMetrics = [
  {
    id: "AffectedEndpoints";
    value: number;
  },
  {
    id: "Duration";
    value: Duration;
  },
  {
    id: "TypicalDuration";
    value: Duration;
  },
  {
    id: "Database";
    value: string;
  }
];

export type EndpointSessionInViewMetrics = [];

export type EndpointSlowdownSourceMetrics = [
  {
    id: "DifferenceDelta";
    value: Duration;
  }
];

export type EndpointSpanNPlusOneMetrics = [
  {
    id: "Repeats";
    value: number;
  },
  {
    id: "RequestPercentage";
    value: number;
  },
  {
    id: "Duration";
    value: Duration;
  }
];

export type SpaNPlusOneMetrics = [
  {
    id: "AffectedEndpoints";
    value: number;
  },
  {
    id: "Repeats";
    value: number;
  },
  {
    id: "RequestPercentage";
    value: number;
  },
  {
    id: "Duration";
    value: Duration;
  }
];

export type HotSpotMetrics = [
  {
    id: "Score";
    value: number;
  }
];

export type SpanScalingMetrics = [
  {
    id: "IncreasePercentage";
    value: number;
  }
];

export type GenericMetrics =
  | EndpointBottleneckMetrics
  | SpanEndpointBottleneckMetrics
  | EndpointChattyApiV2Metrics
  | EndpointHighNumberOfQueriesMetrics
  | EndpointQueryOptimizationV2Metrics
  | SpanQueryOptimizationMetrics
  | EndpointSessionInViewMetrics
  | EndpointSlowdownSourceMetrics
  | EndpointSpanNPlusOneMetrics
  | SpaNPlusOneMetrics
  | HotSpotMetrics
  | SpanScalingMetrics;

export interface TopIssuesData {
  topInsights: HighlightData<GenericMetrics>[];
}
