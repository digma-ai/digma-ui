import { actions as globalActions } from "../../../../actions";
import { trackingEvents as globalTrackingEvents } from "../../../../trackingEvents";
import { ChangeScopePayload } from "../../../../types";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { sendTrackingEvent } from "../../../../utils/sendTrackingEvent";
import { InfoCircleIcon } from "../../../common/icons/InfoCircleIcon";
import { Card } from "../../../common/v3/Card";
import { Link } from "../../../common/v3/Link";
import { Tooltip } from "../../../common/v3/Tooltip";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { HighlightCardProps } from "./types";

export const HighlightCard = ({ highlight, content }: HighlightCardProps) => {
  const insightTypeInfo = getInsightTypeInfo(highlight.insightType);

  const handleAssetLinkClick = () => {
    sendTrackingEvent(globalTrackingEvents.USER_ACTION, {
      actions: trackingEvents.TOP_ISSUE_CARD_ASSET_LINK_CLICKED
    });

    window.sendMessageToDigma<ChangeScopePayload>({
      action: globalActions.CHANGE_SCOPE,
      payload: {
        span: {
          spanCodeObjectId: highlight.asset.spanCodeObjectId
        }
      }
    });
  };

  const assetName = highlight.asset.displayName;

  return (
    <Card
      header={
        <s.Header>
          {insightTypeInfo?.label}
          {insightTypeInfo?.description && (
            <Tooltip title={<insightTypeInfo.description />}>
              <s.InfoContainer>
                <InfoCircleIcon color={"currentColor"} size={12} />
              </s.InfoContainer>
            </Tooltip>
          )}
        </s.Header>
      }
      content={
        <s.ContentContainer>
          <s.AssetNameContainer>
            Asset
            <Tooltip title={assetName}>
              <Link onClick={handleAssetLinkClick}>{assetName}</Link>
            </Tooltip>
          </s.AssetNameContainer>
          {content}
        </s.ContentContainer>
      }
    />
  );
};
