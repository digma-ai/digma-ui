import { useState } from "react";
import { InsightFilterType } from "../types";
import * as s from "./styles";
import { InsightStatsProps } from "./types";

export const InsightStats = ({
  onChange,
  criticalCount,
  allIssuesCount,
  unreadCount
}: InsightStatsProps) => {
  const [selectedFilters, setSelectedFilters] = useState<InsightFilterType[]>(
    []
  );

  const handleSelectionChange = (selectedFilter: InsightFilterType) => {
    const selection = [...selectedFilters];
    const indexOfSelected = selectedFilters.indexOf(selectedFilter);

    if (indexOfSelected !== -1) {
      selection.splice(indexOfSelected, 1);
    } else {
      selection.push(selectedFilter);
    }
    setSelectedFilters(selection);
    onChange(selection);
  };

  return (
    <s.Stats>
      <s.CriticalStat
        disabled={
          criticalCount === 0 && !selectedFilters.includes("criticality")
        }
        $selected={selectedFilters.includes("criticality")}
        onClick={() => handleSelectionChange("criticality")}
      >
        <s.StatCounter>{criticalCount}</s.StatCounter>
        <s.StatDescription>Critical issues</s.StatDescription>
      </s.CriticalStat>
      <s.UnreadStat
        disabled={unreadCount === 0 && !selectedFilters.includes("unread")}
        $selected={selectedFilters.includes("unread")}
        onClick={() => handleSelectionChange("unread")}
      >
        <s.StatCounter>{unreadCount}</s.StatCounter>
        <s.StatDescription>Unread issues</s.StatDescription>
      </s.UnreadStat>
      <s.Stat>
        <s.StatCounter>{allIssuesCount}</s.StatCounter>
        <s.StatDescription>All issues</s.StatDescription>
      </s.Stat>
    </s.Stats>
  );
};
