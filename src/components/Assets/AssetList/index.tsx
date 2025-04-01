import { useEffect, useMemo, useRef, useState } from "react";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components";
import { useGetAssetsQuery } from "../../../redux/services/digma";
import {
  type AssetRecordItemRead,
  AssetsSortingCriterion,
  type GetAssetsPayload,
  SortingOrder
} from "../../../redux/services/types";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useStore } from "../../../store/useStore";
import { ScopeChangeEvent } from "../../../types";
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

// TODO: move to AssetsContent
export const AssetList = ({
  assetTypeId,
  onGoToAllAssets,
  isImpactHidden,
  sorting,
  services,
  environmentId,
  spanCodeObjectId,
  setSorting,
  onScopeChange
}: AssetListProps) => {
  const { viewMode, search, filters } = useAssetsSelector();
  const { setShowAssetsHeaderToolBox, setAssets: setData } =
    useStore.getState();
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const theme = useTheme();
  const sortingMenuChevronColor = getSortingMenuChevronColor(theme);
  const [page, setPage] = useState(0);

  const listRef = useRef<HTMLUListElement>(null);
  const isServicesFilterEnabled = !spanCodeObjectId;
  const assetTypeInfo = getAssetTypeInfo(assetTypeId);
  const sortingCriteria = useMemo(
    () => getSortingCriteria(isImpactHidden),
    [isImpactHidden]
  );
  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    filters,
    search,
    isServicesFilterEnabled,
    services
  );

  const payload: GetAssetsPayload = useMemo(() => {
    const operations = [
      ...(filters?.endpoints ?? []),
      ...(filters?.consumers ?? []),
      ...(filters?.internals ?? [])
    ];

    return {
      assetType: assetTypeId,
      page,
      pageSize: PAGE_SIZE,
      sortBy: sorting.criterion,
      sortOrder: sorting.order,
      scopedSpanCodeObjectId: spanCodeObjectId,
      displayName: search.length > 0 ? search : undefined,
      insights:
        filters?.insights && filters.insights.length > 0
          ? filters.insights.join(",")
          : undefined,
      operations: operations.length > 0 ? operations.join(",") : undefined,
      services:
        services && services.length > 0 ? services.join(",") : undefined,
      directOnly: viewMode === "children",
      environment: environmentId
    };
  }, [
    assetTypeId,
    page,
    sorting.criterion,
    sorting.order,
    spanCodeObjectId,
    services,
    search,
    filters,
    viewMode,
    environmentId
  ]);

  const { data } = useGetAssetsQuery(payload, {
    skip: !environmentId,
    pollingInterval: REFRESH_INTERVAL
  });

  const filteredCount = data?.filteredCount ?? 0;
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    filteredCount
  );
  const isInitialLoading = !data;
  const entries = data?.data ?? [];

  useEffect(() => {
    // Show filters toolbar on mount
    setShowAssetsHeaderToolBox(true);

    // Clear data on unmount
    return () => {
      setData(null);
    };
  }, [setData, setShowAssetsHeaderToolBox]);

  // Set data to store on fetch
  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  // Reset sorting if "Performance impact" sorting is not available
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

  // Reset page on filters or sorting change
  useEffect(() => {
    setPage(0);
  }, [search, sorting, viewMode, setPage]);

  // Scroll to top on filters or sorting change
  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [search, sorting, page, viewMode]);

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
    onScopeChange({
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
