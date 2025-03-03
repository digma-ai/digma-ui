import type {
  HighlightData,
  SpaNPlusOneMetrics
} from "../../../../../redux/services/types";
import { InsightStatus, InsightType } from "../../../../Insights/types";

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
        environmentId: "1",
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpaNPlusOneInsights
      }
    ]
  };
