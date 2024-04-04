export type View =
  | "highlights"
  | "insights"
  | "assets"
  | "analytics"
  | "errors"
  | "errorsDetails"
  | "tests";

export interface GetHighlightsTopIssuesDataPayload {
  query: {
    scopedCodeObjectId: string | null;
    environments: string[];
  };
}
