import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useMainDispatch } from "../../containers/Main/hooks";
import { useDebounce } from "../../hooks/useDebounce";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { digmaApi } from "../../redux/services/digma";
import type {
  AssetType,
  GetAssetsCategoriesResponse
} from "../../redux/services/types";
import type { AssetsFilters } from "../../store/assets/assetsSlice";
import { useAssetsSelector } from "../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useStore } from "../../store/useStore";
import { isUndefined } from "../../typeGuards/isUndefined";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { useHistory } from "../Main/useHistory";
import { SearchInput } from "../common/SearchInput";
import { RefreshIcon } from "../common/icons/16px/RefreshIcon";
import { NewIconButton } from "../common/v3/NewIconButton";
import { Tooltip } from "../common/v3/Tooltip";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import { AssetsFilter } from "./AssetsFilter";
import { AssetsViewScopeConfiguration } from "./AssetsViewScopeConfiguration";
import { EmptyState } from "./EmptyState";
import * as s from "./styles";
import { trackingEvents } from "./tracking";

const PERSISTENCE_KEY = "assetsFiltersV2";
const SEARCH_INPUT_DEBOUNCE_DELAY = 1000; // in milliseconds

const getAssetCategoryCount = (
  assetCategoriesData: GetAssetsCategoriesResponse | null
) =>
  assetCategoriesData?.assetCategories.reduce(
    (acc, cur) => acc + cur.count,
    0
  ) ?? 0;

export const Assets = () => {
  const [persistedFilters, setPersistedFilters] = usePersistence<AssetsFilters>(
    PERSISTENCE_KEY,
    "project"
  );
  const previousPersistedFilters = usePrevious(persistedFilters);
  const params = useParams();
  const selectedAssetTypeId = useMemo(() => params.typeId, [params]);
  const { search, filters, assets, assetCategoriesData } = useAssetsSelector();
  const { setAssetsSearch: setSearch, setAssetsFilters: setFilters } =
    useStore.getState();
  const [searchInputValue, setSearchInputValue] = useState(search);
  const debouncedSearchInputValue = useDebounce(
    searchInputValue,
    SEARCH_INPUT_DEBOUNCE_DELAY
  );
  const { scope, environments } = useConfigSelector();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScopeSpanCodeObjectId = usePrevious(scopeSpanCodeObjectId);
  const { goTo } = useHistory();
  const isBackendUpgradeMessageVisible = false;
  const { showAssetsHeaderToolBox } = useAssetsSelector();
  const isInitialized = Boolean(filters);
  const dispatch = useMainDispatch();

  useEffect(() => {
    if (previousScopeSpanCodeObjectId !== scopeSpanCodeObjectId) {
      setSearchInputValue("");
    }
  }, [scopeSpanCodeObjectId, previousScopeSpanCodeObjectId, setSearch]);

  useEffect(() => {
    setSearch(debouncedSearchInputValue);
  }, [debouncedSearchInputValue, setSearch]);

  useEffect(() => {
    if (
      isUndefined(previousPersistedFilters) &&
      !isUndefined(persistedFilters)
    ) {
      setFilters(
        persistedFilters ?? {
          services: [],
          endpoints: [],
          consumers: [],
          internals: [],
          insights: []
        }
      );
    }
  }, [previousPersistedFilters, persistedFilters, setFilters]);

  // Update persisted filters on filters change
  useEffect(() => {
    if (isInitialized) {
      setPersistedFilters(filters);
    }
  }, [isInitialized, filters, setPersistedFilters]);

  const handleGoToAllAssets = () => {
    goTo("..");
  };

  const handleSearchInputChange = (val: string | null) => {
    setSearchInputValue(val ?? "");
  };

  const handleAssetTypeSelect = (assetTypeId: string) => {
    goTo(assetTypeId);
  };

  const handleRefresh = () => {
    sendUserActionTrackingEvent(trackingEvents.REFRESH_BUTTON_CLICKED, {
      view: !selectedAssetTypeId ? "asset categories" : "assets"
    });

    if (selectedAssetTypeId) {
      dispatch(digmaApi.util.invalidateTags(["Asset"]));
    } else {
      dispatch(digmaApi.util.invalidateTags(["AssetCategory"]));
    }
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

    if (!filters && showAssetsHeaderToolBox) {
      return <EmptyState preset={"loading"} />;
    }

    if (!selectedAssetTypeId) {
      return <AssetTypeList onAssetTypeSelect={handleAssetTypeSelect} />;
    }

    return (
      <AssetList
        onGoToAllAssets={handleGoToAllAssets}
        assetTypeId={selectedAssetTypeId as AssetType}
      />
    );
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <s.Container>
      <s.Header>
        {scope?.span && (
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
              <AssetsFilter />
              <Tooltip title={"Refresh"}>
                <NewIconButton
                  buttonType={"secondary"}
                  icon={RefreshIcon}
                  onClick={handleRefresh}
                />
              </Tooltip>
            </s.HeaderItem>
            {scope?.span && (
              <s.HeaderItem>Assets filtered to current scope</s.HeaderItem>
            )}
          </>
        )}
      </s.Header>
      {renderContent()}
    </s.Container>
  );
};
