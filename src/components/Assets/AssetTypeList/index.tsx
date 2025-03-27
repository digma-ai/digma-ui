import { useEffect, useMemo, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";
import { useGetAssetsCategoriesQuery } from "../../../redux/services/digma";
import {
  AssetType,
  type GetAssetsCategoriesPayload
} from "../../../redux/services/types";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useStore } from "../../../store/useStore";
import { isNull } from "../../../typeGuards/isNull";
import { ScopeChangeEvent } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { EmptyState } from "../EmptyState";
import { trackingEvents } from "../tracking";
import { checkIfAnyFiltersApplied, getAssetTypeInfo } from "../utils";
import { AssetTypeListItem } from "./AssetTypeListItem";
import * as s from "./styles";
import type { AssetCategoryData, AssetTypeListProps } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const AssetTypeList = ({ onAssetTypeSelect }: AssetTypeListProps) => {
  const { search, viewMode, filters } = useAssetsSelector();
  const { setAssetCategoriesData: setData, setShowAssetsHeaderToolBox } =
    useStore.getState();
  const {
    scope,
    environment,
    selectedServices: globallySelectedServices
  } = useConfigSelector();
  const [showNoDataWithParents, setShowNoDataWithParents] = useState(false);

  const payload: GetAssetsCategoriesPayload = useMemo(() => {
    const operations = [
      ...(filters?.endpoints ?? []),
      ...(filters?.consumers ?? []),
      ...(filters?.internals ?? [])
    ];

    return {
      displayName: search.length > 0 ? search : undefined,
      services:
        globallySelectedServices && globallySelectedServices.length > 0
          ? globallySelectedServices.join(",")
          : undefined,
      insights:
        filters?.insights && filters?.insights.length > 0
          ? filters?.insights.join(",")
          : undefined,
      operations: operations.length > 0 ? operations.join(",") : undefined,
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId,
      directOnly: viewMode === "children",
      environment: environment?.id
    };
  }, [
    filters,
    search,
    globallySelectedServices,
    scope?.span?.spanCodeObjectId,
    viewMode,
    environment
  ]);

  const { data } = useGetAssetsCategoriesQuery(payload, {
    skip: !environment,
    pollingInterval: REFRESH_INTERVAL
  });

  const previousData = usePrevious(data);
  const isInitialLoading = !data;

  const isServicesFilterEnabled = !scope?.span?.spanCodeObjectId;
  const areAnyFiltersApplied = checkIfAnyFiltersApplied(
    filters,
    search,
    isServicesFilterEnabled,
    globallySelectedServices
  );

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

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

  const handleAssetTypeClick = (assetTypeId: string) => {
    onAssetTypeSelect(assetTypeId);
  };

  const handleAssetLinkClick = (spanCodeObjectId: string) => () => {
    sendUserActionTrackingEvent(trackingEvents.ALL_ASSETS_LINK_CLICKED);
    changeScope({
      span: { spanCodeObjectId },
      context: {
        event: ScopeChangeEvent.AssetsEmptyCategoryParentLinkClicked
      }
    });
  };

  if (isInitialLoading) {
    return <EmptyState preset={"loading"} />;
  }

  if (data?.assetCategories.every((x) => x.count === 0)) {
    if (areAnyFiltersApplied) {
      if (search.length > 0) {
        return <EmptyState preset={"noSearchResults"} />;
      }
      return <EmptyState preset={"noFilteredData"} />;
    }

    if (!scope) {
      return <EmptyState preset={"noDataYet"} />;
    }

    if (showNoDataWithParents && data.parents) {
      return (
        <EmptyState
          preset={"noChildAssets"}
          customContent={
            <>
              {data.parents.map((x) => (
                <s.ParentLink
                  key={x.spanCodeObjectId}
                  onClick={handleAssetLinkClick(x.spanCodeObjectId)}
                >
                  {x.displayName}
                </s.ParentLink>
              ))}
            </>
          }
        />
      );
    }

    return <EmptyState preset={"noDataForAsset"} />;
  }

  const assetTypeListItems = Object.values(AssetType)
    .map((assetTypeId) => {
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
    })
    .filter((x) => !isNull(x) && x.count > 0) as AssetCategoryData[];

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
