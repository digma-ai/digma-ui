import { DiscoveredCard } from "../DiscoveredCard";
import type { DiscoveredIssuesProps } from "./types";

export const DiscoveredIssues = ({
  statistics = {
    activeCount: 0,
    criticalCount: 0,
    fixedCount: 0,
    regressionCount: 0,
    totalCount: 0
  }
}: DiscoveredIssuesProps) => {
  return (
    <DiscoveredCard
      title={"Discovered Issues"}
      options={[
        [
          {
            title: "All Issues",
            counter: statistics.totalCount,
            type: "default"
          },
          {
            title: "Critical issues",
            counter: statistics.criticalCount,
            type: "high"
          },
          {
            title: "Active",
            counter: statistics.activeCount,
            type: "low"
          }
        ],
        [
          {
            title: "Regression",
            counter: statistics.regressionCount,
            type: "medium"
          },
          {
            title: "Fixed",
            counter: statistics.fixedCount,
            type: "success"
          }
        ]
      ]}
    />
  );
};
