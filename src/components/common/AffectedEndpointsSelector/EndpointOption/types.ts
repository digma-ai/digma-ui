export interface EndpointOptionProps<T> {
  serviceName: string;
  route: string;
  spanCodeObjectId?: string;
  selected?: boolean;
  onSpanLinkClick?: (spanCodeObjectId: string) => void;
  hideCopyIcon?: boolean;
  onClick?: ((spanCodeObjectId?: string) => void) | null;
  metric?: {
    value: T;
    label: string;
  };
  isHeader?: boolean;
}

export interface EndpointNameProps {
  $selected?: boolean;
  $clickable?: boolean;
}
