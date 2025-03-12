import { useEffect, useMemo, useRef, useState } from "react";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components";
import { useMount } from "../../../hooks/useMount";
import { useGetAssetsQuery } from "../../../redux/services/digma";
import {
  type AssetRecordItemRead,
  AssetsSortingCriterion,
  type GetAssetsPayload,
  SortingOrder
} from "../../../redux/services/types";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useStore } from "../../../store/useStore";
import { ScopeChangeEvent } from "../../../types";
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
import { trackingEvents } from "../tracking";
import { checkIfAnyFiltersApplied, getAssetTypeInfo } from "../utils";
import { AssetEntry } from "./AssetEntry";
import * as s from "./styles";
import type { AssetListProps } from "./types";

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
  sortingCriterion: AssetsSortingCriterion
): {
  label: string;
  defaultOrder: SortingOrder;
} => {
  const sortingCriterionInfoMap = {
    [AssetsSortingCriterion.CriticalInsights]: {
      label: "Critical issues",
      defaultOrder: SortingOrder.Desc
    },
    [AssetsSortingCriterion.Performance]: {
      label: "Performance",
      defaultOrder: SortingOrder.Desc
    },
    [AssetsSortingCriterion.SlowestFivePercent]: {
      label: "Slowest 5%",
      defaultOrder: SortingOrder.Desc
    },
    [AssetsSortingCriterion.Latest]: {
      label: "Latest",
      defaultOrder: SortingOrder.Desc
    },
    [AssetsSortingCriterion.Name]: {
      label: "Name",
      defaultOrder: SortingOrder.Asc
    },
    [AssetsSortingCriterion.PerformanceImpact]: {
      label: "Performance impact",
      defaultOrder: SortingOrder.Desc
    }
  };

  return sortingCriterionInfoMap[sortingCriterion];
};

const getSortingCriteria = (isImpactHidden: boolean) =>
  Object.values(AssetsSortingCriterion).filter(
    (x) => !(isImpactHidden && x === AssetsSortingCriterion.PerformanceImpact)
  );

export const AssetList = ({ assetTypeId, onGoToAllAssets }: AssetListProps) => {
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

  const payload: GetAssetsPayload = useMemo(() => {
    const operations = [
      ...(filters?.endpoints ?? []),
      ...(filters?.consumers ?? []),
      ...(filters?.internals ?? [])
    ];
    const services = globallySelectedServices ?? [];

    return {
      assetType: assetTypeId,
      page,
      pageSize: PAGE_SIZE,
      sortBy: sorting.criterion,
      sortOrder: sorting.order,
      scopedSpanCodeObjectId: scopeSpanCodeObjectId,
      displayName: search.length > 0 ? search : undefined,
      insights:
        filters?.insights && filters.insights.length > 0
          ? filters.insights.join(",")
          : undefined,
      operations: operations.length > 0 ? operations.join(",") : undefined,
      services: scopeSpanCodeObjectId
        ? undefined
        : services.length > 0
        ? services.join(",")
        : undefined,
      directOnly: viewMode === "children",
      environment: environment?.id
    };
  }, [
    assetTypeId,
    page,
    sorting.criterion,
    sorting.order,
    scopeSpanCodeObjectId,
    globallySelectedServices,
    search,
    filters,
    viewMode,
    environment
  ]);

  const { data: fetchedData } = useGetAssetsQuery(payload, {
    skip: !environment,
    pollingInterval: REFRESH_INTERVAL
  });

  useMount(() => {
    setShowAssetsHeaderToolBox(true);
  });

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
      sorting.criterion === AssetsSortingCriterion.PerformanceImpact
    ) {
      setSorting({
        criterion: AssetsSortingCriterion.CriticalInsights,
        order: SortingOrder.Desc
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

  const handleSortingMenuItemSelect = (value: AssetsSortingCriterion) => {
    if (sorting.criterion === value) {
      setSorting({
        ...sorting,
        order:
          sorting.order === SortingOrder.Desc
            ? SortingOrder.Asc
            : SortingOrder.Desc
      });
    } else {
      setSorting({
        criterion: value,
        order: getSortingCriterionInfo(value).defaultOrder
      });
    }
    handleSortingMenuToggle();
  };

  const handleAssetLinkClick = (entry: AssetRecordItemRead) => {
    changeScope({
      span: {
        spanCodeObjectId: entry.spanCodeObjectId
      },
      context: {
        event: ScopeChangeEvent.AssetsAssetCardTitleLinkClicked
      }
    });
  };

  const handleSortingOrderToggleOptionButtonClick =
    (order: SortingOrder) => () => {
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
              <AssetEntry
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
                      isSortingMenuOpen ? Direction.Up : Direction.Down
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
            {[SortingOrder.Desc, SortingOrder.Asc].map((order) => {
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
