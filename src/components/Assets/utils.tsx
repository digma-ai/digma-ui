import { MemoExoticComponent } from "react";
import { CodeMarkerPinIcon } from "../common/icons/CodeMarkerPinIcon";
import { DatabaseIcon } from "../common/icons/DatabaseIcon";
import { EndpointIcon } from "../common/icons/EndpointIcon";
import { HTTPClientIcon } from "../common/icons/HTTPClientIcon";
import { UserIcon } from "../common/icons/UserIcon";
import { IconProps } from "../common/icons/types";
import { AssetFilterQuery } from "./AssetsFilter/types";

interface AssetTypeInfo {
  label: string;
  icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
}

export const getAssetTypeInfo = (
  assetTypeId: string
): AssetTypeInfo | undefined => {
  const assetTypeInfoMap: Record<string, AssetTypeInfo> = {
    Endpoint: {
      label: "Endpoints",
      icon: EndpointIcon
    },
    EndpointClient: {
      label: "HTTP Clients",
      icon: HTTPClientIcon
    },
    Consumer: {
      label: "Consumers",
      icon: UserIcon
    },
    DatabaseQueries: {
      label: "Database queries",
      icon: DatabaseIcon
    },
    CodeLocation: {
      label: "Code locations",
      icon: CodeMarkerPinIcon
    },
    Cache: {
      label: "Cache",
      icon: DatabaseIcon
    },
    Other: {
      label: "Other"
    }
  };

  return assetTypeInfoMap[assetTypeId];
};

export const checkIfAnyFiltersApplied = (
  filters: AssetFilterQuery,
  searchQuery: string,
  isServicesFilterEnabled: boolean
) =>
  Boolean(
    [
      ...filters.insights,
      ...filters.operations,
      ...(isServicesFilterEnabled ? filters.services : [])
    ].length > 0
  ) || searchQuery.length > 0;
