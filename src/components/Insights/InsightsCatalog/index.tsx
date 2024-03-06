import { useCallback, useContext, useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";

import { useTheme } from "styled-components";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useDebounce } from "../../../hooks/useDebounce";
import { isNumber } from "../../../typeGuards/isNumber";
import { FeatureFlag } from "../../../types";
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

const PAGE_SIZE = 10;
enum ViewMode {
  All,
  OnlyDismissed
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

  const isViewModeButtonVisible = getFeatureFlagValue(
    config,
    FeatureFlag.IS_INSIGHT_DISMISSAL_ENABLED
  );

  const refreshData = useCallback(
    () =>
      props.onQueryChange({
        page,
        sorting,
        searchQuery: debouncedSearchInputValue,
        showDismissed: mode === ViewMode.OnlyDismissed
      }),
    [page, sorting, debouncedSearchInputValue, props, mode]
  );

  const handleRefreshButtonClick = () => {
    sendTrackingEvent(trackingEvents.REFRESH_BUTTON_CLICKED, {
      viewMode: mode
    });

    refreshData();
  };
  const handleViewModeChange = () => {
    const newMode =
      mode === ViewMode.All ? ViewMode.OnlyDismissed : ViewMode.All;
    setMode(newMode);
  };

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
    if (
      (isNumber(previousPage) && previousPage !== page) ||
      (previousSorting && previousSorting !== sorting) ||
      previousSearchQuery !== debouncedSearchInputValue ||
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
    props.onQueryChange,
    refreshData,
    mode,
    previousMode
  ]);

  return (
    <>
      <s.Toolbar>
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
            {
              value: SORTING_CRITERION.CRITICAL_INSIGHTS,
              label: "Critical insights",
              defaultOrder: SORTING_ORDER.DESC
            },
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
      </s.Toolbar>
      {mode === ViewMode.OnlyDismissed && (
        <s.InsightsViewModeToolbar>
          <Button
            buttonType={"tertiary"}
            label={"Back to All Insights"}
            icon={(props) => (
              <ChevronIcon {...props} direction={Direction.LEFT} />
            )}
            onClick={() => setMode(ViewMode.All)}
          />
          <s.DismissedDescription>
            <s.DismissedCount>{insights.length}</s.DismissedCount>
            dismissed insights
          </s.DismissedDescription>
        </s.InsightsViewModeToolbar>
      )}
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
        {isViewModeButtonVisible && (
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
            onClick={handleViewModeChange}
          />
        )}
      </s.Footer>
    </>
  );
};
