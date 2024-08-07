import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "styled-components";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { useInsightsStore } from "../../../containers/Main/stores/useInsightsStore";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useDebounce } from "../../../hooks/useDebounce";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNumber } from "../../../typeGuards/isNumber";
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
import { EyeIcon } from "../../common/icons/16px/EyeIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { Direction } from "../../common/icons/types";
import { Button } from "../../common/v3/Button";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { Tooltip } from "../../common/v3/Tooltip";
import { IssuesFilter } from "../Issues/IssuesFilter";
import { trackingEvents } from "../tracking";
import { EnvironmentSelector } from "./EnvironmentSelector";
import { SelectorEnvironment } from "./EnvironmentSelector/types";
import { FilterButton } from "./FilterButton";
import { FilterPanel } from "./FilterPanel";
import { InsightsPage } from "./InsightsPage";
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
  onJiraTicketCreate,
  onRefresh
}: InsightsCatalogProps) => {
  const insightViewType = useInsightsStore.use.insightViewType();
  const mode = useInsightsStore.use.viewMode();
  const setMode = useInsightsStore.use.setViewMode();
  const page = useInsightsStore.use.page();
  const setPage = useInsightsStore.use.setPage();
  const searchInputValue = useInsightsStore.use.search();
  const setSearch = useInsightsStore.use.setSearch();
  const debouncedSearchInputValue = useDebounce(searchInputValue, 1000);
  const sorting = useInsightsStore.use.sorting();
  const setSorting = useInsightsStore.use.setSorting();
  const filters = useInsightsStore.use.filters();
  const filteredInsightTypes = useInsightsStore.use.filteredInsightTypes();
  const data = useInsightsStore.use.data();
  const insights = data?.insights ?? [];
  const totalCount = data?.totalCount ?? 0;
  const dismissedCount = data?.dismissedCount;
  const unreadCount = data?.unreadCount ?? 0;
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );
  const insightStats = useGlobalStore.use.insightStats();
  const environment = useGlobalStore.use.environment();
  const environments = useGlobalStore.use.environments();
  const scope = useGlobalStore.use.scope();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const isAtSpan = Boolean(scope?.span);
  const backendInfo = useGlobalStore.use.backendInfo();
  const theme = useTheme();
  const { isMarkingAllAsReadInProgress, markAllAsRead } = useMarkingAllAsRead(
    scope?.span ?? null
  );
  const previousIsMarkingAllAsReadInProgress = usePrevious(
    isMarkingAllAsReadInProgress
  );
  const [showRegistration, setShowRegistration] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const [isFiltersToolbarVisible, setIsFiltersToolbarVisible] = useState(false);
  const [dismissalDate, setDismissalDate] = usePersistence<number>(
    PROMOTION_PERSISTENCE_KEY,
    "application"
  );
  const [promotionCompleted, setPromotionCompleted] = usePersistence<boolean>(
    PROMOTION_COMPLETED_PERSISTENCE_KEY,
    "application"
  );

  const appliedFilterCount =
    filters.length + (filteredInsightTypes.length > 0 ? 1 : 0);

  const areSpanEnvironmentsEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.ARE_SPAN_ENVIRONMENTS_ENABLED
  );
  const selectorEnvironments: SelectorEnvironment[] = areSpanEnvironmentsEnabled
    ? insightStats?.spanEnvironments ?? []
    : environments?.map((x) => ({ environment: x })) ?? [];

  const handleRegistrationComplete = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_FORM_SUBMITTED
    );
    setPromotionCompleted(true);
  };

  const handleRegistrationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_CLOSE_BUTTON_CLICKED
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
      mainTrackingEvents.PROMOTION_REGISTRATION_FORM_OPENED
    );
    setShowRegistration(true);
  };

  const handlePromotionDiscard = () => {
    sendUserActionTrackingEvent(mainTrackingEvents.PROMOTION_DISCARDED);
    setShowDiscardConfirmation(true);
  };

  const isIssuesView = insightViewType === "Issues";

  const isPromotionVisible =
    isIssuesView && !promotionCompleted && isPromotionEnabled(dismissalDate);
  const isDismissalViewModeButtonVisible =
    isIssuesView && (isUndefined(dismissedCount) || dismissedCount > 0); // isUndefined - check for backward compatibility, always show when BE does not return this counter
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
  const mainContainer = document.getElementById(MAIN_CONTAINER_ID);

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
          {isAtSpan && selectorEnvironments.length > 1 && (
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
              <SortingSelector
                onChange={(val: Sorting) => {
                  setSorting(val);
                }}
                options={[
                  ...(isIssuesView
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
                defaultSorting={sorting}
              />
            </s.ToolbarRow>
          </>
        )}
        {isPromotionVisible && (
          <s.ToolbarRow>
            <PromotionCard
              onAccept={handlePromotionAccept}
              onDiscard={handlePromotionDiscard}
            />
          </s.ToolbarRow>
        )}
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
        isFilteringEnabled={
          debouncedSearchInputValue !== null && debouncedSearchInputValue !== ""
        }
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
          <Button
            buttonType={"tertiary"}
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
