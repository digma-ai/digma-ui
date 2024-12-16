import { InsightStatus, InsightType } from "../../../../Insights/types";
import type { EndpointChattyApiV2Metrics, HighlightData } from "../../types";

export const mockedEndpointChattyApiV2Metrics: EndpointChattyApiV2Metrics = [
  {
    id: "Repeats",
    value: 50
  }
];

export const mockedEndpointChattyApiV2HighlightData: HighlightData<EndpointChattyApiV2Metrics> =
  {
    insightType: InsightType.EndpointChattyApiV2,
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
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      }
    ]
  };
