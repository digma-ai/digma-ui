import { useMemo, useState } from "react";
import { useAdminDispatch } from "../../../../../../containers/Admin/hooks";
import {
  digmaApi,
  useGetAboutQuery,
  useGetEnvironmentsQuery
} from "../../../../../../redux/services/digma";
import {
  AssetsSortingCriterion,
  SortingOrder,
  type AssetType
} from "../../../../../../redux/services/types";
import { useConfigSelector } from "../../../../../../store/config/useConfigSelector";
import type { Sorting } from "../../../../../common/SortingSelector/types";
import * as s from "./styles";
import type { AssetsProps } from "./types";

export const Assets = ({
  onScopeChange,
  selectedAssetTypeId,
  onSelectedAssetTypeIdChange
}: AssetsProps) => {
  const [sorting, setSorting] = useState<Sorting<AssetsSortingCriterion>>({
    criterion: AssetsSortingCriterion.CriticalInsights,
    order: SortingOrder.Desc
  });
  const { selectedServices, scope, environment } = useConfigSelector();

  const dispatch = useAdminDispatch();

  const { data: about } = useGetAboutQuery();
  const { data: environments } = useGetEnvironmentsQuery();

  const isImpactHidden = useMemo(
    () => !(about?.isCentralize && environment?.type === "Public"),
    [about?.isCentralize, environment?.type]
  );

  const handleAssetTypeSelect = (assetTypeId: AssetType) => {
    onSelectedAssetTypeIdChange(assetTypeId);
  };

  const handleGoToAllAssets = () => {
    onSelectedAssetTypeIdChange(undefined);
  };

  const handleRefresh = () => {
    if (selectedAssetTypeId) {
      dispatch(digmaApi.util.invalidateTags(["Asset"]));
    } else {
      dispatch(digmaApi.util.invalidateTags(["AssetCategory"]));
    }
  };

  return (
    <s.Content
      environmentId={environment?.id}
      spanCodeObjectId={scope?.span?.spanCodeObjectId}
      services={selectedServices ?? undefined}
      sorting={sorting}
      setSorting={setSorting}
      onScopeChange={onScopeChange}
      onGoToAllAssets={handleGoToAllAssets}
      isImpactHidden={isImpactHidden}
      environments={environments}
      onRefresh={handleRefresh}
      onAssetTypeSelect={handleAssetTypeSelect}
      selectedAssetTypeId={selectedAssetTypeId}
    />
  );
};
