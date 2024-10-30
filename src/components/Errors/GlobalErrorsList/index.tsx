import { useEffect, useMemo, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { getFeatureFlagValue } from "../../../featureFlags";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { useMount } from "../../../hooks/useMount";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import {
  GLOBAL_ERROR_SORTING_CRITERION,
  PAGE_SIZE,
  ViewMode
} from "../../../store/errors/errorsSlice";
import { useErrorsSelector } from "../../../store/errors/useErrorsSelector";
import { useStore } from "../../../store/useStore";
import { isNumber } from "../../../typeGuards/isNumber";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { FeatureFlag } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatUnit } from "../../../utils/formatUnit";
import { OppositeArrowsIcon } from "../../common/icons/12px/OppositeArrowsIcon";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { CardsColoredIcon } from "../../common/icons/CardsColoredIcon";
import { Direction } from "../../common/icons/types";
import { NewPopover } from "../../common/NewPopover";
import { SearchInput } from "../../common/SearchInput";
import { NewButton } from "../../common/v3/NewButton";
import { NewEmptyState } from "../../common/v3/NewEmptyState";
import { Pagination } from "../../common/v3/Pagination";
import { useHistory } from "../../Main/useHistory";
import { MenuList } from "../../Navigation/common/MenuList";
import { Popup } from "../../Navigation/common/Popup";
import { actions } from "../actions";
import { NewErrorCard } from "../NewErrorCard";
import { NoDataEmptyState } from "../NoDataEmptyState";
import { trackingEvents } from "../tracking";
import { DaysFilter } from "./DaysFilter";
import { GlobalErrorsFilters } from "./GlobalErrorsFilters";
import * as s from "./styles";
import {
  GetGlobalErrorsDataPayload,
  SetGlobalErrorsDataPayload
} from "./types";

const PIN_UNPIN_ANIMATION_DURATION = 250;

export const GlobalErrorsList = () => {
  const { goTo } = useHistory();
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const [latestPinChangedId, setLatestPinChangedId] = useState<string>();
  const [areAnimationsEnabled, setAreAnimationsEnabled] = useState(false);
  const { environment, backendInfo } = useConfigSelector();
  const isDismissEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_GLOBAL_ERROR_DISMISS_ENABLED
  );

  const {
    globalErrorsViewMode: mode,
    globalErrorsSearch: search,
    globalErrorsSorting: sorting,
    globalErrorsPage: page,
    globalErrorsPageSize: pageSize,
    globalErrorsList: list,
    globalErrorsTotalCount: totalCount,
    globalErrorsSelectedFilters: selectedFilters,
    globalErrorsLastDays: lastDays
  } = useErrorsSelector();

  const previousList = usePrevious(list);

  const {
    setGlobalErrorsData,
    setGlobalErrorsSearch,
    setGlobalErrorsSorting,
    setGlobalErrorsPage,
    resetGlobalErrors,
    resetGlobalErrorsSelectedFilters,
    setGlobalErrorsViewMode,
    setGlobalErrorsLastDays
  } = useStore.getState();

  const areGlobalErrorsFiltersEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.ARE_GLOBAL_ERRORS_FILTERS_ENABLED
  );

  const isGlobalErrorsLastDaysFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_GLOBAL_ERROR_LAST_DAYS_FILTER_ENABLED
  );

  const areGlobalErrorsCriticalityAndUnhandledFiltersEnabled =
    getFeatureFlagValue(
      backendInfo,
      FeatureFlag.ARE_GLOBAL_ERRORS_CRITICALITY_AND_UNHANDLED_FILTERS_ENABLED
    );

  const environmentId = environment?.id;

  const sortingMenuItems = Object.values(GLOBAL_ERROR_SORTING_CRITERION).map(
    (x) => ({
      id: x,
      label: x,
      onClick: () => handleSortingChange(x)
    })
  );

  const dataFetcherConfiguration: DataFetcherConfiguration = useMemo(
    () => ({
      requestAction: actions.GET_GLOBAL_ERRORS_DATA,
      responseAction: actions.SET_GLOBAL_ERRORS_DATA,
      refreshWithInterval: true,
      refreshOnPayloadChange: true,
      isEnabled: Boolean(environmentId)
    }),
    [environmentId]
  );

  const payload: GetGlobalErrorsDataPayload = useMemo(
    () => ({
      environment: environmentId ?? "",
      searchCriteria: search,
      sortBy: sorting,
      page,
      lastDays,
      pageSize: PAGE_SIZE,
      dismissed: mode === ViewMode.OnlyDismissed,
      ...(areGlobalErrorsFiltersEnabled
        ? {
            services: selectedFilters.services,
            endpoints: selectedFilters.endpoints,
            errorTypes: selectedFilters.errorTypes
          }
        : {}),
      ...(areGlobalErrorsCriticalityAndUnhandledFiltersEnabled
        ? {
            criticalities: selectedFilters.criticalities,
            handlingTypes: selectedFilters.handlingTypes
          }
        : {})
    }),
    [
      environmentId,
      search,
      sorting,
      page,
      mode,
      lastDays,
      areGlobalErrorsFiltersEnabled,
      selectedFilters.services,
      selectedFilters.endpoints,
      selectedFilters.errorTypes,
      selectedFilters.criticalities,
      selectedFilters.handlingTypes,
      areGlobalErrorsCriticalityAndUnhandledFiltersEnabled
    ]
  );

  const { data, getData } = useFetchData<
    GetGlobalErrorsDataPayload,
    SetGlobalErrorsDataPayload
  >(dataFetcherConfiguration, payload);

  const isDismissalViewModeButtonVisible =
    isDismissEnabled &&
    data &&
    !isUndefined(data.dismissedCount) &&
    data.dismissedCount > 0;

  // Refresh data after pin/unpin actions
  useEffect(() => {
    dispatcher.addActionListener(actions.SET_UNDISMISS_ERROR_RESULT, getData);
    dispatcher.addActionListener(actions.SET_DISMISS_ERROR_RESULT, getData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_UNDISMISS_ERROR_RESULT,
        getData
      );
      dispatcher.removeActionListener(
        actions.SET_DISMISS_ERROR_RESULT,
        getData
      );
    };
  }, [getData]);

  // Cleanup errors store slice on unmount
  useMount(() => {
    return () => {
      resetGlobalErrors();
    };
  });

  // Set data to store on fetch
  useEffect(() => {
    if (data) {
      setGlobalErrorsData(data);
    }
  }, [data, setGlobalErrorsData]);

  // Disable animations after pin/unpin actions
  useEffect(() => {
    if (!previousList || !list || !latestPinChangedId) {
      return;
    }

    if (previousList !== list) {
      const isLatestChangedIdInList = list.some(
        (x) => x.id === latestPinChangedId
      );

      if (isLatestChangedIdInList) {
        setTimeout(() => {
          setAreAnimationsEnabled(false);
        }, PIN_UNPIN_ANIMATION_DURATION);
      } else {
        setAreAnimationsEnabled(false);
      }
      setLatestPinChangedId(undefined);
    }
  }, [previousList, list, latestPinChangedId]);

  // Reset page on filters change
  useEffect(() => {
    setGlobalErrorsPage(0);
  }, [
    environmentId,
    search,
    setGlobalErrorsPage,
    selectedFilters.services,
    selectedFilters.endpoints,
    selectedFilters.errorTypes,
    selectedFilters.criticalities,
    selectedFilters.handlingTypes
  ]);

  // Reset filters on environment change
  useEffect(() => {
    resetGlobalErrorsSelectedFilters();
  }, [environmentId, resetGlobalErrorsSelectedFilters]);

  // Reset scroll position on filters change
  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo(0, 0);
    }
  }, [environmentId, search, sorting, page]);

  const handleErrorSourceLinkClick = (errorId: string) => {
    goTo(errorId);
  };

  const handleSearchInputChange = (search: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_SEARCH_CHANGED
    );
    setGlobalErrorsSearch(search);
  };

  const handleDayFilterChange = (days?: number) => {
    setGlobalErrorsLastDays(days);
  };

  const handleSortingMenuButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_SORTING_CHANGE
    );
    setIsSortingMenuOpen(!isSortingMenuOpen);
  };

  const handleSortingChange = (sorting: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_SORTING_CHANGE
    );
    setGlobalErrorsSorting(sorting as GLOBAL_ERROR_SORTING_CRITERION);
    setIsSortingMenuOpen(false);
  };

  const handlePageChange = (page: number) => {
    sendUserActionTrackingEvent(trackingEvents.GLOBAL_ERRORS_VIEW_PAGE_CHANGE);
    setGlobalErrorsPage(page);
  };

  const handleResetFiltersButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_RESET_FILTERS_BUTTON_CLICKED
    );
    setGlobalErrorsSearch("");
    setGlobalErrorsPage(0);
    resetGlobalErrorsSelectedFilters();
  };

  const handleDismissalViewModeButtonClick = () => {
    const newMode =
      mode === ViewMode.All ? ViewMode.OnlyDismissed : ViewMode.All;
    setGlobalErrorsViewMode(newMode);
  };

  const handleBackToAllInsightsButtonClick = () => {
    setGlobalErrorsViewMode(ViewMode.All);
  };

  const handlePinStatusToggle = () => {
    setAreAnimationsEnabled(true);
  };

  const handlePinStatusChange = (errorId: string) => {
    setLatestPinChangedId(errorId);
    getData();
  };

  const handleDismissalStatusChange = () => {
    getData();
  };

  const areAnyFiltersApplied =
    search ||
    [
      selectedFilters.services,
      selectedFilters.endpoints,
      selectedFilters.errorTypes,
      selectedFilters.criticalities,
      selectedFilters.handlingTypes
    ].some((x) => x.length > 0);

  const renderDismissBtn = () => (
    <NewButton
      buttonType={"secondaryBorderless"}
      icon={(props) => (
        <s.DismissBtnIcon
          {...props}
          crossOut={mode !== ViewMode.OnlyDismissed}
          $isDismissedMode={mode === ViewMode.OnlyDismissed}
        />
      )}
      onClick={handleDismissalViewModeButtonClick}
    />
  );

  return (
    <s.Container>
      {mode === ViewMode.OnlyDismissed && isNumber(data?.dismissedCount) && (
        <s.ViewModeToolbarRow>
          <s.BackToAllErrorsButton onClick={handleBackToAllInsightsButtonClick}>
            <s.BackToAllErrorsButtonIconContainer>
              <ChevronIcon
                direction={Direction.LEFT}
                size={16}
                color={"currentColor"}
              />
            </s.BackToAllErrorsButtonIconContainer>
            Back to All Errors
          </s.BackToAllErrorsButton>
          <s.Description>
            <s.Count>{data?.dismissedCount}</s.Count>
            dismissed {formatUnit(data?.dismissedCount ?? 0, "error")}
          </s.Description>
        </s.ViewModeToolbarRow>
      )}
      {list ? (
        <>
          <s.ToolbarContainer>
            {areGlobalErrorsFiltersEnabled && <GlobalErrorsFilters />}
            <SearchInput value={search} onChange={handleSearchInputChange} />
            {isGlobalErrorsLastDaysFilterEnabled && (
              <DaysFilter onChanged={handleDayFilterChange} />
            )}
            <NewPopover
              isOpen={isSortingMenuOpen}
              onOpenChange={setIsSortingMenuOpen}
              content={
                <Popup>
                  <MenuList items={sortingMenuItems} />
                </Popup>
              }
              placement={"bottom-end"}
            >
              <NewButton
                icon={() => (
                  <s.ButtonIconContainer>
                    <OppositeArrowsIcon size={12} color={"currentColor"} />
                  </s.ButtonIconContainer>
                )}
                label={"Sort"}
                buttonType={"secondary"}
                onClick={handleSortingMenuButtonClick}
              />
            </NewPopover>
          </s.ToolbarContainer>
          {list.length > 0 ? (
            <s.ListContainer
              ref={listContainerRef}
              isAnimationEnabled={areAnimationsEnabled}
              animationOptions={{ duration: PIN_UNPIN_ANIMATION_DURATION }}
            >
              {list.map((x) => (
                <NewErrorCard
                  key={x.id}
                  data={x}
                  onSourceLinkClick={handleErrorSourceLinkClick}
                  onPinStatusChange={handlePinStatusChange}
                  onPinStatusToggle={handlePinStatusToggle}
                  onDismissStatusChange={handleDismissalStatusChange}
                />
              ))}
            </s.ListContainer>
          ) : areAnyFiltersApplied ? (
            <NewEmptyState
              icon={CardsColoredIcon}
              title={"No errors"}
              content={
                <s.EmptyStateContent>
                  <span>
                    No data is available for the selected filters. Try resetting
                    your filters.
                  </span>
                  <NewButton
                    label={"Reset filters"}
                    onClick={handleResetFiltersButtonClick}
                  />
                </s.EmptyStateContent>
              }
            />
          ) : (
            <NoDataEmptyState />
          )}
          {list.length > 0 ? (
            <Pagination
              itemsCount={totalCount}
              page={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              extendedNavigation={true}
              withDescription={true}
            >
              {isDismissalViewModeButtonVisible && renderDismissBtn()}
            </Pagination>
          ) : isDismissalViewModeButtonVisible ? (
            renderDismissBtn()
          ) : undefined}
        </>
      ) : !environmentId ? (
        <NoDataEmptyState />
      ) : null}
    </s.Container>
  );
};
