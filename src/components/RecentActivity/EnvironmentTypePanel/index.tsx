import { ReactNode, useCallback, useState } from "react";
import { CodeDisplayIcon } from "../../common/icons/CodeDisplayIcon";
import { InfiniteLoopIcon } from "../../common/icons/InfiniteLoopIcon";
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
    props.onEnvironmentTypeSelect(type);
  };

  const environmentTypes: {
    type: EnvironmentType;
    title: string;
    description: ReactNode;
    icon: ReactNode;
  }[] = [
    {
      type: "local",
      title: "Local environment",
      description: "This environment will be on your local machine",
      icon: <CodeDisplayIcon />
    },
    {
      type: "shared",
      title: "CI/Prod environment",
      description: "CI/Prod is an environment shared with your colleagues",
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
