import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { ConfigContext } from "../../common/App/ConfigContext";
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
import { Link } from "../../common/v3/Link";
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
const REFRESH_INTERVAL = isNumber(window.assetsRefreshInterval)
  ? window.assetsRefreshInterval
  : 10 * 1000; // in milliseconds

const getAssetTypeIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#788ca9";
    case "dark":
    case "dark-jetbrains":
      return "#9c9c9c";
  }
};

const getSortingMenuChevronColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

const getSortIconColor = (theme: DefaultTheme, selected: boolean) => {
  if (selected) {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }
  switch (theme.mode) {
    case "light":
      return "#828797";
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
  filters: AssetFilterQuery | undefined,
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
        ...(searchQuery && searchQuery.length > 0
          ? { displayName: searchQuery }
          : {}),
        ...(filters || {
          services: [],
          operations: [],
          insights: []
        })
      }
    }
  });
};

export const AssetList = (props: AssetListProps) => {
  const [data, setData] = useState<AssetsData>();
  const previousData = usePrevious(data);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const [sorting, setSorting] = useState<Sorting>({
    criterion: SORTING_CRITERION.CRITICAL_INSIGHTS,
    order: SORTING_ORDER.DESC
  });
  const previousSorting = usePrevious(sorting);
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const previousSearchQuery = usePrevious(props.searchQuery);
  const theme = useTheme();
  const assetTypeIconColor = getAssetTypeIconColor(theme);
  const sortingMenuChevronColor = getSortingMenuChevronColor(theme);
  const [page, setPage] = useState(0);
  const previousPage = usePrevious(page);
  const filteredCount = data?.filteredCount || 0;
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    filteredCount
  );
  const listRef = useRef<HTMLUListElement>(null);
  const config = useContext(ConfigContext);
  const refreshTimerId = useRef<number>();
  const previousEnvironment = usePrevious(config.environment);
  const previousAssetTypeId = usePrevious(props.assetTypeId);
  const previousFilters = usePrevious(props.filters);
  const previousViewScope = usePrevious(props.scopeViewOptions);

  const refreshData = useCallback(() => {
    getData(
      props.assetTypeId,
      page,
      sorting,
      props.searchQuery,
      props.filters,
      props.scopeViewOptions?.isDirect,
      props.scopeViewOptions?.scopedSpanCodeObjectId
    );
  }, [
    page,
    props.assetTypeId,
    props.filters,
    props.scopeViewOptions?.isDirect,
    props.scopeViewOptions?.scopedSpanCodeObjectId,
    props.searchQuery,
    sorting
  ]);

  const entries = data?.data || [];

  const assetTypeInfo = getAssetTypeInfo(props.assetTypeId);

  const isImpactHidden = useMemo(
    () =>
      !(
        config.backendInfo?.centralize && config.environment?.type === "Public"
      ),
    [config.backendInfo?.centralize, config.environment?.type]
  );

  const sortingCriteria = getSortingCriteria(isImpactHidden);

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    props.filters,
    props.searchQuery
  );

  useEffect(() => {
    refreshData();
    setIsInitialLoading(true);

    const handleAssetsData = (data: unknown, timeStamp: number) => {
      setData(data as AssetsData);
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
      props.onAssetCountChange(data.filteredCount);
    }
  }, [previousData, data, props.onAssetCountChange]);

  useEffect(() => {
    props.setRefresher(refreshData);
  }, [refreshData, props.setRefresher]);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== page) ||
      (isEnvironment(previousEnvironment) &&
        previousEnvironment.id !== config.environment?.id) ||
      (previousSorting && previousSorting !== sorting) ||
      (isString(previousSearchQuery) &&
        previousSearchQuery !== props.searchQuery) ||
      (isString(previousAssetTypeId) &&
        previousAssetTypeId !== props.assetTypeId) ||
      (previousFilters && previousFilters !== props.filters) ||
      previousViewScope !== props.scopeViewOptions
    ) {
      refreshData();
    }
  }, [
    config.environment?.id,
    page,
    previousAssetTypeId,
    previousEnvironment,
    previousFilters,
    previousPage,
    previousSearchQuery,
    previousSorting,
    previousViewScope,
    props.assetTypeId,
    props.filters,
    props.scopeViewOptions,
    props.searchQuery,
    refreshData,
    sorting
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
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

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
  }, [
    config.environment?.id,
    props.searchQuery,
    sorting,
    props.assetTypeId,
    props.scopeViewOptions
  ]);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [
    config.environment?.id,
    props.searchQuery,
    sorting,
    page,
    props.assetTypeId,
    props.scopeViewOptions
  ]);

  const handleAllAssetsLinkClick = () => {
    props.onGoToAllAssets();
  };

  const handleSortingMenuToggle = () => {
    setIsSortingMenuOpen(!isSortingMenuOpen);
  };

  const handleSortingMenuItemSelect = (value: string) => {
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
    window.sendMessageToDigma({
      action: actions.GO_TO_ASSET,
      payload: { spanCodeObjectId: entry.spanCodeObjectId }
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
        <s.TypeHeader>
          {assetTypeInfo?.icon && (
            <assetTypeInfo.icon color={assetTypeIconColor} size={14} />
          )}
          {assetTypeInfo?.label || props.assetTypeId}
        </s.TypeHeader>
        <Link onClick={handleAllAssetsLinkClick}>All Assets</Link>
      </s.Header>
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
                  direction={isSortingMenuOpen ? Direction.UP : Direction.DOWN}
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
            const iconColor = getSortIconColor(theme, isSelected);

            return (
              <s.SortingOrderToggleOptionButton
                key={order}
                $selected={isSelected}
                onClick={() => handleSortingOrderToggleOptionButtonClick(order)}
              >
                <s.SortingOrderIconContainer $sortingOrder={order}>
                  <SortIcon color={iconColor} size={14} />
                </s.SortingOrderIconContainer>
              </s.SortingOrderToggleOptionButton>
            );
          })}
        </s.SortingOrderToggle>
      </s.Toolbar>
      {renderContent()}
    </s.Container>
  );
};
