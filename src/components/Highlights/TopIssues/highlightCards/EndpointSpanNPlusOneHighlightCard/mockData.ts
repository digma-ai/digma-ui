import type {
  EndpointSpanNPlusOneMetrics,
  HighlightData
} from "../../../../../redux/services/types";
import { InsightType } from "../../../../../types";
import { InsightStatus } from "../../../../Insights/types";

export const mockedEndpointSpanNPlusOneMetrics: EndpointSpanNPlusOneMetrics = [
  { id: "Repeats", value: 50 },
  {
    id: "RequestPercentage",
    value: 50
  },
  {
    id: "Duration",
    value: {
      value: 22.71,
      unit: "ms",
      raw: 22705900.0
    }
  }
];

export const mockedEndpointSpanNPlusOneHighlightData: HighlightData<EndpointSpanNPlusOneMetrics> =
  {
    insightType: InsightType.EndpointSpanNPlusOne,
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
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      }
    ]
  };
