import { InsightStatus, InsightType } from "../../../../Insights/types";
import type {
  EndpointHighNumberOfQueriesMetrics,
  HighlightData
} from "../../types";

export const mockedEndpointHighNumberOfQueriesMetrics: EndpointHighNumberOfQueriesMetrics =
  [
    {
      id: "QueriesCount",
      value: 50
    },
    {
      id: "TypicalQueriesCount",
      value: 10
    }
  ];

export const mockedEndpointHighNumberOfQueriesHighlightData: HighlightData<EndpointHighNumberOfQueriesMetrics> =
  {
    insightType: InsightType.EndpointHighNumberOfQueries,
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
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentId: "2",
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentId: "3",
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentId: "4",
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentId: "5",
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentId: "6",
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        insightCriticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      }
    ]
  };
