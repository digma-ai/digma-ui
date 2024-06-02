import { PercentileKey } from "./types";

export const SLACK_WORKSPACE_URL =
  "https://join.slack.com/t/continuous-feedback/shared_invite/zt-2gsif7wdy-6Jf17HIJESc2tknT5gybtw";

export const GETTING_STARTED_VIDEO_URL =
  "https://www.youtube.com/watch?v=iXUeazxCVvU";

export const INSTALL_DIGMA_IN_ORGANIZATION_DOCUMENTATION_URL =
  "https://digma.ai/installing-digma-in-your-organization/";

export const SETUP_PLUGIN_TO_ORGANIZATION_DIGMA_URL =
  "https://digma.ai/installing-digma-in-your-organization/#Connecting";

export const CENTRAL_ON_PREM_INSTALLATION_GUIDE_URL =
  "https://docs.digma.ai/digma-developer-guide/installation/central-on-prem-install";

export const INSTRUMENTATION_DOCUMENTATION_URL =
  "https://docs.digma.ai/digma-developer-guide/instrumentation/spring-spring-boot-dropwizard-and-default/instrumenting-your-code-in-ci-staging-or-the-terminal";

export const PERFORMANCE_IMPACT_DOCUMENTATION_URL =
  "https://docs.digma.ai/digma-developer-guide/use-cases-wip/prioritize-technical-debt#asset-performance-impact";

export const SCALING_ISSUE_DOCUMENTATION_URL =
  "https://docs.digma.ai/digma-developer-guide/digma-features/insights/scaling-issue";

export const TEST_OBSERVABILITY_DOCUMENTATION_URL =
  "https://docs.digma.ai/digma-developer-guide/digma-features/test-observability";

export const PERCENTILES: {
  label: string;
  percentile: number;
  key: PercentileKey;
}[] = [
  { label: "Median", percentile: 0.5, key: "p50" },
  { label: "Slowest 5%", percentile: 0.95, key: "p95" }
];

export const ROUTES = {
  HIGHLIGHTS: "/highlights",
  INSIGHTS: "/insights",
  ASSETS: "/assets",
  ANALYTICS: "/analytics",
  ERRORS: "/errors",
  TESTS: "/tests"
};
