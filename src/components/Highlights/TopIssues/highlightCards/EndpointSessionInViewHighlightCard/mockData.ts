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
        environmentId: "1",
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointSessionInViewMetrics
      }
    ]
  };
