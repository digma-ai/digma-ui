import { MemoExoticComponent } from "react";
import { CodeMarkerPinIcon } from "../common/icons/CodeMarkerPinIcon";
import { DatabaseIcon } from "../common/icons/DatabaseIcon";
import { EndpointIcon } from "../common/icons/EndpointIcon";
import { HTTPClientIcon } from "../common/icons/HTTPClientIcon";
import { UserIcon } from "../common/icons/UserIcon";
import { IconProps } from "../common/icons/types";
import { AssetFilterQuery } from "./AssetsFilter/types";

export const getAssetTypeInfo = (
  assetTypeId: string
):
  | {
      label: string;
      icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
    }
  | undefined => {
  const assetTypeInfoMap: Record<
    string,
    {
      label: string;
      icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
    }
  > = {
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
  filters: AssetFilterQuery | undefined,
  searchQuery: string
) =>
  (filters &&
    [...filters.insights, ...filters.operations, ...filters.services].length >
      0) ||
  searchQuery.length > 0;
