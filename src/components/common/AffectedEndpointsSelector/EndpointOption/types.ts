export interface EndpointOptionProps {
  serviceName: string;
  route: string;
  spanCodeObjectId?: string;
  selected?: boolean;
  onSpanLinkClick?: (spanCodeObjectId: string) => void;
  hideCopyIcon?: boolean;
  onClick?: ((spanCodeObjectId?: string) => void) | null;
  duration?: string;
  hideDuration?: boolean;
}

export interface EndpointNameProps {
  $selected?: boolean;
  $clickable?: boolean;
}
