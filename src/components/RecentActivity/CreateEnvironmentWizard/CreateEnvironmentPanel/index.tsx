import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CancelConfirmation } from "../../../common/CancelConfirmation";
import { Overlay } from "../../../common/Overlay";
import { ChevronIcon } from "../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import { trackingEvents } from "../../tracking";
import { Tab } from "./Tab";
import * as s from "./styles";
import type { CreateEnvironmentPanelProps } from "./types";

export const CreateEnvironmentPanel = ({
  onCancel,
  tabs,
  onBack,
  backDisabled,
  cancelDisabled
}: CreateEnvironmentPanelProps) => {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
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
        icon={(props) => <ChevronIcon {...props} direction={Direction.LEFT} />}
      />
      <s.Divider />
      <s.Header>Add New Environment</s.Header>
      <s.Divider />
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
          onClick={() => setShowCancelConfirmation(true)}
          isDisabled={cancelDisabled}
        />
      </s.ContentContainer>
      {showCancelConfirmation && (
        <Overlay onClose={() => setShowCancelConfirmation(false)} tabIndex={-1}>
          <CancelConfirmation
            header={"Discard adding a new Environment?"}
            description={
              "Are you sure that you want to stop adding new environment?"
            }
            onClose={handleConfirmationClose}
            onCancel={handleConfirmationAccept}
          />
        </Overlay>
      )}
    </s.Container>
  );
};
