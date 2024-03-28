import { InsightStatus, InsightType } from "../../../../Insights/types";
import { HighlightData, SpanNPlusOneMetrics } from "../../types";

export const mockedSpanNPlusOneInsights: SpanNPlusOneMetrics = [
  { id: "AffectedEndpoints", value: 50 },
  {
    id: "Repeats",
    value: 50
  },
  { id: "RequestPercentage", value: 40 },
  {
    id: "Duration",
    value: {
      value: 22.71,
      unit: "ms",
      raw: 22705900.0
    }
  }
];

export const mockedSpanNPlusOneHighlightData: HighlightData<SpanNPlusOneMetrics> =
  {
    insightType: InsightType.SpanNPlusOne,
    asset: {
      name: "spanName",
      displayName: "displayName",
      instrumentationLibrary: "instrumentationLibrary",
      spanCodeObjectId: "spanCodeObjectId",
      methodCodeObjectId: "methodCodeObjectId",
      kind: "kind",
      codeObjectId: null
    },
    environment: [
      {
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanNPlusOneInsights
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanNPlusOneInsights
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanNPlusOneInsights
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanNPlusOneInsights
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanNPlusOneInsights
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanNPlusOneInsights
      }
    ]
  };
