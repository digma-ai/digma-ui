import { useCallback, useContext, useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";

import { useTheme } from "styled-components";
import { useDebounce } from "../../../hooks/useDebounce";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
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
import { InsightsPage } from "../InsightsPage";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { InsightsCatalogProps, SORTING_CRITERION } from "./types";
import { useMarkingAllAsRead } from "./useMarkingAllAsRead";

const PAGE_SIZE = 10;
enum ViewMode {
  All,
  OnlyDismissed,
  OnlyUnread
}

export const InsightsCatalog = (props: InsightsCatalogProps) => {
  const { insights, onJiraTicketCreate, defaultQuery, totalCount } = props;
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const [searchInputValue, setSearchInputValue] = useState(
    defaultQuery.searchQuery
  );
  const debouncedSearchInputValue = useDebounce(searchInputValue, 1000);
  const [sorting, setSorting] = useState<Sorting>(defaultQuery.sorting);
  const previousSorting = usePrevious(sorting);
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

  const isMarkingAsReadToolbarVisible =
    props.isMarkingAsReadEnabled &&
    isNumber(props.unreadCount) &&
    props.unreadCount > 0;

  const refreshData = useCallback(
    () =>
      props.onQueryChange({
        ...props.defaultQuery,
        page,
        sorting,
        searchQuery: debouncedSearchInputValue,
        showDismissed: mode === ViewMode.OnlyDismissed,
        showUnreadOnly: mode === ViewMode.OnlyUnread
      }),
    [
      page,
      sorting,
      debouncedSearchInputValue,
      props.onQueryChange,
      props.defaultQuery,
      mode
    ]
  );

  const handleRefreshButtonClick = () => {
    sendTrackingEvent(trackingEvents.REFRESH_BUTTON_CLICKED, {
      viewMode: mode
    });

    refreshData();
  };

  const handleDismissalViewModeButtonClick = () => {
    const newMode =
      mode === ViewMode.All ? ViewMode.OnlyDismissed : ViewMode.All;
    setMode(newMode);
  };

  const handleUnreadOnlyLinkClick = () => {
    setMode(ViewMode.OnlyUnread);
  };

  const handleReadAllLinkClick = () => {
    markAllAsRead();
  };

  const handleBackToAllInsightsButtonClick = () => {
    setMode(ViewMode.All);
  };

  useEffect(() => {
    if (previousIsMarkingAllAsReadInProgress && !isMarkingAllAsReadInProgress) {
      refreshData();
    }
  }, [
    isMarkingAllAsReadInProgress,
    previousIsMarkingAllAsReadInProgress,
    refreshData
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
        previousConfig?.environment?.originalName !==
          config.environment?.originalName)
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
      previousMode !== mode
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
    previousMode
  ]);

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
          isMarkingAsReadToolbarVisible && (
            <s.ViewModeToolbarRow>
              <s.InsightCountDescription>
                <s.InsightCount>{props.unreadCount}</s.InsightCount>
                unread insight{insights.length === 1 ? "" : "s"}
              </s.InsightCountDescription>
              <s.MarkingAsReadToolbarActionsContainer>
                <s.MarkingAsReadToolbarActionLink
                  onClick={handleUnreadOnlyLinkClick}
                >
                  Unread only
                </s.MarkingAsReadToolbarActionLink>
                /
                <s.MarkingAsReadToolbarActionLink
                  onClick={handleReadAllLinkClick}
                >
                  Read all
                </s.MarkingAsReadToolbarActionLink>
              </s.MarkingAsReadToolbarActionsContainer>
            </s.ViewModeToolbarRow>
          )
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
              Back to All Insights
            </s.BackToAllInsightsButton>
            {mode === ViewMode.OnlyDismissed && (
              <s.InsightCountDescription>
                <s.InsightCount>{props.dismissedCount}</s.InsightCount>
                dismissed insight{insights.length === 1 ? "" : "s"}
              </s.InsightCountDescription>
            )}
            {mode === ViewMode.OnlyUnread && isMarkingAsReadToolbarVisible && (
              <s.MarkingAsReadToolbarActionLink
                onClick={handleReadAllLinkClick}
              >
                Read all
              </s.MarkingAsReadToolbarActionLink>
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
