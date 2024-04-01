import { InsightStatus, InsightType } from "../../../../Insights/types";
import { HighlightData, SpanScalingMetrics } from "../../types";

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
      kind: "kind",
      codeObjectId: null
    },
    environments: [
      {
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanScalingMetrics
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanScalingMetrics
      }
    ]
  };
