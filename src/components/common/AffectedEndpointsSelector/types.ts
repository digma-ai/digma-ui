import type { Duration } from "../../../globals";

export interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  filterCount: number;
}

export interface ContainerProps {
  $isActive: boolean;
}

export interface AffectedEndpointsSelectorProps {
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  isDisabled?: boolean;
}

export interface Option {
  serviceName: string;
  route: string;
  spanCodeObjectId: string;
  duration?: Duration;
}
