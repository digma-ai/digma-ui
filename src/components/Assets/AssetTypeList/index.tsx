import { useCallback, useEffect, useRef, useState } from "react";
import type { DigmaMessageError } from "../../../api/types";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import type { AssetsFilters } from "../../../store/assets/assetsSlice";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useStore } from "../../../store/useStore";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
import { isString } from "../../../typeGuards/isString";
import { SCOPE_CHANGE_EVENTS } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ChildIcon } from "../../common/icons/30px/ChildIcon";
import type { ViewMode } from "../AssetsViewScopeConfiguration/types";
import { NoDataMessage } from "../NoDataMessage";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import { checkIfAnyFiltersApplied, getAssetTypeInfo } from "../utils";
import { AssetTypeListItem } from "./AssetTypeListItem";
import * as s from "./styles";
import type {
  AssetCategoriesData,
  AssetCategoryData,
  AssetTypeListProps,
  GetAssetCategoriesDataPayload
} from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const ASSET_TYPE_IDS = [
  "Endpoint",
  "Consumer",
  "InternalOperation",
  "DatabaseQueries",
  "CodeLocation",
  "EndpointClient",
  "Cache",
  "Other"
];

const getData = (
  filters: AssetsFilters | null,
  globallySelectedServices: string[] | null,
  searchQuery: string,
  viewMode: ViewMode,
  scopeSpanCodeObjectId?: string
) => {
  window.sendMessageToDigma<GetAssetCategoriesDataPayload>({
    action: actions.GET_CATEGORIES_DATA,
    payload: {
      query: {
        directOnly: viewMode === "children",
        scopedSpanCodeObjectId: scopeSpanCodeObjectId,
        ...{
          insights: filters?.insights ?? [],
          operations: [
            ...(filters?.endpoints ?? []),
            ...(filters?.consumers ?? []),
            ...(filters?.internals ?? [])
          ],
          services: scopeSpanCodeObjectId ? [] : globallySelectedServices ?? []
        },
        ...(searchQuery.length > 0 ? { displayName: searchQuery } : {})
      }
    }
  });
};

export const AssetTypeList = ({
  setRefresher,
  onAssetTypeSelect
}: AssetTypeListProps) => {
  const {
    search,
    viewMode,
    filters,
    assetCategoriesData: data
  } = useAssetsSelector();
  const { setAssetCategoriesData: setData, setShowAssetsHeaderToolBox } =
    useStore.getState();
  const previousSearch = usePrevious(search);
  const previousViewMode = usePrevious(viewMode);
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const {
    scope,
    environment,
    selectedServices: globallySelectedServices
  } = useConfigSelector();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScopeSpanCodeObjectId = usePrevious(scopeSpanCodeObjectId);
  const previousEnvironment = usePrevious(environment);
  const refreshTimerId = useRef<number>();
  const isServicesFilterEnabled = !scope?.span?.spanCodeObjectId;
  const [showNoDataWithParents, setShowNoDataWithParents] = useState(false);

  const isInitialLoading = !data;

  const refreshData = useCallback(
    () =>
      getData(
        filters,
        globallySelectedServices,
        search,
        viewMode,
        scopeSpanCodeObjectId
      ),
    [filters, globallySelectedServices, scopeSpanCodeObjectId, viewMode, search]
  );

  useEffect(() => {
    setRefresher(refreshData);
  }, [refreshData, setRefresher]);

  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    filters,
    search,
    isServicesFilterEnabled,
    globallySelectedServices
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
  }, [setData]);

  useEffect(() => {
    if (data && previousData !== data) {
      const showNoDataWithParents = Boolean(
        data?.parents &&
          data.parents.length > 0 &&
          data?.assetCategories.every((x) => x.count === 0)
      );
      setShowAssetsHeaderToolBox(!showNoDataWithParents);
      setShowNoDataWithParents(showNoDataWithParents);
    }
  }, [previousData, data, setShowAssetsHeaderToolBox]);

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

    if (showNoDataWithParents && data.parents) {
      return (
        <s.EmptyStateContainer>
          <s.StyledEmptyState
            icon={ChildIcon}
            title={"No Child Assets"}
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
