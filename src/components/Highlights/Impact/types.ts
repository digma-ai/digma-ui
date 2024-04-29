export type EnvironmentImpactData = {
  environmentName: string;
  environmentId: string;
  rank: number;
  rankNormalized: number;
  impact: number;
};

export type ImpactData = { impactHighlights: EnvironmentImpactData[] };

export interface GetHighlightsImpactDataPayload {
  query: {
    scopedSpanCodeObjectId: string | null;
    environments: string[];
  };
}
