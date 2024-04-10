import { InsightStatus, InsightType } from "../../../../Insights/types";
import { HighlightData, SpanEndpointBottleneckMetrics } from "../../types";

export const mockedSpanEndpointBottleneckMetrics: SpanEndpointBottleneckMetrics =
  [
    { id: "AffectedEndpoints", value: 50 },
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

export const mockedSpanEndpointBottleneckHighlightData: HighlightData<SpanEndpointBottleneckMetrics> =
  {
    insightType: InsightType.SpanEndpointBottleneck,
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
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      }
    ]
  };
