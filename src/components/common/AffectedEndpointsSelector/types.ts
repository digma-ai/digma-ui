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
  onChange: (selected: Option | null) => void;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  isDisabled?: boolean;
}

export interface Option {
  serviceName: string;
  route: string;
  spanCodeObjectId: string;
}
