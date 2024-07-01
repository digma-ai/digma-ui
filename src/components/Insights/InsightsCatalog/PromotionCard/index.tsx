import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Link } from "../../../common/Link";
import { CrossIcon } from "../../../common/icons/CrossIcon";
import { trackingEvents } from "../../tracking";
import { PromotionTag } from "./PromotionTag";
import * as s from "./styles";
import { PromotionCardProps } from "./types";

export const PromotionCard = ({ onAccept, onDiscard }: PromotionCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleDontShowButtonClick = () => {
    onDiscard();
  };

  const handleAccessCourseButtonClick = () => {
    onAccept();
  };

  const handleCollapseClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.PROMOTION_CLOSE_EXPANDED_VIEW_BUTTON_CLICKED
    );
    setExpanded(false);
  };

  const handleExpandClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.PROMOTION_CLOSE_EXPANDED_VIEW_BUTTON_CLICKED
    );
    setExpanded(true);
  };

  if (!expanded) {
    return (
      <s.CollapsedContainer>
        <s.Centered>
          <img src={"/images/promotion/collapsedContainerBackground.svg"} />
        </s.Centered>
        <s.Right>
          <img src={"/images/promotion/collapsedContainerEllipseShadow.svg"} />
        </s.Right>
        <s.CollapsedHolder>
          <s.PromoText>
            Get our <s.PromoTextBold>FREE Udemy course</s.PromoTextBold>
          </s.PromoText>
          <Link onClick={handleExpandClick}>See more</Link>
        </s.CollapsedHolder>
      </s.CollapsedContainer>
    );
  }

  return (
    <s.ExpandedContainer>
      <s.LogoBackground>
        <img src={`/images/promotion/promotionLogo.svg`} />
        <s.AnimatedPromotionBackground>
          <img src={`/images/promotion/promotionLogoWithShadow.svg`} />
        </s.AnimatedPromotionBackground>
      </s.LogoBackground>
      <s.Holder>
        <s.ContentContainer>
          <s.DetailsContainer>
            <PromotionTag />
            <s.Description>
              <span>Learn how to get more out of Digma</span>
              <span>issues</span>
            </s.Description>
          </s.DetailsContainer>
          <s.ActionContainer>
            <s.AccessCourseButton
              buttonType={"primary"}
              label={"Access course"}
              onClick={handleAccessCourseButtonClick}
            />
            <s.DontShowButton
              buttonType={"tertiary"}
              label={"Don't show it again"}
              onClick={handleDontShowButtonClick}
            />
          </s.ActionContainer>
        </s.ContentContainer>
        <s.CrossButton
          buttonType={"tertiary"}
          icon={CrossIcon}
          onClick={handleCollapseClick}
        />
      </s.Holder>
    </s.ExpandedContainer>
  );
};
