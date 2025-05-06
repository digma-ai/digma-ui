import { useEffect, useState } from "react";
import { actions as globalActions } from "../../../../actions";
import { dispatcher } from "../../../../dispatcher";
import { useNow } from "../../../../hooks/useNow";
import { usePersistence } from "../../../../hooks/usePersistence";
import { PLUGIN_EVENTS } from "../../../../pluginEvents";
import type { SendPluginEventPayload } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents as mainTrackingEvents } from "../../../Main/tracking";
import { ToolbarRow } from "../styles";
import { EarlyAccessPromotion } from "./Promotions/EarlyAccessPromotion";
import { UdemyPromotion } from "./Promotions/UdemyPromotion";
import type { EarlyAccessPromotionDetails, PromotionType } from "./types";

const EARLY_ACCESS_PROMOTION_PERSISTENCE_KEY = "EARLY_ACCESS_PROMOTION";

const PROMOTION_PERSISTENCE_KEY = "PROMOTION";
const PROMOTION_COMPLETED_PERSISTENCE_KEY = "PROMOTION_COMPLETED";
const PROMOTION_INTERVAL_DAYS = 30;
const INTERVAL_BETWEEN_PROMOTIONS_DAYS = 1;

const isPromotionEnabled = (
  dismissalDate: number | null | undefined,
  now: number
) => dateReachesInterval(PROMOTION_INTERVAL_DAYS, dismissalDate, now);

const dateReachesInterval = (
  days: number,
  dismissalDate: number | null | undefined,
  now: number
) => {
  const interval = days * 24 * 60 * 60 * 1000; // in milliseconds
  return !dismissalDate || Math.abs(dismissalDate - now) > interval;
};

export const PromotionSection = () => {
  const [showPromotion, setShowPromotion] = useState<PromotionType>("udemy");

  const now = useNow();

  const [earlyAccessPromotionDetails, setEarlyAccessPromotionDetails] =
    usePersistence<EarlyAccessPromotionDetails>(
      EARLY_ACCESS_PROMOTION_PERSISTENCE_KEY,
      "application"
    );

  const [udemyPromotionCompleted, setUdemyPromotionCompleted] =
    usePersistence<boolean>(PROMOTION_COMPLETED_PERSISTENCE_KEY, "application");
  const [udemyDismissalDate, setUdemyDismissalDate] = usePersistence<number>(
    PROMOTION_PERSISTENCE_KEY,
    "application"
  );

  useEffect(() => {
    const handlePluginEvent = (data: unknown) => {
      const { name } = data as SendPluginEventPayload;

      if (name !== PLUGIN_EVENTS.SHOW_EARLY_ACCESS_PROMOTION) {
        return;
      }

      if (earlyAccessPromotionDetails?.completionDate) {
        return;
      }

      if (
        earlyAccessPromotionDetails?.dismissalDate &&
        !isPromotionEnabled(earlyAccessPromotionDetails.dismissalDate, now)
      ) {
        return;
      }

      setShowPromotion("early-access");
    };

    dispatcher.addActionListener(
      globalActions.SEND_PLUGIN_EVENT,
      handlePluginEvent
    );

    return () => {
      dispatcher.removeActionListener(
        globalActions.SEND_PLUGIN_EVENT,
        handlePluginEvent
      );
    };
  }, [
    earlyAccessPromotionDetails?.completionDate,
    earlyAccessPromotionDetails?.dismissalDate,
    setShowPromotion,
    now
  ]);

  const handleUdemyRegistrationComplete = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_FORM_SUBMITTED,
      { source: showPromotion }
    );
    setUdemyPromotionCompleted(true);
  };

  const handleEarlyAccessRegistrationComplete = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_REGISTRATION_FORM_SUBMITTED,
      { source: showPromotion }
    );
    setEarlyAccessPromotionDetails({
      ...earlyAccessPromotionDetails,
      isCompleted: true,
      completionDate: Date.now()
    });
  };

  const handleCancelConfirmationAccept = () => {
    sendUserActionTrackingEvent(
      mainTrackingEvents.PROMOTION_CANCEL_CONFIRMATION_ACCEPT_CLICKED,
      { source: showPromotion }
    );

    if (showPromotion === "udemy") {
      setUdemyDismissalDate(Date.now());
    } else if (showPromotion === "early-access") {
      setEarlyAccessPromotionDetails({
        isCompleted: false,
        dismissalDate: Date.now()
      });
    }
  };

  const isUdemyPromotionVisible =
    !udemyPromotionCompleted &&
    isPromotionEnabled(udemyDismissalDate, now) &&
    showPromotion === "udemy" &&
    (!earlyAccessPromotionDetails?.isCompleted ||
      (earlyAccessPromotionDetails.isCompleted &&
        dateReachesInterval(
          INTERVAL_BETWEEN_PROMOTIONS_DAYS,
          earlyAccessPromotionDetails.completionDate,
          now
        )));

  const isEarlyAccessPromotionIsVisible =
    !earlyAccessPromotionDetails?.isCompleted &&
    showPromotion === "early-access" &&
    isPromotionEnabled(earlyAccessPromotionDetails?.dismissalDate, now);

  return (
    <ToolbarRow>
      <UdemyPromotion
        onAccept={handleUdemyRegistrationComplete}
        onDiscard={handleCancelConfirmationAccept}
        isVisible={isUdemyPromotionVisible}
      />

      <EarlyAccessPromotion
        onAccept={handleEarlyAccessRegistrationComplete}
        onDiscard={handleCancelConfirmationAccept}
        isVisible={isEarlyAccessPromotionIsVisible}
      />
    </ToolbarRow>
  );
};
