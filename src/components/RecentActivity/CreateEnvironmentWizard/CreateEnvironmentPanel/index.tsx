import { Tab } from "./Tab";
import * as s from "./styles";
import { CreateEnvironmentPanelProps } from "./types";

export const CreateEnvironmentPanel = ({
  onCancel,
  tabs
}: CreateEnvironmentPanelProps) => {
  return (
    <s.Container>
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
        />
      </s.ContentContainer>
    </s.Container>
  );
};
