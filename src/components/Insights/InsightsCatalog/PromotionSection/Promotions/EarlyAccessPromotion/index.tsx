import { useState } from "react";
import { createPortal } from "react-dom";
import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { CancelConfirmation } from "../../../../../common/CancelConfirmation";
import { MAIN_CONTAINER_ID } from "../../../../../Main";
import { EarlyAccessRegistrationCard } from "../../../../../Main/RegistrationCard/EarlyAccessRegistrationCard";
import { MainOverlay } from "../../../../../Main/styles";
import { trackingEvents as mainTrackingEvents } from "../../../../../Main/tracking";
import { EarlyAccessPromotionCard } from "../../PromotionCard/EarlyAccessPromotionCard";
import type { PromotionProps } from "../types";

export const EarlyAccessPromotion = ({
  onDiscard,
  onAccept,
  isVisible
}: PromotionProps) => {
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const mainContainer = document.getElementById(MAIN_CONTAINER_ID);

  const handleRegistrationComplete = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.EARLY_ACCESS_PROMOTION_REGISTRATION_FORM_SUBMITTED
    );
    onAccept();
  };

  const handleRegistrationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.EARLY_ACCESS_PROMOTION_REGISTRATION_CLOSE_BUTTON_CLICKED
    );
    setShowRegistration(false);
  };

  const handlePromotionAccept = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.EARLY_ACCESS_PROMOTION_REGISTRATION_FORM_OPENED
    );
    setShowRegistration(true);
  };

  const handlePromotionDiscard = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.EARLY_ACCESS_PROMOTION_DISCARDED
    );
    setShowDiscardConfirmation(true);
  };

  const handleConfirmationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.EARLY_ACCESS_PROMOTION_CANCEL_CONFIRMATION_CLOSE_CLICKED
    );
    setShowDiscardConfirmation(false);
  };

  const handleCancelConfirmationClose = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.EARLY_ACCESS_PROMOTION_CANCEL_CONFIRMATION_CLOSE_CLICKED
    );
    setShowDiscardConfirmation(false);
  };

  const handleCancelConfirmationAccept = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.EARLY_ACCESS_PROMOTION_CANCEL_CONFIRMATION_ACCEPT_CLICKED
    );
    onDiscard();
    setShowDiscardConfirmation(false);
  };

  return (
    <>
      {isVisible && (
        <EarlyAccessPromotionCard
          onAccept={handlePromotionAccept}
          onDiscard={handlePromotionDiscard}
        />
      )}

      {mainContainer &&
        createPortal(
          <EarlyAccessRegistrationCard
            onClose={handleRegistrationClose}
            onComplete={handleRegistrationComplete}
            show={showRegistration}
          />,
          mainContainer
        )}

      {mainContainer &&
        showDiscardConfirmation &&
        createPortal(
          <MainOverlay onClose={handleConfirmationClose} tabIndex={-1}>
            <CancelConfirmation
              header={"Discard offer?"}
              description={
                "Are you sure you want to miss out on this exclusive, limited-time offer?"
              }
              confirmBtnText={"Yes, discard"}
              onClose={handleCancelConfirmationClose}
              onConfirm={handleCancelConfirmationAccept}
            />
          </MainOverlay>,
          mainContainer
        )}
    </>
  );
};
