import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Tooltip } from "../../../common/v3/Tooltip";
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

    sendUserActionTrackingEvent(`issues filter changed`, { selection });
    setSelectedFilters(selection);
    onChange(selection);
  };

  return (
    <s.Stats>
      <s.CriticalStat
        disabled={!criticalCount && !selectedFilters.includes("criticality")}
        $selected={selectedFilters.includes("criticality")}
        onClick={() => handleSelectionChange("criticality")}
      >
        {criticalCount ? (
          <s.StatCounter>{criticalCount}</s.StatCounter>
        ) : (
          <NotAssignedValue />
        )}
        <s.StatDescription>Critical issues</s.StatDescription>
      </s.CriticalStat>
      <s.UnreadStat
        disabled={!unreadCount && !selectedFilters.includes("unread")}
        $selected={selectedFilters.includes("unread")}
        onClick={() => handleSelectionChange("unread")}
      >
        <s.StatCounter>{unreadCount}</s.StatCounter>
        <s.StatDescription>Unread issues</s.StatDescription>
      </s.UnreadStat>
      <s.Stat>
        {allIssuesCount ? (
          <s.StatCounter>{allIssuesCount}</s.StatCounter>
        ) : (
          <NotAssignedValue />
        )}
        <s.StatDescription>All issues</s.StatDescription>
      </s.Stat>
    </s.Stats>
  );
};

const NotAssignedValue = () => (
  <Tooltip title="To see more statistics, please update digma backend to the latest version">
    <s.StatCounter>N/A</s.StatCounter>
  </Tooltip>
);
