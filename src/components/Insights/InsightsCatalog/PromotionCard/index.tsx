import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Link } from "../../../common/Link";
import { CrossIcon } from "../../../common/icons/CrossIcon";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { PromotionCardProps } from "./types";

export const PromotionCard = ({
  onAccept,
  onDiscard,
  acceptBtnText,
  children,
  title,
  background,
  collapsedBackground
}: PromotionCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleDontShowButtonClick = () => {
    onDiscard();
  };

  const handleAcceptPromotionButtonClick = () => {
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
      trackingEvents.PROMOTION_OPEN_EXPANDED_VIEW_BUTTON_CLICKED
    );
    setExpanded(true);
  };

  if (!expanded) {
    return (
      <s.CollapsedContainer>
        {collapsedBackground}
        <s.CollapsedHolder>
          {title}
          <Link onClick={handleExpandClick}>See more</Link>
        </s.CollapsedHolder>
      </s.CollapsedContainer>
    );
  }

  return (
    <s.ExpandedContainer>
      <s.LogoBackground>{background}</s.LogoBackground>
      <s.Holder>
        <s.ContentContainer>
          <s.DetailsContainer>{children}</s.DetailsContainer>
          <s.ActionContainer>
            <s.AccessCourseButton
              buttonType={"primary"}
              label={acceptBtnText}
              onClick={handleAcceptPromotionButtonClick}
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
