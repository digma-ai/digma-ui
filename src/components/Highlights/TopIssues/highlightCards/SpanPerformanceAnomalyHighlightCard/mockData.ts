import type {
  HighlightData,
  SpanPerformanceAnomalyMetrics
} from "../../../../../redux/services/types";
import { InsightType } from "../../../../../types";
import { InsightStatus } from "../../../../Insights/types";

export const mockedSpanPerformanceAnomalyMetrics: SpanPerformanceAnomalyMetrics =
  [
    {
      id: "P50",
      value: {
        value: 22.71,
        unit: "ms",
        raw: 22705900.0
      }
    },
    {
      id: "P95",
      value: {
        value: 22.71,
        unit: "ms",
        raw: 22705900.0
      }
    },
    {
      id: "SlowerByPercentage",
      value: 50
    }
  ];

export const mockedSpanScalingHighlightData: HighlightData<SpanPerformanceAnomalyMetrics> =
  {
    insightType: InsightType.SpanScaling,
    asset: {
      name: "spanName",
      displayName: "displayName",
      instrumentationLibrary: "instrumentationLibrary",
      spanCodeObjectId: "spanCodeObjectId",
      methodCodeObjectId: "methodCodeObjectId",
      kind: "kind"
    },
    environments: [
      {
        environmentId: "1",
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanPerformanceAnomalyMetrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanPerformanceAnomalyMetrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanPerformanceAnomalyMetrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanPerformanceAnomalyMetrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanPerformanceAnomalyMetrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanPerformanceAnomalyMetrics
      }
    ]
  };
