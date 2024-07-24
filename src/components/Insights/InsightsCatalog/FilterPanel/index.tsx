import { useEffect, useMemo } from "react";
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
  const scopeSpanCodeObjectId = useMemo(
    () => scope?.span?.spanCodeObjectId,
    [scope]
  );
  const previousScopeSpanCodeObjectId = usePrevious(scopeSpanCodeObjectId);

  useEffect(() => {
    if (
      previousEnvironmentId !== environmentId ||
      previousScopeSpanCodeObjectId !== scopeSpanCodeObjectId
    ) {
      setFilters([]);
    }
  }, [
    previousEnvironmentId,
    environmentId,
    previousScopeSpanCodeObjectId,
    scopeSpanCodeObjectId,
    setFilters
  ]);

  const handleSelectionChange = (selectedFilter: InsightFilterType | null) => {
    const selection = selectedFilter ? [...filters] : [];

    if (selectedFilter) {
      const indexOfSelected = filters.indexOf(selectedFilter);
      if (indexOfSelected !== -1) {
        selection.splice(indexOfSelected, 1);
      } else {
        selection.push(selectedFilter);
      }
    }

    sendUserActionTrackingEvent(`issues filter changed`, { selection });
    setFilters(selection);
  };

  return (
    <s.Stats>
      <FilterChip
        disabled={!criticalCount}
        selected={filters.includes("criticality")}
        onClick={() => handleSelectionChange("criticality")}
        count={criticalCount}
        type={"critical"}
      />
      <FilterChip
        disabled={!unreadCount}
        selected={filters.includes("unread")}
        onClick={() => handleSelectionChange("unread")}
        count={unreadCount}
        type={"unread"}
      />
      <FilterChip
        selected={filters.length === 0}
        onClick={() => handleSelectionChange(null)}
        count={allIssuesCount}
        type={"all"}
      />
    </s.Stats>
  );
};
