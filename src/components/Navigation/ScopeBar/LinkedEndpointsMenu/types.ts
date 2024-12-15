import type { LinkedEndpoint } from "../../SpanInfo/types";

export interface LinkedEndpointsMenuProps {
  endpoints: LinkedEndpoint[];
  onEndpointsClick: (endpoint: LinkedEndpoint) => void;
}
