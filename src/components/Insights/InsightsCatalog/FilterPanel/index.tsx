import { useMemo } from "react";
import { getFeatureFlagValue } from "../../../../featureFlags";
import type { IssueCriticality } from "../../../../redux/services/types";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../../store/insights/useInsightsSelector";
import { useStore } from "../../../../store/useStore";
import { FeatureFlag } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import type { InsightFilterType } from "../types";
import { FilterChip } from "./FilterChip";
import * as s from "./styles";
import type { FilterPanelProps } from "./types";

export const FilterPanel = ({
  criticalCount,
  allIssuesCount,
  unreadCount
}: FilterPanelProps) => {
  const { backendInfo, scope } = useConfigSelector();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const {
    filters,
    filteredCriticalityLevels: filteredCriticalityLevelsInSpanScope,
    filteredCriticalityLevelsInGlobalScope
  } = useInsightsSelector();
  const {
    setInsightsFilters: setFilters,
    setInsightsFilteredCriticalityLevels:
      setFilteredCriticalityLevelsInSpanScope,
    setInsightsFilteredCriticalityLevelsInGlobalScope
  } = useStore.getState();

  const filteredCriticalityLevels = useMemo(
    () =>
      scopeSpanCodeObjectId
        ? filteredCriticalityLevelsInSpanScope
        : filteredCriticalityLevelsInGlobalScope,
    [
      scopeSpanCodeObjectId,
      filteredCriticalityLevelsInSpanScope,
      filteredCriticalityLevelsInGlobalScope
    ]
  );

  const isCriticalityLevelsFilterEnabled = Boolean(
    backendInfo &&
      getFeatureFlagValue(
        backendInfo,
        FeatureFlag.IS_ISSUES_CRITICALITY_LEVELS_FILTER_ENABLED
      )
  );

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

    setFilters(selection);

    if (
      isCriticalityLevelsFilterEnabled &&
      selectedFilter === "criticality" &&
      newFilters.has("criticality")
    ) {
      const newCriticalityLevels: IssueCriticality[] = ["High"];
      if (scopeSpanCodeObjectId) {
        setFilteredCriticalityLevelsInSpanScope(newCriticalityLevels);
      } else {
        setInsightsFilteredCriticalityLevelsInGlobalScope(newCriticalityLevels);
      }
    }

    sendUserActionTrackingEvent("issues filter changed", { selection });
  };

  const isCriticalSelected = isCriticalityLevelsFilterEnabled
    ? filteredCriticalityLevels.length === 1 &&
      filteredCriticalityLevels[0] === "High"
    : filters.includes("criticality");
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
