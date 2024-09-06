import { useCallback, useEffect, useRef, useState } from "react";
import { DigmaMessageError } from "../../../api/types";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useStore } from "../../../store/useStore";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
import { isString } from "../../../typeGuards/isString";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { SCOPE_CHANGE_EVENTS } from "../../Main/types";
import { ChildIcon } from "../../common/icons/30px/ChildIcon";
import { AssetFilterQuery } from "../AssetsFilter/types";
import { NoDataMessage } from "../NoDataMessage";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
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
  filters: AssetFilterQuery = { services: [], operations: [], insights: [] },
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
        ...(scopedSpanCodeObjectId
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
  const { scope, environment } = useConfigSelector();
  const previousEnvironment = usePrevious(environment);
  const refreshTimerId = useRef<number>();
  const previousSearchQuery = usePrevious(searchQuery);
  const previousViewScope = usePrevious(scopeViewOptions);
  const isServicesFilterEnabled = !scope?.span?.spanCodeObjectId;
  const { setShowAssetsHeader } = useStore.getState();
  const [showNoDataWithParents, setShowNoDataWithParents] = useState(false);

  const isInitialLoading = !data;

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

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    filters,
    searchQuery,
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
      const showNoDataWithParents =
        data &&
        data.parents.length > 0 &&
        data?.assetCategories.every((x) => x.count === 0);
      setShowAssetsHeader(!showNoDataWithParents);
      setShowNoDataWithParents(showNoDataWithParents);
    }
  }, [previousData, data, onAssetCountChange, setShowAssetsHeader]);

  useEffect(() => {
    if (
      (isEnvironment(previousEnvironment) &&
        previousEnvironment.id !== environment?.id) ||
      (isString(previousSearchQuery) && previousSearchQuery !== searchQuery) ||
      previousViewScope !== scopeViewOptions
    ) {
      refreshData();
    }
  }, [
    environment?.id,
    previousEnvironment,
    previousSearchQuery,
    previousViewScope,
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

  const handleAssetTypeClick = (assetTypeId: string) => {
    onAssetTypeSelect(assetTypeId);
  };

  const handleAssetLinkClick = (spanCodeObjectId: string) => {
    sendUserActionTrackingEvent(trackingEvents.ALL_ASSETS_LINK_CLICKED);
    changeScope({
      span: { spanCodeObjectId },
      context: {
        event: SCOPE_CHANGE_EVENTS.ASSETS_EMPTY_CATEGORY_PARENT_LINK_CLICKED
      }
    });
  };

  if (isInitialLoading) {
    return <NoDataMessage type={"loading"} />;
  }

  if (data?.assetCategories.every((x) => x.count === 0)) {
    if (areAnyFiltersApplied) {
      return <NoDataMessage type={"noSearchResults"} />;
    }

    if (!scope) {
      return <NoDataMessage type={"noDataYet"} />;
    }

    if (showNoDataWithParents) {
      return (
        <s.EmptyStateContainer>
          <s.StyledEmptyState
            icon={ChildIcon}
            title="No Child Assets"
            content={
              <>
                <s.EmptyStateTextContainer>
                  <span>
                    There are no child assets under this asset. You can try
                  </span>
                  <span>
                    browsing its parent spans to continue to explore the trace.
                  </span>
                </s.EmptyStateTextContainer>
                {data.parents.map((x) => (
                  <s.ParentLink
                    key={x.spanCodeObjectId}
                    onClick={() => handleAssetLinkClick(x.spanCodeObjectId)}
                  >
                    {x.displayName}
                  </s.ParentLink>
                ))}
              </>
            }
          />
        </s.EmptyStateContainer>
      );
    }

    return <NoDataMessage type={"noDataForAsset"} />;
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
