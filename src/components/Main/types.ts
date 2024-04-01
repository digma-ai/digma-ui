export type View = "highlights" | "insights" | "assets" | "analytics" | "tests";

export interface GetHighlightsTopIssuesDataPayload {
  query: {
    scopedCodeObjectId: string | null;
    environments: string[];
  };
}
