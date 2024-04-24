export interface EndpointSelectedOptionProps {
  serviceName: string;
  route: string;
  spanCodeObjectId: string;
  onClick: (spanCodeObjectId: string) => void;
}
