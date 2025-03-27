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
      { type: InsightCardType.TracingData },
      { type: InsightCardType.QueryIssues },
      { type: InsightCardType.Bottlenecks },
      { type: InsightCardType.Errors }
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
      { type: InsightCardType.ScalingIssuesCI },
      { type: InsightCardType.SlowdownPerfImprovements },
      { type: InsightCardType.SlowdownRootCauseDetection },
      { type: InsightCardType.UsageAnalysis }
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
      { type: InsightCardType.PerformanceImpact },
      { type: InsightCardType.ErrorHotSpots },
      { type: InsightCardType.ConcurrencyAndCostOptimization },
      { type: InsightCardType.ScalingIssuesProduction },
      { type: InsightCardType.UsageAnalysis },
      { type: InsightCardType.ChattyMicroservices }
    ]
  }
];
