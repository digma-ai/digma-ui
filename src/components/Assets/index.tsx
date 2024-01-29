import { useContext, useLayoutEffect, useMemo, useState } from "react";
import { getFeatureFlagValue } from "../../featureFlags";
import { FeatureFlag } from "../../types";
import { ConfigContext } from "../common/App/ConfigContext";
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
  const [selectedServices, setSelectedServices] = useState<string[]>();
  const [selectedFilters, setSelectedFilters] = useState<AssetFilterQuery>();
  const config = useContext(ConfigContext);

  const isServiceFilterVisible = getFeatureFlagValue(
    config,
    FeatureFlag.IS_ASSETS_SERVICE_FILTER_VISIBLE
  );

  // const isComplexFilterVisible = getFeatureFlagValue(
  //   config,
  //   FeatureFlag.IS_ASSETS_COMPLEX_FILTER_ENABLED
  // );

  const isComplexFilterVisible = true;

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  const handleBackButtonClick = () => {
    setSelectedAssetTypeId(null);
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

  const renderContent = useMemo((): JSX.Element => {
    if (!selectedAssetTypeId) {
      return (
        <AssetTypeList
          onAssetTypeSelect={handleAssetTypeSelect}
          services={selectedServices || []}
          filters={selectedFilters}
        />
      );
    }

    return (
      <AssetList
        onBackButtonClick={handleBackButtonClick}
        assetTypeId={selectedAssetTypeId}
        services={selectedServices || []}
        filters={selectedFilters}
      />
    );
  }, [selectedFilters, selectedAssetTypeId, selectedServices]);

  return (
    <s.Container>
      <s.Header>
        Assets
        {isComplexFilterVisible ? (
          <AssetsFilter onApply={handleApplyFilters} />
        ) : (
          isServiceFilterVisible && (
            <ServicesFilter
              onChange={handleServicesChange}
              selectedServices={selectedServices}
            />
          )
        )}
      </s.Header>
      {renderContent}
    </s.Container>
  );
};
