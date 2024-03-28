import { InsightStatus, InsightType } from "../../../../Insights/types";
import { EndpointSpanNPlusOneMetrics, HighlightData } from "../../types";

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
    insightType: InsightType.EndpointSpanNPlusOneV2,
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
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSpanNPlusOneMetrics
      }
    ]
  };
