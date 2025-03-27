import { ScopeChangeEvent } from "../../../../../types";
import { changeScope } from "../../../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { Link } from "../../../../common/v3/Link";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import type { AssetLinkProps } from "./types";

export const AssetLink = ({ asset }: AssetLinkProps) => {
  const handleAssetLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_CARD_ASSET_LINK_CLICKED
    );

    changeScope({
      span: {
        spanCodeObjectId: asset.spanCodeObjectId
      },
      context: {
        event: ScopeChangeEvent.HighlightsTopIssuesCardAssetLinkClicked
      }
    });
  };

  const assetName = asset.displayName;

  return (
    <Tooltip title={assetName}>
      <s.Container>
        <Link onClick={handleAssetLinkClick}>{assetName}</Link>
        <s.StyledCopyButton text={assetName} />
      </s.Container>
    </Tooltip>
  );
};
