import type {
  HighlightData,
  SpanQueryOptimizationMetrics
} from "../../../../../redux/services/types";
import { InsightType } from "../../../../../types";
import { InsightStatus } from "../../../../Insights/types";

export const mockedSpanQueryOptimizationMetrics: SpanQueryOptimizationMetrics =
  [
    { id: "AffectedEndpoints", value: 50 },
    {
      id: "Duration",
      value: {
        value: 22.71,
        unit: "ms",
        raw: 22705900.0
      }
    },
    {
      id: "TypicalDuration",
      value: {
        value: 22.71,
        unit: "ms",
        raw: 22705900.0
      }
    },
    {
      id: "Database",
      value: "databaseName"
    }
  ];

export const mockedSpanQueryOptimizationHighlightData: HighlightData<SpanQueryOptimizationMetrics> =
  {
    insightType: InsightType.EndpointBottleneck,
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
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      }
    ]
  };
