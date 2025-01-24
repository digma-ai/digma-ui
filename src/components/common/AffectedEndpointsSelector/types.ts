export interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  filterCount: number;
}

export interface ContainerProps {
  $isActive: boolean;
}

export interface AffectedEndpointsSelectorProps<T> {
  value?: string;
  options: Option<T>[];
  onChange: (value: string) => void;
  onAssetLinkClick: (spanCodeObjectId: string) => void;
  isDisabled?: boolean;
}

export interface OptionBase {
  serviceName: string;
  route: string;
  spanCodeObjectId: string;
}

export type Option<T = undefined> = T extends undefined
  ? OptionBase
  : OptionBase & {
      metric: {
        value: T;
        label: string;
      };
    };
