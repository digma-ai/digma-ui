import { CloudDownloadIcon } from "../../../common/icons/CloudDownloadIcon";
import { CodeDisplayIcon } from "../../../common/icons/CodeDisplayIcon";
import { InfiniteLoopIcon } from "../../../common/icons/InfiniteLoopIcon";
import { InsightCardType } from "./EnvironmentTypeCard/InsightCard/types";
import { EnvironmentTypeData } from "./types";

export const environmentTypesData: EnvironmentTypeData[] = [
  {
    id: "dev",
    icon: CodeDisplayIcon,
    name: "Local and All Environments",
    description:
      "Download them to a relative path to the Docker Compose file you are running",
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
      "Download them to a relative path to the Docker Compose file you are running",
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
    name: "Production",
    description:
      "Download them to a relative path to the Docker Compose file you are running",
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
