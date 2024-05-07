import { useCallback, useContext, useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";

import { useTheme } from "styled-components";
import { actions as globalActions } from "../../../actions";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useDebounce } from "../../../hooks/useDebounce";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { FeatureFlag, GetInsightStatsPayload } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatUnit } from "../../../utils/formatUnit";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Pagination } from "../../common/Pagination";
import { SearchInput } from "../../common/SearchInput";
import { SortingSelector } from "../../common/SortingSelector";
import { SORTING_ORDER, Sorting } from "../../common/SortingSelector/types";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { GroupIcon } from "../../common/icons/16px/GroupIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { Direction } from "../../common/icons/types";
import { Button } from "../../common/v3/Button";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import { InsightsPage } from "./InsightsPage";
import { InsightStats } from "./InsightsStats";
import * as s from "./styles";
import {
  InsightFilterType,
  InsightsCatalogProps,
  SORTING_CRITERION,
  ViewMode
} from "./types";
import { useMarkingAllAsRead } from "./useMarkingAllAsRead";

const PAGE_SIZE = 10;

const isShowUnreadOnly = (filters: InsightFilterType[]) =>
  filters.length === 1 && filters[0] === "unread";

export const InsightsCatalog = (props: InsightsCatalogProps) => {
  const { insights, onJiraTicketCreate, defaultQuery, totalCount } = props;
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const [searchInputValue, setSearchInputValue] = useState(
    defaultQuery.searchQuery
  );

  const [selectedFilters, setSelectedFilters] = useState<InsightFilterType[]>(
    []
  );
  const debouncedSearchInputValue = useDebounce(searchInputValue, 1000);
  const [sorting, setSorting] = useState<Sorting>(defaultQuery.sorting);
  const previousSorting = usePrevious(sorting);
  const previousFilters = usePrevious(selectedFilters);
  const previousSearchQuery = usePrevious(debouncedSearchInputValue);
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );
  const config = useContext(ConfigContext);
  const previousConfig = usePrevious(config);
  const previousScope = usePrevious(config.scope?.span);
  const [mode, setMode] = useState<ViewMode>(ViewMode.All);
  const previousMode = usePrevious(mode);
  const theme = useTheme();
  const { isMarkingAllAsReadInProgress, markAllAsRead } = useMarkingAllAsRead(
    config.scope?.span || null
  );
  const previousIsMarkingAllAsReadInProgress = usePrevious(
    isMarkingAllAsReadInProgress
  );

  const isDismissalViewModeButtonVisible =
    props.isDismissalEnabled &&
    (isUndefined(props.dismissedCount) || props.dismissedCount > 0); // isUndefined - check for backward compatibility, always show when BE does not return this counter

  const isMarkingAsReadOptionsEnabled =
    props.isMarkingAsReadEnabled &&
    isNumber(props.unreadCount) &&
    selectedFilters.length === 1 &&
    selectedFilters[0] === "unread" &&
    props.unreadCount > 0;

  const refreshData = useCallback(() => {
    window.sendMessageToDigma<GetInsightStatsPayload>({
      action: globalActions.GET_INSIGHT_STATS,
      payload: {
        scope: config.scope?.span
          ? {
              span: {
                spanCodeObjectId: config.scope.span.spanCodeObjectId
              }
            }
          : null
      }
    });

    props.onQueryChange({
      ...props.defaultQuery,
      page,
      sorting,
      searchQuery: debouncedSearchInputValue,
      showDismissed: mode === ViewMode.OnlyDismissed,
      showUnreadOnly: isShowUnreadOnly(selectedFilters),
      filters: selectedFilters
    });
  }, [
    page,
    sorting,
    debouncedSearchInputValue,
    props.onQueryChange,
    props.defaultQuery,
    mode,
    selectedFilters
  ]);

  const handleRefreshButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.REFRESH_BUTTON_CLICKED, {
      viewMode: mode
    });

    refreshData();
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

  const handleFilterSelectionChange = useCallback(
    (selectedFilter: InsightFilterType[]) => {
      setSelectedFilters(selectedFilter);
    },
    []
  );

  useEffect(() => {
    if (previousIsMarkingAllAsReadInProgress && !isMarkingAllAsReadInProgress) {
      refreshData();
    }
  }, [
    isMarkingAllAsReadInProgress,
    previousIsMarkingAllAsReadInProgress,
    refreshData,
    config.scope
  ]);

  useEffect(() => {
    if (!previousScope || previousScope !== config.scope?.span) {
      setSearchInputValue("");
    }
  }, [config.scope, previousScope]);

  useEffect(() => {
    if (
      previousConfig &&
      (previousConfig?.scope?.span !== config?.scope?.span ||
        previousConfig?.environment?.id !== config.environment?.id)
    ) {
      setPage(0);
    }
  }, [previousConfig, config]);

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [mode]);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== page) ||
      (previousSorting && previousSorting !== sorting) ||
      (isString(previousSearchQuery) &&
        previousSearchQuery !== debouncedSearchInputValue) ||
      previousMode !== mode ||
      previousFilters !== selectedFilters
    ) {
      refreshData();
    }
  }, [
    previousSorting,
    sorting,
    previousPage,
    page,
    debouncedSearchInputValue,
    previousSearchQuery,
    refreshData,
    mode,
    previousMode,
    previousFilters,
    selectedFilters
  ]);

  const areInsightStatsSupported = getFeatureFlagValue(
    config,
    FeatureFlag.ARE_INSIGHT_STATS_ENABLED
  );

  return (
    <>
      <s.Toolbar>
        <s.ToolbarRow>
          <SearchInput
            disabled={Boolean(config.scope?.span)}
            onChange={(val: string | null) => {
              setSearchInputValue(val);
            }}
            value={searchInputValue}
          />
          <SortingSelector
            onChange={(val: Sorting) => {
              setSorting(val);
            }}
            options={[
              ...(defaultQuery.insightViewType === "Issues"
                ? [
                    {
                      value: SORTING_CRITERION.CRITICAL_INSIGHTS,
                      label: "Critical issues",
                      defaultOrder: SORTING_ORDER.DESC
                    }
                  ]
                : []),
              {
                value: SORTING_CRITERION.LATEST,
                label: "Latest",
                defaultOrder: SORTING_ORDER.DESC
              }
            ]}
            default={defaultQuery.sorting}
          />
          <Tooltip title={"Refresh"}>
            <s.RefreshButton
              buttonType={"tertiary"}
              icon={RefreshIcon}
              onClick={handleRefreshButtonClick}
            />
          </Tooltip>
        </s.ToolbarRow>

        {mode === ViewMode.All ? (
          <>
            {!searchInputValue &&
              !props.hideInsightsStats &&
              (insights.length > 0 || selectedFilters.length > 0) && (
                <InsightStats
                  criticalCount={config.insightStats?.criticalInsightsCount}
                  allIssuesCount={config.insightStats?.allIssuesCount}
                  unreadCount={
                    areInsightStatsSupported
                      ? config.insightStats?.unreadInsightsCount || 0
                      : props.unreadCount || 0
                  }
                  onChange={handleFilterSelectionChange}
                />
              )}
            {selectedFilters.length === 1 && (
              <s.ViewModeToolbarRow>
                <s.InsightsDescription>
                  {isShowUnreadOnly(selectedFilters) ? "Unread" : "Critical"}
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
            {mode === ViewMode.OnlyDismissed &&
              isNumber(props.dismissedCount) && (
                <s.InsightsDescription>
                  <s.InsightCount>{props.dismissedCount}</s.InsightCount>
                  dismissed {formatUnit(props.dismissedCount || 0, "issue")}
                </s.InsightsDescription>
              )}
          </s.ViewModeToolbarRow>
        )}
      </s.Toolbar>
      <InsightsPage
        page={page}
        insights={insights}
        isFilteringEnabled={
          debouncedSearchInputValue !== null && debouncedSearchInputValue !== ""
        }
        onJiraTicketCreate={onJiraTicketCreate}
        onRefresh={props.onRefresh}
        isMarkAsReadButtonEnabled={isShowUnreadOnly(selectedFilters)}
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
          <Button
            buttonType={"tertiary"}
            icon={(props) => (
              <GroupIcon
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
