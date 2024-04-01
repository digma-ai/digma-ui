import { actions as globalActions } from "../../../../../actions";
import { trackingEvents as globalTrackingEvents } from "../../../../../trackingEvents";
import { ChangeScopePayload } from "../../../../../types";
import { sendTrackingEvent } from "../../../../../utils/sendTrackingEvent";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import { AssetLinkProps } from "./types";

export const AssetLink = ({ asset }: AssetLinkProps) => {
  const handleAssetLinkClick = () => {
    sendTrackingEvent(globalTrackingEvents.USER_ACTION, {
      actions: trackingEvents.TOP_ISSUE_CARD_ASSET_LINK_CLICKED
    });

    window.sendMessageToDigma<ChangeScopePayload>({
      action: globalActions.CHANGE_SCOPE,
      payload: {
        span: {
          spanCodeObjectId: asset.spanCodeObjectId
        }
      }
    });
  };

  const assetName = asset.displayName;

  return (
    <Tooltip title={assetName}>
      <s.Link onClick={handleAssetLinkClick}>{assetName}</s.Link>
    </Tooltip>
  );
};
