import { forwardRef, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { SlackLogoIcon } from "../../common/icons/16px/SlackLogoIcon";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { trackingEvents } from "../tracking";
import { RegistrationPromoIcon } from "./Icons/RegistrationPromoIcon";
import { SuccessRegistration } from "./SuccessRegistration";
import * as s from "./styles";
import { RegistrationCardProps } from "./types";

const TRANSITION_CLASS_NAME = "registration-card";
const DEFAULT_TRANSITION_DURATION = 1000;

const RegistrationCardComponent = ({
  onClose,
  onComplete,
  className,
  show
}: RegistrationCardProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const registrationCardRef = useRef<HTMLDivElement>(null);

  const handleSlackLinkClick = () => {
    sendTrackingEvent(trackingEvents.PROMOTION_SLACK_LINK_CLICKED);
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const handleRegistrationClose = () => {
    onClose();
  };

  return (
    <CSSTransition
      in={show}
      timeout={DEFAULT_TRANSITION_DURATION}
      classNames={TRANSITION_CLASS_NAME}
      unmountOnExit={true}
      mountOnEnter={true}
      nodeRef={registrationCardRef}
      onEnter={() => setShowOverlay(true)}
      onExited={() => setShowOverlay(false)}
    >
      <s.CustomOverlay
        onClose={handleRegistrationClose}
        tabIndex={-1}
        $isVisible={showOverlay}
      >
        <s.Container
          $transitionClassName={TRANSITION_CLASS_NAME}
          $transitionDuration={DEFAULT_TRANSITION_DURATION}
          className={className}
          ref={registrationCardRef}
        >
          <s.CrossButton
            buttonType={"tertiary"}
            icon={() => <CrossIcon className="currentColor" size={20} />}
            onClick={onClose}
          />

          {!isFormCompleted ? (
            <>
              <div>
                <RegistrationPromoIcon />
              </div>
              <s.FormContainer>
                <s.Description>
                  Enter your email address below, and we will send you
                  instructions to access the exclusive Digma course on Udemy
                </s.Description>
                <s.Register
                  scope="promotion"
                  alwaysRenderError={true}
                  onNext={() => {
                    setIsFormCompleted(true);
                    onComplete();
                  }}
                />
              </s.FormContainer>
            </>
          ) : (
            <SuccessRegistration />
          )}

          <s.SlackLink onClick={handleSlackLinkClick}>
            <SlackLogoIcon size={14} />
            Join our Digma channel
          </s.SlackLink>
        </s.Container>
      </s.CustomOverlay>
    </CSSTransition>
  );
};

export const RegistrationCard = forwardRef(RegistrationCardComponent);
