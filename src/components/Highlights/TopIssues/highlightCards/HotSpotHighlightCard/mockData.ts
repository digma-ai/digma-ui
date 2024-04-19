import { InsightStatus, InsightType } from "../../../../Insights/types";
import { HighlightData, HotSpotMetrics } from "../../types";

export const mockedHotSpotMetrics: HotSpotMetrics = [
  {
    id: "Score",
    value: 75
  }
];

export const mockedHotSpotHighlightData: HighlightData<HotSpotMetrics> = {
  insightType: InsightType.HotSpot,
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
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentId: "2",
      environmentName: "Staging",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentId: "3",
      environmentName: "Production",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentId: "4",
      environmentName: "Env1",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentId: "5",
      environmentName: "Env2",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentId: "6",
      environmentName: "Env3",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    }
  ]
};
