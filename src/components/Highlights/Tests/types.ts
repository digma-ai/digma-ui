export type TestsData = {
  tests: {
    totalCount: number;
    failedCount: number;
  };
};

export interface GetHighlightsTestsDataPayload {
  query: {
    scopedSpanCodeObjectId: string | null;
    // TODO: check if needed
    environments: string[];
  };
}
