import { ForwardedRef, forwardRef, useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { Link } from "../../../../common/Link";
import { CrossIcon } from "../../../../common/icons/CrossIcon";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import { PromotionCardProps } from "./types";

const PromotionCardComponent = (
  {
    onAccept,
    onDiscard,
    acceptBtnText,
    children,
    title,
    background,
    collapsedBackground,
    className,
    scope
  }: PromotionCardProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [expanded, setExpanded] = useState(false);

  const handleDontShowButtonClick = () => {
    onDiscard();
  };

  const handleAcceptPromotionButtonClick = () => {
    onAccept();
  };

  const handleCollapseClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.PROMOTION_CLOSE_EXPANDED_VIEW_BUTTON_CLICKED,
      { scope }
    );
    setExpanded(false);
  };

  const handleExpandClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.PROMOTION_OPEN_EXPANDED_VIEW_BUTTON_CLICKED,
      { scope }
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
        <s.ContentContainer className={className} ref={ref}>
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
          buttonType={"secondaryBorderless"}
          icon={CrossIcon}
          onClick={handleCollapseClick}
        />
      </s.Holder>
    </s.ExpandedContainer>
  );
};

export const PromotionCard = forwardRef(PromotionCardComponent);
