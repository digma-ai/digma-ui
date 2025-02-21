import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { HTTPClientIcon } from "../../../common/icons/HTTPClientIcon";
import { MenuList } from "../../common/MenuList";
import type { LinkedEndpoint } from "../../SpanInfo/types";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import type { LinkedEndpointsMenuProps } from "./types";

export const LinkedEndpointsMenu = ({
  endpoints,
  onEndpointsClick
}: LinkedEndpointsMenuProps) => {
  const handleMenuItemClick = (endpoint: LinkedEndpoint) => () => {
    sendUserActionTrackingEvent(trackingEvents.CODE_LOCATION_SELECTED);
    onEndpointsClick(endpoint);
  };

  return (
    <s.Container>
      <s.Title>This client assets calls the following endpoint:</s.Title>
      <MenuList
        items={endpoints.map((x) => ({
          id: x.spanCodeObjectId,
          customContent: (
            <s.MenuItem onClick={handleMenuItemClick(x)}>
              <HTTPClientIcon size={12} color={"currentColor"} />
              <span>{x.displayName}</span>
            </s.MenuItem>
          ),
          disabled: false
        }))}
      />
    </s.Container>
  );
};
