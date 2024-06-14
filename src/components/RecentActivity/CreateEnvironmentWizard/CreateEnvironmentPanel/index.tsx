import { useState } from "react";
import { Overlay } from "../../../common/Overlay";
import { ChevronIcon } from "../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import { CancelConfirmation } from "../CancelConfirmation";
import { Tab } from "./Tab";
import * as s from "./styles";
import { CreateEnvironmentPanelProps } from "./types";

export const CreateEnvironmentPanel = ({
  onCancel,
  tabs,
  onBack,
  backDisabled,
  cancelDisabled
}: CreateEnvironmentPanelProps) => {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
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
            onClose={() => {
              setShowCancelConfirmation(false);
            }}
            onCancel={() => {
              setShowCancelConfirmation(false);
              onCancel();
            }}
          />
        </Overlay>
      )}
    </s.Container>
  );
};
