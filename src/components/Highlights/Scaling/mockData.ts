import type { GetScalingHighlightsResponse } from "../../../redux/services/types";
import { InsightStatus } from "../../Insights/types";

export const mockedScalingData: GetScalingHighlightsResponse = {
  dataState: "ScalingBadly",
  scaling: [
    {
      environmentId: "1",
      environmentName: "Production",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: {
        concurrency: 100,
        duration: {
          value: 22.71,
          unit: "ms",
          raw: 22705900.0
        }
      }
    },
    {
      environmentId: "2",
      environmentName: "Staging",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: {
        concurrency: 50,
        duration: {
          value: 22.71,
          unit: "ms",
          raw: 22705900.0
        }
      }
    },
    {
      environmentId: "3",
      environmentName: "Development",
      insightStatus: InsightStatus.Active,
      criticality: 0.8,
      metrics: {
        concurrency: 20,
        duration: {
          value: 22.71,
          unit: "ms",
          raw: 22705900.0
        }
      }
    }
  ]
};
