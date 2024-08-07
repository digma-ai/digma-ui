import { useEffect } from "react";
import { useGlobalStore } from "../../../../containers/Main/stores/useGlobalStore";
import { useInsightsStore } from "../../../../containers/Main/stores/useInsightsStore";
import { usePrevious } from "../../../../hooks/usePrevious";
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
  const filters = useInsightsStore.use.filters();
  const setFilters = useInsightsStore.use.setFilters();
  const environment = useGlobalStore.use.environment();
  const environmentId = environment?.id;
  const previousEnvironmentId = usePrevious(environmentId);
  const scope = useGlobalStore.use.scope();
  const previousScope = usePrevious(scope);
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScopeSpanCodeObjectId = previousScope?.span?.spanCodeObjectId;

  useEffect(() => {
    if (
      Boolean(
        previousEnvironmentId && previousEnvironmentId !== environmentId
      ) ||
      (previousScope && previousScopeSpanCodeObjectId !== scopeSpanCodeObjectId)
    ) {
      setFilters([]);
    }
  }, [
    previousEnvironmentId,
    environmentId,
    previousScope,
    setFilters,
    scopeSpanCodeObjectId,
    previousScopeSpanCodeObjectId
  ]);

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
