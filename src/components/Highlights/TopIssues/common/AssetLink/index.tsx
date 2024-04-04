import { actions as globalActions } from "../../../../../actions";
import { ChangeScopePayload } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import { AssetLinkProps } from "./types";

export const AssetLink = ({ asset }: AssetLinkProps) => {
  const handleAssetLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_CARD_ASSET_LINK_CLICKED
    );

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
