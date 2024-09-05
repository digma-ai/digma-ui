import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { DigmaMessageError } from "../../../api/types";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { trackingEvents as globalEvents } from "../../../trackingEvents";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { SCOPE_CHANGE_EVENTS } from "../../Main/types";
import { EmptyState } from "../../common/EmptyState";
import { Menu } from "../../common/Menu";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { Pagination } from "../../common/Pagination";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { SortIcon } from "../../common/icons/SortIcon";
import { Direction } from "../../common/icons/types";
import { AssetFilterQuery } from "../AssetsFilter/types";
import { actions } from "../actions";
import { checkIfAnyFiltersApplied, getAssetTypeInfo } from "../utils";
import { AssetEntry as AssetEntryComponent } from "./AssetEntry";
import * as s from "./styles";
import {
  AssetEntry,
  AssetListProps,
  AssetsData,
  SORTING_CRITERION,
  SORTING_ORDER,
  Sorting
} from "./types";

const PAGE_SIZE = 10;
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const getSortingMenuChevronColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

const getSortingCriterionInfo = (
  sortingCriterion: SORTING_CRITERION
): {
  label: string;
  defaultOrder: SORTING_ORDER;
} => {
  const sortingCriterionInfoMap = {
    [SORTING_CRITERION.CRITICAL_INSIGHTS]: {
      label: "Critical issues",
      defaultOrder: SORTING_ORDER.DESC
    },
    [SORTING_CRITERION.PERFORMANCE]: {
      label: "Performance",
      defaultOrder: SORTING_ORDER.DESC
    },
    [SORTING_CRITERION.SLOWEST_FIVE_PERCENT]: {
      label: "Slowest 5%",
      defaultOrder: SORTING_ORDER.DESC
    },
    [SORTING_CRITERION.LATEST]: {
      label: "Latest",
      defaultOrder: SORTING_ORDER.DESC
    },
    [SORTING_CRITERION.NAME]: {
      label: "Name",
      defaultOrder: SORTING_ORDER.ASC
    },
    [SORTING_CRITERION.PERFORMANCE_IMPACT]: {
      label: "Performance impact",
      defaultOrder: SORTING_ORDER.DESC
    }
  };

  return sortingCriterionInfoMap[sortingCriterion];
};

const getSortingCriteria = (isImpactHidden: boolean) =>
  Object.values(SORTING_CRITERION).filter(
    (x) => !(isImpactHidden && x === SORTING_CRITERION.PERFORMANCE_IMPACT)
  );

const getData = (
  assetTypeId: string,
  page: number,
  sorting: Sorting,
  searchQuery: string,
  filters: AssetFilterQuery = { services: [], operations: [], insights: [] },
  isDirect?: boolean,
  scopedSpanCodeObjectId?: string
) => {
  window.sendMessageToDigma({
    action: actions.GET_DATA,
    payload: {
      query: {
        assetType: assetTypeId,
        page,
        pageSize: PAGE_SIZE,
        sortBy: sorting.criterion,
        sortOrder: sorting.order,
        directOnly: isDirect,
        scopedSpanCodeObjectId,
        ...(searchQuery.length > 0 ? { displayName: searchQuery } : {}),
        ...(scopedSpanCodeObjectId ? { ...filters, services: [] } : filters)
      }
    }
  });
};

export const AssetList = ({
  searchQuery,
  assetTypeId,
  filters,
  scopeViewOptions,
  onAssetCountChange,
  setRefresher,
  onGoToAllAssets
}: AssetListProps) => {
  const [data, setData] = useState<AssetsData>();
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const [sorting, setSorting] = useState<Sorting>({
    criterion: SORTING_CRITERION.CRITICAL_INSIGHTS,
    order: SORTING_ORDER.DESC
  });
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const theme = useTheme();
  const sortingMenuChevronColor = getSortingMenuChevronColor(theme);
  const [page, setPage] = useState(0);
  const filteredCount = data?.filteredCount ?? 0;
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    filteredCount
  );
  const listRef = useRef<HTMLUListElement>(null);
  const { environment, backendInfo, scope } = useConfigSelector();
  const refreshTimerId = useRef<number>();
  const previousEnvironment = usePrevious(environment);
  const previousViewScope = usePrevious(scopeViewOptions);
  const isServicesFilterEnabled = !scope?.span?.spanCodeObjectId;

  const refreshData = useCallback(() => {
    getData(
      assetTypeId,
      page,
      sorting,
      searchQuery,
      filters,
      scopeViewOptions?.isDirect,
      scopeViewOptions?.scopedSpanCodeObjectId
    );
  }, [
    page,
    assetTypeId,
    filters,
    scopeViewOptions?.isDirect,
    scopeViewOptions?.scopedSpanCodeObjectId,
    searchQuery,
    sorting
  ]);

  const entries = data?.data ?? [];

  const assetTypeInfo = getAssetTypeInfo(assetTypeId);

  const isImpactHidden = useMemo(
    () => !(backendInfo?.centralize && environment?.type === "Public"),
    [backendInfo?.centralize, environment?.type]
  );

  const sortingCriteria = getSortingCriteria(isImpactHidden);

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    filters,
    searchQuery,
    isServicesFilterEnabled
  );

  const isInitialLoading = !data;

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    const handleAssetsData = (
      data: unknown,
      timeStamp: number,
      error: DigmaMessageError | undefined
    ) => {
      if (!error) {
        setData(data as AssetsData);
      }
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleAssetsData);

    return () => {
      dispatcher.removeActionListener(actions.SET_DATA, handleAssetsData);
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    if (data && previousData?.filteredCount !== data?.filteredCount) {
      onAssetCountChange(data.filteredCount);
    }
  }, [previousData, data, onAssetCountChange]);

  useEffect(() => {
    setRefresher(refreshData);
  }, [refreshData, setRefresher]);

  useEffect(() => {
    if (
      (isEnvironment(previousEnvironment) &&
        previousEnvironment.id !== environment?.id) ||
      previousViewScope !== scopeViewOptions
    ) {
      refreshData();
    }
  }, [
    environment?.id,
    previousEnvironment,
    previousViewScope,
    scopeViewOptions,
    refreshData
  ]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        refreshData();
      }, REFRESH_INTERVAL);
    }
  }, [lastSetDataTimeStamp, previousLastSetDataTimeStamp, refreshData]);

  useEffect(() => {
    if (
      isImpactHidden &&
      sorting.criterion === SORTING_CRITERION.PERFORMANCE_IMPACT
    ) {
      setSorting({
        criterion: SORTING_CRITERION.CRITICAL_INSIGHTS,
        order: SORTING_ORDER.DESC
      });
    }
  }, [isImpactHidden, sorting]);

  useEffect(() => {
    setPage(0);
  }, [environment?.id, searchQuery, sorting, assetTypeId, scopeViewOptions]);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [
    environment?.id,
    searchQuery,
    sorting,
    page,
    assetTypeId,
    scopeViewOptions
  ]);

  const handleAllAssetsLinkClick = () => {
    sendUserActionTrackingEvent(globalEvents.GOT_TO_ALL_ASSETS_CLICKED, {
      source: "Assets List"
    });

    onGoToAllAssets();
  };

  const handleSortingMenuToggle = () => {
    setIsSortingMenuOpen(!isSortingMenuOpen);
  };

  const handleSortingMenuItemSelect = (value: string) => {
    // TODO: fix types
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (sorting.criterion === value) {
      setSorting({
        ...sorting,
        order:
          sorting.order === SORTING_ORDER.DESC
            ? SORTING_ORDER.ASC
            : SORTING_ORDER.DESC
      });
    } else {
      setSorting({
        criterion: value as SORTING_CRITERION,
        order: getSortingCriterionInfo(value as SORTING_CRITERION).defaultOrder
      });
    }
    handleSortingMenuToggle();
  };

  const handleAssetLinkClick = (entry: AssetEntry) => {
    changeScope({
      span: {
        spanCodeObjectId: entry.spanCodeObjectId
      },
      context: {
        event: SCOPE_CHANGE_EVENTS.ASSETS_ASSET_CARD_TITLE_LINK_CLICKED
      }
    });
  };

  const handleSortingOrderToggleOptionButtonClick = (order: SORTING_ORDER) => {
    setSorting({
      ...sorting,
      order
    });
  };

  const renderContent = () => {
    if (isInitialLoading) {
      return <EmptyState content={<NewCircleLoader size={32} />} />;
    }

    return entries.length > 0 ? (
      <>
        <s.List ref={listRef}>
          {entries.map((entry) => {
            const id = `${entry.spanCodeObjectId}__${entry.services.join(",")}`;

            return (
              <AssetEntryComponent
                key={id}
                entry={entry}
                onAssetLinkClick={handleAssetLinkClick}
                sortingCriterion={sorting.criterion}
                isImpactHidden={isImpactHidden}
              />
            );
          })}
        </s.List>
        <s.Footer>
          <s.FooterItemsCount>
            Showing{" "}
            <s.FooterPageItemsCount>
              {pageStartItemNumber} - {pageEndItemNumber}
            </s.FooterPageItemsCount>{" "}
            of {filteredCount}
          </s.FooterItemsCount>
          <Pagination
            itemsCount={filteredCount}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            extendedNavigation={true}
          />
        </s.Footer>
      </>
    ) : (
      <s.NoDataText>
        {areAnyFiltersApplied ? (
          <>
            It seems there are no assets matching your selected filters at the
            moment
          </>
        ) : (
          <>
            Not seeing your data here? Maybe you&apos;re missing some
            instrumentation!
          </>
        )}
      </s.NoDataText>
    );
  };

  return (
    <s.Container>
      <s.Header>
        <s.BreadCrumb>
          <s.StyledLink onClick={handleAllAssetsLinkClick}>
            All Assets
          </s.StyledLink>
          <span>/</span>
          {assetTypeInfo?.label ?? assetTypeId}
        </s.BreadCrumb>
        <s.Toolbar>
          <s.PopoverContainer>
            <Popover
              open={isSortingMenuOpen}
              onOpenChange={setIsSortingMenuOpen}
              placement={"bottom-start"}
            >
              <PopoverTrigger onClick={handleSortingMenuToggle}>
                <s.SortingMenuButton $isOpen={isSortingMenuOpen}>
                  <span>Sort by</span>
                  <s.SortingLabel>
                    {getSortingCriterionInfo(sorting.criterion).label}
                  </s.SortingLabel>
                  <ChevronIcon
                    direction={
                      isSortingMenuOpen ? Direction.UP : Direction.DOWN
                    }
                    color={sortingMenuChevronColor}
                  />
                </s.SortingMenuButton>
              </PopoverTrigger>
              <PopoverContent className={"Popover"}>
                <Menu
                  title={"Sort by"}
                  items={sortingCriteria.map((x) => ({
                    value: x,
                    label: getSortingCriterionInfo(x).label
                  }))}
                  onSelect={handleSortingMenuItemSelect}
                />
              </PopoverContent>
            </Popover>
          </s.PopoverContainer>
          <s.SortingOrderToggle>
            {[SORTING_ORDER.DESC, SORTING_ORDER.ASC].map((order) => {
              const isSelected = sorting.order === order;

              return (
                <s.SortingOrderToggleOptionButton
                  key={order}
                  $selected={isSelected}
                  onClick={() =>
                    handleSortingOrderToggleOptionButtonClick(order)
                  }
                >
                  <s.SortingOrderIconContainer $sortingOrder={order}>
                    <SortIcon color={"currentColor"} size={14} />
                  </s.SortingOrderIconContainer>
                </s.SortingOrderToggleOptionButton>
              );
            })}
          </s.SortingOrderToggle>
        </s.Toolbar>
      </s.Header>

      {renderContent()}
    </s.Container>
  );
};
