import { useMemo } from "react";
import { getFeatureFlagValue } from "../../../../featureFlags";
import type { IssueCriticality } from "../../../../redux/services/types";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../../store/insights/useInsightsSelector";
import { useStore } from "../../../../store/useStore";
import { FeatureFlag } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents } from "../../tracking";
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

  const isCriticalityLevelsFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsIssuesCriticalityLevelsFilterEnabled
  );

  const handleCriticalFilterChipClick = () => () => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUES_FILTER_PRESET_BUTTON_CLICKED,
      {
        button: "Critical"
      }
    );
    const newFilters = new Set(filters);
    const filterName = "criticality";

    if (newFilters.has(filterName)) {
      newFilters.delete(filterName);
    } else {
      newFilters.add(filterName);
    }

    const selection = Array.from(newFilters);

    setFilters(selection);

    if (isCriticalityLevelsFilterEnabled) {
      const newCriticalityLevels: IssueCriticality[] = newFilters.has(
        filterName
      )
        ? ["High"]
        : [];
      if (scopeSpanCodeObjectId) {
        setFilteredCriticalityLevelsInSpanScope(newCriticalityLevels);
      } else {
        setInsightsFilteredCriticalityLevelsInGlobalScope(newCriticalityLevels);
      }
    }
  };

  const handleUnreadFilterChipClick = () => () => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUES_FILTER_PRESET_BUTTON_CLICKED,
      {
        button: "Unread"
      }
    );
    const newFilters = new Set(filters);
    const filterName = "unread";

    if (newFilters.has(filterName)) {
      newFilters.delete(filterName);
    } else {
      newFilters.add(filterName);
    }

    const selection = Array.from(newFilters);

    setFilters(selection);
  };

  const handleAllFilterChipClick = () => () => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUES_FILTER_PRESET_BUTTON_CLICKED,
      {
        button: "All"
      }
    );

    setFilters([]);

    if (isCriticalityLevelsFilterEnabled) {
      if (scopeSpanCodeObjectId) {
        setFilteredCriticalityLevelsInSpanScope([]);
      } else {
        setInsightsFilteredCriticalityLevelsInGlobalScope([]);
      }
    }
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
        onClick={handleCriticalFilterChipClick()}
        count={criticalCount}
        type={"critical"}
      />
      <FilterChip
        disabled={!unreadCount && !isUnreadSelected}
        selected={filters.includes("unread")}
        onClick={handleUnreadFilterChipClick()}
        count={unreadCount}
        type={"unread"}
      />
      <FilterChip
        selected={filters.length === 0}
        onClick={handleAllFilterChipClick()}
        count={allIssuesCount}
        type={"all"}
      />
    </s.Stats>
  );
};
