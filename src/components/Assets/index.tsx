import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { usePrevious } from "../../hooks/usePrevious";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { useHistory } from "../Main/useHistory";
import { ConfigContext } from "../common/App/ConfigContext";
import { EmptyState } from "../common/EmptyState";
import { SearchInput } from "../common/SearchInput";
import { RefreshIcon } from "../common/icons/16px/RefreshIcon";
import { Tooltip } from "../common/v3/Tooltip";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import { AssetsFilter } from "./AssetsFilter";
import { AssetFilterQuery } from "./AssetsFilter/types";
import { AssetsViewScopeConfiguration } from "./AssetsViewScopeConfiguration";
import { AssetScopeOption } from "./AssetsViewScopeConfiguration/types";
import { NoDataMessage } from "./NoDataMessage";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import { DataRefresher } from "./types";

export const Assets = () => {
  const [assetsCount, setAssetsCount] = useState<number>();
  const params = useParams();
  const selectedAssetTypeId = useMemo(() => params.typeId, [params]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const debouncedSearchInputValue = useDebounce(searchInputValue, 1000);
  const [assetScopeOption, setAssetScopeOption] =
    useState<AssetScopeOption | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<AssetFilterQuery>();
  const config = useContext(ConfigContext);
  const previousScopeSpanCodeObjectId = usePrevious(
    config.scope?.span?.spanCodeObjectId
  );
  const [assetTypeListDataRefresher, setAssetTypeListRefresher] =
    useState<DataRefresher | null>(null);
  const [assetListDataRefresher, setAssetListRefresher] =
    useState<DataRefresher | null>(null);
  const { goTo } = useHistory();

  const isBackendUpgradeMessageVisible = false;

  useEffect(() => {
    if (!config.scope?.span) {
      setAssetScopeOption(null);
    }
  }, [config.scope]);

  useEffect(() => {
    if (
      previousScopeSpanCodeObjectId !== config.scope?.span?.spanCodeObjectId
    ) {
      setSearchInputValue("");
    }
  }, [config.scope?.span?.spanCodeObjectId, previousScopeSpanCodeObjectId]);

  const handleGoToAllAssets = () => {
    goTo("..");
  };

  const handleSearchInputChange = (val: string | null) => {
    setSearchInputValue(val ?? "");
  };

  const handleAssetTypeSelect = (assetTypeId: string) => {
    goTo(assetTypeId);
  };

  const handleApplyFilters = (filters: AssetFilterQuery) => {
    setSelectedFilters(filters);
  };

  const handleRefresh = () => {
    sendUserActionTrackingEvent(trackingEvents.REFRESH_BUTTON_CLICKED, {
      view: !selectedAssetTypeId ? "asset categories" : "assets"
    });

    const currentRefresher = !selectedAssetTypeId
      ? assetTypeListDataRefresher
      : assetListDataRefresher;

    currentRefresher && currentRefresher.refresh();
  };

  const handleAssetCountChange = useCallback((count: number) => {
    setAssetsCount(count);
  }, []);

  const handleAssetViewModeChange = useCallback((val: AssetScopeOption) => {
    setAssetScopeOption(val);
  }, []);

  const handleAssetTypeListRefresherChange = useCallback(
    (refresher: () => void) => {
      setAssetTypeListRefresher({ refresh: refresher });
    },
    []
  );

  const handleAssetListRefresherChange = useCallback(
    (refresher: () => void) => {
      setAssetListRefresher({ refresh: refresher });
    },
    []
  );

  const renderContent = () => {
    if (isBackendUpgradeMessageVisible) {
      return (
        <EmptyState
          content={
            <s.UpgradeMessage>
              <span>We&apos;ve added some new features.</span>
              <span>
                Please update the Digma Engine to the latest version using the
                action above to continue using Digma
              </span>
            </s.UpgradeMessage>
          }
        />
      );
    }

    if (!config.environments?.length) {
      return <NoDataMessage type={"noDataYet"} />;
    }

    if (!selectedFilters) {
      return <NoDataMessage type={"loading"} />;
    }

    if (!selectedAssetTypeId) {
      return (
        <AssetTypeList
          onAssetTypeSelect={handleAssetTypeSelect}
          filters={selectedFilters}
          searchQuery={debouncedSearchInputValue}
          scopeViewOptions={assetScopeOption}
          setRefresher={handleAssetTypeListRefresherChange}
          onAssetCountChange={handleAssetCountChange}
        />
      );
    }

    return (
      <AssetList
        onGoToAllAssets={handleGoToAllAssets}
        assetTypeId={selectedAssetTypeId}
        filters={selectedFilters}
        searchQuery={debouncedSearchInputValue}
        scopeViewOptions={assetScopeOption}
        setRefresher={handleAssetListRefresherChange}
        onAssetCountChange={handleAssetCountChange}
      />
    );
  };

  return (
    <s.Container>
      <s.Header>
        {config?.scope?.span && (
          <s.HeaderItem>
            <AssetsViewScopeConfiguration
              assetsCount={assetsCount}
              currentScope={config.scope}
              onAssetViewChange={handleAssetViewModeChange}
            />
          </s.HeaderItem>
        )}
        <s.HeaderItem>
          <SearchInput
            onChange={handleSearchInputChange}
            value={searchInputValue}
          />
          <AssetsFilter
            onApply={handleApplyFilters}
            filters={selectedFilters}
          />
          <Tooltip title={"Refresh"}>
            <s.RefreshButton
              buttonType={"tertiary"}
              icon={RefreshIcon}
              onClick={handleRefresh}
            />
          </Tooltip>
        </s.HeaderItem>
        {config?.scope?.span && (
          <s.HeaderItem>Assets filtered to current scope</s.HeaderItem>
        )}
      </s.Header>
      {renderContent()}
    </s.Container>
  );
};
