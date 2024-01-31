import { ChangeEvent, useContext, useLayoutEffect, useState } from "react";
import { getFeatureFlagValue } from "../../featureFlags";
import { useDebounce } from "../../hooks/useDebounce";
import { FeatureFlag } from "../../types";
import { ConfigContext } from "../common/App/ConfigContext";
import { EmptyState } from "../common/EmptyState";
import { NewCircleLoader } from "../common/NewCircleLoader";
import { MagnifierIcon } from "../common/icons/MagnifierIcon";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import { AssetsFilter } from "./AssetsFilter";
import { AssetFilterQuery } from "./AssetsFilter/types";
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
  const [selectedFilters, setSelectedFilters] = useState<AssetFilterQuery>();
  const config = useContext(ConfigContext);

  const isServiceFilterVisible = getFeatureFlagValue(
    config,
    FeatureFlag.IS_ASSETS_SERVICE_FILTER_VISIBLE
  );

  const isComplexFilterVisible = getFeatureFlagValue(
    config,
    FeatureFlag.IS_ASSETS_COMPLEX_FILTER_ENABLED
  );

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
    if (!selectedFilters && !selectedServices) {
      return <EmptyState content={<NewCircleLoader size={32} />} />;
    }

    if (!selectedAssetTypeId) {
      return (
        <AssetTypeList
          onAssetTypeSelect={handleAssetTypeSelect}
          services={selectedServices}
          filters={selectedFilters}
          searchQuery={debouncedSearchInputValue}
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
        {isComplexFilterVisible ? (
          <AssetsFilter
            onApply={handleApplyFilters}
            filters={selectedFilters}
          />
        ) : (
          isServiceFilterVisible && (
            <ServicesFilter
              onChange={handleServicesChange}
              selectedServices={selectedServices}
            />
          )
        )}
      </s.Header>
      {renderContent()}
    </s.Container>
  );
};
