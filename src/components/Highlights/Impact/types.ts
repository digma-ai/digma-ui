export interface EnvironmentImpactData {
  environmentName: string;
  environmentId: string;
  rank: number;
  rankNormalized: number;
  impact: number;
}

export interface ImpactData {
  impactHighlights: EnvironmentImpactData[];
}

export interface GetHighlightsImpactDataPayload {
  query: {
    scopedSpanCodeObjectId: string | null;
    environments: string[];
  };
}
