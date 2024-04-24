import { ImpactData } from "./types";

export const mockedImpactData: ImpactData = {
  impactHighlights: [
    {
      environmentName: "Production",
      environmentId: "1",
      rank: 1,
      rankCriticality: 0.9,
      impact: 0.8
    },
    {
      environmentName: "Staging",
      environmentId: "2",
      rank: 2,
      rankCriticality: 0.4,
      impact: 0.4
    },
    {
      environmentName: "Development",
      environmentId: "3",
      rank: 3,
      rankCriticality: 0.1,
      impact: 0.2
    }
  ]
};
