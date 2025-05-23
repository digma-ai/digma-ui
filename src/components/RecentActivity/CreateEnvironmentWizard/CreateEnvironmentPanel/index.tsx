import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Overlay } from "../../../common/Overlay";
import { ChevronIcon } from "../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import { CancelConfirmationDialog } from "../CancelConfirmationDialog";
import { trackingEvents } from "../tracking";
import { Tab } from "./Tab";
import * as s from "./styles";
import type { CreateEnvironmentPanelProps } from "./types";

export const CreateEnvironmentPanel = ({
  onCancel,
  tabs,
  onBack,
  backDisabled,
  cancelDisabled,
  isPanelTitleVisible,
  isCancelConfirmationEnabled
}: CreateEnvironmentPanelProps) => {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const handleCancelButtonClick = () => {
    if (isCancelConfirmationEnabled) {
      setShowCancelConfirmation(true);
    } else {
      onCancel();
    }
  };

  const handleOverlayClose = () => {
    setShowCancelConfirmation(false);
  };

  const handleConfirmationClose = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CREATE_ENVIRONMENT_CANCEL_CONFIRMATION_CLOSE_CLICKED
    );
    setShowCancelConfirmation(false);
  };

  const handleConfirmationAccept = () => {
    setShowCancelConfirmation(false);
    sendUserActionTrackingEvent(
      trackingEvents.CREATE_ENVIRONMENT_CANCEL_CONFIRMATION_CONFIRM_CLICKED
    );
    onCancel();
  };

  return (
    <s.Container>
      <s.BackButton
        buttonType={"tertiary"}
        label={"Back"}
        isDisabled={backDisabled}
        onClick={onBack}
        icon={(props) => <ChevronIcon {...props} direction={Direction.Left} />}
      />
      <s.Divider />
      {isPanelTitleVisible && (
        <>
          <s.Header>Add New Environment</s.Header>
          <s.Divider />
        </>
      )}
      <s.ContentContainer>
        <s.TabPanel>
          {tabs.map((tab) => {
            return (
              <Tab
                key={tab.name}
                index={tab.index}
                name={tab.name}
                state={tab.state}
              />
            );
          })}
        </s.TabPanel>
        <s.CancelButton
          buttonType={"secondary"}
          label={"Cancel"}
          onClick={handleCancelButtonClick}
          isDisabled={cancelDisabled}
        />
      </s.ContentContainer>
      {showCancelConfirmation && (
        <Overlay onClose={handleOverlayClose} tabIndex={-1}>
          <CancelConfirmationDialog
            onClose={handleConfirmationClose}
            onConfirm={handleConfirmationAccept}
          />
        </Overlay>
      )}
    </s.Container>
  );
};
