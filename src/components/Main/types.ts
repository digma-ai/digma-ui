export type View = "highlights" | "insights" | "assets" | "analytics" | "tests";

export interface GetHighlightsTopIssuesDataPayload {
  query: {
    spanCodeObjectId: string | null;
  };
}
