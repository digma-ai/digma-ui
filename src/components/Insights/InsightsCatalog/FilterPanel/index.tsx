import { useInsightsStore } from "../../../../containers/Main/stores/insights/useInsightsStore";
import { useStore } from "../../../../containers/Main/stores/useStore";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { InsightFilterType } from "../types";
import { FilterChip } from "./FilterChip";
import * as s from "./styles";
import { FilterPanelProps } from "./types";

export const FilterPanel = ({
  criticalCount,
  allIssuesCount,
  unreadCount
}: FilterPanelProps) => {
  const filters = useInsightsStore().filters;
  const setFilters = useStore.use.setFilters();

  const handleFilterChipClick = (selectedFilter?: InsightFilterType) => {
    const newFilters = new Set(filters);

    if (selectedFilter) {
      if (newFilters.has(selectedFilter)) {
        newFilters.delete(selectedFilter);
      } else {
        newFilters.add(selectedFilter);
      }
    } else {
      newFilters.clear();
    }

    const selection = Array.from(newFilters);

    sendUserActionTrackingEvent("issues filter changed", { selection });
    setFilters(selection);
  };

  const isCriticalSelected = filters.includes("criticality");
  const isUnreadSelected = filters.includes("unread");

  return (
    <s.Stats>
      <FilterChip
        disabled={!criticalCount && !isCriticalSelected}
        selected={isCriticalSelected}
        onClick={() => handleFilterChipClick("criticality")}
        count={criticalCount}
        type={"critical"}
      />
      <FilterChip
        disabled={!unreadCount && !isUnreadSelected}
        selected={filters.includes("unread")}
        onClick={() => handleFilterChipClick("unread")}
        count={unreadCount}
        type={"unread"}
      />
      <FilterChip
        selected={filters.length === 0}
        onClick={() => handleFilterChipClick()}
        count={allIssuesCount}
        type={"all"}
      />
    </s.Stats>
  );
};
