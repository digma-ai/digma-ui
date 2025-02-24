import type { LinkedEndpoint } from "../../../../redux/services/types";

export interface LinkedEndpointsMenuProps {
  endpoints: LinkedEndpoint[];
  onEndpointsClick: (endpoint: LinkedEndpoint) => void;
}
