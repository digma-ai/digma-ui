import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DigmaMessageError } from "../../../api/types";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
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

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

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

export const AssetTypeList = ({
  filters,
  searchQuery,
  scopeViewOptions,
  setRefresher,
  onAssetCountChange,
  onAssetTypeSelect
}: AssetTypeListProps) => {
  const [data, setData] = useState<AssetCategoriesData>();
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const config = useContext(ConfigContext);
  const previousEnvironment = usePrevious(config.environment);
  const refreshTimerId = useRef<number>();
  const previousFilters = usePrevious(filters);
  const previousSearchQuery = usePrevious(searchQuery);
  const previousViewScope = usePrevious(scopeViewOptions);

  const refreshData = useCallback(
    () =>
      getData(
        filters,
        searchQuery,
        scopeViewOptions?.isDirect,
        scopeViewOptions?.scopedSpanCodeObjectId
      ),
    [
      filters,
      scopeViewOptions?.isDirect,
      scopeViewOptions?.scopedSpanCodeObjectId,
      searchQuery
    ]
  );

  useEffect(() => {
    setRefresher(refreshData);
  }, [refreshData, setRefresher]);

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(filters, searchQuery);

  useEffect(() => {
    refreshData();
    setIsInitialLoading(true);

    const handleCategoriesData = (
      data: unknown,
      timeStamp: number,
      error: DigmaMessageError | undefined
    ) => {
      if (!error) {
        setData(data as AssetCategoriesData);
      }
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
      onAssetCountChange(getAssetCount(data));
    }
  }, [previousData, data, onAssetCountChange]);

  useEffect(() => {
    if (
      (isEnvironment(previousEnvironment) &&
        previousEnvironment.id !== config.environment?.id) ||
      Boolean(previousFilters && previousFilters !== filters) ||
      (isString(previousSearchQuery) && previousSearchQuery !== searchQuery) ||
      previousViewScope !== scopeViewOptions
    ) {
      refreshData();
    }
  }, [
    config.environment?.id,
    previousEnvironment,
    previousFilters,
    previousSearchQuery,
    previousViewScope,
    filters,
    scopeViewOptions,
    searchQuery,
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
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  const handleAssetTypeClick = (assetTypeId: string) => {
    onAssetTypeSelect(assetTypeId);
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
