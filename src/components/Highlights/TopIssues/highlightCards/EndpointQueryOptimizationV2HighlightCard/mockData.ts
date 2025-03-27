import type {
  EndpointQueryOptimizationV2Metrics,
  HighlightData
} from "../../../../../redux/services/types";
import { InsightType } from "../../../../../types";
import { InsightStatus } from "../../../../Insights/types";

export const mockedEndpointQueryOptimizationV2Metrics: EndpointQueryOptimizationV2Metrics =
  [
    {
      id: "Duration",
      value: {
        value: 22.71,
        unit: "ms",
        raw: 22705900.0
      }
    }
  ];

export const mockedEndpointQueryHighLightData: HighlightData<EndpointQueryOptimizationV2Metrics> =
  {
    insightType: InsightType.EndpointQueryOptimizationV2,
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
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      }
    ]
  };
