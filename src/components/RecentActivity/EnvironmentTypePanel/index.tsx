import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { NewButton } from "../../common/NewButton";
import { CodeIcon } from "../../common/icons/CodeIcon";
import { InfinityIcon } from "../../common/icons/InfinityIcon";
import { trackingEvents } from "../tracking";
import { EnvironmentType } from "../types";
import * as s from "./styles";
import { EnvironmentTypeData, EnvironmentTypePanelProps } from "./types";

export const EnvironmentTypePanel = (props: EnvironmentTypePanelProps) => {
  const handleEnvironmentTypeButtonClick = (type: EnvironmentType) => {
    const typeData = environmentTypes.find((x) => x.type === type);

    if (typeData) {
      sendTrackingEvent(trackingEvents.ENVIRONMENT_TYPE_BUTTON_CLICKED, {
        type: typeData.title
      });
    }

    props.onEnvironmentTypeSelect(props.environment.originalName, type);
  };

  const environmentTypes: EnvironmentTypeData[] = [
    {
      type: "local",
      title: "Local environment",
      description:
        "Define an environment for specific branches, types of tests or other criteria",
      icon: <CodeIcon size={16} color={"currentColor"} />,
      button: (
        <NewButton
          onClick={() => handleEnvironmentTypeButtonClick("local")}
          label={"Add"}
          buttonType={"primary"}
          size={"large"}
        />
      )
    },
    {
      type: "shared",
      title: "CI/Prod environment",
      description:
        "Connect to centralized org systems such as CI builds, production servers etc.",
      icon: <InfinityIcon size={16} color={"currentColor"} />,
      button: (
        <NewButton
          onClick={() => handleEnvironmentTypeButtonClick("shared")}
          label={"Learn more"}
          buttonType={"secondary"}
          size={"large"}
        />
      )
    }
  ];

  return (
    <s.Container>
      <s.Title>Choose environment type</s.Title>
      <s.Subtitle>
        Choose which environment type you would like to create
      </s.Subtitle>
      <s.ContentContainer>
        {environmentTypes.map((x) => (
          <s.EnvironmentTypeCard key={x.type}>
            <s.EnvironmentTypeIconContainer>
              {x.icon}
            </s.EnvironmentTypeIconContainer>
            <s.EnvironmentTypeTextContainer>
              <s.EnvironmentTypeTitle>{x.title}</s.EnvironmentTypeTitle>
              {x.description}
            </s.EnvironmentTypeTextContainer>
            {x.button}
          </s.EnvironmentTypeCard>
        ))}
      </s.ContentContainer>
    </s.Container>
  );
};
