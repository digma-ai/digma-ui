import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePrevious } from "../../../hooks/usePrevious";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { FeatureFlag } from "../../../types";
import { ConfigContext } from "../../common/App/ConfigContext";
import { AssetFilterQuery } from "../AssetsFilter/types";
import { NoDataMessage } from "../NoDataMessage";
import { actions } from "../actions";
import { checkIfAnyFiltersApplied, getAssetTypeInfo } from "../utils";
import { AssetTypeListItem } from "./AssetTypeListItem";
import * as s from "./styles";
import {
  AssetCategoriesData,
  AssetCategoryData,
  AssetTypeListProps
} from "./types";

const REFRESH_INTERVAL = isNumber(window.assetsRefreshInterval)
  ? window.assetsRefreshInterval
  : 10 * 1000; // in milliseconds

const ASSET_TYPE_IDS = [
  "Endpoint",
  "Consumer",
  "DatabaseQueries",
  "CodeLocation",
  "EndpointClient",
  "Other"
];

const getData = (
  filters: AssetFilterQuery | undefined,
  services: string[] | undefined,
  searchQuery: string,
  isComplexFilterEnabled: boolean,
  isDirect?: boolean,
  scopedSpanCodeObjectId?: string
) => {
  window.sendMessageToDigma({
    action: actions.GET_CATEGORIES_DATA,
    payload: {
      query: {
        directOnly: isDirect,
        scopedSpanCodeObjectId,
        ...(isComplexFilterEnabled
          ? filters || { services: [], operations: [], insights: [] }
          : { services: services || [] }),
        ...(searchQuery.length > 0 ? { displayName: searchQuery } : {})
      }
    }
  });
};

export const AssetTypeList = (props: AssetTypeListProps) => {
  const [data, setData] = useState<AssetCategoriesData>();
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const config = useContext(ConfigContext);
  const previousEnvironment = usePrevious(config.environment);
  const refreshTimerId = useRef<number>();
  const previousServices = usePrevious(props.services);
  const previousFilters = usePrevious(props.filters);
  const previousSearchQuery = usePrevious(props.searchQuery);
  const previousViewScope = usePrevious(props.scopeViewOptions);

  const isComplexFilterEnabled = useMemo(
    () =>
      Boolean(
        getFeatureFlagValue(
          config,
          FeatureFlag.IS_ASSETS_COMPLEX_FILTER_ENABLED
        )
      ),
    [config]
  );

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    isComplexFilterEnabled,
    props.filters,
    props.services,
    props.searchQuery
  );

  useEffect(() => {
    getData(
      props.filters,
      props.services,
      props.searchQuery,
      isComplexFilterEnabled,
      props.scopeViewOptions?.isDirect,
      props.scopeViewOptions?.scopedSpanCodeObjectId
    );
    setIsInitialLoading(true);

    const handleCategoriesData = (data: unknown, timeStamp: number) => {
      setData(data as AssetCategoriesData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      actions.SET_CATEGORIES_DATA,
      handleCategoriesData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CATEGORIES_DATA,
        handleCategoriesData
      );
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    if (
      (isEnvironment(previousEnvironment) &&
        previousEnvironment.originalName !==
          config.environment?.originalName) ||
      (Array.isArray(previousServices) &&
        previousServices !== props.services) ||
      (previousFilters && previousFilters !== props.filters) ||
      (isString(previousSearchQuery) &&
        previousSearchQuery !== props.searchQuery) ||
      previousViewScope !== props.scopeViewOptions
    ) {
      getData(
        props.filters,
        props.services,
        props.searchQuery,
        isComplexFilterEnabled,
        props.scopeViewOptions?.isDirect,
        props.scopeViewOptions?.scopedSpanCodeObjectId
      );
    }
  }, [
    previousEnvironment,
    config.environment,
    previousServices,
    props.services,
    previousFilters,
    props.filters,
    previousSearchQuery,
    props.searchQuery,
    isComplexFilterEnabled,
    props.scopeViewOptions,
    previousViewScope
  ]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        getData(
          props.filters,
          props.services,
          props.searchQuery,
          isComplexFilterEnabled,
          props.scopeViewOptions?.isDirect,
          props.scopeViewOptions?.scopedSpanCodeObjectId
        );
      }, REFRESH_INTERVAL);
    }
  }, [
    props.services,
    previousLastSetDataTimeStamp,
    lastSetDataTimeStamp,
    props.filters,
    props.searchQuery,
    isComplexFilterEnabled,
    props.scopeViewOptions
  ]);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  const handleAssetTypeClick = (assetTypeId: string) => {
    props.onAssetTypeSelect(assetTypeId);
  };

  if (isInitialLoading) {
    return <NoDataMessage type={"loading"} />;
  }

  if (data?.assetCategories.every((x) => x.count === 0)) {
    if (areAnyFiltersApplied) {
      return <NoDataMessage type={"noSearchResults"} />;
    }

    return <NoDataMessage type={"noDataYet"} />;
  }

  const assetTypeListItems = ASSET_TYPE_IDS.map((assetTypeId) => {
    const assetTypeData = data?.assetCategories.find(
      (x) => x.name === assetTypeId
    );
    const assetTypeInfo = getAssetTypeInfo(assetTypeId);

    if (assetTypeData && assetTypeInfo) {
      return {
        ...assetTypeData,
        ...assetTypeInfo
      };
    }

    return null;
  }).filter((x) => !isNull(x) && x.count > 0) as AssetCategoryData[];

  return (
    <s.List>
      {assetTypeListItems.map((x) => (
        <AssetTypeListItem
          id={x.name}
          key={x.name}
          icon={x?.icon}
          entryCount={x.count}
          label={x.label}
          onAssetTypeClick={handleAssetTypeClick}
        />
      ))}
    </s.List>
  );
};
