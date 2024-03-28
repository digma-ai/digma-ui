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
    kind: "kind",
    codeObjectId: null
  },
  environment: [
    {
      environmentName: "Dev",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentName: "Staging",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentName: "Production",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentName: "Env1",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentName: "Env2",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    },
    {
      environmentName: "Env3",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: mockedHotSpotMetrics
    }
  ]
};
