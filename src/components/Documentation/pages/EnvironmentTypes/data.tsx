import { InfiniteLoopIcon } from "../../../common/icons/InfiniteLoopIcon";
import { InsightCardType } from "./EnvironmentTypeCard/InsightCard/types";
import { EnvironmentTypeData } from "./types";

export const environmentTypesData: EnvironmentTypeData[] = [
  {
    id: "dev",
    icon: <InfiniteLoopIcon height={24} />,
    name: "Dev Environment",
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
    icon: <InfiniteLoopIcon height={24} />,
    name: "CI/Testing Environment",
    description:
      "Download them to a relative path to the Docker Compose file you are running",
    status: "waiting-for-data",
    insights: [
      { type: InsightCardType.SCALING_ISSUES },
      { type: InsightCardType.SLOWDOWN_PERF_IMPROVEMENTS },
      { type: InsightCardType.SLOWDOWN_ROOT_CAUSE_DETECTION },
      { type: InsightCardType.TRACING_DATA },
      { type: InsightCardType.QUERY_ISSUES },
      { type: InsightCardType.BOTTLENECKS },
      { type: InsightCardType.ERRORS }
    ]
  },
  {
    id: "production",
    icon: <InfiniteLoopIcon height={24} />,
    name: "Production",
    description:
      "Download them to a relative path to the Docker Compose file you are running",
    insights: [
      { type: InsightCardType.PERFORMANCE_IMPACT },
      { type: InsightCardType.USAGE_ANALYSIS },
      { type: InsightCardType.SCALING_ISSUES },
      { type: InsightCardType.ERROR_HOTSPOTS },
      { type: InsightCardType.TOO_MANY_HTTP_CALLS },
      { type: InsightCardType.TRACING_DATA },
      { type: InsightCardType.QUERY_ISSUES },
      { type: InsightCardType.BOTTLENECKS },
      { type: InsightCardType.ERRORS }
    ]
  }
];
