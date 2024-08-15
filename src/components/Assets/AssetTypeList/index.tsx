import { useCallback, useEffect, useRef, useState } from "react";
import { DigmaMessageError } from "../../../api/types";
import { useAssetsStore } from "../../../containers/Main/stores/useAssetsStore";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
import { isString } from "../../../typeGuards/isString";
import { AssetFilterQuery } from "../AssetsFilter/types";
import { ViewMode } from "../AssetsViewScopeConfiguration/types";
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
  filters: AssetFilterQuery,
  searchQuery: string,
  viewMode: ViewMode,
  scopedSpanCodeObjectId?: string
) => {
  window.sendMessageToDigma({
    action: actions.GET_CATEGORIES_DATA,
    payload: {
      query: {
        directOnly: viewMode === "children",
        scopedSpanCodeObjectId,
        filters,
        ...(searchQuery.length > 0 ? { displayName: searchQuery } : {})
      }
    }
  });
};

const getAssetCount = (data: AssetCategoryData[]) =>
  data.reduce((acc, cur) => acc + cur.count, 0);

export const AssetTypeList = ({
  setRefresher,
  onAssetCountChange,
  onAssetTypeSelect
}: AssetTypeListProps) => {
  const search = useAssetsStore.use.search();
  const previousSearch = usePrevious(search);
  const filters = useAssetsStore.use.filters();
  const data = useAssetsStore.use.assetCategories();
  const setData = useAssetsStore.use.setAssetCategories();
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const scope = useGlobalStore.use.scope();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScopeSpanCodeObjectId = usePrevious(scopeSpanCodeObjectId);
  const environment = useGlobalStore.use.environment();
  const previousEnvironment = usePrevious(environment);
  const refreshTimerId = useRef<number>();
  const viewMode = useAssetsStore.use.viewMode();
  const previousViewMode = usePrevious(viewMode);
  const isInitialLoading = !data;

  const refreshData = useCallback(
    () => getData(filters, search, viewMode, scope?.span?.spanCodeObjectId),
    [filters, scope?.span?.spanCodeObjectId, viewMode, search]
  );

  useEffect(() => {
    setRefresher(refreshData);
  }, [refreshData, setRefresher]);

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(filters, search);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    const handleCategoriesData = (
      data: unknown,
      timeStamp: number,
      error: DigmaMessageError | undefined
    ) => {
      const assetCategoriesData = data as AssetCategoriesData;
      if (!error) {
        setData(assetCategoriesData.assetCategories);
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
  }, [setData]);

  useEffect(() => {
    if (data && previousData !== data) {
      onAssetCountChange(getAssetCount(data));
    }
  }, [previousData, data, onAssetCountChange]);

  useEffect(() => {
    if (
      (isEnvironment(previousEnvironment) &&
        previousEnvironment.id !== environment?.id) ||
      (isString(previousSearch) && previousSearch !== search) ||
      previousViewMode !== viewMode ||
      previousScopeSpanCodeObjectId !== scopeSpanCodeObjectId
    ) {
      refreshData();
    }
  }, [
    environment?.id,
    previousEnvironment,
    search,
    previousSearch,
    previousScopeSpanCodeObjectId,
    scopeSpanCodeObjectId,
    viewMode,
    previousViewMode,
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

  const handleAssetTypeClick = (assetTypeId: string) => {
    onAssetTypeSelect(assetTypeId);
  };

  if (isInitialLoading) {
    return <NoDataMessage type={"loading"} />;
  }

  if (data?.every((x) => x.count === 0)) {
    if (areAnyFiltersApplied) {
      return <NoDataMessage type={"noSearchResults"} />;
    }

    if (scope !== null) {
      return <NoDataMessage type={"noDataForAsset"} />;
    }

    return <NoDataMessage type={"noDataYet"} />;
  }

  const assetTypeListItems = ASSET_TYPE_IDS.map((assetTypeId) => {
    const assetTypeData = data?.find((x) => x.name === assetTypeId);
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
