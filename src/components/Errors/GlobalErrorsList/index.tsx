import { useEffect, useMemo, useRef, useState } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useMount } from "../../../hooks/useMount";
import { usePrevious } from "../../../hooks/usePrevious";
import { useGetGlobalErrorsQuery } from "../../../redux/services/digma";
import {
  GlobalErrorsSortingCriterion,
  type GetGlobalErrorsPayload
} from "../../../redux/services/types";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { PAGE_SIZE, ViewMode } from "../../../store/errors/errorsSlice";
import { useErrorsSelector } from "../../../store/errors/useErrorsSelector";
import { useStore } from "../../../store/useStore";
import { isNumber } from "../../../typeGuards/isNumber";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { FeatureFlag, ScopeChangeEvent } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatUnit } from "../../../utils/formatUnit";
import { DaysFilter } from "../../common/DaysFilter";
import { OppositeArrowsIcon } from "../../common/icons/12px/OppositeArrowsIcon";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { NewPopover } from "../../common/NewPopover";
import { SearchInput } from "../../common/SearchInput";
import { NewButton } from "../../common/v3/NewButton";
import { Pagination } from "../../common/v3/Pagination";
import { useHistory } from "../../Main/useHistory";
import { MenuList } from "../../Navigation/common/MenuList";
import { Popup } from "../../Navigation/common/Popup";
import { EmptyState } from "../EmptyState";
import { NewErrorCard } from "../NewErrorCard";
import { trackingEvents } from "../tracking";
import { GlobalErrorsFilters } from "./GlobalErrorsFilters";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds
const PIN_UNPIN_ANIMATION_DURATION = 250;

export const GlobalErrorsList = () => {
  const { goTo } = useHistory();
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const [latestPinChangedId, setLatestPinChangedId] = useState<string>();
  const [areAnimationsEnabled, setAreAnimationsEnabled] = useState(false);
  const { environment, backendInfo, selectedServices } = useConfigSelector();
  const animationDelayTimerId = useRef<number>();
  const isDismissEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsGlobalErrorDismissEnabled
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
    setGlobalErrorsLastDays,
    setSelectedServices
  } = useStore.getState();

  const areGlobalErrorsFiltersEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.AreGlobalErrorsFiltersEnabled
  );

  const isGlobalErrorsLastDaysFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsGlobalErrorsLastDaysFilterEnabled
  );

  const areGlobalErrorsCriticalityAndUnhandledFiltersEnabled =
    getFeatureFlagValue(
      backendInfo,
      FeatureFlag.AreGlobalErrorsCriticalityAndUnhandledFiltersEnabled
    );

  const environmentId = environment?.id;
  const previousEnvironmentId = usePrevious(environmentId);

  const sortingMenuItems = Object.values(GlobalErrorsSortingCriterion).map(
    (x) => ({
      id: x,
      label: x,
      onClick: () => handleSortingChange(x)
    })
  );

  const payload: GetGlobalErrorsPayload = useMemo(
    () => ({
      environment: environmentId ?? "",
      searchCriteria: search,
      sortBy: sorting,
      page,
      lastDays: isNumber(lastDays) ? lastDays : undefined,
      pageSize: PAGE_SIZE,
      dismissed: mode === ViewMode.OnlyDismissed,
      ...(areGlobalErrorsFiltersEnabled
        ? {
            services: selectedServices ?? [],
            endpoints: selectedFilters?.endpoints ?? [],
            errorTypes: selectedFilters?.errorTypes ?? []
          }
        : {}),
      ...(areGlobalErrorsCriticalityAndUnhandledFiltersEnabled
        ? {
            criticalities: selectedFilters?.criticalities ?? [],
            handlingTypes: selectedFilters?.handlingTypes ?? []
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
      selectedServices,
      selectedFilters?.endpoints,
      selectedFilters?.errorTypes,
      selectedFilters?.criticalities,
      selectedFilters?.handlingTypes,
      areGlobalErrorsCriticalityAndUnhandledFiltersEnabled
    ]
  );

  const { data, refetch } = useGetGlobalErrorsQuery(payload, {
    skip: !environmentId,
    pollingInterval: REFRESH_INTERVAL
  });

  const isDismissalViewModeButtonVisible =
    isDismissEnabled &&
    data &&
    !isUndefined(data.dismissedCount) &&
    data.dismissedCount > 0;

  // Cleanup errors store slice on unmount
  useMount(() => {
    return () => {
      resetGlobalErrors();
      window.clearTimeout(animationDelayTimerId.current);
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
        animationDelayTimerId.current = window.setTimeout(() => {
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
    selectedServices,
    selectedFilters?.endpoints,
    selectedFilters?.errorTypes,
    selectedFilters?.criticalities,
    selectedFilters?.handlingTypes
  ]);

  // Reset filters on environment change
  useEffect(() => {
    if (previousEnvironmentId && environmentId !== previousEnvironmentId) {
      resetGlobalErrorsSelectedFilters();
    }
  }, [previousEnvironmentId, environmentId, resetGlobalErrorsSelectedFilters]);

  // Reset scroll position on filters change
  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo(0, 0);
    }
  }, [environmentId, search, sorting, page]);

  const handleErrorSourceLinkClick = (
    errorId: string,
    spanCodeObjectId?: string | null
  ) => {
    if (spanCodeObjectId) {
      changeScope({
        span: {
          spanCodeObjectId: spanCodeObjectId
        },
        context: {
          event: ScopeChangeEvent.ErrorCardLinkClicked,
          payload: {
            id: errorId
          }
        }
      });
    } else {
      goTo(errorId);
    }
  };

  const handleSearchInputChange = (search: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_SEARCH_CHANGED
    );
    setGlobalErrorsSearch(search);
  };

  const handleDayFilterChange = (days: number) => {
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
    setGlobalErrorsSorting(sorting as GlobalErrorsSortingCriterion);
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
    setSelectedServices([]);
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
    void refetch();
  };

  const handleDismissalStatusChange = () => {
    void refetch();
  };

  const areAnyFiltersApplied =
    search ||
    [
      selectedServices ?? [],
      selectedFilters?.endpoints ?? [],
      selectedFilters?.errorTypes ?? [],
      selectedFilters?.criticalities ?? [],
      selectedFilters?.handlingTypes ?? []
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
                direction={Direction.Left}
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
              <DaysFilter
                onChange={handleDayFilterChange}
                trackingPrefix={"global errors"}
                value={lastDays}
              />
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
            search.length > 0 ? (
              <EmptyState preset={"noSearchResults"} />
            ) : (
              <EmptyState
                preset={"noFilteredData"}
                customContent={
                  <NewButton
                    label={"Reset filters"}
                    onClick={handleResetFiltersButtonClick}
                  />
                }
              />
            )
          ) : (
            <EmptyState preset={"noData"} />
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
        <EmptyState preset={"noData"} />
      ) : null}
    </s.Container>
  );
};
