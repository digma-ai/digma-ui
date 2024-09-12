import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { usePrevious } from "../../hooks/usePrevious";
import { useAssetsSelector } from "../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useStore } from "../../store/useStore";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { useHistory } from "../Main/useHistory";
import { EmptyState } from "../common/EmptyState";
import { SearchInput } from "../common/SearchInput";
import { RefreshIcon } from "../common/icons/16px/RefreshIcon";
import { NewIconButton } from "../common/v3/NewIconButton";
import { Tooltip } from "../common/v3/Tooltip";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import { AssetsFilter } from "./AssetsFilter";
import { AssetsViewScopeConfiguration } from "./AssetsViewScopeConfiguration";
import { NoDataMessage } from "./NoDataMessage";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import { DataRefresher } from "./types";

const SEARCH_INPUT_DEBOUNCE_DELAY = 1000; // in milliseconds

export const Assets = () => {
  const [assetsCount, setAssetsCount] = useState<number>();
  const params = useParams();
  const selectedAssetTypeId = useMemo(() => params.typeId, [params]);
  const { search, filters } = useAssetsSelector();
  const { setAssetsSearch: setSearch } = useStore.getState();
  const [searchInputValue, setSearchInputValue] = useState(search);
  const debouncedSearchInputValue = useDebounce(
    searchInputValue,
    SEARCH_INPUT_DEBOUNCE_DELAY
  );
  const { scope, environments } = useConfigSelector();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScopeSpanCodeObjectId = usePrevious(scopeSpanCodeObjectId);
  const [assetTypeListDataRefresher, setAssetTypeListRefresher] =
    useState<DataRefresher | null>(null);
  const [assetListDataRefresher, setAssetListRefresher] =
    useState<DataRefresher | null>(null);
  const { goTo } = useHistory();
  const isBackendUpgradeMessageVisible = false;
  const { showAssetsHeaderToolBox } = useAssetsSelector();

  useEffect(() => {
    if (previousScopeSpanCodeObjectId !== scopeSpanCodeObjectId) {
      setSearchInputValue("");
    }
  }, [scopeSpanCodeObjectId, previousScopeSpanCodeObjectId, setSearch]);

  useEffect(() => {
    setSearch(debouncedSearchInputValue);
  }, [debouncedSearchInputValue, setSearch]);

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

    const currentRefresher = !selectedAssetTypeId
      ? assetTypeListDataRefresher
      : assetListDataRefresher;

    if (currentRefresher) {
      currentRefresher.refresh();
    }
  };

  const handleAssetCountChange = useCallback((count: number) => {
    setAssetsCount(count);
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

    if (!environments?.length) {
      return <NoDataMessage type={"noDataYet"} />;
    }

    if (!filters && showAssetsHeaderToolBox) {
      return <NoDataMessage type={"loading"} />;
    }

    if (!selectedAssetTypeId) {
      return (
        <AssetTypeList
          onAssetTypeSelect={handleAssetTypeSelect}
          setRefresher={handleAssetTypeListRefresherChange}
          onAssetCountChange={handleAssetCountChange}
        />
      );
    }

    return (
      <AssetList
        onGoToAllAssets={handleGoToAllAssets}
        assetTypeId={selectedAssetTypeId}
        setRefresher={handleAssetListRefresherChange}
        onAssetCountChange={handleAssetCountChange}
      />
    );
  };

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
                  buttonType={"secondaryBorderless"}
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
