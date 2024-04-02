import { InsightStatus, InsightType } from "../../../../Insights/types";
import { EndpointSlowdownSourceMetrics, HighlightData } from "../../types";

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
      kind: "kind",
      codeObjectId: null
    },
    environments: [
      {
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSlowdownSourceHighlight
      }
    ]
  };
