import { useCallback, useEffect, useRef, useState } from "react";
import { DigmaMessageError } from "../../../api/types";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useStore } from "../../../store/useStore";
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
  scopeSpanCodeObjectId?: string
) => {
  window.sendMessageToDigma({
    action: actions.GET_CATEGORIES_DATA,
    payload: {
      query: {
        directOnly: viewMode === "children",
        scopedSpanCodeObjectId: scopeSpanCodeObjectId,
        ...(scopeSpanCodeObjectId
          ? {
              ...filters,
              services: []
            }
          : filters),
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
  const {
    search,
    viewMode,
    filters,
    assetCategories: data
  } = useAssetsSelector();
  const { setAssetCategories: setData } = useStore.getState();
  const previousSearch = usePrevious(search);
  const previousViewMode = usePrevious(viewMode);
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const { scope, environment } = useConfigSelector();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScopeSpanCodeObjectId = usePrevious(scopeSpanCodeObjectId);
  const previousEnvironment = usePrevious(environment);
  const refreshTimerId = useRef<number>();
  const isServicesFilterEnabled = !scope?.span?.spanCodeObjectId;
  const isInitialLoading = !data;

  const refreshData = useCallback(
    () => getData(filters, search, viewMode, scopeSpanCodeObjectId),
    [filters, scopeSpanCodeObjectId, viewMode, search]
  );

  useEffect(() => {
    setRefresher(refreshData);
  }, [refreshData, setRefresher]);

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    filters,
    search,
    isServicesFilterEnabled
  );

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
