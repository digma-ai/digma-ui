import { ReactNode, useCallback, useState } from "react";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { CodeDisplayIcon } from "../../common/icons/CodeDisplayIcon";
import { InfiniteLoopIcon } from "../../common/icons/InfiniteLoopIcon";
import { trackingEvents } from "../tracking";
import { EnvironmentType } from "../types";
import * as s from "./styles";
import { EnvironmentTypePanelProps } from "./types";

export const EnvironmentTypePanel = (props: EnvironmentTypePanelProps) => {
  const [selectedType, setSelectedType] = useState<EnvironmentType>();

  const handleMouseEnter = useCallback(
    (type: EnvironmentType) => setSelectedType(type),
    []
  );

  const handleMouseLeave = useCallback(() => setSelectedType(undefined), []);

  const handleFocus = useCallback(
    (type: EnvironmentType) => setSelectedType(type),
    []
  );
  const handleBlur = useCallback(() => setSelectedType(undefined), []);

  const handleEnvironmentTypeButtonClick = (type: EnvironmentType) => {
    const typeData = environmentTypes.find((x) => x.type === type);

    if (typeData) {
      sendTrackingEvent(trackingEvents.ENVIRONMENT_TYPE_BUTTON_CLICKED, {
        type: typeData.title
      });
    }

    props.onEnvironmentTypeSelect(props.environment.originalName, type);
  };

  const environmentTypes: {
    type: EnvironmentType;
    title: string;
    description: ReactNode;
    icon: ReactNode;
  }[] = [
    {
      type: "local",
      title: "Digma environment",
      description:
        "Define an environment for specific branches, types of tests or other criteria",
      icon: <CodeDisplayIcon />
    },
    {
      type: "shared",
      title: "CI/Prod environment",
      description:
        "Connect to centralized org systems such as CI builds, production servers etc.",
      icon: <InfiniteLoopIcon />
    }
  ];

  const getEnvironmentTypeDescription = (type: EnvironmentType) => {
    const data = environmentTypes.find((x) => x.type === type);

    if (!data) {
      return null;
    }

    return (
      <>
        <s.EnvironmentTypeDescriptionTitle>
          {data.title}
        </s.EnvironmentTypeDescriptionTitle>
        {data.description}
      </>
    );
  };

  return (
    <s.Container>
      <s.Title>Choose environment type</s.Title>
      <s.Subtitle>
        Choose which environment type you would like to create
      </s.Subtitle>
      <s.ContentContainer>
        <s.EnvironmentTypeDescription>
          {selectedType === "local" && getEnvironmentTypeDescription("local")}
        </s.EnvironmentTypeDescription>
        {environmentTypes.map((x) => (
          <s.EnvironmentTypeButton
            key={x.type}
            onClick={() => handleEnvironmentTypeButtonClick(x.type)}
            onMouseEnter={() => handleMouseEnter(x.type)}
            onMouseLeave={() => handleMouseLeave()}
            onFocus={() => handleFocus(x.type)}
            onBlur={() => handleBlur()}
          >
            <s.EnvironmentTypeIconContainer>
              {x.icon}
            </s.EnvironmentTypeIconContainer>
            {x.title}
          </s.EnvironmentTypeButton>
        ))}
        <s.EnvironmentTypeDescription>
          {selectedType === "shared" && getEnvironmentTypeDescription("shared")}
        </s.EnvironmentTypeDescription>
      </s.ContentContainer>
    </s.Container>
  );
};
