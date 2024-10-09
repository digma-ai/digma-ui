import { useEffect, useMemo, useRef, useState } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { useMount } from "../../../hooks/useMount";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import {
  GLOBAL_ERROR_SORTING_CRITERION,
  PAGE_SIZE
} from "../../../store/errors/errorsSlice";
import { useErrorsSelector } from "../../../store/errors/useErrorsSelector";
import { useStore } from "../../../store/useStore";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { OppositeArrowsIcon } from "../../common/icons/12px/OppositeArrowsIcon";
import { CardsColoredIcon } from "../../common/icons/CardsColoredIcon";
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
import * as s from "./styles";
import {
  GetGlobalErrorsDataPayload,
  SetGlobalErrorsDataPayload
} from "./types";

export const GlobalErrorsList = () => {
  const { goTo } = useHistory();
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const { environment } = useConfigSelector();
  const {
    globalErrorsSearch: search,
    globalErrorsSorting: sorting,
    globalErrorsPage: page,
    globalErrorsPageSize: pageSize,
    globalErrorsList: list,
    globalErrorsTotalCount: totalCount
  } = useErrorsSelector();

  const {
    setGlobalErrorsData,
    setGlobalErrorsSearch,
    setGlobalErrorsSorting,
    setGlobalErrorsPage,
    resetGlobalErrors
  } = useStore.getState();

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
      pageSize: PAGE_SIZE
    }),
    [environmentId, search, sorting, page]
  );

  const { data } = useFetchData<
    GetGlobalErrorsDataPayload,
    SetGlobalErrorsDataPayload
  >(dataFetcherConfiguration, payload);

  // Set data to store on fetch
  useEffect(() => {
    if (data) {
      setGlobalErrorsData(data);
    }
  }, [data, setGlobalErrorsData]);

  // Reset page on filters change
  useEffect(() => {
    setGlobalErrorsPage(0);
  }, [environmentId, search, setGlobalErrorsPage]);

  // Reset scroll position on filters change
  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo(0, 0);
    }
  }, [environmentId, search, sorting, page]);

  // Cleanup errors store slice on unmount
  useMount(() => {
    return () => {
      resetGlobalErrors();
    };
  });

  const handleErrorSourceLinkClick = (errorId: string) => {
    goTo(errorId);
  };

  const handleSearchInputChange = (search: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_SEARCH_CHANGED
    );
    setGlobalErrorsSearch(search);
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
  };

  const areAnyFiltersApplied = search;

  return (
    <s.Container>
      {list ? (
        list.length > 0 ? (
          <>
            <s.ToolbarContainer>
              <SearchInput value={search} onChange={handleSearchInputChange} />
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
                    <s.SortButtonIconContainer>
                      <OppositeArrowsIcon size={12} color={"currentColor"} />
                    </s.SortButtonIconContainer>
                  )}
                  label={"Sort"}
                  buttonType={"secondary"}
                  onClick={handleSortingMenuButtonClick}
                />
              </NewPopover>
            </s.ToolbarContainer>
            <s.ListContainer ref={listContainerRef}>
              {list.map((x) => (
                <NewErrorCard
                  key={x.id}
                  data={x}
                  onSourceLinkClick={handleErrorSourceLinkClick}
                />
              ))}
            </s.ListContainer>
            <Pagination
              itemsCount={totalCount}
              page={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              extendedNavigation={true}
              withDescription={true}
            />
          </>
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
        )
      ) : null}
    </s.Container>
  );
};
