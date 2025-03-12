import type {
  HighlightData,
  SpanEndpointBottleneckMetrics
} from "../../../../../redux/services/types";
import { InsightType } from "../../../../../types";
import { InsightStatus } from "../../../../Insights/types";

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
        environmentId: "1",
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedSpanEndpointBottleneckMetrics
      }
    ]
  };
