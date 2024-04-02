import { useContext } from "react";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { EnvironmentType } from "../../common/App/types";
import { IconTag } from "../../common/IconTag";
import { CodeIcon } from "../../common/icons/16px/CodeIcon";
import { InfinityIcon } from "../../common/icons/InfinityIcon";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentTypeData, EnvironmentTypePanelProps } from "./types";

const DIGMA_FOR_TEAMS_URL = "https://digma.ai/digma-for-teams/";

export const EnvironmentTypePanel = (props: EnvironmentTypePanelProps) => {
  const config = useContext(ConfigContext);

  const handleEnvironmentTypeButtonClick = (type: EnvironmentType) => {
    const typeData = environmentTypes.find((x) => x.type === type);

    if (typeData) {
      sendUserActionTrackingEvent(
        trackingEvents.ENVIRONMENT_TYPE_BUTTON_CLICKED,
        {
          type: typeData.title
        }
      );
    }

    if (type === "Public" && !config.backendInfo?.isCentralized) {
      openURLInDefaultBrowser(DIGMA_FOR_TEAMS_URL);
      return;
    }

    props.onEnvironmentTypeSelect(type);
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
          onClick={() => handleEnvironmentTypeButtonClick("Private")}
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
      button: (
        <s.AddButton
          onClick={() => handleEnvironmentTypeButtonClick("Public")}
          label={config.backendInfo?.isCentralized ? "Add" : "Learn more"}
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
