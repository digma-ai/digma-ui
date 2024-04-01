import { InsightStatus, InsightType } from "../../../../Insights/types";
import { EndpointBottleneckMetrics, HighlightData } from "../../types";

export const mockedEndpointBottleneckMetrics: EndpointBottleneckMetrics = [
  { id: "PercentageWhenBottleneck", value: 50 },
  {
    id: "RequestPercentage",
    value: 50
  },
  {
    id: "DurationWhenBottleneck",
    value: {
      value: 22.71,
      unit: "ms",
      raw: 22705900.0
    }
  }
];

export const mockedEndpointBottleneckHighlightData: HighlightData<EndpointBottleneckMetrics> =
  {
    insightType: InsightType.EndpointBottleneck,
    asset: {
      name: "spanName",
      displayName: "displayName",
      instrumentationLibrary: "instrumentationLibrary",
      spanCodeObjectId: "spanCodeObjectId",
      methodCodeObjectId: "methodCodeObjectId",
      kind: "kind",
      codeObjectId: null
    },
    environments: [
      {
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointBottleneckMetrics
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointBottleneckMetrics
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointBottleneckMetrics
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointBottleneckMetrics
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointBottleneckMetrics
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointBottleneckMetrics
      }
    ]
  };
