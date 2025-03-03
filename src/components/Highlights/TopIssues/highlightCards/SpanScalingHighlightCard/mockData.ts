import type {
  HighlightData,
  SpanScalingMetrics
} from "../../../../../redux/services/types";
import { InsightStatus, InsightType } from "../../../../Insights/types";

export const mockedSpanScalingMetrics: SpanScalingMetrics = [
  {
    id: "IncreasePercentage",
    value: 50
  }
];

export const mockedSpanScalingHighlightData: HighlightData<SpanScalingMetrics> =
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
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanScalingMetrics
      }
    ]
  };
