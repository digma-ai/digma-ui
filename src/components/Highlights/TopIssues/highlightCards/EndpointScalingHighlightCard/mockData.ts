import type {
  EndpointScalingMetrics,
  HighlightData
} from "../../../../../redux/services/types";
import { InsightType } from "../../../../../types";
import { InsightStatus } from "../../../../Insights/types";

export const mockedEndpointScalingMetrics: EndpointScalingMetrics = [
  {
    id: "IncreasePercentage",
    value: 50
  }
];

export const mockedEndpointScalingHighlightData: HighlightData<EndpointScalingMetrics> =
  {
    insightType: InsightType.EndpointScaling,
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
        metrics: mockedEndpointScalingMetrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointScalingMetrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointScalingMetrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointScalingMetrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointScalingMetrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointScalingMetrics
      }
    ]
  };
