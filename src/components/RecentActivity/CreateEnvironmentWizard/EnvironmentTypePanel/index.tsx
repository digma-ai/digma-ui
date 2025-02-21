import { useContext } from "react";
import { CENTRAL_ON_PREM_INSTALLATION_GUIDE_URL } from "../../../../constants";
import { openURLInDefaultBrowser } from "../../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../../common/App/ConfigContext";
import type { EnvironmentType } from "../../../common/App/types";
import { IconTag } from "../../../common/IconTag";
import { CodeIcon } from "../../../common/icons/16px/CodeIcon";
import { InfinityIcon } from "../../../common/icons/InfinityIcon";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import type { EnvironmentTypeData, EnvironmentTypePanelProps } from "./types";

export const EnvironmentTypePanel = ({
  onEnvironmentTypeSelect
}: EnvironmentTypePanelProps) => {
  const config = useContext(ConfigContext);

  const handleEnvironmentTypeButtonClick = (type: EnvironmentType) => () => {
    const typeData = environmentTypes.find((x) => x.type === type);
    if (typeData) {
      sendUserActionTrackingEvent(
        trackingEvents.ENVIRONMENT_TYPE_BUTTON_CLICKED,
        {
          type: typeData.type
        }
      );
    }
    onEnvironmentTypeSelect(type);
  };

  const handleLearnMoreClick = () => {
    openURLInDefaultBrowser(CENTRAL_ON_PREM_INSTALLATION_GUIDE_URL);
  };

  const environmentTypes: EnvironmentTypeData[] = [
    {
      type: "Private",
      title: "Local environment",
      description:
        "Define an environment for specific branches, types of tests or other criteria",
      icon: CodeIcon,
      button: (
        <s.AddButton
          onClick={handleEnvironmentTypeButtonClick("Private")}
          label={"Add"}
          buttonType={"primary"}
        />
      )
    },
    {
      type: "Public",
      title: "CI/Prod environment",
      description:
        "Connect to centralized org systems such as CI builds, production servers etc.",
      icon: InfinityIcon,
      button: config.backendInfo?.centralize ? (
        <s.AddButton
          onClick={handleEnvironmentTypeButtonClick("Public")}
          label={"Add"}
          buttonType={"primary"}
        />
      ) : (
        <s.LearnMoreButton
          onClick={handleLearnMoreClick}
          label={"Learn more"}
          buttonType={"secondary"}
        />
      )
    }
  ];

  return (
    <s.Container>
      <s.Subtitle>
        Choose which environment type you would like to create
      </s.Subtitle>
      <s.ContentContainer>
        {environmentTypes.map((x) => (
          <s.EnvironmentTypeCard key={x.type}>
            <IconTag icon={x.icon} size={"large"} />
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
