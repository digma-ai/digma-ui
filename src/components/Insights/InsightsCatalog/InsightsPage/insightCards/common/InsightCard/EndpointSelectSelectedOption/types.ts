export interface EndpointSelectSelectedOptionProps {
  serviceName: string;
  route: string;
  spanCodeObjectId: string;
  onClick: (spanCodeObjectId: string) => void;
}
