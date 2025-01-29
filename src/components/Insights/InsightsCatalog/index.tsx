import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";
import { useStore } from "../../../store/useStore";
import { isNumber } from "../../../typeGuards/isNumber";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { FeatureFlag } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatUnit } from "../../../utils/formatUnit";
import { Pagination } from "../../common/Pagination";
import { SearchInput } from "../../common/SearchInput";
import { SortingSelector } from "../../common/SortingSelector";
import type { Sorting } from "../../common/SortingSelector/types";
import { SORTING_ORDER } from "../../common/SortingSelector/types";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { EyeIcon } from "../../common/icons/16px/EyeIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { Direction } from "../../common/icons/types";
import { NewButton } from "../../common/v3/NewButton";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import { EnvironmentSelector } from "./EnvironmentSelector";
import type { SelectorEnvironment } from "./EnvironmentSelector/types";
import { FilterButton } from "./FilterButton";
import { FilterPanel } from "./FilterPanel";
import { IssuesFilter } from "./FilterPanel/IssuesFilter";
import { InsightsPage } from "./InsightsPage";
import { PromotionSection } from "./PromotionSection";
import * as s from "./styles";
import type { InsightFilterType, InsightsCatalogProps } from "./types";
import { SORTING_CRITERION, ViewMode } from "./types";
import { useMarkingAllAsRead } from "./useMarkingAllAsRead";

const PAGE_SIZE = 10;

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
    setInsightsSearch: setSearch
  } = useStore.getState();

  const {
    page,
    search: searchInputValue,
    sorting,
    filters,
    filteredInsightTypes: filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope,
    data,
    viewMode: mode,
    insightViewType
  } = useInsightsSelector();

  const {
    selectedServices,
    insightStats,
    environment,
    environments,
    scope,
    backendInfo
  } = useConfigSelector();

  const insights = data?.insights ?? [];
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
  const theme = useTheme();
  const { isMarkingAllAsReadInProgress, markAllAsRead } = useMarkingAllAsRead(
    scope?.span ?? null
  );
  const previousIsMarkingAllAsReadInProgress = usePrevious(
    isMarkingAllAsReadInProgress
  );
  const [isFiltersToolbarVisible, setIsFiltersToolbarVisible] = useState(false);

  const isServicesFilterEnabled = !scopeSpanCodeObjectId;

  const isIssuesView = insightViewType === "Issues";

  const appliedFilterCount =
    (isIssuesView
      ? filters.length +
        (filteredInsightTypes.length > 0 ? 1 : 0) +
        (isServicesFilterEnabled &&
        selectedServices &&
        selectedServices.length > 0
          ? 1
          : 0)
      : 0) +
      searchInputValue.length >
    0
      ? 1
      : 0;

  const areSpanEnvironmentsEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.ARE_SPAN_ENVIRONMENTS_ENABLED
  );
  const selectorEnvironments: SelectorEnvironment[] = areSpanEnvironmentsEnabled
    ? insightStats?.spanEnvironments ?? []
    : environments?.map((x) => ({ environment: x })) ?? [];

  const isDismissalViewModeButtonVisible =
    isIssuesView && data && (isUndefined(dismissedCount) || dismissedCount > 0); // isUndefined - check for backward compatibility, always show when BE does not return this counter
  const isMarkingAsReadOptionsEnabled =
    isIssuesView &&
    isNumber(unreadCount) &&
    filters.length === 1 &&
    filters[0] === "unread" &&
    unreadCount > 0;
  const areInsightStatsEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.ARE_INSIGHT_STATS_ENABLED
  );
  const isIssuesFilterVisible = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.ARE_ISSUES_FILTERS_ENABLED
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
    markAllAsRead();
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

  useEffect(() => {
    setSearch("");
  }, [scopeSpanCodeObjectId, setSearch]);

  useEffect(() => {
    setPage(0);
  }, [environment?.id, scopeSpanCodeObjectId, mode, setPage]);

  useEffect(() => {
    if (previousIsMarkingAllAsReadInProgress && !isMarkingAllAsReadInProgress) {
      onRefresh();
    }
  }, [
    isMarkingAllAsReadInProgress,
    previousIsMarkingAllAsReadInProgress,
    onRefresh
  ]);

  const renderFilterPanel = () => {
    if (!isIssuesView) {
      return null;
    }

    return (
      <FilterPanel
        criticalCount={insightStats?.criticalInsightsCount}
        allIssuesCount={insightStats?.issuesInsightsCount}
        unreadCount={
          areInsightStatsEnabled
            ? insightStats?.unreadInsightsCount ?? 0
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
              {isIssuesView && (
                <SortingSelector
                  onChange={(val: Sorting) => {
                    setSorting(val);
                  }}
                  options={[
                    {
                      value: SORTING_CRITERION.CRITICAL_INSIGHTS,
                      label: "Critical issues",
                      defaultOrder: SORTING_ORDER.DESC
                    },
                    {
                      value: SORTING_CRITERION.LATEST,
                      label: "Latest",
                      defaultOrder: SORTING_ORDER.DESC
                    }
                  ]}
                  defaultSorting={sorting}
                />
              )}
            </s.ToolbarRow>
          </>
        )}
        {isIssuesView && <PromotionSection />}
        {mode === ViewMode.All ? (
          <>
            {filters.length === 1 && (
              <s.ViewModeToolbarRow>
                <s.InsightsDescription>
                  {isShowUnreadOnly(filters) ? "Unread" : "Critical"}
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
                  direction={Direction.LEFT}
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
        page={page}
        insights={insights}
        insightsViewType={insightViewType}
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
