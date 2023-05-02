import { useState } from "react";
import { useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import { Loader } from "../../common/Loader";
import { OpenTelemetryLogoIcon } from "../../common/icons/OpenTelemetryLogoIcon";
import { CodeSnippet } from "../CodeSnippet";
import { SectionTitle } from "../SectionTitle";
import { Tip } from "../Tip";
import { Link, MainButton } from "../styles";
import * as s from "./styles";
import { ObservabilityStepProps } from "./types";

const COLLECTOR_CONFIGURATION_SNIPPET = `otlp/digma:
endpoint: "localhost:5050"
tls:
  insecure: true
service:
pipelines:
traces:
  exporters: [otlp/digma, ...]`;

export const ObservabilityStep = (props: ObservabilityStepProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const [isCollectorModified, setIsCollectorModified] =
    useState<boolean>(false);

  const handleNextButtonClick = () => {
    props.onGoToNextStep();
  };

  const handleAlreadyUsingOTELLinkClick = () => {
    props.onIsAlreadyUsingOtelChange(!props.isAlreadyUsingOtel);
  };

  const handleCollectorIsModifiedButtonClick = () => {
    setIsCollectorModified(true);
  };

  const handleObservabilityToggleSwitch = () => {
    props.onObservabilityChange(!props.isObservabilityEnabled);
  };

  return props.isAlreadyUsingOtel ? (
    <s.Container>
      <SectionTitle>Add Digma to your collector</SectionTitle>
      <s.SectionDescription>
        Modify your collector configuration file to add Digma&apos;s backend as
        a target. For example:
      </s.SectionDescription>
      <CodeSnippet text={COLLECTOR_CONFIGURATION_SNIPPET} />
      <s.StepFooter>
        {isCollectorModified ? (
          <MainButton
            onClick={handleNextButtonClick}
            disabled={props.isAlreadyUsingOtel && !isCollectorModified}
          >
            Next
          </MainButton>
        ) : (
          <MainButton onClick={handleCollectorIsModifiedButtonClick}>
            OK, I&apos;ve modified collector configuration
          </MainButton>
        )}
        <Link onClick={handleAlreadyUsingOTELLinkClick}>
          Observe your application
        </Link>
      </s.StepFooter>
    </s.Container>
  ) : (
    <s.Container>
      <SectionTitle>How to get started?</SectionTitle>
      <s.ObservabilityContainer>
        <OpenTelemetryLogoIcon size={32} />
        <s.ObservabilityTitle>
          Observe your application in one click
        </s.ObservabilityTitle>
        <s.ObservabilityDescription>
          <span>
            To quickly collect data from your application in IntelliJ,
          </span>
          <span>You can just toggle observability on now to get started</span>
          <s.ObservabilityToggleSwitchContainer>
            <s.ObservabilityToggleSwitch
              onChange={handleObservabilityToggleSwitch}
              checked={props.isObservabilityEnabled}
              label={"Click here"}
              size={"large"}
            />
          </s.ObservabilityToggleSwitchContainer>
        </s.ObservabilityDescription>
        {props.isObservabilityEnabled && (
          <s.CongratulationsTextContainer>
            <Loader status={"success"} size={24} themeKind={themeKind} />
            <s.CongratulationsText>Congratulations!</s.CongratulationsText>
            Your application is now being observed.
          </s.CongratulationsTextContainer>
        )}
      </s.ObservabilityContainer>
      <Tip>
        You can always expand the Digma side panel and open the settings menu to
        toggle observability on/off later
      </Tip>
      <s.StepFooter>
        <MainButton onClick={handleNextButtonClick}>Next</MainButton>
        <Link onClick={handleAlreadyUsingOTELLinkClick}>
          Already using OpenTelemetry?
        </Link>
      </s.StepFooter>
    </s.Container>
  );
};
