import { InsightStatus, InsightType } from "../../../../Insights/types";
import { EndpointChattyApiV2Metrics, HighlightData } from "../../types";

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
      kind: "kind",
      codeObjectId: null
    },
    environment: [
      {
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointChattyApiV2Metrics
      }
    ]
  };
