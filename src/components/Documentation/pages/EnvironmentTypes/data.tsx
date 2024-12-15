import { CloudDownloadIcon } from "../../../common/icons/CloudDownloadIcon";
import { CodeDisplayIcon } from "../../../common/icons/CodeDisplayIcon";
import { InfiniteLoopIcon } from "../../../common/icons/InfiniteLoopIcon";
import { InsightCardType } from "./InsightCard/types";
import type { EnvironmentTypeData } from "./types";

export const environmentTypesData: EnvironmentTypeData[] = [
  {
    id: "dev",
    icon: CodeDisplayIcon,
    name: "Local Environments / Any",
    description:
      "Local environment uses observability collected from your local machine. This information can be automatically collected when your run or debug your code in the IDE or run tests.",
    status: "active",
    insights: [
      { type: InsightCardType.TRACING_DATA },
      { type: InsightCardType.QUERY_ISSUES },
      { type: InsightCardType.BOTTLENECKS },
      { type: InsightCardType.ERRORS }
    ]
  },
  {
    id: "ci-testing",
    icon: InfiniteLoopIcon,
    name: "CI/Testing Environment",
    description:
      "Collect information from your CI build to monitor releases over time.",
    status: "active",
    insights: [
      { type: InsightCardType.SCALING_ISSUES_CI },
      { type: InsightCardType.SLOWDOWN_PERF_IMPROVEMENTS },
      { type: InsightCardType.SLOWDOWN_ROOT_CAUSE_DETECTION },
      { type: InsightCardType.USAGE_ANALYSIS }
    ]
  },
  {
    id: "production",
    icon: CloudDownloadIcon,
    name: "Production Environment",
    description:
      "Digma can ingest data from your production to provide real world data about your code and issues currently in the wild.",
    status: "active",
    insights: [
      { type: InsightCardType.PERFORMANCE_IMPACT },
      { type: InsightCardType.ERROR_HOTSPOTS },
      { type: InsightCardType.CONCURRENCY_AND_COST_OPTIMIZATION },
      { type: InsightCardType.SCALING_ISSUES_PRODUCTION },
      { type: InsightCardType.USAGE_ANALYSIS },
      { type: InsightCardType.CHATTY_MICROSERVICES }
    ]
  }
];
