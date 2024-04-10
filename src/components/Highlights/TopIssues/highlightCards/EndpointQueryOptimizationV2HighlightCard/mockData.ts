import { InsightStatus, InsightType } from "../../../../Insights/types";
import { EndpointQueryOptimizationV2Metrics, HighlightData } from "../../types";

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
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointQueryOptimizationV2Metrics
      }
    ]
  };
