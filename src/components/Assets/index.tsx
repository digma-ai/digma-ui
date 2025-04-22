import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useMainDispatch } from "../../containers/Main/hooks";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { digmaApi } from "../../redux/services/digma";
import {
  AssetsSortingCriterion,
  SortingOrder
} from "../../redux/services/types";
import type { AssetsFilters } from "../../store/assets/assetsSlice";
import { useAssetsSelector } from "../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useStore } from "../../store/useStore";
import { isUndefined } from "../../typeGuards/isUndefined";
import { changeScope } from "../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { useHistory } from "../Main/useHistory";
import type { Sorting } from "../common/SortingSelector/types";
import { AssetsContent } from "./AssetsContent";
import { trackingEvents } from "./tracking";

const PERSISTENCE_KEY = "assetsFiltersV2";

export const Assets = () => {
  const [persistedFilters, setPersistedFilters] = usePersistence<AssetsFilters>(
    PERSISTENCE_KEY,
    "project"
  );
  const [sorting, setSorting] = useState<Sorting<AssetsSortingCriterion>>({
    criterion: AssetsSortingCriterion.CriticalInsights,
    order: SortingOrder.Desc
  });
  const previousPersistedFilters = usePrevious(persistedFilters);
  const params = useParams();
  const selectedAssetTypeId = useMemo(() => params.typeId, [params]);
  const { filters } = useAssetsSelector();
  const { setAssetsFilters: setFilters } = useStore.getState();

  const { scope, environments, environment, backendInfo, selectedServices } =
    useConfigSelector();
  const isImpactHidden = useMemo(
    () => !(backendInfo?.centralize && environment?.type === "Public"),
    [backendInfo?.centralize, environment?.type]
  );
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const { goTo } = useHistory();
  const isInitialized = Boolean(filters);
  const dispatch = useMainDispatch();

  useEffect(() => {
    if (
      isUndefined(previousPersistedFilters) &&
      !isUndefined(persistedFilters)
    ) {
      setFilters(
        persistedFilters ?? {
          services: [],
          endpoints: [],
          consumers: [],
          internals: [],
          insights: []
        }
      );
    }
  }, [previousPersistedFilters, persistedFilters, setFilters]);

  // Update persisted filters on filters change
  useEffect(() => {
    if (isInitialized) {
      setPersistedFilters(filters);
    }
  }, [isInitialized, filters, setPersistedFilters]);

  const handleGoToAllAssets = () => {
    goTo("..");
  };

  const handleAssetTypeSelect = (assetTypeId: string) => {
    goTo(assetTypeId);
  };

  const handleRefresh = () => {
    sendUserActionTrackingEvent(trackingEvents.REFRESH_BUTTON_CLICKED, {
      view: !selectedAssetTypeId ? "asset categories" : "assets"
    });

    if (selectedAssetTypeId) {
      dispatch(digmaApi.util.invalidateTags(["Asset"]));
    } else {
      dispatch(digmaApi.util.invalidateTags(["AssetCategory"]));
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AssetsContent
      environmentId={environment?.id}
      spanCodeObjectId={scopeSpanCodeObjectId}
      services={selectedServices ?? undefined}
      sorting={sorting}
      setSorting={setSorting}
      onScopeChange={changeScope}
      onGoToAllAssets={handleGoToAllAssets}
      isImpactHidden={isImpactHidden}
      environments={environments ?? undefined}
      onRefresh={handleRefresh}
      onAssetTypeSelect={handleAssetTypeSelect}
      selectedAssetTypeId={selectedAssetTypeId}
      areFiltersEnabled={true}
    />
  );
};
