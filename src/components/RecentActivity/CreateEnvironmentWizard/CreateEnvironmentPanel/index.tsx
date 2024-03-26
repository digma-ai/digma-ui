import { ChevronIcon } from "../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
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
                key={tab.index}
                index={tab.index}
                name={tab.name}
                state={tab.state}
              />
            );
          })}
        </s.TabPanel>
        <s.CancelButton
          buttonType="secondary"
          label={"Cancel"}
          onClick={onCancel}
          isDisabled={cancelDisabled}
        />
      </s.ContentContainer>
    </s.Container>
  );
};
