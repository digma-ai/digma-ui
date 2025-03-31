import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { usePrevious } from "../../../hooks/usePrevious";
import {
  type AssetType,
  type GetAssetsCategoriesResponse
} from "../../../redux/services/types";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useStore } from "../../../store/useStore";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { SearchInput } from "../../common/SearchInput";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { Tooltip } from "../../common/v3/Tooltip";
import { AssetList } from "./../AssetList";
import { AssetTypeList } from "./../AssetTypeList";
import { AssetsFilter } from "./../AssetsFilter";
import { AssetsViewScopeConfiguration } from "./../AssetsViewScopeConfiguration";
import { EmptyState } from "./../EmptyState";
import { trackingEvents } from "./../tracking";
import * as s from "./styles";
import type { AssetsContentProps } from "./types";

const SEARCH_INPUT_DEBOUNCE_DELAY = 1000; // in milliseconds

const getAssetCategoryCount = (
  assetCategoriesData: GetAssetsCategoriesResponse | null
) =>
  assetCategoriesData?.assetCategories.reduce(
    (acc, cur) => acc + cur.count,
    0
  ) ?? 0;

// TODO: move to common
export const AssetsContent = ({
  isImpactHidden,
  spanCodeObjectId,
  environmentId,
  environments,
  sorting,
  setSorting,
  services,
  onScopeChange,
  onGoToAllAssets,
  onAssetTypeSelect,
  onRefresh,
  selectedAssetTypeId,
  areFiltersEnabled,
  className
}: AssetsContentProps) => {
  const {
    search,
    filters,
    showAssetsHeaderToolBox,
    assets,
    assetCategoriesData
  } = useAssetsSelector();
  const containerRef = useRef<HTMLDivElement>(null);
  const { setAssetsSearch: setSearch } = useStore.getState();
  const [searchInputValue, setSearchInputValue] = useState(search);
  const debouncedSearchInputValue = useDebounce(
    searchInputValue,
    SEARCH_INPUT_DEBOUNCE_DELAY
  );
  const previousSpanCodeObjectId = usePrevious(spanCodeObjectId);
  const isBackendUpgradeMessageVisible = false;

  useEffect(() => {
    if (previousSpanCodeObjectId !== spanCodeObjectId) {
      setSearchInputValue("");
    }
  }, [spanCodeObjectId, previousSpanCodeObjectId, setSearch]);

  useEffect(() => {
    setSearch(debouncedSearchInputValue);
  }, [debouncedSearchInputValue, setSearch]);

  const handleGoToAllAssets = () => {
    onGoToAllAssets();
  };

  const handleSearchInputChange = (val: string | null) => {
    setSearchInputValue(val ?? "");
  };

  const handleAssetTypeSelect = (assetTypeId: AssetType) => {
    onAssetTypeSelect(assetTypeId);
  };

  const handleRefresh = () => {
    sendUserActionTrackingEvent(trackingEvents.REFRESH_BUTTON_CLICKED, {
      view: !selectedAssetTypeId ? "asset categories" : "assets"
    });

    onRefresh();
  };

  const assetsCount = useMemo(
    () =>
      !selectedAssetTypeId
        ? getAssetCategoryCount(assetCategoriesData)
        : assets?.filteredCount,
    [assetCategoriesData, assets, selectedAssetTypeId]
  );

  const renderContent = () => {
    if (isBackendUpgradeMessageVisible) {
      return <EmptyState preset={"updateRequired"} />;
    }

    if (!environments?.length) {
      return <EmptyState preset={"noDataYet"} />;
    }

    if (areFiltersEnabled && !filters && showAssetsHeaderToolBox) {
      return <EmptyState preset={"loading"} />;
    }

    if (!selectedAssetTypeId) {
      return (
        <AssetTypeList
          onAssetTypeSelect={handleAssetTypeSelect}
          environmentId={environmentId}
          spanCodeObjectId={spanCodeObjectId}
          services={services}
        />
      );
    }

    return (
      <AssetList
        onGoToAllAssets={handleGoToAllAssets}
        assetTypeId={selectedAssetTypeId as AssetType}
        isImpactHidden={isImpactHidden}
        sorting={sorting}
        setSorting={setSorting}
        environmentId={environmentId}
        spanCodeObjectId={spanCodeObjectId}
        services={services}
        onScopeChange={onScopeChange}
      />
    );
  };

  return (
    <s.Container ref={containerRef} className={className}>
      <s.Header>
        {spanCodeObjectId && (
          <s.HeaderItem>
            <AssetsViewScopeConfiguration assetsCount={assetsCount} />
          </s.HeaderItem>
        )}
        {showAssetsHeaderToolBox && (
          <>
            <s.HeaderItem>
              <SearchInput
                onChange={handleSearchInputChange}
                value={searchInputValue}
              />
              {areFiltersEnabled && (
                <AssetsFilter popupBoundaryRef={containerRef} />
              )}
              <Tooltip title={"Refresh"}>
                <NewIconButton
                  buttonType={"secondary"}
                  icon={RefreshIcon}
                  onClick={handleRefresh}
                />
              </Tooltip>
            </s.HeaderItem>
            {spanCodeObjectId && (
              <s.HeaderItem>Assets filtered to current scope</s.HeaderItem>
            )}
          </>
        )}
      </s.Header>
      {renderContent()}
    </s.Container>
  );
};
