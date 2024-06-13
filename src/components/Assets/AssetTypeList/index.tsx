import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
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

export const ASSET_TYPE_IDS = [
  "Endpoint",
  "Consumer",
  "DatabaseQueries",
  "CodeLocation",
  "EndpointClient",
  "Cache",
  "Other"
];

const getData = (
  filters: AssetFilterQuery | undefined,
  searchQuery: string,
  isDirect?: boolean,
  scopedSpanCodeObjectId?: string
) => {
  window.sendMessageToDigma({
    action: actions.GET_CATEGORIES_DATA,
    payload: {
      query: {
        directOnly: isDirect,
        scopedSpanCodeObjectId,
        ...(filters ?? { services: [], operations: [], insights: [] }),
        ...(searchQuery.length > 0 ? { displayName: searchQuery } : {})
      }
    }
  });
};

const getAssetCount = (assetCategoriesData: AssetCategoriesData) =>
  assetCategoriesData.assetCategories.reduce((acc, cur) => acc + cur.count, 0);

export const AssetTypeList = (props: AssetTypeListProps) => {
  const [data, setData] = useState<AssetCategoriesData>();
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const config = useContext(ConfigContext);
  const previousEnvironment = usePrevious(config.environment);
  const refreshTimerId = useRef<number>();
  const previousFilters = usePrevious(props.filters);
  const previousSearchQuery = usePrevious(props.searchQuery);
  const previousViewScope = usePrevious(props.scopeViewOptions);

  const refreshData = useCallback(
    () =>
      getData(
        props.filters,
        props.searchQuery,
        props.scopeViewOptions?.isDirect,
        props.scopeViewOptions?.scopedSpanCodeObjectId
      ),
    [
      props.filters,
      props.scopeViewOptions?.isDirect,
      props.scopeViewOptions?.scopedSpanCodeObjectId,
      props.searchQuery
    ]
  );

  useEffect(() => {
    props.setRefresher(refreshData);
  }, [refreshData, props.setRefresher]);

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    props.filters,
    props.searchQuery
  );

  useEffect(() => {
    refreshData();
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
    if (data && previousData !== data) {
      props.onAssetCountChange(getAssetCount(data));
    }
  }, [previousData, data, props.onAssetCountChange]);

  useEffect(() => {
    if (
      (isEnvironment(previousEnvironment) &&
        previousEnvironment.id !== config.environment?.id) ||
      Boolean(previousFilters && previousFilters !== props.filters) ||
      (isString(previousSearchQuery) &&
        previousSearchQuery !== props.searchQuery) ||
      previousViewScope !== props.scopeViewOptions
    ) {
      refreshData();
    }
  }, [
    config.environment?.id,
    previousEnvironment,
    previousFilters,
    previousSearchQuery,
    previousViewScope,
    props.filters,
    props.scopeViewOptions,
    props.searchQuery,
    refreshData
  ]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        refreshData();
      }, REFRESH_INTERVAL);
    }
  }, [lastSetDataTimeStamp, previousLastSetDataTimeStamp, refreshData]);

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

    if (config.scope !== null) {
      return <NoDataMessage type={"noDataForAsset"} />;
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
