import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./swagger.json",
  apiFile: "./src/redux/services/digmaEmpty.ts",
  apiImport: "digmaEmptyApi",
  outputFile: "digmaCodeGen.ts",
  exportName: "digmaCodeGenApi",
  endpointOverrides: [
    "postCodeAnalyticsErrorsCodeobjectSummary",
    "postCodeAnalyticsCodeObjectsRecentActivity",
    "postCodeAnalyticsCodeObjectsLens",
    "postCodeAnalyticsCodeobjectsStatus",
    "postCodeAnalyticsCodeObjectsSpanNavigation",
    "postCodeAnalyticsEventsLatest",
    "postCodeAnalyticsUserUsageStats",
    "postErrors",
    "postErrorsFilters",
    "postGraphsGraphForSpanScaling",
    "postGraphsGraphForSpanPercentiles",
    "postHighlightsPerformance",
    "postHighlightsTopInsights",
    "postInsightsGetMethodUsage",
    "postInsightsTypesForJaeger",
    "postInsightsIssues",
    "postHighlightsImpact",
    "postHighlightsScaling",
    "postLiveDataLiveData",
    "postReportsServicesIssues",
    "postReportsEndpointsIssues",
    "postTestingGetLatestTestsOfSpan"
  ].map((pattern) => ({
    pattern,
    type: "query"
  })),
  filterEndpoints: [
    /About/,
    /Agentic/,
    /AI/,
    /Assets/,
    /Authentication/,
    /CodeAnalytics/,
    /Dashboard/,
    /Diagnostic/,
    /Environments/,
    /Errors/,
    /Graphs/,
    /Highlights/,
    /Insights/,
    /InsightsActions/,
    /LiveData/,
    /Reports/,
    /Services/,
    /Spans/,
    /Testing/
  ],
  hooks: true
};

export default config;
