import { useEffect, useMemo, useRef, useState } from "react";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components";
import type { DataFetcherConfiguration } from "../../../hooks/useFetchData";
import { useFetchData } from "../../../hooks/useFetchData";
import { useMount } from "../../../hooks/useMount";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useStore } from "../../../store/useStore";
import { SCOPE_CHANGE_EVENTS } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { Menu } from "../../common/Menu";
import { Pagination } from "../../common/Pagination";
import { Popover } from "../../common/Popover";
import { PopoverContent } from "../../common/Popover/PopoverContent";
import { PopoverTrigger } from "../../common/Popover/PopoverTrigger";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { SortIcon } from "../../common/icons/SortIcon";
import { Direction } from "../../common/icons/types";
import { EmptyState } from "../EmptyState";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import { checkIfAnyFiltersApplied, getAssetTypeInfo } from "../utils";
import { AssetEntry as AssetEntryComponent } from "./AssetEntry";
import * as s from "./styles";
import type {
  AssetEntry,
  AssetListProps,
  AssetsData,
  GetAssetsListDataPayload
} from "./types";
import { SORTING_CRITERION, SORTING_ORDER } from "./types";

const PAGE_SIZE = 10;
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds
const requestConfig: DataFetcherConfiguration = {
  requestAction: actions.GET_DATA,
  responseAction: actions.SET_DATA,
  refreshOnPayloadChange: true,
  refreshInterval: REFRESH_INTERVAL,
  refreshWithInterval: true,
  debounceDelay: 10,
  refreshWithDebounce: true,
  fetchOnMount: true
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

export const AssetList = ({
  assetTypeId,
  setRefresher,
  onGoToAllAssets
}: AssetListProps) => {
  const {
    assets: data,
    sorting,
    page,
    viewMode,
    search,
    filters
  } = useAssetsSelector();
  const {
    setAssets: setData,
    setAssetsSorting: setSorting,
    setAssetsPage: setPage,
    setShowAssetsHeaderToolBox
  } = useStore.getState();
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const theme = useTheme();
  const sortingMenuChevronColor = getSortingMenuChevronColor(theme);
  const filteredCount = data?.filteredCount ?? 0;
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    filteredCount
  );
  const listRef = useRef<HTMLUListElement>(null);

  const {
    environment,
    backendInfo,
    scope,
    selectedServices: globallySelectedServices
  } = useConfigSelector();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const isServicesFilterEnabled = !scopeSpanCodeObjectId;
  const isInitialLoading = !data;

  const payload = useMemo<GetAssetsListDataPayload>(
    () => ({
      query: {
        assetType: assetTypeId,
        page,
        pageSize: PAGE_SIZE,
        sortBy: sorting.criterion,
        sortOrder: sorting.order,
        scopedSpanCodeObjectId: scopeSpanCodeObjectId,
        ...(search.length > 0 ? { displayName: search } : {}),
        insights: filters?.insights ?? [],
        operations: [
          ...(filters?.endpoints ?? []),
          ...(filters?.consumers ?? []),
          ...(filters?.internals ?? [])
        ],
        services: scopeSpanCodeObjectId ? [] : globallySelectedServices ?? [],
        directOnly: viewMode === "children"
      }
    }),
    [
      page,
      assetTypeId,
      filters,
      globallySelectedServices,
      viewMode,
      scopeSpanCodeObjectId,
      search,
      sorting
    ]
  );

  const { data: fetchedData, getData: refreshData } = useFetchData<
    GetAssetsListDataPayload,
    AssetsData
  >(requestConfig, payload);

  useMount(() => {
    setShowAssetsHeaderToolBox(true);
  });

  useEffect(() => {
    setRefresher(refreshData);
  }, [refreshData, setRefresher]);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData, setData]);

  const entries = data?.data ?? [];
  const assetTypeInfo = getAssetTypeInfo(assetTypeId);
  const isImpactHidden = useMemo(
    () => !(backendInfo?.centralize && environment?.type === "Public"),
    [backendInfo?.centralize, environment?.type]
  );
  const sortingCriteria = useMemo(
    () => getSortingCriteria(isImpactHidden),
    [isImpactHidden]
  );

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    filters,
    search,
    isServicesFilterEnabled,
    globallySelectedServices
  );

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
  }, [isImpactHidden, sorting, setSorting]);

  useEffect(() => {
    setPage(0);
  }, [
    environment?.id,
    search,
    sorting,
    assetTypeId,
    viewMode,
    scopeSpanCodeObjectId,
    setPage
  ]);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [
    environment?.id,
    search,
    sorting,
    page,
    assetTypeId,
    viewMode,
    scopeSpanCodeObjectId
  ]);

  const handleAllAssetsLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ALL_ASSETS_LINK_CLICKED);

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

  const handleSortingOrderToggleOptionButtonClick =
    (order: SORTING_ORDER) => () => {
      setSorting({
        ...sorting,
        order
      });
    };

  const renderContent = () => {
    if (isInitialLoading) {
      return <EmptyState preset={"loading"} />;
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
    ) : areAnyFiltersApplied ? (
      search.length > 0 ? (
        <EmptyState preset={"noSearchResults"} />
      ) : (
        <EmptyState preset={"noFilteredData"} />
      )
    ) : (
      <EmptyState preset={"noData"} />
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
                  onClick={handleSortingOrderToggleOptionButtonClick(order)}
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
