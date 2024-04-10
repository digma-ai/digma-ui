import { InsightStatus, InsightType } from "../../../../Insights/types";
import { HighlightData, SpaNPlusOneMetrics } from "../../types";

export const mockedSpaNPlusOneInsights: SpaNPlusOneMetrics = [
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

export const mockedSpaNPlusOneHighlightData: HighlightData<SpaNPlusOneMetrics> =
  {
    insightType: InsightType.SpaNPlusOne,
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
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      }
    ]
  };
