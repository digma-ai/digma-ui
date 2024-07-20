import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "styled-components";
import { useGlobalStore } from "../../../containers/Main/stores/globalStore";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useDebounce } from "../../../hooks/useDebounce";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { FeatureFlag } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatUnit } from "../../../utils/formatUnit";
import { MAIN_CONTAINER_ID } from "../../Main";
import { RegistrationCard } from "../../Main/RegistrationCard";
import { MainOverlay } from "../../Main/styles";
import { trackingEvents as mainTrackingEvents } from "../../Main/tracking";
import { CancelConfirmation } from "../../common/CancelConfirmation";
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
import { PromotionCard } from "./PromotionCard";
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

const PROMOTION_PERSISTENCE_KEY = "PROMOTION";
const PROMOTION_COMPLETED_PERSISTENCE_KEY = "PROMOTION_COMPLETED";

const isPromotionEnabled = (dismissalDate: number | null | undefined) => {
  const PROMOTION_INTERVAL = 30 * 24 * 60 * 60 * 1000; // in milliseconds

  return (
    !dismissalDate || Math.abs(dismissalDate - Date.now()) > PROMOTION_INTERVAL
  );
};

export const InsightsCatalog = ({
  insightViewType,
  insights,
  onJiraTicketCreate,
  defaultQuery,
  totalCount,
  dismissedCount,
  unreadCount,
  onQueryChange,
  onRefresh,
  filterComponent
}: InsightsCatalogProps) => {
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
  const insightStats = useGlobalStore.use.insightStats();
  const environment = useGlobalStore.use.environment();
  const scope = useGlobalStore.use.scope();
  const previousScopeSpan = usePrevious(scope?.span);
  const backendInfo = useGlobalStore.use.backendInfo();
  const [mode, setMode] = useState<ViewMode>(ViewMode.All);
  const previousMode = usePrevious(mode);
  const theme = useTheme();
  const { isMarkingAllAsReadInProgress, markAllAsRead } = useMarkingAllAsRead(
    scope?.span ?? null
  );
  const previousIsMarkingAllAsReadInProgress = usePrevious(
    isMarkingAllAsReadInProgress
  );
  const [showRegistration, setShowRegistration] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const [dismissalDate, setDismissalDate] = usePersistence<number>(
    PROMOTION_PERSISTENCE_KEY,
    "application"
  );
  const [promotionCompleted, setPromotionCompleted] = usePersistence<boolean>(
    PROMOTION_COMPLETED_PERSISTENCE_KEY,
    "application"
  );

  const handleRegistrationComplete = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_SUBMITTED
    );
    setPromotionCompleted(true);
  };

  const handleRegistrationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_CLOSED_CLICKED
    );
    setShowRegistration(false);
  };

  const handleCancelConfirmationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_CANCEL_CONFIRMATION_CLOSE_CLICKED
    );
    setShowDiscardConfirmation(false);
  };

  const handleCancelConfirmationAccept = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_CANCEL_CONFIRMATION_ACCEPT_CLICKED
    );
    setDismissalDate(Date.now());
    setShowDiscardConfirmation(false);
  };

  const handleConfirmationClose = () => {
    setShowDiscardConfirmation(false);
  };

  const handlePromotionAccept = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_OPENED
    );
    setShowRegistration(true);
  };

  const handlePromotionDiscard = () => {
    sendUserActionTrackingEvent(mainTrackingEvents.PROMOTION_DISCARDED);
    setShowDiscardConfirmation(true);
  };

  const isPromotionVisible =
    insightViewType == "Issues" &&
    !promotionCompleted &&
    isPromotionEnabled(dismissalDate);
  const areInsightsStatsVisible = insightViewType === "Issues";
  const isDismissalViewModeButtonVisible =
    insightViewType === "Issues" &&
    (isUndefined(dismissedCount) || dismissedCount > 0); // isUndefined - check for backward compatibility, always show when BE does not return this counter
  const isMarkingAsReadOptionsEnabled =
    insightViewType === "Issues" &&
    isNumber(unreadCount) &&
    selectedFilters.length === 1 &&
    selectedFilters[0] === "unread" &&
    unreadCount > 0;
  const areInsightStatsEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.ARE_INSIGHT_STATS_ENABLED
  );
  const mainContainer = document.getElementById(MAIN_CONTAINER_ID);

  const refreshData = useCallback(() => {
    onQueryChange({
      ...defaultQuery,
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
    onQueryChange,
    defaultQuery,
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
    scope
  ]);

  useEffect(() => {
    if (!previousScopeSpan || previousScopeSpan !== scope?.span) {
      setSearchInputValue("");
    }
  }, [scope?.span, previousScopeSpan]);

  useEffect(() => {
    setPage(0);
  }, [environment?.id, scope?.span, mode]);

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== page) ||
      Boolean(previousSorting && previousSorting !== sorting) ||
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

  return (
    <>
      <s.Toolbar>
        <s.ToolbarRow>
          {!isUndefined(filterComponent) && filterComponent}
          <SearchInput
            disabled={Boolean(scope?.span)}
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
            defaultSorting={defaultQuery.sorting}
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
              areInsightsStatsVisible &&
              (insights.length > 0 || selectedFilters.length > 0) && (
                <InsightStats
                  criticalCount={insightStats?.criticalInsightsCount}
                  allIssuesCount={insightStats?.issuesInsightsCount}
                  unreadCount={
                    areInsightStatsEnabled
                      ? insightStats?.unreadInsightsCount ?? 0
                      : unreadCount ?? 0
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
            {mode === ViewMode.OnlyDismissed && isNumber(dismissedCount) && (
              <s.InsightsDescription>
                <s.InsightCount>{dismissedCount}</s.InsightCount>
                dismissed {formatUnit(dismissedCount || 0, "issue")}
              </s.InsightsDescription>
            )}
          </s.ViewModeToolbarRow>
        )}
        {isPromotionVisible && (
          <s.ToolbarRow>
            <PromotionCard
              onAccept={handlePromotionAccept}
              onDiscard={handlePromotionDiscard}
            />
          </s.ToolbarRow>
        )}
      </s.Toolbar>
      <InsightsPage
        page={page}
        insights={insights}
        isFilteringEnabled={
          debouncedSearchInputValue !== null && debouncedSearchInputValue !== ""
        }
        onJiraTicketCreate={onJiraTicketCreate}
        onRefresh={onRefresh}
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
      {mainContainer &&
        showDiscardConfirmation &&
        createPortal(
          <MainOverlay onClose={handleConfirmationClose} tabIndex={-1}>
            <CancelConfirmation
              header={"Discard offer?"}
              description={
                "Are you sure you want to miss out on this exclusive, limited-time offer?"
              }
              cancelBtnText={"Yes, discard"}
              onClose={handleCancelConfirmationClose}
              onCancel={handleCancelConfirmationAccept}
            />
          </MainOverlay>,
          mainContainer
        )}
      {mainContainer &&
        createPortal(
          <RegistrationCard
            onClose={handleRegistrationClose}
            onComplete={handleRegistrationComplete}
            show={showRegistration}
          />,
          mainContainer
        )}
    </>
  );
};
