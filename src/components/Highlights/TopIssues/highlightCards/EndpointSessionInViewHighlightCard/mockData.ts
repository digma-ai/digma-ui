import { InsightStatus, InsightType } from "../../../../Insights/types";
import { EndpointSessionInViewMetrics, HighlightData } from "../../types";

export const mockedEndpointSessionInViewMetrics: EndpointSessionInViewMetrics =
  [];

export const mockedEndpointSessionInViewHighlightData: HighlightData<EndpointSessionInViewMetrics> =
  {
    insightType: InsightType.EndpointSessionInView,
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
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      }
    ]
  };
