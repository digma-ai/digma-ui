import type {
  EndpointSlowdownSourceMetrics,
  HighlightData
} from "../../../../../redux/services/types";
import { InsightStatus, InsightType } from "../../../../Insights/types";

export const mockedEndpointSlowdownSourceHighlight: EndpointSlowdownSourceMetrics =
  [
    {
      id: "DifferenceDelta",
      value: {
        value: 22.71,
        unit: "ms",
        raw: 22705900.0
      }
    }
  ];

export const mockedEndpointSlowdownSourceHighlightData: HighlightData<EndpointSlowdownSourceMetrics> =
  {
    insightType: InsightType.EndpointSlowdownSource,
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
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      }
    ]
  };
