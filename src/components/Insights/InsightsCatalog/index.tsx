import { useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { getFeatureFlagValue } from "../../../featureFlags";
import { platform } from "../../../platform";
import {
  useGetSpanEnvironmentsQuery,
  useMarkScopeInsightsReadMutation
} from "../../../redux/services/digma";
import {
  InsightsSortingCriterion,
  SortingOrder,
  type IssueCriticality
} from "../../../redux/services/types";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";
import { useStore } from "../../../store/useStore";
import { isNumber } from "../../../typeGuards/isNumber";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { FeatureFlag } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatUnit } from "../../../utils/formatUnit";
import { DaysFilter } from "../../common/DaysFilter";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { EyeIcon } from "../../common/icons/16px/EyeIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { Direction } from "../../common/icons/types";
import { Pagination } from "../../common/Pagination";
import { SearchInput } from "../../common/SearchInput";
import { SortingSelector } from "../../common/SortingSelector";
import type {
  Sorting,
  SortingOption
} from "../../common/SortingSelector/types";
import { NewButton } from "../../common/v3/NewButton";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { Tooltip } from "../../common/v3/Tooltip";
import { PAGE_SIZE } from "../hooks/useInsightsData";
import { useInsightsStats } from "../hooks/useInsightsStats";
import { trackingEvents } from "../tracking";
import type { InsightViewType } from "../types";
import { EnvironmentSelector } from "./EnvironmentSelector";
import type { SelectorEnvironment } from "./EnvironmentSelector/types";
import { FilterButton } from "./FilterButton";
import { FilterPanel } from "./FilterPanel";
import { IssuesFilter } from "./FilterPanel/IssuesFilter";
import { InsightsPage } from "./InsightsPage";
import { PromotionSection } from "./PromotionSection";
import * as s from "./styles";
import type { InsightFilterType, InsightsCatalogProps } from "./types";
import { ViewMode } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const getSortingOptions = (
  insightViewType: InsightViewType | null
): SortingOption<InsightsSortingCriterion>[] => {
  if (insightViewType === "Issues") {
    return [
      {
        value: InsightsSortingCriterion.Criticality,
        label: "Criticality",
        defaultOrder: SortingOrder.Desc
      },
      {
        value: InsightsSortingCriterion.Latest,
        label: "Latest",
        defaultOrder: SortingOrder.Desc
      }
    ];
  }

  return [];
};

const isShowCriticalOnly = (
  filters: InsightFilterType[],
  criticalityLevels: IssueCriticality[],
  areCriticalityLevelsFilterEnabled: boolean
) => {
  if (areCriticalityLevelsFilterEnabled) {
    return (
      !filters.includes("unread") &&
      criticalityLevels.length === 1 &&
      criticalityLevels[0] === "High"
    );
  } else {
    return filters.length === 1 && filters[0] === "criticality";
  }
};

const isShowUnreadOnly = (filters: InsightFilterType[]) =>
  filters.length === 1 && filters[0] === "unread";

export const InsightsCatalog = ({
  onJiraTicketCreate,
  onRefresh
}: InsightsCatalogProps) => {
  const {
    setInsightsViewMode: setMode,
    setInsightsPage: setPage,
    setInsightsSorting: setSorting,
    setInsightsSearch: setSearch,
    setInsightsLastDays: setLastDays
  } = useStore.getState();

  const {
    page,
    search: searchInputValue,
    sorting,
    filters,
    filteredInsightTypes: filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope,
    filteredCriticalityLevels: filteredCriticalityLevelsInSpanScope,
    filteredCriticalityLevelsInGlobalScope,
    data,
    viewMode: mode,
    insightViewType,
    lastDays
  } = useInsightsSelector();

  const { selectedServices, environment, environments, scope, backendInfo } =
    useConfigSelector();

  const totalCount = data?.totalCount ?? 0;
  const dismissedCount = data?.dismissedCount;
  const unreadCount = data?.unreadCount ?? 0;
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const isAtSpan = Boolean(scope?.span);
  const filteredInsightTypes = isAtSpan
    ? filteredInsightTypesInSpanScope
    : filteredInsightTypesInGlobalScope;
  const filteredCriticalityLevels = isAtSpan
    ? filteredCriticalityLevelsInSpanScope
    : filteredCriticalityLevelsInGlobalScope;
  const theme = useTheme();
  const [markScopeInsightsRead] = useMarkScopeInsightsReadMutation();
  const [isFiltersToolbarVisible, setIsFiltersToolbarVisible] = useState(false);
  const { data: insightStats } = useInsightsStats({
    spanCodeObjectId: scopeSpanCodeObjectId,
    environmentId: environment?.id,
    services: selectedServices ?? undefined
  });

  const isServicesFilterEnabled = !scopeSpanCodeObjectId;

  const isIssuesView = insightViewType === "Issues";

  const isCriticalityLevelsFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsIssuesCriticalityLevelsFilterEnabled
  );
  const isIssuesLastDaysFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsIssuesLastDaysFilterEnabled
  );

  const appliedFilterCount =
    (isIssuesView
      ? (filters.includes("unread") ? 1 : 0) +
        (isCriticalityLevelsFilterEnabled
          ? filteredCriticalityLevels.length > 0
            ? 1
            : 0
          : filters.includes("criticality")
          ? 1
          : 0) +
        (filteredInsightTypes.length > 0 ? 1 : 0) +
        (isServicesFilterEnabled &&
        selectedServices &&
        selectedServices.length > 0
          ? 1
          : 0) +
        (isNumber(lastDays) ? 1 : 0)
      : 0) + (searchInputValue.length > 0 ? 1 : 0);

  const areSpanEnvironmentsEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.AreSpanEnvironmentsEnabled
  );

  const { data: spanEnvironments } = useGetSpanEnvironmentsQuery(
    { spanCodeObjectId: scopeSpanCodeObjectId ?? "" },
    {
      skip: !areSpanEnvironmentsEnabled || !scopeSpanCodeObjectId,
      pollingInterval: REFRESH_INTERVAL,
      refetchOnReconnect: true
    }
  );

  const selectorEnvironments: SelectorEnvironment[] = areSpanEnvironmentsEnabled
    ? scopeSpanCodeObjectId &&
      scopeSpanCodeObjectId === spanEnvironments?.extra.spanCodeObjectId
      ? spanEnvironments?.data ?? []
      : []
    : environments?.map((x) => ({ environment: x })) ?? [];

  const isDismissalViewModeButtonVisible =
    isIssuesView && data && (isUndefined(dismissedCount) || dismissedCount > 0); // isUndefined - check for backward compatibility, always show when BE does not return this counter
  const isMarkingAsReadOptionsEnabled =
    isIssuesView && isNumber(unreadCount) && unreadCount > 0;

  const isUnreadOnlyViewMode = isShowUnreadOnly(filters);
  const isCriticalOnlyViewMode = isShowCriticalOnly(
    filters,
    filteredCriticalityLevels,
    isCriticalityLevelsFilterEnabled
  );
  const isFilteredViewMode = isUnreadOnlyViewMode || isCriticalOnlyViewMode;
  const areInsightStatsEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.AreInsightStatsEnabled
  );
  const isIssuesFilterVisible = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.AreIssuesFiltersEnabled
  );
  const sortingOptions = useMemo(
    () => getSortingOptions(insightViewType),
    [insightViewType]
  );

  const handleRefreshButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.REFRESH_BUTTON_CLICKED, {
      viewMode: mode
    });

    onRefresh();
  };

  const handleDismissalViewModeButtonClick = () => {
    const newMode =
      mode === ViewMode.All ? ViewMode.OnlyDismissed : ViewMode.All;
    setMode(newMode);
  };

  const handleReadAllLinkClick = () => {
    if (!environment) {
      return;
    }

    void markScopeInsightsRead({
      environment: environment.id,
      scope: scope?.span
        ? {
            spanCodeObject: scope.span.spanCodeObjectId,
            methodCodeObjectId: scope.span?.methodId ?? undefined,
            serviceName: scope.span?.serviceName ?? undefined,
            role: scope.span?.role ?? undefined
          }
        : undefined
    });
  };

  const handleBackToAllInsightsButtonClick = () => {
    setMode(ViewMode.All);
  };

  const handleFilterButtonClick = () => {
    setIsFiltersToolbarVisible(!isFiltersToolbarVisible);
  };

  const handleSearchInputChange = (val: string | null) => {
    setSearch(val ?? "");
  };

  const handleSortingChange = (value: Sorting<InsightsSortingCriterion>) => {
    setSorting(value);
  };

  const handleDaysFilterChange = (days: number) => {
    setLastDays(days);
  };

  useEffect(() => {
    setSearch("");
  }, [scopeSpanCodeObjectId, setSearch]);

  useEffect(() => {
    setPage(0);
  }, [environment?.id, scopeSpanCodeObjectId, mode, setPage]);

  const renderFilterPanel = () => {
    if (!isIssuesView) {
      return null;
    }

    return (
      <FilterPanel
        criticalCount={insightStats?.data.criticalInsightsCount}
        allIssuesCount={insightStats?.data.issuesInsightsCount}
        unreadCount={
          areInsightStatsEnabled
            ? insightStats?.data.unreadInsightsCount ?? 0
            : unreadCount ?? 0
        }
      />
    );
  };

  return (
    <>
      <s.Toolbar>
        <s.ToolbarRow>
          {isAtSpan && (
            <EnvironmentSelector environments={selectorEnvironments} />
          )}
          {!isAtSpan && renderFilterPanel()}
          <s.ToolbarButtonsContainer>
            <Tooltip title={"Refresh"}>
              <NewIconButton
                icon={RefreshIcon}
                onClick={handleRefreshButtonClick}
                buttonType={"secondary"}
              />
            </Tooltip>
            <FilterButton
              isActive={isFiltersToolbarVisible}
              onClick={handleFilterButtonClick}
              filterCount={appliedFilterCount}
            />
          </s.ToolbarButtonsContainer>
        </s.ToolbarRow>
        {isFiltersToolbarVisible && (
          <>
            <s.ToolbarRow>
              {isIssuesView && isIssuesFilterVisible && <IssuesFilter />}
              <SearchInput
                disabled={isAtSpan}
                onChange={handleSearchInputChange}
                value={searchInputValue}
              />
              {isIssuesView && isIssuesLastDaysFilterEnabled && (
                <DaysFilter
                  onChange={handleDaysFilterChange}
                  trackingPrefix={"issues"}
                  value={lastDays}
                />
              )}
              {sortingOptions.length > 0 && (
                <SortingSelector
                  onChange={handleSortingChange}
                  options={sortingOptions}
                  defaultSorting={sorting}
                />
              )}
            </s.ToolbarRow>
          </>
        )}
        {platform === "JetBrains" && isIssuesView && <PromotionSection />}
        {mode === ViewMode.All ? (
          <>
            {isFilteredViewMode && (
              <s.ViewModeToolbarRow>
                <s.InsightsDescription>
                  {isUnreadOnlyViewMode && "Unread"}
                  {isCriticalOnlyViewMode && "Critical"}
                </s.InsightsDescription>
                {isMarkingAsReadOptionsEnabled && (
                  <s.MarkingAsReadToolbarActionsContainer>
                    <s.MarkingAsReadToolbarActionLink
                      onClick={handleReadAllLinkClick}
                    >
                      Read all
                    </s.MarkingAsReadToolbarActionLink>
                  </s.MarkingAsReadToolbarActionsContainer>
                )}
              </s.ViewModeToolbarRow>
            )}
          </>
        ) : (
          <s.ViewModeToolbarRow>
            <s.BackToAllInsightsButton
              onClick={handleBackToAllInsightsButtonClick}
            >
              <s.BackToAllInsightsButtonIconContainer>
                <ChevronIcon
                  direction={Direction.Left}
                  size={16}
                  color={"currentColor"}
                />
              </s.BackToAllInsightsButtonIconContainer>
              Back to All Issues
            </s.BackToAllInsightsButton>
            {mode === ViewMode.OnlyDismissed && isNumber(dismissedCount) && (
              <s.InsightsDescription>
                <s.InsightCount>{dismissedCount}</s.InsightCount>
                dismissed {formatUnit(dismissedCount || 0, "issue")}
              </s.InsightsDescription>
            )}
          </s.ViewModeToolbarRow>
        )}
      </s.Toolbar>
      <InsightsPage
        onJiraTicketCreate={onJiraTicketCreate}
        onRefresh={onRefresh}
        isMarkAsReadButtonEnabled={isShowUnreadOnly(filters)}
      />
      <s.Footer>
        {totalCount > 0 && (
          <>
            <Pagination
              itemsCount={totalCount}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
              extendedNavigation={true}
            />
            <s.FooterItemsCount>
              Showing{" "}
              <s.FooterPageItemsCount>
                {pageStartItemNumber} - {pageEndItemNumber}
              </s.FooterPageItemsCount>{" "}
              of {totalCount}
            </s.FooterItemsCount>
          </>
        )}
        {isDismissalViewModeButtonVisible && (
          <NewButton
            buttonType={"secondaryBorderless"}
            icon={(props) => (
              <EyeIcon
                {...props}
                crossOut={mode !== ViewMode.OnlyDismissed}
                color={
                  mode === ViewMode.OnlyDismissed
                    ? theme.colors.v3.icon.brandSecondary
                    : props.color
                }
              />
            )}
            onClick={handleDismissalViewModeButtonClick}
          />
        )}
      </s.Footer>
    </>
  );
};
