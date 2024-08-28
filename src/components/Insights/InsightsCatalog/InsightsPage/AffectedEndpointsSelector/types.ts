import { InsightType } from "../../../../../types";

export interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  filterCount: number;
}

export interface ContainerProps {
  $isActive: boolean;
}

export interface AffectedEndpointsSelectorProps {
  insightType: InsightType;
  value?: string;
  options: Option[];
  onChange: (selected: Option | null) => void;

  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
}

export interface Option {
  serviceName: string;
  route: string;
  spanCodeObjectId: string;
}
