import { useContext } from "react";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { EnvironmentType } from "../../common/App/types";
import { IconTag } from "../../common/IconTag";
import { CodeIcon } from "../../common/icons/16px/CodeIcon";
import { InfinityIcon } from "../../common/icons/InfinityIcon";
import { Button } from "../../common/v3/Button";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentTypeData, EnvironmentTypePanelProps } from "./types";

const DIGMA_FOR_TEAMS_URL = "https://digma.ai/digma-for-teams/";

export const EnvironmentTypePanel = (props: EnvironmentTypePanelProps) => {
  const config = useContext(ConfigContext);

  const handleEnvironmentTypeButtonClick = (type: EnvironmentType) => {
    const typeData = environmentTypes.find((x) => x.type === type);

    if (typeData) {
      sendTrackingEvent(trackingEvents.ENVIRONMENT_TYPE_BUTTON_CLICKED, {
        type: typeData.title
      });
    }

    if (type === "shared" && !config.backendInfo?.isCentralized) {
      openURLInDefaultBrowser(DIGMA_FOR_TEAMS_URL);
      return;
    }

    props.onEnvironmentTypeSelect(type);
  };

  const environmentTypes: EnvironmentTypeData[] = [
    {
      type: "local",
      title: "Local environment",
      description:
        "Define an environment for specific branches, types of tests or other criteria",
      icon: CodeIcon,
      button: (
        <s.AddButton
          onClick={() => handleEnvironmentTypeButtonClick("local")}
          label={"Add"}
          buttonType={"primary"}
        />
      )
    },
    {
      type: "shared",
      title: "CI/Prod environment",
      description:
        "Connect to centralized org systems such as CI builds, production servers etc.",
      icon: InfinityIcon,
      button: (
        <Button
          onClick={() => handleEnvironmentTypeButtonClick("shared")}
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
