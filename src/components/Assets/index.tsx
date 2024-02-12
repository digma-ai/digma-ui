import {
  ChangeEvent,
  useContext,
  useLayoutEffect,
  useMemo,
  useState
} from "react";
import { lt, valid } from "semver";
import {
  featureFlagMinBackendVersions,
  getFeatureFlagValue
} from "../../featureFlags";
import { useDebounce } from "../../hooks/useDebounce";
import { FeatureFlag } from "../../types";
import { ConfigContext } from "../common/App/ConfigContext";
import { EmptyState } from "../common/EmptyState";
import { MagnifierIcon } from "../common/icons/MagnifierIcon";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import { AssetsFilter } from "./AssetsFilter";
import { AssetFilterQuery } from "./AssetsFilter/types";
import { AssetsViewScopeConfiguration } from "./AssetsViewScopeConfiguration";
import { AssetScopeOption } from "./AssetsViewScopeConfiguration/types";
import { NoDataMessage } from "./NoDataMessage";
import { ServicesFilter } from "./ServicesFilter";
import { actions } from "./actions";
import * as s from "./styles";

export const Assets = () => {
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string | null>(
    null
  );
  const [searchInputValue, setSearchInputValue] = useState("");
  const debouncedSearchInputValue = useDebounce(searchInputValue, 1000);
  const [selectedServices, setSelectedServices] = useState<string[]>();
  const [assetScopeOption, setAssetScopeOption] = useState<AssetScopeOption>();
  const [selectedFilters, setSelectedFilters] = useState<AssetFilterQuery>();
  const config = useContext(ConfigContext);

  const isServiceFilterVisible = getFeatureFlagValue(
    config,
    FeatureFlag.IS_ASSETS_SERVICE_FILTER_VISIBLE
  );

  const isComplexFilterEnabled = getFeatureFlagValue(
    config,
    FeatureFlag.IS_ASSETS_COMPLEX_FILTER_ENABLED
  );

  const isBackendUpgradeMessageVisible = useMemo(() => {
    const backendVersion = config.backendInfo?.applicationVersion;

    return Boolean(
      backendVersion &&
        valid(backendVersion) &&
        lt(
          backendVersion,
          featureFlagMinBackendVersions[
            FeatureFlag.IS_ASSETS_COMPLEX_FILTER_ENABLED
          ]
        )
    );
  }, [config]);

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  const handleBackButtonClick = () => {
    setSelectedAssetTypeId(null);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleAssetTypeSelect = (assetTypeId: string) => {
    setSelectedAssetTypeId(assetTypeId);
  };

  const handleServicesChange = (services: string[]) => {
    setSelectedServices(services);
  };

  const handleApplyFilters = (filters: AssetFilterQuery) => {
    setSelectedFilters(filters);
  };

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

    if (!selectedFilters && !selectedServices) {
      return <NoDataMessage type={"noDataYet"} />;
    }

    if (!selectedAssetTypeId) {
      return (
        <AssetTypeList
          onAssetTypeSelect={handleAssetTypeSelect}
          services={selectedServices}
          filters={selectedFilters}
          searchQuery={debouncedSearchInputValue}
          scopeViewOptions={assetScopeOption}
        />
      );
    }

    return (
      <AssetList
        onBackButtonClick={handleBackButtonClick}
        assetTypeId={selectedAssetTypeId}
        services={selectedServices}
        filters={selectedFilters}
        searchQuery={debouncedSearchInputValue}
        scopeViewOptions={assetScopeOption}
      />
    );
  };

  return (
    <s.Container>
      <s.Header>
        Assets
        {window.assetsSearch === true && (
          <s.SearchInputContainer>
            <s.SearchInputIconContainer>
              <MagnifierIcon color={"currentColor"} size={14} />
            </s.SearchInputIconContainer>
            <s.SearchInput
              placeholder={"Search"}
              onChange={handleSearchInputChange}
            />
          </s.SearchInputContainer>
        )}
        {isComplexFilterEnabled ? (
          <AssetsFilter
            onApply={handleApplyFilters}
            filters={selectedFilters}
          />
        ) : (
          // TODO: Remove this clause when the feature flag is removed
          isServiceFilterVisible && (
            <ServicesFilter
              onChange={handleServicesChange}
              selectedServices={selectedServices}
            />
          )
        )}
      </s.Header>
      {config.scope && config.scope.span && (
        <AssetsViewScopeConfiguration
          onAssetViewChanged={(val) => {
            setAssetScopeOption(val);
          }}
        />
      )}
      {renderContent()}
    </s.Container>
  );
};
