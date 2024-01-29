import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { dispatcher } from "../../../dispatcher";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useDebounce } from "../../../hooks/useDebounce";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { FeatureFlag } from "../../../types";
import { ConfigContext } from "../../common/App/ConfigContext";
import { EmptyState } from "../../common/EmptyState";
import { Menu } from "../../common/Menu";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { Pagination } from "../../common/Pagination";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { MagnifierIcon } from "../../common/icons/MagnifierIcon";
import { SortIcon } from "../../common/icons/SortIcon";
import { Direction } from "../../common/icons/types";
import { actions } from "../actions";
import { getAssetTypeInfo } from "../utils";
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

const getBackIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4D668A";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

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
      label: "Critical insights",
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
    },
    [SORTING_CRITERION.OVERALL_IMPACT]: {
      label: "Overall impact",
      defaultOrder: SORTING_ORDER.DESC
    }
  };

  return sortingCriterionInfoMap[sortingCriterion];
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
  const [searchInputValue, setSearchInputValue] = useState("");
  const debouncedSearchInputValue = useDebounce(searchInputValue, 1000);
  const previousDebouncedSearchInputValue = usePrevious(
    debouncedSearchInputValue
  );
  const theme = useTheme();
  const backIconColor = getBackIconColor(theme);
  const assetTypeIconColor = getAssetTypeIconColor(theme);
  const sortingMenuChevronColor = getSortingMenuChevronColor(theme);
  const searchInputIconColor = sortingMenuChevronColor;
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
  const previousServices = usePrevious(props.services);
  const previousFilters = usePrevious(props.filters);

  const entries = data?.data || [];

  const assetTypeInfo = getAssetTypeInfo(props.assetTypeId);

  const isOverallImpactHidden = getFeatureFlagValue(
    config,
    FeatureFlag.IS_ASSETS_OVERALL_IMPACT_HIDDEN
  );

  const sortingCriteria = isOverallImpactHidden
    ? Object.values(SORTING_CRITERION).filter(
        (x) => x !== SORTING_CRITERION.OVERALL_IMPACT
      )
    : Object.values(SORTING_CRITERION);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DATA,
      payload: {
        query: {
          assetType: props.assetTypeId,
          page,
          pageSize: PAGE_SIZE,
          sortBy: sorting.criterion,
          sortOrder: sorting.order,
          ...(debouncedSearchInputValue.length > 0
            ? { displayName: debouncedSearchInputValue }
            : {}),
          ...(props.filters || { services: props.services })
        }
      }
    });
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
    if (
      ((isNumber(previousPage) && previousPage !== page) ||
        (isString(previousEnvironment) &&
          previousEnvironment !== config.environment) ||
        (previousSorting && previousSorting !== sorting) ||
        (isString(previousDebouncedSearchInputValue) &&
          previousDebouncedSearchInputValue !== debouncedSearchInputValue) ||
        (isString(previousAssetTypeId) &&
          previousAssetTypeId !== props.assetTypeId) ||
        (Array.isArray(previousServices) &&
          previousServices !== props.services),
      previousFilters && previousFilters !== props.filters)
    ) {
      window.sendMessageToDigma({
        action: actions.GET_DATA,
        payload: {
          query: {
            assetType: props.assetTypeId,
            page,
            pageSize: PAGE_SIZE,
            sortBy: sorting.criterion,
            sortOrder: sorting.order,
            ...(debouncedSearchInputValue.length > 0
              ? { displayName: debouncedSearchInputValue }
              : {}),
            ...(props.filters || { services: props.services })
          }
        }
      });
    }
  }, [
    props.assetTypeId,
    previousAssetTypeId,
    previousDebouncedSearchInputValue,
    debouncedSearchInputValue,
    previousSorting,
    sorting,
    previousPage,
    page,
    previousEnvironment,
    config.environment,
    props.services,
    previousServices,
    props.filters,
    previousFilters
  ]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        window.sendMessageToDigma({
          action: actions.GET_DATA,
          payload: {
            query: {
              assetType: props.assetTypeId,
              page,
              pageSize: PAGE_SIZE,
              sortBy: sorting.criterion,
              sortOrder: sorting.order,
              ...(debouncedSearchInputValue.length > 0
                ? { displayName: debouncedSearchInputValue }
                : {}),
              ...(props.filters || { services: props.services })
            }
          }
        });
      }, REFRESH_INTERVAL);
    }
  }, [
    lastSetDataTimeStamp,
    previousLastSetDataTimeStamp,
    props.assetTypeId,
    page,
    sorting,
    debouncedSearchInputValue,
    config.environment,
    props.services,
    props.filters
  ]);

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
    setPage(0);
  }, [
    config.environment,
    debouncedSearchInputValue,
    sorting,
    props.assetTypeId
  ]);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [
    config.environment,
    debouncedSearchInputValue,
    sorting,
    page,
    props.assetTypeId
  ]);

  const handleBackButtonClick = () => {
    props.onBackButtonClick();
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
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
        Not seeing your data here? Maybe you&apos;re missing some
        instrumentation!
      </s.NoDataText>
    );
  };

  return (
    <s.Container>
      <s.Header>
        <s.BackButton onClick={handleBackButtonClick}>
          <ChevronIcon
            direction={Direction.LEFT}
            color={backIconColor}
            size={14}
          />
        </s.BackButton>
        {assetTypeInfo?.icon && (
          <assetTypeInfo.icon color={assetTypeIconColor} size={14} />
        )}
        <span>{assetTypeInfo?.label || props.assetTypeId}</span>
        {data && <s.ItemsCount>{data.totalCount}</s.ItemsCount>}
      </s.Header>
      <s.Toolbar>
        {window.assetsSearch === true && (
          <s.SearchInputContainer>
            <s.SearchInputIconContainer>
              <MagnifierIcon color={searchInputIconColor} size={14} />
            </s.SearchInputIconContainer>
            <s.SearchInput
              placeholder={"Search"}
              onChange={handleSearchInputChange}
            />
          </s.SearchInputContainer>
        )}
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
